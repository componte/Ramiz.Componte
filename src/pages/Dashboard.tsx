import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
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
  Sparkles,
  ChevronRight,
  Instagram,
  Linkedin,
  XCircle,
  Check,
  GraduationCap,
  Globe,
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

const HeroSection = () => {
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
      <div className="absolute left-[10%] top-[20%] h-96 w-96 animate-[spin_10s_linear_infinite] rounded-full bg-purple-600/20 blur-[120px]" />
      <div className="absolute right-[10%] top-[40%] h-96 w-96 animate-[spin_15s_linear_infinite_reverse] rounded-full bg-cyan-600/20 blur-[120px]" />

      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="relative z-10 max-w-4xl">
        <motion.div
          variants={fadeInUp}
          className="mb-6 inline-flex items-center rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-sm font-medium text-purple-300 backdrop-blur-md"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          IA + Automatización
        </motion.div>

        <motion.h1
          variants={fadeInUp}
          className="glitch-text mb-6 text-5xl font-extrabold tracking-tight text-white md:text-7xl lg:text-8xl"
          data-text="Sistemas que operan tu negocio por ti"
        >
          <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Sistemas que operan</span>{" "}
          tu negocio por ti
        </motion.h1>

        <motion.p variants={fadeInUp} className="mb-6 mx-auto max-w-2xl text-lg leading-relaxed text-gray-400">
          Diseño e implemento sistemas que automatizan procesos, estructuran información y permiten que tu negocio funcione con menos fricción.
        </motion.p>

        <motion.div variants={fadeInUp} className="mb-12 h-8 text-xl font-medium text-gray-300 md:text-2xl">
          <span className="border-r-2 border-cyan-400 pr-1">{typingText}</span>
        </motion.div>

        <motion.div variants={fadeInUp} className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            onClick={() => document.getElementById("iniciar")?.scrollIntoView({ behavior: "smooth" })}
            className="group h-14 bg-gradient-to-r from-purple-600 to-purple-800 px-8 text-lg hover:from-purple-500 hover:to-purple-700"
          >
            Solicitar Diagnóstico
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => document.getElementById("casos")?.scrollIntoView({ behavior: "smooth" })}
            className="h-14 border-cyan-500/50 bg-transparent px-8 text-lg text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300"
          >
            Ver Cómo Funciona
          </Button>
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

const SuccessCases = () => {
  return (
    <section id="casos" className="relative z-10 mx-auto max-w-6xl px-4 py-32">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
        <motion.div variants={fadeInUp} className="mb-16 text-center">
          <h2 className="text-3xl font-bold md:text-5xl">
            Impacto Real, <span className="text-cyan-400">Resultados Medibles</span>
          </h2>
          <p className="mt-4 text-gray-400">Lo que pasa cuando un negocio deja de operar a mano.</p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          <motion.div variants={fadeScale}>
            <Card className="h-full border-purple-500/20 bg-slate-900/50 backdrop-blur-xl">
              <CardHeader className="flex flex-row items-center gap-4 pb-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400">
                  <ShoppingCart className="h-7 w-7" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-white">Charcutería Ramiz</CardTitle>
                  <p className="text-sm text-purple-300">Retail & Atención al Cliente · Venezuela</p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-8 grid grid-cols-3 gap-4 divide-x divide-gray-800 rounded-xl border border-gray-800 bg-slate-950/50 p-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">
                      <AnimatedCounter value={24} suffix="/7" />
                    </p>
                    <p className="mt-1 text-xs text-gray-400">Atención al cliente</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-cyan-400">
                      <AnimatedCounter value={80} suffix="%" />
                    </p>
                    <p className="mt-1 text-xs text-gray-400">Cobros gestionados</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-purple-400">
                      +<AnimatedCounter value={3} suffix="h" />
                    </p>
                    <p className="mt-1 text-xs text-gray-400">Ahorro diario</p>
                  </div>
                </div>

                <div className="mb-8 grid gap-6 md:grid-cols-2">
                  <div className="relative h-52 overflow-hidden rounded-xl border border-gray-800 bg-slate-950/50">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/60 via-slate-900 to-cyan-900/40" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/20 text-3xl text-purple-300">
                        🥩
                      </div>
                      <p className="text-sm font-semibold text-white">Charcutería Ramiz</p>
                      <p className="mt-1 text-xs text-gray-400">Foto del negocio próximamente</p>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
                  </div>
                  <div className="h-52 w-full rounded-xl border border-gray-800 bg-slate-950/30 p-4">
                    <p className="mb-2 text-xs text-gray-400">Eficiencia operativa (antes vs. después)</p>
                    <ResponsiveContainer width="100%" height="90%">
                      <BarChart data={barData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                        <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                        <RechartsTooltip
                          cursor={{ fill: "#1f2937" }}
                          contentStyle={{ backgroundColor: "#0f172a", borderColor: "#1f2937" }}
                        />
                        <Bar dataKey="eficiencia" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-xl border border-red-900/30 bg-red-950/20 p-5">
                    <p className="mb-4 flex items-center gap-2 text-sm font-semibold text-red-400">
                      <XCircle className="h-4 w-4" /> Antes del agente
                    </p>
                    <ul className="space-y-2">
                      {beforePoints.map((p, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-gray-400">
                          <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500/60" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl border border-cyan-900/30 bg-cyan-950/20 p-5">
                    <p className="mb-4 flex items-center gap-2 text-sm font-semibold text-cyan-400">
                      <Check className="h-4 w-4" /> Con el agente activo
                    </p>
                    <ul className="space-y-2">
                      {afterPoints.map((p, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                          <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeScale}>
            <Card className="h-full border-cyan-500/20 bg-slate-900/50 backdrop-blur-xl">
              <CardHeader className="flex flex-row items-center gap-4 pb-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400">
                  <Globe className="h-7 w-7" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-2xl text-white">Este sitio web</CardTitle>
                    <span className="flex items-center gap-1 rounded-full bg-green-500/20 px-2 py-0.5 text-[10px] font-bold text-green-400">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" /> EN VIVO
                    </span>
                  </div>
                  <p className="text-sm text-cyan-300">Sitio Web con Lógica · Lo estás viendo ahora</p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-6 rounded-xl border border-cyan-900/40 bg-cyan-950/20 p-4">
                  <p className="text-sm leading-relaxed text-cyan-300">
                    El mejor ejemplo de lo que construyo es <span className="font-semibold text-white">el sitio en el que estás ahora mismo</span>. No es una captura de pantalla. No es una demo. Es el producto real, funcionando.
                  </p>
                </div>

                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-500">Funcionalidades activas en esta página</p>
                <ul className="space-y-2.5">
                  {[
                    { icon: MousePointerClick, text: "Botones que hacen scroll suave a secciones específicas" },
                    { icon: Zap, text: "Contadores animados que se activan al entrar al viewport" },
                    { icon: CheckCircle2, text: "Formulario multi-paso con validación y efecto confetti" },
                    { icon: Globe, text: "Efecto de escritura (typing) que cicla métricas reales" },
                    { icon: Sparkles, text: "Animaciones de entrada y efecto glitch en el título" },
                  ].map(({ icon: Icon, text }, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs text-gray-300">
                      <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-400" />
                      {text}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 rounded-xl border border-gray-800 bg-slate-950/50 p-4 text-center">
                  <p className="text-xs text-gray-400">¿Quieres un sitio así para tu negocio?</p>
                  <Button
                    size="sm"
                    onClick={() => document.getElementById("iniciar")?.scrollIntoView({ behavior: "smooth" })}
                    className="mt-3 bg-gradient-to-r from-cyan-600 to-cyan-700 text-xs hover:from-cyan-500 hover:to-cyan-600"
                  >
                    Solicitar diagnóstico <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
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
];

const colorMap: Record<string, { border: string; bg: string; text: string }> = {
  purple: { border: "border-purple-500/20", bg: "bg-purple-500/10", text: "text-purple-400" },
  cyan: { border: "border-cyan-500/20", bg: "bg-cyan-500/10", text: "text-cyan-400" },
  violet: { border: "border-violet-500/20", bg: "bg-violet-500/10", text: "text-violet-400" },
};

const ServicesSection = () => (
  <section id="sistemas" className="relative z-10 mx-auto max-w-6xl px-4 py-24">
    <div className="absolute top-0 h-px w-full bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
    <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer}>
      <motion.div variants={fadeInUp} className="mb-14 text-center">
        <h2 className="text-3xl font-bold md:text-5xl">
          Lo que <span className="text-purple-400">construyo</span>
        </h2>
        <p className="mt-4 text-gray-400">Elige el tipo de solución que necesita tu negocio.</p>
      </motion.div>
      <div className="grid gap-6 md:grid-cols-3">
        {services.map((s) => {
          const c = colorMap[s.color];
          const Icon = s.icon;
          return (
            <motion.div key={s.id} variants={fadeScale}>
              <Card className={`flex h-full flex-col border ${c.border} bg-slate-900/50 backdrop-blur-xl`}>
                <CardHeader className="pb-3">
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${c.bg} ${c.text}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl text-white">{s.title}</CardTitle>
                  <p className="text-sm leading-relaxed text-gray-400">{s.description}</p>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col justify-between">
                  <ul className="mb-6 space-y-2">
                    {s.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-gray-300">
                        <Check className={`h-3.5 w-3.5 shrink-0 ${c.text}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="outline"
                    className={`w-full border ${c.border} ${c.text} hover:${c.bg}`}
                    onClick={() => document.getElementById("iniciar")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Quiero esto <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  </section>
);

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    service: "",
    volume: "",
    budget: "",
    problem: "",
    tools: "",
    name: "",
    contact: "",
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

  return (
    <section id="como-funciona" className="relative z-10 mx-auto max-w-4xl px-4 py-20">
      <div id="iniciar" />
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="rounded-3xl border border-gray-800/50 bg-slate-900/60 p-8 shadow-2xl backdrop-blur-xl md:p-12"
      >
        <div className="mb-10 text-center">
          <h2 className="mb-2 text-3xl font-bold">Iniciemos tu transformación</h2>
          <p className="text-gray-400">Completa este breve formulario para un diagnóstico preciso.</p>
        </div>

        <div className="mb-8 flex items-center justify-center space-x-4">
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                  step >= num
                    ? "border-purple-500 bg-purple-500/20 text-purple-400"
                    : "border-gray-700 bg-gray-800 text-gray-500"
                } font-bold transition-colors`}
              >
                {step > num ? <CheckCircle2 className="h-6 w-6" /> : num}
              </div>
              {num < 3 && (
                <div
                  className={`mx-2 h-1 w-12 rounded-full ${step > num ? "bg-purple-500/50" : "bg-gray-800"}`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="min-h-[320px]">
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-500/20 text-green-400">
                  <CheckCircle2 className="h-12 w-12" />
                </div>
                <h3 className="mb-2 text-2xl font-bold">¡Solicitud recibida!</h3>
                <p className="text-gray-400">Me pondré en contacto contigo pronto para coordinar tu diagnóstico.</p>
              </motion.div>
            ) : step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                <h3 className="text-lg font-semibold text-white">Cuéntame sobre tu negocio</h3>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">¿Qué tipo de solución te interesa?</label>
                  <select
                    className="w-full rounded-md border border-gray-700 bg-slate-800 px-4 py-3 text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
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
                  <label className="mb-2 block text-sm font-medium text-gray-300">Volumen de mensajes o clientes por día</label>
                  <select
                    className="w-full rounded-md border border-gray-700 bg-slate-800 px-4 py-3 text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
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
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">Inversión mensual disponible</label>
                  <select
                    className="w-full rounded-md border border-gray-700 bg-slate-800 px-4 py-3 text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="$350+">$350 / mes</option>
                    <option value="$700+">$700 / mes</option>
                    <option value="$1500+">$1,500+ / mes</option>
                  </select>
                </div>
                <div className="flex justify-end pt-2">
                  <Button
                    disabled={!formData.service || !formData.volume || !formData.budget}
                    onClick={() => setStep(2)}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Continuar <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ) : step === 2 ? (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                <h3 className="text-lg font-semibold text-white">Tu situación actual</h3>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">¿Cuál es el proceso que más tiempo te consume hoy?</label>
                  <Textarea
                    placeholder="Ej: Respondo los mismos mensajes 30 veces al día, proceso pedidos a mano, cobro sin sistema..."
                    value={formData.problem}
                    onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                    className="min-h-[110px] border-gray-700 bg-slate-800 text-white placeholder:text-gray-500 focus-visible:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    ¿Qué herramientas usas actualmente? <span className="text-gray-500">(opcional)</span>
                  </label>
                  <Input
                    placeholder="Ej: WhatsApp, Google Sheets, Instagram, ninguna..."
                    value={formData.tools}
                    onChange={(e) => setFormData({ ...formData, tools: e.target.value })}
                    className="border-gray-700 bg-slate-800 py-6 text-white placeholder:text-gray-500 focus-visible:ring-purple-500"
                  />
                </div>
                <div className="flex justify-between pt-2">
                  <Button variant="ghost" onClick={() => setStep(1)} className="text-gray-400 hover:text-white">
                    Atrás
                  </Button>
                  <Button
                    disabled={!formData.problem}
                    onClick={() => setStep(3)}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Continuar <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                <h3 className="text-lg font-semibold text-white">¿Dónde te contacto?</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    placeholder="Tu nombre"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="border-gray-700 bg-slate-800 py-6 text-white placeholder:text-gray-500 focus-visible:ring-purple-500"
                  />
                  <Input
                    placeholder="WhatsApp o Email"
                    required
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    className="border-gray-700 bg-slate-800 py-6 text-white placeholder:text-gray-500 focus-visible:ring-purple-500"
                  />
                  <div className="flex justify-between pt-2">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setStep(2)}
                      className="text-gray-400 hover:text-white"
                    >
                      Atrás
                    </Button>
                    <Button
                      type="submit"
                      disabled={loading || !formData.name || !formData.contact}
                      className="bg-gradient-to-r from-purple-600 to-cyan-600 px-8 hover:from-purple-500 hover:to-cyan-500"
                    >
                      {loading ? (
                        "Enviando..."
                      ) : (
                        <>
                          <span>Enviar diagnóstico</span> <Send className="ml-2 h-4 w-4" />
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
        className="mt-6 rounded-2xl border border-gray-700/40 bg-slate-900/30 px-6 py-5 backdrop-blur-md"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-gray-400">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-300">¿Quieres aprender a construir esto tú mismo?</p>
            <p className="mt-0.5 text-xs text-gray-500">
              Estoy preparando algo para enseñar cómo se construyen estos sistemas desde cero.
            </p>
          </div>
          <a
            href="#"
            className="shrink-0 rounded-lg border border-gray-700 px-4 py-2 text-xs font-medium text-gray-400 transition-colors hover:border-purple-500/50 hover:text-purple-400"
          >
            Unirme a la lista →
          </a>
        </div>
      </motion.div>
    </section>
  );
};

const TradingCard = () => {
  return (
    <section className="relative z-10 mx-auto max-w-lg px-4 py-20">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeInUp} className="mb-10 text-center">
        <h2 className="text-3xl font-bold">
          El Arquitecto <span className="text-purple-400">detrás del sistema</span>
        </h2>
        <p className="mt-3 text-sm text-gray-400">La persona que diseña e implementa todo esto.</p>
      </motion.div>

      <motion.div
        initial={{ rotateY: -20, opacity: 0 }}
        whileInView={{ rotateY: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="group relative mx-auto w-full max-w-sm"
        style={{ perspective: "1000px" }}
      >
        <div className="trading-card rounded-2xl border-2 border-slate-700 bg-slate-900 p-8 shadow-2xl transition-all duration-500 hover:scale-105 hover:border-purple-400 hover:shadow-[0_0_40px_rgba(139,92,246,0.4)]">
          <div className="shimmer pointer-events-none absolute inset-0 z-20 mix-blend-color-dodge rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="mb-6 flex justify-center">
              <div className="relative h-32 w-32 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 p-1">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-900">
                  <span className="bg-gradient-to-br from-purple-400 to-cyan-400 bg-clip-text text-4xl font-black text-transparent">RC</span>
                </div>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white">@Ramiz.Componte</h3>
            <p className="mt-1 max-w-[240px] text-sm font-medium leading-snug text-cyan-400">
              Arquitecto de Automatización y Sistemas de Ventas · Experto en Agentes IA
            </p>
            <div className="mt-6 w-full rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-left">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-500">Foto próximamente</p>
              <div className="flex h-24 w-full items-center justify-center rounded-lg bg-gradient-to-br from-purple-900/40 to-cyan-900/30">
                <span className="text-xs text-gray-500">Imagen de perfil real</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const Dashboard = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0F172A] text-white selection:bg-purple-500/30 selection:text-purple-200">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes glitch-anim {
          0%   { clip-path: inset(10% 0 80% 0); transform: translate(-2px, 2px); }
          20%  { clip-path: inset(80% 0 10% 0); transform: translate(2px, -2px); }
          40%  { clip-path: inset(40% 0 40% 0); transform: translate(2px, 2px); }
          60%  { clip-path: inset(20% 0 60% 0); transform: translate(-2px, -2px); }
          80%  { clip-path: inset(60% 0 20% 0); transform: translate(2px, 2px); }
          100% { clip-path: inset(10% 0 80% 0); transform: translate(-2px, -2px); }
        }
        .glitch-text { position: relative; }
        .glitch-text::before, .glitch-text::after {
          content: attr(data-text);
          position: absolute; top: 0; left: 0;
          width: 100%; height: 100%;
          background: #0F172A; opacity: 0;
        }
        .glitch-text:hover::before {
          left: 2px; text-shadow: -2px 0 red;
          animation: glitch-anim 0.3s cubic-bezier(.25,.46,.45,.94) both infinite;
          opacity: 0.8; z-index: -1;
        }
        .glitch-text:hover::after {
          left: -2px; text-shadow: -2px 0 blue;
          animation: glitch-anim 0.3s cubic-bezier(.25,.46,.45,.94) reverse both infinite;
          opacity: 0.8; z-index: -2;
        }
        .shimmer {
          background: linear-gradient(125deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 70%);
          background-size: 200% 200%;
          animation: shimmer-anim 2s infinite linear;
        }
        @keyframes shimmer-anim {
          0%   { background-position: -100% -100%; }
          100% { background-position: 200% 200%; }
        }
      `,
        }}
      />

      <ParticleCursor />
      <HeroSection />

      <div className="relative">
        <div className="absolute top-0 h-px w-full bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
        <SuccessCases />
      </div>

      <ServicesSection />

      <div className="relative">
        <div className="absolute top-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
        <MultiStepForm />
      </div>

      <div className="relative">
        <div className="absolute top-0 h-px w-full bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
        <TradingCard />
      </div>

      <footer className="border-t border-slate-800 bg-slate-950 py-12 text-center">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-center space-y-6 px-4">
          <div className="flex space-x-6">
            <a
              href="https://instagram.com/Ramiz.Componte"
              className="text-gray-500 transition-colors hover:text-pink-400"
            >
              <Instagram className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-500 transition-colors hover:text-cyan-400">
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
          <p className="text-sm font-medium text-gray-400">Construido con IA, sin pedir permiso.</p>
          <p className="text-xs text-gray-600">© {new Date().getFullYear()} @Ramiz.Componte. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
