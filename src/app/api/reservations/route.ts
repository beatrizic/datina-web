import { reservationSchema } from "@/lib/schemas";
import { handleForm } from "@/lib/server/handle-form";

export async function POST(req: Request) {
  return handleForm(req, reservationSchema, async () => {
    // Step "form + Neon": insert in `reservations` (status pending) + email Resend al locale.
    throw new Error("Persistenza non ancora collegata");
  });
}
