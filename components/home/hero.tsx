import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section id="cta" className="mx-auto max-w-6xl px-4 pb-12 pt-10 md:pb-14 ">
      <div className="mx-auto max-w-3xl text-center">
        <span className="mb-3 inline-block rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
          Antar-jemput cepat • Garansi bersih
        </span>
        <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-6xl">
          Laundry bersih, cepat, dan tanpa ribet
        </h1>
        <p className="mt-4 text-pretty text-muted-foreground md:text-lg">
          Pesan penjemputan dalam hitungan detik. Kami urus sisanya—dari cuci,
          kering, setrika, hingga pengantaran kembali.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg">Pesan Penjemputan</Button>
          <Button size="lg" className="sm:ml-1">
            Lihat Cara Kerja
          </Button>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Tanpa biaya pendaftaran. Bisa batal kapan saja.
        </p>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <img
          src="/kurir-menjemput-laundry.jpg"
          alt="Kurir menjemput pakaian pelanggan"
          className="h-full w-full rounded-lg border object-cover"
        />
        <img
          src="/proses-pencucian-profesional.jpg"
          alt="Proses pencucian profesional"
          className="hidden h-full w-full rounded-lg border object-cover sm:block"
        />
        <img
          src="/paket-laundry-diantar.jpg"
          alt="Paket laundry diantar kembali"
          className="hidden h-full w-full rounded-lg border object-cover sm:block"
        />
      </div>
    </section>
  );
}
