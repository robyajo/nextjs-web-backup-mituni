import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Rocket, Phone, Check } from "lucide-react";
import { CButton } from "../_components/ui/Button";

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
            <CButton
              variant="default"
              size="xl"
              className="bg-white text-teal-600 hover:bg-gray-100 font-bold min-w-[250px]"
            >
              <Rocket className="mr-2 w-5 h-5" />
              Mulai Trial 14 Hari Gratis
            </CButton>
            <CButton
              variant="outline"
              size="xl"
              className="border-white text-white hover:bg-white hover:text-teal-600 min-w-[200px]"
            >
              <Phone className="mr-2 w-5 h-5" />
              Hubungi Sales
            </CButton>
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

export default CTA;
