document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("menuBtn");
  const sidebar = document.getElementById("sidebar");

  btn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
  });

  setTimeout(() => {
    document.body.classList.remove("intro");
  }, 900);
});
