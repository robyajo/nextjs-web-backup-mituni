import Link from "next/link";
import { Wallet, Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Instagram, Facebook, Twitter } from "lucide-react";
import { Shirt } from "lucide-react";

export function HomeFooter() {
  return (
    <footer id="kontak" className="bg-muted py-16">
      <div className="@container px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg ">
                <Image
                  src="/assets/logo.png"
                  alt="Logo"
                  width={32}
                  height={32}
                  className="h-8 w-8"
                />
              </div>
              <span className="text-xl font-bold ">{`${process.env.NEXT_PUBLIC_APP_NAME}`}</span>
            </div>
            <p className="text-muted-foreground">
              Layanan laundry premium dengan teknologi modern untuk kemudahan
              hidup Anda.
            </p>
            <div className="flex space-x-4">
              <Button size="icon" variant="ghost" asChild>
                <Link
                  href={`https://instagram.com/${process.env.NEXT_PUBLIC_APP_NAME}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">
                    Instagram ${process.env.NEXT_PUBLIC_APP_NAME}
                  </span>
                </Link>
              </Button>
              <Button size="icon" variant="ghost" asChild>
                <Link
                  href={`https://facebook.com/${process.env.NEXT_PUBLIC_APP_NAME}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">
                    Facebook ${process.env.NEXT_PUBLIC_APP_NAME}
                  </span>
                </Link>
              </Button>
              <Button size="icon" variant="ghost" asChild>
                <Link
                  href={`https://twitter.com/${process.env.NEXT_PUBLIC_APP_NAME}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">
                    Twitter ${process.env.NEXT_PUBLIC_APP_NAME}
                  </span>
                </Link>
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Layanan</h3>
            <div className="space-y-2">
              <Link
                href="#layanan"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Cuci Reguler
              </Link>
              <Link
                href="#layanan"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Dry Cleaning
              </Link>
              <Link
                href="#layanan"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Express Service
              </Link>
              <Link
                href="#layanan"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Pickup & Delivery
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Perusahaan</h3>
            <div className="space-y-2">
              <Link
                href={`${process.env.NEXT_PUBLIC_APP_URL}`}
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Tentang Kami
              </Link>
              <Link
                href={`${process.env.NEXT_PUBLIC_APP_URL}`}
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Karir
              </Link>
              <Link
                href={`${process.env.NEXT_PUBLIC_APP_URL}`}
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Blog
              </Link>
              <Link
                href={`${process.env.NEXT_PUBLIC_APP_URL}`}
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Mitra
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Kontak</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <Link
                  href="tel:+6281234567890"
                  className="hover:text-foreground transition-colors"
                >
                  +62 812-3456-7890
                </Link>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <Link
                  href={`mailto:${process.env.NEXT_PUBLIC_APP_EMAIL}`}
                  className="hover:text-foreground transition-colors"
                >
                  {process.env.NEXT_PUBLIC_APP_EMAIL}
                </Link>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Jakarta, Indonesia</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} {process.env.NEXT_PUBLIC_APP_NAME}.
            Semua hak dilindungi.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href={`${process.env.NEXT_PUBLIC_APP_URL}`}
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Kebijakan Privasi
            </Link>
            <Link
              href={`${process.env.NEXT_PUBLIC_APP_URL}`}
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Syarat & Ketentuan
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
