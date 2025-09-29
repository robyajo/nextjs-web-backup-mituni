import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { TrendingUp, Smartphone, Users, Package, Bell } from "lucide-react";

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
                      <Badge variant="outline">{feature.badge}</Badge>
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

export default Features;
