/* Women of the Word: tap a card to enlarge it, tap anywhere or press Escape to close. */
(function () {
  "use strict";
  const lb = document.getElementById("wotw-lb");
  if (!lb) return;
  const lbi = lb.querySelector("img");
  document.querySelectorAll(".wotw .c").forEach((c) => c.addEventListener("click", () => {
    const i = c.querySelector("img");
    lbi.src = i.src; lbi.alt = i.alt; lb.classList.add("on");
  }));
  lb.addEventListener("click", () => lb.classList.remove("on"));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") lb.classList.remove("on"); });
})();
