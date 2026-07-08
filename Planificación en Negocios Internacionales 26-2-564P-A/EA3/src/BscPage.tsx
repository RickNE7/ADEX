import { FileSpreadsheet, Download } from "lucide-react";
import { FadeIn } from "./components/FadeIn";
import { BscKpiStrip } from "./components/BscKpiStrip";
import { BscSemaforo } from "./components/BscSemaforo";
import { BscPerspectiveBoard } from "./components/BscPerspectiveBoard";
import { BscStrategyMap } from "./components/BscStrategyMap";
import { BscMatrixTable } from "./components/BscMatrixTable";
import { MISION, VISION, VALORES, TEMAS_ESTRATEGICOS } from "./bscData";

const xlsxUrl = `${import.meta.env.BASE_URL}GLOBAL_EVENT_BSC_CMI.xlsx`;

export function BscPage() {
  return (
    <main className="relative min-h-screen w-full bg-ink" style={{ overflowX: "clip" }}>
      <header className="sticky top-0 z-50 border-b border-soft/10 bg-ink/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <span className="font-display text-sm font-medium tracking-tight text-cream sm:text-base">
            Global Event <span className="text-gold">Imports</span>
          </span>
          <span className="hidden items-center gap-2 text-xs uppercase tracking-[0.25em] text-soft/40 sm:flex">
            <FileSpreadsheet size={13} />
            BSC · CMI · EA3
          </span>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 pb-24 pt-10 sm:px-8 sm:pt-14">
        <FadeIn>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-gold/80">
                Cuadro de Mando Integral
              </p>
              <h1 className="mt-3 font-display text-3xl font-black uppercase leading-none text-cream sm:text-4xl">
                Balanced Scorecard · EA3
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-soft/60">
                16 objetivos estratégicos en las 4 perspectivas de Kaplan-Norton
                (Financiera, Clientes, Procesos Internos, Aprendizaje y Crecimiento),
                con metas trimestrales semaforizadas y mapa de relaciones causa-efecto.
              </p>
            </div>
            <a
              href={xlsxUrl}
              download="GLOBAL_EVENT_BSC_CMI.xlsx"
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-emerald-200 transition-colors hover:bg-emerald-400/20"
            >
              <FileSpreadsheet size={14} />
              Descargar Excel
              <Download size={13} className="opacity-70" />
            </a>
          </div>
        </FadeIn>

        {/* Misión / Visión / Temas */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <FadeIn className="rounded-2xl border border-soft/10 bg-white/[0.03] p-5 sm:col-span-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold/80">Misión</p>
            <p className="mt-2 text-sm leading-relaxed text-soft/70">{MISION}</p>
          </FadeIn>
          <FadeIn delay={0.06} className="rounded-2xl border border-soft/10 bg-white/[0.03] p-5 sm:col-span-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold/80">Visión</p>
            <p className="mt-2 text-sm leading-relaxed text-soft/70">{VISION}</p>
          </FadeIn>
          <FadeIn delay={0.12} className="rounded-2xl border border-soft/10 bg-white/[0.03] p-5 sm:col-span-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold/80">
              Temas estratégicos
            </p>
            <ul className="mt-2 flex flex-col gap-1.5 text-xs leading-relaxed text-soft/70">
              {TEMAS_ESTRATEGICOS.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </FadeIn>
        </div>

        {/* KPIs financieros */}
        <div className="mt-10">
          <BscKpiStrip />
        </div>

        {/* Semáforo T1 vs T2 */}
        <div className="mt-6">
          <BscSemaforo />
        </div>

        {/* Mapa estratégico causa-efecto */}
        <div className="mt-6">
          <BscStrategyMap />
        </div>

        {/* Tablero por perspectiva */}
        <div className="mt-10">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.35em] text-gold/80">Detalle por perspectiva</p>
            <h2 className="mt-2 font-display text-2xl font-black uppercase text-cream sm:text-3xl">
              Los 16 objetivos, meta y resultado T1 / T2
            </h2>
          </FadeIn>
          <div className="mt-6">
            <BscPerspectiveBoard />
          </div>
        </div>

        {/* Matriz indicador / inductor / iniciativa */}
        <div className="mt-6">
          <BscMatrixTable />
        </div>

        <p className="mt-6 flex flex-wrap items-center gap-2 text-[11px] text-soft/30">
          <span className="rounded-full bg-soft/[0.06] px-2 py-1 leading-none">
            Nota de valores
          </span>
          {VALORES.join(" · ")}
        </p>
      </section>
    </main>
  );
}
