/* MAE. Inside the Short: layer-by-layer breakdown on the Court & Field page.
   Ported from MAE-inside-the-short.html. Same behavior and wording:
   tap the short or "Break it down" to split it into its layers, tap a number to show that layer,
   arrow keys and spacebar step through, Escape puts it back together.

   To add Run & Lift later: copy the "courtField" block below into a "runLift" block with its own
   photos, strips, markers and layers. The Court & Field / Run & Lift switch appears on its own once there are two lines. */
(function () {
  "use strict";
  const root = document.getElementById("inside");
  if (!root) return;

  const IMG = "assets/img/";
  const FITS = {
    courtField: {
      label: "Court &amp; Field",
      tab: "For the Game Short",
      kicker: "Court &amp; Field · 5\" Inseam",
      title: "The details.",
      sub: "Six layers. Every one has a reason.",
      cardFit: "Court &amp; Field",
      assembled: IMG + "court-field-front.jpg?v=9",
      exploded: IMG + "court-field-exploded.jpg?v=10",
      // y0/y1 are pixel rows of the exploded photo (1200 tall); from = where the piece starts before it slides out
      strips: [
        { cls: "s-waist", l: 1, y0: 0, y1: 215, from: "translateY(42%)", z: 3,
          marks: [{ l: 1, x: 76, y: 47, lab: "Waistband" }] },
        { cls: "s-shell", l: 2, y0: 215, y1: 675, from: "translateY(0)", z: 5,
          marks: [{ l: 2, x: 58, y: 30, lab: "Outer shell" }, { l: 3, x: 16, y: 30, lab: "The verse", left: true }, { l: 5, x: 38, y: 86, lab: "Hem" }] },
        { cls: "s-liner", l: 4, y0: 675, y1: 1045, from: "translateY(-58%)", z: 2,
          marks: [{ l: 4, x: 62, y: 36, lab: "Undershort" }] },
        { cls: "s-patch", l: 6, y0: 1045, y1: 1200, from: "translateY(-210%)", z: 1,
          marks: [{ l: 6, x: 68, y: 42, lab: "Patch" }] },
      ],
      layers: [
        null,
        { n: "01", t: "The Waistband", img: "court-field-waist.jpg?v=9", what: "<b>Soft navy elastic</b> on a short 9\" rise, with an inside drawcord.",
          why: "Girls roll their shorts because the rise, the distance from the crotch to the waistband, is cut too long. This one has a 9\" rise, so the waistband sits low on the hips, just below the belly button. It is already where she wants it." },
        { n: "02", t: "The Outer Shell", img: "court-field-side.jpg?v=9", what: "<b>Shiny navy dazzle</b>, 5\" inseam, relaxed cut.",
          why: "The 90s court shine, cut for her. Loose and flowy, so it moves without clinging. Relaxed, not tight, not showy." },
        { n: "03", t: "The Verse", img: "court-field-tape.jpg?v=6", what: "<b>Cream mesh side panel</b> with emerald woven tape: FAINT, YET PURSUING · 8:4.",
          why: "The mesh lets heat out where she needs it. The tape is Judges 8:4. Gideon started with 32,000 men, and in the end 300 stayed. Outnumbered and exhausted, they stayed in the fight. Every girl who wears it carries that." },
        { n: "04", t: "The Undershort", img: "court-field-liner.jpg?v=6", what: "<b>Featherlight, opaque, squat-proof.</b> Silicone gripper at the leg.",
          why: "Built in and so thin she forgets it's there. The gripper keeps it from riding up, and it's cut shorter than the shell so it never peeks out. Nothing shows. Nothing chafes." },
        { n: "05", t: "The Hem", img: "court-field-hem.jpg?v=9", what: "<b>Straight hem</b>, no slits, wider leg opening.",
          why: "No curve up the sides, so it stays modest when she sprints, jumps, or squats." },
        { n: "06", t: "The Patch", img: "court-field-patch.jpg?v=8", what: "<b>MAE. in court red</b> on a cream patch, lower left leg.",
          why: "The mark on every piece. Modest with a why. Brand new and bright now, with a vintage wash coming in production." },
      ],
      viewsTitle: "For the Game Short",
      viewsNote: "Drop 01 · Navy dazzle · Cream mesh · Emerald verse tape",
      views: [
        { src: "court-field-front.jpg?v=9", cap: "Front" }, { src: "court-field-back.jpg?v=9", cap: "Back" },
        { src: "court-field-side.jpg?v=9", cap: "Side" }, { src: "court-field-court.jpg?v=3", cap: "On the court" },
      ],
      introImg: { src: "court-field-model.jpg?v=1", alt: "The For the Game Short, worn" },
      introHead: "A short she won't want to roll.",
      introText: "Most \"modest\" shorts are just longer. These were rebuilt layer by layer for girls who play.",
    },
    runLift: {
      label: "Run &amp; Lift",
      tab: "MAE. Short",
      kicker: "Run &amp; Lift · 4\" Inseam",
      title: "The details.",
      sub: "Six layers. Every one has a reason.",
      cardFit: "Run &amp; Lift",
      assembled: IMG + "run-lift-front.jpg?v=8",
      exploded: IMG + "run-lift-exploded.jpg?v=10",
      strips: [
        { cls: "s-waist", l: 1, y0: 0, y1: 215, from: "translateY(42%)", z: 3,
          marks: [{ l: 1, x: 76, y: 47, lab: "Waistband" }] },
        { cls: "s-shell", l: 2, y0: 215, y1: 675, from: "translateY(0)", z: 5,
          marks: [{ l: 2, x: 58, y: 30, lab: "Outer shell" }, { l: 3, x: 16, y: 28, lab: "Side panel", left: true }, { l: 5, x: 38, y: 90, lab: "Hem" }] },
        { cls: "s-liner", l: 4, y0: 675, y1: 1045, from: "translateY(-58%)", z: 2,
          marks: [{ l: 4, x: 62, y: 36, lab: "Undershort" }] },
        { cls: "s-patch", l: 6, y0: 1045, y1: 1200, from: "translateY(-210%)", z: 1,
          marks: [{ l: 6, x: 68, y: 42, lab: "Patch" }] },
      ],
      layers: [
        null,
        { n: "01", t: "The Waistband", img: "run-lift-waist.jpg?v=6", what: "<b>Wide cream elastic</b> on a shorter rise, trimmed in pink.",
          why: "The rise, crotch to waistband, is cut short, so the waistband sits low on the hips and stays flat through a squat. She never has to pull it up or roll it down between sets." },
        { n: "02", t: "The Outer Shell", img: "run-lift-side.jpg?v=6", what: "<b>Bone satin</b>, 4\" inseam, relaxed cut.",
          why: "Light enough for a long run, loose enough to move, and it never clings." },
        { n: "03", t: "The Side Panel", img: "run-lift-panel.jpg?v=6", what: "<b>Pink panels</b> with court red stripes.",
          why: "Vintage track stripes, cut for her. The panels give her room to stride." },
        { n: "04", t: "The Undershort", img: "run-lift-liner.jpg?v=6", what: "<b>White, opaque, squat-proof.</b> Silicone gripper at the leg.",
          why: "Tested at full-depth squats and lunges. It stays down on box jumps and never peeks out." },
        { n: "05", t: "The Hem", img: "run-lift-hem.jpg?v=6", what: "<b>Curved runner's hem</b>, no slits.",
          why: "The curve gives her stride room. No slits, so it stays modest at full speed." },
        { n: "06", t: "The Patch", img: "run-lift-patch.jpg?v=8", what: "<b>MAE. in court red</b> on a cream patch, lower leg. The same tag as the Court &amp; Field.",
          why: "The mark on every piece. Modest with a why." },
      ],
      viewsTitle: "MAE. Short",
      viewsNote: "Drop 01 · Bone satin · Pink panels · Red stripes",
      views: [
        { src: "run-lift-front.jpg?v=8", cap: "Front" }, { src: "run-lift-back.jpg?v=6", cap: "Back" },
        { src: "run-lift-side.jpg?v=6", cap: "Side" }, { src: "run-lift-track-run.jpg", cap: "On the track" },
      ],
      introImg: { src: "run-lift-street.jpg?v=1", alt: "The MAE. Short and MAE. Shirt, worn on a New York street" },
      introHead: "A short that keeps up.",
      introText: "Most \"modest\" shorts are just longer. This one was rebuilt layer by layer for the run and the rack.",
    },
  };

  const keys = Object.keys(FITS);
  let fit = FITS[root.dataset.fit] || FITS[keys[0]], open = false, cur = 0, inView = false;

  root.innerHTML = `
    <div class="its-head">
      <div>
        <div class="its-kicker cond" id="its-kicker"></div>
        <h2 class="its-title" id="inside-title"></h2>
        <p class="its-sub" id="its-sub"></p>
      </div>
      <div class="its-controls">
        <div class="its-fits" id="its-fits" role="group" aria-label="Pick a fit" ${keys.length > 1 ? "" : "hidden"}>
          ${keys.map((k) => `<button type="button" data-fit="${k}">${FITS[k].tab || FITS[k].label}</button>`).join("")}
        </div>
        <button class="its-btn red" id="its-toggle" type="button">Break it down</button>
      </div>
    </div>
    <div class="its-main">
      <div class="its-stageWrap">
        <div class="its-stage" id="its-stage"></div>
        <p class="its-hint" id="its-hint">Tap the short to break it down</p>
      </div>
      <aside class="its-panel"><div class="its-card" id="its-card"></div></aside>
    </div>
    <div class="its-views">
      <div class="its-viewsHead"><h3 id="its-views-title"></h3></div>
      <div class="its-grid" id="its-grid"></div>
    </div>`;

  const $ = (id) => document.getElementById(id);
  const stage = $("its-stage"), card = $("its-card"), btn = $("its-toggle"), hint = $("its-hint");

  function build() {
    $("its-kicker").innerHTML = fit.kicker;
    $("inside-title").innerHTML = fit.title;
    $("its-sub").textContent = fit.sub;
    $("its-views-title").textContent = fit.viewsTitle;
    $("its-grid").innerHTML = fit.views.map((v) =>
      `<figure><img src="${IMG + v.src}" alt="${v.cap}" loading="lazy"><figcaption>${v.cap}</figcaption></figure>`).join("");
    $$("#its-fits button").forEach((b) => b.setAttribute("aria-pressed", String(FITS[b.dataset.fit] === fit)));

    stage.innerHTML = `<div class="its-assembled" id="its-assembled"><img src="${fit.assembled}" alt="MAE. ${fit.label} short, assembled"></div>` +
      fit.strips.map((s) => `
        <div class="its-strip ${s.cls}" data-l="${s.l}" data-y0="${s.y0}" data-y1="${s.y1}" data-from="${s.from}" style="z-index:${s.z}">
          <div class="crop"><img src="${fit.exploded}" alt=""></div>
          ${s.marks.map((m) => `<button class="mk${m.left ? " left" : ""}" type="button" data-l="${m.l}" style="left:${m.x}%;top:${m.y}%"><span class="num">0${m.l}</span><span class="lab">${m.lab}</span></button>`).join("")}
        </div>`).join("");

    stage.querySelectorAll(".its-strip").forEach((s) => {
      const y0 = +s.dataset.y0, y1 = +s.dataset.y1, h = y1 - y0;
      s.style.top = (y0 / 1200 * 100) + "%"; s.style.height = (h / 1200 * 100) + "%";
      const im = s.querySelector(".crop img"); im.style.height = (1200 / h * 100) + "%"; im.style.top = (-y0 / h * 100) + "%";
      s.style.transform = s.dataset.from;
      s.addEventListener("click", (e) => { if (!e.target.closest(".mk") && open) select(+s.dataset.l); });
    });
    stage.querySelectorAll(".mk").forEach((m) => m.addEventListener("click", (e) => { e.stopPropagation(); select(+m.dataset.l); }));
    $("its-assembled").onclick = () => setOpen(true);
    open = false; cur = 0;
    stage.classList.remove("open", "focus");
    btn.textContent = "Break it down"; btn.classList.add("red"); btn.classList.remove("ghost");
    hint.textContent = "Tap the short to break it down";
    renderIntro();
  }
  function $$(sel) { return [...root.querySelectorAll(sel)]; }

  function setOpen(v) {
    open = v; stage.classList.toggle("open", v);
    if (v) {
      const m = root.querySelector(".its-main"); const y = m.getBoundingClientRect().top + scrollY - 72;
      if (Math.abs(scrollY - y) > 20) scrollTo({ top: y, behavior: "smooth" });
    }
    stage.querySelectorAll(".its-strip").forEach((s) => { s.style.transform = v ? "" : s.dataset.from; });
    btn.textContent = v ? "Put it back together" : "Break it down";
    btn.classList.toggle("red", !v); btn.classList.toggle("ghost", v);
    hint.textContent = v ? "Tap a number on the short to see each layer" : "Tap the short to break it down";
    if (!v) { cur = 0; stage.classList.remove("focus"); renderIntro(); mark(); }
  }
  function select(i) {
    if (!open) { setOpen(true); setTimeout(() => select(i), 550); return; }
    cur = i; stage.classList.add("focus"); mark(); renderLayer(i);
  }
  function mark() {
    stage.querySelectorAll(".its-strip").forEach((s) => {
      const ls = [+s.dataset.l, ...[...s.querySelectorAll(".mk")].map((m) => +m.dataset.l)];
      s.classList.toggle("on", ls.includes(cur));
    });
    stage.querySelectorAll(".mk").forEach((m) => m.classList.toggle("on", +m.dataset.l === cur));
  }
  const count = () => fit.layers.length - 1;
  // No Prev / numbered squares / Next row: people tap the short itself to step through the layers.
  function nav() { return ""; }
  function wire() {
    card.querySelectorAll(".dot").forEach((d) => { d.onclick = () => select(+d.dataset.i); });
    const p = card.querySelector("#its-prev"), n = card.querySelector("#its-next");
    if (p) p.onclick = () => step(-1);
    if (n) n.onclick = () => step(1);
    card.querySelectorAll(".introList li").forEach((li) => { li.onclick = () => select(+li.dataset.i); });
  }
  function renderIntro() {
    card.innerHTML = `<div class="cardTop"><span class="cond">Inside the short</span><span class="cond">${fit.label}</span></div>
      <div class="cardBody intro">
        <div class="cond big">${fit.introHead}</div>
        <p class="what">${fit.introText}</p>
        <img class="detail introImg${fit.introImg ? " introImg--tall" : ""}" src="${IMG + (fit.introImg ? fit.introImg.src : fit.views[3].src)}" alt="${fit.introImg ? fit.introImg.alt : `The ${fit.label} short, ${fit.views[3].cap.toLowerCase()}`}">
        <ul class="introList">${fit.layers.slice(1).map((l, k) => `<li data-i="${k + 1}"><span>${l.n}</span>${l.t}</li>`).join("")}</ul>
      </div>${nav()}`;
    wire();
  }
  function renderLayer(i) {
    const l = fit.layers[i];
    card.innerHTML = `<div class="cardTop"><span class="cond">Layer ${l.n} of 0${count()}</span><span class="cond">${fit.cardFit}</span></div>
      <div class="cardBody">
        <div class="cardHead"><div class="bigNum">${l.n}</div><h3>${l.t}</h3></div>
        <img class="detail" style="object-position:${l.pos || "center"}" src="${IMG + l.img}" alt="${l.t}">
        <p class="what">${l.what}</p>
        <div class="why"><span class="cond">Why it's there</span><p>${l.why}</p></div>
      </div>${nav()}`;
    wire();
  }
  function step(d) {
    if (!open) { setOpen(true); setTimeout(() => select(1), 550); return; }
    select(Math.min(count(), Math.max(1, (cur || 0) + d)));
  }

  btn.onclick = () => setOpen(!open);
  $$("#its-fits button").forEach((b) => { b.onclick = () => { fit = FITS[b.dataset.fit]; build(); }; });

  // Keyboard: only while the section is on screen, so the rest of the page still scrolls normally.
  if ("IntersectionObserver" in window) {
    new IntersectionObserver((es) => es.forEach((e) => { inView = e.isIntersecting; }), { threshold: 0.35 }).observe(root);
  }
  document.addEventListener("keydown", (e) => {
    if (!inView || e.target.closest("input, textarea, select")) return;
    if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") { e.preventDefault(); step(1); }
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); if (cur > 1) step(-1); }
    else if (e.key === "Escape") { setOpen(false); }
    else if (e.key === "Enter" && !e.target.closest("a, button")) { setOpen(!open); }
    else if (e.key === "b") { setOpen(!open); }
  });

  // swipe on the card
  let sx = null;
  card.addEventListener("touchstart", (e) => { sx = e.touches[0].clientX; }, { passive: true });
  card.addEventListener("touchend", (e) => {
    if (sx === null) return;
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
    sx = null;
  });

  build();

  // Coming from the home page link: land on the section
  if (location.hash === "#inside") requestAnimationFrame(() => root.scrollIntoView({ block: "start" }));
})();
