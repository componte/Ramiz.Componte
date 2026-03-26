import { motion } from "framer-motion";
import { MessageCircle, Calendar, Mail } from "lucide-react";

const contactMethods = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    description: "Escríbeme directamente",
    href: "https://wa.me/",
    cta: "Enviar mensaje",
  },
  {
    icon: Calendar,
    title: "Calendario",
    description: "Agenda una llamada",
    href: "#",
    cta: "Agendar llamada",
  },
  {
    icon: Mail,
    title: "Email",
    description: "Envía tu consulta",
    href: "mailto:contacto@ramiz.com",
    cta: "Enviar email",
  },
];

const Contact = () => {
  return (
    <section id="contacto" className="py-24 dot-pattern">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Contacto</span>
          </h2>
          <p className="text-muted-foreground">Elige el canal que prefieras</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {contactMethods.map((m, i) => (
            <motion.a
              key={m.title}
              href={m.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass glass-hover rounded-2xl p-8 text-center group"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:glow-primary transition-all">
                <m.icon size={28} className="text-primary" />
              </div>
              <h3 className="font-semibold mb-1">{m.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{m.description}</p>
              <span className="text-sm text-primary font-medium">{m.cta} →</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
