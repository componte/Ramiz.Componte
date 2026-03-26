import { motion } from "framer-motion";
import { Target, Hammer, Layers, TrendingUp } from "lucide-react";

const diffs = [
  { icon: Target, title: "Enfoque en sistemas reales", desc: "Soluciones que operan en el mundo real, no prototipos." },
  { icon: Hammer, title: "Implementación práctica", desc: "Del diseño a la ejecución sin intermediarios." },
  { icon: Layers, title: "Arquitectura completa", desc: "Frontend, backend, datos y automatización integrados." },
  { icon: TrendingUp, title: "Optimización continua", desc: "Evolución constante basada en datos reales." },
];

const Differentiator = () => {
  return (
    <section className="py-24 dot-pattern">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Por qué <span className="gradient-text">diferente</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {diffs.map((d, i) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass glass-hover rounded-2xl p-7"
            >
              <d.icon size={24} className="text-primary mb-4" />
              <h3 className="font-semibold mb-2">{d.title}</h3>
              <p className="text-sm text-muted-foreground">{d.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Differentiator;
