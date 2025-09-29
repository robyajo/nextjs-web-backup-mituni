import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <header className="mb-8 text-center">
        <h2 className="text-3xl font-semibold md:text-4xl">Harga Transparan</h2>
        <p className="mt-2 text-muted-foreground">
          Bayar sesuai kebutuhan. Tanpa biaya tersembunyi.
        </p>
      </header>
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-xl">Cuci Kiloan</CardTitle>
            <p className="text-muted-foreground">
              Cocok untuk kebutuhan harian
            </p>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">
            Rp 10.000
            <span className="text-base font-normal text-muted-foreground">
              /kg
            </span>
          </CardContent>
          <CardFooter className="mt-auto">
            <Button className="w-full">Pesan Sekarang</Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col border-primary">
          <CardHeader>
            <span className="inline-block rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
              Terlaris
            </span>
            <CardTitle className="mt-2 text-xl">Ekspres 24 Jam</CardTitle>
            <p className="text-muted-foreground">Selesai di hari berikutnya</p>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">
            Rp 18.000
            <span className="text-base font-normal text-muted-foreground">
              /kg
            </span>
          </CardContent>
          <CardFooter className="mt-auto">
            <Button className="w-full">Pilih Paket</Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-xl">Langganan Bulanan</CardTitle>
            <p className="text-muted-foreground">Hemat untuk keluarga</p>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">
            Rp 299.000
            <span className="text-base font-normal text-muted-foreground">
              /bulan
            </span>
          </CardContent>
          <CardFooter className="mt-auto">
            <Button className="w-full">Hubungi Sales</Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
