const CATALOGOS = [
  {
    nombre: "Catálogo Escolar 2026",
    slug: "escolar-2026",
    portada: "catalogos/escolar-2026/assets/pages/001.jpg"
  },
  // Agrega más catálogos aquí:
  /*
  {
    nombre: "Catálogo Navidad 2026",
    slug: "navidad-2026",
    portada: "catalogos/navidad-2026/assets/pages/001.jpg"
  }
  */
];

function buildCatalogos(){
  const grid = document.getElementById("catalogosGrid");
  if(!grid) return;

  grid.innerHTML = CATALOGOS.map(cat => `
    <a class="tile" href="catalogos/${cat.slug}/index.html">
      <div class="thumb">
        <img src="${cat.portada}" alt="${cat.nombre}" loading="lazy">
      </div>
      <div class="meta">
        <span class="badge accent">${cat.nombre}</span>
        <span class="badge">Abrir</span>
      </div>
    </a>
  `).join("");
}

document.addEventListener("DOMContentLoaded", buildCatalogos);
