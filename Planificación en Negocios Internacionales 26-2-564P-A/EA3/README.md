# EA3 — Balanced Scorecard / CMI · Global Event Imports S.A.C.

Dashboard web (React + Vite + Tailwind) del Cuadro de Mando Integral de la
Evidencia de Aprendizaje 3: 16 objetivos estratégicos en las 4 perspectivas de
Kaplan-Norton, KPIs financieros, semáforo de gestión trimestral y mapa
estratégico causa-efecto. Proyecto autocontenido, sin dependencias externas al
repositorio.

## Desarrollo

```bash
npm install
npm run dev
```

## Build de producción

```bash
npm run build
```

Genera el sitio estático en `dist/` (listo para GitHub Pages o cualquier
hosting estático).

## Datos

Los datos del BSC viven en `src/bscData.ts`, transcritos del libro
`GLOBAL_EVENT_BSC_CMI.xlsx` (incluido en `public/` para descarga desde el
propio dashboard). Si el Excel de origen cambia, `bscData.ts` debe
actualizarse a mano — no hay sincronización automática.
