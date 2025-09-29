import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

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

  const renderStars = (rating: number) => {
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

export default Testimonials;
