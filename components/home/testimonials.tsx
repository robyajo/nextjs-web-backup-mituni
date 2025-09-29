import { Card, CardContent } from "@/components/ui/card";

const items = [
  {
    quote:
      "Penjemputan tepat waktu, pakaian rapi, wangi, dan kembali esoknya. Hidup jadi jauh lebih praktis!",
    name: "Rina, Jakarta",
  },
  {
    quote: "Langganan keluarga kami. Harga masuk akal dan pelayanannya ramah.",
    name: "Dedi, Bandung",
  },
  {
    quote: "Akhirnya nggak pusing cucian numpuk. Tinggal klik, kurir datang.",
    name: "Maya, Surabaya",
  },
];

export function Testimonials() {
  return (
    <section className="border-t bg-secondary">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <h2 className="text-center text-3xl font-semibold md:text-4xl">
          Apa kata mereka
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {items.map((t) => (
            <Card key={t.name}>
              <CardContent className="p-6">
                <p className="text-pretty">“{t.quote}”</p>
                <p className="mt-4 text-sm font-medium text-muted-foreground">
                  — {t.name}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
