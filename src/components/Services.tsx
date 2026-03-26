import { motion } from "framer-motion";
import { Workflow, Monitor, Server, Cog } from "lucide-react";

const services = [
  {
    icon: Workflow,
    title: "Automatización de procesos",
    description: "Flujos de trabajo que se ejecutan solos, eliminando tareas repetitivas y reduciendo errores humanos.",
    span: "md:col-span-2",
  },
  {
    icon: Monitor,
    title: "Sistemas de operación",
    description: "Dashboards y paneles que centralizan la operación diaria de tu negocio.",
    span: "md:col-span-1",
  },
  {
    icon: Server,
    title: "Infraestructura backend",
    description: "Lógica de negocio robusta que ejecuta, valida y procesa datos automáticamente.",
    span: "md:col-span-1",
  },
  {
    icon: Cog,
    title: "Aplicaciones web",
    description: "Interfaces modernas donde tu equipo y clientes interactúan con el sistema.",
    span: "md:col-span-2",
  },
];

const Services = () => {
  return (
    <section id="sistemas" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Sistemas completos, <span className="gradient-text">no piezas aisladas</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Cada componente trabaja en conjunto para que tu negocio opere de forma autónoma.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`glass glass-hover rounded-2xl p-8 group cursor-default ${service.span}`}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:glow-primary transition-all">
                <service.icon size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
