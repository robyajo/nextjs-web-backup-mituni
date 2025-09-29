import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Shirt, Rocket, Play, Check, TrendingUp } from "lucide-react";
import Image from "next/image";

const Hero = () => {
  const stats = [
    { value: "1000+", label: "Pengguna Aktif" },
    { value: "4.9/5", label: "Rating Pengguna" },
    { value: "24/7", label: "Support" },
  ];

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-teal-50">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 25% 25%, rgba(20, 184, 166, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 75% 75%, rgba(20, 184, 166, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 25% 75%, rgba(20, 184, 166, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 75% 25%, rgba(20, 184, 166, 0.1) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-teal-500/10 rounded-full blur-xl"
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-xl"
        animate={{
          y: [0, 20, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Badge className="mb-4">
                <Shirt className="w-4 h-4 mr-1" />
                Solusi Kasir #1 untuk Laundry
              </Badge>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Sistem Kasir Laundry{" "}
              <span className="bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                Modern & Cerdas
              </span>
            </h1>

            <motion.p
              className="text-xl text-gray-600 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Kelola bisnis laundry Anda dengan mudah, cepat, dan efisien. Dari
              pemesanan hingga pembayaran, semuanya dalam satu platform yang
              powerful dan user-friendly.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Button variant="default" size="lg" className="min-w-[200px]">
                <Rocket className="mr-2 w-5 h-5" />
                Mulai Gratis
              </Button>
              <Button variant="outline" size="lg" className="min-w-[200px]">
                <Play className="mr-2 w-5 h-5" />
                Lihat Demo
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="flex flex-wrap gap-8 pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1 + index * 0.1, type: "spring" }}
                >
                  <p className="text-3xl lg:text-4xl font-bold text-teal-500">
                    {stat.value}
                  </p>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="relative"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-3xl transform rotate-3 blur-xl opacity-20"></div>
                <Image
                  width={735}
                  height={500}
                  src="https://plus.unsplash.com/premium_vector-1734342412960-ef817c1275d9?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="LaundryPOS Dashboard"
                  className="relative rounded-3xl shadow-2xl w-full h-[600px] object-cover"
                />
              </div>
            </motion.div>

            {/* Floating Cards */}
            <motion.div
              className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl border border-gray-100"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Check className="text-green-600 w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    Transaksi Berhasil
                  </p>
                  <p className="text-sm text-gray-600">+2,534 hari ini</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -top-8 -right-4 bg-white p-6 rounded-2xl shadow-2xl border border-gray-100"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center space-x-4">
                <div className="bg-teal-100 p-3 rounded-full">
                  <TrendingUp className="text-teal-600 w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Omzet Naik</p>
                  <p className="text-sm text-gray-600">+40% bulan ini</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
