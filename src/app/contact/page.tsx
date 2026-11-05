import type { Metadata } from "next";
import ContactView from "@/components/contact/ContactView";

export const metadata: Metadata = {
  title: "Contact | Kushtrimi NM Worldwide",
  description:
    "Message us on WhatsApp, call us or visit our office in Gjakovë. We will help you find the right trip.",
};

export default function ContactPage() {
  return (
    <main className="bg-black text-white">
      <ContactView />
    </main>
  );
}