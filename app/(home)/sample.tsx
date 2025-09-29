"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Shirt,
  Rocket,
  Play,
  Check,
  TrendingUp,
  Smartphone,
  Users,
  Package,
  Bell,
  Clock,
  DollarSign,
  Shield,
  GraduationCap,
  Star,
  Phone,
  ChevronUp,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

// Utility function untuk class names
const cn = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

// Button Component
const Button = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-full font-medium transition-all focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variantClasses = {
    default:
      "bg-teal-500 text-white hover:bg-teal-600 shadow-lg hover:shadow-teal-500/30",
    gradient:
      "bg-gradient-to-r from-teal-500 to-emerald-500 text-white hover:from-teal-600 hover:to-emerald-600 shadow-lg hover:shadow-teal-500/30",
    glow: "bg-teal-500 text-white hover:bg-teal-600 shadow-lg hover:shadow-teal-500/50 ring-2 ring-teal-500/20",
    outline:
      "border-2 border-teal-500 text-teal-600 hover:bg-teal-500 hover:text-white",
  };

  const sizeClasses = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3",
    lg: "h-11 px-6",
    xl: "h-14 px-8 text-lg",
  };

  return (
    <motion.button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

// Card Component
const Card = ({ children, className = "", ...props }) => (
  <motion.div
    className={cn(
      "rounded-2xl border border-gray-200 bg-white text-gray-800 shadow-sm",
      className
    )}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    {...props}
  >
    {children}
  </motion.div>
);

// Badge Component
const Badge = ({ children, variant = "default", className = "" }) => {
  const variantClasses = {
    default: "bg-teal-100 text-teal-700",
    popular: "bg-gradient-to-r from-amber-400 to-orange-500 text-white",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
};

// Hero Section
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
              <Button variant="gradient" size="xl" className="min-w-[200px]">
                <Rocket className="mr-2 w-5 h-5" />
                Mulai Gratis
              </Button>
              <Button variant="outline" size="xl" className="min-w-[200px]">
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
                <img
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&crop=center"
                  alt="LaundryPOS Dashboard"
                  className="relative rounded-3xl shadow-2xl w-full h-auto"
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
              className="absolute -top-8 -right-8 bg-white p-6 rounded-2xl shadow-xl border border-gray-100"
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

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-teal-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-teal-500 rounded-full mt-2 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
};

// Features Section
const Features = () => {
  const features = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Kasir Cepat",
      description:
        "Proses transaksi kilat dengan barcode scanner dan integrasi pembayaran digital",
      gradient: "from-teal-500 to-cyan-500",
      bgGradient: "from-teal-50 to-cyan-50",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Laporan Real-time",
      description:
        "Pantau penjualan, keuntungan, dan stok dengan dashboard interaktif",
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-50 to-teal-50",
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Akses Mobile",
      description:
        "Kelola bisnis dari mana saja dengan aplikasi mobile yang responsif",
      gradient: "from-cyan-500 to-blue-500",
      bgGradient: "from-cyan-50 to-blue-50",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Manajemen Pelanggan",
      description:
        "Simpan data pelanggan, riwayat transaksi, dan program loyalitas",
      gradient: "from-teal-500 to-emerald-500",
      bgGradient: "from-teal-50 to-emerald-50",
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: "Inventori Otomatis",
      description:
        "Pantau stok deterjen, plastik, dan perlengkapan lain secara otomatis",
      gradient: "from-slate-500 to-teal-500",
      bgGradient: "from-slate-50 to-teal-50",
    },
    {
      icon: <Bell className="w-8 h-8" />,
      title: "Notifikasi Smart",
      description:
        "Ingatkan pelanggan saat cucian selesai dan otomatis kirim receipt",
      badge: "NEW",
      gradient: "from-amber-500 to-orange-500",
      bgGradient: "from-amber-50 to-orange-50",
    },
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4">Fitur Unggulan</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Semua yang Anda Butuhkan untuk
              <span className="block bg-gradient-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent">
                Mengelola Bisnis Laundry
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Platform lengkap dengan fitur-fitur canggih yang dirancang khusus
              untuk meningkatkan efisiensi dan profitabilitas bisnis laundry
              Anda
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 },
              }}
            >
              <Card
                className={`h-full bg-gradient-to-br ${feature.bgGradient} border-0 shadow-lg hover:shadow-xl transition-all duration-300 group`}
              >
                <div className="p-8">
                  <motion.div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {feature.title}
                    </h3>
                    {feature.badge && (
                      <Badge variant="popular">{feature.badge}</Badge>
                    )}
                  </div>
                  <p className="text-gray-600 text-base leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Benefits Section
const Benefits = () => {
  const benefits = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Hemat Waktu 80%",
      description:
        "Automasi proses manual sehingga Anda bisa fokus pada pertumbuhan bisnis",
      color: "bg-teal-500",
      bgColor: "bg-teal-100",
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Tingkatkan Omzet 40%",
      description:
        "Dengan fitur upsell dan program loyalitas yang terintegrasi",
      color: "bg-emerald-500",
      bgColor: "bg-emerald-100",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Data Aman & Terenkripsi",
      description:
        "Keamanan data pelanggan dan transaksi dengan enkripsi bank-grade",
      color: "bg-cyan-500",
      bgColor: "bg-cyan-100",
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Training Gratis",
      description: "Dapatkan panduan lengkap dan support dari tim ahli kami",
      color: "bg-slate-500",
      bgColor: "bg-slate-100",
    },
  ];

  return (
    <section
      id="benefits"
      className="py-24 bg-gradient-to-br from-slate-50 to-teal-50"
    >
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-3xl transform -rotate-3 blur-xl opacity-20"></div>
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop&crop=center"
                alt="Benefits"
                className="relative rounded-3xl shadow-2xl w-full h-auto"
              />
            </div>

            {/* Floating benefit cards */}
            <motion.div
              className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-3">
                <div className="bg-teal-100 p-2 rounded-lg">
                  <TrendingUp className="text-teal-600 w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Efisiensi +80%</p>
                  <p className="text-xs text-gray-600">vs sistem manual</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4">Mengapa LaundryPOS?</Badge>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Revolusi Cara Anda
                <span className="block bg-gradient-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent">
                  Mengelola Laundry
                </span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Bergabunglah dengan ribuan pemilik laundry yang telah merasakan
                transformasi digital dengan LaundryPOS
              </p>
            </motion.div>

            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-6 hover:shadow-xl transition-all duration-300 group">
                    <div className="flex items-start space-x-4">
                      <div
                        className={`${benefit.bgColor} p-4 rounded-xl group-hover:scale-110 transition-transform duration-300`}
                      >
                        <div
                          className={`${benefit.color} p-2 rounded-lg text-white`}
                        >
                          {benefit.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {benefit.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Pricing Section
const Pricing = () => {
  const pricingPlans = [
    {
      title: "Starter",
      price: "Rp99K",
      period: "/bulan",
      description: "Untuk usaha laundry yang baru mulai",
      features: [
        "1 Pengguna",
        "100 Transaksi/bulan",
        "Laporan Dasar",
        "Support Email",
        "Dashboard Analytics",
      ],
      buttonText: "Pilih Starter",
      buttonVariant: "outline",
    },
    {
      title: "Professional",
      price: "Rp299K",
      period: "/bulan",
      description: "Untuk bisnis laundry yang berkembang",
      features: [
        "5 Pengguna",
        "Unlimited Transaksi",
        "Laporan Advanced",
        "Priority Support",
        "Integrasi API",
        "Mobile App",
        "Notifikasi WhatsApp",
      ],
      popular: true,
      buttonText: "Pilih Professional",
      buttonVariant: "gradient",
    },
    {
      title: "Enterprise",
      price: "Custom",
      description: "Untuk jaringan laundry besar",
      features: [
        "Unlimited Pengguna",
        "Multi Outlet",
        "Custom Features",
        "Dedicated Support",
        "On-premise/Cloud",
        "Training Khusus",
        "SLA 99.9%",
      ],
      buttonText: "Hubungi Sales",
      buttonVariant: "outline",
    },
  ];

  const PricingCard = ({
    title,
    price,
    period,
    description,
    features,
    popular,
    buttonText,
    buttonVariant,
  }) => {
    return (
      <motion.div
        className={`relative ${popular ? "transform scale-105" : ""}`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        whileHover={{ y: -5 }}
      >
        {popular && (
          <motion.div
            className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Badge variant="popular" className="px-4 py-2 text-sm font-bold">
              PALING POPULER
            </Badge>
          </motion.div>
        )}

        <Card
          className={`h-full relative overflow-hidden ${
            popular
              ? "bg-gradient-to-br from-teal-500 to-emerald-500 text-white border-0 shadow-2xl"
              : "bg-white hover:shadow-xl"
          } transition-all duration-300`}
        >
          {popular && (
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/90 to-emerald-500/90"></div>
          )}

          <div className="relative p-8">
            <div className="text-center mb-8">
              <h3
                className={`text-2xl font-bold mb-2 ${
                  popular ? "text-white" : "text-gray-900"
                }`}
              >
                {title}
              </h3>
              <p
                className={`text-sm mb-6 ${
                  popular ? "text-white/90" : "text-gray-600"
                }`}
              >
                {description}
              </p>
              <div className="flex items-baseline justify-center gap-1 mb-6">
                <span
                  className={`text-5xl font-bold ${
                    popular ? "text-white" : "text-gray-900"
                  }`}
                >
                  {price}
                </span>
                {period && (
                  <span
                    className={`text-sm ${
                      popular ? "text-white/80" : "text-gray-600"
                    }`}
                  >
                    {period}
                  </span>
                )}
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Check
                    className={`w-5 h-5 flex-shrink-0 ${
                      popular ? "text-white" : "text-teal-500"
                    }`}
                  />
                  <span
                    className={`${popular ? "text-white" : "text-gray-700"}`}
                  >
                    {feature}
                  </span>
                </motion.li>
              ))}
            </ul>

            <Button
              variant={buttonVariant}
              size="lg"
              className={`w-full ${
                popular ? "bg-white text-teal-600 hover:bg-gray-100" : ""
              }`}
            >
              {buttonText}
            </Button>
          </div>
        </Card>
      </motion.div>
    );
  };

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4">Paket Berlangganan</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Pilih Paket yang
              <span className="block bg-gradient-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent">
                Sesuai Kebutuhan Anda
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Mulai dari usaha kecil hingga enterprise, kami punya solusi yang
              tepat untuk setiap skala bisnis
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan) => (
            <PricingCard
              key={plan.title}
              title={plan.title}
              price={plan.price}
              period={plan.period}
              description={plan.description}
              features={plan.features}
              popular={plan.popular}
              buttonText={plan.buttonText}
              buttonVariant={plan.buttonVariant}
            />
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 mb-4">
            Semua paket termasuk trial 14 hari gratis, tanpa kartu kredit
          </p>
          <div className="flex justify-center items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-teal-500" />
              Setup Gratis
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-teal-500" />
              Migrasi Data
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-teal-500" />
              Cancel Anytime
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Testimonials Section
const Testimonials = () => {
  const testimonials = [
    {
      name: "Budi Santoso",
      role: "Owner LaundryKu",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
      content:
        "LaundryPOS benar-benar mengubah cara saya mengelola bisnis. Transaksi jadi lebih cepat dan laporan keuangan jadi lebih akurat! ROI dalam 2 bulan.",
      rating: 5,
      company: "LaundryKu - Bandung",
    },
    {
      name: "Siti Rahayu",
      role: "Manager FreshClean",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face",
      content:
        "Fitur notifikasi otomatis sangat membantu. Pelanggan jadi lebih puas dan omzet kami naik 35% dalam 3 bulan! Customer retention juga meningkat drastis.",
      rating: 5,
      company: "FreshClean - Jakarta",
    },
    {
      name: "Ahmad Fauzi",
      role: "CEO LaundryPro",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
      content:
        "Support team sangat responsif dan helpful. Setiap pertanyaan saya dijawab dengan cepat dan solutif. Highly recommended untuk semua bisnis laundry!",
      rating: 5,
      company: "LaundryPro - Surabaya",
    },
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section
      id="testimonials"
      className="py-24 bg-gradient-to-br from-slate-50 to-teal-50"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4">Testimoni</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Apa Kata
              <span className="block bg-gradient-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent">
                Pengguna LaundryPOS?
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ribuan pemilik laundry telah merasakan transformasi bisnis dengan
              LaundryPOS
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 h-full hover:shadow-xl transition-all duration-300 group">
                {/* Stars */}
                <div className="flex mb-6">
                  {renderStars(testimonial.rating)}
                </div>

                {/* Quote */}
                <blockquote className="text-gray-700 text-lg leading-relaxed mb-6 italic">
                  "{testimonial.content}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">
                      {testimonial.name}
                    </h4>
                    <p className="text-teal-600 font-medium">
                      {testimonial.role}
                    </p>
                    <p className="text-sm text-gray-500">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust indicators */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center items-center gap-8 text-teal-600 font-semibold">
            <div className="text-center">
              <p className="text-3xl font-bold">1000+</p>
              <p className="text-sm">Pengguna Aktif</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">4.9/5</p>
              <p className="text-sm">Rating App Store</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">99.9%</p>
              <p className="text-sm">Uptime Server</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// CTA Section
const CTA = () => {
  return (
    <section className="py-24 bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500 relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Floating elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"
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
          className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"
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
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Siap Revolusi
            <span className="block">Bisnis Laundry Anda?</span>
          </h2>

          <p className="text-xl lg:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Bergabunglah dengan 1000+ pemilik laundry yang telah merasakan
            transformasi digital dan peningkatan omzet hingga 40%
          </p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Button
              variant="default"
              size="xl"
              className="bg-white text-teal-600 hover:bg-gray-100 font-bold min-w-[250px]"
            >
              <Rocket className="mr-2 w-5 h-5" />
              Mulai Trial 14 Hari Gratis
            </Button>
            <Button
              variant="outline"
              size="xl"
              className="border-white text-white hover:bg-white hover:text-teal-600 min-w-[200px]"
            >
              <Phone className="mr-2 w-5 h-5" />
              Hubungi Sales
            </Button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            className="flex flex-wrap justify-center items-center gap-6 text-white/80 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4" />
              Setup dalam 1 hari
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4" />
              No setup fee
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4" />
              Cancel anytime
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Footer
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
              <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <Shirt className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">LaundryPOS</span>
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

// Navigation
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Fitur", href: "#features" },
    { name: "Keuntungan", href: "#benefits" },
    { name: "Harga", href: "#pricing" },
    { name: "Testimoni", href: "#testimonials" },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
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
                scrolled ? "text-gray-900" : "text-gray-900"
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
                  scrolled ? "text-gray-700" : "text-gray-700"
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
          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <X
                className={`w-6 h-6 ${
                  scrolled ? "text-gray-900" : "text-gray-900"
                }`}
              />
            ) : (
              <Menu
                className={`w-6 h-6 ${
                  scrolled ? "text-gray-900" : "text-gray-900"
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
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="py-4 space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block py-2 text-gray-700 hover:text-teal-500"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                <div className="flex flex-col gap-3 pt-4">
                  <Button variant="outline" size="sm">
                    Masuk
                  </Button>
                  <Button variant="gradient" size="sm">
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
};

// Main Page Component
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
