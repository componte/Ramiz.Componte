import { motion } from "framer-motion";
import { Inbox, Cpu, UserCheck, CheckCircle2, ArrowRight } from "lucide-react";

const steps = [
  { icon: Inbox, label: "Input", description: "Tu negocio recibe información" },
  { icon: Cpu, label: "Sistema", description: "El sistema la procesa automáticamente" },
  { icon: UserCheck, label: "Validación", description: "Tu equipo valida y finaliza" },
  { icon: CheckCircle2, label: "Resultado", description: "Acciones ejecutadas según lógica" },
];

const HowItWorks = () => {
  return (
    <section id="como-funciona" className="py-24 relative dot-pattern">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Cómo <span className="gradient-text">funciona</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            El sistema elimina el trabajo repetitivo. El humano interviene solo donde importa.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
          {steps.map((step, i) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="flex items-center gap-4"
            >
              <div className="glass rounded-2xl p-6 text-center min-w-[180px]">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <step.icon size={28} className="text-primary" />
                </div>
                <h3 className="font-semibold mb-1">{step.label}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
              {i < steps.length - 1 && (
                <ArrowRight className="hidden md:block text-primary/40 shrink-0" size={24} />
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 mt-16 max-w-2xl mx-auto text-center"
        >
          <p className="text-lg font-medium">
            "El sistema ejecuta el trabajo.{" "}
            <span className="text-primary">El humano valida estratégicamente.</span>"
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
