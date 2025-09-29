"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronUp } from "lucide-react";

// Import Components
import Navigation from "./_patrial/c-header";
import Hero from "./_patrial/s-hero";
import Features from "./_patrial/s-feature";
import Benefits from "./_patrial/s-benefits";
import Pricing from "./_patrial/s-pricing";
import Testimonials from "./_patrial/s-testi";
import CTA from "./_patrial/s-cta";
import Footer from "./_patrial/c-footer";

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        <Hero />
        <Features />
        <Benefits />
        <Pricing />
        <Testimonials />
        <CTA />
      </main>
      <Footer />

      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-teal-500 text-white w-12 h-12 rounded-full shadow-lg z-50 transition-all duration-300 ${
          showScrollTop ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: showScrollTop ? 1 : 0 }}
      >
        <ChevronUp className="w-6 h-6 mx-auto" />
      </motion.button>
    </div>
  );
}
