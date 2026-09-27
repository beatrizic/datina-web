import type { InputHTMLAttributes, ReactNode } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  error?: string;
  children?: ReactNode; // per <select>/<textarea> personalizzati
};

export function Field({ name, label, error, children, required, ...rest }: Props) {
  const id = `f-${name}`;
  const errId = `${id}-err`;
  return (
    <div className="field">
      <label htmlFor={id}>
        {label}
        {required && <span aria-hidden> *</span>}
      </label>
      {children ?? (
        <input
          id={id}
          name={name}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errId : undefined}
          {...rest}
        />
      )}
      {error && (
        <p id={errId} className="field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Lascia vuoto
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

export function PrivacyCheck({ error, privacyUrl }: { error?: string; privacyUrl: string }) {
  return (
    <div className="field">
      <label className="flex min-h-11 min-w-0 cursor-pointer items-start gap-3 font-normal">
        <input
          type="checkbox"
          name="privacy"
          required
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "f-privacy-err" : undefined}
          className="mt-1 size-5 shrink-0 accent-current"
        />
        <span className="min-w-0">
          Ho letto l&apos;
          <a href={privacyUrl} target="_blank" rel="noopener" className="font-bold underline underline-offset-2">
            informativa privacy
          </a>{" "}
          e acconsento al trattamento dei miei dati. <span aria-hidden>*</span>
        </span>
      </label>
      {error && (
        <p id="f-privacy-err" className="field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
