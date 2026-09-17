/**
 * Lógica vanilla de la calculadora (artifact original).
 * No reescribir: cifras verificadas contra el informe EHOX+NUSKU.
 * @param {AbortSignal} signal
 */
export function initCalculadora(signal) {
/* ---------- modelo ---------- */
  // Valores por defecto: los del informe de justificacion de ahorro.
  // work/travel en horas por tecnico; sup/med = numero de tecnicos de cada categoria.
  var DEF = {
    inst:50, sup:24, med:18, sub:5, veh:2, fuel:9, panel:175, setup:1, inc:30, years:5,
    now:[
      {id:"t1", name:"T1", desc:"Parámetros del panel",      work:1,    travel:1.5, sup:1, med:0, sched:true},
      {id:"t2", name:"T2", desc:"Dispositivos conectados",        work:3,    travel:1.5, sup:1, med:1, sched:true},
      {id:"t3", name:"T3", desc:"Parámetros del panel",      work:1,    travel:1.5, sup:1, med:0, sched:true},
      {id:"t4", name:"T4", desc:"Anual: panel y dispositivos",    work:3.5,  travel:1.5, sup:1, med:1, sched:true},
      {id:"in", name:"Incidencia", desc:"Según tasa configurada", work:2, travel:1.5, sup:1, med:1, sched:false}
    ],
    next:[
      {id:"t1", name:"T1", desc:"Verificación remota",       work:0,    travel:0,   sup:0, med:0, sched:true},
      {id:"t2", name:"T2", desc:"Dispositivos conectados",        work:1.5,  travel:1.5, sup:1, med:0, sched:true},
      {id:"t3", name:"T3", desc:"Verificación remota",       work:0,    travel:0,   sup:0, med:0, sched:true},
      {id:"t4", name:"T4", desc:"Anual: panel y dispositivos",    work:1.75, travel:1.5, sup:1, med:0, sched:true},
      {id:"in", name:"Incidencia", desc:"Según tasa configurada", work:1, travel:1.5, sup:1, med:0, sched:false}
    ]
  };

  var S = JSON.parse(JSON.stringify(DEF));

  var eur = new Intl.NumberFormat("es-ES",{style:"currency",currency:"EUR",maximumFractionDigits:0});
  var eur2 = new Intl.NumberFormat("es-ES",{style:"currency",currency:"EUR",minimumFractionDigits:2,maximumFractionDigits:2});
  var num = new Intl.NumberFormat("es-ES",{maximumFractionDigits:1});
  var num0 = new Intl.NumberFormat("es-ES",{maximumFractionDigits:0});

  function money(v){ return Math.abs(v) < 1000 ? eur2.format(v) : eur.format(v); }

  // Calcula un escenario: devuelve horas, visitas y partidas de coste.
  function scenario(rows){
    var reg = 0;                       // visitas regladas presenciales por instalacion
    rows.forEach(function(r){
      if(r.sched && (r.sup + r.med) > 0) reg += 1;
    });
    var incRow = rows.filter(function(r){ return !r.sched; })[0];
    var incCount = reg * (S.inc / 100); // visitas de incidencia por instalacion

    var hSup = 0, hMed = 0, hTravel = 0, visits = 0, remote = 0;

    rows.forEach(function(r){
      var tech = r.sup + r.med;
      if(r.sched){
        if(tech === 0){ remote += 1; return; }
        var per = r.work + r.travel;
        hSup += r.sup * per;
        hMed += r.med * per;
        hTravel += r.travel;          // un vehículo por visita, no por técnico
        visits += 1;
      }
    });

    if(incRow){
      var itech = incRow.sup + incRow.med;
      if(itech > 0){
        var iper = incRow.work + incRow.travel;
        hSup += incRow.sup * iper * incCount;
        hMed += incRow.med * iper * incCount;
        hTravel += incRow.travel * incCount;
        visits += incCount;
      }
    }

    var n = S.inst;
    var o = {
      regular:reg*n, incidence:incCount*n, visits:visits*n, remote:remote*n,
      hSup:hSup*n, hMed:hMed*n, hTravel:hTravel*n
    };
    o.cSup  = o.hSup * S.sup;
    o.cMed  = o.hMed * S.med;
    o.cVeh  = o.hTravel * S.veh;
    o.cFuel = o.visits * S.fuel;
    o.operating = o.cSup + o.cMed + o.cVeh + o.cFuel;
    return o;
  }

  function compute(){
    var now  = scenario(S.now);
    var next = scenario(S.next);

    var subs  = S.sub * 12 * S.inst;
    var capex = (S.panel * S.inst) + (S.setup * S.inst * S.sup);

    var nowTotal   = now.operating;
    var nextStable = next.operating + subs;
    var nextYear1  = next.operating + subs + capex;

    var saveStable = nowTotal - nextStable;
    var saveYear1  = nowTotal - nextYear1;
    var invYear1   = capex + subs;

    var years = [], acc = 0;
    for(var y = 1; y <= S.years; y++){
      var cost = (y === 1) ? nextYear1 : nextStable;
      var save = nowTotal - cost;
      var inv  = (y === 1) ? invYear1 : subs;
      acc += save;
      years.push({ y:y, now:nowTotal, next:cost, save:save, acc:acc, inv:inv,
                   ratio: inv > 0 ? (save / inv) * 100 : null });
    }

    return {
      now:now, next:next, subs:subs, capex:capex,
      nowTotal:nowTotal, nextStable:nextStable, nextYear1:nextYear1,
      nowPer: S.inst ? nowTotal / S.inst : 0,
      nextPer: S.inst ? nextStable / S.inst : 0,
      saveStable:saveStable, saveYear1:saveYear1, invYear1:invYear1,
      pct: nowTotal > 0 ? (saveStable / nowTotal) * 100 : 0,
      payback: saveStable > 0 ? invYear1 / (saveStable / 12) : null,
      years:years, accTotal:acc
    };
  }

  /* ---------- helpers de DOM ---------- */
  function $(id){ return document.getElementById(id); }
  function txt(id, v){ var e = $(id); if(e) e.textContent = v; }
  function esc(s){ return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }

  function hours(h){ return num.format(h) + " h"; }

  /* ---------- tablas de visitas (opciones avanzadas) ---------- */
  function visitRow(row, side){
    var remote = row.sched && (row.sup + row.med) === 0;
    var cells = "";
    var dim = remote ? " off" : "";

    cells += '<td class="vn">' + esc(row.name) + '<i>' + esc(row.desc) + '</i></td>';
    cells += '<td class="num' + dim + '"><span class="mini"><input type="number" min="0" step="0.25" inputmode="decimal" ' +
             'data-side="' + side + '" data-row="' + row.id + '" data-k="work" value="' + row.work + '" ' +
             'aria-label="Horas de trabajo en ' + esc(row.name) + '"><span class="u">h</span></span></td>';
    cells += '<td class="num' + dim + '"><span class="mini"><input type="number" min="0" step="0.25" inputmode="decimal" ' +
             'data-side="' + side + '" data-row="' + row.id + '" data-k="travel" value="' + row.travel + '" ' +
             'aria-label="Horas de desplazamiento en ' + esc(row.name) + '"><span class="u">h</span></span></td>';
    cells += '<td class="num"><span class="mini"><input type="number" min="0" max="9" step="1" inputmode="numeric" ' +
             'data-side="' + side + '" data-row="' + row.id + '" data-k="sup" value="' + row.sup + '" ' +
             'aria-label="Técnicos superiores en ' + esc(row.name) + '"><span class="u">sup</span></span></td>';

    if(side === "now"){
      cells += '<td class="num"><span class="mini"><input type="number" min="0" max="9" step="1" inputmode="numeric" ' +
               'data-side="now" data-row="' + row.id + '" data-k="med" value="' + row.med + '" ' +
               'aria-label="Técnicos medios en ' + esc(row.name) + '"><span class="u">med</span></span></td>';
    } else {
      cells += '<td class="num">' + (remote ? '<span class="remote">Remota</span>' :
               '<span style="font-size:13px;color:var(--g3)">Sí</span>') + '</td>';
    }
    return '<tr class="item">' + cells + '</tr>';
  }

  function renderVisits(){
    $("tb-now").innerHTML  = S.now.map(function(r){ return visitRow(r,"now"); }).join("");
    $("tb-next").innerHTML = S.next.map(function(r){ return visitRow(r,"next"); }).join("");
  }

  /* ---------- desglose ---------- */
  function line(name, detail, amount){
    return '<div class="ln"><span class="n">' + name +
           (detail ? ' <em>' + detail + '</em>' : '') +
           '</span><span class="a">' + money(amount) + '</span></div>';
  }

  function renderBreakdown(R){
    var n = R.now, x = R.next;

    txt("bd-now-visits", num.format(n.visits));
    $("bd-now").innerHTML =
      line("Personal &mdash; t&eacute;cnico superior", hours(n.hSup) + " x " + money(S.sup), n.cSup) +
      line("Personal &mdash; t&eacute;cnico medio",    hours(n.hMed) + " x " + money(S.med), n.cMed) +
      line("Veh&iacute;culo &mdash; coste fijo",       hours(n.hTravel) + " en ruta x " + money(S.veh), n.cVeh) +
      line("Veh&iacute;culo &mdash; combustible",      num.format(n.visits) + " despl. x " + money(S.fuel), n.cFuel);
    txt("bd-now-total", money(R.nowTotal));
    txt("bd-now-per", money(R.nowPer));
    txt("r-now-visits", num.format(S.now.filter(function(r){ return r.sched && (r.sup+r.med)>0; }).length));

    txt("bd-next-visits", num.format(x.visits));
    txt("bd-next-remote", num.format(x.remote));
    var html =
      line("Personal &mdash; t&eacute;cnico cualificado", hours(x.hSup) + " x " + money(S.sup), x.cSup);
    if(x.hMed > 0){
      html += line("Personal &mdash; t&eacute;cnico medio", hours(x.hMed) + " x " + money(S.med), x.cMed);
    }
    html +=
      line("Veh&iacute;culo &mdash; coste fijo",  hours(x.hTravel) + " en ruta x " + money(S.veh), x.cVeh) +
      line("Veh&iacute;culo &mdash; combustible", num.format(x.visits) + " despl. x " + money(S.fuel), x.cFuel) +
      '<div class="ln sub"><span class="n">Subtotal operativo</span><span class="a">' + money(x.operating) + '</span></div>' +
      line("Suscripci&oacute;n NUSKU Telemantenimiento", money(S.sub) + "/mes x " + num0.format(S.inst) + " x 12", R.subs);
    $("bd-next").innerHTML = html;
    txt("bd-next-total", money(R.nextStable));
    txt("bd-next-per", money(R.nextPer));
  }

  /* ---------- tabla de anyos ---------- */
  function renderYears(R){
    $("tb-years").innerHTML = R.years.map(function(r){
      return '<tr>' +
        '<td>A&ntilde;o ' + r.y + '</td>' +
        '<td>' + money(r.now) + '</td>' +
        '<td>' + money(r.next) + '</td>' +
        '<td class="save">' + money(r.save) + '</td>' +
        '<td class="acc">' + money(r.acc) + '</td>' +
        '<td>' + money(r.inv) + '</td>' +
        '<td>' + (r.ratio === null ? "&mdash;" : num0.format(r.ratio) + " %") + '</td>' +
      '</tr>';
    }).join("");

    var totInv = R.years.reduce(function(a,b){ return a + b.inv; }, 0);
    $("tf-years").innerHTML =
      '<tr><td>Total ' + S.years + ' a&ntilde;os</td>' +
      '<td>' + money(R.nowTotal * S.years) + '</td>' +
      '<td>' + money(R.years.reduce(function(a,b){ return a + b.next; }, 0)) + '</td>' +
      '<td class="save">' + money(R.accTotal) + '</td>' +
      '<td class="save">' + money(R.accTotal) + '</td>' +
      '<td>' + money(totInv) + '</td>' +
      '<td>' + (totInv > 0 ? num0.format(R.accTotal / totInv * 100) + " %" : "&mdash;") + '</td></tr>';
  }

  /* ---------- grafico ---------- */
  function renderChart(R){
    var W = 900, H = 340, L = 74, Rr = 60, T = 22, B = 46;
    var iw = W - L - Rr, ih = H - T - B;
    var ys = R.years, n = ys.length;

    var maxCost = Math.max.apply(null, ys.map(function(r){ return Math.max(r.now, r.next); }).concat([1]));
    var maxAcc  = Math.max.apply(null, ys.map(function(r){ return Math.abs(r.acc); }).concat([1]));

    function nice(v){
      var p = Math.pow(10, Math.floor(Math.log(v) / Math.LN10));
      return Math.ceil(v / p * 1.02) * p;
    }
    var topCost = nice(maxCost), topAcc = nice(maxAcc);

    var band = iw / n;
    var bw = Math.min(46, band * 0.3);
    var gap = 7;

    function yC(v){ return T + ih - (v / topCost) * ih; }
    function yA(v){ return T + ih - (Math.max(v,0) / topAcc) * ih; }

    var s = "";

    // rejilla y eje de coste
    for(var g = 0; g <= 4; g++){
      var val = topCost * g / 4, y = yC(val);
      s += '<line x1="' + L + '" y1="' + y.toFixed(1) + '" x2="' + (L + iw) + '" y2="' + y.toFixed(1) +
           '" stroke="#ffffff" stroke-opacity="' + (g === 0 ? ".16" : ".07") + '" stroke-width="1"/>';
      s += '<text x="' + (L - 11) + '" y="' + (y + 4).toFixed(1) + '" text-anchor="end" fill="#6d7086" ' +
           'font-size="12" font-family="Rethink Sans, sans-serif">' + num0.format(Math.round(val)) + '</text>';
    }
    s += '<text x="' + (L - 11) + '" y="' + (T - 7) + '" text-anchor="end" fill="#6d7086" font-size="11" ' +
         'font-weight="700" letter-spacing="1" font-family="Rethink Sans, sans-serif">EUR/AÑO</text>';

    // barras
    ys.forEach(function(r, i){
      var cx = L + band * i + band / 2;
      var x1 = cx - bw - gap / 2, x2 = cx + gap / 2;
      var h1 = Math.max(0, T + ih - yC(r.now)), h2 = Math.max(0, T + ih - yC(r.next));
      s += '<rect x="' + x1.toFixed(1) + '" y="' + yC(r.now).toFixed(1) + '" width="' + bw.toFixed(1) +
           '" height="' + h1.toFixed(1) + '" rx="4" fill="#6d7086" fill-opacity=".75"/>';
      s += '<rect x="' + x2.toFixed(1) + '" y="' + yC(r.next).toFixed(1) + '" width="' + bw.toFixed(1) +
           '" height="' + h2.toFixed(1) + '" rx="4" fill="#2d8dff"/>';
      s += '<text x="' + cx.toFixed(1) + '" y="' + (T + ih + 24) + '" text-anchor="middle" fill="#bac8d2" ' +
           'font-size="13" font-weight="600" font-family="Rethink Sans, sans-serif">Año ' + r.y + '</text>';
    });

    // linea de ahorro acumulado
    var pts = ys.map(function(r, i){
      return [L + band * i + band / 2, yA(r.acc)];
    });
    var d = pts.map(function(p, i){
      return (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1);
    }).join(" ");
    s += '<path d="' + d + '" fill="none" stroke="#3fd39b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>';
    pts.forEach(function(p, i){
      var last = i === pts.length - 1;
      s += '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="' + (last ? 5.5 : 4) +
           '" fill="' + (last ? "#3fd39b" : "#0c0c13") + '" stroke="#3fd39b" stroke-width="2.5"/>';
    });

    // etiqueta del acumulado final, dentro de los limites
    var lastP = pts[pts.length - 1], lastV = ys[ys.length - 1].acc;
    var ly = Math.max(T + 14, Math.min(lastP[1] - 15, T + ih - 6));
    s += '<text x="' + (L + iw + 6) + '" y="' + ly.toFixed(1) + '" text-anchor="end" fill="#3fd39b" ' +
         'font-size="13" font-weight="700" font-family="Rethink Sans, sans-serif">' + esc(money(lastV)) + '</text>';
    s += '<text x="' + (L + iw + 6) + '" y="' + (ly + 16).toFixed(1) + '" text-anchor="end" fill="#6d7086" ' +
         'font-size="11" font-family="Rethink Sans, sans-serif">acumulado</text>';

    $("chart").setAttribute("viewBox", "0 0 " + W + " " + H);
    $("chart").innerHTML = s;
  }

  /* ---------- render principal ---------- */
  function render(){
    var R = compute();

    txt("r-now", money(R.nowPer));
    txt("r-next", money(R.nextPer));
    txt("r-pct", (R.pct >= 0 ? "" : "−") + num0.format(Math.abs(R.pct)) + " %");
    txt("r-annual", money(R.saveStable));
    txt("r-payback", R.payback === null ? "No aplica" :
        (R.payback < 24 ? num.format(R.payback) + " meses" : num.format(R.payback / 12) + " años"));
    txt("r-acc", money(R.accTotal));
    txt("r-horizon", String(S.years));

    var pctEl = $("r-pct");
    if(pctEl) pctEl.className = "v" + (R.pct > 0 ? " save" : "");

    renderBreakdown(R);
    renderYears(R);
    renderChart(R);
    return R;
  }

  /* ---------- entradas ---------- */
  var simple = ["inst","sup","med","sub","veh","fuel","panel","setup","inc","years"];

  function readSimple(){
    simple.forEach(function(k){
      var el = $("f-" + k);
      if(!el) return;
      var v = parseFloat(el.value);
      if(isNaN(v) || v < 0) return;      // valor a medio escribir: conserva el anterior
      if(k === "inst")  v = Math.max(1, Math.round(v));
      if(k === "years") v = Math.min(15, Math.max(1, Math.round(v)));
      S[k] = v;
    });
  }

  document.addEventListener("input", function(e){
    var el = e.target;
    if(!(el instanceof HTMLInputElement)) return;

    if(el.id && el.id.indexOf("f-") === 0){
      readSimple();
      render();
      return;
    }
    var side = el.getAttribute("data-side");
    if(side){
      var rowId = el.getAttribute("data-row"), k = el.getAttribute("data-k");
      var v = parseFloat(el.value);
      if(isNaN(v) || v < 0) return;
      if(k === "sup" || k === "med") v = Math.min(9, Math.round(v));
      S[side].forEach(function(r){ if(r.id === rowId) r[k] = v; });
      // una fila que pasa de remota a presencial (o al reves) cambia su presentacion
      renderVisits();
      var again = document.querySelector('[data-side="' + side + '"][data-row="' + rowId + '"][data-k="' + k + '"]');
      if(again){ again.focus(); again.setSelectionRange(again.value.length, again.value.length); }
      render();
    }
  }, {signal: signal});

  $("btn-reset").addEventListener("click", function(){
    S = JSON.parse(JSON.stringify(DEF));
    simple.forEach(function(k){ var el = $("f-" + k); if(el) el.value = String(DEF[k]); });
    renderVisits();
    render();
  }, {signal: signal});

  $("btn-copy").addEventListener("click", function(){
    var R = compute();
    var L = [];
    L.push("Ahorro con EHOX Cx + NUSKU — " + num0.format(S.inst) + " instalaciones");
    L.push("");
    L.push("Mantenimiento convencional: " + money(R.nowTotal) + "/año (" + money(R.nowPer) + " por instalación)");
    L.push("Cx + NUSKU, régimen estable: " + money(R.nextStable) + "/año (" + money(R.nextPer) + " por instalación)");
    L.push("Reducción: " + num0.format(R.pct) + " % — " + money(R.saveStable) + " al año");
    L.push("Inversión año 1: " + money(R.invYear1) +
           " — recuperación en " + (R.payback === null ? "no aplica" : num.format(R.payback) + " meses"));
    L.push("Ahorro acumulado a " + S.years + " años: " + money(R.accTotal));
    L.push("");
    L.push("Tarifas: técnico superior " + money(S.sup) + "/h, técnico medio " + money(S.med) +
           "/h, vehículo " + money(S.veh) + "/h, combustible " + money(S.fuel) + "/desplazamiento.");
    L.push("Suscripción Telemantenimiento " + money(S.sub) + "/mes por panel. Incidencias " + num.format(S.inc) + " %.");
    var text = L.join("\n");

    function done(){
      var c = $("copied"); c.classList.add("on");
      setTimeout(function(){ c.classList.remove("on"); }, 2200);
    }
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(text).then(done, function(){ fallback(); });
    } else { fallback(); }

    function fallback(){
      var ta = document.createElement("textarea");
      ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); done(); } catch(err){}
      document.body.removeChild(ta);
    }
  }, {signal: signal});

  /* ---------- popovers "i" ---------- */
  var pops = {}, openPop = null, openBtn = null;
  (function(){
    var t = $("pops");
    Array.prototype.forEach.call(t.content.querySelectorAll("[data-id]"), function(d){
      pops[d.getAttribute("data-id")] = d.innerHTML;
    });
  })();

  function closePop(){
    if(openPop){ openPop.remove(); openPop = null; }
    if(openBtn){ openBtn.setAttribute("aria-expanded","false"); openBtn = null; }
  }

  function showPop(btn){
    var id = btn.getAttribute("data-pop");
    if(!pops[id]) return;
    var wasOpen = openBtn === btn;
    closePop();
    if(wasOpen) return;

    var el = document.createElement("div");
    el.className = "pop";
    el.setAttribute("role","dialog");
    el.innerHTML = pops[id];
    document.body.appendChild(el);

    var r = btn.getBoundingClientRect();
    var w = el.offsetWidth, h = el.offsetHeight;
    var left = r.left + r.width / 2 - w / 2 + window.scrollX;
    left = Math.max(16 + window.scrollX, Math.min(left, window.scrollX + document.documentElement.clientWidth - w - 16));
    var top = r.bottom + 10 + window.scrollY;
    if(r.bottom + 10 + h > window.innerHeight && r.top - 10 - h > 0){
      top = r.top - 10 - h + window.scrollY;
    }
    el.style.left = left + "px";
    el.style.top  = top + "px";

    openPop = el; openBtn = btn;
    btn.setAttribute("aria-expanded","true");
  }

  document.addEventListener("click", function(e){
    var btn = e.target.closest ? e.target.closest(".i") : null;
    if(btn){ e.preventDefault(); showPop(btn); return; }
    if(openPop && !e.target.closest(".pop")) closePop();
  }, {signal: signal});
  document.addEventListener("keydown", function(e){ if(e.key === "Escape") closePop(); }, {signal: signal});
  window.addEventListener("resize", closePop, {signal: signal});
  window.addEventListener("scroll", closePop, { passive:true, signal: signal });

  /* ---------- arranque ---------- */
  renderVisits();
  render();
}
