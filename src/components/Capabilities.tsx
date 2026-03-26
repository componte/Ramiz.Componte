import { motion } from "framer-motion";
import { RotateCcw, Users, Database, FileBarChart, Wrench, Globe, HardDrive } from "lucide-react";

const capabilities = [
  { icon: RotateCcw, label: "Procesos internos repetitivos" },
  { icon: Users, label: "Atención y gestión de clientes" },
  { icon: Database, label: "Procesamiento de datos" },
  { icon: FileBarChart, label: "Generación de reportes" },
  { icon: Wrench, label: "Herramientas internas personalizadas" },
  { icon: Globe, label: "Plataformas digitales" },
];

const Capabilities = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Lo que puedes <span className="gradient-text">automatizar</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass glass-hover rounded-xl p-6 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <cap.icon size={20} className="text-primary" />
              </div>
              <span className="font-medium">{cap.label}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 border border-primary/20"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <HardDrive size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Arquitectura de Datos Robusta</h3>
              <p className="text-muted-foreground leading-relaxed">
                Cada sistema almacena y organiza información en bases de datos estructuradas, permitiendo control, análisis y toma de decisiones.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Capabilities;
