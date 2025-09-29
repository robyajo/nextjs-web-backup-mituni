import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Recycle, Truck, ShieldCheck } from "lucide-react";

const list = [
  {
    icon: <Truck className="h-6 w-6 text-primary" />,
    title: "Antar-Jemput",
    desc: "Kurir kami menjemput dan mengantar kembali pakaian Anda tepat waktu.",
  },
  {
    icon: <Clock className="h-6 w-6 text-primary" />,
    title: "Cepat & Tepat",
    desc: "Opsi ekspres 24 jam untuk kebutuhan mendesak.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-primary" />,
    title: "Aman & Terlindungi",
    desc: "Proses terstandarisasi dengan kontrol kualitas ketat.",
  },
  {
    icon: <Recycle className="h-6 w-6 text-primary" />,
    title: "Ramah Lingkungan",
    desc: "Detergen ramah lingkungan dan efisiensi penggunaan air.",
  },
];

export function Features() {
  return (
    <section id="features" className="border-t bg-secondary">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <header className="mb-8 text-center">
          <h2 className="text-3xl font-semibold md:text-4xl">
            Kenapa KilatLaundry?
          </h2>
          <p className="mt-2 text-muted-foreground">
            Fokus pada aktivitas Anda, biarkan kami yang mengurus cucian.
          </p>
        </header>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((f) => (
            <Card key={f.title} className="h-full">
              <CardHeader>
                <div className="mb-2">{f.icon}</div>
                <CardTitle className="text-lg">{f.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {f.desc}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
