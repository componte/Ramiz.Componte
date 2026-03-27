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
  const phrases = ["85% Procesos Automatizados", "156 Horas ahorradas/año", "+3 Horas libres/semana"];
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
            Sistemas que operan
          </motion.span>
          <br className="hidden md:block" /> tu negocio por ti.
        </motion.h1>

        <motion.p variants={fadeInUp} className="mb-10 mx-auto max-w-2xl text-xl font-light leading-relaxed text-gray-400 md:text-2xl">
          Diseño e implemento sistemas que automatizan procesos, estructuran información y permiten que tu negocio funcione con menos fricción.
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
            Ver Cómo Funciona
          </Button>
        </motion.div>

        {/* HERO WHATSAPP MOCKUP */}
        <motion.div variants={fadeInUp} className="mt-16 sm:mt-24 mx-auto w-full max-w-sm sm:max-w-md" style={{ perspective: "1000px" }}>
          <motion.div 
            initial={{ rotateX: 10, rotateY: -10, opacity: 0 }}
            animate={{ rotateX: 0, rotateY: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative rounded-xl border border-gray-800 bg-[#0a0a0c] p-4 sm:p-6 shadow-2xl flex flex-col gap-5 text-left transform-gpu"
          >
            <div className="flex items-center gap-3 border-b border-gray-800 pb-4">
              <div className="h-10 w-10 sm:h-12 sm:w-12 overflow-hidden rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                <Bot className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400" />
              </div>
              <div>
                <p className="text-sm sm:text-base font-bold text-white tracking-wide">Agente Inteligente</p>
                <p className="text-[10px] sm:text-xs text-green-500 font-semibold tracking-widest uppercase flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" /> en línea
                </p>
              </div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.5, type: "spring" }}
              className="self-end rounded-2xl rounded-tr-none bg-purple-600/10 border border-purple-500/20 p-3 sm:p-4 max-w-[85%]"
            >
              <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-light">¡Hola! ¿Cuánto tiene de deuda el cliente X?</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 2.5, duration: 0.5, type: "spring" }}
              className="self-start rounded-2xl rounded-tl-none bg-white/5 border border-gray-800 p-3 sm:p-4 max-w-[90%]"
            >
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-light">¡Claro! El cliente X tiene una deuda de <strong className="text-white">$45</strong>. ¿Quieres que le envíe un mensaje de recordatorio automático ahora mismo?</p>
            </motion.div>
          </motion.div>
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
    title: "Sitio Web con Lógica",
    description:
      "No solo diseño bonito — páginas que hacen cosas. Formularios que conectan, botones que disparan flujos, y datos que se muestran en tiempo real.",
    features: ["Formularios conectados a tu flujo", "Animaciones e interactividad", "Integrado con tus herramientas", "Mobile-first, carga rápida"],
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
            <motion.div key={s.id} variants={fadeScale} className="border-r border-b border-gray-800 bg-[#050507] group relative flex h-full flex-col transition-all hover:bg-[rgba(255,255,255,0.02)]">
              <div className="p-8">
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
              
              <div className="mt-auto px-8 pb-8">
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
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formType, setFormType] = useState<"client" | "student">("client");
  const [formData, setFormData] = useState({
    service: "",
    volume: "",
    budget: "",
    problem: "",
    tools: "",
    name: "",
    contact: "",
    studentReason: "",
    studentPay: "",
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      createConfetti();
    }, 1500);
  };

  const chooseService = (service: string) => {
    triggerProgress();
    setFormType("client");
    setFormData((prev) => ({ ...prev, service }));
    setStep(1);
  };

  return (
    <section id="como-funciona" className="relative z-10 mx-auto max-w-4xl px-4 py-20">
      <div id="iniciar" />
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="border-t-2 border-purple-500/40 bg-[#050507] p-8 shadow-2xl md:p-12 transition-all relative overflow-hidden"
      >
        <div className="mb-14 border-b border-gray-800 pb-8 text-center">
          <h2 className="mb-2 text-4xl font-black md:text-5xl">
            {formType === "student" && step > 0 ? "Únete a la academia" : "Iniciemos tu transformación"}
          </h2>
          <p className="text-gray-400">
            {formType === "student" && step > 0
              ? "Cuéntame por qué quieres aprender y asegura tu cupo."
              : "Completa este breve formulario para un diagnóstico preciso."}
          </p>
        </div>

        {step > 0 && (
          <div className="mb-10 flex items-center justify-center space-x-2">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center border text-xs ${
                    step >= num
                      ? "border-purple-500 bg-purple-500/10 text-purple-400 font-bold"
                      : "border-gray-800 bg-[#050507] text-gray-600"
                  } transition-colors`}
                >
                  {step > num ? <CheckCircle2 className="h-5 w-5" /> : num}
                </div>
                {num < 3 && (
                  <div
                    className={`mx-2 h-px w-8 ${step > num ? "bg-purple-500" : "bg-gray-800"}`}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        <div className="min-h-[320px]">
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <div className="mb-6 flex h-24 w-24 items-center justify-center border border-green-500/30 bg-green-500/10 text-green-400">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h3 className="mb-2 text-3xl font-black">¡Solicitud recibida!</h3>
                <p className="text-gray-400">Me pondré en contacto contigo pronto para coordinar tu diagnóstico.</p>
              </motion.div>
            ) : step === 0 ? (
              <motion.div
                key="pick"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h3 className="text-2xl font-bold tracking-tight text-white">¿Qué quieres construir primero?</h3>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-gray-500">
                    Elige una opción
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => chooseService("agente")}
                    className="group border border-gray-800 bg-black/40 p-6 text-left transition-all hover:border-purple-500/40 hover:bg-white/[0.02]"
                  >
                    <div className="mb-5 flex h-14 w-14 items-center justify-center border border-purple-500/20 bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20">
                      <Bot className="h-6 w-6" />
                    </div>
                    <p className="text-lg font-bold text-white">Agente de Ventas 24/7</p>
                    <p className="mt-2 text-xs font-light leading-relaxed text-gray-400">Automatiza atención, precios, pedidos y cobros.</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => chooseService("web")}
                    className="group border border-gray-800 bg-black/40 p-6 text-left transition-all hover:bg-white/[0.02]"
                  >
                    <div className="mb-5 flex h-14 w-14 items-center justify-center border border-gray-700 bg-white/5 text-gray-300 group-hover:bg-white/10">
                      <Code className="h-6 w-6" />
                    </div>
                    <p className="text-lg font-bold text-white">Sitio Web con Lógica</p>
                    <p className="mt-2 text-xs font-light leading-relaxed text-gray-400">No es diseño: es software funcionando.</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => chooseService("arquitectura")}
                    className="group border border-gray-800 bg-black/40 p-6 text-left transition-all hover:bg-white/[0.02]"
                  >
                    <div className="mb-5 flex h-14 w-14 items-center justify-center border border-gray-700 bg-white/5 text-gray-300 group-hover:bg-white/10">
                      <Cpu className="h-6 w-6" />
                    </div>
                    <p className="text-lg font-bold text-white">Arquitectura Integral</p>
                    <p className="mt-2 text-xs font-light leading-relaxed text-gray-400">Todo conectado: agente + web + data + automatización.</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => chooseService("no-se")}
                    className="group border border-gray-800 bg-black/40 p-6 text-left transition-all hover:border-gray-600"
                  >
                    <div className="mb-5 flex h-14 w-14 items-center justify-center border border-gray-800 bg-black text-gray-500 group-hover:text-white">
                      <ArrowRight className="h-6 w-6" />
                    </div>
                    <p className="text-lg font-bold text-white">No estoy seguro</p>
                    <p className="mt-2 text-xs font-light leading-relaxed text-gray-400">Quiero un diagnóstico y que me digas el camino.</p>
                  </button>
                </div>
              </motion.div>
            ) : formType === "client" && step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold tracking-tight text-white mb-6 border-b border-gray-800 pb-4">Cuéntame sobre tu negocio</h3>
                <div>
                  <label className="mb-3 block text-xs font-bold uppercase tracking-widest text-gray-500">¿Qué tipo de solución te interesa?</label>
                  <select
                    className="w-full rounded-none border border-gray-800 bg-[#050507] px-5 py-4 text-sm text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="agente">Agente de Ventas 24/7</option>
                    <option value="web">Sitio Web con Lógica</option>
                    <option value="arquitectura">Arquitectura Integral</option>
                    <option value="no-se">No estoy seguro, quiero un diagnóstico</option>
                  </select>
                </div>
                <div>
                  <label className="mb-3 block text-xs font-bold uppercase tracking-widest text-gray-500">Volumen de mensajes o clientes por día</label>
                  <select
                    className="w-full rounded-none border border-gray-800 bg-[#050507] px-5 py-4 text-sm text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    value={formData.volume}
                    onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="1-20">1 – 20 por día</option>
                    <option value="20-50">20 – 50 por día</option>
                    <option value="50-100">50 – 100 por día</option>
                    <option value="+100">Más de 100 por día</option>
                  </select>
                </div>
                <div className="pb-6">
                  <label className="mb-3 block text-xs font-bold uppercase tracking-widest text-gray-500">Presupuesto disponible</label>
                  <select
                    className="w-full rounded-none border border-gray-800 bg-[#050507] px-5 py-4 text-sm text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="$400+">$400 / mes</option>
                    <option value="$800+">$800 / mes</option>
                    <option value="$1600+">$1,600+ / mes</option>
                  </select>
                </div>
                <div className="flex justify-between border-t border-gray-800 pt-6">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, service: "" }));
                      setStep(0);
                    }}
                    className="rounded-none border-b-2 border-transparent px-0 text-gray-400 hover:border-gray-400 hover:bg-transparent hover:text-white"
                  >
                    Atrás
                  </Button>
                  <Button
                    disabled={!formData.service || !formData.volume || !formData.budget}
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
            ) : formType === "client" && step === 2 ? (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold tracking-tight text-white mb-6 border-b border-gray-800 pb-4">Tu situación actual</h3>
                <div>
                  <label className="mb-3 block text-xs font-bold uppercase tracking-widest text-gray-500">¿Cuál es el proceso que más tiempo te consume hoy?</label>
                  <Textarea
                    placeholder="Ej: Respondo los mismos mensajes 30 veces al día, proceso pedidos a mano..."
                    value={formData.problem}
                    onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                    className="min-h-[140px] rounded-none border-gray-800 bg-[#050507] text-white placeholder:text-gray-600 focus-visible:ring-purple-500"
                  />
                </div>
                <div className="pb-6">
                  <label className="mb-3 block text-xs font-bold uppercase tracking-widest text-gray-500">
                    ¿Qué herramientas usas actualmente? <span className="text-gray-700">(opcional)</span>
                  </label>
                  <Input
                    placeholder="Ej: WhatsApp, Excel, nada..."
                    value={formData.tools}
                    onChange={(e) => setFormData({ ...formData, tools: e.target.value })}
                    className="rounded-none border-gray-800 bg-[#050507] py-6 text-white placeholder:text-gray-600 focus-visible:ring-purple-500"
                  />
                </div>
                <div className="flex justify-between border-t border-gray-800 pt-6">
                  <Button
                    variant="ghost"
                    onClick={() => setStep(1)}
                    className="rounded-none border-b-2 border-transparent px-0 text-gray-400 hover:border-gray-400 hover:bg-transparent hover:text-white"
                  >
                    Atrás
                  </Button>
                  <Button
                    disabled={!formData.problem}
                    onClick={() => {
                      triggerProgress();
                      setStep(3);
                    }}
                    className="rounded-none bg-purple-600 px-8 hover:bg-purple-500 text-xs font-bold uppercase tracking-widest disabled:opacity-50"
                  >
                    Solo falta 1 paso <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ) : formType === "student" && step === 1 ? (
              <motion.div
                key="student-step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold tracking-tight text-white mb-6 border-b border-gray-800 pb-4">Tus motivaciones</h3>
                <div>
                  <label className="mb-4 block text-xs font-bold uppercase tracking-widest text-gray-500">¿Por qué quieres aprender a construir esto?</label>
                  <div className="flex flex-col gap-3">
                    {[
                      "Crear / Escalar Servicio de Automatización",
                      "Dominar IA + Web para mi carrera",
                      "Implementar Sistemas en Mi Negocio",
                      "Tengo una idea SaaS",
                    ].map((reason) => (
                      <button
                        key={reason}
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, studentReason: reason });
                          triggerProgress();
                          setStep(2);
                        }}
                        className="w-full border border-gray-800 bg-[#050507] p-5 text-left text-sm font-bold text-white transition-all hover:bg-purple-500/10 hover:border-purple-500/50"
                      >
                        {reason}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between border-t border-gray-800 pt-6">
                  <Button
                    variant="ghost"
                    onClick={() => { setStep(0); setFormType("client"); }}
                    className="rounded-none border-b-2 border-transparent px-0 text-gray-400 hover:border-gray-400 hover:bg-transparent hover:text-white"
                  >
                    Volver y cancelar
                  </Button>
                </div>
              </motion.div>
            ) : formType === "student" && step === 2 ? (
              <motion.div
                key="student-step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold tracking-tight text-white mb-6 border-b border-gray-800 pb-4">Tu inversión</h3>
                <div className="pb-6">
                  <label className="mb-3 block text-xs font-bold uppercase tracking-widest text-gray-500">¿Cuánto estarías dispuesto a invertir en tu formación?</label>
                  <select
                    className="w-full rounded-none border border-gray-800 bg-[#050507] px-5 py-4 text-sm text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    value={formData.studentPay}
                    onChange={(e) => setFormData({ ...formData, studentPay: e.target.value })}
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="$50-$100">Entre $50 y $100</option>
                    <option value="$100-$300">Entre $100 y $300</option>
                    <option value="$300+">Más de $300 (Avanzado/Mentoría privada)</option>
                  </select>
                </div>
                <div className="flex justify-between border-t border-gray-800 pt-6">
                  <Button
                    variant="ghost"
                    onClick={() => setStep(1)}
                    className="rounded-none border-b-2 border-transparent px-0 text-gray-400 hover:border-gray-400 hover:bg-transparent hover:text-white"
                  >
                    Atrás
                  </Button>
                  <Button
                    disabled={!formData.studentPay}
                    onClick={() => { triggerProgress(); setStep(3); }}
                    className="rounded-none bg-purple-600 px-8 hover:bg-purple-500 text-xs font-bold uppercase tracking-widest disabled:opacity-50"
                  >
                    Solo falta 1 paso <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold tracking-tight text-white mb-6 border-b border-gray-800 pb-4">Último paso</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="mb-3 block text-xs font-bold uppercase tracking-widest text-gray-500">Tu Nombre</label>
                    <Input
                      placeholder="Identidad"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="rounded-none border-gray-800 bg-[#050507] py-6 text-white placeholder:text-gray-600 focus-visible:ring-purple-500"
                    />
                  </div>
                  <div className="pb-6">
                    <label className="mb-3 block text-xs font-bold uppercase tracking-widest text-gray-500">Forma de contacto preferida</label>
                    <Input
                      placeholder="WhatsApp o Email"
                      required
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      className="rounded-none border-gray-800 bg-[#050507] py-6 text-white placeholder:text-gray-600 focus-visible:ring-purple-500"
                    />
                  </div>
                  <div className="flex justify-between border-t border-gray-800 pt-6">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setStep(2)}
                      className="rounded-none border-b-2 border-transparent px-0 text-gray-400 hover:border-gray-400 hover:bg-transparent hover:text-white"
                    >
                      Atrás
                    </Button>
                    <Button
                      type="submit"
                      disabled={loading || !formData.name || !formData.contact}
                      className="rounded-none bg-white px-8 py-6 text-sm font-bold text-black transition-transform hover:scale-[1.02] hover:bg-gray-200"
                    >
                      {loading ? (
                        "Enviando..."
                      ) : (
                        <>
                          <span>Finalizar y Enviar</span> <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-6 flex flex-col md:flex-row items-start md:items-center justify-between border-t border-gray-800 bg-transparent py-5"
      >
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#050507] text-gray-400 border border-gray-800">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-200">¿Quieres aprender a construir esto tú mismo?</p>
            <p className="mt-1 text-xs text-gray-500">
              Estoy preparando material para enseñar cómo se construyen estos sistemas.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setFormType("student");
            setStep(1);
            document.getElementById("iniciar")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="cursor-pointer border border-purple-500/30 text-purple-400 px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest hover:bg-purple-500 hover:text-white transition-all w-full md:w-auto text-center"
        >
          Lista de espera
        </button>
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
            <h3 className="text-4xl font-black text-white mb-1 tracking-tighter normal-case">@Ramiz.Componte</h3>
            <p className="text-xs md:text-sm font-bold text-gray-500 mb-8">Arquitecto de Automatización</p>
            
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
      id: "m1",
      role: "assistant",
      text: "Hola, soy el asistente de Ramiz. Cuéntame qué quieres construir y te guío.",
    },
  ]);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [open, messages.length]);

  const sendMessage = (text: string) => {
    const cleaned = text.trim();
    if (!cleaned) return;

    setMessages((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, role: "user", text: cleaned },
      {
        id: `a-${Date.now()}-r`,
        role: "assistant",
        text: "Recibido. En breve conectaremos este chat al sistema para responder automáticamente. Por ahora, déjame tu objetivo y lo estructuramos.",
      },
    ]);
    setInput("");
  };

  return (
    <div className="fixed bottom-5 right-5 z-[55]">
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="mb-3 w-[340px] overflow-hidden rounded-2xl border border-white/10 bg-black/55 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 bg-black/40 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-white/10">
                  <img
                    src="https://res.cloudinary.com/dziczqgzn/image/upload/ar_1:1,c_auto/Gemini_Generated_Image_faa4xffaa4xffaa4_righyw.png"
                    alt="Agente"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="leading-tight">
                  <p className="text-sm font-semibold text-white">Asistente</p>
                  <p className="text-[11px] text-gray-400">Chat en beta (conexión a webhook luego)</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
                aria-label="Cerrar chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[320px] space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m) => (
                <div key={m.id} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                  <div
                    className={
                      m.role === "user"
                        ? "max-w-[85%] rounded-2xl rounded-br-md bg-gradient-to-r from-purple-600/80 to-cyan-600/70 px-3 py-2 text-[13px] text-white"
                        : "max-w-[85%] rounded-2xl rounded-bl-md border border-white/10 bg-black/45 px-3 py-2 text-[13px] text-gray-200"
                    }
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              <div ref={endRef} />
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="flex items-center gap-2 border-t border-white/10 bg-black/35 px-3 py-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu mensaje..."
                className="h-10 flex-1 rounded-xl border border-white/10 bg-black/40 px-3 text-[13px] text-white placeholder:text-gray-500 outline-none focus:border-cyan-400/50"
              />
              <button
                type="submit"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white/80 transition-colors hover:bg-white/10"
                aria-label="Enviar"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 420, damping: 24 }}
        className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-purple-600/90 to-cyan-600/80 text-white shadow-[0_22px_60px_rgba(0,0,0,0.65)]"
        aria-label={open ? "Cerrar chat" : "Abrir chat"}
      >
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-500/55 via-cyan-500/45 to-purple-500/55 opacity-80 blur" />
        <div className="relative flex h-full w-full overflow-hidden rounded-2xl items-center justify-center">
          {open ? (
            <X className="h-8 w-8" />
          ) : (
            <img
              src="https://res.cloudinary.com/dziczqgzn/image/upload/ar_1:1,c_auto/Gemini_Generated_Image_faa4xffaa4xffaa4_righyw.png"
              alt="Agente Avatar"
              className="h-full w-full object-cover"
            />
          )}
        </div>

        <span className="pointer-events-none z-10 absolute -top-2 right-1 rounded-full border border-white/10 bg-black/60 px-2 py-0.5 text-[12px] font-semibold text-white/90 backdrop-blur">
          Agente
        </span>
      </motion.button>
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
    <div className="min-h-screen overflow-x-hidden bg-[#050507] text-white selection:bg-purple-500/30 selection:text-purple-200">
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
      `,
        }}
      />
      <div className="noise" />

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
          <div className="flex space-x-6">
            <motion.a
              href="https://instagram.com/ramiz.componte"
              className="text-gray-500 transition-colors hover:text-pink-400"
              whileHover={{ scale: 1.12, rotate: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
            >
              <Instagram className="h-6 w-6" />
            </motion.a>
            <motion.a
              href="https://www.tiktok.com/@ramiz.componte"
              className="text-gray-500 transition-colors hover:text-cyan-400"
              whileHover={{ scale: 1.12, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
            >
              <TikTokIcon className="h-6 w-6" />
            </motion.a>
          </div>
          <p className="text-xs text-gray-600">© {new Date().getFullYear()} @Ramiz.Componte. Todos los derechos reservados.</p>
        </div>
      </footer>
      </div>

      <ChatWidget />
    </div>
  );
};

export default Dashboard;
