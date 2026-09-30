import { Home as HomeIcon, BedDouble, Stethoscope, Brain } from "lucide-react";
import type { ReactNode } from "react";

export interface CarePlan {
  label: string;
  title: string;
  price: number;
  suffix: string;
  tone: "lime" | "sand" | "sky" | "blush";
  icon: ReactNode;
  description: string;
  features: string[];
}

export const carePlans: CarePlan[] = [
  {
    label: "Independent living",
    title: "1 BHK Small Studio",
    price: 30000,
    suffix: "/ month",
    tone: "lime",
    icon: <HomeIcon size={21} strokeWidth={1.7} />,
    description: "An easy, independent rhythm with the comfort of community close by.",
    features: [
      "Fully furnished studio",
      "Housekeeping & security",
      "3 vegetarian meals + tea",
      "Anti-skid bathroom",
    ],
  },
  {
    label: "Independent living",
    title: "1 BHK Large Studio",
    price: 34000,
    suffix: "/ month",
    tone: "sand",
    icon: <BedDouble size={21} strokeWidth={1.7} />,
    description: "More room to settle in, host family, and make each day your own.",
    features: [
      "Spacious 1 BHK layout",
      "Workspace corner",
      "Balcony garden view",
      "Parking & studio amenities",
    ],
  },
  {
    label: "Daily assistance",
    title: "Assisted Care Facility",
    price: 45000,
    suffix: "/ month",
    tone: "sky",
    icon: <Stethoscope size={21} strokeWidth={1.7} />,
    description: "Thoughtful daily support that protects independence while adding confidence.",
    features: [
      "Complete ADL support",
      "Medication tracking",
      "24/7 nurse monitoring",
      "Personal care routines",
    ],
  },
  {
    label: "Intensive & rehab",
    title: "Memory & Critical Care",
    price: 65000,
    suffix: "/ month",
    tone: "blush",
    icon: <Brain size={21} strokeWidth={1.7} />,
    description: "Specialist support for recovery, memory care, and more complex needs.",
    features: [
      "Stroke recovery therapies",
      "Dementia-safe ward",
      "High staff-to-resident ratio",
      "Nursing & rehab oversight",
    ],
  },
];

export const faqs = [
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

export const testimonials = [
  {
    quote:
      "A warm, safe, and supportive environment where senior citizens can live comfortably and happily, surrounded by care and companionship.",
    author: "Harish S.",
    place: "Bengaluru",
    tone: "blush" as const,
    tag: "Assisted living",
  },
  {
    quote:
      "This is an amazing place for senior citizens to enjoy their golden years. I like this place because of the services provided. I would wholeheartedly advise senior citizens to be a part of the Aarra family.",
    author: "Niranjan Nayak",
    place: "Bengaluru",
    tone: "lime" as const,
    tag: "Assisted living",
  },
  {
    quote:
      "A beautiful location surrounded by greenery, offering a peaceful and refreshing atmosphere for seniors to relax and feel at home.",
    author: "Arun",
    place: "Bengaluru",
    tone: "sand" as const,
    tag: "Independent living",
  },
  {
    quote:
      "Moving my mother to Aarra was the hardest decision our family made — and the best one. She's made friends, rejoined her morning walks, and laughs more on the phone than she has in years.",
    author: "Lakshmi V.",
    place: "Whitefield",
    tone: "sky" as const,
    tag: "Assisted living",
  },
  {
    quote:
      "The nursing team noticed subtle changes in my father's health before we even did. That kind of attention simply cannot be matched at home.",
    author: "Ramesh K.",
    place: "Bengaluru",
    tone: "blush" as const,
    tag: "Memory care",
  },
  {
    quote:
      "Delicious food, spotless rooms, and a calendar full of activities. My aunt calls it her resort — with better company.",
    author: "Meera & family",
    place: "Bengaluru",
    tone: "sand" as const,
    tag: "Independent living",
  },
  {
    quote:
      "As an only child living abroad, the daily updates and video calls give me something I hadn't felt in years: peace of mind.",
    author: "Anand P.",
    place: "Singapore",
    tone: "lime" as const,
    tag: "Assisted living",
  },
  {
    quote:
      "The gardens and evening walks remind me of our family home. Here, I don't feel like a patient. I feel like myself.",
    author: "Sita Devi",
    place: "Bengaluru",
    tone: "sky" as const,
    tag: "Independent living",
  },
];
