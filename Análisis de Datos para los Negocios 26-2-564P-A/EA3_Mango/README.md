# EA3 — Analítica Predictiva · Caso Mango (Dashboard en vivo)

Presentación web para la **Evidencia de Aprendizaje 3 (EA3)**, continuación del caso de la
Exportadora de Mangos Peruanos (EA1 → EA2 → **EA3**). Estilo **dashboard dinámico** con
números y gráficos que se **actualizan en tiempo real** desde Google Sheets.

## Cómo usarla (en el aula / proyector)

1. Abre **`index.html`** en Chrome o Edge.
2. Presiona **`F`** (o F11) para pantalla completa.
3. Navega con **flechas ← →**, **barra espaciadora**, **desliza** el dedo, o los **puntos** inferiores.

## Datos en vivo (tiempo real)

- Lee la hoja de cálculo del equipo vía CSV público de Google Sheets y actualiza los KPIs,
  el modelo (β₁, β₀, R²), la proyección, los mercados y las variedades.
- **Auto-refresh cada 60 segundos** — si editas la hoja, la web se actualiza sola.
- El indicador **● EN VIVO · Google Sheets** (abajo a la izquierda) confirma la conexión y la hora.
- **Respaldo offline:** si no hay internet, muestra un *snapshot* embebido con los mismos valores
  reales y el indicador cambia a **● SIN CONEXIÓN · datos locales**. La presentación nunca se rompe.

> Hoja fuente: `docs.google.com/spreadsheets/d/1PqvHNC2Ct3E93028PYN0IH7B1PeV-HX4B3IebU1ECAc`

## Optimizada para el proyector NEC MC423W

- **Formato 16:10 (1280×800)** nativo del proyector.
- **Tema claro de alto contraste** — legible con luz de aula.
- **Texto grande** y colores saturados.

## Reparto de la exposición (6 integrantes · 100%)

| Slide | Sección | Expositor |
|:---:|:---|:---|
| 1 | Portada | Jahir Castillo Paucas |
| 2 | De describir a predecir | Marilin Medina Apolinario |
| 3 | Panorama del negocio (dashboard) | Jostin Chavez Estela |
| 4 | El modelo predictivo (regresión) | **Yhurem García Piedra** |
| 5 | Estacionalidad y proyección 2026 | María Ruíz Luna |
| 6 | Predicción & simulador | Eric Mozombite Shishco |
| 7 | Decisión basada en datos | Eric Mozombite Shishco |
| 8 | Conclusiones | Jahir Castillo Paucas |

## El modelo (real, tomado de la hoja)

Regresión lineal simple del **ingreso mensual** sobre el **tiempo** (60 meses, 2021–2025):

**Ŷ = $1,850,322 + $181,170 · mes** · **R² = 72.6%**

- Proyección 2026: **$166.8M** (+0.19% vs 2025)
- El simulador proyecta el ingreso mensual de la tendencia para meses futuros (Ene 2026 – Dic 2028).

## Estructura de archivos

```
EA3_Mango/
├── index.html        ← abrir este
├── css/estilos.css   ← estilos (tema claro proyector + animaciones)
├── js/app.js         ← datos en vivo, parseo del Sheet, gráficos SVG, contadores, simulador
└── README.md
```

## Notas técnicas

- Sin librerías externas: los gráficos son **SVG dibujados por código**, las fuentes son del sistema.
- La única dependencia de red es la lectura de la hoja (opcional, con respaldo).
- Los contadores animados usan `requestAnimationFrame` con respaldo por `setTimeout`
  (garantiza el valor final incluso si la pestaña está en segundo plano).
