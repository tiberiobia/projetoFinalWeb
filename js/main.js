// modo escuro/claro
(function theme() {
  const html = document.documentElement;// constante que seleciona o elemento raiz do documento
  const btn = document.getElementById("themeToggle");// constante que seleciona o botão de alternância de tema
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;// constante que verifica se o sistema do usuário prefere o modo escuro

  const apply = (t) => {
    const isDark = t === "dark";
    html.setAttribute("data-bs-theme", t);
    if (btn) {
      btn.textContent = isDark ? "☀️ Claro" : "🌙 Escuro";
      btn.setAttribute("aria-label", isDark ? "Mudar para modo claro" : "Mudar para modo escuro");
    }
  };

  apply(localStorage.getItem("theme") || (systemDark ? "dark" : "light"));

  btn?.addEventListener("click", () => {
    const next = html.getAttribute("data-bs-theme") === "dark" ? "light" : "dark";
    localStorage.setItem("theme", next);
    apply(next);
  });
})();