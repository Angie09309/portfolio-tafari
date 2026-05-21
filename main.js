// ── ANIMACIONES DE SCROLL (Intersection Observer) ──
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1 },
);

// Ejecutar cuando el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  // Observar todas las secciones para la animación
  document.querySelectorAll("section").forEach((s) => observer.observe(s));

  // Hacer el Hero visible inmediatamente al cargar
  const hero = document.querySelector("#hero");
  if (hero) hero.classList.add("visible");

  // Controlar el envío del formulario directamente desde el JS
  const contactForm = document.querySelector(".contact-form-card"); // O el tag <form> que uses
  const sendBtn = document.querySelector(".btn-send");

  if (contactForm && sendBtn) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault(); // Evita que la página se recargue al enviar
      handleSend(sendBtn);
    });
  }
});

// ── MANEJO DEL BOTÓN DE ENVÍO ──
function handleSend(btn) {
  btn.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round" style="width:20px;height:20px">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
    ¡Mensaje enviado!
  `;
  btn.style.background = "#1a1a2e";
  btn.style.color = "#fff";

  setTimeout(() => {
    btn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round" style="width:20px;height:20px">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
      Enviar mensaje
    `;
    btn.style.background = "";
    btn.style.color = "";
  }, 3000);
}

// ── RESALTADO ACTIVO DEL MENÚ AL HACER SCROLL ──
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((s) => {
    if (window.scrollY >= s.offsetTop - 200) {
      current = s.id;
    }
  });

  navLinks.forEach((a) => {
    const isActive = a.getAttribute("href") === "#" + current;
    a.style.color = isActive ? "var(--text)" : "";
    a.style.background = isActive ? "rgba(0,0,0,0.06)" : "";
  });
});
