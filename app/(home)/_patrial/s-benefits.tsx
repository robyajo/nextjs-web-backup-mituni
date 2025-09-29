import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Clock,
  DollarSign,
  Shield,
  GraduationCap,
  TrendingUp,
} from "lucide-react";

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
                src="https://images.unsplash.com/photo-1489274495757-95c7c837b101?q=80&w=715&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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

export default Benefits;
