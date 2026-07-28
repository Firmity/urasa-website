import type { Metadata } from "next";
import { Process } from "@/components/process";
import { Contact } from "@/components/contact";

export const metadata: Metadata = {
  title: "Enquire — Urasa",
  description:
    "Start an enquiry with Urasa — tell us your date, headcount, and occasion, and see how a booking comes together from first enquiry to final course.",
};

export default function EnquirePage() {
  return (
    <>
      <Process />
      <Contact />
    </>
  );
}
