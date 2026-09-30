import { FormEvent, useEffect, useState } from "react";
import { Home as HomeIcon, Phone, Mail, Check, ArrowRight, ArrowDownRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Field } from "@/components/ui/Field";
import { SelectField } from "@/components/ui/SelectField";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { CampusMap } from "@/components/ui/CampusMap";
import { site } from "@/lib/site";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  care: string;
  room: string;
  date: string;
  time: string;
}

const initialValues: FormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  care: "Independent",
  room: "Small studio",
  date: "",
  time: "",
};

function validate(values: FormValues) {
  const errors: Partial<Record<keyof FormValues, string>> = {};
  if (!values.firstName.trim()) errors.firstName = "Please enter a first name.";
  if (!values.lastName.trim()) errors.lastName = "Please enter a last name.";
  if (!values.email.trim()) errors.email = "Please enter an email address.";
  else if (!/^\S+@\S+\.\S+$/.test(values.email)) errors.email = "That email doesn’t look right.";
  if (!values.phone.trim()) errors.phone = "Please enter a phone number.";
  else if (!/^[+\d][\d\s-]{7,14}$/.test(values.phone.trim()))
    errors.phone = "Please enter a valid phone number.";
  if (!values.date) errors.date = "Please pick a preferred date.";
  if (!values.time) errors.time = "Please pick a preferred time.";
  return errors;
}

export function Visit({ selectedCare }: { selectedCare: number }) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [formSent, setFormSent] = useState(false);

  const set = (key: keyof FormValues) => (value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    // Clear the field's error as soon as the user starts fixing it.
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) {
      // Move focus to the first invalid field for keyboard/screen-reader users.
      const firstError = Object.keys(nextErrors).find((key) => nextErrors[key as keyof FormValues]);
      if (firstError) document.getElementById(firstError)?.focus();
      return;
    }
    // No backend yet: acknowledge locally and log the payload for wiring later.
    console.info("Tour request submitted", values);
    setFormSent(true);
  };

  // Sync the "Care required" select with the plan picked in Pricing/Estimator.
  // Plans 0–1 are both independent studios; 2 is assisted; 3 is memory care.
  useEffect(() => {
    const mapping = ["Independent", "Independent", "Assisted", "Memory care"];
    const preselected = mapping[selectedCare];
    if (preselected) set("care")(preselected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCare]);

  return (
    <section id="visit" className="relative bg-cream px-6 py-16 sm:px-10 sm:py-24 lg:px-14 lg:py-36">
      <div className="pointer-events-none absolute right-0 top-10 h-64 w-64 rounded-full bg-lime/30 blur-3xl" />
      <div className="relative mx-auto grid max-w-[1240px] gap-14 lg:grid-cols-[.82fr_1.18fr] lg:gap-24">
        <Reveal>
          <SectionHeading eyebrow="Come see for yourself" className="max-w-lg">
            Visit Aarra Springs & <em className="font-normal text-coral">feel at home.</em>
          </SectionHeading>
          <p className="mt-6 max-w-md text-sm leading-6 text-muted">
            A quiet campus, a warm welcome, and a care conversation with no pressure attached.
          </p>
          <div className="mt-10 space-y-5 text-sm text-plum/80">
            <div className="flex gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-lime text-plum">
                <HomeIcon size={16} aria-hidden="true" />
              </span>
              <span>
                <b className="block text-plum">Aarra Springs</b>
                {site.address}
              </span>
            </div>
            <div className="flex gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-lime text-plum">
                <Phone size={16} aria-hidden="true" />
              </span>
              <a href={site.phoneHref} className="pt-2 font-medium hover:text-coral">
                {site.phoneDisplay}
              </a>
            </div>
            <div className="flex gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-lime text-plum">
                <Mail size={16} aria-hidden="true" />
              </span>
              <a href={`mailto:${site.email}`} className="pt-2 font-medium hover:text-coral">
                {site.email}
              </a>
            </div>
          </div>
          <div className="animate-fade-zoom mt-12 h-[380px] border-8 border-white shadow-[0_18px_50px_rgba(42,16,32,.1)] sm:h-[440px]">
            <CampusMap className="h-full w-full" />
          </div>
        </Reveal>

        <Reveal delay={140} className="rounded-[28px] bg-plum p-6 text-white shadow-[0_20px_60px_rgba(42,16,32,.18)] sm:p-9">
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[.16em] text-lime">
                Let’s make a plan
              </span>
              <h3 className="mt-2 font-display text-3xl tracking-[-.04em]">Book a campus tour</h3>
            </div>
            <span className="hidden h-12 w-12 items-center justify-center rounded-full bg-white/10 text-lime sm:flex">
              <ArrowDownRight size={21} aria-hidden="true" />
            </span>
          </div>

          {formSent ? (
            <div
              className="flex min-h-[430px] flex-col items-center justify-center text-center"
              role="status"
            >
              <span className="animate-pop flex h-16 w-16 items-center justify-center rounded-full bg-lime text-plum">
                <Check size={30} strokeWidth={3} aria-hidden="true" />
              </span>
              <h3 className="mt-6 font-display text-4xl tracking-[-.04em]">We’ll be in touch.</h3>
              <p className="mt-3 max-w-sm text-sm leading-6 text-white/70">
                Thank you for reaching out. Our care team will call you shortly to confirm your
                tour.
              </p>
              <button
                onClick={() => {
                  setFormSent(false);
                  setValues(initialValues);
                }}
                className="mt-7 text-xs font-bold uppercase tracking-[.13em] text-lime underline underline-offset-4"
              >
                Send another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="animate-swap mt-7 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="First name"
                  placeholder="Anita"
                  required
                  error={errors.firstName}
                  value={values.firstName}
                  onChange={(e) => set("firstName")(e.target.value)}
                />
                <Field
                  label="Last name"
                  placeholder="Sharma"
                  required
                  error={errors.lastName}
                  value={values.lastName}
                  onChange={(e) => set("lastName")(e.target.value)}
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Email address"
                  placeholder="anita@email.com"
                  type="email"
                  autoComplete="email"
                  required
                  error={errors.email}
                  value={values.email}
                  onChange={(e) => set("email")(e.target.value)}
                />
                <Field
                  label="Phone number"
                  placeholder="+91 98 0000 0000"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  required
                  error={errors.phone}
                  value={values.phone}
                  onChange={(e) => set("phone")(e.target.value)}
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <SelectField
                  label="Care required"
                  options={["Independent", "Assisted", "Nursing", "Memory care"]}
                  value={values.care}
                  onChange={(e) => set("care")(e.target.value)}
                />
                <SelectField
                  label="Room preference"
                  options={["Small studio", "Large studio", "Shared room"]}
                  value={values.room}
                  onChange={(e) => set("room")(e.target.value)}
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Preferred visit date"
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  required
                  error={errors.date}
                  value={values.date}
                  onChange={(e) => set("date")(e.target.value)}
                />
                <Field
                  label="Preferred time"
                  type="time"
                  required
                  error={errors.time}
                  value={values.time}
                  onChange={(e) => set("time")(e.target.value)}
                />
              </div>
              <Button type="submit" variant="lime" className="mt-3 w-full gap-2">
                Request free consultation & tour
                <ArrowRight size={17} />
              </Button>
              <p className="text-center text-[11px] text-white/55">
                No obligation. Just a warm conversation about what would help.
              </p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
