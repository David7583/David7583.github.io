import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import { steps, nextStep, panelContent, t } from "../assets/workbench-data.mjs";

// Run the shipped event handlers with a minimal DOM surface and a controlled clock.
// Real rendering, keyboard focus and reduced motion are also checked in the browser.
function fixture() {
  class Element {
    listeners = new Map();
    attributes = new Map();
    classes = new Set();
    classList = {
      toggle: (name, enabled) =>
        enabled ? this.classes.add(name) : this.classes.delete(name),
    };
    addEventListener(name, listener) {
      this.listeners.set(name, listener);
    }
    fire(name, event = {}) {
      this.listeners.get(name)?.(event);
    }
    setAttribute(name, value) {
      this.attributes.set(name, value);
    }
    matches() {
      return false;
    }
    focus() {
      this.fire("focus");
    }
  }
  const selectors = [
    "[data-flow-prev]",
    "[data-flow-next]",
    "[data-flow-tour]",
    "[data-flow-reset]",
    "[data-step-count]",
    "#node-details",
    ".reduced-note",
  ];
  const elements = Object.fromEntries(selectors.map((s) => [s, new Element()]));
  const nodes = steps.map(() => {
    const node = new Element();
    node.parentElement = new Element();
    node.state = new Element();
    node.querySelector = () => node.state;
    return node;
  });
  const lab = new Element();
  lab.querySelector = (s) => elements[s];
  lab.querySelectorAll = () => nodes;
  const document = new Element();
  document.querySelector = (s) => (s === "[data-flow-lab]" ? lab : null);
  document.hidden = false;
  const window = new Element();
  const motion = new Element();
  motion.matches = false;
  const timers = new Map();
  let timerId = 0;
  const source = readFileSync("assets/workbench.js", "utf8").replace(
    /^import[^;]+;/,
    "",
  );
  vm.runInNewContext(source, {
    steps,
    nextStep,
    panelContent,
    t,
    document,
    window,
    matchMedia: () => motion,
    setInterval: (fn) => {
      timers.set(++timerId, fn);
      return timerId;
    },
    clearInterval: (id) => timers.delete(id),
  });
  return {
    elements,
    nodes,
    lab,
    document,
    window,
    motion,
    timers,
    click: (s) => elements[s].fire("click"),
    tick: () => [...timers.values()].forEach((fn) => fn()),
    count: () => elements["[data-step-count]"].textContent,
  };
}

test("guided tour advances, stops at the final node and restarts cleanly", () => {
  const f = fixture();
  f.click("[data-flow-tour]");
  assert.equal(f.timers.size, 1);
  assert.equal(f.lab.classes.has("is-touring"), true);
  for (let i = 0; i < 4; i++) f.tick();
  assert.equal(f.count(), "05 / 05");
  assert.equal(f.timers.size, 0);
  assert.equal(f.elements["[data-flow-next]"].disabled, true);
  f.click("[data-flow-tour]");
  assert.equal(f.count(), "01 / 05");
  f.tick();
  assert.equal(f.count(), "02 / 05");
  f.click("[data-flow-tour]");
  assert.equal(f.timers.size, 0);
});

test("manual selection, reset, hidden tabs and reduced motion cancel timers", () => {
  const f = fixture();
  f.click("[data-flow-tour]");
  f.nodes[2].fire("click");
  assert.equal(f.count(), "03 / 05");
  assert.equal(f.timers.size, 0);
  f.click("[data-flow-reset]");
  assert.equal(f.count(), "01 / 05");
  assert.equal(f.nodes[2].parentElement.classes.has("is-visited"), false);
  f.click("[data-flow-tour]");
  f.document.hidden = true;
  f.document.fire("visibilitychange");
  assert.equal(f.timers.size, 0);
  f.click("[data-flow-tour]");
  f.motion.matches = true;
  f.motion.fire("change");
  assert.equal(f.timers.size, 0);
  assert.equal(f.elements["[data-flow-tour]"].disabled, true);
  f.click("[data-flow-tour]");
  assert.equal(f.timers.size, 0);
  f.motion.matches = false;
  f.motion.fire("change");
  f.click("[data-flow-tour]");
  f.window.fire("pagehide");
  assert.equal(f.timers.size, 0);
});
