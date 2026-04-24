let currentHole = null;
let currentTab = "map";

const app = document.getElementById("app");
const title = document.getElementById("title");
const subtitle = document.getElementById("subtitle");
const backBtn = document.getElementById("backBtn");
const bottomNav = document.getElementById("bottomNav");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const mapTab = document.getElementById("mapTab");
const notesTab = document.getElementById("notesTab");

function renderHome() {
  currentHole = null;
  currentTab = "map";
  title.textContent = "MCC Greens";
  subtitle.textContent = "Pocket putting guide";
  backBtn.classList.add("hidden");
  bottomNav.classList.add("hidden");

  app.innerHTML = `
    <section class="home">
      <div class="hole-grid">
        ${window.HOLES.map(h => `
          <button class="hole-card" onclick="openHole(${h.number})">
            <strong>${h.number}</strong>
            <span>${h.quick}</span>
          </button>
        `).join("")}
      </div>
    </section>
  `;
}

function openHole(n) {
  currentHole = window.HOLES.find(h => h.number === n);
  currentTab = "map";
  renderHole();
}

function renderHole() {
  if (!currentHole) return renderHome();

  title.textContent = `Hole ${currentHole.number}`;
  subtitle.textContent = currentHole.quick;
  backBtn.classList.remove("hidden");
  bottomNav.classList.remove("hidden");

  mapTab.classList.toggle("active", currentTab === "map");
  notesTab.classList.toggle("active", currentTab === "notes");

  if (currentTab === "map") {
    app.innerHTML = `
      <section class="hole-view">
        <div class="quick-note">${currentHole.quick}</div>
        <div class="map-wrap">
          <img src="${currentHole.map}" alt="Hole ${currentHole.number} green map" />
        </div>
      </section>
    `;
  } else {
    const s = currentHole.summary;
    app.innerHTML = `
      <section class="hole-view notes">
        <div class="quick-note">${currentHole.quick}</div>
        <article class="note-card"><h3>Overall movement</h3><p>${s.overall}</p></article>
        <article class="note-card"><h3>Safe miss</h3><p>${s.safeMiss}</p></article>
        <article class="note-card"><h3>Avoid</h3><p>${s.avoid}</p></article>
        <article class="note-card"><h3>Putting</h3><p>${s.putting}</p></article>
        <article class="note-card"><h3>Approach</h3><p>${s.approach}</p></article>
      </section>
    `;
  }
}

function go(delta) {
  if (!currentHole) return;
  let n = currentHole.number + delta;
  if (n < 1) n = 18;
  if (n > 18) n = 1;
  currentHole = window.HOLES.find(h => h.number === n);
  currentTab = "map";
  renderHole();
}

backBtn.addEventListener("click", renderHome);
prevBtn.addEventListener("click", () => go(-1));
nextBtn.addEventListener("click", () => go(1));
mapTab.addEventListener("click", () => { currentTab = "map"; renderHole(); });
notesTab.addEventListener("click", () => { currentTab = "notes"; renderHole(); });

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("service-worker.js"));
}

renderHome();
