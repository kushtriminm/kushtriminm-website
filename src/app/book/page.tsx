import type { Metadata } from "next";
import RequestForm from "@/components/booking/RequestForm";

export const metadata: Metadata = {
  title: "Rezervo | Kushtrimi NM Worldwide",
  description:
    "Zgjidh destinacionin, hotelin dhe datat, dhe kërko ofertë. Çmimet dhe vendet e lira i konfirmojmë ne në WhatsApp.",
};

export default function BookPage() {
  return (
    <main className="bg-black px-4 pb-24 pt-28 text-white sm:px-5 sm:pt-32">
      <div className="mx-auto max-w-6xl">
        <RequestForm />
      </div>
    </main>
  );
}