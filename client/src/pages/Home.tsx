import { FormEvent, useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BedDouble,
  Brain,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Clock3,
  Flower2,
  Heart,
  Home as HomeIcon,
  Leaf,
  Menu,
  MessageCircle,
  Minus,
  Phone,
  Play,
  Plus,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Utensils,
  X,
} from "lucide-react";

const images = {
  hero: "/manus-storage/bqy3TwP06jhS_2dc06790.jpg",
  family: "/manus-storage/deyvIFplCzPF_37f455bd.webp",
  nurse: "/manus-storage/deyvIFplCzPF_37f455bd.webp",
  wellness: "/manus-storage/bqy3TwP06jhS_2dc06790.jpg",
  garden: "/manus-storage/34RlIy54k28w_be813a13.jpg",
  dining: "/manus-storage/uBTvxSyJN6h3_5c46e66d.webp",
  room: "/manus-storage/bdn3LM61vvxp_a6d4b7b9.jpg",
};

const careOptions = [
  {
    label: "Independent living",
    title: "1 BHK Small Studio",
    price: 30000,
    suffix: "/ month",
    tone: "lime",
    icon: <HomeIcon size={21} strokeWidth={1.7} />,
    description: "An easy, independent rhythm with the comfort of community close by.",
    features: ["Fully furnished studio", "Housekeeping & security", "3 vegetarian meals + tea", "Anti-skid bathroom"],
  },
  {
    label: "Independent living",
    title: "1 BHK Large Studio",
    price: 34000,
    suffix: "/ month",
    tone: "sand",
    icon: <BedDouble size={21} strokeWidth={1.7} />,
    description: "More room to settle in, host family, and make each day your own.",
    features: ["Spacious 1 BHK layout", "Workspace corner", "Balcony garden view", "Parking & studio amenities"],
  },
  {
    label: "Daily assistance",
    title: "Assisted Care Facility",
    price: 45000,
    suffix: "/ month",
    tone: "sky",
    icon: <Stethoscope size={21} strokeWidth={1.7} />,
    description: "Thoughtful daily support that protects independence while adding confidence.",
    features: ["Complete ADL support", "Medication tracking", "24/7 nurse monitoring", "Personal care routines"],
  },
  {
    label: "Intensive & rehab",
    title: "Memory & Critical Care",
    price: 65000,
    suffix: "/ month",
    tone: "blush",
    icon: <Brain size={21} strokeWidth={1.7} />,
    description: "Specialist support for recovery, memory care, and more complex needs.",
    features: ["Stroke recovery therapies", "Dementia-safe ward", "High staff-to-resident ratio", "Nursing & rehab oversight"],
  },
];

const faqs = [
  {
    q: "What services does Aarra provide for senior living?",
    a: "Aarra brings together independent living, assisted care, nursing oversight, rehabilitation, chef-curated vegetarian dining, housekeeping, wellness programming, and a warm, connected community. Every resident receives a care plan shaped around their routines and needs.",
  },
  {
    q: "How do I know if home care or a senior living facility is right for my loved one?",
    a: "The right choice depends on how much daily support is needed, how isolated or connected your loved one feels, and whether the family needs clinical reassurance. Our care team can have an honest, no-pressure conversation and help you compare both paths.",
  },
  {
    q: "Are your caregivers and nurses qualified and background-checked?",
    a: "Yes. Aarra’s care teams are trained for senior support, receive role-specific onboarding, and are verified before joining the community. Registered nurses are available around the clock, with doctor consultations scheduled as needed.",
  },
  {
    q: "Can families visit and stay involved in care decisions?",
    a: "Absolutely. Families are welcome to visit, join meals and celebrations, and stay close through dedicated updates. Care decisions are made collaboratively, with the resident’s preferences at the centre.",
  },
  {
    q: "How do I get started with Aarra’s services?",
    a: "Start with a campus tour or a complimentary consultation. Share a little about the kind of support you’re exploring, and our team will walk you through availability, room options, care pathways, and next steps.",
  },
];

const testimonials = [
  {
    quote: "A warm, safe, and supportive environment where senior citizens can live comfortably and happily, surrounded by care and companionship.",
    author: "Harish S.",
    place: "Bengaluru",
    tone: "blush",
  },
  {
    quote: "This is an amazing place for senior citizens to enjoy their golden years. I like this place because of the services provided. I would wholeheartedly advise senior citizens to be a part of the Aarra family.",
    author: "Niranjan Nayak",
    place: "Bengaluru",
    tone: "lime",
  },
  {
    quote: "A beautiful location surrounded by greenery, offering a peaceful and refreshing atmosphere for seniors to relax and feel at home.",
    author: "Arun",
    place: "Bengaluru",
    tone: "sand",
  },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2" aria-label="Aarra home">
      <span className="font-display text-[1.9rem] tracking-[-0.06em] text-white">Aarra.</span>
      <span className="relative flex h-7 w-7 rotate-[-8deg] items-center justify-center rounded-[10px] bg-coral text-plum">
        <Leaf size={15} fill="currentColor" strokeWidth={1.5} />
      </span>
    </a>
  );
}

function SerifHeading({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <h2 className={`font-display text-[clamp(2.4rem,5vw,4.7rem)] leading-[0.96] tracking-[-0.055em] ${className}`}>{children}</h2>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [tourOpen, setTourOpen] = useState(false);
  const [selectedCare, setSelectedCare] = useState(2);
  const [activeFaq, setActiveFaq] = useState(0);
  const [formSent, setFormSent] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);

  const selectedPlan = careOptions[selectedCare];
  const estimatedAnnual = useMemo(() => selectedPlan.price * 12, [selectedPlan.price]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSent(true);
  };

  const closeMenuAndScroll = (id: string) => {
    setMenuOpen(false);
    scrollToId(id);
  };

  return (
    <div id="top" className="min-h-screen overflow-x-hidden bg-cream text-ink">
      <header className="absolute inset-x-0 top-0 z-40 px-4 pt-4 sm:px-6 lg:px-10 lg:pt-6">
        <div className="mx-auto flex max-w-[1380px] items-center justify-between rounded-full border border-white/15 bg-plum/90 px-5 py-3.5 text-white shadow-2xl shadow-plum/10 backdrop-blur-md sm:px-7">
          <Logo />
          <nav className="hidden items-center gap-7 text-[11px] font-semibold uppercase tracking-[0.13em] text-white/75 xl:flex">
            <button onClick={() => scrollToId("services")} className="transition hover:text-white">Our services</button>
            <button onClick={() => scrollToId("story")} className="transition hover:text-white">Why Aarra</button>
            <button onClick={() => scrollToId("living")} className="transition hover:text-white">Amenities & dining</button>
            <button onClick={() => scrollToId("reviews")} className="transition hover:text-white">Reviews</button>
            <button onClick={() => scrollToId("faq")} className="transition hover:text-white">FAQ</button>
          </nav>
          <div className="hidden items-center gap-5 sm:flex">
            <a href="tel:+917411206633" className="flex items-center gap-2 text-xs font-semibold text-white/75 transition hover:text-white"><Phone size={14} /> +91 74112 06633</a>
            <button onClick={() => scrollToId("visit")} className="rounded-full bg-lime px-5 py-3 text-xs font-bold text-plum transition hover:bg-[#e5ed7a] active:scale-[0.97]">Book a tour <ArrowRight className="ml-1 inline" size={14} /></button>
          </div>
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white xl:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {menuOpen && (
          <div className="mx-auto mt-2 max-w-[1380px] rounded-[24px] border border-white/15 bg-plum px-5 py-5 text-white shadow-2xl xl:hidden">
            <div className="grid gap-3 text-sm font-semibold">
              {[['services', 'Our services'], ['story', 'Why Aarra'], ['living', 'Amenities & dining'], ['reviews', 'Reviews'], ['faq', 'FAQ']].map(([id, label]) => (
                <button key={id} onClick={() => closeMenuAndScroll(id)} className="border-b border-white/10 py-2 text-left text-white/80 last:border-0">{label}</button>
              ))}
            </div>
            <a href="tel:+917411206633" className="mt-4 flex items-center gap-2 text-sm text-white/70"><Phone size={15} /> +91 74112 06633</a>
            <button onClick={() => closeMenuAndScroll("visit")} className="mt-4 w-full rounded-full bg-lime py-3 text-sm font-bold text-plum">Book a tour <ArrowRight className="ml-1 inline" size={15} /></button>
          </div>
        )}
      </header>

      <main>
        <section className="relative isolate overflow-hidden bg-[#1d1a1e] text-white">
          <div className="absolute inset-0 -z-20 bg-[url('/manus-storage/E7T2tG5hZeyR_b048858f.jpg')] bg-cover bg-[center_58%]" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/48 to-black/15" />
          <div className="absolute inset-0 -z-10 bg-black/10" />
          <div className="absolute right-[-7%] top-[20%] h-72 w-72 rounded-full border border-white/10 sm:h-[420px] sm:w-[420px]" />
          <div className="relative mx-auto grid max-w-[1380px] items-center gap-14 px-6 pb-28 pt-40 sm:px-10 lg:grid-cols-[1.03fr_.97fr] lg:gap-16 lg:px-14 lg:pb-36 lg:pt-48">
            <div className="max-w-2xl animate-rise">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/75 backdrop-blur-sm">
                <Sparkles size={13} className="text-lime" /> #1 senior living facility in Bengaluru
              </div>
              <h1 className="max-w-[760px] font-display text-[clamp(3.8rem,8vw,7.75rem)] leading-[0.84] tracking-[-0.065em] text-white">
                Comfort for life&apos;s <span className="mx-1 inline-flex h-[0.56em] w-[0.56em] translate-y-[-0.03em] items-center justify-center rounded-full bg-coral align-middle font-sans text-[0.42em] font-bold tracking-normal text-white sm:mx-3">+</span> <em className="font-normal text-lime">best sequel</em>
              </h1>
              <p className="mt-8 max-w-xl text-[17px] leading-7 text-white/70 sm:text-lg">Seniors are at the heart of everything we do. Luxury senior living apartments, assisted care, and 24/7 geriatric nursing nestled in peaceful Chikka Tirupathi, Whitefield.</p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <button onClick={() => scrollToId("services")} className="rounded-full bg-plum-light px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-[#652a52] active:scale-[0.97]">Explore care options <ArrowRight className="ml-2 inline" size={16} /></button>
                <button onClick={() => setTourOpen(true)} className="group flex items-center gap-3 text-sm font-semibold text-white/85 transition hover:text-white">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-lime text-plum transition group-hover:scale-105"><Play size={17} fill="currentColor" /></span> Watch campus tour
                </button>
              </div>
              <div className="mt-14 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-white/15 pt-5 text-xs text-white/55">
                <span className="flex items-center gap-2"><ShieldCheck size={16} className="text-lime" /> 1,800+ certified staff</span>
                <span className="flex items-center gap-2"><Clock3 size={16} className="text-lime" /> 24/7 registered nurses</span>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-[620px] animate-rise [animation-delay:120ms] lg:ml-auto">
              <div className="absolute -left-4 top-[15%] z-10 hidden items-center gap-3 rounded-2xl border border-white/15 bg-[#472239]/90 px-4 py-3 text-xs shadow-xl backdrop-blur-md sm:flex sm:-left-10">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-lime text-plum"><CircleCheck size={17} /></span>
                <span><b className="block text-white">Verified care</b><small className="text-white/55">1,800+ certified staff</small></span>
              </div>
              <div className="absolute -right-3 bottom-[10%] z-10 max-w-[185px] rounded-2xl border border-white/15 bg-[#472239]/90 px-4 py-3 text-xs shadow-xl backdrop-blur-md sm:-right-8">
                <span className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-coral text-white"><Heart size={16} fill="currentColor" /></span>
                <b className="block text-white">Peace of mind</b><small className="text-white/55">A home that holds you</small>
              </div>
              <div className="image-arch relative overflow-hidden rounded-[44%_44%_18%_18%/31%_31%_14%_14%] border-[10px] border-white/10 bg-white/5 p-2 shadow-2xl shadow-black/25">
                <img src={images.hero} alt="A happy older couple enjoying time together" className="aspect-[.85] w-full rounded-[42%_42%_16%_16%/29%_29%_12%_12%] object-cover" />
              </div>
              <div className="absolute -bottom-10 left-[17%] h-24 w-24 rounded-full border border-lime/30 bg-lime/10 blur-[1px]" />
              <p className="absolute -bottom-8 right-[18%] rotate-[-7deg] font-display text-xl italic text-lime">a gentler way to age</p>
            </div>
          </div>
          <div className="torn-bottom bg-cream" />
        </section>

        <section id="story" className="bg-cream px-6 py-24 sm:px-10 lg:px-14 lg:py-36">
          <div className="mx-auto grid max-w-[1240px] items-center gap-16 lg:grid-cols-[.9fr_1.1fr] lg:gap-24">
            <div className="relative mx-auto w-full max-w-[520px]">
              <div className="absolute -left-7 top-[12%] h-32 w-32 rounded-full bg-lime/50 blur-2xl" />
              <div className="relative overflow-hidden rounded-[46%_46%_5%_5%/30%_30%_5%_5%] border-[8px] border-white shadow-[0_20px_60px_rgba(42,16,32,.12)]">
                <img src={images.family} alt="Grandparents spending time reading with a child" className="aspect-[.84] w-full object-cover" loading="lazy" />
              </div>
              <div className="absolute -bottom-7 -right-2 flex rotate-[-7deg] items-center gap-2 rounded-full border-2 border-plum bg-coral px-4 py-3 font-display text-sm text-white shadow-xl sm:-right-10">
                <Leaf size={16} /> Founded with love · 2019
              </div>
            </div>
            <div>
              <span className="eyebrow">About Aarra</span>
              <SerifHeading className="mt-5 max-w-2xl text-plum">Aarra was born from a deeply personal realization — our elders deserve <em className="font-normal text-coral">so much more</em> than just care.</SerifHeading>
              <div className="mt-8 max-w-xl space-y-5 text-[16px] leading-7 text-muted">
                <p>They deserve comfort, dignity, and a true sense of belonging. Like many families in India, we noticed how challenging it is to find the right support — not just clinical care, but a genuine community where elders feel safe, valued, and celebrated.</p>
                <p>We built Aarra to make aging feel like a vibrant new chapter to embrace, not a challenge to endure.</p>
              </div>
              <div className="mt-9 grid gap-4 border-t border-plum/10 pt-7 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {[['Redefining senior living', 'Modern, customisable 1 BHK apartments.'], ['Bridging generations', 'Keeping families intimately connected.'], ['Continuous care', 'From self-sufficient living to 24/7 rehab.']].map(([title, text]) => (
                  <div key={title} className="flex gap-3"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-plum text-lime"><Check size={12} strokeWidth={3} /></span><div><b className="block text-sm text-plum">{title}</b><span className="mt-1 block text-xs leading-5 text-muted">{text}</span></div></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="bg-cream-warm px-6 py-24 sm:px-10 lg:px-14 lg:py-32">
          <div className="mx-auto max-w-[1240px]">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div><span className="eyebrow">Refined living experience</span><SerifHeading className="mt-5 max-w-2xl text-plum">Care crafted around <em className="font-normal text-coral">everyday joy.</em></SerifHeading></div>
              <p className="max-w-xs text-sm leading-6 text-muted">A considered approach to the details that make a day feel good — and a community feel like home.</p>
            </div>
            <div className="mt-14 grid gap-5 lg:grid-cols-3">
              {[
                { tone: "blush", icon: <Stethoscope size={24} />, title: "24/7 professional medical oversight", body: "Registered nurses on premises around the clock, routine vitals charting, scheduled doctor consultations, and priority hospital affiliations.", link: "Explore medical facilities" },
                { tone: "sand", icon: <Utensils size={24} />, title: "Chef-curated vegetarian nutrition", body: "Three fresh, balanced vegetarian meals prepared daily. Full dietary customization for diabetic, low-sodium, and soft-texture requirements.", link: "View dining philosophy" },
                { tone: "sky", icon: <Flower2 size={24} />, title: "Vibrant community & well-being", body: "Daily yoga, meditation, gardening in lush green courtyards, book clubs, and cultural festivals that cultivate lifelong friendships.", link: "See life at Aarra" },
              ].map((item) => (
                <article key={item.title} className={`pastel-${item.tone} group flex min-h-[340px] flex-col rounded-[28px] p-7 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(42,16,32,.1)] sm:p-9`}>
                  <span className="mb-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/65 text-plum shadow-sm">{item.icon}</span>
                  <h3 className="max-w-[260px] font-display text-[2rem] leading-[.98] tracking-[-.045em] text-plum">{item.title}</h3>
                  <p className="mt-4 max-w-sm text-sm leading-6 text-plum/65">{item.body}</p>
                  <button onClick={() => scrollToId("living")} className="mt-auto flex items-center gap-2 pt-8 text-xs font-bold uppercase tracking-[.13em] text-plum">{item.link} <ArrowUpRight size={15} className="transition group-hover:translate-x-1 group-hover:-translate-y-1" /></button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="living" className="bg-cream px-6 py-24 sm:px-10 lg:px-14 lg:py-36">
          <div className="mx-auto grid max-w-[1240px] items-center gap-16 lg:grid-cols-[1.08fr_.92fr] lg:gap-20">
            <div>
              <span className="eyebrow">Our promise</span>
              <SerifHeading className="mt-5 max-w-xl text-plum">Unlock everyday <span className="inline-block translate-y-[-.08em] rounded-full bg-sky px-4 py-2 font-sans text-[.32em] font-semibold tracking-normal text-plum">🌿 wellness</span> peace of mind.</SerifHeading>
              <div className="mt-10 divide-y divide-plum/10 border-y border-plum/10">
                {[['Nutritious homestyle vegetarian cuisine', 'Doctor-approved recipes balanced for senior vitality.'], ['Seamless medication administration', 'In-house nurses oversee dosages, schedules, and refills.'], ['Emergency call buttons in every unit', 'Immediate response linked directly to the central nurse station.'], ['Senior-retrofit architecture', 'Anti-skid floors, grab bars, wide doorways, and stretcher lifts.']].map(([title, text], index) => (
                  <button key={title} className="group flex w-full items-center justify-between gap-4 py-5 text-left transition hover:px-2" onClick={() => setActiveFaq(index % faqs.length)}>
                    <span><b className="block font-display text-[1.35rem] tracking-[-.025em] text-plum sm:text-[1.55rem]">{title}</b><small className="mt-1 block text-xs leading-5 text-muted">{text}</small></span>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-plum/15 text-plum transition group-hover:bg-plum group-hover:text-lime"><ArrowUpRight size={17} /></span>
                  </button>
                ))}
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-[500px]">
              <div className="absolute -right-5 top-6 h-28 w-28 rounded-full bg-coral/25 blur-2xl" />
              <div className="relative overflow-hidden rounded-[42%_42%_7%_7%/24%_24%_4%_4%] border-[8px] border-white shadow-[0_22px_70px_rgba(42,16,32,.15)]">
                <img src={images.nurse} alt="A nurse gently supporting a resident" className="aspect-[.78] w-full object-cover" loading="lazy" />
              </div>
              <div className="absolute -bottom-8 -left-5 max-w-[245px] rounded-[20px] bg-plum p-5 text-white shadow-xl sm:-left-10"><div className="flex items-center gap-2 text-lime"><StarIcon /><span className="text-[10px] font-bold uppercase tracking-[.14em]">Aarra promise</span></div><p className="mt-2 font-display text-[1.35rem] leading-[1]">Support that feels like <em className="font-normal text-coral">care.</em></p></div>
            </div>
          </div>
        </section>

        <section id="pricing" className="bg-cream-warm px-6 py-24 sm:px-10 lg:px-14 lg:py-32">
          <div className="mx-auto max-w-[1240px]">
            <div className="flex flex-col justify-between gap-7 border-b border-plum/10 pb-9 md:flex-row md:items-end">
              <div><div className="mb-3 flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-[.12em] text-plum/60"><span className="rounded-full border border-plum/15 px-3 py-1">100% verified care</span><span className="rounded-full border border-plum/15 px-3 py-1">Doctor supervised</span><span className="rounded-full border border-plum/15 px-3 py-1">Memory safe</span></div><SerifHeading className="max-w-2xl text-plum">Find your <em className="font-normal text-coral">sanctuary.</em></SerifHeading></div>
              <button onClick={() => scrollToId("visit")} className="flex items-center gap-2 self-start rounded-full border border-plum/20 px-5 py-3 text-xs font-bold uppercase tracking-[.1em] text-plum transition hover:bg-plum hover:text-lime md:self-end">Download full brochure <ArrowDownRight size={15} /></button>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {careOptions.map((plan, index) => (
                <article key={plan.title} className={`pastel-${plan.tone} relative flex min-h-[390px] flex-col rounded-[26px] p-6 transition duration-300 ${selectedCare === index ? "ring-2 ring-plum ring-offset-4 ring-offset-cream-warm" : "hover:-translate-y-1"}`}>
                  <div className="flex items-center justify-between"><span className="rounded-full bg-white/65 px-3 py-1 text-[10px] font-bold uppercase tracking-[.14em] text-plum">{plan.label}</span><span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-plum">{plan.icon}</span></div>
                  <h3 className="mt-10 font-display text-[2rem] leading-[.94] tracking-[-.05em] text-plum">{plan.title}</h3>
                  <div className="mt-5 flex items-end gap-1 text-plum"><span className="font-display text-4xl tracking-[-.05em]">₹{plan.price.toLocaleString("en-IN")}</span><span className="pb-1 text-xs text-plum/55">{plan.suffix}</span></div>
                  <p className="mt-4 text-xs leading-5 text-plum/65">{plan.description}</p>
                  <ul className="mt-5 space-y-2 border-t border-plum/10 pt-4 text-xs text-plum/70">{plan.features.map((feature) => <li key={feature} className="flex gap-2"><Check size={13} className="mt-0.5 shrink-0" /> {feature}</li>)}</ul>
                  <button onClick={() => { setSelectedCare(index); scrollToId("estimator"); }} className="mt-auto flex items-center justify-between rounded-full bg-plum/90 px-4 py-3 text-xs font-bold text-white transition hover:bg-plum"><span>Select this stay</span><Plus size={16} /></button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="estimator" className="bg-plum px-6 py-20 text-white sm:px-10 lg:px-14 lg:py-28">
          <div className="mx-auto grid max-w-[1240px] gap-14 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <div><span className="eyebrow eyebrow-light">Monthly cost estimator</span><SerifHeading className="mt-5 max-w-md text-white">A clearer way to plan the <em className="font-normal text-lime">next chapter.</em></SerifHeading><p className="mt-6 max-w-md text-sm leading-6 text-white/60">Use the selector to explore a starting estimate. Our team will tailor the final plan to your loved one’s needs.</p><button onClick={() => scrollToId("visit")} className="mt-8 rounded-full bg-lime px-5 py-3 text-xs font-bold text-plum transition hover:bg-[#e5ed7a]">Talk to a care advisor <ArrowRight className="ml-2 inline" size={15} /></button></div>
            <div className="rounded-[28px] border border-white/10 bg-white/7 p-6 sm:p-8">
              <div className="flex flex-col justify-between gap-5 border-b border-white/10 pb-7 sm:flex-row sm:items-end"><div><span className="text-[10px] font-bold uppercase tracking-[.15em] text-white/45">Selected option</span><h3 className="mt-2 font-display text-3xl tracking-[-.04em] text-white">{selectedPlan.title}</h3></div><div className="text-left sm:text-right"><span className="text-[10px] uppercase tracking-[.15em] text-white/45">Starting from</span><p className="mt-1 font-display text-4xl tracking-[-.05em] text-lime">₹{selectedPlan.price.toLocaleString("en-IN")}<small className="ml-1 font-sans text-xs tracking-normal text-white/45">/ month</small></p></div></div>
              <div className="mt-8"><div className="mb-4 flex justify-between text-[10px] font-bold uppercase tracking-[.13em] text-white/45"><span>Independent</span><span>Assisted</span><span>Memory care</span></div><input aria-label="Choose a care tier" type="range" min="0" max="3" value={selectedCare} onChange={(event) => setSelectedCare(Number(event.target.value))} className="care-range w-full" /><div className="mt-4 grid grid-cols-4 gap-2">{careOptions.map((plan, index) => <button key={plan.title} onClick={() => setSelectedCare(index)} className={`rounded-xl px-2 py-3 text-center text-[10px] font-bold transition ${selectedCare === index ? "bg-lime text-plum" : "bg-white/7 text-white/55 hover:bg-white/12"}`}><span className="block">₹{Math.round(plan.price / 1000)}k</span><span className="mt-1 block truncate font-normal opacity-70">{index < 2 ? "Studio" : index === 2 ? "Assisted" : "Memory"}</span></button>)}</div></div>
              <div className="mt-8 grid gap-3 sm:grid-cols-3"><div className="rounded-2xl bg-white/7 p-4"><span className="text-[10px] uppercase tracking-[.12em] text-white/40">Annual guide</span><b className="mt-2 block text-lg text-white">₹{estimatedAnnual.toLocaleString("en-IN")}</b></div><div className="rounded-2xl bg-white/7 p-4"><span className="text-[10px] uppercase tracking-[.12em] text-white/40">Meals included</span><b className="mt-2 block text-lg text-white">3 + tea</b></div><div className="rounded-2xl bg-white/7 p-4"><span className="text-[10px] uppercase tracking-[.12em] text-white/40">Nurse access</span><b className="mt-2 block text-lg text-white">24/7</b></div></div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-plum px-6 pb-24 text-white sm:px-10 lg:px-14 lg:pb-32">
          <div className="torn-top bg-cream-warm" />
          <div className="mx-auto grid max-w-[1240px] gap-14 pt-24 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:pt-32">
            <div><span className="eyebrow eyebrow-light">Life in motion</span><SerifHeading className="mt-5 max-w-lg text-white">Helping you achieve full <em className="font-normal text-lime">comfort & vitality.</em></SerifHeading><p className="mt-7 max-w-md text-sm leading-6 text-white/60">At the heart of our community is a belief that personalised therapy begins with empathy and clinical precision.</p><div className="mt-10 grid max-w-lg grid-cols-2 gap-x-8 gap-y-7 border-t border-white/10 pt-7 sm:grid-cols-4">{[["150+", "lives touched"], ["100+", "bedded campus"], ["1,800+", "care providers"], ["4.8 ★", "Google rating"]].map(([value, label]) => <div key={label}><b className="font-display text-3xl tracking-[-.05em] text-lime">{value}</b><span className="mt-1 block text-[10px] uppercase tracking-[.12em] text-white/45">{label}</span></div>)}</div></div>
            <div className="relative mx-auto w-full max-w-[560px]"><div className="overflow-hidden rounded-[30px] border border-white/10 p-2"><img src={images.wellness} alt="Senior resident practicing gentle stretching with an instructor" className="aspect-[1.1] w-full rounded-[23px] object-cover" loading="lazy" /></div><div className="absolute -bottom-7 -left-4 flex items-center gap-3 rounded-2xl bg-lime px-5 py-4 text-plum shadow-xl sm:-left-9"><Heart size={20} fill="currentColor" /><span className="text-xs font-bold">Specialised stroke & memory care</span></div></div>
          </div>
        </section>

        <section id="reviews" className="bg-cream px-6 py-24 sm:px-10 lg:px-14 lg:py-36">
          <div className="mx-auto max-w-[1240px]"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><span className="eyebrow">Where families find peace of mind</span><SerifHeading className="mt-5 max-w-xl text-plum">What families say <em className="font-normal text-coral">about us.</em></SerifHeading></div><a href="https://www.google.com/search?q=Aarra+Springs+senior+living+reviews" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.12em] text-plum hover:text-coral">See all Google reviews <ArrowUpRight size={16} /></a></div>
            <div className="relative mt-14"><div className="grid gap-5 lg:grid-cols-3">{testimonials.map((review) => <article key={review.author} className={`pastel-${review.tone} flex min-h-[300px] flex-col rounded-[26px] p-7 sm:p-8`}><div className="flex items-center justify-between"><span className="rounded-full bg-white/60 px-3 py-1 text-[10px] font-bold uppercase tracking-[.14em] text-plum">{review.tone === "sand" ? "Independent living" : "Assisted living"}</span><span className="text-sm tracking-[.15em] text-plum">★★★★★</span></div><p className="mt-12 font-display text-[1.65rem] leading-[1.02] tracking-[-.04em] text-plum">“{review.quote}”</p><div className="mt-auto border-t border-plum/10 pt-5 text-xs text-plum/60"><b className="text-plum">{review.author}</b> · {review.place}</div></article>)}</div><div className="mt-6 flex justify-center gap-2 lg:hidden"><button onClick={() => setReviewIndex(Math.max(0, reviewIndex - 1))} className="flex h-9 w-9 items-center justify-center rounded-full border border-plum/15"><ChevronLeft size={16} /></button><span className="flex items-center px-2 text-xs text-muted">{reviewIndex + 1} / 3</span><button onClick={() => setReviewIndex(Math.min(2, reviewIndex + 1))} className="flex h-9 w-9 items-center justify-center rounded-full border border-plum/15"><ChevronRight size={16} /></button></div></div>
          </div>
        </section>

        <section id="faq" className="bg-cream-warm px-6 py-24 sm:px-10 lg:px-14 lg:py-32">
          <div className="mx-auto grid max-w-[1100px] gap-14 lg:grid-cols-[.8fr_1.2fr] lg:gap-24"><div><span className="eyebrow">A little clarity</span><SerifHeading className="mt-5 text-plum">Questions, <em className="font-normal text-coral">answered.</em></SerifHeading><p className="mt-6 max-w-xs text-sm leading-6 text-muted">We know choosing care can feel like a lot. Start here, then call us for a conversation shaped around your family.</p><a href="tel:+917411206633" className="mt-8 inline-flex items-center gap-2 rounded-full bg-plum px-5 py-3 text-xs font-bold text-white transition hover:bg-plum-light"><Phone size={14} /> Speak with our team</a></div><div className="divide-y divide-plum/10 border-y border-plum/10">{faqs.map((faq, index) => <div key={faq.q}><button onClick={() => setActiveFaq(activeFaq === index ? -1 : index)} className="flex w-full items-center justify-between gap-5 py-5 text-left"><span className="font-display text-[1.35rem] leading-[1.05] tracking-[-.025em] text-plum sm:text-[1.55rem]">{faq.q}</span><span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-plum/15 transition ${activeFaq === index ? "rotate-180 bg-plum text-lime" : "text-plum"}`}><ChevronDown size={16} /></span></button><div className={`faq-answer grid transition-[grid-template-rows,opacity] duration-300 ${activeFaq === index ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0"}`}><p className="min-h-0 overflow-hidden pr-12 text-sm leading-6 text-muted">{faq.a}</p></div></div>)}</div></div>
        </section>

        <section id="visit" className="relative bg-cream px-6 py-24 sm:px-10 lg:px-14 lg:py-36">
          <div className="pointer-events-none absolute right-0 top-10 h-64 w-64 rounded-full bg-lime/30 blur-3xl" />
          <div className="relative mx-auto grid max-w-[1240px] gap-14 lg:grid-cols-[.82fr_1.18fr] lg:gap-24">
            <div><span className="eyebrow">Come see for yourself</span><SerifHeading className="mt-5 max-w-lg text-plum">Visit Aarra Springs & <em className="font-normal text-coral">feel at home.</em></SerifHeading><p className="mt-6 max-w-md text-sm leading-6 text-muted">A quiet campus, a warm welcome, and a care conversation with no pressure attached.</p><div className="mt-10 space-y-5 text-sm text-plum/70"><div className="flex gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-lime text-plum"><HomeIcon size={16} /></span><span><b className="block text-plum">Aarra Springs</b>NH 648 Chikka Tirupathi, Near Whitefield,<br />Anchemuskur, Karnataka 563160</span></div><div className="flex gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-lime text-plum"><Phone size={16} /></span><a href="tel:+917411206633" className="pt-2 hover:text-coral">+91 74112 06633</a></div><div className="flex gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-lime text-plum">@</span><a href="mailto:life@aarra.in" className="pt-2 hover:text-coral">life@aarra.in</a></div></div><div className="mt-12 overflow-hidden rounded-[24px] border-8 border-white shadow-[0_18px_50px_rgba(42,16,32,.1)]"><img src={images.garden} alt="Serene landscaped gardens and walking paths" className="aspect-[1.8] w-full object-cover" loading="lazy" /></div></div>
            <div className="rounded-[28px] bg-plum p-6 text-white shadow-[0_20px_60px_rgba(42,16,32,.18)] sm:p-9"><div className="flex items-center justify-between border-b border-white/10 pb-6"><div><span className="text-[10px] font-bold uppercase tracking-[.16em] text-lime">Let’s make a plan</span><h3 className="mt-2 font-display text-3xl tracking-[-.04em]">Book a campus tour</h3></div><span className="hidden h-12 w-12 items-center justify-center rounded-full bg-white/10 text-lime sm:flex"><ArrowDownRight size={21} /></span></div>{formSent ? <div className="flex min-h-[430px] flex-col items-center justify-center text-center"><span className="flex h-16 w-16 items-center justify-center rounded-full bg-lime text-plum"><Check size={30} strokeWidth={3} /></span><h3 className="mt-6 font-display text-4xl tracking-[-.04em]">We&apos;ll be in touch.</h3><p className="mt-3 max-w-sm text-sm leading-6 text-white/60">Thank you for reaching out. Our care team will call you shortly to confirm your tour.</p><button onClick={() => setFormSent(false)} className="mt-7 text-xs font-bold uppercase tracking-[.13em] text-lime underline underline-offset-4">Send another request</button></div> : <form onSubmit={handleSubmit} className="mt-7 space-y-5"><div className="grid gap-5 sm:grid-cols-2"><Field label="First name" placeholder="Anita" required /><Field label="Last name" placeholder="Sharma" required /></div><div className="grid gap-5 sm:grid-cols-2"><Field label="Email address" placeholder="anita@email.com" type="email" required /><Field label="Phone number" placeholder="+91 98 0000 0000" type="tel" required /></div><div className="grid gap-5 sm:grid-cols-2"><SelectField label="Care required" options={["Independent", "Assisted", "Nursing", "Memory care"]} /><SelectField label="Room preference" options={["Small studio", "Large studio", "Shared room"]} /></div><div className="grid gap-5 sm:grid-cols-2"><Field label="Preferred visit date" type="date" required /><Field label="Preferred time" type="time" required /></div><button type="submit" className="mt-3 flex w-full items-center justify-center rounded-full bg-lime px-5 py-4 text-sm font-bold text-plum transition hover:bg-[#e5ed7a] active:scale-[0.99]">Request free consultation & tour <ArrowRight className="ml-2" size={17} /></button><p className="text-center text-[10px] text-white/35">No obligation. Just a warm conversation about what would help.</p></form>}</div>
          </div>
        </section>
      </main>

      <footer className="bg-plum px-6 pb-28 pt-14 text-white sm:px-10 sm:pb-14 lg:px-14"><div className="mx-auto flex max-w-[1240px] flex-col justify-between gap-10 border-b border-white/10 pb-10 md:flex-row md:items-end"><div><Logo /><p className="mt-5 max-w-xs text-sm leading-6 text-white/50">A more considered way to live, care, and grow older together.</p></div><div className="grid grid-cols-2 gap-x-10 gap-y-3 text-xs font-semibold uppercase tracking-[.1em] text-white/55 sm:flex sm:gap-7"><button onClick={() => scrollToId("services")} className="text-left hover:text-lime">Services</button><button onClick={() => scrollToId("pricing")} className="text-left hover:text-lime">Pricing</button><button onClick={() => scrollToId("reviews")} className="text-left hover:text-lime">Reviews</button><button onClick={() => scrollToId("visit")} className="text-left hover:text-lime">Contact</button></div></div><div className="mx-auto flex max-w-[1240px] flex-col justify-between gap-3 pt-7 text-[10px] uppercase tracking-[.12em] text-white/30 sm:flex-row"><span>© 2024 Aarra Communities</span><span>Made with care in Bengaluru</span></div></footer>

      <a href="https://api.whatsapp.com/send?phone=917411206633&text=Hi%20Aarra%20team,%20I%20would%20like%20to%20inquire%20about%20senior%20living%20options." target="_blank" rel="noreferrer" className="fixed bottom-5 right-5 z-30 flex items-center gap-2 rounded-full bg-[#1d9e62] px-4 py-3 text-xs font-bold text-white shadow-xl shadow-[#1d9e62]/20 transition hover:-translate-y-0.5 sm:bottom-7 sm:right-7"><MessageCircle size={16} fill="currentColor" /> <span className="hidden sm:inline">Chat with care team</span></a>
      <div className="fixed inset-x-3 bottom-3 z-20 grid grid-cols-2 gap-2 rounded-2xl border border-plum/10 bg-white/90 p-2 shadow-2xl backdrop-blur-md sm:hidden"><a href="tel:+917411206633" className="flex items-center justify-center gap-2 rounded-xl bg-cream-warm py-3 text-xs font-bold text-plum"><Phone size={15} /> Call now</a><button onClick={() => scrollToId("visit")} className="rounded-xl bg-plum py-3 text-xs font-bold text-lime">Book tour</button></div>

      {tourOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-plum/80 p-5 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Campus tour preview"><div className="relative w-full max-w-3xl overflow-hidden rounded-[28px] border border-white/15 bg-plum shadow-2xl"><button onClick={() => setTourOpen(false)} className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white" aria-label="Close tour preview"><X size={18} /></button><div className="grid lg:grid-cols-[1.1fr_.9fr]"><div className="relative"><img src={images.garden} alt="Aarra Springs campus garden preview" className="h-full min-h-[280px] w-full object-cover" /><div className="absolute inset-0 flex items-center justify-center bg-plum/25"><div className="flex h-16 w-16 items-center justify-center rounded-full bg-lime text-plum shadow-2xl"><Play size={25} fill="currentColor" /></div></div></div><div className="p-7 text-white sm:p-9"><span className="eyebrow eyebrow-light">Campus tour</span><h3 className="mt-5 font-display text-4xl leading-[.95] tracking-[-.05em]">Come see the everyday magic.</h3><p className="mt-5 text-sm leading-6 text-white/60">Take a quiet walk through our gardens, studios, dining spaces, and places to pause. The best way to understand Aarra is to experience how it feels.</p><button onClick={() => { setTourOpen(false); scrollToId("visit"); }} className="mt-8 rounded-full bg-lime px-5 py-3 text-xs font-bold text-plum">Book an in-person tour <ArrowRight className="ml-2 inline" size={15} /></button></div></div></div></div>}
    </div>
  );
}

function StarIcon() {
  return <span className="text-[15px]">★</span>;
}

function Field({ label, placeholder, type = "text", required = false }: { label: string; placeholder?: string; type?: string; required?: boolean }) {
  return <label className="block"><span className="mb-2 block text-[10px] font-bold uppercase tracking-[.13em] text-white/45">{label}</span><input required={required} type={type} placeholder={placeholder} className="w-full rounded-xl border border-white/10 bg-white/7 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-lime/70 focus:bg-white/10" /></label>;
}

function SelectField({ label, options }: { label: string; options: string[] }) {
  return <label className="block"><span className="mb-2 block text-[10px] font-bold uppercase tracking-[.13em] text-white/45">{label}</span><select defaultValue={options[0]} className="w-full appearance-none rounded-xl border border-white/10 bg-[#452039] px-4 py-3 text-sm text-white outline-none transition focus:border-lime/70">{options.map((option) => <option key={option}>{option}</option>)}</select></label>;
}
