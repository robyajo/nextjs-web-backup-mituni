'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Shirt } from 'lucide-react';
import { Button } from '../ui/Button';

const navItems = [
  { name: 'Fitur', href: '#features' },
  { name: 'Keuntungan', href: '#benefits' },
  { name: 'Harga', href: '#pricing' },
  { name: 'Testimoni', href: '#testimonials' },
];

type HeaderProps = {
  scrolled?: boolean;
};

export function Header({ scrolled = false }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    const handleRouteChange = () => {
      setIsOpen(false);
    };

    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <Shirt className="w-5 h-5 text-white" />
            </div>
            <span
              className={`text-xl font-bold ${
                scrolled ? 'text-gray-900' : 'text-gray-900'
              }`}
            >
              LaundryPOS
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`font-medium transition-colors hover:text-teal-500 ${
                  scrolled ? 'text-gray-700' : 'text-gray-700'
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="outline" size="sm">
              Masuk
            </Button>
            <Button variant="gradient" size="sm">
              Daftar Gratis
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X
                className={`w-6 h-6 ${
                  scrolled ? 'text-gray-900' : 'text-gray-900'
                }`}
              />
            ) : (
              <Menu
                className={`w-6 h-6 ${
                  scrolled ? 'text-gray-900' : 'text-gray-900'
                }`}
              />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden bg-white border-t border-gray-200"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="py-4 space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block py-2 text-gray-700 hover:text-teal-500 px-6"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                <div className="flex flex-col gap-3 pt-4 px-6">
                  <Button variant="outline" size="sm" className="w-full">
                    Masuk
                  </Button>
                  <Button variant="gradient" size="sm" className="w-full">
                    Daftar Gratis
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
