import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder?: string;
  error?: string;
  helperText?: string;
  labelClassName?: string;
  /** Tailwind classes for the input when you need to override the dark-theme defaults. */
  inputClassName?: string;
}

export const Field = forwardRef<HTMLInputElement, FieldProps>(
  ({ className, label, placeholder, error, helperText, labelClassName, inputClassName, id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className={cn("block", className)}>
        <label
          htmlFor={inputId}
          className={cn(
            "mb-2 block text-xs font-bold uppercase tracking-[.13em] text-white/70",
            labelClassName
          )}
        >
          {label}
          {props.required && <span className="ml-0.5 text-coral" aria-hidden="true">*</span>}
        </label>
        <input
          ref={ref}
          id={inputId}
          placeholder={placeholder}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          className={cn(
            "w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3.5 text-base text-white outline-none transition placeholder:text-white/35",
            "focus:border-lime/70 focus:bg-white/12",
            error && "border-coral/70 focus:border-coral focus:ring-2 focus:ring-coral/30",
            inputClassName
          )}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="mt-1.5 text-sm font-medium text-coral" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="mt-1.5 text-sm text-white/55">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Field.displayName = "Field";
