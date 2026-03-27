import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Calendar, Mail } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { useState } from "react";

const contactMethods = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    description: "Escríbeme directamente",
    href: "https://wa.me/584241850638",
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
    href: "mailto:componte.ve@gmail.com",
    cta: "Enviar email",
  },
];

const Contact = () => {
  const [mode, setMode] = useState<"diagnostico" | "aprendizaje">("diagnostico");

  const webhookUrl =
    "https://n8n-n8n.3rtzuv.easypanel.host/webhook-test/01ce5e83-7f9f-4b2b-af6d-2d386fea7adf";

  const [diagnostico, setDiagnostico] = useState({
    nombre: "",
    negocio: "",
    whatsapp: "",
    instagramWeb: "",
    sistema: "",
    volumen: "",
    presupuesto: "",
    dolor: "",
  });

  const [aprendizaje, setAprendizaje] = useState({
    nombre: "",
    whatsapp: "",
    nivel: "",
  });

  const [diagnosticoSubmitting, setDiagnosticoSubmitting] = useState(false);
  const [aprendizajeSubmitting, setAprendizajeSubmitting] = useState(false);
  const [diagnosticoSent, setDiagnosticoSent] = useState(false);
  const [aprendizajeSent, setAprendizajeSent] = useState(false);

  const handleSubmitDiagnostico = async (e: React.FormEvent) => {
    e.preventDefault();

    setDiagnosticoSent(false);
    setDiagnosticoSubmitting(true);

    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tipo: "diagnostico",
          ...diagnostico,
          page: window.location.href,
          createdAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error("Webhook request failed");
      setDiagnosticoSent(true);
      toast.success("Listo", { description: "Tu solicitud fue enviada. Te contactaré pronto." });
    } catch {
      toast.error("No se pudo enviar", {
        description: "Intenta de nuevo en unos segundos o usa los canales de contacto abajo.",
      });
    } finally {
      setDiagnosticoSubmitting(false);
    }
  };

  const handleSubmitAprendizaje = async (e: React.FormEvent) => {
    e.preventDefault();

    setAprendizajeSent(false);
    setAprendizajeSubmitting(true);

    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tipo: "aprendizaje",
          ...aprendizaje,
          page: window.location.href,
          createdAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error("Webhook request failed");
      setAprendizajeSent(true);
      toast.success("Registro enviado", { description: "Listo. Te agregué a la lista de espera." });
    } catch {
      toast.error("No se pudo enviar", {
        description: "Intenta de nuevo en unos segundos o usa los canales de contacto abajo.",
      });
    } finally {
      setAprendizajeSubmitting(false);
    }
  };

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

        <div className="max-w-4xl mx-auto mb-14">
          <div className="rounded-3xl border border-white/10 bg-black/60 backdrop-blur-xl p-6 md:p-10">
            <AnimatePresence mode="wait">
              {mode === "diagnostico" ? (
                <motion.div
                  key="diagnostico"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="mb-8">
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
                      Solicitar Diagnóstico Gratuito
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground mt-2">
                      Responde esto y te digo exactamente qué sistema construir primero.
                    </p>
                  </div>

                  <form onSubmit={handleSubmitDiagnostico} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-muted-foreground">Nombre</label>
                        <input
                          value={diagnostico.nombre}
                          onChange={(e) => setDiagnostico((v) => ({ ...v, nombre: e.target.value }))}
                          required
                          className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/30"
                          placeholder="Tu nombre"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Negocio</label>
                        <input
                          value={diagnostico.negocio}
                          onChange={(e) => setDiagnostico((v) => ({ ...v, negocio: e.target.value }))}
                          required
                          className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/30"
                          placeholder="Nombre del negocio"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">WhatsApp</label>
                        <input
                          value={diagnostico.whatsapp}
                          onChange={(e) => setDiagnostico((v) => ({ ...v, whatsapp: e.target.value }))}
                          required
                          className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/30"
                          placeholder="+58..."
                        />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Instagram/Web</label>
                        <input
                          value={diagnostico.instagramWeb}
                          onChange={(e) => setDiagnostico((v) => ({ ...v, instagramWeb: e.target.value }))}
                          className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/30"
                          placeholder="@tuinstagram o tuweb.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-muted-foreground">¿Qué sistema necesitas?</label>
                        <select
                          value={diagnostico.sistema}
                          onChange={(e) => setDiagnostico((v) => ({ ...v, sistema: e.target.value }))}
                          required
                          className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/30"
                        >
                          <option value="" disabled>
                            Selecciona una opción
                          </option>
                          <option value="Automatización de Operaciones / WhatsApp">Automatización de Operaciones / WhatsApp</option>
                          <option value="Aplicaciones Web Funcionales con Lógica de Negocio">Aplicaciones Web Funcionales con Lógica de Negocio</option>
                          <option value="Arquitectura Completa de Sistemas">Arquitectura Completa de Sistemas</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Mensajes/Operaciones diarias</label>
                        <select
                          value={diagnostico.volumen}
                          onChange={(e) => setDiagnostico((v) => ({ ...v, volumen: e.target.value }))}
                          required
                          className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/30"
                        >
                          <option value="" disabled>
                            Selecciona una opción
                          </option>
                          <option value="Menos de 20">Menos de 20</option>
                          <option value="20-50">20-50</option>
                          <option value="50-100">50-100</option>
                          <option value="+100">+100</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-sm text-muted-foreground">Presupuesto para infraestructura</label>
                        <select
                          value={diagnostico.presupuesto}
                          onChange={(e) => setDiagnostico((v) => ({ ...v, presupuesto: e.target.value }))}
                          required
                          className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/30"
                        >
                          <option value="" disabled>
                            Selecciona una opción
                          </option>
                          <option value="Evaluando opciones bajas">Evaluando opciones bajas</option>
                          <option value="$350-$700">$350-$700</option>
                          <option value="$700-$1500">$700-$1500</option>
                          <option value="+$1500">+$1500</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-muted-foreground">Proceso manual que más tiempo te quita hoy</label>
                      <textarea
                        value={diagnostico.dolor}
                        onChange={(e) => setDiagnostico((v) => ({ ...v, dolor: e.target.value }))}
                        required
                        rows={4}
                        className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/30 resize-none"
                        placeholder="Describe el proceso exacto, paso a paso, si puedes."
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={diagnosticoSubmitting}
                        className="w-full md:w-auto inline-flex items-center justify-center gap-2 gradient-primary text-primary-foreground px-7 py-3.5 rounded-xl font-medium hover:opacity-90 transition-opacity glow-primary"
                      >
                        {diagnosticoSubmitting ? "Enviando..." : "Solicitar Diagnóstico Gratuito"}
                      </button>
                      {diagnosticoSent && (
                        <p className="mt-3 text-sm text-muted-foreground">
                          Recibido. Tus datos fueron enviados.
                        </p>
                      )}
                      <div className="mt-4">
                        <button
                          type="button"
                          onClick={() => setMode("aprendizaje")}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          ¿No tienes un negocio pero quieres aprender a construir estos sistemas? Regístrate aquí
                        </button>
                      </div>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="aprendizaje"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="mb-8">
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight">Lista de espera</h3>
                    <p className="text-sm md:text-base text-muted-foreground mt-2">
                      Regístrate y te aviso cuando abra cupos y contenido técnico.
                    </p>
                  </div>

                  <form onSubmit={handleSubmitAprendizaje} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-muted-foreground">Nombre</label>
                        <input
                          value={aprendizaje.nombre}
                          onChange={(e) => setAprendizaje((v) => ({ ...v, nombre: e.target.value }))}
                          required
                          className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/30"
                          placeholder="Tu nombre"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">WhatsApp</label>
                        <input
                          value={aprendizaje.whatsapp}
                          onChange={(e) => setAprendizaje((v) => ({ ...v, whatsapp: e.target.value }))}
                          required
                          className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/30"
                          placeholder="+58..."
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-muted-foreground">Nivel actual en lógica/IA</label>
                      <select
                        value={aprendizaje.nivel}
                        onChange={(e) => setAprendizaje((v) => ({ ...v, nivel: e.target.value }))}
                        required
                        className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/30"
                      >
                        <option value="" disabled>
                          Selecciona una opción
                        </option>
                        <option value="Principiante">Principiante</option>
                        <option value="Intermedio">Intermedio</option>
                        <option value="Avanzado">Avanzado</option>
                      </select>
                    </div>

                    <div className="pt-2 flex flex-col md:flex-row md:items-center gap-4">
                      <button
                        type="submit"
                        disabled={aprendizajeSubmitting}
                        className="w-full md:w-auto inline-flex items-center justify-center gap-2 glass glass-hover px-7 py-3.5 rounded-xl font-medium transition-all border border-white/10"
                      >
                        {aprendizajeSubmitting ? "Enviando..." : "Registrarme"}
                      </button>
                      {aprendizajeSent && (
                        <p className="text-sm text-muted-foreground">Recibido. Tu registro fue enviado.</p>
                      )}
                      <button
                        type="button"
                        onClick={() => setMode("diagnostico")}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Volver al diagnóstico
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

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
