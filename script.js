function createSiteHeader() {
  let mount = document.querySelector("[data-site-header]");
  if (!mount) {
    mount = document.createElement("div");
    mount.dataset.siteHeader = "";
    document.body.prepend(mount);
  }

  const currentPath = window.location.pathname.replace(/\/$/, "") || "/";
  const links = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects/" },
    { label: "Blogs", href: "/blogs/" },
    { label: "Profile", href: "/profile/" },
    { label: "Disclaimer", href: "/disclaimer/" }
  ];

  mount.innerHTML = `
    <header class="topbar">
      <a class="top-title" href="/"><img src="/assets/fox.svg" alt="Fox">Janorovic<span>Volkov</span></a>
      <nav class="top-nav" aria-label="Main navigation">
        ${links.map((link) => `
          <a class="${currentPath === link.href.replace(/\/$/, "") || (link.href === "/" && currentPath === "/") ? "active" : ""}" href="${link.href}">${link.label}</a>
        `).join("")}
      </nav>
      <a class="header-link" href="mailto:janorovicvolkov@gmail.com">Get in touch <span>↗</span></a>
      <button id="menuBtn" aria-label="Open menu" aria-expanded="false">☰</button>
    </header>`;
}

document.addEventListener("DOMContentLoaded", () => {
  createSiteHeader();

  const btn = document.getElementById("menuBtn");
  const header = document.querySelector(".topbar");
  const year = document.getElementById("year");

  if (btn && header) {
    btn.addEventListener("click", () => {
      const isOpen = header.classList.toggle("menu-open");
      btn.setAttribute("aria-expanded", isOpen);
    });
  }

  if (year) year.textContent = new Date().getFullYear();

  setTimeout(() => {
    document.body.classList.remove("intro");
  }, 900);
});
