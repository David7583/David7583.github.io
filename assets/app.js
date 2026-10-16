const languageButton = document.querySelector(".language");
function syncLanguage() {
  const en = document.documentElement.lang === "en";
  languageButton.textContent = en ? "中文" : "EN";
  languageButton.setAttribute(
    "aria-label",
    en ? "中文：切换语言" : "EN: Switch to English",
  );
  document
    .querySelectorAll("[data-label-en]")
    .forEach((el) =>
      el.setAttribute(
        "aria-label",
        en ? el.dataset.labelEn : el.dataset.labelZh,
      ),
    );
  document.querySelectorAll("img[data-alt-en]").forEach((img) => {
    img.alt = en ? img.dataset.altEn : img.dataset.altZh;
  });
  document.querySelectorAll("a[href]").forEach((link) => {
    const url = new URL(link.href);
    if (url.origin === location.origin && /\.html$/.test(url.pathname)) {
      url.searchParams.set("lang", en ? "en" : "zh");
      link.href = url.pathname + url.search + url.hash;
    }
  });
}
syncLanguage();
languageButton.addEventListener("click", () => {
  const en = document.documentElement.lang !== "en";
  document.documentElement.lang = en ? "en" : "zh-CN";
  try {
    localStorage.setItem("portfolio-lang", en ? "en" : "zh");
  } catch {}
  const url = new URL(location.href);
  url.searchParams.set("lang", en ? "en" : "zh");
  history.replaceState(null, "", url);
  syncLanguage();
});
const dialog = document.querySelector(".lightbox");
document.querySelectorAll("[data-zoom]").forEach((link) => {
  link.addEventListener("click", (event) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey)
      return;
    if (typeof dialog.showModal !== "function") return;
    event.preventDefault();
    const image = dialog.querySelector("img");
    image.src = link.href;
    image.alt = link.querySelector("img").alt;
    dialog.querySelector(".original-image").href = link.href;
    dialog.querySelector("p").textContent = link
      .closest("figure")
      .querySelector("figcaption").innerText;
    dialog.showModal();
  });
});
dialog
  .querySelector(".close-lightbox")
  .addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});
document
  .querySelector(".print")
  ?.addEventListener("click", () => window.print());
