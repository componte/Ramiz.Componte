import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CtaSection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-12 md:p-16 text-center max-w-3xl mx-auto border border-primary/20 glow-primary"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Si tu negocio depende de procesos manuales, hay una forma{" "}
            <span className="gradient-text">más eficiente</span> de operarlo
          </h2>
          <p className="text-muted-foreground mb-8">
            Trabajo con negocios que ya tienen volumen operativo
          </p>
          <Link
            to="/contacto"
            className="inline-flex items-center gap-2 gradient-primary text-primary-foreground px-8 py-4 rounded-xl font-medium hover:opacity-90 transition-opacity text-lg"
          >
            Aplicar para Automatización
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
