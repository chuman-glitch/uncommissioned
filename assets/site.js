/* uncommissioned — shared page helpers. Needs data.js loaded first. */

const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
/* "tbc:" prefix → draft-marked text */
const t = s => { s = String(s ?? ""); return s.startsWith("tbc:") ? `<span class="tbc" title="To confirm">${esc(s.slice(4))}</span>` : esc(s); };
const col = name => PALETTE[name] || PALETTE.stone;
const cvars = name => `--c:${col(name).bg};--k:${col(name).ink}`;
const hasPage = w => !!(w.feat && w.title && w.imgs && w.imgs.length);
/* featured works carry their own colour; every other work takes its edition's colour */
const wcol = w => hasPage(w) ? w.color : EDITIONS[w.ed].color;
const imgSrc = w => w.imgs && w.imgs.length ? "img/" + w.imgs[0] : (w.thumb || "");
const cat = w => w.id.replace("-", ".");
const workURL = w => `work.html?w=${w.id}`;
const qs = k => new URLSearchParams(location.search).get(k);
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* the project's own colour (home page, footnotes). A draft-only picker in
   the corner tries the options; the choice is remembered in this browser. */
const SIGNALS = {mint:"#9fe0c8", lilac:"#c8bfff", aluminium:"#c9ccc8", paper:"#e9dfb4"};
let signalName = "mint";
try { const v = localStorage.getItem("uc-signal"); if (SIGNALS[v]) signalName = v; } catch (e) {}
function applySignal(name){
  signalName = name; PALETTE.signal = {bg:SIGNALS[name], ink:"#111"};
  document.documentElement.style.setProperty("--note", SIGNALS[name]);
  if (document.documentElement.dataset.accent === "signal") setAccent("signal");
}
applySignal(signalName);

function setAccent(name){
  document.documentElement.dataset.accent = name;
  const c = col(name);
  document.documentElement.style.setProperty("--accent", c.bg);
  document.documentElement.style.setProperty("--accent-ink", c.ink);
}

function header(current){
  const items = [["edition.html?e=01","Edition 01"],["edition.html?e=02","Edition 02"],["about.html","About"],["texts.html","Texts"],["support.html","Support"]];
  const h = document.createElement("header");
  h.className = "hd";
  h.innerHTML = `<a href="index.html">uncommissioned</a>` +
    items.map(([u,l]) => `<a href="${u}"${current===l?' aria-current="page"':""}>${l}</a>`).join("") +
    `<span class="yr">2025 —</span><button class="menu" type="button">Menu</button>`;
  document.body.prepend(h);
  h.querySelector(".menu").addEventListener("click", () => h.classList.toggle("open"));
}

function footer(){
  /* a colophon in the project colour, then a running line of every site */
  const F = figures();
  const sites = [...new Map(WORKS.filter(w => w.lat != null).map(w => [w.ed === "02" ? w.site.split(",")[0].split(";")[0] : w.city.split(",")[0], w])).entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([n, w]) => `<span><b>${esc(n)}</b> ${Math.abs(w.lat).toFixed(2)}°${w.lat >= 0 ? "N" : "S"} ${Math.abs(w.lon).toFixed(2)}°${w.lon >= 0 ? "E" : "W"}</span>`).join("");
  const f = document.createElement("footer");
  f.className = "ft";
  f.innerHTML = `<div class="ft-band">
    <div class="grid ft-top">
      <p class="ft-say">It’s not vandalism<br>if it’s beautiful.</p>
      <nav class="ft-nav"><a href="edition.html?e=01">Edition 01</a><a href="edition.html?e=02">Edition 02</a><a href="about.html">About</a><a href="texts.html">Texts</a><a href="support.html">Support</a></nav>
    </div>
    <div class="grid ft-cols">
      <div><p class="k">Record</p><p>${F.works} works · ${F.artists} artists<br>${F.cities} cities · ${F.countries} countries · ${F.continents} continents</p></div>
      <div><p class="k">Produced by</p><p>Nōvo Collective, Los Angeles<br><a href="https://novocollective.org" target="_blank" rel="noopener">novocollective.org ↗</a></p></div>
      <div><p class="k">Cite as</p><p>Nōvo Collective. <i>uncommissioned</i>, Editions 01–02, 2025–2026. uncommissioned.art</p></div>
      <div><p class="k">Contact</p><p><a href="mailto:hi@novocollective.org">hi@novocollective.org</a><br>Every work enters the public domain on day thirty.</p></div>
    </div>
  </div>
  <div class="ft-tick" aria-label="Every site in the record"><div class="ft-row">${sites}${sites}</div></div>`;
  document.body.append(f);
  const d = document.createElement("button");
  d.className = "draft"; d.type = "button";
  d.textContent = "Draft: dashed red = to confirm. Click to hide.";
  d.onclick = () => document.body.classList.toggle("clean");
  document.body.append(d);
  const pk = document.createElement("div");
  pk.className = "picker";
  pk.innerHTML = `<span>Colour</span>` + Object.entries(SIGNALS).map(([k, v]) => `<button type="button" data-k="${k}" title="${k}" aria-label="${k}" aria-pressed="${k === signalName}" style="background:${v}"></button>`).join("");
  pk.onclick = e => { const b = e.target.closest("button"); if (!b) return; applySignal(b.dataset.k); try { localStorage.setItem("uc-signal", b.dataset.k); } catch (er) {} pk.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x === b)); };
  document.body.append(pk);
  initNotes();
}

/* ——— footnotes ——— */
const fm = n => `<button class="fm" type="button" data-n="${n}" aria-label="Note ${n}">${n}</button>`;

function makeDraggable(el, handle = el){
  let sx, sy, ox = 0, oy = 0, rot = el.dataset.rot || 0, moved = false;
  const apply = () => { const tf = `translate(${ox}px,${oy}px) rotate(${rot}deg)`; el.style.transform = tf; el.style.setProperty("--tf", tf); };
  apply();
  handle.addEventListener("pointerdown", e => {
    if (e.target.closest("a,button:not(.bar)")) return;
    sx = e.clientX - ox; sy = e.clientY - oy; moved = false;
    handle.setPointerCapture(e.pointerId);
    const mv = ev => { ox = ev.clientX - sx; oy = ev.clientY - sy; moved = true; apply(); };
    const up = () => { handle.removeEventListener("pointermove", mv); handle.removeEventListener("pointerup", up); };
    handle.addEventListener("pointermove", mv); handle.addEventListener("pointerup", up);
  });
}

function initNotes(){
  document.querySelectorAll(".fn").forEach((n, i) => {
    if (!n.dataset.rot) n.dataset.rot = [-1.2, .8, -.5, 1.4, -.9][i % 5];
    makeDraggable(n);
  });
  document.addEventListener("click", e => {
    const m = e.target.closest(".fm"); if (!m) return;
    const n = document.querySelector(`.fn[data-n="${m.dataset.n}"]`); if (!n) return;
    n.scrollIntoView({behavior: reduced ? "auto" : "smooth", block: "center"});
    n.classList.remove("flash"); void n.offsetWidth; n.classList.add("flash");
  });
}

/* side notes: each note sits level with its marker, pushed down if it would
   overlap the one above. Below 860px they fall back into the text flow. */
function railNotes(rail){
  if (!rail) return;
  const notes = [...rail.querySelectorAll(".fn")];
  const lay = () => {
    if (innerWidth <= 860) { notes.forEach(n => n.style.top = ""); rail.style.minHeight = ""; return; }
    const top0 = rail.getBoundingClientRect().top; let floor = 0;
    notes.forEach(n => {
      const m = document.querySelector(`.fm[data-n="${n.dataset.n}"]`);
      const y = Math.max(floor, m ? m.getBoundingClientRect().top - top0 - 12 : floor);
      n.style.top = y + "px"; floor = y + n.offsetHeight + 16;
    });
    rail.style.minHeight = floor + "px";
  };
  lay(); addEventListener("resize", lay); document.fonts && document.fonts.ready.then(lay);
}

/* ——— pop-up window: one work, or a list when several share a place ———
   Pinned to the page (it scrolls away with what you clicked), closes on Esc
   or a click anywhere outside it. */
let winZ = 70;
const closeWins = () => document.querySelectorAll(".win").forEach(w => w.remove());
function placeWin(el, x, y){
  const W = el.offsetWidth, H = el.offsetHeight;
  el.style.left = (Math.max(12, Math.min(innerWidth - W - 12, x - W / 2)) + scrollX) + "px";
  el.style.top = (Math.max(46, Math.min(innerHeight - H - 12, y - 40)) + scrollY) + "px";
  el.querySelector(".x").onclick = () => el.remove();
  el.addEventListener("pointerdown", () => el.style.zIndex = ++winZ);
  makeDraggable(el, el.querySelector(".bar"));
}
document.addEventListener("pointerdown", e => { if (!e.target.closest(".win")) closeWins(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeWins(); });
function openWin(w, x, y, title){
  if (Array.isArray(w)) { if (w.length === 1) w = w[0]; else return openList(w, x, y, title); }
  const el = document.createElement("div");
  el.className = "win"; el.style.cssText = cvars(wcol(w)) + `;z-index:${++winZ}`;
  const loc = w.site && w.place && !w.place.startsWith(w.site) ? `${w.site}, ${w.place}` : (w.place || w.site);
  el.innerHTML = `<div class="bar"><span>Cat. ${cat(w)} · Edition ${w.ed}</span><button class="x" type="button" aria-label="Close">×</button></div>
    <div class="bd">
      ${imgSrc(w) ? `<img src="${imgSrc(w)}" alt="">` : ""}
      <h4>${esc(w.title)}</h4>
      <p>${esc(w.artist)}${w.sub ? ` <span style="opacity:.7">(${esc(w.sub)})</span>` : ""}</p>
      <dl>
        <dt>Site</dt><dd>${esc(loc)}</dd>
        <dt>Year</dt><dd>${w.year}</dd>
        ${w.type ? `<dt>Type</dt><dd>${t(w.type)}</dd>` : w.medium ? `<dt>Medium</dt><dd>${w.medium.join(", ")}</dd>` : ""}
        ${w.thread ? `<dt>Thread</dt><dd>${w.thread.join(", ")}</dd>` : ""}
        <dt>Coords</dt><dd>${w.lat.toFixed(2)}, ${w.lon.toFixed(2)}</dd>
      </dl>
      ${hasPage(w) ? `<p style="margin-top:10px"><a class="ln" href="${workURL(w)}">Open the full page →</a></p>` : ""}
    </div>`;
  document.body.append(el);
  placeWin(el, x, y);
  return el;
}
function openList(ws, x, y, title){
  const el = document.createElement("div");
  el.className = "win"; el.style.cssText = `--c:#f1efe8;--k:#111;z-index:${++winZ}`;
  el.innerHTML = `<div class="bar"><span>${esc(title || ws[0].city)} · ${ws.length} works</span><button class="x" type="button" aria-label="Close">×</button></div>
    <div class="bd"><ul class="wl">${ws.map(w => `<li data-id="${w.id}"><span class="sw" style="background:${col(wcol(w)).bg}"></span><span><i>${esc(w.title)}</i><br>${esc(w.artist)}</span></li>`).join("")}</ul></div>`;
  document.body.append(el);
  placeWin(el, x, y);
  el.querySelectorAll("li").forEach(li => li.onclick = e => { const w = WORKS.find(w => w.id === li.dataset.id); hasPage(w) ? location.href = workURL(w) : openWin(w, e.clientX + 60, e.clientY); });
}

/* ——— index card: every work; those with a page say so ——— */
function card(w){
  const src = imgSrc(w);
  return `<button type="button" class="ic${hasPage(w) ? " has" : ""}" data-id="${w.id}" style="${cvars(EDITIONS[w.ed].color)}">
    <span class="ic-top"><span>${cat(w)}</span><span>${hasPage(w) ? "Page →" : esc(w.ed === "02" ? w.site.split(",")[0].split(";")[0] : w.country)}</span></span>
    <span class="ic-img">${src ? `<img src="${src}" alt="" loading="lazy">` : ""}</span>
    <span class="ic-t">${esc(w.title)}</span>
    <span class="ic-a">${esc(w.artist)}</span>
    <span class="ic-p">${esc(w.city)}</span>
  </button>`;
}
function bindCards(root){
  root.addEventListener("click", e => {
    const c = e.target.closest(".ic"); if (!c) return;
    const w = WORKS.find(x => x.id === c.dataset.id);
    hasPage(w) ? location.href = workURL(w) : openWin(w, e.clientX, e.clientY);
  });
}

/* ——— large colour blocks to move between pages ——— */
function blocks(items){
  /* never two blocks of the same colour side by side */
  items.forEach((b, i) => { if (i && !items[i - 1].plain && col(items[i - 1].color).bg === col(b.color).bg) b.plain = true; });
  return `<nav class="blocks">${items.map(b => `<a href="${b.href}"${b.plain ? ' class="plain"' : ""} style="${cvars(b.color)}"><span class="k">${b.k}</span><span class="h">${b.h}</span>${b.s ? `<span class="s">${b.s}</span>` : ""}</a>`).join("")}</nav>`;
}

/* ——— inline index item: words + a small image ——— */
function inlineItem(w){
  const src = imgSrc(w);
  const img = src ? `<img class="thumb" src="${src}" alt="" loading="lazy">` : `<span class="thumb" style="${cvars(w.color)}"></span>`;
  return `<span class="it" data-id="${w.id}" style="--hc:${col(w.color).bg}"><i>${esc(w.title)}</i> ${img}<span class="by">${esc(w.artist)}</span></span>`;
}
function bindIndex(root){
  root.addEventListener("click", e => {
    const it = e.target.closest(".it"); if (!it) return;
    const w = WORKS.find(x => x.id === it.dataset.id);
    hasPage(w) ? location.href = workURL(w) : openWin(w, e.clientX, e.clientY);
  });
}

/* ——— ticket pop-up ——— */
function ticket(delay = 5000){
  let seen = false;
  try { seen = sessionStorage.getItem("uc-ticket") === "1"; } catch (e) {}
  if (seen) return;
  setTimeout(() => {
    const pages = WORKS.filter(hasPage);
    const w = pages[Math.floor(Math.random() * pages.length)];
    const el = document.createElement("div");
    el.className = "ticket";
    el.innerHTML = `<div class="stub">Admit everyone</div>
      <div class="body"><div class="big">No ticket required</div>
      <p>This is not a show you attend. It is one you come across. Here is a work you might have walked past.</p>
      <a class="go" href="${workURL(w)}">${esc(w.title)} →</a></div>
      <button class="x" type="button" aria-label="Close">×</button>`;
    document.body.append(el);
    el.querySelector(".x").onclick = () => el.remove();
    try { sessionStorage.setItem("uc-ticket", "1"); } catch (e) {}
  }, delay);
}

/* ——— maps (d3 + topojson loaded on the page) ———
   One style for every map: graticule with degree labels on the frame,
   coastal water lines, flat land, points that merge when they touch.
   Zoom with + / −, pinch, ⌘/Ctrl + scroll or double-click; drag to pan. */
const LAND = "https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/land-110m.json";
const COUNTRIES10 = "https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-10m.json";
const clusterR = n => n > 1 ? 8 + Math.sqrt(n) * 3.4 : 6;

function mapFrame(wrap, W, H, label){
  const svg = d3.select(wrap).append("svg").attr("viewBox", `0 0 ${W} ${H}`).attr("role","img").attr("aria-label", label);
  const base = svg.append("g").attr("class","base");
  const over = svg.append("g").attr("class","over");
  const pts = svg.append("g").attr("class","pts");
  const lbls = svg.append("g").attr("class","lbls");
  const tip = Object.assign(document.createElement("div"), {className:"map-tip"}); wrap.append(tip);
  const ui = document.createElement("div");
  ui.className = "map-ui";
  ui.innerHTML = `<button type="button" data-z="in" aria-label="Zoom in">+</button><button type="button" data-z="out" aria-label="Zoom out">−</button><button type="button" data-z="reset" aria-label="Reset view">Reset</button>`;
  wrap.append(ui);
  const hint = Object.assign(document.createElement("div"), {className:"map-hint", textContent:"Pinch, ⌘ + scroll or use + to zoom"});
  wrap.append(hint);
  return {svg, base, over, pts, lbls, tip, ui, hint, W, H, wrap};
}

function zoomify(F, onZoom, maxK = 14){
  const {W, H} = F;
  const zoom = d3.zoom().scaleExtent([1, maxK]).translateExtent([[0,0],[W,H]])
    .filter(e => e.type === "wheel" ? (e.ctrlKey || e.metaKey) : e.type.startsWith("touch") ? e.touches.length > 1 : !e.button)
    .on("zoom", e => { F.base.attr("transform", e.transform); F.tip.style.opacity = 0; onZoom(e.transform); });
  F.svg.call(zoom).on("dblclick.zoom", null);
  F.svg.on("dblclick", e => { const [x, y] = d3.pointer(e); F.svg.transition().duration(450).call(zoom.scaleBy, 2, [x, y]); });
  F.ui.addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    const s = F.svg.transition().duration(450);
    b.dataset.z === "reset" ? s.call(zoom.transform, d3.zoomIdentity) : s.call(zoom.scaleBy, b.dataset.z === "in" ? 2 : .5);
  });
  let ht;
  F.svg.on("wheel.hint", e => { if (e.ctrlKey || e.metaKey) return; F.hint.classList.add("on"); clearTimeout(ht); ht = setTimeout(() => F.hint.classList.remove("on"), 1300); });
  onZoom(d3.zoomIdentity);
}

/* coastal water lines: wide strokes cut back with the sea colour */
function waterLines(F, d, widths, fixed){
  const ve = fixed ? "vector-effect:non-scaling-stroke!important" : null;
  widths.forEach((sw, i) => {
    F.base.append("path").attr("class","wl").attr("d", d).attr("stroke-width", sw).attr("opacity", .2 + i * (.5 / widths.length)).attr("style", ve);
    F.base.append("path").attr("class","wl-cut").attr("d", d).attr("stroke-width", Math.max(0, sw - 1.4)).attr("style", ve);
  });
}

/* degree labels along the bottom and left edge */
function frameTicks(F, proj, lons, lats, fmt){
  const {W, H} = F, g = F.over.append("g").attr("class","ticks");
  const midLat = proj.invert([W / 2, H / 2])[1], midLon = proj.invert([W / 2, H / 2])[0];
  const tx = g.selectAll("text.lo").data(lons).join("text").attr("class","lo").attr("y", H - 9).attr("text-anchor","middle").text(v => fmt(v, "E", "W"));
  const ty = g.selectAll("text.la").data(lats).join("text").attr("class","la").attr("x", 9).attr("dy",".32em").text(v => fmt(v, "N", "S"));
  return tf => {
    tx.attr("x", v => tf.applyX(proj([v, midLat])[0])).attr("opacity", function(v){ const x = +this.getAttribute("x"); return x > 60 && x < W - 60 ? 1 : 0; });
    ty.attr("y", v => tf.applyY(proj([midLon, v])[1])).attr("opacity", function(v){ const y = +this.getAttribute("y"); return y > 18 && y < H - 26 ? 1 : 0; });
  };
}
const fmtDeg = (v, a, b) => `${Math.abs(Math.round(v))}°${v === 0 ? "" : v > 0 ? a : b}`;
const fmtDM = (v, a, b) => { const x = Math.abs(v), d = Math.floor(x + 1e-9), m = Math.round((x - d) * 60); return `${d}°${String(m).padStart(2,"0")}′${v >= 0 ? a : b}`; };

function tipOn(F, x, y, c){
  const k = col(c.works.length > 1 ? EDITIONS[c.works[0].ed].color : wcol(c.works[0]));
  F.tip.style.background = k.bg; F.tip.style.color = k.ink;
  F.tip.innerHTML = c.works.length > 1
    ? `<b style="font-weight:600">${esc(c.title)}</b><br>${c.works.length} works · click to list`
    : `${esc(c.works[0].artist)}<i>${esc(c.works[0].title)}</i>${esc(c.title)}`;
  const r = F.wrap.getBoundingClientRect(), s = F.svg.node().getBoundingClientRect(), sc = s.width / F.W;
  F.tip.style.left = (s.left - r.left + x * sc) + "px";
  F.tip.style.top = (s.top - r.top + (y - c.r) * sc) + "px";
  F.tip.style.opacity = 1;
}

/* points: items that would touch on screen merge into one numbered circle;
   labels sit on their own layer and are dropped when they would collide */
function clusterPoints(F, items, proj){
  const place = (tf = d3.zoomIdentity) => {
    const pts = items.map(it => ({...it, xy: tf.apply(proj([it.lon, it.lat]))})).sort((a, b) => b.works.length - a.works.length);
    const cl = [];
    pts.forEach(p => {
      const c = cl.find(c => Math.hypot(c.xy[0] - p.xy[0], c.xy[1] - p.xy[1]) < clusterR(c.works.length) + clusterR(p.works.length) + 3);
      if (c) { c.works.push(...p.works); c.members.push(p); }
      else cl.push({...p, works:[...p.works], members:[p]});
    });
    cl.forEach(c => {
      c.r = clusterR(c.works.length);
      c.key = c.members.map(m => m.name).sort().join("|");
      const m = c.members.length;
      c.label = m > 2 ? `${c.works[0].continent}, ${m} cities` : m === 2 ? `${c.name} area` : c.name;
      c.title = c.label;
    });
    const g = F.pts.selectAll("g.pt").data(cl, c => c.key).join(enter => {
      const g = enter.append("g").attr("class","pt");
      g.append("circle").attr("class","ring");
      g.append("circle").attr("class","dot").attr("stroke","var(--bg)").attr("stroke-width",1.2);
      g.append("text").attr("class","n").attr("dy",".34em");
      return g;
    });
    g.attr("transform", c => `translate(${c.xy})`);
    g.select(".ring").attr("r", c => c.r).attr("stroke", c => c.color);
    g.select(".dot").attr("r", c => c.r).attr("fill", c => c.color);
    g.select(".n").attr("fill", c => c.ink).text(c => c.works.length > 1 ? c.works.length : "");
    g.on("mouseenter", (e, c) => tipOn(F, c.xy[0], c.xy[1], c))
     .on("mouseleave", () => F.tip.style.opacity = 0)
     .on("pointerdown", e => { e.stopPropagation(); closeWins(); })
     .on("click", (e, c) => {
       if (c.members.length === 1 && c.href) return location.href = c.href;
       if (c.works.length === 1 && hasPage(c.works[0])) return location.href = workURL(c.works[0]);
       openWin(c.works, e.clientX, e.clientY, c.title);
     });
    /* labels, biggest first, skipped when they would overlap */
    const boxes = cl.map(c => [c.xy[0] - c.r, c.xy[1] - c.r, c.xy[0] + c.r, c.xy[1] + c.r]);
    const hit = (a, b) => a[0] < b[2] && a[2] > b[0] && a[1] < b[3] && a[3] > b[1];
    const shown = [];
    cl.forEach((c, i) => {
      const want = c.always || c.works.length > 2 || tf.k >= (c.minK || 3);
      const w = c.label.length * 6.4 + 4, x = c.xy[0] + c.r + 5, b = [x, c.xy[1] - 8, x + w, c.xy[1] + 8];
      c.show = want && b[2] < F.W - 50 && !shown.some(s => hit(s, b)) && !boxes.some((o, j) => j !== i && hit(o, b));
      if (c.show) shown.push(b);
    });
    F.lbls.selectAll("text").data(cl.filter(c => c.show), c => c.key).join("text").attr("class","lbl")
      .attr("x", c => c.xy[0] + c.r + 5).attr("y", c => c.xy[1] + 4).text(c => c.label);
  };
  return place;
}

async function worldMap(wrap, works, opts={}){
  const F = mapFrame(wrap, 1000, 470, "World map of work sites");
  const topo = await fetch(LAND).then(r => r.json());
  const proj = d3.geoEqualEarth().fitExtent([[0,6],[F.W,F.H-6]], {type:"Sphere"});
  const path = d3.geoPath(proj);
  F.base.append("path").attr("class","grat").attr("d", path(d3.geoGraticule10()));
  const land = path(topojson.feature(topo, topo.objects.land));
  waterLines(F, land, [7, 4], true);
  F.base.append("path").attr("class","land").attr("d", land);
  const ticks = frameTicks(F, proj, d3.range(-150, 181, 30), d3.range(-60, 61, 30), fmtDeg);
  const c1 = col(EDITIONS["01"].color), c2 = col(EDITIONS["02"].color);
  const groups = d3.groups(works.filter(w => w.lat != null), w => w.ed === "02" ? "Curaçao" : w.city.split(",")[0]);
  const items = groups.map(([k, ws]) => k === "Curaçao" && ws[0].ed === "02"
    ? {name:k, lon:-68.95, lat:12.15, color:c2.bg, ink:c2.ink, works:ws, always:true, href:opts.curacaoHref}
    : {name:k, lon:d3.mean(ws, w => w.lon), lat:d3.mean(ws, w => w.lat), color:c1.bg, ink:c1.ink, works:ws, minK: ws.length > 1 ? 2 : 3.5});
  const place = clusterPoints(F, items, proj);
  zoomify(F, tf => { place(tf); ticks(tf); }, 16);
  return groups.length;
}

/* Curaçao: the same style, plus terrain, named places, scale bar and north */
async function curacaoMap(wrap, works){
  const F = mapFrame(wrap, 1000, 520, "Map of Curaçao work sites");
  const proj = d3.geoMercator().fitExtent([[70,40],[F.W-70,F.H-40]], {type:"MultiPoint", coordinates:[[-69.18,12.40],[-68.60,11.95]]});
  const path = d3.geoPath(proj);
  F.base.append("path").attr("class","grat").attr("d", path(d3.geoGraticule().extent([[-69.5,11.7],[-68.3,12.7]]).step([.05,.05])()));
  try{
    const t10 = await fetch(COUNTRIES10).then(r => r.json());
    const d = path({type:"FeatureCollection", features: topojson.feature(t10, t10.objects.countries).features.filter(f => /Cura/.test(f.properties.name))});
    waterLines(F, d, [46, 36, 27, 19, 12, 6]);
    F.base.append("path").attr("class","land").attr("d", d);
    if (typeof CUR_DEM !== "undefined") terrain(F, proj, CUR_DEM);
  }catch(e){}
  const places = [
    {n:"Sint Christoffelberg, 372 m", lon:-69.1105, lat:12.3365, peak:true},
    {n:"Willemstad", lon:-68.9335, lat:12.1084, left:true},
    {n:"Klein Curaçao", lon:-68.645, lat:11.988, below:true},
    {n:"Caribbean Sea", lon:-68.86, lat:12.33, sea:true}
  ];
  const pl = F.base.append("g").attr("class","places").selectAll("g").data(places).join("g").attr("transform", d => `translate(${proj([d.lon, d.lat])})`);
  pl.filter(d => d.peak).append("path").attr("d","M0,-6L5.5,3.5L-5.5,3.5Z").attr("class","peak");
  pl.filter(d => !d.peak && !d.sea).append("rect").attr("x",-2.5).attr("y",-2.5).attr("width",5).attr("height",5).attr("class","town");
  pl.append("text").attr("class", d => d.sea ? "sea" : "pn").attr("x", d => d.sea ? 0 : d.left ? -8 : 9).attr("y", d => d.below || d.left ? 16 : 4).attr("text-anchor", d => d.sea ? "middle" : d.left ? "end" : "start").text(d => d.n);
  const ticks = frameTicks(F, proj, d3.range(-69.1, -68.65, .1), d3.range(12.0, 12.41, .1), fmtDM);
  const sb = F.over.append("g").attr("class","scale").attr("transform", `translate(${F.W - 210},${F.H - 34})`);
  const kmPx = proj([-69 + 10 / (111.32 * Math.cos(12.1 * Math.PI / 180)), 12.1])[0] - proj([-69, 12.1])[0];
  const sbl = sb.append("path"), sbt = sb.append("text").attr("y", -7);
  F.over.append("g").attr("class","north").attr("transform", `translate(${F.W - 40},${F.H - 46})`).html(`<path d="M0,-18L7,8L0,3L-7,8Z"/><text y="24" text-anchor="middle">N</text>`);
  const items = d3.groups(works.filter(w => w.lat != null), w => w.site).map(([k, ws]) => {
    const c = col(ws.length > 1 ? EDITIONS["02"].color : wcol(ws[0]));
    return {name:k.split(",")[0].split(";")[0], lon:ws[0].lon, lat:ws[0].lat, color:c.bg, ink:c.ink, works:ws, always:true};
  });
  const place = clusterPoints(F, items, proj);
  zoomify(F, tf => {
    place(tf); ticks(tf);
    const km = tf.k > 4 ? 1 : tf.k > 1.8 ? 5 : 10;
    sbl.attr("d", `M0,0V5H${kmPx * km / 10 * tf.k}V0`); sbt.text(`${km} km`);
  }, 10);
  const key = document.createElement("ol");
  key.className = "map-key";
  key.innerHTML = works.filter(w => w.lat != null).map(w => `<li><a href="${hasPage(w) ? workURL(w) : "#"}" data-id="${w.id}"><span class="sw" style="background:${col(wcol(w)).bg}"></span><b>${w.id.slice(3)}</b> ${esc(w.site)}<br><span class="dim">${esc(w.artist)}</span></a></li>`).join("");
  wrap.after(key);
  key.addEventListener("click", e => { const a = e.target.closest("a"); if (!a) return; const w = WORKS.find(x => x.id === a.dataset.id); if (!hasPage(w)) { e.preventDefault(); openWin(w, e.clientX, e.clientY); } });
}

/* terrain from the elevation grid: hill shading as an image, then
   elevation bands and contour lines every 50 m */
function terrain(F, proj, D){
  const {lon0, lat1, step, nx, ny, v} = D;
  const toXY = ([x, y]) => proj([lon0 + x * step, lat1 - y * step]);
  /* hillshade, light from the north-west */
  const cv = document.createElement("canvas"); cv.width = nx; cv.height = ny;
  const cx = cv.getContext("2d"), im = cx.createImageData(nx, ny);
  const cell = step * 111320, az = 315 * Math.PI / 180, alt = 45 * Math.PI / 180, ex = 3;
  const at = (i, j) => v[Math.max(0, Math.min(ny - 1, j)) * nx + Math.max(0, Math.min(nx - 1, i))];
  for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++){
    const e = at(i, j), k = (j * nx + i) * 4;
    if (e <= 0) { im.data[k + 3] = 0; continue; }
    const dx = (at(i + 1, j) - at(i - 1, j)) / (2 * cell) * ex, dy = (at(i, j + 1) - at(i, j - 1)) / (2 * cell) * ex;
    const slope = Math.atan(Math.hypot(dx, dy)), aspect = Math.atan2(dy, -dx);
    let sh = Math.cos(alt) * Math.cos(slope) + Math.sin(alt) * Math.sin(slope) * Math.cos(az - Math.PI / 2 - aspect);
    sh = Math.max(0, Math.min(1, sh));
    const g = sh > .7 ? 255 : 0, a = Math.abs(sh - .7) * (sh > .7 ? 260 : 330);
    im.data[k] = im.data[k + 1] = im.data[k + 2] = g; im.data[k + 3] = Math.min(150, a);
  }
  cx.putImageData(im, 0, 0);
  const [x0, y0] = toXY([-.5, -.5]), [x1, y1] = toXY([nx - .5, ny - .5]);
  /* elevation bands */
  const th = [10, 50, 100, 150, 200, 250, 300];
  const cs = d3.contours().size([nx, ny]).thresholds(th)(v);
  const planar = d3.geoPath();
  const proj2 = mp => ({type:"MultiPolygon", coordinates: mp.coordinates.map(poly => poly.map(ring => ring.map(toXY)))});
  const tone = d3.scaleLinear().domain([10, 300]).range(["#504f49", "#77746a"]);
  const g = F.base.append("g").attr("class","terrain");
  g.selectAll("path.band").data(cs).join("path").attr("class","band").attr("d", c => planar(proj2(c))).attr("fill", c => tone(c.value));
  g.append("image").attr("href", cv.toDataURL()).attr("x", x0).attr("y", y0).attr("width", x1 - x0).attr("height", y1 - y0).attr("preserveAspectRatio","none").attr("class","shade");
  g.selectAll("path.ct").data(cs.filter(c => c.value >= 50)).join("path").attr("class", c => "ct" + (c.value % 100 === 0 ? " ix" : "")).attr("d", c => planar(proj2(c)));
  /* legend */
  const lg = F.over.append("g").attr("class","legend").attr("transform", `translate(70,${F.svg.attr("viewBox").split(" ")[3] - 64})`);
  lg.append("text").attr("y", -8).text("Elevation");
  [10, 100, 200, 300].forEach((m, i) => { lg.append("rect").attr("x", i * 44).attr("width", 44).attr("height", 8).attr("fill", tone(m)); lg.append("text").attr("x", i * 44).attr("y", 22).text(m + " m"); });
}
