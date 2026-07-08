import { FadeIn } from "./FadeIn";
import {
  ESTADO_COLOR,
  ESTADO_LABEL,
  OBJETIVOS,
  PERSPECTIVAS,
  PERSPECTIVA_COLOR,
  type Estado,
} from "../bscData";

function Dot({ estado, valor }: { estado: Estado; valor: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-bold text-ink"
      style={{ background: ESTADO_COLOR[estado] }}
      title={ESTADO_LABEL[estado]}
    >
      {valor}
    </span>
  );
}

export function BscPerspectiveBoard() {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      {PERSPECTIVAS.map((persp, i) => {
        const items = OBJETIVOS.filter((o) => o.perspectiva === persp);
        const color = PERSPECTIVA_COLOR[persp];
        return (
          <FadeIn key={persp} delay={i * 0.08}>
            <div className="h-full rounded-2xl border border-soft/10 bg-white/[0.03] p-5 sm:p-6">
              <div className="flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />
                <h3 className="font-display text-lg font-black uppercase tracking-tight text-cream">
                  {persp}
                </h3>
              </div>
              <div className="mt-4 flex flex-col divide-y divide-soft/10">
                {items.map((o) => (
                  <div key={o.cod} className="py-3 first:pt-0 last:pb-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <span
                          className="mr-2 rounded px-1.5 py-0.5 text-[10px] font-bold"
                          style={{ background: `${color}26`, color }}
                        >
                          {o.cod}
                        </span>
                        <span className="text-sm font-medium text-cream/90">{o.indicador}</span>
                        <p className="mt-1 text-xs leading-relaxed text-soft/50">{o.objetivo}</p>
                        <p className="mt-1 text-[11px] text-soft/40">
                          Meta {o.meta} · {o.responsable}
                        </p>
                      </div>
                      <div className="flex shrink-0 flex-col items-end gap-1">
                        <Dot estado={o.t1.estado} valor={o.t1.valor} />
                        <Dot estado={o.t2.estado} valor={o.t2.valor} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        );
      })}
    </div>
  );
}
