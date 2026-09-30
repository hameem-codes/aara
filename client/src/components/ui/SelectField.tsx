import { SelectHTMLAttributes, forwardRef } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: string[];
  placeholder?: string;
  error?: string;
  labelClassName?: string;
  /** Tailwind classes for the select when you need to override the dark-theme defaults. */
  selectClassName?: string;
}

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ className, label, options, placeholder, error, labelClassName, selectClassName, id, ...props }, ref) => {
    const selectId = id || label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className={cn("block", className)}>
        <label
          htmlFor={selectId}
          className={cn(
            "mb-2 block text-xs font-bold uppercase tracking-[.13em] text-white/70",
            labelClassName
          )}
        >
          {label}
          {props.required && <span className="ml-0.5 text-coral" aria-hidden="true">*</span>}
        </label>
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={error ? `${selectId}-error` : undefined}
            className={cn(
              "w-full appearance-none rounded-xl border border-white/15 bg-[#452039] px-4 py-3.5 pr-11 text-base text-white outline-none transition",
              "focus:border-lime/70 focus:bg-[#52284a]",
              error && "border-coral/70 focus:border-coral focus:ring-2 focus:ring-coral/30",
              selectClassName
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/60"
          />
        </div>
        {error && (
          <p id={`${selectId}-error`} className="mt-1.5 text-sm font-medium text-coral" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

SelectField.displayName = "SelectField";
