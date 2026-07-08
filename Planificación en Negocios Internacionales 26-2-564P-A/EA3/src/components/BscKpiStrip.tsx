import { Kpi } from "./Kpi";
import { FadeIn } from "./FadeIn";
import { FINANZAS } from "../bscData";

export function BscKpiStrip() {
  return (
    <FadeIn>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        <Kpi value={FINANZAS.ingresos} label="Ingresos Año 1" prefix="S/. " thousands tone="cream" />
        <Kpi
          value={FINANZAS.margenEbitda * 100}
          label="Margen EBITDA"
          suffix="%"
          decimals={2}
          tone="gold"
        />
        <Kpi value={FINANZAS.pe} label="Punto de equilibrio (ev/mes)" decimals={2} tone="emerald" />
        <Kpi value={FINANZAS.eventos} label="Eventos ejecutados (meta Año 1)" decimals={0} tone="cream" />
      </div>
    </FadeIn>
  );
}
