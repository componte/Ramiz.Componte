import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ShaderAnimation } from "../components/ui/shader-lines";
import { ParticleTextEffect } from "../components/ui/particle-text-effect";
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";
import {
  ShoppingCart,
  Bot,
  Code,
  Cpu,
  ArrowRight,
  CheckCircle2,
  Send,
  ChevronRight,
  Instagram,
  User,
  X,
  XCircle,
  Check,
  GraduationCap,
  Globe,
  BarChart3,
  Zap,
  MousePointerClick,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const AGENT_AVATAR_URL =
  "https://res.cloudinary.com/dziczqgzn/image/upload/ar_1:1,c_auto/Gemini_Generated_Image_faa4xffaa4xffaa4_righyw.png";

 const PROFILE_CARD_PHOTO_URL =
   "https://res.cloudinary.com/dziczqgzn/image/upload/f_auto,q_auto/v1774633255/IMG_9750_hlstx7.heic";

const CAL_IFRAME_SRC = "https://cal.com/componte-dryjsc/agenda-ramiz";

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeScale = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const ParticleCursor = () => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);
  const particleId = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      if (Math.random() > 0.6) {
        const id = particleId.current++;
        setParticles((prev) => [...prev.slice(-15), { id, x: e.clientX, y: e.clientY }]);
        setTimeout(() => {
          setParticles((prev) => prev.filter((p) => p.id !== id));
        }, 800);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-500/50 bg-purple-500/10 blur-[2px] transition-all duration-100 ease-out"
        style={{ left: mousePos.x, top: mousePos.y }}
      />
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0.8, scale: 1, x: p.x, y: p.y }}
          animate={{
            opacity: 0,
            scale: 0.2,
            x: p.x + (Math.random() - 0.5) * 50,
            y: p.y + (Math.random() - 0.5) * 50 + 20,
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400 blur-[1px]"
        />
      ))}
    </div>
  );
};

const AnimatedCounter = ({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const incrementTime = 20;
      const steps = duration / incrementTime;
      const increment = end / steps;

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, incrementTime);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
};

const HeroSection = ({ triggerProgress }: { triggerProgress: () => void }) => {
  const phrases = ["90% Procesos Automatizados", "156 Horas ahorradas/año", "+3 Horas libres/semana"];
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [typingText, setTypingText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        const fullText = phrases[currentPhrase];
        if (!isDeleting) {
          setTypingText(fullText.substring(0, typingText.length + 1));
          if (typingText === fullText) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          setTypingText(fullText.substring(0, typingText.length - 1));
          if (typingText === "") {
            setIsDeleting(false);
            setCurrentPhrase((prev) => (prev + 1) % phrases.length);
          }
        }
      },
      isDeleting ? 50 : 100,
    );
    return () => clearTimeout(timeout);
  }, [typingText, isDeleting, currentPhrase, phrases]);

  return (
    <section
      id="inicio"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-20 text-center"
    >
      <ParticleTextEffect />
      <div className="absolute left-[20%] top-[10%] h-[500px] w-[500px] animate-[spin_20s_linear_infinite] rounded-full bg-purple-700/10 blur-[150px]" />
      <div className="absolute right-[20%] bottom-[10%] h-[600px] w-[600px] animate-[spin_25s_linear_infinite_reverse] rounded-full bg-purple-900/10 blur-[150px]" />

      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="relative z-10 max-w-5xl">
        <motion.div
          variants={fadeInUp}
          className="mb-8 inline-flex items-center border-b border-purple-500/30 pb-2 text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-purple-400"
        >
          Automatización + Sitios Web con Lógica
        </motion.div>

        <motion.h1
          variants={fadeInUp}
          className="mb-8 text-5xl font-black tracking-tighter text-white sm:text-7xl lg:text-[90px] leading-[0.9]"
        >
          <motion.span 
            animate={{ 
              color: ["#a855f7", "#d8b4fe", "#a855f7"],
              textShadow: ["0px 0px 0px rgba(168,85,247,0)", "0px 0px 40px rgba(168,85,247,0.5)", "0px 0px 0px rgba(168,85,247,0)"]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="text-purple-500 inline-block"
          >
            Sistemas de Libertad
          </motion.span>
          <br className="hidden md:block" /> que Operan tu Negocio por Ti.
        </motion.h1>

        <motion.p variants={fadeInUp} className="mb-10 mx-auto max-w-2xl text-xl font-light leading-relaxed text-gray-400 md:text-2xl drop-shadow-xl">
          Diseño e implemento sistemas que convierten interacciones en resultados reales, eliminando la fricción operativa de tu equipo.
        </motion.p>

        <motion.div variants={fadeInUp} className="mb-14 h-8 text-lg font-medium text-gray-500 md:text-xl">
          <span className="border-r-2 border-purple-500 pr-2">{typingText}</span>
        </motion.div>

        <motion.div variants={fadeInUp} className="flex flex-col items-center justify-center gap-6 sm:flex-row">
          <Button
            size="lg"
            onClick={() => {
              triggerProgress();
              document.getElementById("iniciar")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group h-14 rounded-none bg-purple-600 px-10 text-lg font-semibold text-white transition-all hover:bg-purple-500 hover:scale-[1.02]"
          >
            Solicitar Diagnóstico
            <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-2" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => {
              triggerProgress();
              document.getElementById("casos")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="h-14 rounded-none border-gray-700 bg-transparent px-10 text-lg font-medium text-gray-300 transition-all hover:border-purple-500 hover:bg-white/5 hover:text-white"
          >
            Ver Casos Reales
          </Button>
        </motion.div>

        {/* HERO CONVERSATIONS */}
        <motion.div variants={fadeInUp} className="mt-16 sm:mt-24 mx-auto w-full max-w-6xl" style={{ perspective: "1000px" }}>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                id: "restaurant",
                title: "Restaurante",
                user: "Buenas tardes, ¿tienen disponibilidad para una mesa para 4 hoy a las 7:00 pm?",
                assistant:
                  "¡Claro! Hay disponibilidad. ¿Deseas reservar a nombre de quién y con algún requerimiento (niños/alergias)?",
              },
              {
                id: "colloquial",
                title: "Retail",
                user: "Mano, ¿de casualidad tienes audífonos inalámbricos negros?",
                assistant:
                  "¡Épale hermano! Sí activo, nos quedan 3 orginales negros en $25. ¿Te aparto uno de una vez o quieres que te pase fotos?",
              },
            ].map((c, idx) => (
              <motion.div
                key={c.id}
                initial={{ rotateX: 10, rotateY: -10, opacity: 0 }}
                animate={{ rotateX: 0, rotateY: 0, opacity: 1 }}
                transition={{ duration: 0.9, ease: "easeOut", delay: idx * 0.12 }}
                className="relative rounded-xl border border-gray-800 bg-[#0a0a0c] p-4 shadow-2xl flex flex-col gap-4 text-left transform-gpu"
              >
                <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 overflow-hidden rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                      <Bot className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white tracking-wide">Vendedor Inteligente</p>
                      <p className="text-[10px] text-green-500 font-semibold tracking-widest uppercase flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" /> en línea
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full border border-white/10 bg-black/40 px-2 py-0.5 text-[10px] font-semibold text-white/70">
                    {c.title}
                  </span>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.98, x: 12 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ delay: 0.35 + idx * 0.12, duration: 0.45, type: "spring" }}
                  className="self-end rounded-2xl rounded-tr-none bg-purple-600/10 border border-purple-500/20 p-3 max-w-[90%]"
                >
                  <p className="text-sm text-gray-200 leading-relaxed font-light">{c.user}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.98, x: -12 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ delay: 0.9 + idx * 0.12, duration: 0.45, type: "spring" }}
                  className="self-start rounded-2xl rounded-tl-none bg-white/5 border border-gray-800 p-3 max-w-[92%]"
                >
                  <p className="text-sm text-gray-300 leading-relaxed font-light">{c.assistant}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-gray-500">
        <ChevronRight className="h-8 w-8 rotate-90" />
      </div>
    </section>
  );
};

const barData = [
  { name: "Antes", eficiencia: 2 },
  { name: "Después", eficiencia: 9 },
];

const beforePoints = [
  "Atender cada cliente manualmente, uno por uno, todo el día",
  "Calcular precios y tasa de cambio BCV a mano en cada pedido",
  "Recordar deudas, abonos y saldos de memoria o en papel",
  "Jornada extendida respondiendo preguntas repetitivas por WhatsApp",
  "Armado de pedidos manual con margen de error",
];

const afterPoints = [
  "Agente atiende 24/7: da precios, envía catálogo y arma pedidos",
  "Calcula automáticamente el valor en bolívares y dólares con tasa BCV",
  "Registra y recuerda cada deuda, abono y saldo por cliente",
  "Reconoce comprobantes de pago y notas de voz",
  "Tú solo te encargas de la logística y validar pagos cuando hace falta",
];

const SuccessCases = ({ triggerProgress }: { triggerProgress: () => void }) => {
  return (
    <section id="casos" className="relative z-10 mx-auto max-w-7xl px-4 py-32">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
        <motion.div variants={fadeInUp} className="mb-24 text-center">
          <h2 className="text-5xl font-black md:text-7xl lg:text-8xl tracking-tighter text-white">
            Impacto <span className="text-purple-500 text-opacity-90">Real</span>.
          </h2>
          <p className="mt-6 text-lg font-light text-gray-400 md:text-2xl">Lo que pasa cuando un negocio deja de operar a mano.</p>
        </motion.div>

        <div className="grid gap-8 lg:gap-8 md:grid-cols-2">
          {/* Card 1: Charcutería */}
          <motion.div variants={fadeInUp}>
            <div className="flex h-full flex-col border-t-2 border-purple-500/40 bg-[#050507] p-8 lg:p-10 transition-colors hover:bg-white/[0.02]">
              <div className="flex flex-row items-center gap-5 pb-8">
                <div className="flex h-16 w-16 items-center justify-center bg-purple-500/10 text-purple-400">
                  <ShoppingCart className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold tracking-tight text-white">Charcutería Ramiz</h3>
                  <p className="mt-1 text-xs font-semibold tracking-widest text-gray-500 uppercase">Retail & Atención al Cliente</p>
                </div>
              </div>
              
              <div className="flex-1">
                <div className="mb-10 grid grid-cols-3 gap-0 border border-gray-800 bg-black/50">
                  <div className="border-r border-gray-800 p-4 lg:p-6 text-center">
                    <p className="text-4xl font-black text-white">
                      <AnimatedCounter value={24} suffix="/7" />
                    </p>
                    <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-gray-500">Atención al cliente</p>
                  </div>
                  <div className="border-r border-gray-800 p-4 lg:p-6 text-center">
                    <p className="text-4xl font-black text-purple-500">
                      <AnimatedCounter value={80} suffix="%" />
                    </p>
                    <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-gray-500">Cobros gestionados</p>
                  </div>
                  <div className="p-4 lg:p-6 text-center">
                    <p className="text-4xl font-black text-purple-400">
                      +<AnimatedCounter value={3} suffix="h" />
                    </p>
                    <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-gray-500">Ahorro Diario</p>
                  </div>
                </div>

                <div className="mb-10 block w-full border border-gray-800 bg-black/30 p-6">
                  <p className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-500">Eficiencia operativa (antes vs. después)</p>
                  <div className="h-40 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={barData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                        <XAxis dataKey="name" stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} />
                        <RechartsTooltip cursor={{ fill: "#1f2937" }} contentStyle={{ backgroundColor: "#000", borderColor: "#1f2937", borderRadius: 0 }} />
                        <Bar dataKey="eficiencia" fill="#8b5cf6" radius={[0, 0, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                  <div>
                    <p className="mb-5 border-b border-red-900/30 pb-3 text-sm md:text-base font-bold uppercase tracking-wider text-red-500">
                      Antes del agente
                    </p>
                    <ul className="space-y-5">
                      {beforePoints.map((p, i) => (
                        <li key={i} className="flex items-start gap-4 text-base md:text-lg leading-relaxed text-gray-400">
                          <span className="mt-2 h-2 w-2 shrink-0 bg-red-500/50" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="mb-5 border-b border-purple-900/40 pb-3 text-sm md:text-base font-bold uppercase tracking-wider text-purple-400">
                      Con el agente activo
                    </p>
                    <ul className="space-y-5">
                      {afterPoints.map((p, i) => (
                        <li key={i} className="flex items-start gap-4 text-base md:text-lg leading-relaxed text-gray-300">
                          <span className="mt-2 h-2 w-2 shrink-0 bg-purple-500" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Web */}
          <motion.div variants={fadeInUp}>
            <div className="flex h-full flex-col border-t-2 border-gray-700 bg-[#050507] p-8 lg:p-10 transition-colors hover:bg-white/[0.02]">
              <div className="flex flex-row items-center gap-5 pb-8">
                <div className="flex h-16 w-16 items-center justify-center bg-white/5 text-gray-300">
                  <Globe className="h-8 w-8" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-3xl font-bold tracking-tight text-white">Este sitio web</h3>
                    <span className="flex items-center gap-1.5 border border-green-500/30 bg-green-500/10 px-2 py-1 text-[9px] font-black uppercase tracking-widest text-green-400">
                      <span className="h-1.5 w-1.5 animate-pulse bg-green-400" /> EN VIVO
                    </span>
                  </div>
                  <p className="mt-1 text-xs font-semibold tracking-widest text-gray-500 uppercase">Sitio Web con Lógica · Lo estás viendo ahora</p>
                </div>
              </div>

              <div className="flex-1">
                <div className="mb-10 bg-white/5 p-6 border-l-2 border-gray-500">
                  <p className="text-sm font-light leading-relaxed text-gray-300">
                    El mejor ejemplo de lo que construyo es <strong className="font-bold text-white">el sitio en el que estás ahora mismo</strong>. No es una captura de pantalla. No es una demo. Es el producto real, funcionando.
                  </p>
                </div>

                <div className="mb-10">
                  <p className="mb-5 text-[11px] font-bold uppercase tracking-widest text-gray-500">Funcionalidades activas en esta página</p>
                  <ul className="space-y-4">
                    {[
                      { icon: MousePointerClick, text: "Botones que hacen scroll suave a secciones específicas" },
                      { icon: Zap, text: "Contadores animados que se activan al entrar al viewport" },
                      { icon: CheckCircle2, text: "Formulario multi-paso con validación y efecto confetti" },
                      { icon: Globe, text: "Efecto de escritura (typing) que cicla métricas reales" },
                      { icon: Zap, text: "Animaciones de entrada y microinteracciones" },
                    ].map(({ icon: Icon, text }, i) => (
                      <li key={i} className="flex items-start gap-4 text-sm font-light text-gray-400">
                        <Icon className="mt-0.5 h-4 w-4 shrink-0 text-white/40" />
                        {text}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto border border-gray-800 bg-black/40 p-6 text-center">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-400">¿Quieres un sitio así para tu negocio?</p>
                  <Button
                    size="lg"
                    onClick={() => {
                      triggerProgress();
                      document.getElementById("iniciar")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full rounded-none bg-white px-8 py-6 text-sm font-bold text-black transition-transform hover:scale-[1.02] hover:bg-gray-200"
                  >
                    Solicitar diagnóstico <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

const services = [
  {
    id: "bot",
    icon: Bot,
    title: "Agente de Ventas 24/7",
    description:
      "Un vendedor virtual que atiende clientes, da precios, arma pedidos, recuerda deudas y gestiona cobros. Sin pausa. Sin descanso.",
    features: [
      "Atiende por WhatsApp",
      "Calcula tasas automáticamente",
      "Recuerda historial de cada cliente",
      "Reconoce notas de voz y comprobantes",
    ],
    color: "purple",
  },
  {
    id: "web",
    icon: Code,
    title: "Interfaces con Propósito",
    description:
      "Formularios que convierten y conectan solos. Una interfaz clara que guía al usuario y deja todo listo para operar sin fricción.",
    features: ["Formularios que convierten", "Animaciones e interactividad", "Integrado con tus herramientas", "Mobile-first, carga rápida"],
    color: "cyan",
  },
  {
    id: "arch",
    icon: Cpu,
    title: "Arquitectura Integral",
    description:
      "Cuando necesitas que todo tu negocio opere como un sistema conectado. Automatización + web + base de datos + agente, todo hablando entre sí.",
    features: ["Diseño del sistema completo", "Integración de herramientas", "Base de datos estructurada", "Escalable desde el inicio"],
    color: "violet",
  },
  {
    id: "reports",
    icon: BarChart3,
    title: "Reportes Automatizados para Agencias",
    description:
      "Entrega reportes a clientes sin trabajo manual: dashboards, resúmenes semanales y métricas en un solo lugar, listos para enviar.",
    features: [
      "Dashboards y KPIs por cliente",
      "Reportes semanales/mensuales automáticos",
      "Consolidación multi-plataforma",
      "Entrega lista para compartir",
    ],
    color: "cyan",
  },
];

const ServicesSection = ({ triggerProgress }: { triggerProgress: () => void }) => (
  <section id="sistemas" className="relative z-10 mx-auto max-w-7xl px-4 py-24 overflow-hidden rounded-3xl">
    <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none">
      <ShaderAnimation />
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-[#050507] z-0 pointer-events-none" />
    <div className="absolute top-0 h-px w-full bg-gradient-to-r from-transparent via-purple-500/30 to-transparent z-10" />
    <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer} className="relative z-10">
      <motion.div variants={fadeInUp} className="mb-20 text-center">
        <h2 className="text-5xl font-black md:text-6xl tracking-tighter">
          Lo que <span className="text-purple-500">Construyo</span>.
        </h2>
        <p className="mt-4 text-lg font-light text-gray-400">Elige el tipo de solución que necesita tu negocio.</p>
      </motion.div>
      <div className="grid gap-0 md:grid-cols-2 lg:grid-cols-4 border-l border-t border-gray-800 bg-[#050507]/60 backdrop-blur-md">
        {services.map((s, index) => {
          const Icon = s.icon;
          const isAccent = index === 0;
          return (
            <motion.div key={s.id} variants={fadeScale} className="border-r border-b border-gray-800 bg-[#050507] group relative flex h-full flex-col overflow-hidden transition-all hover:bg-[rgba(255,255,255,0.02)]">
              <motion.div
                className="pointer-events-none absolute inset-0 z-[1]"
                initial={{ opacity: 1 }}
                whileInView={{ opacity: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 + index * 0.12 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent" />
                <div className="absolute inset-0 shimmer opacity-20" />
                <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <div className="absolute inset-0 p-8">
                  <div className="flex items-start justify-between">
                    <div className="h-14 w-14 rounded-xl border border-white/10 bg-white/5" />
                    <div className="h-6 w-16 rounded-full border border-white/10 bg-black/20" />
                  </div>
                  <div className="mt-8 space-y-3">
                    <div className="h-5 w-3/4 rounded-md bg-white/5" />
                    <div className="h-3 w-full rounded-md bg-white/5" />
                    <div className="h-3 w-11/12 rounded-md bg-white/5" />
                    <div className="h-3 w-9/12 rounded-md bg-white/5" />
                  </div>
                  <div className="mt-10 space-y-3">
                    <div className="h-3 w-10/12 rounded-md bg-white/5" />
                    <div className="h-3 w-9/12 rounded-md bg-white/5" />
                    <div className="h-3 w-8/12 rounded-md bg-white/5" />
                  </div>
                </div>
              </motion.div>
              <div className="pointer-events-none absolute inset-0 opacity-45 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-70">
                <div className="absolute -inset-px bg-gradient-to-br from-purple-500/12 via-cyan-500/10 to-transparent" />
                <div className="absolute inset-0 shimmer opacity-15" />
              </div>
              <div className="relative z-[2] p-8">
                <div className="flex justify-between items-start">
                  <div className={`mb-6 flex h-14 w-14 items-center justify-center border ${isAccent ? 'border-purple-500 bg-purple-500/10 text-purple-400' : 'border-gray-700 bg-white/5 text-gray-400'}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
                


                <h3 className="mb-3 text-xl font-bold tracking-tight text-white">{s.title}</h3>
                <p className="mb-6 text-sm font-light leading-relaxed text-gray-400">{s.description}</p>
                
                <ul className="mb-8 space-y-3">
                  {s.features.slice(0, 3).map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm md:text-base font-light text-gray-300">
                      <span className={`mt-2 h-1.5 w-1.5 shrink-0 ${isAccent ? 'bg-purple-500' : 'bg-gray-500'}`} />
                      {f}
                    </li>
                  ))}
                  {s.features.length > 3 && (
                    <li className="flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-widest text-gray-400 pt-2">
                       +{s.features.length - 3} Características
                    </li>
                  )}
                </ul>
              </div>
              
              <div className="relative z-[2] mt-auto px-8 pb-8">
                <Button
                 variant="ghost"
                 disabled={s.id === "reports"}
                 className={`w-full h-14 rounded-none border ${isAccent ? 'border-purple-500/50 bg-purple-500/10 text-purple-400 hover:bg-purple-500 hover:text-white' : 'border-gray-800 bg-transparent text-gray-400 hover:bg-white hover:text-black'} text-xs md:text-sm font-bold uppercase tracking-widest transition-all ${s.id === 'reports' ? 'opacity-30 cursor-not-allowed' : ''}`}
                 onClick={() => {
                   if (s.id !== "reports") {
                     triggerProgress();
                     document.getElementById("iniciar")?.scrollIntoView({ behavior: "smooth" });
                   }
                 }}
                >
                  {s.id === "reports" ? "PRÓXIMAMENTE" : (
                    <>Quiero esto <ArrowRight className="ml-2 h-4 w-4" /></>
                  )}
                </Button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  </section>
);

const MultiStepForm = ({ triggerProgress }: { triggerProgress: () => void }) => {
  const webhookUrl =
    "https://n8n-n8n.3rtzuv.easypanel.host/webhook-test/01ce5e83-7f9f-4b2b-af6d-2d386fea7adf";

  type Segment = "Business" | "Agency" | "Student" | "";
  type BusinessVolume = "1-10" | "11-30" | "31-80" | "80+" | "";
  type BusinessBudget = "300-500" | "500-1000" | "+1000" | "";
  type AgencyBudget = "<500" | "500-1000" | "1000-2500" | "+2500" | "";
  type AgencyObjective = "onboarding" | "reportes" | "atencion" | "contenido";

  const [segment, setSegment] = useState<Segment>("");
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState<null | "qualified" | "unqualified">(null);

  const [business, setBusiness] = useState({
    volume: "" as BusinessVolume,
    hasWaba: "" as "si" | "no" | "",
    budget: "" as BusinessBudget,
    pain: "",
    name: "",
    phone: "",
    email: "",
  });

  const [agency, setAgency] = useState({
    objectives: [] as AgencyObjective[],
    hasAutomation: "" as "si" | "no" | "",
    budget: "" as AgencyBudget,
    scale: "",
    name: "",
    phone: "",
    email: "",
  });

  const [student, setStudent] = useState({ name: "", phone: "", email: "" });

  const createConfetti = () => {
    const end = Date.now() + 2 * 1000;
    const colors = ["#8b5cf6", "#06b6d4", "#ffffff"];
    (function frame() {
      const el = document.createElement("div");
      document.body.appendChild(el);
      el.style.position = "fixed";
      el.style.width = "10px";
      el.style.height = "10px";
      el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      el.style.left = Math.random() * 100 + "vw";
      el.style.top = "-10px";
      el.style.zIndex = "9999";
      el.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";
      const animation = el.animate(
        [
          { transform: `translate3d(0,0,0) rotate(0deg)`, opacity: "1" },
          {
            transform: `translate3d(${Math.random() * 200 - 100}px,100vh,0) rotate(${Math.random() * 720}deg)`,
            opacity: "0",
          },
        ],
        { duration: 1000 + Math.random() * 1000, easing: "cubic-bezier(.37,0,.63,1)" },
      );
      animation.onfinish = () => el.remove();
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  const score = () => {
    if (segment === "Student") return 0;
    if (segment === "Business") {
      const budgetPoints: Record<BusinessBudget, number> = { "": 0, "300-500": 1, "500-1000": 2, "+1000": 3 };
      const volumePoints: Record<BusinessVolume, number> = { "": 0, "1-10": 0, "11-30": 1, "31-80": 2, "80+": 3 };
      const wabaPoints = business.hasWaba === "si" ? 1 : 0;
      return budgetPoints[business.budget] + volumePoints[business.volume] + wabaPoints;
    }
    const objectivePoints: Record<AgencyObjective, number> = { onboarding: 2, reportes: 2, atencion: 3, contenido: 2 };
    const objectivesPoints = agency.objectives.reduce((acc, o) => acc + (objectivePoints[o] ?? 0), 0);
    const automationPoints = agency.hasAutomation === "si" ? 2 : 1;
    const scalePoints = agency.scale.trim().length >= 12 ? 2 : 1;
    const budgetPoints: Record<AgencyBudget, number> = { "": 0, "<500": 0, "500-1000": 1, "1000-2500": 2, "+2500": 3 };
    return objectivesPoints + automationPoints + scalePoints + budgetPoints[agency.budget];
  };

  const isQualified = () => segment === "Business" && (business.budget === "500-1000" || business.budget === "+1000");

  const resetAll = () => {
    setSegment("");
    setStep(0);
    setSubmitted(null);
    setBusiness({ volume: "", hasWaba: "", budget: "", pain: "", name: "", phone: "", email: "" });
    setAgency({ objectives: [], hasAutomation: "", budget: "", scale: "", name: "", phone: "", email: "" });
    setStudent({ name: "", phone: "", email: "" });
  };

  const submit = async () => {
    const payloadBase = {
      tipo: segment === "Student" ? "waitlist" : "diagnostico-calificador",
      segment,
      score: score(),
      qualified: isQualified(),
      page: window.location.href,
      createdAt: new Date().toISOString(),
    };

    const payload =
      segment === "Business"
        ? { ...payloadBase, ...business, volumePerDay: business.volume, investmentEstimated: business.budget, phone: business.phone }
        : segment === "Agency"
          ? {
              ...payloadBase,
              ...agency,
              investmentEstimated: agency.budget,
              phone: agency.phone,
            }
          : { ...payloadBase, ...student, phone: student.phone };

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Webhook request failed");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submit();
      setSubmitted(isQualified() ? "qualified" : "unqualified");
      createConfetti();
    } catch {
      setSubmitted(null);
    } finally {
      setLoading(false);
    }
  };

  const progressCount = segment === "Business" ? 5 : segment === "Agency" ? 4 : 2;
  const progressStep = Math.max(0, Math.min(step, progressCount - 1));

  return (
    <section id="como-funciona" className="relative z-10 mx-auto max-w-4xl px-4 py-20">
      <div id="iniciar" />
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl md:p-12 transition-all relative overflow-hidden"
      >
        <div className="mb-14 border-b border-gray-800 pb-8 text-center">
          <h2 className="mb-2 text-4xl font-black md:text-5xl">Diagnóstico</h2>
          <p className="text-gray-400">Responde esto y te digo el siguiente paso exacto.</p>
        </div>

        <div className="mb-10 flex items-center justify-center space-x-2">
          {Array.from({ length: progressCount }).map((_, idx) => (
            <div key={idx} className="flex items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center border text-xs ${
                  idx <= progressStep
                    ? "border-purple-500 bg-purple-500/10 text-purple-400 font-bold"
                    : "border-white/10 bg-black/20 text-gray-600"
                } transition-colors`}
              >
                {idx < progressStep ? <CheckCircle2 className="h-5 w-5" /> : idx + 1}
              </div>
              {idx < progressCount - 1 && (
                <div className={`mx-2 h-px w-8 ${idx < progressStep ? "bg-purple-500" : "bg-white/10"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="min-h-[320px]">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                {submitted === "qualified" ? (
                  <>
                    <div className="mb-6 flex h-24 w-24 items-center justify-center border border-cyan-500/30 bg-cyan-500/10 text-cyan-300">
                      <CheckCircle2 className="h-10 w-10" />
                    </div>
                    <h3 className="mb-2 text-3xl font-black">Perfecto.</h3>
                    <p className="max-w-xl text-gray-400">Agenda tu llamada y lo aterrizamos con claridad.</p>
                    <div className="mt-8 w-full overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                      <iframe title="Agenda Ramiz" src={CAL_IFRAME_SRC} className="h-[720px] w-full" loading="lazy" />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mb-6 flex h-24 w-24 items-center justify-center border border-purple-500/30 bg-purple-500/10 text-purple-300">
                      <Check className="h-10 w-10" />
                    </div>
                    <h3 className="mb-2 text-3xl font-black">Listo.</h3>
                    <p className="max-w-xl text-gray-400">Ya recibí tu info. Mientras tanto, aquí me encuentras:</p>
                    <div className="mt-8 flex items-center justify-center gap-4">
                      <a
                        href="https://instagram.com/ramiz.componte"
                        className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm font-semibold text-white/90 hover:bg-white/5"
                      >
                        <Instagram className="h-4 w-4" /> Instagram
                      </a>
                      <a
                        href="https://www.tiktok.com/@ramiz.componte"
                        className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm font-semibold text-white/90 hover:bg-white/5"
                      >
                        <TikTokIcon className="h-4 w-4" /> TikTok
                      </a>
                    </div>
                  </>
                )}

                <Button
                  type="button"
                  variant="ghost"
                  onClick={resetAll}
                  className="mt-10 rounded-none border-b-2 border-transparent px-0 text-gray-400 hover:border-gray-400 hover:bg-transparent hover:text-white"
                >
                  Enviar otro
                </Button>
              </motion.div>
            ) : step === 0 ? (
              <motion.div key="pick" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <h3 className="mb-6 text-2xl font-bold tracking-tight text-white">¿Cuál es tu perfil actual?</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    { id: "Business", label: "Dueño de Negocio", icon: Globe, desc: "Quiero ahorrar tiempo y vender más" },
                    { id: "Agency", label: "Freelancer / Agencia", icon: User, desc: "Quiero escalar resultados sin caos" },
                  ].map((p) => {
                    const I = p.icon;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => {
                          setSegment(p.id as Segment);
                          triggerProgress();
                          setStep(1);
                        }}
                        className="group rounded-2xl border border-white/10 bg-black/20 p-6 text-left transition-all hover:bg-white/[0.03]"
                      >
                        <div className="mb-4 flex h-12 w-12 items-center justify-center border border-white/10 bg-black/25 text-white/90">
                          <I className="h-5 w-5" />
                        </div>
                        <p className="text-sm font-bold text-white">{p.label}</p>
                        <p className="mt-1 text-xs text-gray-400">{p.desc}</p>
                      </button>
                    );
                  })}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSegment("Student");
                    triggerProgress();
                    setStep(1);
                  }}
                  className="mt-6 w-full rounded-2xl border border-white/10 bg-black/20 p-4 text-left text-sm text-white/80 transition-colors hover:bg-white/[0.03]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Lista de espera</p>
                      <p className="mt-1">
                        ¿Quieres aprender a construir esto? <span className="text-purple-300 font-semibold">Únete aquí</span>.
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80">
                      Entrar
                    </span>
                  </div>
                </button>
              </motion.div>
            ) : segment === "Student" ? (
              <motion.div key="student" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <h3 className="text-2xl font-bold tracking-tight text-white mb-2">Lista de espera</h3>
                <p className="text-gray-400">Nombre y email y ya.</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-3 block text-xs font-bold uppercase tracking-widest text-gray-500">Nombre</label>
                      <Input
                        placeholder="Tu nombre"
                        required
                        value={student.name}
                        onChange={(e) => setStudent((p) => ({ ...p, name: e.target.value }))}
                        className="rounded-xl border-white/10 bg-black/25 py-6 text-white placeholder:text-gray-600 focus-visible:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="mb-3 block text-xs font-bold uppercase tracking-widest text-gray-500">Teléfono</label>
                      <Input
                        placeholder="Tu número"
                        required
                        value={student.phone}
                        onChange={(e) => setStudent((p) => ({ ...p, phone: e.target.value }))}
                        className="rounded-xl border-white/10 bg-black/25 py-6 text-white placeholder:text-gray-600 focus-visible:ring-purple-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="mb-3 block text-xs font-bold uppercase tracking-widest text-gray-500">Email</label>
                      <Input
                        placeholder="tu@email.com"
                        type="email"
                        required
                        value={student.email}
                        onChange={(e) => setStudent((p) => ({ ...p, email: e.target.value }))}
                        className="rounded-xl border-white/10 bg-black/25 py-6 text-white placeholder:text-gray-600 focus-visible:ring-purple-500"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between border-t border-gray-800 pt-6">
                    <Button type="button" variant="ghost" onClick={resetAll} className="rounded-none border-b-2 border-transparent px-0 text-gray-400 hover:border-gray-400 hover:bg-transparent hover:text-white">
                      Atrás
                    </Button>
                    <Button type="submit" disabled={loading || !student.name || !student.phone || !student.email} className="rounded-none bg-white px-8 py-6 text-sm font-bold text-black transition-transform hover:scale-[1.02] hover:bg-gray-200">
                      {loading ? "Enviando..." : "Unirme"}
                    </Button>
                  </div>
                </form>
              </motion.div>
            ) : segment === "Business" ? (
              step === 1 ? (
                <motion.div key="b2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <h3 className="text-2xl font-bold tracking-tight text-white mb-2">Volumen</h3>
                  <p className="text-gray-400">¿Cuántos mensajes o clientes atiendes manualmente al día?</p>
                  <div className="grid gap-3 md:grid-cols-2">
                    {[
                      { id: "1-10", label: "1 – 10" },
                      { id: "11-30", label: "11 – 30" },
                      { id: "31-80", label: "31 – 80" },
                      { id: "80+", label: "80+" },
                    ].map((o) => (
                      <button
                        key={o.id}
                        type="button"
                        onClick={() => setBusiness((p) => ({ ...p, volume: o.id as BusinessVolume }))}
                        className={`rounded-2xl border px-6 py-5 text-left transition-all ${business.volume === o.id ? "border-cyan-500/50 bg-cyan-500/10" : "border-white/10 bg-black/20 hover:bg-white/[0.03]"}`}
                      >
                        <p className="text-sm font-bold text-white">{o.label}</p>
                        <p className="mt-1 text-xs text-gray-400">Mensajes / día</p>
                      </button>
                    ))}
                  </div>
                  <div className="mt-2">
                    <label className="mb-3 block text-xs font-bold uppercase tracking-widest text-gray-500">¿Usas WhatsApp Business actualmente?</label>
                    <div className="grid gap-3 md:grid-cols-2">
                      {[
                        { id: "si", label: "Sí" },
                        { id: "no", label: "No" },
                      ].map((o) => (
                        <button
                          key={o.id}
                          type="button"
                          onClick={() => setBusiness((p) => ({ ...p, hasWaba: o.id as any }))}
                          className={`rounded-2xl border px-6 py-5 text-left transition-all ${
                            business.hasWaba === o.id ? "border-purple-500/50 bg-purple-500/10" : "border-white/10 bg-black/20 hover:bg-white/[0.03]"
                          }`}
                        >
                          <p className="text-sm font-bold text-white">{o.label}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between border-t border-gray-800 pt-6">
                    <Button type="button" variant="ghost" onClick={resetAll} className="rounded-none border-b-2 border-transparent px-0 text-gray-400 hover:border-gray-400 hover:bg-transparent hover:text-white">
                      Atrás
                    </Button>
                    <Button type="button" disabled={!business.volume || !business.hasWaba} onClick={() => { triggerProgress(); setStep(2); }} className="rounded-none bg-purple-600 px-8 hover:bg-purple-500 text-xs font-bold uppercase tracking-widest disabled:opacity-50">
                      Continuar <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ) : step === 2 ? (
                <motion.div key="b3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <h3 className="text-2xl font-bold tracking-tight text-white mb-2">Inversión estimada</h3>
                  <p className="text-gray-400">¿Qué tipo de presupuesto se lleva esto para desarrollo/solución?</p>
                  <div className="grid gap-3 md:grid-cols-3">
                    {[
                      { id: "300-500", label: "$300 – $500" },
                      { id: "500-1000", label: "$500 – $1000" },
                      { id: "+1000", label: "+$1000" },
                    ].map((o) => (
                      <button
                        key={o.id}
                        type="button"
                        onClick={() => setBusiness((p) => ({ ...p, budget: o.id as BusinessBudget }))}
                        className={`rounded-2xl border px-6 py-5 text-left transition-all ${
                          business.budget === o.id ? "border-cyan-500/50 bg-cyan-500/10" : "border-white/10 bg-black/20 hover:bg-white/[0.03]"
                        }`}
                      >
                        <p className="text-sm font-bold text-white">{o.label}</p>
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between border-t border-gray-800 pt-6">
                    <Button type="button" variant="ghost" onClick={() => setStep(1)} className="rounded-none border-b-2 border-transparent px-0 text-gray-400 hover:border-gray-400 hover:bg-transparent hover:text-white">
                      Atrás
                    </Button>
                    <Button type="button" disabled={!business.budget} onClick={() => { triggerProgress(); setStep(3); }} className="rounded-none bg-purple-600 px-8 hover:bg-purple-500 text-xs font-bold uppercase tracking-widest disabled:opacity-50">
                      Continuar <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ) : step === 3 ? (
                <motion.div key="b1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <h3 className="text-2xl font-bold tracking-tight text-white mb-2">Punto de dolor</h3>
                  <p className="text-gray-400">¿Qué proceso específico te quita más tiempo o te hace perder dinero hoy?</p>
                  <Textarea
                    value={business.pain}
                    onChange={(e) => setBusiness((p) => ({ ...p, pain: e.target.value }))}
                    placeholder="Ej: responder precios todo el día, agendar citas, seguimiento de pagos..."
                    className="min-h-[140px] rounded-xl border-white/10 bg-black/25 text-white placeholder:text-gray-600 focus-visible:ring-purple-500"
                  />
                  <div className="flex justify-between border-t border-gray-800 pt-6">
                    <Button type="button" variant="ghost" onClick={() => setStep(2)} className="rounded-none border-b-2 border-transparent px-0 text-gray-400 hover:border-gray-400 hover:bg-transparent hover:text-white">
                      Atrás
                    </Button>
                    <Button
                      type="button"
                      disabled={!business.pain.trim()}
                      onClick={() => {
                        triggerProgress();
                        setStep(4);
                      }}
                      className="rounded-none bg-purple-600 px-8 hover:bg-purple-500 text-xs font-bold uppercase tracking-widest disabled:opacity-50"
                    >
                      Continuar <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="b4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <h3 className="text-2xl font-bold tracking-tight text-white mb-2">Contacto</h3>
                  <p className="text-gray-400">Con esto ya puedo responderte con claridad.</p>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="mb-3 block text-xs font-bold uppercase tracking-widest text-gray-500">Tu Nombre</label>
                        <Input placeholder="Nombre" required value={business.name} onChange={(e) => setBusiness((p) => ({ ...p, name: e.target.value }))} className="rounded-xl border-white/10 bg-black/25 py-6 text-white placeholder:text-gray-600 focus-visible:ring-purple-500" />
                      </div>
                      <div>
                        <label className="mb-3 block text-xs font-bold uppercase tracking-widest text-gray-500">Teléfono</label>
                        <Input placeholder="Tu número" required value={business.phone} onChange={(e) => setBusiness((p) => ({ ...p, phone: e.target.value }))} className="rounded-xl border-white/10 bg-black/25 py-6 text-white placeholder:text-gray-600 focus-visible:ring-purple-500" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="mb-3 block text-xs font-bold uppercase tracking-widest text-gray-500">Email</label>
                        <Input placeholder="tu@email.com" type="email" required value={business.email} onChange={(e) => setBusiness((p) => ({ ...p, email: e.target.value }))} className="rounded-xl border-white/10 bg-black/25 py-6 text-white placeholder:text-gray-600 focus-visible:ring-purple-500" />
                      </div>
                    </div>
                    <div className="flex justify-between border-t border-gray-800 pt-6">
                      <Button type="button" variant="ghost" onClick={() => setStep(3)} className="rounded-none border-b-2 border-transparent px-0 text-gray-400 hover:border-gray-400 hover:bg-transparent hover:text-white">
                        Atrás
                      </Button>
                      <Button type="submit" disabled={loading || !business.name || !business.phone || !business.email} className="rounded-none bg-white px-8 py-6 text-sm font-bold text-black transition-transform hover:scale-[1.02] hover:bg-gray-200">
                        {loading ? "Enviando..." : "Enviar"}
                      </Button>
                    </div>
                  </form>
                </motion.div>
              )
            ) : (
              step === 1 ? (
                <motion.div key="a2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <h3 className="text-2xl font-bold tracking-tight text-white mb-2">Objetivo</h3>
                  <p className="text-gray-400">¿Qué buscas automatizar? Puedes elegir más de una.</p>
                  <div className="grid gap-3 md:grid-cols-2">
                    {[
                      { id: "onboarding", label: "Onboarding" },
                      { id: "reportes", label: "Reportes" },
                      { id: "atencion", label: "Atención" },
                      { id: "contenido", label: "Creación de contenidos" },
                    ].map((o) => (
                      <button
                        key={o.id}
                        type="button"
                        onClick={() => {
                          setAgency((p) => {
                            const exists = p.objectives.includes(o.id as AgencyObjective);
                            const objectives = exists
                              ? p.objectives.filter((x) => x !== (o.id as AgencyObjective))
                              : [...p.objectives, o.id as AgencyObjective];
                            return { ...p, objectives };
                          });
                        }}
                        className={`rounded-2xl border px-6 py-5 text-left transition-all ${
                          agency.objectives.includes(o.id as AgencyObjective)
                            ? "border-cyan-500/50 bg-cyan-500/10"
                            : "border-white/10 bg-black/20 hover:bg-white/[0.03]"
                        }`}
                      >
                        <p className="text-sm font-bold text-white">{o.label}</p>
                      </button>
                    ))}
                  </div>
                  <div className="mt-2">
                    <label className="mb-3 block text-xs font-bold uppercase tracking-widest text-gray-500">¿Ya tienes algún proceso automatizado?</label>
                    <div className="grid gap-3 md:grid-cols-2">
                      {[
                        { id: "si", label: "Sí" },
                        { id: "no", label: "No" },
                      ].map((o) => (
                        <button
                          key={o.id}
                          type="button"
                          onClick={() => setAgency((p) => ({ ...p, hasAutomation: o.id as any }))}
                          className={`rounded-2xl border px-6 py-5 text-left transition-all ${
                            agency.hasAutomation === o.id
                              ? "border-purple-500/50 bg-purple-500/10"
                              : "border-white/10 bg-black/20 hover:bg-white/[0.03]"
                          }`}
                        >
                          <p className="text-sm font-bold text-white">{o.label}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-2">
                    <label className="mb-3 block text-xs font-bold uppercase tracking-widest text-gray-500">Presupuesto para el proyecto</label>
                    <div className="grid gap-3 md:grid-cols-2">
                      {[
                        { id: "<500", label: "< $500" },
                        { id: "500-1000", label: "$500 – $1000" },
                        { id: "1000-2500", label: "$1000 – $2500" },
                        { id: "+2500", label: "+ $2500" },
                      ].map((o) => (
                        <button
                          key={o.id}
                          type="button"
                          onClick={() => setAgency((p) => ({ ...p, budget: o.id as AgencyBudget }))}
                          className={`rounded-2xl border px-6 py-5 text-left transition-all ${
                            agency.budget === o.id
                              ? "border-cyan-500/50 bg-cyan-500/10"
                              : "border-white/10 bg-black/20 hover:bg-white/[0.03]"
                          }`}
                        >
                          <p className="text-sm font-bold text-white">{o.label}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between border-t border-gray-800 pt-6">
                    <Button type="button" variant="ghost" onClick={resetAll} className="rounded-none border-b-2 border-transparent px-0 text-gray-400 hover:border-gray-400 hover:bg-transparent hover:text-white">
                      Atrás
                    </Button>
                    <Button
                      type="button"
                      disabled={agency.objectives.length === 0 || !agency.hasAutomation || !agency.budget}
                      onClick={() => {
                        triggerProgress();
                        setStep(2);
                      }}
                      className="rounded-none bg-purple-600 px-8 hover:bg-purple-500 text-xs font-bold uppercase tracking-widest disabled:opacity-50"
                    >
                      Continuar <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ) : step === 2 ? (
                <motion.div key="a1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <h3 className="text-2xl font-bold tracking-tight text-white mb-2">Escala</h3>
                  <p className="text-gray-400">¿Cuántos clientes manejas y qué servicios ofreces?</p>
                  <Textarea
                    value={agency.scale}
                    onChange={(e) => setAgency((p) => ({ ...p, scale: e.target.value }))}
                    placeholder="Ej: 8 clientes, ads + landing + contenido..."
                    className="min-h-[140px] rounded-xl border-white/10 bg-black/25 text-white placeholder:text-gray-600 focus-visible:ring-purple-500"
                  />
                  <div className="flex justify-between border-t border-gray-800 pt-6">
                    <Button type="button" variant="ghost" onClick={() => setStep(1)} className="rounded-none border-b-2 border-transparent px-0 text-gray-400 hover:border-gray-400 hover:bg-transparent hover:text-white">
                      Atrás
                    </Button>
                    <Button
                      type="button"
                      disabled={!agency.scale.trim()}
                      onClick={() => {
                        triggerProgress();
                        setStep(3);
                      }}
                      className="rounded-none bg-purple-600 px-8 hover:bg-purple-500 text-xs font-bold uppercase tracking-widest disabled:opacity-50"
                    >
                      Continuar <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="a3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <h3 className="text-2xl font-bold tracking-tight text-white mb-2">Contacto</h3>
                  <p className="text-gray-400">Con esto ya puedo responderte con claridad.</p>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="mb-3 block text-xs font-bold uppercase tracking-widest text-gray-500">Tu Nombre</label>
                        <Input placeholder="Nombre" required value={agency.name} onChange={(e) => setAgency((p) => ({ ...p, name: e.target.value }))} className="rounded-xl border-white/10 bg-black/25 py-6 text-white placeholder:text-gray-600 focus-visible:ring-purple-500" />
                      </div>
                      <div>
                        <label className="mb-3 block text-xs font-bold uppercase tracking-widest text-gray-500">Teléfono</label>
                        <Input placeholder="Tu número" required value={agency.phone} onChange={(e) => setAgency((p) => ({ ...p, phone: e.target.value }))} className="rounded-xl border-white/10 bg-black/25 py-6 text-white placeholder:text-gray-600 focus-visible:ring-purple-500" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="mb-3 block text-xs font-bold uppercase tracking-widest text-gray-500">Email</label>
                        <Input placeholder="tu@email.com" type="email" required value={agency.email} onChange={(e) => setAgency((p) => ({ ...p, email: e.target.value }))} className="rounded-xl border-white/10 bg-black/25 py-6 text-white placeholder:text-gray-600 focus-visible:ring-purple-500" />
                      </div>
                    </div>
                    <div className="flex justify-between border-t border-gray-800 pt-6">
                      <Button type="button" variant="ghost" onClick={() => setStep(2)} className="rounded-none border-b-2 border-transparent px-0 text-gray-400 hover:border-gray-400 hover:bg-transparent hover:text-white">
                        Atrás
                      </Button>
                      <Button type="submit" disabled={loading || !agency.name || !agency.phone || !agency.email} className="rounded-none bg-white px-8 py-6 text-sm font-bold text-black transition-transform hover:scale-[1.02] hover:bg-gray-200">
                        {loading ? "Enviando..." : "Enviar"}
                      </Button>
                    </div>
                  </form>
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
};

const TradingCard = () => {
  return (
    <section className="relative z-10 mx-auto max-w-lg px-4 py-32">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeInUp} className="mb-14 text-center">
        <h2 className="text-5xl font-black md:text-6xl tracking-tighter">
          El <span className="text-purple-500 text-opacity-80">Arquitecto</span>.
        </h2>
        <p className="mt-4 text-sm font-semibold tracking-widest text-gray-500 uppercase">Detrás del ecosistema</p>
      </motion.div>

      <motion.div
        initial={{ rotateY: -10, opacity: 0 }}
        whileInView={{ rotateY: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="group mx-auto w-full max-w-sm"
        style={{ perspective: "1000px" }}
      >
        <div className="trading-card border-t-4 border-purple-500/80 bg-[#050507] p-8 lg:p-10 shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(139,92,246,0.1)]">
          <div className="relative z-10 flex flex-col uppercase tracking-widest text-left">
            <div className="relative mb-8 overflow-hidden rounded-2xl border border-white/10 bg-black/40">
              <img src={PROFILE_CARD_PHOTO_URL} alt="Ramiz" className="h-64 w-full object-cover" loading="lazy" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-transparent" />
              <div className="pointer-events-none absolute inset-0 shimmer opacity-10" />
            </div>
            <h3 className="text-4xl font-black text-white mb-1 tracking-tighter normal-case">@Ramiz.Componte</h3>
            <p className="text-xs md:text-sm font-bold text-gray-500 mb-8">Arquitecto de Automatización</p>

            <div className="-mt-4 mb-8 flex items-center gap-3">
              <motion.a
                href="https://instagram.com/ramiz.componte"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-xs font-bold text-white/80 normal-case tracking-normal hover:bg-white/5"
                whileHover={{ scale: 1.06, rotate: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
              >
                <Instagram className="h-4 w-4" /> Instagram
              </motion.a>
              <motion.a
                href="https://www.tiktok.com/@ramiz.componte"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-xs font-bold text-white/80 normal-case tracking-normal hover:bg-white/5"
                whileHover={{ scale: 1.06, rotate: 1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
              >
                <TikTokIcon className="h-4 w-4" /> TikTok
              </motion.a>
            </div>
            
            <div className="h-px w-full bg-gray-800 mb-8" />

            <div className="gap-4 text-xs md:text-sm font-bold text-gray-600 mb-8">
              <div>
                <p className="text-purple-400 mb-3 uppercase tracking-widest">Especialidad Central</p>
                <ul className="text-white space-y-3 normal-case text-sm tracking-normal font-light">
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-purple-500"/> Agentes de Inteligencia Artificial</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-purple-500"/> Sitios Web con Lógica Aplicada</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-purple-500"/> Automatización Integral de Negocios</li>
                </ul>
              </div>
            </div>

            <div className="w-full border border-gray-800 bg-black/40 p-5 mt-auto text-left">
              <div className="grid grid-cols-3 gap-2 divide-x divide-gray-800 text-center">
                <div>
                  <p className="text-xl md:text-2xl font-black text-purple-400">+12</p>
                  <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">Sistemas</p>
                </div>
                <div>
                  <p className="text-xl md:text-2xl font-black text-purple-400">100%</p>
                  <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">Uptime</p>
                </div>
                <div>
                  <p className="text-xl md:text-2xl font-black text-purple-400">24/7</p>
                  <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">Operación</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M21.5 7.06c-1.49-.03-2.9-.52-4.02-1.41A5.74 5.74 0 0 1 15.5 1h-3.3v13.2a3.05 3.05 0 0 1-1.8 2.78 3.05 3.05 0 0 1-3.9-1.12 3.05 3.05 0 0 1 2.35-4.78c.3 0 .6.04.88.12V7.75a6.84 6.84 0 0 0-1.03-.08 6.35 6.35 0 0 0-6.27 7.5 6.35 6.35 0 0 0 9.77 3.9 6.33 6.33 0 0 0 3-5.44V8.1c1.2.83 2.63 1.28 4.1 1.28h1.2V7.06Z" />
  </svg>
);

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "a1",
      role: "assistant",
      text: "¿Te digo la verdad? En 60 segundos el Diagnóstico me da el contexto y yo te digo el siguiente paso exacto. Si quieres, arranca por ahí.",
    },
  ]);

  const scrollToFunnel = () => document.getElementById("iniciar")?.scrollIntoView({ behavior: "smooth" });

  const getAssistantReply = (text: string) => {
    const t = text.toLowerCase();
    if (t.includes("precio") || t.includes("costo") || t.includes("cuanto") || t.includes("cuánto")) {
      return "Depende del alcance, pero si me dices tu volumen y tu objetivo, te doy un rango realista. Si quieres, llena el Diagnóstico y te lo aterrizo.";
    }
    if (t.includes("whatsapp") || t.includes("waba")) {
      return "Sí, se puede trabajar con WhatsApp Business. Lo importante es definir qué preguntas responde, cómo registra datos y cuándo pasa a un humano.";
    }
    if (t.includes("agente") || t.includes("ia") || t.includes("chat")) {
      return "Un agente puede atender, calificar y derivar. Lo bonito es que no es solo conversar: también captura datos y ejecuta acciones (sin molestar al equipo).";
    }
    if (text.trim().length > 180) {
      return "Buen contexto. Para responderte fino, lo mejor es que lo pases por el Diagnóstico: así lo convierto en un plan con pasos claros.";
    }
    return "Suena bien. ¿Eso hoy te quita tiempo, te hace perder ventas, o te genera errores?";
  };

  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const userMsg: ChatMessage = { id: `u-${Date.now()}`, role: "user", text: trimmed };
    const assistantMsg: ChatMessage = {
      id: `a-${Date.now()}`,
      role: "assistant",
      text: getAssistantReply(trimmed),
    };
    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInput("");
  };

  return (
    <div className="fixed bottom-5 right-5 z-[55]">
      <div className="relative">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute bottom-24 right-0 w-[340px] overflow-hidden rounded-2xl border border-white/10 bg-black/70 backdrop-blur-xl shadow-[0_30px_80px_rgba(0,0,0,0.75)]"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 overflow-hidden rounded-xl border border-white/10 bg-black/30">
                    <img src={AGENT_AVATAR_URL} alt="Agente" className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Agente</p>
                    <p className="text-[10px] text-green-400 font-semibold tracking-widest uppercase">en línea</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-lg border border-white/10 bg-black/20 p-2 text-white/80 hover:bg-white/5"
                  aria-label="Cerrar"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="max-h-[320px] space-y-3 overflow-auto px-4 py-4">
                {messages.map((m) => (
                  <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[85%] rounded-2xl border px-3 py-2 text-sm leading-relaxed ${
                        m.role === "user"
                          ? "border-purple-500/30 bg-purple-500/10 text-white"
                          : "border-white/10 bg-white/5 text-white/90"
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 p-3">
                <div className="mb-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      scrollToFunnel();
                    }}
                    className="rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1.5 text-xs font-semibold text-purple-200 hover:bg-purple-500/15"
                  >
                    Empezar Diagnóstico
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const userMsg: ChatMessage = {
                        id: `u-${Date.now()}`,
                        role: "user",
                        text: "¿Cuánto cuesta?",
                      };
                      const assistantMsg: ChatMessage = {
                        id: `a-${Date.now()}`,
                        role: "assistant",
                        text: getAssistantReply("¿Cuánto cuesta?"),
                      };
                      setMessages((prev) => [...prev, userMsg, assistantMsg]);
                    }}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/80 hover:bg-white/10"
                  >
                    Ver rango
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                    placeholder="Escribe aquí..."
                    className="h-11 w-full rounded-xl border border-white/10 bg-black/25 px-3 text-sm text-white placeholder:text-gray-500 focus:border-purple-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={sendMessage}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10"
                    aria-label="Enviar"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      scrollToFunnel();
                    }}
                    className="text-xs font-semibold text-purple-300 hover:text-purple-200"
                  >
                    Ir al Diagnóstico
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMessages([
                        {
                          id: "a1",
                          role: "assistant",
                          text: "¿Te digo la verdad? En 60 segundos el Diagnóstico me da el contexto y yo te digo el siguiente paso exacto. Si quieres, arranca por ahí.",
                        },
                      ]);
                      setInput("");
                    }}
                    className="text-xs font-semibold text-white/60 hover:text-white/80"
                  >
                    Reiniciar
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="group relative">
          <div className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2">
            <div className="hidden rounded-2xl border border-white/10 bg-black/65 px-3 py-2 text-xs font-medium text-white/90 backdrop-blur-xl shadow-[0_18px_50px_rgba(0,0,0,0.6)] opacity-0 translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 md:block">
              Haz el Diagnóstico
            </div>
            <div className="md:hidden rounded-2xl border border-white/10 bg-black/55 px-3 py-2 text-xs font-medium text-white/90 backdrop-blur-xl">
              Diagnóstico
            </div>
          </div>

          <motion.button
            type="button"
            onClick={() => setOpen((v) => !v)}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 420, damping: 24 }}
            className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-purple-600/90 to-cyan-600/80 text-white shadow-[0_22px_60px_rgba(0,0,0,0.65)]"
            aria-label="Abrir asistente"
          >
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-500/60 via-cyan-500/50 to-purple-500/60 opacity-90 blur" />
            <div className="pointer-events-none absolute -inset-3 rounded-[22px] bg-purple-500/20 blur-xl opacity-60 animate-pulse" />
            <div className="pointer-events-none absolute -inset-2 rounded-[22px] border border-purple-400/30" />

            <div className="relative flex h-full w-full overflow-hidden rounded-2xl items-center justify-center">
              <img src={AGENT_AVATAR_URL} alt="Agente Avatar" className="h-full w-full object-cover" />

              <span className="absolute bottom-2 right-2 flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-35" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-green-400 ring-2 ring-black/60" />
              </span>
            </div>

            <span className="pointer-events-none z-10 absolute -top-2 right-1 rounded-full border border-white/10 bg-black/60 px-2 py-0.5 text-[12px] font-semibold text-white/90 backdrop-blur">
              Agente
            </span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [progressKey, setProgressKey] = useState(0);

  const triggerProgress = () => {
    setProgressKey((k) => k + 1);
  };

  const handleNav = (id: string) => {
    triggerProgress();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0F172A] text-white selection:bg-purple-500/30 selection:text-purple-200">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .shimmer {
          background: linear-gradient(125deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 70%);
          background-size: 200% 200%;
          animation: shimmer-anim 2s infinite linear;
        }
        @keyframes shimmer-anim {
          0%   { background-position: -100% -100%; }
          100% { background-position: 200% 200%; }
        }
        .noise {
          position: fixed;
          top: 0; left: 0; width: 100vw; height: 100vh;
          pointer-events: none;
          z-index: 50;
          opacity: 0.04;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
        .data-grid {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background:
            radial-gradient(900px circle at 20% 10%, rgba(139, 92, 246, 0.12), transparent 55%),
            radial-gradient(900px circle at 80% 30%, rgba(6, 182, 212, 0.10), transparent 60%),
            radial-gradient(1100px circle at 50% 90%, rgba(139, 92, 246, 0.08), transparent 60%),
            linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
          background-size: auto, auto, auto, 56px 56px, 56px 56px;
          mix-blend-mode: screen;
          opacity: 0.35;
        }
      `,
        }}
      />
      <div className="noise" />
      <div className="data-grid" />

      <AnimatePresence mode="wait">
        <motion.div
          key={progressKey}
          className="fixed left-0 top-0 z-[60] h-[2px] w-full origin-left bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500"
          initial={{ scaleX: 0, opacity: 0.9 }}
          animate={{ scaleX: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        />
      </AnimatePresence>

      <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-black/35 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center px-4">
          <button type="button" onClick={() => handleNav("inicio")} className="shrink-0 text-left">
            <span className="bg-gradient-to-r from-purple-400 via-fuchsia-300 to-white bg-clip-text text-lg font-extrabold tracking-tight text-transparent">
              Ramiz.Componte
            </span>
          </button>

          <nav className="mx-auto hidden items-center gap-2 rounded-full border border-white/10 bg-black/25 px-2 py-1.5 text-sm text-white/70 md:flex">
            {[
              { label: "Inicio", id: "inicio" },
              { label: "Lo que ofrecemos", id: "sistemas" },
              { label: "Casos reales", id: "casos" },
              { label: "Cómo funciona", id: "como-funciona" },
              { label: "Contacto", id: "contacto" },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className="group relative rounded-full px-3 py-1.5 transition-colors hover:bg-white/5 hover:text-white"
              >
                {item.label}
                <span className="pointer-events-none absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-cyan-400/0 to-transparent transition-all duration-300 group-hover:via-cyan-400/60" />
              </button>
            ))}
          </nav>

          <div className="w-[140px] shrink-0" />
        </div>
      </header>

      <div className="pt-16">

      <ParticleCursor />
      <HeroSection triggerProgress={triggerProgress} />

      <div className="relative">
        <div className="absolute top-0 h-px w-full bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
        <SuccessCases triggerProgress={triggerProgress} />
      </div>

      <ServicesSection triggerProgress={triggerProgress} />

      <div className="relative">
        <div className="absolute top-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
        <MultiStepForm triggerProgress={triggerProgress} />
      </div>

      <div className="relative">
        <div className="absolute top-0 h-px w-full bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
        <TradingCard />
      </div>

      <footer id="contacto" className="border-t border-slate-800 bg-slate-950 py-12 text-center">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-center space-y-6 px-4">
          <p className="text-xs text-gray-600">© {new Date().getFullYear()} @Ramiz.Componte. Todos los derechos reservados.</p>
        </div>
      </footer>
      </div>

      <ChatWidget />
    </div>
  );
};

export default Dashboard;
