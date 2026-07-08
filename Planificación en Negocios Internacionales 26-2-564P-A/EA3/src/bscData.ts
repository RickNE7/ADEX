/**
 * Datos del Balanced Scorecard / CMI de Global Event Imports S.A.C.
 * Fuente: Google Sheet publicado "GLOBAL_EVENT_BSC_CMI" (mismo contenido que
 * Semana 7/GLOBAL_EVENT_BSC_CMI.xlsx), transcrito a mano para alimentar
 * gráficos y tableros sin incrustar la hoja de cálculo.
 */

export type Perspectiva =
  | "Aprendizaje y crecimiento"
  | "Procesos internos"
  | "Clientes"
  | "Financiera";

export type Estado = "verde" | "amarillo" | "rojo";

export const PERSPECTIVAS: Perspectiva[] = [
  "Financiera",
  "Clientes",
  "Procesos internos",
  "Aprendizaje y crecimiento",
];

export const PERSPECTIVA_COLOR: Record<Perspectiva, string> = {
  Financiera: "#D4AF37", // gold
  Clientes: "#5EC8D8", // sky/teal
  "Procesos internos": "#8B7FD6", // violet
  "Aprendizaje y crecimiento": "#6FBF73", // green
};

export interface BscObjetivo {
  perspectiva: Perspectiva;
  cod: string;
  objetivo: string;
  indicador: string;
  responsable: string;
  unidad: string;
  meta: string;
  inductor: string;
  iniciativa: string;
  bandas: { rojo: string; amarillo: string; meta: string };
  t1: { valor: string; estado: Estado };
  t2: { valor: string; estado: Estado };
}

export const OBJETIVOS: BscObjetivo[] = [
  // ---- Financiera ----
  {
    perspectiva: "Financiera",
    cod: "F1",
    objetivo: "Superar el punto de equilibrio mensual y alcanzar 143 eventos en el Año 1.",
    indicador: "Eventos ejecutados vs punto de equilibrio (9.47)",
    responsable: "Jahir Castillo (CFO)",
    unidad: "Eventos/mes",
    meta: ">= 10",
    inductor: "Finanzas (CFO) / Ventas",
    iniciativa: "Rampa comercial por fases y control semanal del pipeline de reservas.",
    bandas: { rojo: "< 9.47", amarillo: "9.47 - 9.99", meta: ">= 10" },
    t1: { valor: "7 eventos", estado: "rojo" },
    t2: { valor: "11 eventos", estado: "verde" },
  },
  {
    perspectiva: "Financiera",
    cod: "F2",
    objetivo: "Proteger el margen EBITDA controlando el costo variable por evento.",
    indicador: "Margen EBITDA",
    responsable: "Jahir Castillo (CFO)",
    unidad: "%",
    meta: ">= 26.43%",
    inductor: "Finanzas (CFO)",
    iniciativa: "Control del CV <= S/. 298.98 por evento y preservación del ticket ponderado.",
    bandas: { rojo: "< 20%", amarillo: "20% - 26.42%", meta: ">= 26.43%" },
    t1: { valor: "26.40%", estado: "amarillo" },
    t2: { valor: "26.40%", estado: "amarillo" },
  },
  {
    perspectiva: "Financiera",
    cod: "F3",
    objetivo: "Preservar la liquidez y cerrar la brecha de reserva antes del CAPEX de la Fase 2.",
    indicador: "Cobertura de la reserva objetivo (S/. 41,400)",
    responsable: "Jahir Castillo (CFO)",
    unidad: "%",
    meta: ">= 100%",
    inductor: "Finanzas (CFO)",
    iniciativa:
      "Negociar S/. 9,999.87 de financiamiento complementario (proveedor, leasing o aporte) antes de Mar-27.",
    bandas: { rojo: "< 75%", amarillo: "75% - 99.9%", meta: ">= 100%" },
    t1: { valor: "160%", estado: "verde" },
    t2: { valor: "76%", estado: "amarillo" },
  },
  {
    perspectiva: "Financiera",
    cod: "F4",
    objetivo: "Cumplir el plan de ingresos del Año 1 con el ticket ponderado del modelo.",
    indicador: "Ingresos acumulados vs plan (S/. 199,742.50)",
    responsable: "Jahir Castillo (CFO)",
    unidad: "%",
    meta: ">= 100%",
    inductor: "Finanzas (CFO) / Ventas",
    iniciativa: "Seguimiento mensual de la facturación por fase y ajuste del mix si el ticket cae.",
    bandas: { rojo: "< 90%", amarillo: "90% - 99.9%", meta: ">= 100%" },
    t1: { valor: "100%", estado: "verde" },
    t2: { valor: "100%", estado: "verde" },
  },
  // ---- Clientes ----
  {
    perspectiva: "Clientes",
    cod: "C1",
    objetivo: "Elevar la satisfacción y fidelización de los clientes B2B.",
    indicador: "Satisfacción del cliente (NPS)",
    responsable: "Marilin Medina (VP Ventas)",
    unidad: "%",
    meta: ">= 75%",
    inductor: "Ventas y Marketing",
    iniciativa: "Encuesta digital 24 h post-evento y protocolo de retención ante desviaciones.",
    bandas: { rojo: "< 60%", amarillo: "60% - 74.9%", meta: ">= 75%" },
    t1: { valor: "80%", estado: "verde" },
    t2: { valor: "72%", estado: "amarillo" },
  },
  {
    perspectiva: "Clientes",
    cod: "C2",
    objetivo: "Construir alianzas activas con wedding planners y productoras corporativas.",
    indicador: "Alianzas B2B activas",
    responsable: "Marilin Medina (VP Ventas)",
    unidad: "N° alianzas",
    meta: ">= 8",
    inductor: "Ventas y Marketing",
    iniciativa: "Demos in-situ, presencia en expos de bodas y convenios con agencias premium.",
    bandas: { rojo: "< 4", amarillo: "4 - 8", meta: ">= 8" },
    t1: { valor: "4 alianzas", estado: "amarillo" },
    t2: { valor: "6 alianzas", estado: "amarillo" },
  },
  {
    perspectiva: "Clientes",
    cod: "C3",
    objetivo: "Elevar la participación de los paquetes premium (Dúo, Trío y Full).",
    indicador: "Participación del mix premium",
    responsable: "Marilin Medina (VP Ventas)",
    unidad: "%",
    meta: ">= 65%",
    inductor: "Ventas y Marketing",
    iniciativa: "Bundles por fase con pricing escalonado (mix F1 45/30/15/10 a F3 20/30/30/20).",
    bandas: { rojo: "< 50%", amarillo: "50% - 64.9%", meta: ">= 65%" },
    t1: { valor: "55%", estado: "amarillo" },
    t2: { valor: "62%", estado: "amarillo" },
  },
  {
    perspectiva: "Clientes",
    cod: "C4",
    objetivo: "Garantizar la experiencia digital con descarga multimedia inmediata.",
    indicador: "Eventos con descarga QR < 12 s",
    responsable: "Eric Mozombite (Director Financiero)",
    unidad: "%",
    meta: "100%",
    inductor: "Operaciones (conectividad)",
    iniciativa: "Routers Multi-Carrier con doble SIM y prueba de velocidad pre-evento.",
    bandas: { rojo: "< 95%", amarillo: "95% - 99.9%", meta: "100%" },
    t1: { valor: "100%", estado: "verde" },
    t2: { valor: "100%", estado: "verde" },
  },
  // ---- Procesos internos ----
  {
    perspectiva: "Procesos internos",
    cod: "P1",
    objetivo: "Ejecutar montajes completos y puntuales con setup listo 45 minutos antes del evento.",
    indicador: "Cumplimiento OTIF (On-Time In-Full)",
    responsable: "Jostin Chavez (COO)",
    unidad: "%",
    meta: ">= 96%",
    inductor: "Operaciones y Logística (COO)",
    iniciativa: "Checklist de venue, rampa horaria por distrito y kit de contingencia clase A in-situ.",
    bandas: { rojo: "< 90%", amarillo: "90% - 95.9%", meta: ">= 96%" },
    t1: { valor: "100%", estado: "verde" },
    t2: { valor: "90.9%", estado: "amarillo" },
  },
  {
    perspectiva: "Procesos internos",
    cod: "P2",
    objetivo: "Garantizar la disponibilidad técnica de los activos importados.",
    indicador: "Disponibilidad técnica (uptime)",
    responsable: "Eric Mozombite (Director Financiero)",
    unidad: "%",
    meta: ">= 98%",
    inductor: "Dirección Financiera (activos) / Operaciones",
    iniciativa: "Mantenimiento preventivo semanal (lunes-martes), clasificación ABC y repuestos críticos.",
    bandas: { rojo: "< 95%", amarillo: "95% - 97.9%", meta: ">= 98%" },
    t1: { valor: "98%", estado: "verde" },
    t2: { valor: "98.5%", estado: "verde" },
  },
  {
    perspectiva: "Procesos internos",
    cod: "P3",
    objetivo: "Asegurar la importación escalonada con despacho anticipado y expediente completo.",
    indicador: "Expedientes de importación completos antes del arribo",
    responsable: "Jostin Chavez (COO)",
    unidad: "%",
    meta: "100%",
    inductor: "Operaciones y Logística (COO)",
    iniciativa: "Checklist documentario por subpartida, origen y certificado; agente de aduana homologado.",
    bandas: { rojo: "< 95%", amarillo: "95% - 99.9%", meta: "100%" },
    t1: { valor: "100%", estado: "verde" },
    t2: { valor: "100%", estado: "verde" },
  },
  {
    perspectiva: "Procesos internos",
    cod: "P4",
    objetivo: "Operar con cumplimiento total: SCTR vigente y borrado de datos a los 15 días.",
    indicador: "Controles de cumplimiento completos",
    responsable: "Jostin Chavez (COO)",
    unidad: "%",
    meta: "100%",
    inductor: "Operaciones (SCTR) / Gerencia (datos)",
    iniciativa: "Validación SCTR previa a la carga y script de borrado automático en el servidor Cloud.",
    bandas: { rojo: "< 100%", amarillo: "No aplica", meta: "100%" },
    t1: { valor: "100%", estado: "verde" },
    t2: { valor: "100%", estado: "verde" },
  },
  // ---- Aprendizaje y crecimiento ----
  {
    perspectiva: "Aprendizaje y crecimiento",
    cod: "A1",
    objetivo:
      "Desarrollar competencias técnicas de montaje, calibración y atención B2B en el equipo de campo.",
    indicador: "Cumplimiento del plan de capacitación técnica",
    responsable: "Maria Ruiz (CEO)",
    unidad: "%",
    meta: ">= 95%",
    inductor: "Dirección General / RR.HH.",
    iniciativa: "Programa de inducción por fase (F1-F3) con 15 h mínimas por operario y simulacros de montaje.",
    bandas: { rojo: "< 80%", amarillo: "80% - 94.9%", meta: ">= 95%" },
    t1: { valor: "95%", estado: "verde" },
    t2: { valor: "88%", estado: "amarillo" },
  },
  {
    perspectiva: "Aprendizaje y crecimiento",
    cod: "A2",
    objetivo: "Retener al personal técnico entrenado del equipo de campo.",
    indicador: "Rotación de personal técnico",
    responsable: "Maria Ruiz (CEO)",
    unidad: "%",
    meta: "< 15%",
    inductor: "Dirección General / RR.HH.",
    iniciativa: "Bono por evento sin incidencias, línea de carrera técnica y encuesta de clima semestral.",
    bandas: { rojo: "> 25%", amarillo: "15% - 25%", meta: "< 15%" },
    t1: { valor: "25%", estado: "amarillo" },
    t2: { valor: "0%", estado: "verde" },
  },
  {
    perspectiva: "Aprendizaje y crecimiento",
    cod: "A3",
    objetivo: "Documentar y estandarizar la operación con bitácoras y checklists actualizados.",
    indicador: "Registros operativos completos",
    responsable: "Eric Mozombite (Director Financiero)",
    unidad: "%",
    meta: ">= 95%",
    inductor: "Dirección Financiera (control interno)",
    iniciativa: "Bitácora post-evento, checklist de calibración y versionamiento de protocolos por fase.",
    bandas: { rojo: "< 80%", amarillo: "80% - 94.9%", meta: ">= 95%" },
    t1: { valor: "90%", estado: "amarillo" },
    t2: { valor: "95%", estado: "verde" },
  },
  {
    perspectiva: "Aprendizaje y crecimiento",
    cod: "A4",
    objetivo: "Institucionalizar el control de gestión con revisión mensual del CMI.",
    indicador: "Sesiones del comité de control realizadas",
    responsable: "Maria Ruiz (CEO)",
    unidad: "Sesiones/trim.",
    meta: "3",
    inductor: "Gerencia General",
    iniciativa: "Comité directivo mensual con revisión de KPIs, desviaciones y acciones correctivas.",
    bandas: { rojo: "< 2", amarillo: "2", meta: "3" },
    t1: { valor: "3 sesiones", estado: "verde" },
    t2: { valor: "3 sesiones", estado: "verde" },
  },
];

export const MISION =
  "Importar, operar y alquilar tecnología interactiva premium que convierte los eventos corporativos y sociales de Lima en experiencias digitales memorables, sin mermas físicas y con entrega multimedia inmediata.";

export const VISION =
  "Al 2029, ser el proveedor B2B de referencia en experiencias tecnológicas interactivas para el mercado premium de eventos del Perú.";

export const VALORES = [
  "Puntualidad operacional: montaje listo 45 minutos antes de cada evento (OTIF 96%).",
  "Innovación aplicada: tecnología interactiva, descarga QR < 12 s y conectividad Multi-Carrier.",
  "Sostenibilidad “Zero-Merma”: activos reutilizables y entregas 100% digitales.",
  "Cumplimiento: SCTR, protección de datos personales y sustento aduanero completo.",
  "Mejora continua: decisiones basadas en KPIs y revisión mensual del CMI.",
];

export const TEMAS_ESTRATEGICOS = [
  "T1. Expansión rentable por fases (4 a 8 equipos) cuidando la liquidez",
  "T2. Experiencia premium B2B: OTIF 96%, QR < 12 s y NPS >= 75%",
  "T3. Excelencia en importación y operación técnica de los activos",
  "T4. Cumplimiento laboral, aduanero y de protección de datos",
];

export const FINANZAS = {
  eventos: 143,
  ingresos: 199742.5,
  ebitda: 52787.1,
  margenEbitda: 0.2643,
  utilidadNeta: 18896.21,
  pe: 9.47,
  van: 51681.83,
  tir: 0.2905,
  reservaObjetivo: 41400,
};

/** Conteo de estados (verde/amarillo/rojo) por trimestre, para el gráfico de semáforo. */
export function conteoEstados(periodo: "t1" | "t2") {
  const out: Record<Estado, number> = { verde: 0, amarillo: 0, rojo: 0 };
  for (const o of OBJETIVOS) out[o[periodo].estado]++;
  return out;
}

export const ESTADO_COLOR: Record<Estado, string> = {
  verde: "#34D399",
  amarillo: "#FBBF24",
  rojo: "#F87171",
};

export const ESTADO_LABEL: Record<Estado, string> = {
  verde: "Meta",
  amarillo: "Precaución",
  rojo: "Peligro",
};
