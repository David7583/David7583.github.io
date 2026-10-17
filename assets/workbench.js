import { steps, nextStep, panelContent, t } from "./workbench-data.mjs";

const lab = document.querySelector("[data-flow-lab]");
if (lab) {
  const nodes = [...lab.querySelectorAll("[data-node]")];
  const previous = lab.querySelector("[data-flow-prev]");
  const next = lab.querySelector("[data-flow-next]");
  const tour = lab.querySelector("[data-flow-tour]");
  const panel = lab.querySelector("#node-details");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  let current = 0,
    inspected = 0,
    timer = null;
  const visited = new Set([0]);
  function inspect(index) {
    inspected = index;
    panel.innerHTML = panelContent(index);
    nodes.forEach((button, i) =>
      button.parentElement.classList.toggle(
        "is-inspected",
        i === index && i !== current,
      ),
    );
  }
  function render() {
    nodes.forEach((button, i) => {
      button.setAttribute("aria-pressed", String(i === current));
      const node = button.parentElement;
      node.classList.toggle("is-active", i === current);
      node.classList.toggle("is-visited", visited.has(i) && i !== current);
      button.querySelector(".node-state").innerHTML =
        i === current
          ? t("当前步骤", "Current step")
          : visited.has(i)
            ? t("已浏览", "Explored")
            : t("待浏览", "To explore");
    });
    previous.disabled = current === 0;
    next.disabled = current === steps.length - 1;
    lab.querySelector("[data-step-count]").textContent =
      `0${current + 1} / 0${steps.length}`;
    tour.setAttribute("aria-pressed", String(timer !== null));
    tour.innerHTML =
      timer !== null
        ? t("暂停导览", "Pause tour")
        : t("开始导览", "Start guided tour");
    lab.classList.toggle("is-touring", timer !== null);
    inspect(current);
  }
  function pause() {
    if (timer !== null) {
      clearInterval(timer);
      timer = null;
    }
    render();
  }
  function select(index) {
    current = index;
    visited.add(index);
    pause();
  }
  nodes.forEach((button, i) => {
    button.addEventListener("click", () => select(i));
    button.addEventListener("pointerenter", (event) => {
      if (event.pointerType !== "touch" && timer === null) inspect(i);
    });
    button.addEventListener("pointerleave", () => {
      if (!button.matches(":focus-visible")) inspect(current);
    });
    button.addEventListener("focus", () => inspect(i));
    button.addEventListener("blur", () => {
      if (inspected === i) inspect(current);
    });
    button.addEventListener("keydown", (event) => {
      let target;
      if (["ArrowRight", "ArrowDown"].includes(event.key))
        target = nextStep(i, 1);
      if (["ArrowLeft", "ArrowUp"].includes(event.key))
        target = nextStep(i, -1);
      if (event.key === "Home") target = 0;
      if (event.key === "End") target = steps.length - 1;
      if (target !== undefined) {
        event.preventDefault();
        select(target);
        nodes[target].focus();
      }
    });
  });
  previous.addEventListener("click", () => select(nextStep(current, -1)));
  next.addEventListener("click", () => select(nextStep(current, 1)));
  lab.querySelector("[data-flow-reset]").addEventListener("click", () => {
    visited.clear();
    select(0);
  });
  tour.addEventListener("click", () => {
    if (timer !== null) {
      pause();
      return;
    }
    if (reduced.matches) return;
    if (current === steps.length - 1) {
      current = 0;
      visited.clear();
      visited.add(0);
    }
    timer = setInterval(() => {
      current = nextStep(current, 1);
      visited.add(current);
      if (current === steps.length - 1) {
        clearInterval(timer);
        timer = null;
      }
      render();
    }, 3000);
    render();
  });
  const respectMotion = () => {
    pause();
    tour.disabled = reduced.matches;
    lab.querySelector(".reduced-note").hidden = !reduced.matches;
  };
  reduced.addEventListener("change", respectMotion);
  respectMotion();
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) pause();
  });
  document
    .querySelector("[data-product-video]")
    ?.addEventListener("play", pause);
  window.addEventListener("pagehide", pause);
}

const video = document.querySelector("[data-product-video]");
if (video) {
  const shell = video.closest(".film-shell");
  const cover = shell.querySelector(".film-cover");
  const error = shell.querySelector(".film-error");
  const start = async () => {
    error.hidden = true;
    if (!video.getAttribute("src")) {
      video.src = video.dataset.source;
      video.querySelectorAll("track").forEach((track) => {
        track.src = track.dataset.source;
        track.default =
          track.srclang ===
          (document.documentElement.lang === "en" ? "en" : "zh");
      });
    }
    cover.hidden = true;
    video.hidden = false;
    video.focus();
    try {
      await video.play();
    } catch {
      error.hidden = false;
    }
  };
  video.setAttribute("tabindex", "0");
  shell.querySelector(".film-start").addEventListener("click", start);
  shell.querySelector(".film-retry").addEventListener("click", () => {
    video.load();
    start();
  });
  video.addEventListener("error", () => {
    error.hidden = false;
  });
}
