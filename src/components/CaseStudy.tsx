import { motion } from "framer-motion";
import { Bot, Search, ClipboardList, Bell, Clock } from "lucide-react";

const results = [
  { icon: Bot, text: "Gestiona el 90% de la atención inicial" },
  { icon: Search, text: "Consulta productos y precios en tiempo real" },
  { icon: ClipboardList, text: "Registra pedidos automáticamente" },
  { icon: Bell, text: "Notifica operaciones al equipo" },
];

const CaseStudy = () => {
  return (
    <section id="casos" className="py-24 dot-pattern">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Casos <span className="gradient-text">reales</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 md:p-12 max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse-glow" />
            <span className="text-sm text-muted-foreground uppercase tracking-wider">Sistema en producción</span>
          </div>

          <h3 className="text-2xl md:text-3xl font-bold mb-4">Charcutería Ramiz</h3>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Implementación de un sistema automatizado con agente especializado que gestiona la atención, consultas y pedidos. El sistema prepara toda la información para que el equipo humano valide pagos y logística.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {results.map((r, i) => (
              <div key={i} className="flex items-center gap-3 bg-secondary/50 rounded-xl p-4">
                <r.icon size={20} className="text-primary shrink-0" />
                <span className="text-sm">{r.text}</span>
              </div>
            ))}
          </div>

          <div className="glass rounded-xl p-6 border border-primary/20">
            <div className="flex items-center gap-3">
              <Clock size={20} className="text-primary" />
              <div>
                <p className="font-semibold">Resultado</p>
                <p className="text-sm text-muted-foreground">
                  Reducción significativa del trabajo manual y recuperación de tiempo operativo diario.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudy;
