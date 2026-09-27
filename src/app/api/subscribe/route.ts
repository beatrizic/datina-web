import { subscribeSchema } from "@/lib/schemas";
import { handleForm } from "@/lib/server/handle-form";

export async function POST(req: Request) {
  return handleForm(req, subscribeSchema, async () => {
    // Step "form + Neon": insert in `subscribers`.
    throw new Error("Persistenza non ancora collegata");
  });
}
