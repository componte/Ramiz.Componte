import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center dot-pattern overflow-hidden">
      {/* Glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] animate-pulse-glow pointer-events-none" />

      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
            <span className="text-xs text-muted-foreground">Arquitecto de Automatización</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6">
            Sistemas que operan{" "}
            <span className="gradient-text">tu negocio</span>{" "}
            por ti
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Diseño e implemento sistemas que automatizan procesos, estructuran información y permiten que tu negocio funcione con menos fricción.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#como-funciona"
              className="group flex items-center gap-2 glass glass-hover px-6 py-3.5 rounded-lg text-foreground font-medium transition-all"
            >
              <Play size={16} className="text-primary" />
              Ver Cómo Funciona
            </a>
            <a
              href="#contacto"
              className="flex items-center gap-2 gradient-primary text-primary-foreground px-6 py-3.5 rounded-lg font-medium hover:opacity-90 transition-opacity glow-primary"
            >
              Aplicar Ahora
              <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
