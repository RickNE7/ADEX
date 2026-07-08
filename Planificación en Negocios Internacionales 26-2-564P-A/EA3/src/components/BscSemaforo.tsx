import { motion } from "framer-motion";
import { FadeIn } from "./FadeIn";
import { conteoEstados, ESTADO_COLOR, ESTADO_LABEL, OBJETIVOS, type Estado } from "../bscData";

const ESTADOS: Estado[] = ["verde", "amarillo", "rojo"];
const TOTAL = OBJETIVOS.length;

function Bar({ periodo, label }: { periodo: "t1" | "t2"; label: string }) {
  const c = conteoEstados(periodo);
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-xs">
        <span className="font-display font-bold uppercase tracking-wide text-cream">{label}</span>
        <span className="text-soft/40">{TOTAL} objetivos</span>
      </div>
      <div className="flex h-8 w-full overflow-hidden rounded-lg border border-soft/10">
        {ESTADOS.map((e) => {
          const pct = (c[e] / TOTAL) * 100;
          if (pct === 0) return null;
          return (
            <motion.div
              key={e}
              initial={{ width: 0 }}
              whileInView={{ width: `${pct}%` }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex items-center justify-center text-[11px] font-bold text-ink"
              style={{ background: ESTADO_COLOR[e] }}
              title={`${ESTADO_LABEL[e]}: ${c[e]}`}
            >
              {c[e]}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export function BscSemaforo() {
  return (
    <FadeIn>
      <div className="rounded-2xl border border-soft/10 bg-white/[0.03] p-5 sm:p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-gold/80">Semáforo de gestión</p>
        <h3 className="mt-2 font-display text-xl font-black uppercase text-cream sm:text-2xl">
          Estado de los 16 objetivos por trimestre
        </h3>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-soft/60">
          Comparación T1 (Nov26–Ene27) vs T2 (Feb–Abr27, simulación hasta marzo). El
          punto de equilibrio (F1) pasa de Peligro a Meta al activarse la Fase 2; ningún
          objetivo queda en Peligro para T2.
        </p>
        <div className="mt-5 flex flex-col gap-4">
          <Bar periodo="t1" label="T1 · Nov 26 - Ene 27" />
          <Bar periodo="t2" label="T2 · Feb - Abr 27" />
        </div>
        <div className="mt-4 flex flex-wrap gap-4 text-xs text-soft/50">
          {ESTADOS.map((e) => (
            <span key={e} className="inline-flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-sm" style={{ background: ESTADO_COLOR[e] }} />
              {ESTADO_LABEL[e]}
            </span>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}
