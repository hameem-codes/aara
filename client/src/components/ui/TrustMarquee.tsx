import { Leaf } from "lucide-react";

const items = [
  "24/7 registered nurses",
  "Chef-curated vegetarian dining",
  "Emergency call buttons in every unit",
  "Daily yoga & wellness",
  "Housekeeping & security",
  "Doctor-supervised care plans",
];

/** Scrolling trust strip under the hero. Decorative, pauses on hover. */
export function TrustMarquee() {
  return (
    <div className="marquee border-y border-plum/10 bg-lime py-3.5 text-plum" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((half) => (
          <ul key={half} className="flex shrink-0 items-center gap-10 pr-10">
            {items.map((item) => (
              <li
                key={item}
                className="flex items-center gap-10 whitespace-nowrap text-[11px] font-extrabold uppercase tracking-[.16em]"
              >
                {item}
                <Leaf size={13} aria-hidden="true" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
