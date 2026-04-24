let currentHole = null;
let currentTab = "map";
let touchStartX = 0;

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
      <button class="game-launch" onclick="renderGame()">Shape Game</button>
      <div class="hole-grid">
        ${window.HOLES.map(h => `
       <button class="hole-card" onclick="openHole(${h.number})">
  <img src="${h.map}" alt="" />
  <span>${h.number}</span>
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
      <section class="hole-view notes-page">
        <div class="quick-note">${currentHole.quick}</div>

        <div class="note-block"><strong>Overall movement</strong><p>${s.overall}</p></div>
        <div class="note-block"><strong>Best miss</strong><p>${s.safeMiss}</p></div>
        <div class="note-block"><strong>Avoid</strong><p>${s.avoid}</p></div>
        <div class="note-block"><strong>Putting read</strong><p>${s.putting}</p></div>
        <div class="note-block"><strong>Approach strategy</strong><p>${s.approach}</p></div>
      </section>
    `;
  }
}

function go(delta) {
  if (!currentHole) return;
  let n = currentHole.number + delta;
  if (n < 1) n = 18;
  if (n > 18) n = 1;
  openHole(n);
}

function renderGame() {
  title.textContent = "Shape Game";
  subtitle.textContent = "Guess the hole by green shape";
  backBtn.classList.remove("hidden");
  bottomNav.classList.add("hidden");

  const shuffled = [...window.HOLES].sort(() => Math.random() - 0.5);

  app.innerHTML = `
    <section class="game">
      ${shuffled.map(h => `
        <div class="game-card" onclick="this.classList.toggle('revealed')">
          <div class="shape-only">
            <img src="${h.map}" alt="Mystery green shape" />
          </div>
          <div class="answer">Hole ${h.number}</div>
        </div>
      `).join("")}
    </section>
  `;
}

backBtn.addEventListener("click", renderHome);
prevBtn.addEventListener("click", () => go(-1));
nextBtn.addEventListener("click", () => go(1));
mapTab.addEventListener("click", () => { currentTab = "map"; renderHole(); });
notesTab.addEventListener("click", () => { currentTab = "notes"; renderHole(); });

document.addEventListener("touchstart", e => {
  touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", e => {
  if (!currentHole) return;
  const diff = e.changedTouches[0].screenX - touchStartX;
  if (Math.abs(diff) > 70) {
    if (diff < 0) go(1);
    else go(-1);
  }
});

renderHome();
