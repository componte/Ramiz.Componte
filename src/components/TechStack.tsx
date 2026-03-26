import { motion } from "framer-motion";
import { Monitor, Workflow, Database, Brain, Settings } from "lucide-react";
import techImage from "@/assets/tech-architecture.jpg";

const tech = [
  { icon: Monitor, label: "Interfaces modernas" },
  { icon: Workflow, label: "Automatización de procesos" },
  { icon: Database, label: "Bases de datos estructuradas" },
  { icon: Brain, label: "Sistemas de memoria" },
  { icon: Settings, label: "Lógica de procesamiento" },
];

const TechStack = () => {
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
            Ecosistema <span className="gradient-text">tecnológico</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Sistemas diseñados como arquitecturas completas, no herramientas aisladas.
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-4 max-w-3xl mx-auto">
          {tech.map((t, i) => (
            <motion.div
              key={t.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass glass-hover rounded-2xl p-6 text-center min-w-[160px] flex-1"
            >
              <t.icon size={32} className="text-primary mx-auto mb-3" />
              <span className="text-sm font-medium">{t.label}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 max-w-4xl mx-auto"
        >
          <div className="glass rounded-2xl p-2">
            <img
              src={techImage}
              alt="Arquitectura tecnológica: Automatización, Backend Logic, Interfaces y Database"
              className="rounded-xl w-full object-cover"
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
