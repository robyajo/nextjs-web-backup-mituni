import { motion } from "framer-motion";
import {
  Shirt,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MapPin,
  Mail,
} from "lucide-react";
import Image from "next/image";

const Footer = () => {
  const footerLinks = {
    product: [
      { name: "Fitur", href: "#features" },
      { name: "Harga", href: "#pricing" },
      { name: "Demo", href: "#" },
      { name: "Mobile App", href: "#" },
    ],
    company: [
      { name: "Tentang Kami", href: "#" },
      { name: "Karir", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Press Kit", href: "#" },
    ],
    support: [
      { name: "Help Center", href: "#" },
      { name: "Kontak", href: "#" },
      { name: "Status", href: "#" },
      { name: "API Docs", href: "#" },
    ],
    legal: [
      { name: "Privacy", href: "#" },
      { name: "Terms", href: "#" },
      { name: "Security", href: "#" },
      { name: "GDPR", href: "#" },
    ],
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="/assets/logo.png"
                alt="Logo"
                width={20}
                height={20}
                className="w-8 h-8"
              />
              <span className="text-xl font-bold">
                {process.env.NEXT_PUBLIC_APP_NAME}
              </span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Sistem kasir laundry modern yang membantu Anda mengelola bisnis
              dengan lebih efisien dan profitable.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-teal-600 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-teal-600 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-teal-600 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-teal-600 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4 text-teal-500">Produk</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-teal-500">Perusahaan</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-teal-500">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-teal-500">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 LaundryPOS. All rights reserved.
          </p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <MapPin className="w-4 h-4" />
              Jakarta, Indonesia
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Mail className="w-4 h-4" />
              hello@laundrypos.com
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
