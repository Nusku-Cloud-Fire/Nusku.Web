"use client";

import { useEffect } from "react";
import { initCalculadora } from "./calculadora-ahorro-logic";

/**
 * Calculadora de ahorro RIPCI — cuerpo HTML/CSS/JS del artifact original,
 * sin reescribir la lógica de cálculo. El script arranca en useEffect.
 */
const STYLES = `

/* Tokens tomados de Nusku.Web/app/globals.css (web publica).
     Anadidos solo dos semanticos que la web no necesita: ahorro / coste. */
  .calc-ahorro{
    position:relative;
    --g1:#f0f4f8; --g2:#bac8d2; --g3:#879ca9; --g4:#6d7086; --g5:#151520; --g6:#0c0c13;
    --blue:#2d8dff; --blue-minus:#1976e4; --blue-plus:#97c7ff; --ai:#c745ff;
    --save:#3fd39b; --save-dim:#3fd39b1a;
    --cost:#ff8a5e;
    --bg:var(--g6); --surface:var(--g5); --body:var(--g2); --detail:var(--g4);
    --hairline:#ffffff12;
    --font:var(--font-rethink-sans),ui-sans-serif,system-ui,-apple-system,sans-serif;
    --gutter:clamp(20px,4vw,54px);
  }
  .calc-ahorro,.calc-ahorro *{box-sizing:border-box}
  .calc-ahorro{
    margin:0;padding-top:82px;overflow-x:clip;color:var(--body);
    font-family:var(--font);font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased;
    position:relative;isolation:isolate;
    background-color:var(--bg);
    background-image:
      radial-gradient(1500px 780px at 50% -14%,#1976e433,#1976e400 60%),
      radial-gradient(900px 500px at 82% 2%,#2d8dff1a,#2d8dff00 66%),
      url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24'><circle cx='12' cy='12' r='1.1' fill='%23ffffff' fill-opacity='0.13'/></svg>");
    background-repeat:no-repeat,no-repeat,repeat;
    background-position:center top,right top,center top;
    background-size:auto,auto,24px 24px;
    background-attachment:fixed,fixed,fixed;
  }
  .container{width:100%;max-width:1500px;margin-inline:auto;padding-inline:var(--gutter)}
  .narrow{max-width:1320px;margin-inline:auto}
  .badge{
    display:inline-block;border-radius:20px;padding:12px 15px 10px;font-size:12px;line-height:1;
    font-weight:500;letter-spacing:.04em;text-transform:uppercase;color:var(--blue-plus);
    box-shadow:inset 0 0 0 1.5px var(--blue-plus);
  }

  .hero{padding-block:clamp(40px,7vw,86px) clamp(24px,4vw,40px);text-align:center}
  .hero .inner{display:flex;flex-direction:column;align-items:center;gap:20px;max-width:56rem;margin-inline:auto}
  h1{margin:0;padding-bottom:11px;font-weight:600;line-height:1;font-size:35px;letter-spacing:-.01em}
  @media(min-width:768px){h1{font-size:50px}}
  @media(min-width:1024px){h1{font-size:64px}}
  .hero p{margin:0;font-size:18px;color:var(--body);max-width:64ch}
  .hero p b{color:#fff;font-weight:600}

  section.block{padding-block:clamp(28px,5vw,60px)}
  h2.display2{margin:0;padding-block:4px;font-weight:600;line-height:1.05;font-size:27px;letter-spacing:-.01em}
  @media(min-width:768px){h2.display2{font-size:36px}}
  .sec-head{display:flex;flex-direction:column;gap:10px;max-width:60rem;margin-bottom:26px}
  .sec-head p{margin:0;font-size:17px;color:var(--body)}
  .eyebrow{font-size:11px;font-weight:700;letter-spacing:.11em;text-transform:uppercase;color:var(--g4)}

  /* ---------- resultados ---------- */
  .results{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px}
  @media(max-width:1000px){.results{grid-template-columns:repeat(2,minmax(0,1fr))}}
  @media(max-width:520px){.results{grid-template-columns:1fr}}
  .res{border-radius:14px;background:var(--surface);box-shadow:inset 0 0 0 1px var(--hairline)}
  .res > .in{
    height:100%;border-radius:14px;padding:22px 22px 20px;
    display:flex;flex-direction:column;gap:6px;
  }
  .res.hl{box-shadow:inset 0 0 0 1px #bcdfff24}
  .res.hl > .in{background-image:radial-gradient(circle at 0 0,#1976e466,#1976e41f 42%,#1976e400 72%)}
  .res .k{
    font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--detail);
    display:flex;align-items:center;gap:6px;
  }
  .res.hl .k{color:var(--blue-plus)}
  .res .v{
    font-size:36px;line-height:1.05;font-weight:700;color:#fff;letter-spacing:-.02em;
    font-variant-numeric:tabular-nums;
  }
  .res .v.save{color:var(--save)}
  .res .sub{font-size:14px;color:var(--body);line-height:1.45}

  /* ---------- panel de entradas ---------- */
  .panel{border-radius:14px;background:var(--surface);box-shadow:inset 0 0 0 1px var(--hairline)}
  .panel > .in{padding:clamp(20px,3vw,30px)}
  .grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px 20px}
  @media(max-width:1100px){.grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
  @media(max-width:520px){.grid{grid-template-columns:1fr}}
  .grid.two{grid-template-columns:repeat(2,minmax(0,1fr))}
  @media(max-width:760px){.grid.two{grid-template-columns:1fr}}

  .field{display:flex;flex-direction:column;gap:7px;min-width:0}
  .field label{
    font-size:13px;font-weight:600;color:var(--g1);display:flex;align-items:center;gap:6px;
    line-height:1.3;
  }
  .inp{
    display:flex;align-items:center;border-radius:10px;background:#ffffff08;
    box-shadow:inset 0 0 0 1px var(--hairline);transition:box-shadow .15s,background .15s;
  }
  .inp:focus-within{box-shadow:inset 0 0 0 1.5px var(--blue);background:#2d8dff0f}
  .inp input{
    width:100%;min-width:0;border:0;background:none;color:#fff;font:inherit;font-weight:600;
    font-size:16px;padding:11px 12px;font-variant-numeric:tabular-nums;outline:none;
  }
  .inp input::-webkit-outer-spin-button,.inp input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}
  .inp input[type=number]{-moz-appearance:textfield}
  .inp .unit{
    flex:none;padding-right:12px;padding-left:4px;font-size:13px;font-weight:500;color:var(--g4);
    white-space:nowrap;
  }
  .field .hint{font-size:12.5px;color:var(--detail);line-height:1.4}

  /* ---------- boton i de informacion ---------- */
  .i{
    flex:none;width:17px;height:17px;border-radius:50%;border:0;padding:0;cursor:pointer;
    background:#ffffff12;color:var(--g2);font-family:var(--font);font-size:11px;font-weight:700;
    line-height:17px;text-align:center;transition:background .15s,color .15s;
    position:relative;
  }
  .i:hover,.i[aria-expanded=true]{background:var(--blue);color:#fff}
  .pop{
    position:absolute;z-index:60;max-width:min(360px,calc(100vw - 32px));
    border-radius:12px;background:#1c1c29;box-shadow:0 18px 40px -12px #000000cc,inset 0 0 0 1px #ffffff1f;
    padding:15px 17px;font-size:13.5px;line-height:1.55;color:var(--body);
  }
  .pop h4{margin:0 0 6px;font-size:13px;font-weight:700;color:#fff;letter-spacing:-.005em}
  .pop p{margin:0 0 8px}
  .pop p:last-child{margin-bottom:0}
  .pop .frm{
    display:block;margin:9px 0;padding:9px 11px;border-radius:8px;background:#ffffff0a;
    box-shadow:inset 0 0 0 1px var(--hairline);
    font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12px;color:var(--blue-plus);
    line-height:1.5;
  }
  .pop .src{
    display:block;margin-top:9px;padding-top:9px;border-top:1px solid var(--hairline);
    font-size:12px;color:var(--detail);
  }

  /* ---------- opciones avanzadas ---------- */
  details.adv{margin-top:26px;border-radius:12px;background:#ffffff05;box-shadow:inset 0 0 0 1px var(--hairline)}
  details.adv > summary{
    list-style:none;cursor:pointer;padding:15px 20px;display:flex;align-items:center;gap:12px;
    font-size:14.5px;font-weight:600;color:#fff;border-radius:12px;
  }
  details.adv > summary::-webkit-details-marker{display:none}
  details.adv > summary .chev{
    flex:none;width:18px;height:18px;color:var(--blue-plus);transition:transform .2s;
  }
  details.adv[open] > summary .chev{transform:rotate(90deg)}
  details.adv > summary .note{font-size:13px;font-weight:400;color:var(--detail);flex:1 1 200px}
  .adv-body{padding:4px 20px 22px;display:flex;flex-direction:column;gap:26px}
  .adv-grp h3{
    margin:0 0 4px;font-size:15px;font-weight:700;color:#fff;letter-spacing:-.005em;
    display:flex;align-items:center;gap:7px;
  }
  .adv-grp .gd{margin:0 0 15px;font-size:13.5px;color:var(--detail);max-width:78ch}

  /* tabla de visitas editable */
  .scroller{overflow-x:auto;margin-inline:-6px;padding-inline:6px}
  table.visits{border-collapse:separate;border-spacing:0;width:100%;min-width:660px}
  table.visits th,table.visits td{text-align:left;padding:9px 10px;border:none;vertical-align:middle}
  table.visits thead th{
    font-size:11px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:var(--g4);
    white-space:nowrap;padding-bottom:12px;
  }
  table.visits thead th.num{text-align:center;width:104px}
  table.visits tbody tr.item td{transition:background .12s}
  table.visits tbody tr.item:hover td{background:#ffffff05}
  table.visits tbody td:first-child{border-radius:8px 0 0 8px}
  table.visits tbody td:last-child{border-radius:0 8px 8px 0}
  table.visits td.vn{font-size:14.5px;color:var(--g1);font-weight:500;min-width:190px}
  table.visits td.vn i{font-style:normal;display:block;font-size:12.5px;color:var(--detail);font-weight:400}
  table.visits td.num{text-align:center}
  .mini{
    width:92px;border-radius:9px;background:#ffffff08;box-shadow:inset 0 0 0 1px var(--hairline);
    display:inline-flex;align-items:center;transition:box-shadow .15s,background .15s;
  }
  .mini:focus-within{box-shadow:inset 0 0 0 1.5px var(--blue);background:#2d8dff0f}
  .mini input{
    width:100%;min-width:0;border:0;background:none;color:#fff;font:inherit;font-weight:600;font-size:15px;
    padding:8px 2px 8px 10px;font-variant-numeric:tabular-nums;outline:none;text-align:right;
  }
  .mini input::-webkit-outer-spin-button,.mini input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}
  .mini input[type=number]{-moz-appearance:textfield}
  .mini .u{flex:none;padding:0 9px 0 3px;font-size:12px;color:var(--g4);font-weight:500}
  .off{opacity:.4}
  .remote{
    font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--blue-plus);
    background:#2d8dff1f;border-radius:999px;padding:5px 11px;white-space:nowrap;
  }

  /* ---------- desglose ---------- */
  .breakdown{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px}
  @media(max-width:900px){.breakdown{grid-template-columns:1fr}}
  .bd{border-radius:14px;background:var(--surface);box-shadow:inset 0 0 0 1px var(--hairline)}
  .bd > .in{padding:26px 26px 22px;display:flex;flex-direction:column;height:100%}
  .bd.now > .in{}
  .bd.next{box-shadow:inset 0 0 0 1px #bcdfff24}
  .bd.next > .in{border-radius:14px;background-image:radial-gradient(circle at 100% 0,#1976e43d,#1976e414 46%,#1976e400 74%)}
  .bd h3{margin:0;font-size:21px;line-height:1.2;font-weight:600;color:#fff;letter-spacing:-.01em}
  .bd .cap{margin:2px 0 18px;font-size:13.5px;color:var(--detail)}
  .lines{display:flex;flex-direction:column;gap:1px;margin-bottom:auto}
  .ln{display:flex;align-items:baseline;gap:12px;padding:9px 0;border-bottom:1px solid #ffffff0a}
  .ln:last-child{border-bottom:0}
  .ln .n{flex:1 1 auto;min-width:0;font-size:14.5px;color:var(--g1);display:flex;align-items:center;gap:6px;flex-wrap:wrap}
  .ln .n em{font-style:normal;font-size:12.5px;color:var(--detail);font-variant-numeric:tabular-nums}
  .ln .a{flex:none;font-size:15px;font-weight:600;color:#fff;font-variant-numeric:tabular-nums;white-space:nowrap}
  .ln.sub{border-top:1px solid var(--hairline);border-bottom:0;margin-top:6px;padding-top:12px}
  .ln.sub .n{font-weight:600;color:#fff}
  .ln.tot{
    margin-top:14px;padding:15px 16px;border:0;border-radius:11px;background:#ffffff08;
    box-shadow:inset 0 0 0 1px var(--hairline);
  }
  .bd.next .ln.tot{background:#2d8dff1a;box-shadow:inset 0 0 0 1px #2d8dff4d}
  .ln.tot .n{font-size:14px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:var(--g2)}
  .ln.tot .a{font-size:26px;font-weight:700;letter-spacing:-.02em}
  .perinst{
    margin-top:10px;display:flex;align-items:baseline;justify-content:space-between;gap:12px;
    font-size:14px;color:var(--detail);
  }
  .perinst b{font-size:19px;font-weight:700;color:#fff;font-variant-numeric:tabular-nums}
  .bd.next .perinst b{color:var(--blue-plus)}

  /* ---------- tabla 5 anyos ---------- */
  table.years{border-collapse:separate;border-spacing:0;width:100%;min-width:720px}
  table.years th,table.years td{text-align:right;padding:13px 16px;border:none;font-variant-numeric:tabular-nums}
  table.years th:first-child,table.years td:first-child{text-align:left}
  table.years thead th{
    font-size:11.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--g4);
    white-space:nowrap;padding-bottom:14px;
  }
  table.years tbody td{font-size:15.5px;color:var(--g1);font-weight:500}
  table.years tbody tr td{transition:background .12s}
  table.years tbody tr:hover td{background:#ffffff05}
  table.years tbody td:first-child{border-radius:8px 0 0 8px;font-weight:600;color:#fff}
  table.years tbody td:last-child{border-radius:0 8px 8px 0}
  table.years td.save{color:var(--save);font-weight:600}
  table.years td.acc{color:#fff;font-weight:700}
  table.years tfoot td{
    padding-top:16px;font-size:16px;font-weight:700;color:#fff;
    border-top:1px solid var(--hairline);
  }
  table.years tfoot td.save{color:var(--save)}

  .chartwrap{margin-top:8px;border-radius:14px;background:var(--surface);box-shadow:inset 0 0 0 1px var(--hairline)}
  .chartwrap > .in{padding:26px 24px 20px}
  .chart-head{display:flex;align-items:baseline;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-bottom:20px}
  .chart-head h3{margin:0;font-size:19px;font-weight:600;color:#fff;letter-spacing:-.01em}
  .keys{display:flex;gap:18px;flex-wrap:wrap;font-size:13px;color:var(--body)}
  .keys span{display:flex;align-items:center;gap:7px}
  .sw{width:11px;height:11px;border-radius:3px;flex:none}
  #chart{display:block;width:100%;height:auto}

  /* ---------- nota normativa ---------- */
  .note{border-radius:14px;background:var(--surface);box-shadow:inset 0 0 0 1px var(--hairline)}
  .note > .in{padding:28px 30px;display:flex;flex-direction:column;gap:12px}
  .note h3{margin:0;font-size:21px;line-height:1.25;font-weight:600;color:#fff;letter-spacing:-.01em}
  .note p{margin:0;font-size:15.5px;color:var(--body);max-width:82ch}
  .note p b{color:#fff;font-weight:600}

  .levers{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:4px}
  @media(max-width:980px){.levers{grid-template-columns:repeat(2,minmax(0,1fr))}}
  @media(max-width:560px){.levers{grid-template-columns:1fr}}
  .lever{display:flex;flex-direction:column;gap:5px;padding:18px 20px;border-radius:12px;background:#ffffff05;box-shadow:inset 0 0 0 1px var(--hairline)}
  .lever h4{margin:0;font-size:15px;font-weight:600;color:#fff}
  .lever p{margin:0;font-size:13.5px;color:var(--body);line-height:1.5}

  .actions{display:flex;gap:12px;flex-wrap:wrap;align-items:center;margin-top:24px}
  .btn{
    border:0;border-radius:10px;padding:12px 20px;font:inherit;font-size:14.5px;font-weight:600;
    cursor:pointer;background:#ffffff0d;color:#fff;box-shadow:inset 0 0 0 1px var(--hairline);
    transition:background .15s;
  }
  .btn:hover{background:#ffffff1a}
  .btn.primary{background:var(--blue);box-shadow:none}
  .btn.primary:hover{background:var(--blue-minus)}
  .saved{font-size:13.5px;color:var(--save);opacity:0;transition:opacity .25s}
  .saved.on{opacity:1}
@media (prefers-reduced-motion: reduce){
    html{scroll-behavior:auto}
    *,*::before,*::after{transition-duration:.01ms !important;animation-duration:.01ms !important}
  }

`;

const MARKUP = `

<section class="hero">
  <div class="container">
    <div class="inner">
      <span class="badge">Calculadora de rentabilidad</span>
      <h1 class="display-gradient">&iquest;Cu&aacute;nto ahorra su empresa mantenedora?</h1>
      <p>Introduzca las tarifas y el volumen de cartera de <b>su empresa</b> y compruebe el ahorro real de sustituir el mantenimiento convencional por telemantenimiento. Cada cifra lleva una <b>i</b> que explica c&oacute;mo se calcula.</p>
    </div>
  </div>
</section>

<section class="block" style="padding-top:0" id="resultado">
  <div class="container narrow">
    <div class="results">
      <div class="res">
        <div class="in">
          <span class="k">Coste actual / instalaci&oacute;n
            <button class="i" type="button" data-pop="p-actual" aria-expanded="false" aria-label="C&oacute;mo se calcula el coste actual por instalaci&oacute;n">i</button>
          </span>
          <span class="v" id="r-now">758 &euro;</span>
          <span class="sub">Al a&ntilde;o, con <span id="r-now-visits">4</span> visitas presenciales regladas m&aacute;s incidencias.</span>
        </div>
      </div>
      <div class="res hl">
        <div class="in">
          <span class="k">Con Cx + NUSKU
            <button class="i" type="button" data-pop="p-nusku" aria-expanded="false" aria-label="C&oacute;mo se calcula el coste con Cx + NUSKU">i</button>
          </span>
          <span class="v" id="r-next">277 &euro;</span>
          <span class="sub">Por instalaci&oacute;n y a&ntilde;o en r&eacute;gimen estable, suscripci&oacute;n incluida.</span>
        </div>
      </div>
      <div class="res">
        <div class="in">
          <span class="k">Reducci&oacute;n de coste
            <button class="i" type="button" data-pop="p-reduccion" aria-expanded="false" aria-label="C&oacute;mo se calcula la reducci&oacute;n">i</button>
          </span>
          <span class="v save" id="r-pct">63 %</span>
          <span class="sub"><span id="r-annual">24.030 &euro;</span> al a&ntilde;o para toda la cartera.</span>
        </div>
      </div>
      <div class="res">
        <div class="in">
          <span class="k">Recuperaci&oacute;n
            <button class="i" type="button" data-pop="p-payback" aria-expanded="false" aria-label="C&oacute;mo se calcula el payback">i</button>
          </span>
          <span class="v" id="r-payback">6,5 meses</span>
          <span class="sub"><span id="r-acc">110.200 &euro;</span> de ahorro acumulado a <span id="r-horizon">5</span> a&ntilde;os.</span>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="block" id="datos">
  <div class="container narrow">
    <div class="sec-head">
      <span class="eyebrow">Paso 1</span>
      <h2 class="display2 display-gradient">Sus cifras</h2>
      <p>Los valores de partida son los del informe de justificaci&oacute;n de ahorro. Sustit&uacute;yalos por los de su empresa: el c&aacute;lculo se actualiza al momento.</p>
    </div>

    <div class="panel">
      <div class="in">
        <div class="grid">
          <div class="field">
            <label for="f-inst">Instalaciones en cartera
              <button class="i" type="button" data-pop="p-inst" aria-expanded="false" aria-label="Informaci&oacute;n sobre instalaciones en cartera">i</button>
            </label>
            <div class="inp"><input type="number" id="f-inst" value="50" min="1" step="1" inputmode="numeric"><span class="unit">paneles</span></div>
            <span class="hint">Centrales de detecci&oacute;n bajo contrato.</span>
          </div>

          <div class="field">
            <label for="f-sup">T&eacute;cnico grado superior
              <button class="i" type="button" data-pop="p-sup" aria-expanded="false" aria-label="Informaci&oacute;n sobre el coste del t&eacute;cnico superior">i</button>
            </label>
            <div class="inp"><input type="number" id="f-sup" value="24" min="0" step="0.5" inputmode="decimal"><span class="unit">&euro;/h</span></div>
            <span class="hint">Coste empresa, no salario bruto.</span>
          </div>

          <div class="field">
            <label for="f-med">T&eacute;cnico grado medio
              <button class="i" type="button" data-pop="p-med" aria-expanded="false" aria-label="Informaci&oacute;n sobre el coste del t&eacute;cnico medio">i</button>
            </label>
            <div class="inp"><input type="number" id="f-med" value="18" min="0" step="0.5" inputmode="decimal"><span class="unit">&euro;/h</span></div>
            <span class="hint">Acompa&ntilde;a al superior en T2 y T4.</span>
          </div>

          <div class="field">
            <label for="f-sub">Suscripci&oacute;n Telemantenimiento
              <button class="i" type="button" data-pop="p-sub" aria-expanded="false" aria-label="Informaci&oacute;n sobre la suscripci&oacute;n">i</button>
            </label>
            <div class="inp"><input type="number" id="f-sub" value="5" min="0" step="0.5" inputmode="decimal"><span class="unit">&euro;/mes &middot; panel</span></div>
            <span class="hint">Nivel 1 de NUSKU, por instalaci&oacute;n.</span>
          </div>

          <div class="field">
            <label for="f-veh">Veh&iacute;culo &mdash; coste fijo
              <button class="i" type="button" data-pop="p-veh" aria-expanded="false" aria-label="Informaci&oacute;n sobre el coste fijo del veh&iacute;culo">i</button>
            </label>
            <div class="inp"><input type="number" id="f-veh" value="2" min="0" step="0.25" inputmode="decimal"><span class="unit">&euro;/h</span></div>
            <span class="hint">Solo horas de desplazamiento.</span>
          </div>

          <div class="field">
            <label for="f-fuel">Combustible por desplazamiento
              <button class="i" type="button" data-pop="p-fuel" aria-expanded="false" aria-label="Informaci&oacute;n sobre el combustible">i</button>
            </label>
            <div class="inp"><input type="number" id="f-fuel" value="9" min="0" step="0.5" inputmode="decimal"><span class="unit">&euro;/visita</span></div>
            <span class="hint">Ida y vuelta completas.</span>
          </div>

          <div class="field">
            <label for="f-panel">Instalaci&oacute;n del panel Cx
              <button class="i" type="button" data-pop="p-panel" aria-expanded="false" aria-label="Informaci&oacute;n sobre el coste del panel">i</button>
            </label>
            <div class="inp"><input type="number" id="f-panel" value="175" min="0" step="5" inputmode="decimal"><span class="unit">&euro;/panel</span></div>
            <span class="hint">Inversi&oacute;n &uacute;nica del primer a&ntilde;o.</span>
          </div>

          <div class="field">
            <label for="f-setup">Puesta en marcha
              <button class="i" type="button" data-pop="p-setup" aria-expanded="false" aria-label="Informaci&oacute;n sobre la puesta en marcha">i</button>
            </label>
            <div class="inp"><input type="number" id="f-setup" value="1" min="0" step="0.25" inputmode="decimal"><span class="unit">h/panel</span></div>
            <span class="hint">Se valora a tarifa de t&eacute;cnico superior.</span>
          </div>
        </div>

        <details class="adv" id="adv">
          <summary>
            <svg class="chev" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 3.5L10.5 8L6 12.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Opciones avanzadas &mdash; esquema de visitas
            <span class="note">Duraci&oacute;n, desplazamiento y dotaci&oacute;n de cada visita, tasa de incidencias y horizonte.</span>
          </summary>
          <div class="adv-body">

            <div class="adv-grp">
              <h3>Situaci&oacute;n actual &mdash; 4 visitas regladas
                <button class="i" type="button" data-pop="p-esq-now" aria-expanded="false" aria-label="Informaci&oacute;n sobre el esquema de visitas actual">i</button>
              </h3>
              <p class="gd">Ciclo trimestral del Anexo II del RIPCI: las comprobaciones semestrales se integran en T2 y las anuales en T4, que son las visitas largas porque exigen prueba funcional de cada detector y pulsador.</p>
              <div class="scroller">
                <table class="visits">
                  <thead>
                    <tr>
                      <th scope="col">Visita</th>
                      <th scope="col" class="num">Trabajo</th>
                      <th scope="col" class="num">Desplaz.</th>
                      <th scope="col" class="num">T. superior</th>
                      <th scope="col" class="num">T. medio</th>
                    </tr>
                  </thead>
                  <tbody id="tb-now"></tbody>
                </table>
              </div>
            </div>

            <div class="adv-grp">
              <h3>Con EHOX Cx + NUSKU
                <button class="i" type="button" data-pop="p-esq-next" aria-expanded="false" aria-label="Informaci&oacute;n sobre el esquema de visitas con NUSKU">i</button>
              </h3>
              <p class="gd">T1 y T3 pasan a verificaci&oacute;n remota: los par&aacute;metros del panel se comprueban desde NUSKU y quedan documentados. T2 y T4 se mantienen presenciales &mdash; hay que tocar dispositivos &mdash; pero se acortan y las cubre un solo t&eacute;cnico, porque el diagn&oacute;stico llega hecho.</p>
              <div class="scroller">
                <table class="visits">
                  <thead>
                    <tr>
                      <th scope="col">Visita</th>
                      <th scope="col" class="num">Trabajo</th>
                      <th scope="col" class="num">Desplaz.</th>
                      <th scope="col" class="num">T&eacute;cnicos</th>
                      <th scope="col" class="num">Presencial</th>
                    </tr>
                  </thead>
                  <tbody id="tb-next"></tbody>
                </table>
              </div>
            </div>

            <div class="adv-grp">
              <h3>Par&aacute;metros del modelo</h3>
              <div class="grid two">
                <div class="field">
                  <label for="f-inc">Visitas de incidencia
                    <button class="i" type="button" data-pop="p-inc" aria-expanded="false" aria-label="Informaci&oacute;n sobre la tasa de incidencias">i</button>
                  </label>
                  <div class="inp"><input type="number" id="f-inc" value="30" min="0" max="200" step="5" inputmode="decimal"><span class="unit">% de las visitas regladas</span></div>
                  <span class="hint">Se aplica por separado a cada escenario, sobre sus propias visitas presenciales.</span>
                </div>
                <div class="field">
                  <label for="f-years">Horizonte de an&aacute;lisis
                    <button class="i" type="button" data-pop="p-years" aria-expanded="false" aria-label="Informaci&oacute;n sobre el horizonte">i</button>
                  </label>
                  <div class="inp"><input type="number" id="f-years" value="5" min="1" max="15" step="1" inputmode="numeric"><span class="unit">a&ntilde;os</span></div>
                  <span class="hint">La inversi&oacute;n en panel y puesta en marcha solo pesa en el a&ntilde;o 1.</span>
                </div>
              </div>
            </div>

          </div>
        </details>

        <div class="actions">
          <button class="btn primary" type="button" id="btn-reset">Restaurar valores del informe</button>
          <button class="btn" type="button" id="btn-copy">Copiar resumen</button>
          <span class="saved" id="copied">Resumen copiado al portapapeles</span>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="block" id="desglose">
  <div class="container narrow">
    <div class="sec-head">
      <span class="eyebrow">Paso 2</span>
      <h2 class="display2 display-gradient">De d&oacute;nde sale cada euro</h2>
      <p>Desglose anual para el conjunto de la cartera. Las horas mostradas son el resultado de aplicar su esquema de visitas al n&uacute;mero de instalaciones.</p>
    </div>

    <div class="breakdown">
      <div class="bd now">
        <div class="in">
          <h3>Mantenimiento convencional</h3>
          <p class="cap"><span id="bd-now-visits">260</span> visitas al a&ntilde;o &middot; todas presenciales</p>
          <div class="lines" id="bd-now"></div>
          <div class="ln tot"><span class="n">Total anual</span><span class="a" id="bd-now-total">37.890 &euro;</span></div>
          <div class="perinst"><span>Por instalaci&oacute;n y a&ntilde;o</span><b id="bd-now-per">758 &euro;</b></div>
        </div>
      </div>

      <div class="bd next">
        <div class="in">
          <h3>EHOX Cx + NUSKU</h3>
          <p class="cap"><span id="bd-next-visits">130</span> visitas presenciales &middot; <span id="bd-next-remote">100</span> verificaciones remotas</p>
          <div class="lines" id="bd-next"></div>
          <div class="ln tot"><span class="n">Total a&ntilde;o 2 en adelante</span><span class="a" id="bd-next-total">13.860 &euro;</span></div>
          <div class="perinst"><span>Por instalaci&oacute;n y a&ntilde;o</span><b id="bd-next-per">277 &euro;</b></div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="block" id="horizonte">
  <div class="container narrow">
    <div class="sec-head">
      <span class="eyebrow">Paso 3</span>
      <h2 class="display2 display-gradient">El recorrido completo</h2>
      <p>El primer a&ntilde;o absorbe la inversi&oacute;n en paneles y puesta en marcha; a partir del segundo, el &uacute;nico coste a&ntilde;adido es la suscripci&oacute;n.</p>
    </div>

    <div class="chartwrap">
      <div class="in">
        <div class="chart-head">
          <h3>Coste anual y ahorro acumulado</h3>
          <div class="keys">
            <span><span class="sw" style="background:#6d7086"></span> Situaci&oacute;n actual</span>
            <span><span class="sw" style="background:#2d8dff"></span> Cx + NUSKU</span>
            <span><span class="sw" style="background:#3fd39b"></span> Ahorro acumulado</span>
          </div>
        </div>
        <svg id="chart" viewBox="0 0 900 340" role="img" aria-labelledby="chart-t"></svg>
        <h4 id="chart-t" style="position:absolute;left:-9999px">Gr&aacute;fico de coste anual comparado y ahorro acumulado</h4>
      </div>
    </div>

    <div class="panel" style="margin-top:20px">
      <div class="in">
        <div class="scroller">
          <table class="years">
            <thead>
              <tr>
                <th scope="col">A&ntilde;o</th>
                <th scope="col">Situaci&oacute;n actual</th>
                <th scope="col">Cx + NUSKU</th>
                <th scope="col">Ahorro anual</th>
                <th scope="col">Ahorro acumulado</th>
                <th scope="col">Inversi&oacute;n del a&ntilde;o</th>
                <th scope="col">Ahorro / inversi&oacute;n
                  <button class="i" type="button" data-pop="p-ratio" aria-expanded="false" aria-label="Informaci&oacute;n sobre el ratio ahorro inversi&oacute;n">i</button>
                </th>
              </tr>
            </thead>
            <tbody id="tb-years"></tbody>
            <tfoot id="tf-years"></tfoot>
          </table>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="block" id="normativa">
  <div class="container narrow">
    <div class="note">
      <div class="in">
        <h3>En qu&eacute; se apoya la reducci&oacute;n de visitas</h3>
        <p>El <b>Anexo II del RIPCI</b> (RD 513/2017, modificado por el RD 164/2025) acepta expresamente la conexi&oacute;n remota a un centro de gesti&oacute;n de servicios de mantenimiento, siempre que ese centro pertenezca a una <b>empresa mantenedora habilitada</b> y la implantaci&oacute;n garantice la integridad del sistema. La norma la describe como un sistema adicional cuyo fin es facilitar las tareas de mantenimiento y gesti&oacute;n.</p>
        <p>Para dotar de respaldo expreso a la supresi&oacute;n de las visitas de T1 y T3, el propio reglamento prev&eacute; el cauce: el <b>art&iacute;culo 5, apartados 5 y 6</b> habilita a un <b>Organismo de Control Autorizado</b> a certificar la equivalencia de seguridad de una soluci&oacute;n alternativa. Se recomienda tramitar esa certificaci&oacute;n con el OCA de referencia antes de trasladar el modelo a contrato.</p>
        <p>El n&uacute;mero de visitas de partida &mdash; 4 al a&ntilde;o &mdash; es el ciclo trimestral / semestral / anual que exige el Anexo II conforme a la <b>UNE 23007-14</b>, con las comprobaciones semestrales integradas en T2 y las anuales en T4.</p>
      </div>
    </div>

    <div class="sec-head" style="margin-top:clamp(36px,6vw,64px)">
      <span class="eyebrow">Lo que no entra en el c&aacute;lculo</span>
      <h2 class="display2 display-gradient">Valor que el modelo no monetiza</h2>
      <p>Estas palancas no se han convertido en euros por su naturaleza estimativa, pero inciden en la retenci&oacute;n de clientes y en la exposici&oacute;n al riesgo regulatorio.</p>
    </div>
    <div class="levers">
      <div class="lever"><h4>Actas autom&aacute;ticas y trazables</h4><p>Registros generados y conservados en NUSKU, con hist&oacute;rico accesible. Menos riesgo de documentaci&oacute;n incompleta ante una inspecci&oacute;n.</p></div>
      <div class="lever"><h4>Estado en tiempo real</h4><p>Titular y mantenedor conocen el estado del sistema entre visitas, sin esperar al trimestre siguiente para detectar una anomal&iacute;a.</p></div>
      <div class="lever"><h4>Menos riesgo sancionador</h4><p>Trazabilidad documental y detecci&oacute;n temprana reducen la probabilidad de que una deficiencia derive en expediente.</p></div>
      <div class="lever"><h4>Diferenciaci&oacute;n comercial</h4><p>Ofrecer telemantenimiento y app de seguimiento es argumento de venta frente a quien opera solo de forma presencial.</p></div>
      <div class="lever"><h4>Renovaci&oacute;n de contratos</h4><p>Un cliente con visibilidad continua percibe m&aacute;s valor, lo que favorece la renovaci&oacute;n frente a la rotaci&oacute;n por precio.</p></div>
      <div class="lever"><h4>Servicios adicionales</h4><p>La conectividad habilita alertas, informes ejecutivos y portal de cliente, empaquetables en planes de fidelizaci&oacute;n.</p></div>
    </div>
  </div>
</section>

<!-- ============ popovers de informacion ============ -->
<template id="pops">
  <div data-id="p-actual">
    <h4>Coste actual por instalaci&oacute;n</h4>
    <p>Suma del coste de personal, coste fijo de veh&iacute;culo y combustible de todas las visitas del a&ntilde;o, dividida entre las instalaciones de la cartera.</p>
    <span class="frm">(horas superior x tarifa sup) + (horas medio x tarifa med) + (horas desplazamiento x coste veh.) + (visitas x combustible)</span>
    <p>Las horas salen del esquema de visitas: cada t&eacute;cnico imputa tanto el trabajo en planta como el desplazamiento completo.</p>
    <span class="src">Informe de justificaci&oacute;n de ahorro, secciones 3.1 y 4.</span>
  </div>
  <div data-id="p-nusku">
    <h4>Coste con Cx + NUSKU</h4>
    <p>Mismo c&aacute;lculo operativo sobre el esquema reducido &mdash; solo T2 y T4 son presenciales y las cubre un t&eacute;cnico &mdash; m&aacute;s la suscripci&oacute;n anual de Telemantenimiento.</p>
    <span class="frm">coste operativo + (suscripci&oacute;n mensual x 12 x instalaciones)</span>
    <p>Es la cifra de <b>r&eacute;gimen estable</b>: a&ntilde;o 2 en adelante. El a&ntilde;o 1 suma adem&aacute;s la inversi&oacute;n en paneles y puesta en marcha.</p>
    <span class="src">Informe de justificaci&oacute;n de ahorro, secciones 3.2 y 5.1.</span>
  </div>
  <div data-id="p-reduccion">
    <h4>Reducci&oacute;n de coste</h4>
    <p>Diferencia porcentual entre el coste por instalaci&oacute;n de ambos escenarios, en r&eacute;gimen estable.</p>
    <span class="frm">(coste actual - coste NUSKU) / coste actual x 100</span>
    <p>La cifra en euros de al lado es el ahorro anual para el total de la cartera, tambi&eacute;n en r&eacute;gimen estable.</p>
  </div>
  <div data-id="p-payback">
    <h4>Recuperaci&oacute;n de la inversi&oacute;n</h4>
    <p>Meses que tarda el ahorro operativo en devolver la inversi&oacute;n del primer a&ntilde;o (paneles y puesta en marcha, m&aacute;s la suscripci&oacute;n de ese a&ntilde;o).</p>
    <span class="frm">inversi&oacute;n a&ntilde;o 1 / (ahorro anual en r&eacute;gimen estable / 12)</span>
    <p>Si el ahorro anual fuese cero o negativo, no hay recuperaci&oacute;n posible y el dato se muestra como no aplicable.</p>
  </div>
  <div data-id="p-inst">
    <h4>Instalaciones en cartera</h4>
    <p>N&uacute;mero de centrales de detecci&oacute;n bajo contrato de mantenimiento. El modelo escala de forma lineal: cambiar esta cifra mueve todos los totales, pero <b>no</b> los importes por instalaci&oacute;n.</p>
    <p>El informe usa 50 como cartera de referencia.</p>
  </div>
  <div data-id="p-sup">
    <h4>T&eacute;cnico de grado superior</h4>
    <p>Coste-empresa por hora: incluye salario bruto y cotizaci&oacute;n a la Seguridad Social, no el salario neto ni el bruto a secas.</p>
    <p>Es quien realiza las comprobaciones de la central y firma el acta. En el escenario NUSKU es tambi&eacute;n el t&eacute;cnico cualificado &uacute;nico de T2 y T4.</p>
    <span class="src">Estimaci&oacute;n de mercado laboral del sector PCI en Espa&ntilde;a, 2026.</span>
  </div>
  <div data-id="p-med">
    <h4>T&eacute;cnico de grado medio</h4>
    <p>Coste-empresa por hora del t&eacute;cnico de apoyo que acompa&ntilde;a al superior en las visitas de dispositivos (T2 y T4) y en las de incidencia del escenario convencional.</p>
    <p>En el escenario con NUSKU deja de ser necesario: la app identifica y orienta la reparaci&oacute;n sin reconocimiento f&iacute;sico previo.</p>
    <span class="src">Estimaci&oacute;n de mercado laboral del sector PCI en Espa&ntilde;a, 2026.</span>
  </div>
  <div data-id="p-sub">
    <h4>Suscripci&oacute;n de Telemantenimiento</h4>
    <p>Nivel 1 de NUSKU, contratado <b>por instalaci&oacute;n</b>. Habilita el diagn&oacute;stico remoto y el mantenimiento programado con informe, que es lo que permite sustituir T1 y T3.</p>
    <span class="frm">precio mensual x 12 x instalaciones</span>
    <p>Se paga todos los a&ntilde;os, incluido el primero.</p>
  </div>
  <div data-id="p-veh">
    <h4>Coste fijo de veh&iacute;culo</h4>
    <p>Imputaci&oacute;n horaria del renting, seguro e impuestos de la furgoneta comercial. Se aplica <b>solo a las horas de desplazamiento</b>, no a las horas de trabajo en planta.</p>
    <span class="frm">horas de desplazamiento por visita x visitas x coste por hora</span>
    <p>Se cuenta <b>un veh&iacute;culo por visita</b>, aunque acudan dos t&eacute;cnicos: viajan juntos.</p>
    <span class="src">Mercado de renting de furgonetas comerciales en Espa&ntilde;a, 2026.</span>
  </div>
  <div data-id="p-fuel">
    <h4>Combustible por desplazamiento</h4>
    <p>Coste de carburante de un desplazamiento completo de ida y vuelta a la instalaci&oacute;n. Se imputa una vez por visita, con independencia del n&uacute;mero de t&eacute;cnicos que viajen.</p>
    <span class="src">Precio medio del gas&oacute;leo en Espa&ntilde;a, agosto de 2026.</span>
  </div>
  <div data-id="p-panel">
    <h4>Instalaci&oacute;n del panel Cx</h4>
    <p>Coste unitario de dotar de conectividad total a cada instalaci&oacute;n. Es una inversi&oacute;n de un solo pago que recae &iacute;ntegra en el a&ntilde;o 1.</p>
    <p>Si su acuerdo de distribuci&oacute;n contempla otro precio, o el panel se repercute al cliente final, ajuste aqu&iacute; el importe &mdash; a cero si no lo asume la mantenedora.</p>
  </div>
  <div data-id="p-setup">
    <h4>Puesta en marcha</h4>
    <p>Horas de t&eacute;cnico superior necesarias para dar de alta cada panel en la plataforma y verificar la comunicaci&oacute;n. Se valora a la tarifa de t&eacute;cnico superior.</p>
    <span class="frm">horas por panel x instalaciones x tarifa t&eacute;cnico superior</span>
    <p>Concurre solo en el a&ntilde;o 1.</p>
  </div>
  <div data-id="p-esq-now">
    <h4>Esquema de visitas actual</h4>
    <p>Cada fila define una visita: <b>trabajo</b> son las horas en la instalaci&oacute;n y <b>desplazamiento</b> el viaje completo de ida y vuelta. Ambas se imputan a cada t&eacute;cnico que acude.</p>
    <span class="frm">horas por t&eacute;cnico = trabajo + desplazamiento</span>
    <p>Las columnas de t&eacute;cnicos fijan cu&aacute;ntos de cada categor&iacute;a acuden. Poner cero en las dos anula esa visita.</p>
    <span class="src">Informe de justificaci&oacute;n de ahorro, secci&oacute;n 3.1.</span>
  </div>
  <div data-id="p-esq-next">
    <h4>Esquema de visitas con NUSKU</h4>
    <p>T1 y T3 quedan marcadas como <b>remotas</b>: no generan desplazamiento, ni combustible, ni horas de t&eacute;cnico, porque los par&aacute;metros del panel se verifican desde la plataforma y quedan documentados.</p>
    <p>Puede devolverlas a presencial &mdash; para un escenario conservador en el que solo se acorten las visitas &mdash; poniendo t&eacute;cnicos y horas en su fila.</p>
    <span class="src">Informe de justificaci&oacute;n de ahorro, secci&oacute;n 3.2.</span>
  </div>
  <div data-id="p-inc">
    <h4>Visitas de incidencia</h4>
    <p>Averías y avisos fuera del calendario reglado, expresados como porcentaje de las visitas presenciales programadas de cada escenario.</p>
    <span class="frm">visitas de incidencia = visitas presenciales regladas x porcentaje</span>
    <p>El informe mantiene el 30 % en ambos escenarios <b>por prudencia</b>: al reducirse las visitas presenciales, tambi&eacute;n baja el n&uacute;mero absoluto de incidencias. En la pr&aacute;ctica la telemetr&iacute;a continua deber&iacute;a rebajar tambi&eacute;n la tasa, al anticipar la aver&iacute;a antes de la visita.</p>
  </div>
  <div data-id="p-years">
    <h4>Horizonte de an&aacute;lisis</h4>
    <p>A&ntilde;os que abarca la comparativa. El a&ntilde;o 1 carga la inversi&oacute;n completa; el resto solo el coste operativo y la suscripci&oacute;n.</p>
    <p>El modelo no aplica inflaci&oacute;n ni actualizaci&oacute;n de tarifas: todos los a&ntilde;os se calculan a precios de hoy.</p>
  </div>
  <div data-id="p-ratio">
    <h4>Ratio ahorro / inversi&oacute;n</h4>
    <p>Cu&aacute;ntos euros de ahorro neto genera cada euro invertido ese a&ntilde;o en la soluci&oacute;n: paneles, puesta en marcha y suscripci&oacute;n.</p>
    <span class="frm">ahorro del a&ntilde;o / inversi&oacute;n del a&ntilde;o x 100</span>
    <p>En el a&ntilde;o 1 la inversi&oacute;n incluye el equipamiento; del a&ntilde;o 2 en adelante solo la suscripci&oacute;n, de ah&iacute; el salto.</p>
  </div>
</template>

`;

export function CalculadoraAhorro() {
  useEffect(() => {
    const ac = new AbortController();
    initCalculadora(ac.signal);
    return () => {
      ac.abort();
      document.querySelectorAll(".pop").forEach((el) => el.remove());
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div
        className="calc-ahorro"
        dangerouslySetInnerHTML={{ __html: MARKUP }}
      />
    </>
  );
}
