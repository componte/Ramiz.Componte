const fs = require('fs');
const file = 'c:\\Users\\sytpr\\CascadeProjects\\ramiz-systems\\src\\pages\\Dashboard.tsx';
let txt = fs.readFileSync(file, 'utf8');

// Global small fonts replace according to user instruction: "absolutamente todo subirle considerablemente al tamaño"

// 1. Hero Badge
txt = txt.replace(/text-\[10px\] font-bold uppercase tracking-\[0\.2em\]/g, 'text-xs md:text-sm font-bold uppercase tracking-[0.2em]');

// 2. SuccessCases subtitles under Animated Counters
txt = txt.replace(/text-\[10px\] font-bold uppercase tracking-wider/g, 'text-xs md:text-sm font-bold uppercase tracking-wider');

// 3. SuccessCases "Antes / Despues" list points (currently text-sm, need text-base md:text-lg)
txt = txt.replace(/text-sm leading-relaxed text-gray-400/g, 'text-base md:text-lg leading-relaxed text-gray-400 text-shadow-sm');
txt = txt.replace(/text-sm leading-relaxed text-gray-300/g, 'text-base md:text-lg leading-relaxed text-gray-300 text-shadow-sm');

// 4. SuccessCases titles "Antes del agente"
txt = txt.replace(/text-xs md:text-sm font-bold uppercase tracking-wider/g, 'text-sm md:text-lg font-bold uppercase tracking-wider');

// 5. SuccessCases "Eficiencia operativa" & "¿Quieres un sitio así?" CTA subtitles
txt = txt.replace(/text-xs font-bold uppercase tracking-widest text-gray-500/g, 'text-sm md:text-base font-bold uppercase tracking-widest text-gray-500');
txt = txt.replace(/text-xs font-semibold uppercase tracking-widest/g, 'text-sm font-bold uppercase tracking-widest');
txt = txt.replace(/text-[9px] font-bold uppercase tracking-widest text-gray-600/g, 'text-xs font-bold uppercase tracking-widest text-gray-600');

// 6. Services Section (Agente de Ventas) card list points
txt = txt.replace(/text-xs font-light text-gray-300/g, 'text-sm md:text-base font-light text-gray-300');
txt = txt.replace(/text-\[10px\] font-bold uppercase tracking-widest text-gray-500 pt-2/g, 'text-xs md:text-sm font-bold uppercase tracking-widest text-gray-500 mt-2');
txt = txt.replace(/text-\[10px\] font-bold uppercase tracking-widest transition-all/g, 'text-xs md:text-sm font-bold uppercase tracking-widest transition-all');

// 7. Forms (Labels and placeholer)
txt = txt.replace(/text-xs font-bold uppercase/g, 'text-sm md:text-base font-bold uppercase');
txt = txt.replace(/text-\[10px\] font-bold uppercase tracking-widest/g, 'text-sm md:text-base font-bold uppercase tracking-widest');

// 8. Trading Card
txt = txt.replace(/text-\[10px\] font-bold text-gray-500 mb-8/g, 'text-sm md:text-base font-bold text-gray-500 mb-8');
txt = txt.replace(/text-\[10px\] font-bold text-gray-600 mb-8/g, 'text-sm font-bold text-gray-600 mb-8');
txt = txt.replace(/text-\[9px\] font-bold text-gray-500/g, 'text-xs md:text-sm font-bold text-gray-500');
txt = txt.replace(/text-\[10px\] font-light tracking-\[0\.3em\]/g, 'text-xs md:text-sm font-bold tracking-[0.2em] text-gray-500');

// 9. Floating Bot / Messages
txt = txt.replace(/text-\[11px\] text-gray-400/g, 'text-xs md:text-sm text-gray-400');
txt = txt.replace(/text-\[13px\] text-white/g, 'text-sm md:text-base text-white');
txt = txt.replace(/text-\[13px\] text-gray-200/g, 'text-sm md:text-base text-gray-200');

// 10. Any other stray text-xs elements (except ones we manually skipped or want to keep)
txt = txt.replace(/className="text-xs text-gray-500"/g, 'className="text-sm text-gray-500"');
txt = txt.replace(/text-\[9px\] font-bold uppercase tracking-widest/g, 'text-xs md:text-sm font-bold uppercase tracking-widest');

fs.writeFileSync(file, txt, 'utf8');
console.log('Fonts aggressively resized!');
