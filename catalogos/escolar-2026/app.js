const WHATSAPP = "51957905628";
function pad3(n) {
  n = String(n);
  return n.length === 1 ? "00"+n : (n.length === 2 ? "0"+n : n);
}
function waLink(text) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
}
async function loadPages() {
  const res = await fetch("pages.json");
  return await res.json();
}
function buildIndex(pages) {
  const grid = document.getElementById("pagesGrid");
  if (!grid) return;
  grid.innerHTML = pages.map(p => {
    const pageStr = pad3(p.page);
    return `
      <a class="tile" href="pages/${pageStr}.html" aria-label="Abrir página ${pageStr}">
        <div class="thumb"><img src="${p.image}" alt="Miniatura página ${pageStr}" loading="lazy" /></div>
        <div class="meta">
          <span class="badge accent">Página ${pageStr}</span>
          <span class="badge">Ver</span>
        </div>
      </a>
    `;
  }).join("");
  const waGeneral = document.getElementById("waGeneral");
  if (waGeneral) {
    waGeneral.href = waLink("Hola, quiero información del catálogo escolar 2026. ¿Me ayudas?");
  }
  const input = document.getElementById("searchInput");
  const btn = document.getElementById("goBtn");
  if (input && btn) {
    const go = () => {
      const raw = (input.value || "").trim();
      if (!raw) return;
      const num = parseInt(raw, 10);
      if (!Number.isFinite(num) || num < 1 || num > pages.length) return;
      const pageStr = pad3(num);
      window.location.href = `pages/${pageStr}.html`;
    };
    btn.addEventListener("click", go);
    input.addEventListener("keydown", (e) => { if (e.key === "Enter") go(); });
  }
}
(async () => {
  try {
    const pages = await loadPages();
    buildIndex(pages);
  } catch (e) {
    console.error(e);
  }
})();
