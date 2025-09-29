import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-12 md:py-16">
      <h2 className="text-center text-3xl font-semibold md:text-4xl">
        Pertanyaan Umum
      </h2>
      <Accordion type="single" collapsible className="mt-6">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            Area layanan KilatLaundry di mana saja?
          </AccordionTrigger>
          <AccordionContent>
            Saat ini kami melayani area inti di kota-kota besar. Masukkan alamat
            Anda saat memesan untuk memastikan ketersediaan.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Berapa estimasi waktu pengerjaan?</AccordionTrigger>
          <AccordionContent>
            Reguler 48 jam, Ekspres 24 jam. Beberapa item khusus mungkin
            membutuhkan waktu tambahan.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Bagaimana cara pembayaran?</AccordionTrigger>
          <AccordionContent>
            Kami mendukung pembayaran non-tunai populer dan transfer bank.
            Tagihan tersedia setelah berat ditimbang.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
