// Runs before paint; storage is optional (e.g. private browsing).
(() => {
  let lang = new URLSearchParams(location.search).get("lang");
  if (!["zh", "en"].includes(lang)) {
    try {
      lang = localStorage.getItem("portfolio-lang");
    } catch {}
  }
  document.documentElement.lang = lang === "en" ? "en" : "zh-CN";
})();
