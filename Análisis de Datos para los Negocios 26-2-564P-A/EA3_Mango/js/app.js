/* ============================================================
   EA3 — Caso Mango · Dashboard dinámico con datos EN VIVO
   Lee la hoja de Google Sheets (gviz CSV) y actualiza números
   y gráficos. Respaldo offline embebido (snapshot real).
   Sin librerías externas. Gráficos en SVG.
   ============================================================ */
'use strict';

/* ---------- Config ---------- */
const SHEET_ID = '1PqvHNC2Ct3E93028PYN0IH7B1PeV-HX4B3IebU1ECAc';
const SHEET_URL = 'https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/gviz/tq?tqx=out:csv';
const REFRESH_MS = 60000; // auto-refresh cada 60 s

/* ---------- Paleta ---------- */
const C = { mango:'#E4620C', mangoDeep:'#B44A00', green:'#1B8A3F', blue:'#1565C0',
            gold:'#C7930A', ink:'#1A1611', soft:'#5C5346', faint:'#8A8072', grid:'#EFE8DA', border:'#D6C9B3' };

/* ============================================================
   1) DATA (respaldo offline = snapshot real de la hoja)
   ============================================================ */
const D = {
  b1: 181169.67, b0: 1850322.36, r2: 0.726,
  hist2025: 166451627.74, proy2026: 166771041.53, crec: 0.0019,
  mercados: [ {n:'Europa',v:205036686,col:C.blue}, {n:'EE.UU.',v:148195845.4,col:C.green},
              {n:'Asia',v:59549605.2,col:C.mango}, {n:'Latam',v:29777709.27,col:C.gold} ],
  variedades: [ {n:'Kent',v:276355448.1,col:C.blue}, {n:'Edward',v:114776723.6,col:C.green},
                {n:'Haden',v:51427674.18,col:C.mango} ],
  anual: [ {year:2021,v:56297522.74},{year:2022,v:56353549.49},{year:2023,v:55627148.84},
           {year:2024,v:107829997.08},{year:2025,v:166451627.74} ],
  seasonal: [0.9707,1.0269,0.9613,1.0779,0.98,0.9811,1.0533,0.9629,1.0077,0.9722,0.9803,1.0257]
};
function derive(){ D.total = D.anual.reduce((a,r)=>a+r.v,0);
  const tv=D.variedades.reduce((a,r)=>a+r.v,0), tm=D.mercados.reduce((a,r)=>a+r.v,0);
  const kent=(D.variedades.find(x=>x.n==='Kent')||{}).v||0;
  const eu=(D.mercados.find(x=>x.n==='Europa')||{}).v||0;
  D.kentPct = tv? kent/tv : 0; D.euPct = tm? eu/tm : 0; }
derive();

/* ============================================================
   2) LECTURA EN VIVO DE LA HOJA (CSV) + PARSEO
   ============================================================ */
function parseCSV(text){
  const rows=[]; let row=[], cur='', q=false;
  for(let i=0;i<text.length;i++){ const ch=text[i];
    if(q){ if(ch==='"'){ if(text[i+1]==='"'){cur+='"';i++;} else q=false; } else cur+=ch; }
    else { if(ch==='"') q=true; else if(ch===','){ row.push(cur); cur=''; }
      else if(ch==='\n'){ row.push(cur); rows.push(row); row=[]; cur=''; }
      else if(ch==='\r'){} else cur+=ch; } }
  if(cur.length||row.length){ row.push(cur); rows.push(row); }
  return rows;
}
const numOf = s => { if(s==null) return NaN; const v=parseFloat((''+s).replace(/[$%\s"]/g,'').replace(/,/g,'')); return v; };

function parseSheet(text){
  const rows = parseCSV(text);
  const N = {};
  const findHeader = sub => { for(let r=0;r<rows.length;r++) for(let c=0;c<rows[r].length;c++)
      if((rows[r][c]||'').includes(sub)) return {r,c}; return null; };
  const below = (sub,pct) => { const h=findHeader(sub); if(!h||!rows[h.r+1]) return null;
      let v=numOf(rows[h.r+1][h.c]); if(pct) v/=100; return isFinite(v)?v:null; };
  // valor numérico a la DERECHA de una etiqueta (evita chocar con los años a la izquierda)
  const rightOf = label => { for(let r=0;r<rows.length;r++) for(let c=0;c<rows[r].length;c++)
      if((rows[r][c]||'').trim()===label){ for(let k=c+1;k<rows[r].length;k++){ const v=numOf(rows[r][k]);
        if(isFinite(v)&&v>10000) return v; } } return null; };

  N.b1 = below('Pendiente'); N.b0 = below('Intercepto'); N.r2 = below('R²',true);
  N.hist2025 = below('Histórico 2025'); N.proy2026 = below('Proyectado 2026'); N.crec = below('Crecimiento 2026',true);

  const merc=[]; [['Europa',C.blue],['EE.UU.',C.green],['Asia',C.mango],['Latinoamérica',C.gold]].forEach(([n,col])=>{
    const v=rightOf(n); if(v) merc.push({n:n==='Latinoamérica'?'Latam':n, v, col}); });
  const vars=[]; [['Kent',C.blue],['Edward',C.green],['Haden',C.mango]].forEach(([n,col])=>{
    const v=rightOf(n); if(v) vars.push({n, v, col}); });

  const anual=[], seasonal=[];
  for(let r=0;r<rows.length;r++){ const a=(rows[r][1]||'').trim(), b=rows[r][2];
    if(/^\d{4}$/.test(a)){ const y=+a; if(y>=2018&&y<=2035){ const v=numOf(b); if(isFinite(v)) anual.push({year:y,v}); } }
    else if(/^\d{1,2}$/.test(a)){ const m=+a, v=numOf(b); if(m>=1&&m<=12&&isFinite(v)&&v>0.5&&v<1.5) seasonal[m-1]=v; } }

  // aplicar solo lo válido (no romper si algo falta)
  if(isFinite(N.b1)) D.b1=N.b1; if(isFinite(N.b0)) D.b0=N.b0; if(isFinite(N.r2)) D.r2=N.r2;
  if(isFinite(N.hist2025)) D.hist2025=N.hist2025; if(isFinite(N.proy2026)) D.proy2026=N.proy2026;
  if(isFinite(N.crec)) D.crec=N.crec;
  if(merc.length===4) D.mercados=merc.sort((a,b)=>b.v-a.v);
  if(vars.length===3) D.variedades=vars.sort((a,b)=>b.v-a.v);
  if(anual.length>=4) D.anual=anual.sort((a,b)=>a.year-b.year);
  if(seasonal.filter(x=>x).length===12) D.seasonal=seasonal;
  derive();
}

let live=false;
async function fetchLive(){
  try{
    const r = await fetch(SHEET_URL, {cache:'no-store'});
    if(!r.ok) throw new Error('HTTP '+r.status);
    const t = await r.text();
    parseSheet(t);
    live = true;
    setBadge(true);
    renderSlide(cur);           // refresca la diapositiva visible
  }catch(e){
    live = false; setBadge(false);
    console.warn('Sin datos en vivo, usando snapshot local:', e.message);
  }
}
function setBadge(ok){
  const b=document.getElementById('live-badge'), u=document.getElementById('updated');
  if(ok){ b.className='live-badge'; b.innerHTML='<span class="pulse"></span> EN VIVO · Google Sheets';
    u.textContent='Actualizado '+new Date().toLocaleTimeString('es-PE'); }
  else { b.className='live-badge stale'; b.innerHTML='<span class="pulse"></span> SIN CONEXIÓN · datos locales';
    u.textContent='Snapshot embebido'; }
}

/* ============================================================
   3) FORMATO + CONTADORES ANIMADOS
   ============================================================ */
const fM   = v => '$' + (v/1e6).toFixed(1) + 'M';
const fFull= v => '$' + Math.round(v).toLocaleString('en-US');
const fP   = v => (v*100).toFixed(1) + '%';
const fP2p = v => '+' + (v*100).toFixed(2) + '%';
const fInt = v => String(Math.round(v));

const KPI = {
  total:()=>[D.total,fM], totalb:()=>[D.total,fM],
  hist2025:()=>[D.hist2025,fM], hist2025b:()=>[D.hist2025,fM],
  proy2026:()=>[D.proy2026,fM], proy2026b:()=>[D.proy2026,fM], proy2026c:()=>[D.proy2026,fM], proy2026d:()=>[D.proy2026,fM],
  kentPct:()=>[D.kentPct,fP], euPct:()=>[D.euPct,fP],
  b1:()=>[D.b1,fFull], b1b:()=>[D.b1,fFull], b0:()=>[D.b0,fFull],
  r2:()=>[D.r2,fP], r2b:()=>[D.r2,fP], r2c:()=>[D.r2,fP], r2d:()=>[D.r2,fP], r2e:()=>[D.r2,fP], r2f:()=>[D.r2,fP],
  crec:()=>[D.crec,fP2p], crecb:()=>[D.crec,fP2p],
  meses:()=>[D.anual.length*12, fInt]
};
function animateCount(el, from, to, dur, fmt){
  const t0=performance.now();
  const step=t=>{ let p=Math.min((t-t0)/dur,1); p=1-Math.pow(1-p,3); // easeOutCubic
    el.textContent=fmt(from+(to-from)*p); if(p<1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
  // respaldo: garantiza el valor final aunque rAF esté pausado (pestaña en 2º plano)
  setTimeout(()=>{ el.textContent=fmt(to); }, dur+90);
}
function animateSlideCounters(slideEl){
  slideEl.querySelectorAll('.count[data-kpi]').forEach(el=>{
    const spec=KPI[el.dataset.kpi]; if(!spec) return;
    const [val,fmt]=spec(); const from=(el._v!=null)?el._v:0;
    animateCount(el, from, val, 850, fmt); el._v=val; });
}

/* ============================================================
   4) GRÁFICOS SVG
   ============================================================ */
function svg(w,h){ return `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid meet" font-family="Segoe UI, Arial, sans-serif">`; }

function barChart(el, items, unit){
  const W=440,H=300,mL=48,mR=16,mT=18,mB=52, pw=W-mL-mR, ph=H-mT-mB;
  const max=Math.max(...items.map(d=>d.v))*1.12, gap=pw/items.length, bw=gap*0.56;
  let s=svg(W,H);
  for(let i=0;i<=4;i++){ const gy=mT+ph-(ph*i/4), val=(max*i/4/1e6).toFixed(0);
    s+=`<line x1="${mL}" y1="${gy}" x2="${W-mR}" y2="${gy}" stroke="${C.grid}"/>`;
    s+=`<text x="${mL-8}" y="${gy+4}" text-anchor="end" font-size="12" fill="${C.soft}">${val}</text>`; }
  items.forEach((d,i)=>{ const x=mL+gap*i+(gap-bw)/2, bh=ph*d.v/max, y=mT+ph-bh;
    s+=`<rect class="anim-bar" style="animation-delay:${i*0.09}s" x="${x}" y="${y}" width="${bw}" height="${bh}" rx="5" fill="${d.col}"/>`;
    s+=`<text x="${x+bw/2}" y="${y-7}" text-anchor="middle" font-size="14" font-weight="800" fill="${C.ink}">${(d.v/1e6).toFixed(0)}M</text>`;
    s+=`<text x="${x+bw/2}" y="${H-mB+22}" text-anchor="middle" font-size="14" font-weight="700" fill="${C.soft}">${d.n}</text>`; });
  s+=`<text x="14" y="${mT+ph/2}" transform="rotate(-90 14 ${mT+ph/2})" text-anchor="middle" font-size="11" fill="${C.faint}">Millones USD</text>`;
  el.innerHTML=s+'</svg>';
}

function donutChart(el, items){
  const W=440,H=300,cx=140,cy=150,r=86,th=42, C_=2*Math.PI*r, total=items.reduce((a,d)=>a+d.v,0);
  const T=1.5; // duración total del barrido
  let s=svg(W,H), cum=0;
  // aro de fondo
  s+=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${C.grid}" stroke-width="${th}"/>`;
  items.forEach(d=>{ const f=d.v/total, arc=C_*f, startDeg=-90+360*cum, begin=T*cum, dur=Math.max(T*f,0.2);
    // segmento como arco que crece (stroke-dasharray animado con SMIL, secuencial)
    s+=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${d.col}" stroke-width="${th}" stroke-linecap="butt" stroke-dasharray="0 ${C_}" transform="rotate(${startDeg} ${cx} ${cy})">`;
    s+=`<animate attributeName="stroke-dasharray" from="0 ${C_}" to="${arc} ${C_}" begin="${begin.toFixed(2)}s" dur="${dur.toFixed(2)}s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="0.4 0 0.2 1"/></circle>`;
    // etiqueta % (aparece cuando el segmento termina de dibujarse)
    const midRad=(startDeg+180*f)*Math.PI/180, lx=cx+r*Math.cos(midRad), ly=cy+r*Math.sin(midRad), end=begin+dur;
    s+=`<text x="${lx}" y="${ly+5}" text-anchor="middle" font-size="15" font-weight="800" fill="#fff" opacity="0">${(100*f).toFixed(0)}%<animate attributeName="opacity" from="0" to="1" begin="${end.toFixed(2)}s" dur="0.3s" fill="freeze"/></text>`;
    cum+=f; });
  // leyenda
  let ly=104; items.forEach(d=>{ s+=`<rect x="290" y="${ly-13}" width="18" height="18" rx="4" fill="${d.col}"/>`;
    s+=`<text x="316" y="${ly+2}" font-size="16" font-weight="700" fill="${C.ink}">${d.n}</text>`;
    s+=`<text x="316" y="${ly+20}" font-size="12" fill="${C.soft}">${fM(d.v)}</text>`; ly+=52; });
  el.innerHTML=s+'</svg>';
}

// meses reconstruidos (tendencia × estacionalidad) en millones
function reconMonthly(){ const a=[]; for(let m=1;m<=60;m++){ const tr=(D.b0+D.b1*m);
    a.push({m, y: tr*D.seasonal[(m-1)%12]/1e6}); } return a; }
const trendM = m => (D.b0+D.b1*m)/1e6;

function scatter(el, opts){
  opts=opts||{}; const xdom=opts.xdom||[0,60], ydom=opts.ydom||[0,16];
  const W=520,H=340,mL=52,mR=22,mT=18,mB=48, pw=W-mL-mR, ph=H-mT-mB;
  const sx=x=>mL+pw*(x-xdom[0])/(xdom[1]-xdom[0]), sy=y=>mT+ph-ph*(y-ydom[0])/(ydom[1]-ydom[0]);
  let s=svg(W,H);
  for(let i=0;i<=ydom[1];i+=Math.ceil(ydom[1]/8)){ const gy=sy(i);
    s+=`<line x1="${mL}" y1="${gy}" x2="${W-mR}" y2="${gy}" stroke="${C.grid}"/>`;
    s+=`<text x="${mL-9}" y="${gy+4}" text-anchor="end" font-size="12" fill="${C.soft}">${i}</text>`; }
  for(let x=xdom[0]; x<=xdom[1]; x+=12){ const gx=sx(x);
    s+=`<line x1="${gx}" y1="${mT}" x2="${gx}" y2="${mT+ph}" stroke="${C.grid}"/>`;
    s+=`<text x="${gx}" y="${mT+ph+22}" text-anchor="middle" font-size="12" fill="${C.soft}">${x}</text>`; }
  s+=`<text x="${mL+pw/2}" y="${H-6}" text-anchor="middle" font-size="13" fill="${C.soft}">Mes (1 = Ene 2021)</text>`;
  s+=`<text x="14" y="${mT+ph/2}" transform="rotate(-90 14 ${mT+ph/2})" text-anchor="middle" font-size="13" fill="${C.soft}">Ingreso mensual (M USD)</text>`;
  // rango validado
  if(opts.showRange){ s+=`<rect x="${sx(1)}" y="${mT}" width="${sx(60)-sx(1)}" height="${ph}" fill="${C.green}" opacity="0.06"/>`;
    s+=`<text x="${(sx(1)+sx(60))/2}" y="${mT+14}" text-anchor="middle" font-size="11" fill="${C.green}" font-weight="700">rango validado (1–60)</text>`; }
  // recta de tendencia
  s+=`<line class="anim-line" x1="${sx(xdom[0])}" y1="${sy(trendM(xdom[0]||1))}" x2="${sx(xdom[1])}" y2="${sy(trendM(xdom[1]))}" stroke="${C.ink}" stroke-width="2.5"/>`;
  // puntos
  reconMonthly().forEach(p=>{ s+=`<circle cx="${sx(p.m)}" cy="${sy(p.y)}" r="4.5" fill="${C.mango}" opacity="0.85"/>`; });
  // punto proyectado
  if(opts.predX!=null){ const py=trendM(opts.predX);
    s+=`<line x1="${sx(opts.predX)}" y1="${sy(py)}" x2="${sx(opts.predX)}" y2="${mT+ph}" stroke="${C.green}" stroke-width="1.5" stroke-dasharray="5 4"/>`;
    s+=`<line x1="${mL}" y1="${sy(py)}" x2="${sx(opts.predX)}" y2="${sy(py)}" stroke="${C.green}" stroke-width="1.5" stroke-dasharray="5 4"/>`;
    s+=`<circle cx="${sx(opts.predX)}" cy="${sy(py)}" r="11" fill="${C.green}" stroke="#fff" stroke-width="3"/>`;
    s+=`<circle cx="${sx(opts.predX)}" cy="${sy(py)}" r="17" fill="none" stroke="${C.green}" stroke-width="1.5" opacity="0.4"/>`;
    s+=`<text x="${sx(opts.predX)}" y="${sy(py)-18}" text-anchor="middle" font-size="15" font-weight="800" fill="${C.green}">${fM(py*1e6)}</text>`; }
  el.innerHTML=s+'</svg>';
}

function lineAnual(el){
  const pts = D.anual.map(r=>({x:r.year, y:r.v/1e6}));
  pts.push({x:2026, y:D.proy2026/1e6, proj:true});
  const W=520,H=320,mL=52,mR=22,mT=22,mB=46, pw=W-mL-mR, ph=H-mT-mB;
  const ymax=Math.max(...pts.map(p=>p.y))*1.15;
  const xs=pts.map(p=>p.x), xmin=Math.min(...xs), xmax=Math.max(...xs);
  const sx=x=>mL+pw*(x-xmin)/(xmax-xmin), sy=y=>mT+ph-ph*y/ymax;
  let s=svg(W,H);
  for(let i=0;i<=4;i++){ const gy=mT+ph-(ph*i/4), v=(ymax*i/4).toFixed(0);
    s+=`<line x1="${mL}" y1="${gy}" x2="${W-mR}" y2="${gy}" stroke="${C.grid}"/>`;
    s+=`<text x="${mL-8}" y="${gy+4}" text-anchor="end" font-size="12" fill="${C.soft}">${v}</text>`; }
  pts.forEach(p=>{ s+=`<text x="${sx(p.x)}" y="${mT+ph+22}" text-anchor="middle" font-size="13" font-weight="${p.proj?800:600}" fill="${p.proj?C.green:C.soft}">${p.x}</text>`; });
  // línea histórica (2021-2025)
  const hist=pts.filter(p=>!p.proj);
  let d1='M'+hist.map(p=>`${sx(p.x)} ${sy(p.y)}`).join(' L');
  s+=`<path class="anim-line" d="${d1}" fill="none" stroke="${C.blue}" stroke-width="3"/>`;
  // segmento proyección (2025->2026) punteado
  const last=hist[hist.length-1], proj=pts[pts.length-1];
  s+=`<line x1="${sx(last.x)}" y1="${sy(last.y)}" x2="${sx(proj.x)}" y2="${sy(proj.y)}" stroke="${C.green}" stroke-width="3" stroke-dasharray="7 5"/>`;
  hist.forEach(p=>{ s+=`<circle cx="${sx(p.x)}" cy="${sy(p.y)}" r="6" fill="${C.blue}" stroke="#fff" stroke-width="2"/>`;
    s+=`<text x="${sx(p.x)}" y="${sy(p.y)-12}" text-anchor="middle" font-size="12" font-weight="800" fill="${C.ink}">${p.y.toFixed(0)}</text>`; });
  s+=`<circle class="anim-dot" cx="${sx(proj.x)}" cy="${sy(proj.y)}" r="7" fill="${C.green}" stroke="#fff" stroke-width="2"/>`;
  s+=`<text x="${sx(proj.x)}" y="${sy(proj.y)-13}" text-anchor="middle" font-size="12" font-weight="800" fill="${C.green}">${proj.y.toFixed(0)}</text>`;
  s+=`<text x="14" y="${mT+ph/2}" transform="rotate(-90 14 ${mT+ph/2})" text-anchor="middle" font-size="12" fill="${C.faint}">Millones USD</text>`;
  el.innerHTML=s+'</svg>';
}

function seasonalChart(el){
  const meses=['E','F','M','A','M','J','J','A','S','O','N','D'];
  const W=460,H=180,mL=30,mR=12,mT=14,mB=28, pw=W-mL-mR, ph=H-mT-mB;
  const lo=0.9, hi=1.1, gap=pw/12, bw=gap*0.6;
  const sy=v=>mT+ph-ph*(v-lo)/(hi-lo);
  let s=svg(W,H);
  s+=`<line x1="${mL}" y1="${sy(1)}" x2="${W-mR}" y2="${sy(1)}" stroke="${C.faint}" stroke-width="1.5" stroke-dasharray="4 3"/>`;
  s+=`<text x="${W-mR}" y="${sy(1)-4}" text-anchor="end" font-size="10" fill="${C.faint}">promedio 1.0</text>`;
  D.seasonal.forEach((v,i)=>{ const x=mL+gap*i+(gap-bw)/2, top=sy(Math.max(v,1)), bot=sy(Math.min(v,1)), h=Math.abs(bot-top);
    const col=v>=1?C.mango:C.faint;
    s+=`<rect class="anim-bar" style="animation-delay:${i*0.04}s" x="${x}" y="${top}" width="${bw}" height="${Math.max(h,1)}" rx="2" fill="${col}"/>`;
    // valor numérico del índice (arriba si sube, abajo si baja)
    const ty = v>=1 ? top-4 : bot+11;
    s+=`<text x="${x+bw/2}" y="${ty}" text-anchor="middle" font-size="9.5" font-weight="800" fill="${col}">${v.toFixed(2)}</text>`;
    s+=`<text x="${x+bw/2}" y="${H-mB+18}" text-anchor="middle" font-size="11" font-weight="700" fill="${C.soft}">${meses[i]}</text>`; });
  el.innerHTML=s+'</svg>';
}

/* ============================================================
   5) SIMULADOR (slide 6)
   ============================================================ */
const MESES=['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
function fechaMes(m){ const y=2021+Math.floor((m-1)/12); return MESES[(m-1)%12]+' '+y; }
function updateSim(){
  const sl=document.getElementById('sim-x'); if(!sl) return;
  const m=+sl.value, y=trendM(m)*1e6;
  setTxt('sim-x-lbl', m); setTxt('sim-fecha', '('+fechaMes(m)+')');
  // ecuación en vivo con sustitución
  setTxt('eq6-b0', fFull(D.b0).replace('$','')); setTxt('eq6-b1', fFull(D.b1).replace('$',''));
  setTxt('eq6-x', m); setTxt('eq6-mes', m); setTxt('eq6-fecha', fechaMes(m));
  const res=document.getElementById('eq6-res'); if(res){ animateCount(res, res._v||0, y, 450, fM); res._v=y; }
  // anual proyectado (×12) y Δ vs promedio mensual 2025
  const anual=document.getElementById('mg-anual'); const av=y*12;
  if(anual){ animateCount(anual, anual._v||0, av, 450, fM); anual._v=av; }
  const prom2025 = D.hist2025/12, delta=(y/prom2025-1)*100;
  setTxt('mg-delta', (delta>=0?'+':'')+delta.toFixed(1)+'%');
  scatter(document.getElementById('chart-pred'), { xdom:[0,96], ydom:[0,22], showRange:true, predX:m });
}

/* ============================================================
   6) RENDER POR DIAPOSITIVA (charts + contadores)
   ============================================================ */
function renderSlide(i){
  const sl=slides[i]; if(!sl) return;
  animateSlideCounters(sl);
  const id=sl.id;
  if(id==='s3'){ barChart(document.getElementById('chart-mercados'), D.mercados);
    donutChart(document.getElementById('chart-variedades'), D.variedades); }
  else if(id==='s4'){ scatter(document.getElementById('chart-scatter'), {xdom:[0,60],ydom:[0,16],showRange:true});
    setTxt('eq-b0', fFull(D.b0)); setTxt('eq-b1', fFull(D.b1)); }
  else if(id==='s5'){ lineAnual(document.getElementById('chart-anual'));
    seasonalChart(document.getElementById('chart-estacional')); }
  else if(id==='s6'){ updateSim(); }
}
function setTxt(id,v){ const e=document.getElementById(id); if(e) e.textContent=v; }

/* ============================================================
   7) NAVEGACIÓN
   ============================================================ */
const slides=Array.from(document.querySelectorAll('.slide'));
const total=slides.length;
let cur=0;
function buildDots(){ const c=document.getElementById('dots'); c.innerHTML='';
  slides.forEach((_,i)=>{ const d=document.createElement('div'); d.className='dot'+(i===0?' on':'');
    d.addEventListener('click',()=>go(i)); c.appendChild(d); }); }
function go(i){ if(i<0)i=0; if(i>=total)i=total-1;
  slides[cur].classList.remove('active'); slides[i].classList.add('active'); cur=i;
  document.querySelectorAll('.dot').forEach((d,k)=>d.classList.toggle('on',k===i));
  renderSlide(i); }
const next=()=>go(cur+1), prev=()=>go(cur-1);
document.addEventListener('keydown',e=>{
  if(e.key==='ArrowRight'||e.key===' '||e.key==='PageDown'){ e.preventDefault(); next(); }
  else if(e.key==='ArrowLeft'||e.key==='PageUp'){ e.preventDefault(); prev(); }
  else if(e.key==='Home') go(0); else if(e.key==='End') go(total-1);
  else if(e.key==='f'||e.key==='F'){ if(!document.fullscreenElement) document.documentElement.requestFullscreen&&document.documentElement.requestFullscreen(); else document.exitFullscreen&&document.exitFullscreen(); } });
let tx=0,ty=0;
document.addEventListener('touchstart',e=>{tx=e.changedTouches[0].screenX;ty=e.changedTouches[0].screenY;},{passive:true});
document.addEventListener('touchend',e=>{const dx=e.changedTouches[0].screenX-tx,dy=e.changedTouches[0].screenY-ty;
  if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy)*1.5){ dx<0?next():prev(); }},{passive:true});

/* ============================================================
   8) INIT
   ============================================================ */
window.addEventListener('DOMContentLoaded',()=>{
  buildDots();
  const sl=document.getElementById('sim-x'); if(sl) sl.addEventListener('input', updateSim);
  // arrastre del punto verde en la gráfica de predicción (slide 6)
  const cp=document.getElementById('chart-pred');
  if(cp){ let drag=false;
    const monthFrom=e=>{ const r=cp.getBoundingClientRect(); const sx=(e.clientX-r.left)/r.width*520;
      return Math.max(61, Math.min(96, Math.round((sx-52)/446*96))); };
    const setM=m=>{ const s=document.getElementById('sim-x'); s.value=m; updateSim(); };
    cp.addEventListener('pointerdown',e=>{ drag=true; try{cp.setPointerCapture(e.pointerId);}catch(_){} setM(monthFrom(e)); e.preventDefault(); });
    cp.addEventListener('pointermove',e=>{ if(drag) setM(monthFrom(e)); });
    window.addEventListener('pointerup',()=>{ drag=false; });
  }
  renderSlide(0);
  setBadge(false);
  fetchLive();                          // primera carga en vivo
  setInterval(fetchLive, REFRESH_MS);   // auto-refresh
});
