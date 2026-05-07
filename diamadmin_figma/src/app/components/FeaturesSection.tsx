import { motion } from "motion/react";
import { Shield, Zap, Layers, Lock } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Seguridad robusta",
    description: "Protección de diamante para tus datos más valiosos"
  },
  {
    icon: Zap,
    title: "Velocidad suprema",
    description: "Rendimiento cristalino en cada operación"
  },
  {
    icon: Layers,
    title: "Arquitectura sólida",
    description: "Estructura multifacética como un diamante perfecto"
  },
  {
    icon: Lock,
    title: "Control total",
    description: "Administración con la precisión de un maestro joyero"
  }
];

export function FeaturesSection() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-20 px-8">
      <div className="max-w-7xl w-full">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-[#1B75BB] mb-4">
            Características
          </h2>
          <p className="text-xl md:text-2xl text-gray-600">
            Brilla con la potencia de Diamadmin
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="group relative p-8 rounded-2xl bg-gradient-to-br from-[#3DB5E6]/10 to-[#1B75BB]/10 border-2 border-[#3DB5E6]/20 hover:border-[#3DB5E6] transition-all cursor-pointer overflow-hidden"
              >
                {/* Background glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#3DB5E6]/0 to-[#1B75BB]/0 group-hover:from-[#3DB5E6]/5 group-hover:to-[#1B75BB]/5 transition-all duration-300"
                />

                <div className="relative z-10">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-[#3DB5E6] to-[#1B75BB] flex items-center justify-center shadow-lg"
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-[#1B75BB] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-lg">
                    {feature.description}
                  </p>
                </div>

                {/* Diamond pattern decoration */}
                <div className="absolute -right-8 -bottom-8 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <polygon points="50,10 80,50 50,90 20,50" fill="#1B75BB" />
                  </svg>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
