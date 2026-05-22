const scenarios = {
  refus: {
    question: "Qui a gagné la Coupe du monde 1998 ?",
    answer:
      "<p>Je ne trouve pas cette information dans les documents de Learnix.</p>",
    note:
      "Le refus est volontaire : même si le modèle connaît la réponse, Learnix doit rester attaché au corpus documentaire.",
  },
  simple: {
    question:
      "Quels principes retenir pour construire un alignement pédagogique cohérent ?",
    answer:
      "<ul><li>Clarifier les objectifs d'apprentissage.</li><li>Aligner les activités avec les compétences visées.</li><li>Prévoir des modalités d'évaluation cohérentes avec les attendus.</li><li>Rendre les critères explicites pour les étudiants.</li></ul>",
    note:
      "Le scénario montre comment une base documentaire peut être interrogée en langage naturel pour retrouver des repères pédagogiques.",
  },
  complexe: {
    question:
      "Comment accompagner un enseignant qui souhaite revoir son évaluation dans un contexte d'IA générative ?",
    answer:
      "<ul><li>Identifier ce que l'évaluation cherche réellement à observer.</li><li>Distinguer aide autorisée, production attendue et substitution problématique.</li><li>Repenser les traces d'apprentissage et les critères.</li><li>Expliciter les règles d'usage de l'IA.</li><li>Prévoir un temps de retour d'expérience.</li></ul>",
    note:
      "Le scénario transforme Learnix en support de discussion. Il propose une structuration, mais ne remplace pas l'accompagnement humain.",
  },
};

const tabs = document.querySelectorAll("[data-scenario]");
const question = document.querySelector("#scenario-question");
const answer = document.querySelector("#scenario-answer");
const note = document.querySelector("#scenario-note");

function renderScenario(id) {
  const scenario = scenarios[id] || scenarios.refus;
  question.textContent = scenario.question;
  answer.innerHTML = scenario.answer;
  note.textContent = scenario.note;

  tabs.forEach((tab) => {
    const isActive = tab.dataset.scenario === id;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-pressed", String(isActive));
  });
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => renderScenario(tab.dataset.scenario));
});

renderScenario("refus");

const navLinks = Array.from(document.querySelectorAll(".main-nav a"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle(
          "is-active",
          link.getAttribute("href") === `#${entry.target.id}`
        );
      });
    });
  },
  { rootMargin: "-35% 0px -55% 0px", threshold: 0.01 }
);

sections.forEach((section) => observer.observe(section));

document.querySelectorAll("a[href]").forEach((link) => {
  const href = link.getAttribute("href");
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return;
  }

  link.setAttribute("target", "_blank");
  link.setAttribute("rel", "noopener");
});

const architectureDialog = document.querySelector("#architecture-dialog");
const openArchitecture = document.querySelector("[data-open-architecture]");
const closeArchitecture = document.querySelector("[data-close-architecture]");

if (architectureDialog && openArchitecture && closeArchitecture) {
  openArchitecture.addEventListener("click", () => {
    if (typeof architectureDialog.showModal === "function") {
      architectureDialog.showModal();
    }
  });

  closeArchitecture.addEventListener("click", () => {
    architectureDialog.close();
  });

  architectureDialog.addEventListener("click", (event) => {
    if (event.target === architectureDialog) {
      architectureDialog.close();
    }
  });
}
