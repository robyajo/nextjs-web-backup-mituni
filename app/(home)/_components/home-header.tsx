"use client";
import React from "react";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { ModeToggle } from "@/components/mode-toggle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Facebook,
  Instagram,
  Menu,
  Phone,
  Shirt,
  Sparkles,
  Twitter,
  Truck,
  Zap,
  HelpCircle,
  BookOpenCheck,
} from "lucide-react";

export default function HomeHeader() {
  const { data: session } = useSession();
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="@container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg ">
              <Image
                src="/assets/logo.png"
                alt="Logo"
                width={32}
                height={32}
                className="h-8 w-8"
                priority
              />
            </div>
            <span className="text-xl font-bold ">
              {process.env.NEXT_PUBLIC_APP_NAME}
            </span>
          </div>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Layanan</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="#layanan"
                        >
                          <Shirt className="h-6 w-6" />
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Layanan Laundry
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Berbagai pilihan layanan laundry untuk kebutuhan
                            Anda
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          href="#layanan"
                        >
                          <div className="text-sm font-medium leading-none">
                            Cuci Reguler
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Layanan cuci standar untuk pakaian sehari-hari
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          href="#layanan"
                        >
                          <div className="text-sm font-medium leading-none">
                            Dry Cleaning
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Perawatan khusus untuk pakaian premium
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          href="#layanan"
                        >
                          <div className="text-sm font-medium leading-none">
                            Express Service
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Layanan kilat selesai dalam 6 jam
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="#"
                  className={navigationMenuTriggerStyle()}
                >
                  Harga
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="#testimoni"
                  className={navigationMenuTriggerStyle()}
                >
                  Testimoni
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Bantuan</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          href="#kontak"
                        >
                          <div className="text-sm font-medium leading-none">
                            Customer Service
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Hubungi tim support kami 24/7
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          href="#"
                        >
                          <div className="text-sm font-medium leading-none">
                            FAQ
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Pertanyaan yang sering diajukan
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          href="#"
                        >
                          <div className="text-sm font-medium leading-none">
                            Cara Pemesanan
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Panduan lengkap cara memesan
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          href="#"
                        >
                          <div className="text-sm font-medium leading-none">
                            Area Layanan
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Cek area yang kami layani
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <ModeToggle />
            </div>
            {session ? (
              <Button variant="ghost" asChild className="hidden md:inline-flex">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button
                  variant="ghost"
                  asChild
                  className="hidden md:inline-flex"
                >
                  <Link href="/login">Masuk</Link>
                </Button>
                <Button asChild className="hidden md:inline-flex">
                  <Link href="/login">Daftar Sekarang</Link>
                </Button>
              </>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="flex items-center space-x-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-lg ">
                      <Image
                        src="/assets/logo.png"
                        alt="Logo"
                        width={24}
                        height={24}
                        className="h-6 w-6"
                        priority
                      />
                    </div>
                    <span className="text-lg font-bold text-primary">
                      {process.env.NEXT_PUBLIC_APP_NAME}
                    </span>
                  </SheetTitle>
                  <SheetDescription>
                    Layanan laundry premium untuk kemudahan hidup Anda
                  </SheetDescription>
                </SheetHeader>

                <div className="py-6 px-4">
                  <Accordion type="multiple" className="w-full">
                    <AccordionItem value="layanan">
                      <AccordionTrigger className="text-base font-medium">
                        Layanan
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid gap-2 pl-2">
                          <Link
                            href="#layanan"
                            className="flex items-center space-x-3 rounded-md p-3 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                          >
                            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 p-1">
                              <Shirt className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium">Cuci Reguler</div>
                              <div className="text-xs text-muted-foreground">
                                Rp 5.000/kg
                              </div>
                            </div>
                          </Link>
                          <Link
                            href="#layanan"
                            className="flex items-center space-x-3 rounded-md p-3 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                          >
                            <Sparkles className="h-4 w-4" />
                            <div>
                              <div className="font-medium">Dry Cleaning</div>
                              <div className="text-xs text-muted-foreground">
                                Pakaian premium
                              </div>
                            </div>
                          </Link>
                          <Link
                            href="#layanan"
                            className="flex items-center space-x-3 rounded-md p-3 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                          >
                            <Zap className="h-4 w-4" />
                            <div>
                              <div className="font-medium">Express Service</div>
                              <div className="text-xs text-muted-foreground">
                                Selesai 6 jam
                              </div>
                            </div>
                          </Link>
                          <Link
                            href="#layanan"
                            className="flex items-center space-x-3 rounded-md p-3 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                          >
                            <Truck className="h-4 w-4" />
                            <div>
                              <div className="font-medium">
                                Pickup & Delivery
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Gratis antar jemput
                              </div>
                            </div>
                          </Link>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="menu">
                      <AccordionTrigger className="text-base font-medium">
                        Menu
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid gap-2 pl-2">
                          <Link
                            href="#"
                            className="flex items-center space-x-3 rounded-md p-3 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                          >
                            <span>Harga</span>
                          </Link>
                          <Link
                            href="#testimoni"
                            className="flex items-center space-x-3 rounded-md p-3 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                          >
                            <span>Testimoni</span>
                          </Link>
                          <Link
                            href="#kontak"
                            className="flex items-center space-x-3 rounded-md p-3 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                          >
                            <span>Kontak</span>
                          </Link>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="bantuan">
                      <AccordionTrigger className="text-base font-medium">
                        Bantuan
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid gap-2 pl-2">
                          <Link
                            href="#"
                            className="flex items-center space-x-3 rounded-md p-3 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                          >
                            <Phone className="h-4 w-4" />
                            <span>Customer Service</span>
                          </Link>
                          <Link
                            href="#"
                            className="flex items-center space-x-3 rounded-md p-3 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                          >
                            <HelpCircle className="h-4 w-4" />
                            <span>FAQ</span>
                          </Link>
                          <Link
                            href="#"
                            className="flex items-center space-x-3 rounded-md p-3 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                          >
                            <BookOpenCheck className="h-4 w-4" />
                            <span>Cara Pemesanan</span>
                          </Link>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                <div className="border-t pt-6 px-4">
                  <div className="grid gap-2">
                    {session ? (
                      <Button asChild className="w-full">
                        <Link href="/dashboard">Dashboard</Link>
                      </Button>
                    ) : (
                      <>
                        <Button asChild className="w-full">
                          <Link href="/login">Daftar Sekarang</Link>
                        </Button>
                        <Button
                          variant="outline"
                          asChild
                          className="w-full bg-transparent"
                        >
                          <Link href="/login">Masuk</Link>
                        </Button>
                      </>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center space-x-4">
                      <Button size="icon" variant="ghost">
                        <Instagram className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <Facebook className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <Twitter className="h-4 w-4" />
                      </Button>
                    </div>
                    <ModeToggle />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}
