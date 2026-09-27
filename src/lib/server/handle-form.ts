import type { z } from "zod";
import { clientIp, rateLimited } from "@/lib/rate-limit";
import { flattenErrors } from "@/lib/schemas";

type Result = { ok: true } | { ok: false; status: number; message: string; errors?: Record<string, string | undefined> };

/** Pipeline comune dei form: rate limit → parse → validazione zod → honeypot → salvataggio. */
export async function handleForm<S extends z.ZodType>(
  req: Request,
  schema: S,
  save: (data: z.infer<S>) => Promise<void>,
): Promise<Response> {
  const res = (r: Result) => Response.json(r, { status: r.ok ? 200 : r.status });

  if (rateLimited(clientIp(req))) {
    return res({ ok: false, status: 429, message: "Troppi invii ravvicinati. Riprova tra qualche minuto." });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return res({ ok: false, status: 400, message: "Richiesta non valida." });
  }

  // Bot: fingiamo successo senza salvare nulla.
  if (body && typeof body === "object" && "website" in body && (body as { website?: unknown }).website) {
    return res({ ok: true });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return res({ ok: false, status: 422, message: "Controlla i campi evidenziati.", errors: flattenErrors(parsed.error) });
  }

  if (!process.env.DATABASE_URL) {
    return res({
      ok: false,
      status: 503,
      message: "Il servizio online è in fase di attivazione. Nel frattempo contattaci direttamente.",
    });
  }

  try {
    await save(parsed.data);
    return res({ ok: true });
  } catch (e) {
    console.error("[form] salvataggio fallito", e);
    return res({ ok: false, status: 500, message: "Qualcosa è andato storto. Riprova o contattaci direttamente." });
  }
}
