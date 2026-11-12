/* MAE. site logic: products, bag, nav, map, forms, checkout.
   Prices and checkout settings live in CONFIG and PRODUCTS below. */

(function () {
  "use strict";
  document.documentElement.classList.remove("no-js");

  /* Every page opens at the top, even when the browser or viewer would keep the old scroll spot.
     Links to a #section still jump to that section. */
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  const toTop = () => { if (!location.hash) window.scrollTo({ top: 0, left: 0, behavior: "instant" }); };
  toTop();
  window.addEventListener("pageshow", toTop);
  window.addEventListener("load", toTop);

  /* ================= SURVEY: swap the final numbers here =================
     Real numbers from the Google Form only. No rounding up.
     Shown on Our Why ("We asked her.") as percents (rounded down) and on the Drop 01 hero. */
  const SURVEY = {
    total: 50,                     // total responses
    date: "November 2026",
    stats: [
      { yes: 49, label: "Roll, pull down, or adjust their shorts during a workout" },
      { yes: 44, label: "Say no brand has ever asked what they need" },
      { yes: 48, label: "Are more likely to buy from a brand started by a female athlete" },
    ],
    quote: "I want something trendy but also modest and functional!",
    demand: 48,                    // Drop 01 line: more likely to buy from a female-athlete-founded brand
  };

  /* ================= OUR WHY STATS: the big red numbers that count up as you scroll ================= */
  const WHY_STATS = {
    source: "Source: Nielsen, 2026.",
    stats: [
      { to: 46, suffix: " BILLION", label: "Minutes of women's sports watched in 2025" },
      { to: 60, suffix: "%", label: "Of those fans switched brands over a company's values" },
    ],
  };

  /* ================= CONFIG: change prices and checkout here ================= */
  const CONFIG = {
    currency: "USD",
    freeShippingOver: 75,
    shipping: 6,
    // Paste a real checkout URL (Stripe Payment Link or Shopify) to send shoppers there.
    // Leave null to run the Drop 01 pre-order flow on checkout.html.
    checkoutUrl: null,
    // Google Apps Script web app link (see order-email/SETUP.md). Each pre-order is emailed to
    // wearmae.co@gmail.com and logged in the "MAE. Pre-orders" sheet. Leave null to skip.
    orderInboxUrl: "https://script.google.com/macros/s/AKfycbxRxBQHsYCV5VlhwwLq4JTzO1_ML6yQkN6TsjHN0epa0egK56tsBDmlZXmjrR5CM5vOXg/exec",
  };

  const PRODUCTS = {
    "athlete-short": {
      fit: "athlete", piece: "short", name: "For the Game Short", price: 48,
      specs: '5" · 9" rise · hidden liner', color: "Navy / Green stripe", hex: "#1f2f6b",
      img: "assets/img/court-field-short.jpg?v=9", alt: "For the Game Short, front: a shiny navy short with a straight hem, cream mesh side panels, emerald verse tape, and a MAE. patch on the leg",
      back: "assets/img/court-field-short-back.jpg?v=9", backAlt: "For the Game Short, back: navy with cream mesh side panels and emerald tape reading FAINT, YET PURSUING 8:4",
    },
    "athlete-tee": {
      fit: "athlete", piece: "top", name: "For the 300 Shirt", price: 38,
      specs: "Boxy · front and back graphic", color: "Cream", hex: "#ede2d1",
      img: "assets/img/court-field-tee-front.jpg?v=6", alt: "For the 300 Shirt, front: a cream tee with green sport figures and For the 300.",
      back: "assets/img/court-field-tee-back.jpg?v=6", backAlt: "For the 300 Shirt, back: JUDGES 8:4 and FAINT, YET PURSUING",
    },
    "hybrid-short": {
      fit: "hybrid", piece: "short", name: "MAE. Run & Lift Short", price: 48,
      specs: '4" · squat-proof', color: "Cream / Pink panel", hex: "#ece4d4",
      img: "assets/img/run-lift-short.jpg?v=9", alt: "MAE. Run & Lift Short, front: a cream run short with a pink-trimmed waistband, pink side panels with red stripes, and a MAE. patch on the leg",
      back: "assets/img/run-lift-short-back.jpg?v=9", backAlt: "MAE. Run & Lift Short, back: cream with pink side panels and red stripes",
    },
    "hybrid-top": {
      fit: "hybrid", piece: "top", name: "MAE. Run & Lift Top", price: 38,
      specs: "Breathable · front and back graphic", color: "Golden Yellow", hex: "#e9c96a",
      img: "assets/img/run-lift-top-front.jpg?v=6", alt: "MAE. Run & Lift Top, front: a golden yellow cap-sleeve top with a red MAE. logo and a green runner across the chest",
      back: "assets/img/run-lift-top-back.jpg?v=6", backAlt: "MAE. Run & Lift Top, back: the MAE. runner logo over a striped bar and MODESTY MEETS THE MOMENT",
    },
  };
  const SIZES = ["XS", "S", "M", "L", "XL"];

  const FITS = {
    athlete: {
      title: "Court & Field", url: "court-field.html", sports: "Basketball · Soccer · Tennis · Volleyball",
      pieces: ["athlete-short", "athlete-tee"],
      why: [
        ["Shorter rise", "why she rolls", "The rise is the distance from the crotch to the waistband. Most shorts cut it long, so the waistband rides up past the belly button and girls roll it down. MAE. cuts a 9\" rise, so the waistband already sits low on the hips, just below the belly button, right where she wants it."],
        ['5" inseam', "covered and fast", "Long enough to stay covered at practice, short enough to stay fast. The leg opening is cut wider so it moves on a crossover instead of riding up."],
        ["Hidden liner", "no chafe, never shows", 'A built-in bike short liner with a 2.5" inseam sits under the 5" outer short. It stays hidden on a jump stop, a closeout, or a dive for a loose ball.'],
        ["Squat-proof", "opaque liner fabric", "The liner is cut from an opaque knit, so a low defensive stance is just a defensive stance."],
        ["Boxy tee", "For the 300. on front", "Relaxed through the body with regular sleeves and a regular neckline. Loose enough that nothing clings. For the 300. on the front, Judges 8:4 on the back."],
      ],
    },
    hybrid: {
      title: "Run & Lift", url: "run-lift.html", sports: "Running · Lifting",
      pieces: ["hybrid-short", "hybrid-top"],
      why: [
        ["Shorter rise", "nothing to roll", "The rise, crotch to waistband, is cut shorter, so the waistband sits low on the hips and stays there through a squat. Nothing to pull up or roll down between sets."],
        ['4" inseam', "run, lift, repeat", "A little shorter for open strides and deep squats, made for the whole hybrid session: miles in the morning, a squat rack in the afternoon. No side slits, so the hem stays where you put it."],
        ["Hidden liner", "silicone gripper, stays put", "A white liner with a silicone gripper at the hem keeps it down on long runs and box jumps. No tugging between sets."],
        ["Squat-proof", "tested for depth", "Opaque liner fabric, chosen to pass full-depth squat and lunge checks before Drop 01 ships."],
        ["Breathable top", "front and back graphic", "A light, airy knit that breathes on a Texas run, cut relaxed so it never clings. The MAE. runner on the front, where modesty meets the moment on the back."],
      ],
    },
  };

  // x/y are percentages of the illustrated map (assets/img/austin-map.jpg), at the pin tip
  const SPORTS = [
    { id: "basketball", name: "Basketball", place: "Rosewood Park courts, East Austin", fit: "athlete", bg: "#d9301f", fg: "#fff", x: 76.24, y: 34.62, side: "l",
      why: "Pickup runs need a short that moves on a closeout and never rides up. Wide leg opening, hidden liner, no rolling." },
    { id: "soccer", name: "Soccer", place: "Krieg Fields, Pleasant Valley", fit: "athlete", bg: "#f4c21e", fg: "#1d1b19", x: 90, y: 74.5, side: "l",
      why: "Sprint, cut, slide, repeat. The liner stays put, so you are never tugging at the hem between plays." },
    { id: "tennis", name: "Tennis", place: "Caswell Tennis Center", fit: "athlete", bg: "#2e5bdb", fg: "#fff", x: 30.48, y: 22.53, side: "r",
      why: "Reaching for a low ball should not mean thinking about your shorts. Opaque liner fabric through every lunge." },
    { id: "running", name: "Running", place: "Town Lake Loop, Lady Bird Lake", fit: "hybrid", bg: "#f26b1d", fg: "#1d1b19", x: 46, y: 53.5, side: "r",
      why: "Ten miles around the lake with zero chafe. A breathable top and a short that stays down the whole loop." },
    { id: "lifting", name: "Lifting", place: "The weight room, South Congress", fit: "hybrid", bg: "#1d1b19", fg: "#f5ebd7", x: 55.44, y: 75.26, side: "r",
      why: "Squats, deadlifts, box jumps. Squat-proof from the first rep to the last, with a top that never clings." },
    { id: "volleyball", name: "Volleyball", place: "Zilker Park sand courts", fit: "athlete", bg: "#fff", fg: "#d9301f", x: 24.88, y: 63.74, side: "r",
      why: "Dig, dive, and hit the sand. The hidden liner stays down when you land, and the short shakes off a sandy game." },
  ];

  /* ================= Helpers ================= */
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const money = (n) => "$" + n.toFixed(n % 1 ? 2 : 0);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* private mode: bag lasts for this page only */ } },
  };
  const ICON = {
    arrow: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6"/></svg>',
    plus: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
    close: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    menu: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M3 7h18M3 12h18M3 17h18"/></svg>',
    bag: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
    pin: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
  };
  const SPORT_ICON = {
    basketball: '<circle cx="24" cy="24" r="19"/><path d="M24 5v38M5 24h38M11 10c7 5 7 23 0 28M37 10c-7 5-7 23 0 28"/>',
    soccer: '<circle cx="24" cy="24" r="19"/><path d="M24 15l8 6-3 9h-10l-3-9z"/><path d="M24 15V6M32 21l8-3M29 30l5 8M19 30l-5 8M16 21l-8-3"/>',
    tennis: '<circle cx="24" cy="24" r="19"/><path d="M8 13c9 4 9 18 0 22M40 13c-9 4-9 18 0 22"/>',
    running: '<circle cx="24" cy="27" r="15"/><path d="M24 27V18M24 27l6 4M20 6h8M24 6v6M36 13l3-3"/>',
    volleyball: '<circle cx="24" cy="24" r="19"/><path d="M24 5c-3 9-1 17 6 23M43 25c-9-2-17 1-22 8M10 37c4-8 4-17-3-23M24 24L14 10M24 24l15-6M24 24l-1 19"/>',
    lifting: '<path d="M6 24h36"/><rect x="9" y="15" width="6" height="18" rx="1"/><rect x="33" y="15" width="6" height="18" rx="1"/><rect x="3" y="19" width="5" height="10" rx="1"/><rect x="40" y="19" width="5" height="10" rx="1"/>',
    run: '<circle cx="24" cy="24" r="19"/><path d="M24 12v12l8 5"/>',
    verse: '<path d="M8 8h14a4 4 0 0 1 4 4v28a3 3 0 0 0-3-3H8zM40 8H26a4 4 0 0 0-4 4v28a3 3 0 0 1 3-3h15z"/>',
  };
  const sportSvg = (id, color) => `<svg viewBox="0 0 48 48" fill="none" stroke="${color || "currentColor"}" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true">${SPORT_ICON[id]}</svg>`;

  /* Garment placeholders until the real mockups are in */
  function garmentSvg(id) {
    const p = PRODUCTS[id];
    const ink = "#1d1b19";
    const patch = (x, y, s = 1, r = -4) =>
      `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})"><rect x="-21" y="-10" width="42" height="20" fill="#f5ebd7" stroke="#d9301f" stroke-width="2"/><text x="0" y="5" text-anchor="middle" font-family="Shrikhand, Georgia, serif" font-size="12" fill="#d9301f">MAE.</text></g>`;
    if (p.piece === "short") {
      const main = id === "athlete-short" ? "#d9301f" : "#2b2926";
      const pipe = id === "athlete-short" ? "#f5ebd7" : "#8d8a84";
      const waist = id === "athlete-short" ? "#2e5bdb" : "#2b2926";
      const sheen = id === "athlete-short" ? '<path d="M50 40 L44 130" stroke="#fff" stroke-opacity=".25" stroke-width="10" stroke-linecap="round"/>' : "";
      return `<svg viewBox="0 0 200 175" role="img" aria-label="${esc(p.name)} placeholder sketch">
        <path d="M30 30 L170 30 L189 152 L112 161 L100 98 L88 161 L11 152 Z" fill="${main}" stroke="${ink}" stroke-width="2.5" stroke-linejoin="round"/>
        ${sheen}
        <path d="M30 30 L11 152 M170 30 L189 152" stroke="${pipe}" stroke-width="7"/>
        <path d="M14 148 L88 156 M112 156 L186 148" stroke="${pipe}" stroke-width="5"/>
        <rect x="28" y="12" width="144" height="20" fill="${waist}" stroke="${ink}" stroke-width="2.5"/>
        <path d="M96 30 q-6 18 -12 26 M104 30 q6 18 12 26" stroke="#f5ebd7" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        ${patch(146, 136)}
      </svg>`;
    }
    const athlete = id === "athlete-tee";
    const body = athlete ? "#ece1c9" : "#f5ebd7";
    const neck = athlete ? "M66 14 Q100 40 134 14" : "M66 14 Q100 24 134 14";
    const graphic = athlete
      ? `<rect x="64" y="64" width="72" height="44" fill="#f4c21e" stroke="${ink}" stroke-width="2"/><text x="100" y="94" text-anchor="middle" font-family="Shrikhand, Georgia, serif" font-size="22" fill="#d9301f">MAE.</text><text x="100" y="124" text-anchor="middle" font-family="Barlow Condensed, Arial Narrow, sans-serif" font-weight="700" font-size="11" letter-spacing="2" fill="${ink}">FAINT, YET PURSUING</text>`
      : `<text x="100" y="70" text-anchor="middle" font-family="Barlow Condensed, Arial Narrow, sans-serif" font-weight="700" font-size="10" letter-spacing="2" fill="${ink}">BACK VIEW</text><circle cx="100" cy="104" r="26" fill="none" stroke="#2e5bdb" stroke-width="3"/><text x="100" y="111" text-anchor="middle" font-family="Roboto Serif, Georgia, serif" font-weight="800" font-size="20" fill="#2e5bdb">31:25</text>`;
    return `<svg viewBox="0 0 200 192" role="img" aria-label="${esc(p.name)} placeholder sketch">
      <path d="M66 14 Q100 ${athlete ? 40 : 24} 134 14 L190 42 L175 86 L153 76 L153 182 L47 182 L47 76 L25 86 L10 42 Z" fill="${body}" stroke="${ink}" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="${neck}" fill="none" stroke="${ink}" stroke-width="5"/>
      ${graphic}
      ${athlete ? "" : patch(136, 168, .7, 0)}
    </svg>`;
  }
  const mockHtml = (id, label = true) => {
    const p = PRODUCTS[id];
    if (p.img) return `<div class="mock mock--photo"><img src="${p.img}" alt="${esc(p.alt)}" loading="lazy" width="688" height="860">${p.back ? `<img class="mock__back" src="${p.back}" alt="${esc(p.backAlt)}" loading="lazy" width="688" height="860">` : ""}</div>`;
    return `<div class="mock mock--${p.fit}">${label ? '<span class="mock__label">[Mockup]</span>' : ""}${garmentSvg(id)}</div>`;
  };

  /* ================= Header + footer ================= */
  const page = document.body.dataset.page || "";
  const NAV = [["shop", "Shop", "shop.html"], ["why", "Our Why", "our-why.html"], ["community", "The 300", "community.html"], ["inside", "Inside the Short", "court-field.html#inside"]];

  function renderChrome() {
    const h = $("[data-site-header]");
    if (h) {
      const over = h.hasAttribute("data-over");
      h.className = "site-header" + (over ? " site-header--over" : "");
      h.innerHTML = `<nav class="wrap nav" aria-label="Main">
        <a class="nav__logo logo" href="index.html" aria-label="MAE. home">MAE.</a>
        <ul class="nav__links" id="nav-links">
          ${NAV.map(([k, label, href]) => `<li><a href="${href}"${page === k || (k === "shop" && page === "fit") ? ' aria-current="page"' : ""}>${label}</a></li>`).join("")}
        </ul>
        <div class="nav__tools">
          <button class="icon-btn" type="button" data-open-bag aria-haspopup="dialog">${ICON.bag}<span class="sr-only">Open bag,</span><span class="bag-count" data-bag-count aria-live="polite">0</span></button>
          <button class="icon-btn nav__menu-btn" type="button" aria-expanded="false" aria-controls="nav-links" data-menu>${ICON.menu}<span class="sr-only">Menu</span></button>
        </div>
      </nav>`;
      const menuBtn = $("[data-menu]", h);
      menuBtn.addEventListener("click", () => {
        const open = menuBtn.getAttribute("aria-expanded") !== "true";
        menuBtn.setAttribute("aria-expanded", String(open));
        $("#nav-links").classList.toggle("is-open", open);
      });
      if (over) {
        const onScroll = () => h.classList.toggle("is-solid", window.scrollY > window.innerHeight * 0.75);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
      }
    }
    const f = $("[data-site-footer]");
    if (f) {
      f.className = "site-footer";
      f.innerHTML = `<div class="wrap">
        <div class="footer__top">
          <div><p class="footer__logo logo" aria-hidden="true">MAE.</p><p class="footer__motto">MAE. Where modesty meets the moment.</p></div>
          <ul class="footer__links">${NAV.map(([, l, href]) => `<li><a href="${href}">${l}</a></li>`).join("")}<li><a href="court-field.html">Court & Field</a></li><li><a href="run-lift.html">Run & Lift</a></li></ul>
        </div>
        <div class="footer__bottom"><span>Built in Austin, Texas.</span><span>Judges 8:4 · Proverbs 31:25</span></div>
      </div>`;
    }
  }

  /* ================= Toast ================= */
  let toastEl, toastTimer;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "toast";
      toastEl.setAttribute("role", "status");
      toastEl.setAttribute("aria-live", "polite");
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("is-on"), 3200);
  }

  /* ================= Bag ================= */
  const Bag = {
    items: store.get("mae.bag", []).filter((i) => PRODUCTS[i.id]),
    save() { store.set("mae.bag", this.items); this.render(); },
    count() { return this.items.reduce((n, i) => n + i.qty, 0); },
    subtotal() { return this.items.reduce((n, i) => n + PRODUCTS[i.id].price * i.qty, 0); },
    shipping() { const s = this.subtotal(); return s === 0 || s >= CONFIG.freeShippingOver ? 0 : CONFIG.shipping; },
    add(id, size, qty = 1) {
      const hit = this.items.find((i) => i.id === id && i.size === size);
      if (hit) hit.qty = Math.min(hit.qty + qty, 10); else this.items.push({ id, size, qty });
      this.save();
      $$("[data-bag-count]").forEach((c) => { c.classList.remove("bump"); void c.offsetWidth; c.classList.add("bump"); });
    },
    setQty(idx, qty) { if (qty <= 0) this.items.splice(idx, 1); else this.items[idx].qty = Math.min(qty, 10); this.save(); },
    clear() { this.items = []; this.save(); },
    linesHtml(editable) {
      return this.items.map((i, idx) => {
        const p = PRODUCTS[i.id];
        return `<div class="line">
          ${mockHtml(i.id, false)}
          <div><h3>${esc(p.name)}</h3><p class="line__meta">Size ${esc(i.size)} · ${esc(p.color)}</p>
            ${editable ? `<div class="qty" role="group" aria-label="Quantity for ${esc(p.name)}, size ${esc(i.size)}">
              <button type="button" data-qty="${idx}" data-d="-1" aria-label="Remove one">&minus;</button><output aria-live="polite">${i.qty}</output><button type="button" data-qty="${idx}" data-d="1" aria-label="Add one">+</button></div>` : `<p class="line__meta">Qty ${i.qty}</p>`}
          </div>
          <div class="line__right"><span class="price">${money(p.price * i.qty)}</span>${editable ? `<button class="remove" type="button" data-remove="${idx}">Remove</button>` : ""}</div>
        </div>`;
      }).join("");
    },
    render() {
      const n = this.count();
      $$("[data-bag-count]").forEach((c) => { c.textContent = n; c.dataset.empty = String(n === 0); });
      const body = $("#bag-body");
      if (body) {
        body.innerHTML = n ? this.linesHtml(true) : `<div class="empty"><p>Your bag is empty. For now.</p><a class="btn btn--ink" href="shop.html">Shop Drop 01</a></div>`;
        $("#bag-foot").hidden = !n;
        $("#bag-subtotal").textContent = money(this.subtotal());
      }
      document.dispatchEvent(new CustomEvent("bag:change"));
    },
  };

  let lastFocus;
  function buildDrawer() {
    const d = document.createElement("div");
    d.innerHTML = `<aside class="drawer" id="bag" role="dialog" aria-modal="true" aria-labelledby="bag-title" hidden>
        <div class="drawer__head"><h2 class="headline" id="bag-title">Your bag</h2><button class="icon-btn" type="button" data-close-bag>${ICON.close}<span class="sr-only">Close bag</span></button></div>
        <div class="drawer__body" id="bag-body"></div>
        <div class="drawer__foot" id="bag-foot">
          <div class="drawer__total"><span>Subtotal</span><span class="price" id="bag-subtotal">$0</span></div>
          <p class="drawer__note">Free shipping over ${money(CONFIG.freeShippingOver)}. Drop 01 ships as a pre-order.</p>
          <a class="btn btn--block" href="${CONFIG.checkoutUrl || "checkout.html"}">Checkout ${ICON.arrow}</a>
        </div>
      </aside><div class="drawer-scrim" data-close-bag></div>`;
    document.body.append(...d.children);
    const drawer = $("#bag");
    document.addEventListener("click", (e) => {
      if (e.target.closest("[data-open-bag]")) openBag();
      if (e.target.closest("[data-close-bag]")) closeBag();
      const q = e.target.closest("[data-qty]");
      if (q) { const i = +q.dataset.qty; Bag.setQty(i, Bag.items[i].qty + +q.dataset.d); }
      const r = e.target.closest("[data-remove]");
      if (r) { const p = PRODUCTS[Bag.items[+r.dataset.remove].id]; Bag.setQty(+r.dataset.remove, 0); toast(p.name + " removed"); }
    });
    document.addEventListener("keydown", (e) => {
      if (drawer.hidden) return;
      if (e.key === "Escape") closeBag();
      if (e.key === "Tab") {
        const f = $$("a[href], button:not([disabled]), input", drawer).filter((x) => x.offsetParent !== null);
        if (!f.length) return;
        if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
      }
    });
  }
  function openBag() {
    const drawer = $("#bag");
    lastFocus = document.activeElement;
    drawer.hidden = false;
    requestAnimationFrame(() => { drawer.classList.add("is-open"); $(".drawer-scrim").classList.add("is-open"); });
    document.body.style.overflow = "hidden";
    setTimeout(() => $("[data-close-bag]", drawer).focus(), 50);
  }
  function closeBag() {
    const drawer = $("#bag");
    drawer.classList.remove("is-open");
    $(".drawer-scrim").classList.remove("is-open");
    document.body.style.overflow = "";
    setTimeout(() => { drawer.hidden = true; }, 320);
    if (lastFocus) lastFocus.focus();
  }

  /* ================= Scroll reveal + parallax ================= */
  function reveals() {
    const els = $$(".reveal, .map");
    if (!("IntersectionObserver" in window) || reduceMotion) { els.forEach((e) => e.classList.add("is-in")); return; }
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
    }), { threshold: 0.18, rootMargin: "0px 0px -40px 0px" });
    els.forEach((e) => io.observe(e));

    const par = $$("[data-parallax]");
    if (par.length) {
      let ticking = false;
      const run = () => {
        par.forEach((img) => {
          const r = img.parentElement.getBoundingClientRect();
          if (r.bottom < 0 || r.top > innerHeight) return;
          const p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
          img.style.transform = `translate3d(0, ${(-8 + p * -10).toFixed(2)}%, 0)`;
        });
        ticking = false;
      };
      addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(run); } }, { passive: true });
      run();
    }
  }

  /* ================= Home: cover video ================= */
  function coverVideo() {
    const v = $("[data-cover-video]"), btn = $("[data-video-toggle]");
    if (!v) return;
    if (reduceMotion) { v.removeAttribute("autoplay"); v.pause(); }
    if (!btn) return;
    const paintBtn = () => {
      btn.innerHTML = v.paused
        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5l12 7-12 7z"/></svg><span class="sr-only">Play background video</span>'
        : '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg><span class="sr-only">Pause background video</span>';
    };
    v.addEventListener("play", paintBtn); v.addEventListener("pause", paintBtn);
    btn.addEventListener("click", () => (v.paused ? v.play() : v.pause()));
    paintBtn();
  }

  /* ================= Home: every sport map ================= */
  function sportsMap() {
    const map = $("#sport-map"), card = $("#sport-card");
    if (!map || !card) return;
    const pins = $("#map-pins", map);
    pins.innerHTML = SPORTS.map((s, i) => `<button class="pin pin--${s.side}" type="button" data-sport="${s.id}" aria-pressed="false" aria-label="${s.name}: ${esc(s.place)}" style="left:${s.x}%;top:${s.y}%;--c:${s.bg};--n:${s.bg === "#fff" ? s.fg : "#1d1b19"}">
        <svg class="pin__drop" viewBox="0 0 44 56" aria-hidden="true"><path d="M22 54C18 44 2 37 2 21a20 20 0 0 1 40 0c0 16-16 23-20 33z" fill="${s.bg}" stroke="#1d1b19" stroke-width="3"/><circle cx="22" cy="21" r="11.5" fill="#fff" stroke="#1d1b19" stroke-width="2.5"/></svg>
        <span class="pin__n" aria-hidden="true">${i + 1}</span><span class="pin__tag" aria-hidden="true">${s.name}</span></button>`).join("");

    const chips = $("#sport-chips");
    chips.innerHTML = SPORTS.map((s) => `<li><button class="chip" type="button" aria-pressed="false" data-sport="${s.id}" style="--c:${s.bg}"><i aria-hidden="true"></i>${s.name}</button></li>`).join("");

    function show(id, user) {
      const s = SPORTS.find((x) => x.id === id);
      const fit = FITS[s.fit];
      $$(".pin", pins).forEach((p) => { p.classList.toggle("is-active", p.dataset.sport === id); p.setAttribute("aria-pressed", String(p.dataset.sport === id)); });
      $$("[data-sport]", chips).forEach((c) => c.setAttribute("aria-pressed", String(c.dataset.sport === id)));
      card.classList.remove("swap"); void card.offsetWidth; card.classList.add("swap");
      card.innerHTML = `<div class="sport-card__top" style="background:${s.bg};color:${s.fg}">
          <div><span class="eyebrow">Where she plays</span><h3 class="cover-type" style="margin:6px 0 0">${s.name}</h3></div>${sportSvg(s.id, s.fg)}</div>
        <div class="sport-card__body">
          <p class="sport-card__place">${ICON.pin}${esc(s.place)}</p>
          <p class="sport-card__why">${esc(s.why)}</p>
          <div class="sport-card__fit"><div><span class="eyebrow">Wear</span><br><strong>MAE. ${fit.title}</strong></div>
            <a class="btn btn--ink" href="${fit.url}">Shop the fit ${ICON.arrow}</a></div>
        </div>`;
      if (user) card.setAttribute("aria-live", "polite");
    }
    pins.addEventListener("click", (e) => { const p = e.target.closest(".pin"); if (p) show(p.dataset.sport, true); });
    chips.addEventListener("click", (e) => { const c = e.target.closest("[data-sport]"); if (c) show(c.dataset.sport, true); });
    show("basketball", false);
  }

  /* ================= Shop ================= */
  function shop() {
    const grid = $("#products");
    if (!grid) return;
    grid.innerHTML = Object.entries(PRODUCTS).map(([id, p], i) => `
      <a class="product-card reveal" data-delay="${i}" data-fit="${p.fit}" href="${FITS[p.fit].url}?item=${id}">
        <div class="product-card__media">${mockHtml(id)}</div>
        <div class="product-card__row"><h3>${esc(p.name)}</h3><span class="price">${money(p.price)}</span></div>
        <p class="product-card__specs">${esc(p.specs)} · ${esc(p.color)}</p>
      </a>`).join("");
    const btns = $$("[data-filter]");
    const apply = (f) => {
      btns.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.filter === f)));
      $$(".product-card", grid).forEach((c) => { c.hidden = f !== "all" && c.dataset.fit !== f; });
      const url = new URL(location.href);
      if (f === "all") url.searchParams.delete("fit"); else url.searchParams.set("fit", f);
      history.replaceState(null, "", url);
    };
    btns.forEach((b) => b.addEventListener("click", () => apply(b.dataset.filter)));
    const start = new URLSearchParams(location.search).get("fit");
    apply(FITS[start] ? start : "all");
  }

  /* ================= Fit (product) page ================= */
  function fitPage() {
    const root = $("[data-fit-page]");
    if (!root) return;
    const fitKey = root.dataset.fitPage, fit = FITS[fitKey];
    const want = new URLSearchParams(location.search).get("item");
    let current = fit.pieces.includes(want) ? want : fit.pieces[0];

    const tabs = $("#piece-tabs");
    tabs.innerHTML = fit.pieces.map((id) => `<button class="piece-tab" type="button" role="tab" id="tab-${id}" aria-controls="buy-panel" data-piece="${id}">
        ${mockHtml(id)}<span>${esc(PRODUCTS[id].tab || (PRODUCTS[id].piece === "short" ? "The short" : "The top"))}<b>${money(PRODUCTS[id].price)}</b></span></button>`).join("");

    $("#why-list").innerHTML = fit.why.map(([k, short, long], i) => `<li>
        <button class="why-btn" type="button" aria-expanded="false" aria-controls="why-${i}"><strong>${esc(k)}</strong><span>${esc(short)}</span>${ICON.plus}</button>
        <div class="why-panel" id="why-${i}" role="region" aria-label="${esc(k)}"><div><div class="why-detail"><div class="closeup" aria-hidden="true">Close-up<br>coming</div><p>${esc(long)}</p></div></div></div>
      </li>`).join("");
    $$(".why-btn").forEach((b) => b.addEventListener("click", () => {
      const open = b.getAttribute("aria-expanded") !== "true";
      b.setAttribute("aria-expanded", String(open));
      $("#" + b.getAttribute("aria-controls")).classList.toggle("is-open", open);
    }));

    $("#sizes").innerHTML = `<legend class="field-label">Size</legend>` + SIZES.map((s) =>
      `<label class="size-opt"><input type="radio" name="size" value="${s}"><span>${s}</span></label>`).join("");

    const select = (id) => {
      current = id;
      const p = PRODUCTS[id];
      $$(".piece-tab", tabs).forEach((t) => t.setAttribute("aria-selected", String(t.dataset.piece === id)));
      $("#piece-name").textContent = p.name;
      $("#piece-color").innerHTML = `<span class="swatch" style="background:${p.hex}" aria-hidden="true"></span>${esc(p.color)} · ${esc(p.specs)}`;
      $("#add-btn").innerHTML = `Add to bag · ${money(p.price)}`;
      const url = new URL(location.href); url.searchParams.set("item", id); history.replaceState(null, "", url);
    };
    tabs.addEventListener("click", (e) => { const t = e.target.closest("[data-piece]"); if (t) select(t.dataset.piece); });
    select(current);

    const err = $("#size-error");
    const getSize = () => { const c = $('input[name="size"]:checked'); return c && c.value; };
    $("#sizes").addEventListener("change", () => { err.textContent = ""; });
    const need = () => { err.textContent = "Pick a size first, then add it to your bag."; $('#sizes input').focus(); };
    $("#add-btn").addEventListener("click", () => {
      const size = getSize(); if (!size) return need();
      Bag.add(current, size); toast(`${PRODUCTS[current].name}, size ${size}, added`);
    });
    $("#add-fit-btn").addEventListener("click", () => {
      const size = getSize(); if (!size) return need();
      fit.pieces.forEach((id) => Bag.add(id, size)); toast(`The full fit, size ${size}, added`); openBag();
    });
    const fitTotal = fit.pieces.reduce((n, id) => n + PRODUCTS[id].price, 0);
    $("#add-fit-btn").innerHTML = `Add the full fit · ${money(fitTotal)}`;
  }

  /* ================= Email forms (Join The 300, Notify me) ================= */
  function emailForms() {
    $$("[data-email-form]").forEach((form) => {
      const input = $("input[type=email]", form), msg = $("[data-form-msg]", form.parentElement);
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const v = input.value.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
          input.setAttribute("aria-invalid", "true");
          msg.textContent = "That email looks off. Try name@example.com.";
          input.focus();
          return;
        }
        input.removeAttribute("aria-invalid");
        const list = store.get("mae.list", []);
        list.push({ email: v, list: form.dataset.emailForm, at: new Date().toISOString() });
        store.set("mae.list", list);
        form.hidden = true;
        msg.textContent = form.dataset.success;
        msg.focus();
      });
    });
  }

  /* ================= Checkout ================= */
  // Sends the finished pre-order to the order inbox. Fire and forget: the shopper's confirmation never waits on it.
  function sendOrder(order, form) {
    if (!CONFIG.orderInboxUrl) return;
    const f = form.elements;
    const payload = {
      no: order.no, name: order.name, email: order.email,
      address: f.address.value.trim(), city: f.city.value.trim(), state: f.state.value.trim(), zip: f.zip.value.trim(),
      website: f.website ? f.website.value : "",
      items: order.items.map((i) => ({ name: PRODUCTS[i.id].name, size: i.size, color: PRODUCTS[i.id].color, price: PRODUCTS[i.id].price, qty: i.qty })),
      sub: order.sub, ship: order.ship, total: order.sub + order.ship,
    };
    try {
      // text/plain keeps this a simple request, which Google Apps Script accepts from any site
      fetch(CONFIG.orderInboxUrl, { method: "POST", mode: "no-cors", keepalive: true, headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(payload) });
    } catch (e) { /* the order is still saved on this device as mae.lastOrder */ }
  }

  function checkout() {
    const root = $("[data-checkout]");
    if (!root) return;
    const sum = $("#summary-lines"), form = $("#co-form");
    const paint = () => {
      if (!$("#co-main")) return; // order already placed
      const n = Bag.count();
      $("#co-empty").hidden = !!n;
      $("#co-main").hidden = !n;
      sum.innerHTML = Bag.linesHtml(true);
      const ship = Bag.shipping();
      $("#co-sub").textContent = money(Bag.subtotal());
      $("#co-ship").textContent = ship ? money(ship) : "Free";
      $("#co-total").textContent = money(Bag.subtotal() + ship);
    };
    document.addEventListener("bag:change", paint);
    paint();

    const fields = [
      ["name", "Enter your full name."],
      ["email", "Enter an email like name@example.com.", (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)],
      ["address", "Enter a street address."],
      ["city", "Enter a city."],
      ["state", "Enter a state."],
      ["zip", "Enter a 5-digit ZIP code.", (v) => /^\d{5}(-\d{4})?$/.test(v)],
    ];
    const check = (name) => {
      const [, msg, test] = fields.find((f) => f[0] === name);
      const el = form.elements[name], v = el.value.trim();
      const ok = v && (!test || test(v));
      el.setAttribute("aria-invalid", String(!ok));
      $(`#err-${name}`).textContent = ok ? "" : msg;
      return ok;
    };
    fields.forEach(([n]) => form.elements[n].addEventListener("blur", () => { if (form.elements[n].value) check(n); }));

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const bad = fields.filter(([n]) => !check(n));
      const box = $("#error-summary");
      if (bad.length) {
        box.hidden = false;
        box.innerHTML = `<h2 tabindex="-1">Fix ${bad.length} thing${bad.length > 1 ? "s" : ""} to place your pre-order</h2><ul>${bad.map(([n, m]) => `<li><a href="#f-${n}">${m}</a></li>`).join("")}</ul>`;
        $("h2", box).focus();
        return;
      }
      box.hidden = true;
      const btn = $("#place-btn");
      btn.disabled = true; btn.textContent = "Reserving...";
      setTimeout(() => {
        const order = {
          no: "MAE-01-" + String(Math.floor(1000 + Math.random() * 9000)),
          name: form.elements.name.value.trim(), email: form.elements.email.value.trim(),
          items: Bag.items.slice(), sub: Bag.subtotal(), ship: Bag.shipping(),
        };
        store.set("mae.lastOrder", order);
        sendOrder(order, form);
        const lines = Bag.linesHtml(false);
        Bag.clear();
        root.innerHTML = `<div class="confirm">
            <p class="masthead logo" aria-hidden="true">MAE.</p>
            <h1 class="headline headline--outline" tabindex="-1" id="confirm-title">You're in, ${esc(order.name.split(" ")[0])}.</h1>
            <p class="band-copy">Your Drop 01 pre-order is reserved. We'll email <strong>${esc(order.email)}</strong> a secure payment link the day Drop 01 goes live. Nothing is charged today.</p>
            <div class="receipt"><div class="receipt__head"><span>Order ${order.no}</span><span>Pre-order · Drop 01</span></div>
              <div style="padding:0 20px">${lines}</div>
              <div class="summary__totals"><div><span>Subtotal</span><span>${money(order.sub)}</span></div><div><span>Shipping</span><span>${order.ship ? money(order.ship) : "Free"}</span></div><div class="grand"><span>Total at launch</span><span>${money(order.sub + order.ship)}</span></div></div>
            </div>
            <p class="band-copy"><em>"She is clothed with strength and dignity."</em> Proverbs 31:25</p>
            <p style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:24px"><a class="btn" href="community.html">Join The 300</a><a class="btn btn--ghost" href="index.html">Back home</a></p>
          </div>`;
        $("#confirm-title").focus();
        window.scrollTo(0, 0);
      }, 700);
    });
  }

  /* Photo wall: once it comes on screen, both rows start sliding on their own (top left, bottom right). */
  function wallRows() {
    const rows = $$(".wall__row");
    if (!rows.length || reduceMotion || !("IntersectionObserver" in window)) return;
    const wall = rows[0].closest(".wall");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => wall.classList.toggle("is-running", e.isIntersecting));
    }, { threshold: 0.15 });
    io.observe(wall);
  }

  /* Survey numbers: when a row comes on screen it counts from 0 up to its number, once, then stays there. */
  function scrollCounts(root) {
    const els = [...root.querySelectorAll(".count")];
    if (!els.length) return;
    const run = (el) => {
      const to = +el.dataset.to, suf = el.dataset.suffix ?? "%", dur = 1600, t0 = performance.now();
      const ease = (x) => 1 - Math.pow(1 - x, 3);
      const step = (now) => {
        const k = Math.min(1, (now - t0) / dur);
        el.textContent = Math.round(ease(k) * to) + suf;
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if (reduceMotion || !("IntersectionObserver" in window)) { els.forEach((el) => { el.textContent = el.dataset.to + (el.dataset.suffix ?? "%"); }); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { io.unobserve(e.target); run(e.target); } });
    }, { threshold: 0.6 });
    els.forEach((el) => io.observe(el));
  }

  /* ================= Survey results ================= */
  function survey() {
    const T = SURVEY.total;
    const stats = document.querySelector("[data-survey='stats']");
    if (stats) {
      stats.innerHTML = WHY_STATS.stats.map((st) =>
        `<div class="count-row"><dt>${esc(st.label)}</dt>` +
        `<dd><span class="count" data-to="${st.to}" data-suffix="${esc(st.suffix)}" aria-hidden="true">${reduceMotion ? st.to : 0}${esc(st.suffix)}</span><span class="sr-only">${st.to}${esc(st.suffix)}</span></dd></div>`
      ).join("");
      scrollCounts(stats);
    }
    const quote = document.querySelector("[data-survey='quote']");
    if (quote) quote.textContent = `\u201c${SURVEY.quote}\u201d`;
    const note = document.querySelector("[data-survey='note']");
    if (note) note.textContent = `${WHY_STATS.source} Quote from our survey of ${T} female athletes, ${SURVEY.date}.`;
    const demand = document.querySelector("[data-survey='demand']");
    if (demand) demand.innerHTML = `<strong>${SURVEY.demand} of ${T}</strong> girls surveyed are more likely to buy from a brand started by a female athlete.`;
  }

  /* Our Why: the red lines scratch through "the gap on the rack" headings when the cards scroll into view */
  function strikeOnScroll() {
    const cols = document.querySelector(".gap-cols");
    if (!cols) return;
    if (reduceMotion || !("IntersectionObserver" in window)) { cols.classList.add("is-struck"); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { cols.classList.add("is-struck"); io.disconnect(); } }), { threshold: 0.55 });
    io.observe(cols);
  }

  /* ================= Boot ================= */
  renderChrome();
  buildDrawer();
  Bag.render();
  coverVideo();
  sportsMap();
  shop();
  fitPage();
  survey();
  strikeOnScroll();
  wallRows();
  emailForms();
  checkout();
  reveals();
  if (location.hash === "#bag") openBag();
})();
