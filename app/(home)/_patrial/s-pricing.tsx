import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { CBadge } from "../_components/ui/Badge";

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
  }: any) => {
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
            <CBadge variant="popular" className="px-4 py-2 text-sm font-bold">
              PALING POPULER
            </CBadge>
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
              {features.map((feature: string, index: number) => (
                <motion.li
                  key={`${title}-feature-${index}`}
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
                  <span className={popular ? "text-white" : "text-gray-700"}>
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

export default Pricing;
