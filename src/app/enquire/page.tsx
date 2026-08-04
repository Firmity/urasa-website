import type { Metadata } from "next";
import { Process } from "@/components/process";
import { Contact } from "@/components/contact";
import { JsonLd } from "@/components/json-ld";
import { enquireSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Enquire & Request a Tasting — Urasa Catering",
  description:
    "Planning an event? Share your date, headcount, and occasion to request a tasting or book Urasa for corporate, wedding, or private catering.",
  alternates: { canonical: "/enquire" },
  openGraph: {
    type: "website",
    url: "/enquire",
    title: "Enquire & Request a Tasting — Urasa",
    description:
      "Tell us your event date, headcount, and occasion — we'll take care of the rest.",
    images: ["/food/tomato-basil-pasta.webp"],
  },
};

export default function EnquirePage() {
  return (
    <>
      <JsonLd data={enquireSchema()} />
      <Process />
      <Contact />
    </>
  );
}
