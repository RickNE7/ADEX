import { FadeIn } from "./FadeIn";
import { OBJETIVOS, PERSPECTIVA_COLOR } from "../bscData";

export function BscMatrixTable() {
  return (
    <FadeIn>
      <div className="rounded-2xl border border-soft/10 bg-white/[0.03] p-5 sm:p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-gold/80">Matriz de indicadores</p>
        <h3 className="mt-2 font-display text-xl font-black uppercase text-cream sm:text-2xl">
          Indicador · Inductor · Iniciativa
        </h3>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-soft/60">
          Quién mueve cada indicador (inductor) y qué acción concreta lo sostiene
          (iniciativa), para las 16 metas del Año 1.
        </p>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-soft/15 text-[10px] uppercase tracking-wider text-soft/40">
                <th className="py-2 pr-3 font-semibold">Cod</th>
                <th className="py-2 pr-3 font-semibold">Indicador</th>
                <th className="py-2 pr-3 font-semibold">Inductor</th>
                <th className="py-2 font-semibold">Iniciativa</th>
              </tr>
            </thead>
            <tbody>
              {OBJETIVOS.map((o) => (
                <tr key={o.cod} className="border-b border-soft/[0.06] align-top">
                  <td className="py-2.5 pr-3">
                    <span
                      className="rounded px-1.5 py-0.5 text-[10px] font-bold"
                      style={{
                        background: `${PERSPECTIVA_COLOR[o.perspectiva]}26`,
                        color: PERSPECTIVA_COLOR[o.perspectiva],
                      }}
                    >
                      {o.cod}
                    </span>
                  </td>
                  <td className="py-2.5 pr-3 font-medium text-cream/90">{o.indicador}</td>
                  <td className="py-2.5 pr-3 text-soft/60">{o.inductor}</td>
                  <td className="py-2.5 leading-relaxed text-soft/50">{o.iniciativa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </FadeIn>
  );
}
