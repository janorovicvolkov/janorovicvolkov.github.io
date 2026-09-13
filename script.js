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
        <a class="header-link" href="/"><img src="/assets/fox.svg" alt="Fox">Janorovic<span>Volkov</span></a>
        <nav class="top-nav" aria-label="Main navigation">
          ${links.map((link) => `
            <a class="${currentPath === link.href.replace(/\/$/, "") || (link.href === "/" && currentPath === "/") ? "active" : ""}" href="${link.href}">${link.label}</a>
          `).join("")}
        </nav>
        <button id="menuBtn" aria-label="Open menu" aria-expanded="false">☰</button>
      </header>`;
}

function createSiteFooter() {
    let mount = document.querySelector("[data-site-footer]");
    if (!mount) {
        mount = document.createElement("div");
        mount.dataset.siteFooter = "";
        document.body.append(mount);
    }
    mount.innerHTML = `
      <footer class="site-footer">
        <span>© <span id="year">${new Date().getFullYear()}</span> Janorovic Volkov</span>
        <span>Designed with curiosity <i>✦</i></span>
      </footer>`;
}

document.addEventListener("DOMContentLoaded", () => {
    createSiteHeader();
    createSiteFooter();
    const btn = document.getElementById("menuBtn");
    const header = document.querySelector(".topbar");
    if (btn && header) {
        btn.addEventListener("click", () => {
            const isOpen = header.classList.toggle("menu-open");
            btn.setAttribute("aria-expanded", isOpen);
        });
    }
    setTimeout(() => {
        document.body.classList.remove("intro");
    }, 900);
  });