import { ArrowUp } from "lucide-react";
import { FadeIn } from "./FadeIn";
import { OBJETIVOS, PERSPECTIVA_COLOR, type Perspectiva } from "../bscData";

// Orden causal Kaplan-Norton: de abajo (base) hacia arriba (resultado financiero).
const ORDEN_CAUSAL: Perspectiva[] = [
  "Financiera",
  "Clientes",
  "Procesos internos",
  "Aprendizaje y crecimiento",
];

export function BscStrategyMap() {
  return (
    <FadeIn>
      <div className="rounded-2xl border border-soft/10 bg-white/[0.03] p-5 sm:p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-gold/80">Mapa estratégico</p>
        <h3 className="mt-2 font-display text-xl font-black uppercase text-cream sm:text-2xl">
          Relaciones causa-efecto entre perspectivas
        </h3>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-soft/60">
          La lectura es de abajo hacia arriba: un equipo capacitado (Aprendizaje) sostiene
          procesos confiables (Procesos), que generan clientes satisfechos (Clientes) y
          eso se traduce en resultado financiero (Financiera).
        </p>

        <div className="mt-6 flex flex-col gap-2">
          {ORDEN_CAUSAL.map((persp, idx) => {
            const color = PERSPECTIVA_COLOR[persp];
            const items = OBJETIVOS.filter((o) => o.perspectiva === persp);
            return (
              <div key={persp} className="flex flex-col items-center">
                {idx > 0 && <ArrowUp size={18} className="my-1 text-soft/30" />}
                <div
                  className="w-full rounded-xl border p-3 sm:p-4"
                  style={{ borderColor: `${color}40`, background: `${color}14` }}
                >
                  <p
                    className="mb-2 text-[11px] font-bold uppercase tracking-[0.15em]"
                    style={{ color }}
                  >
                    {persp}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {items.map((o) => (
                      <span
                        key={o.cod}
                        title={o.objetivo}
                        className="cursor-help rounded-lg border px-2.5 py-1.5 text-[11px] font-medium text-cream/90"
                        style={{ borderColor: `${color}40`, background: `${color}1f` }}
                      >
                        <span className="font-bold" style={{ color }}>
                          {o.cod}
                        </span>{" "}
                        {o.indicador}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </FadeIn>
  );
}
