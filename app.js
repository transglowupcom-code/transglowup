/* TransGlowUp app logic — provider search, recovery routing, converters, checklist. */
(function () {
"use strict";
const $ = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

/* ---------- Page routing (hash-based) ---------- */
const pages = $$(".app-page");
pages.filter(p => p.id !== "home").forEach(p => {
  const wrap = p.querySelector(":scope > .wrap");
  if (!wrap) return;
  const back = document.createElement("a");
  back.className = "page-return";
  back.href = "#home";
  back.textContent = "← Back to all resources";
  wrap.insertBefore(back, wrap.firstChild);
});
function showPage() {
  const id = (location.hash || "#home").slice(1);
  const target = document.getElementById(id);
  let page = target && target.closest(".app-page");
  if (!page) { page = $("#home"); }
  pages.forEach(el => el.classList.toggle("active", el === page));
  $$(".jump-links a,.jump-home").forEach(a => {
    const linked = document.getElementById(a.getAttribute("href").slice(1));
    a.toggleAttribute("aria-current", !!linked && linked.closest(".app-page") === page);
  });
  scrollTo(0, 0);
  if (target && target !== page) setTimeout(() => {
    target.scrollIntoView({ block: "start" });
    if (target.hasAttribute("tabindex")) target.focus({ preventScroll: true });
  }, 0);
}
function moveToResults(el) {
  if (location.hash !== "#" + el.id) { location.hash = el.id; return; }
  el.scrollIntoView({ block: "start" });
  el.focus({ preventScroll: true });
}
addEventListener("hashchange", showPage);
showPage();

/* ---------- Shared helpers ---------- */
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"}[c]));
const norm = s => String(s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, " ").trim();
function editDistance(a, b) {
  let row = [...Array(b.length + 1).keys()], next = new Array(b.length + 1);
  for (let i = 1; i <= a.length; i++) {
    next[0] = i;
    for (let j = 1; j <= b.length; j++)
      next[j] = Math.min(next[j - 1] + 1, row[j] + 1, row[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    [row, next] = [next, row];
  }
  return row[b.length];
}
function fuzzyMatch(query, text) {
  const q = norm(query), hay = norm(text);
  if (!q) return true;
  if (hay.includes(q)) return true;
  const words = hay.split(" ");
  return q.split(" ").every(tok => {
    if (/^\d+$/.test(tok)) return hay.includes(tok);
    return words.some(w => {
      if (w.startsWith(tok) || tok.startsWith(w)) return true;
      const allow = tok.length >= 7 ? 2 : tok.length >= 4 ? 1 : 0;
      return allow > 0 && Math.abs(w.length - tok.length) <= allow && editDistance(tok, w) <= allow;
    });
  });
}
const haversineMiles = (a, b, c, d) => {
  const r = Math.PI / 180, dLa = (c - a) * r, dLo = (d - b) * r;
  const x = Math.sin(dLa / 2) ** 2 + Math.cos(a * r) * Math.cos(c * r) * Math.sin(dLo / 2) ** 2;
  return 3958.7613 * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
};

/* ---------- Provider directory ---------- */
const providers = (window.VERIFIED_PROVIDERS || [])
  .filter(p => p.phone && p.phoneLink && p.address && p.url && Number.isFinite(p.lat) && Number.isFinite(p.lng));
const grid = $("#providerGrid");
grid.classList.add("compact-list");
const pSearch = $("#providerSearch"), pPlace = $("#providerPlace"),
      pState = $("#providerState"), pRegion = $("#regionFilter"), pCare = $("#careFilter"),
      pCount = $("#resultCount"), pEmpty = $("#emptyProviders"),
      pEmptyTitle = $("#providerEmptyTitle"), pEmptyCopy = $("#providerEmptyCopy"),
      pStatus = $("#providerStatus");

function renderProviders() {
  const q = pSearch.value.trim(), local = pPlace.value.trim();
  const zip = ((q + " " + local).match(/\b\d{5}\b/) || [])[0] || "";
  const origin = zip && window.US_ZIP_CENTROIDS ? window.US_ZIP_CENTROIDS[zip] : null;
  const qText = q.replace(/\b\d{5}\b/g, " ").trim();
  const localText = local.replace(/\b\d{5}\b/g, " ").trim();
  const hay = p => [p.name, p.state, p.city, p.address, p.region, p.kind, ...p.care, ...p.procedures].join(" ");

  let list = providers.filter(p =>
    (pState.value === "all" || p.state === pState.value) &&
    (pRegion.value === "all" || p.region === pRegion.value) &&
    (pCare.value === "all" || p.care.includes(pCare.value)) &&
    fuzzyMatch(qText, hay(p)));
  let filtered = list.filter(p => fuzzyMatch(localText, p.city + " " + p.address));
  const localMiss = !!localText && !filtered.length && list.length;
  if (localMiss) filtered = list;

  if (origin) {
    filtered = filtered
      .map(p => Object.assign({}, p, { distance: haversineMiles(origin[0], origin[1], p.lat, p.lng) }))
      .sort((a, b) => a.distance - b.distance);
  } else {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  grid.innerHTML = filtered.map(p => {
    const tags = (p.procedures.length ? p.procedures : p.care)
      .map(t => `<span class="tag">${esc(t)}</span>`).join("");
    return `<article class="provider compact card"><div class="provider-top"><div><h3>${esc(p.name)}</h3>` +
      `<div class="location">${origin ? esc(p.distance.toFixed(1) + " mi away · ") : ""}${esc(p.city)}</div></div>` +
      `<span class="region">${esc(p.kind)}</span></div><address class="address">${esc(p.address)}</address>` +
      `<div class="tags">${tags}</div><div class="provider-actions">` +
      `<a class="btn secondary" href="tel:${esc(p.phoneLink)}">Call ${esc(p.phone)}</a>` +
      `<a class="text-link" target="_blank" rel="noopener" href="${esc(p.url)}">Website</a></div>` +
      `<p class="note">Phone and address checked via ${esc(p.verification)} · <strong>Verify before booking:</strong> ` +
      `confirm services, cost, eligibility, and availability.</p></article>`;
  }).join("");

  pCount.textContent = `${filtered.length} verified ${filtered.length === 1 ? "entry" : "entries"} shown`;
  pEmpty.classList.toggle("hidden", filtered.length !== 0);
  let status = "";
  if (zip && !origin)
    status = `<strong>We couldn’t place ZIP ${esc(zip)}.</strong> It may be a PO-box or unique ZIP without a Census ZCTA centroid. Results are not distance-sorted.`;
  else if (origin)
    status = `<strong>Sorted closest first from ZIP ${esc(zip)}.</strong> Distances are straight-line estimates from the ZIP centroid, not driving distance.`;
  else if (localMiss)
    status = `<strong>No named listing matched “${esc(localText)}.”</strong> Showing verified options elsewhere in ${esc(pState.value === "all" ? "the selected area" : pState.value)}.`;
  pStatus.classList.toggle("hidden", !status);
  pStatus.innerHTML = status;
  if (!filtered.length) {
    const where = [local || q, pState.value !== "all" ? pState.value : ""].filter(Boolean).join(", ");
    pEmptyTitle.textContent = "No verified named listing" + (where ? " for " + where : "") + ".";
    pEmptyCopy.textContent = "That does not mean care is unavailable. Try a broader spelling or use HRSA, OutCare, GLMA, or WPATH below for a current city/ZIP search. This page does not invent a local result.";
  }
}
function syncChips() {
  $$(".chip").forEach(c => c.classList.toggle("active", c.dataset.care === pCare.value));
}
pSearch.addEventListener("input", renderProviders);
pPlace.addEventListener("input", renderProviders);
pState.addEventListener("change", renderProviders);
pRegion.addEventListener("change", renderProviders);
pCare.addEventListener("change", () => { syncChips(); renderProviders(); });
$$(".chip").forEach(c => c.addEventListener("click", () => { pCare.value = c.dataset.care; syncChips(); renderProviders(); }));
$("#providerSearchForm").addEventListener("submit", e => {
  e.preventDefault(); renderProviders(); moveToResults($("#providerResults"));
});
renderProviders();

/* ---------- Recovery routing (SAMHSA, 50 states) ---------- */
const SAMHSA = { name: "SAMHSA National Helpline", contact: "1-800-662-4357", phoneLink: "+18006624357", url: "https://findtreatment.gov" };
const rState = $("#recoveryState"), rPlace = $("#recoveryPlace"),
      rResult = $("#recoveryResult"), rBtn = $("#recoverySearchButton");
function renderRecovery() {
  const st = rState.value, local = rPlace.value.trim();
  if (!st) {
    rResult.className = "recovery-result empty-state";
    rResult.innerHTML = "<strong>Select a state and optionally enter any city, town, or ZIP.</strong><br>You will always see a statewide contact, FindTreatment.gov, SAMHSA at 1-800-662-4357, and 988—so there is no dead end.";
    return;
  }
  const placeName = local ? `${esc(local)}, ${esc(st)}` : esc(st);
  rResult.className = "recovery-result card";
  rResult.innerHTML =
    `<div class="resource-kicker">${placeName} · statewide starting point</div><h3>${esc(SAMHSA.name)}</h3>` +
    `<div class="resource-actions"><a class="btn secondary" href="tel:${SAMHSA.phoneLink}">Call ${SAMHSA.contact}</a>` +
    `<a class="text-link" target="_blank" rel="noopener" href="${SAMHSA.url}">Website</a></div>` +
    `<div class="verify-strip"><strong>Verify before enrolling:</strong> confirm cost, funding, level of care, medication treatment, openings, and identity-affirming practices. ` +
    `For more options, use <a class="text-link" target="_blank" rel="noopener" href="https://findtreatment.gov">FindTreatment.gov</a>, ` +
    `call <a class="text-link" href="tel:+18006624357">SAMHSA 1-800-662-4357</a>, or call/text <a class="text-link" href="tel:988">988</a> in a crisis.</div>`;
}
rState.addEventListener("change", renderRecovery);
rPlace.addEventListener("input", () => { if (rState.value) renderRecovery(); });
rPlace.addEventListener("keydown", e => {
  if (e.key === "Enter") { e.preventDefault(); renderRecovery(); moveToResults(rResult); }
});
rBtn.addEventListener("click", () => { renderRecovery(); moveToResults(rResult); });

/* ---------- Clothing converters ---------- */
const WAIST = [{ s: "00", a: "XS", min: 23, max: 24 }, { s: "0", a: "XS", min: 24, max: 25 },
  { s: "2", a: "XS", min: 25, max: 26 }, { s: "4", a: "S", min: 26, max: 27 }, { s: "6", a: "S", min: 27, max: 28 },
  { s: "8", a: "M", min: 28, max: 29 }, { s: "10", a: "M", min: 29, max: 30.5 }, { s: "12", a: "L", min: 30.5, max: 32 },
  { s: "14", a: "L", min: 32, max: 34 }, { s: "16", a: "XL", min: 34, max: 36 }, { s: "18", a: "XL", min: 36, max: 38 },
  { s: "20", a: "2XL", min: 38, max: 40 }, { s: "22", a: "2XL", min: 40, max: 42 }, { s: "24", a: "3XL", min: 42, max: 44 },
  { s: "26", a: "3XL", min: 44, max: 46 }, { s: "28", a: "4XL", min: 46, max: 48 }];
let pantsDir = "m2w";
const pantsSize = $("#pantsSize"), pantsLabel = $("#pantsSizeLabel"), clothRes = $("#clothingResult");
const fmtW = n => (n % 1 ? n.toFixed(1) : n.toFixed(0));
function fillPants() {
  const m2w = pantsDir === "m2w";
  pantsLabel.textContent = m2w ? "Men’s pants waist (W)" : "Women’s US size";
  pantsSize.innerHTML = "";
  if (m2w) {
    for (let w = 24; w <= 60; w++) {
      const o = document.createElement("option");
      o.value = w; o.textContent = "W" + w; o.selected = w === 32;
      pantsSize.appendChild(o);
    }
  } else {
    WAIST.forEach(r => {
      const o = document.createElement("option");
      o.value = r.s; o.textContent = `${r.s} · ${r.a}`; o.selected = r.s === "12";
      pantsSize.appendChild(o);
    });
  }
  convertClothing();
}
function convertClothing() {
  if (pantsDir === "w2m") {
    const r = WAIST.find(x => x.s === pantsSize.value);
    clothRes.innerHTML = `<small>Female → male estimate</small><strong>W${fmtW(r.min)}–${fmtW(r.max)}</strong>` +
      `<small>Men’s US pants starting point for women’s US ${r.s} · ${r.a}.</small>`;
    return;
  }
  const waist = parseFloat(pantsSize.value);
  const hits = WAIST.filter(x => waist >= x.min && waist <= x.max);
  if (!hits.length) {
    clothRes.innerHTML = `<small>Male → female estimate</small><strong>${waist < 23 ? "below 00" : "above 28"}</strong>` +
      `<small>Use the brand’s waist and hip chart for extended sizing.</small>`;
    return;
  }
  const num = hits.map(x => x.s).join("–");
  const alpha = [...new Set(hits.map(x => x.a))].join("–");
  clothRes.innerHTML = `<small>Male → female estimate</small><strong>${num} · ${alpha}</strong>` +
    `<small>Women’s US starting point for a ${waist}-inch men’s W size.</small>`;
}
$$('.direction-switch[aria-labelledby="pantsDirectionLabel"] .direction-option').forEach(b =>
  b.addEventListener("click", () => {
    pantsDir = b.dataset.direction;
    $$('.direction-switch[aria-labelledby="pantsDirectionLabel"] .direction-option')
      .forEach(o => o.setAttribute("aria-pressed", o === b ? "true" : "false"));
    fillPants();
  }));
pantsSize.addEventListener("change", convertClothing);
fillPants();

const shoeDir = $("#shoeDirection"), shoeSize = $("#shoeSize"), shoeRes = $("#shoeResult");
function convertShoe() {
  const n = parseFloat(shoeSize.value);
  if (isNaN(n)) { shoeRes.innerHTML = "<small>Enter a size to convert.</small>"; return; }
  const out = shoeDir.value === "m2w" ? n + 1.5 : n - 1.5;
  shoeRes.innerHTML = `<small>Estimated US ${shoeDir.value === "m2w" ? "women's" : "men's"} size</small>` +
    `<strong>${out.toFixed(out % 1 ? 1 : 0)}</strong>`;
}
shoeDir.addEventListener("change", convertShoe);
shoeSize.addEventListener("input", convertShoe);
convertShoe();

const CUPS = ["AA", "A", "B", "C", "D", "DD/E", "DDD/F", "G", "H", "I", "J", "K", "L", "M", "N"];
const braUnit = $("#braUnit"), braUnder = $("#braUnderbust"), braBust = $("#braBust"), braRes = $("#braResult");
function convertBra() {
  const u = parseFloat(braUnder.value), b = parseFloat(braBust.value);
  if (isNaN(u) || isNaN(b)) { braRes.innerHTML = "<small>Enter both measurements to calculate a starting size.</small>"; return; }
  const ui = braUnit.value === "cm" ? u / 2.54 : u;
  const bi = braUnit.value === "cm" ? b / 2.54 : b;
  if (ui < 24 || ui > 65 || bi <= ui) {
    braRes.innerHTML = "<small>Check that the fullest bust is larger than the underbust and both measurements are in range.</small>";
    return;
  }
  const band = Math.round(ui / 2) * 2, diff = Math.round(bi - band);
  if (diff < 0 || diff >= CUPS.length) {
    braRes.innerHTML = "<small>This measurement difference falls outside this calculator’s chart. A professional fitting or a brand-specific calculator may help.</small>";
    return;
  }
  const sisters = [];
  if (diff + 1 < CUPS.length && band > 24) sisters.push((band - 2) + CUPS[diff + 1]);
  if (diff > 0 && band < 64) sisters.push((band + 2) + CUPS[diff - 1]);
  braRes.innerHTML = `<small>Estimated US starting size</small><strong>${band}${CUPS[diff]}</strong>` +
    (sisters.length ? `<small>Sister sizes to compare: ${sisters.join(" and ")}</small>` : "");
}
function switchBraUnit() {
  const toCm = braUnit.value === "cm", f = toCm ? 2.54 : 1 / 2.54;
  braUnder.value = (parseFloat(braUnder.value) * f).toFixed(toCm ? 1 : 2);
  braBust.value = (parseFloat(braBust.value) * f).toFixed(toCm ? 1 : 2);
  Object.assign(braUnder, { min: toCm ? "61" : "24", max: toCm ? "165" : "65", step: toCm ? "0.5" : "0.25" });
  Object.assign(braBust, { min: toCm ? "63" : "25", max: toCm ? "190" : "75", step: toCm ? "0.5" : "0.25" });
  convertBra();
}
braUnit.addEventListener("change", switchBraUnit);
braUnder.addEventListener("input", convertBra);
braBust.addEventListener("input", convertBra);
convertBra();

const SHIRTS = [{ m: "XS", w: "S", n: "4–6", c: "32–34" }, { m: "S", w: "M", n: "8–10", c: "35–37" },
  { m: "M", w: "L", n: "12–14", c: "38–40" }, { m: "L", w: "XL", n: "16–18", c: "41–43" },
  { m: "XL", w: "2XL", n: "20–22", c: "44–46" }, { m: "2XL", w: "3XL", n: "24–26", c: "47–49" },
  { m: "3XL", w: "4XL", n: "28–30", c: "50–53" }, { m: "4XL", w: "5XL", n: "32–34", c: "54–57" }];
let shirtDir = "m2w";
const shirtSize = $("#shirtSize"), shirtLabel = $("#shirtSizeLabel"), shirtRes = $("#shirtResult");
function fillShirts() {
  const m2w = shirtDir === "m2w";
  shirtLabel.textContent = m2w ? "Men’s US shirt size" : "Women’s US shirt size";
  shirtSize.innerHTML = "";
  SHIRTS.forEach(r => {
    const o = document.createElement("option");
    o.value = m2w ? r.m : r.w;
    o.textContent = `${m2w ? r.m : r.w} · ${r.n}`;
    o.selected = (m2w && r.m === "M") || (!m2w && r.w === "L");
    shirtSize.appendChild(o);
  });
  convertShirt();
}
function convertShirt() {
  const r = SHIRTS.find(x => (shirtDir === "m2w" ? x.m : x.w) === shirtSize.value);
  shirtRes.innerHTML = shirtDir === "w2m"
    ? `<small>Female → male estimate</small><strong>${r.m}</strong><small>Men’s US starting point for women’s US ${r.w} · ${r.n}, based on a typical chest range of ${r.c} inches.</small>`
    : `<small>Male → female estimate</small><strong>${r.w} · ${r.n}</strong><small>Women’s US starting point for men’s US ${r.m}, based on a typical chest range of ${r.c} inches.</small>`;
}
$$("#shirtDirectionSwitch .direction-option").forEach(b =>
  b.addEventListener("click", () => {
    shirtDir = b.dataset.direction;
    $$("#shirtDirectionSwitch .direction-option").forEach(o => o.setAttribute("aria-pressed", o === b ? "true" : "false"));
    fillShirts();
  }));
shirtSize.addEventListener("change", convertShirt);
fillShirts();

/* ---------- Transition checklist progress ---------- */
const checks = $$('#phaseList input[type="checkbox"]');
const ring = $("#progressRing"), pct = $("#progressPercent"), pText = $("#progressText");
function updateProgress() {
  const done = checks.filter(x => x.checked).length;
  const p = Math.round(done / checks.length * 100);
  pct.textContent = p + "%";
  pText.textContent = `${done} of ${checks.length} steps marked for this visit.`;
  ring.style.background = `conic-gradient(var(--pink) ${p}%, var(--line) ${p}%)`;
  $$("[data-phase]").forEach(ph => {
    const ps = $$("input", ph), pd = ps.filter(x => x.checked).length;
    ph.querySelector(".phase-count").textContent = `${pd} / ${ps.length}`;
  });
}
checks.forEach(x => x.addEventListener("change", updateProgress));
$("#resetGuide").addEventListener("click", () => { checks.forEach(x => x.checked = false); updateProgress(); });
updateProgress();
})();

/* ---------- Amazon Associates auto-tag ---------- */
(function () {
  const TAG = "130675-20";
  document.querySelectorAll('a[href*="amazon."]').forEach(a => {
    try {
      const u = new URL(a.href, location.href);
      if (!u.searchParams.has("tag")) { u.searchParams.set("tag", TAG); a.href = u.toString(); }
    } catch (e) { /* leave unusual URLs alone */ }
  });
})();

/* Cute visitor counter: two hearts, squiggle, live count (Abacus JSONP, no CORS needed).
   Counts one hit per browser session via sessionStorage; pill stays hidden if the count can't load. */
(function(){
  var pill = document.getElementById('visitor-pill');
  var num = document.getElementById('visitor-count');
  if(!pill || !num) return;
  var seen = false;
  try { seen = sessionStorage.getItem('tgu_counted') === '1'; } catch(e){}
  window.__tguCount = function(d){
    if(d && typeof d.value === 'number'){
      num.textContent = d.value.toLocaleString('en-US');
      pill.hidden = false;
    }
    window.__tguCount = null;
  };
  if(!seen){ try { sessionStorage.setItem('tgu_counted','1'); } catch(e){} }
  var s = document.createElement('script');
  s.src = 'https://abacus.jasoncameron.dev/' + (seen ? 'get' : 'hit') + '/transglowup/pageviews?callback=__tguCount';
  s.async = true;
  s.onerror = function(){ window.__tguCount = null; };
  document.head.appendChild(s);
})();
