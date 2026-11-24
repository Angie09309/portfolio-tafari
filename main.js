// ── ANIMACIONES DE SCROLL Y MENÚ ACTIVO (Intersection Observer) ──
const navLinks = document.querySelectorAll(".nav-links a");

// Configuración del observador: crea una "zona activa" en el centro de la pantalla
const observerOptions = {
  rootMargin: "-20% 0px -55% 0px",
  threshold: 0,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    // 1. Control de animación de visibilidad (Añade la clase para el efecto fade-up)
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");

      // 2. Control del menú activo (Resaltado dinámico optimizado)
      const currentId = entry.target.getAttribute("id");

      navLinks.forEach((a) => {
        const isActive = a.getAttribute("href") === "#" + currentId;
        a.style.color = isActive ? "var(--text)" : "";
        a.style.background = isActive ? "rgba(0,0,0,0.06)" : "";
      });
    }
  });
}, observerOptions);

// Ejecutar cuando el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  // Observar todas las secciones que tengan un ID (necesario para el menú)
  document.querySelectorAll("section[id]").forEach((s) => observer.observe(s));

  // Hacer el Hero visible inmediatamente al cargar la página
  const hero = document.querySelector("#hero");
  if (hero) {
    hero.classList.add("visible");
    // Forzar el resaltado del primer enlace (Inicio/Hero) al cargar
    const firstLink = document.querySelector('.nav-links a[href="#hero"]');
    if (firstLink) {
      firstLink.style.color = "var(--text)";
      firstLink.style.background = "rgba(0,0,0,0.06)";
    }
  }

  const contactForm = document.querySelector(".contact-form-card");

  if (contactForm) {
    contactForm.addEventListener("submit", handleSend);
  }
});

async function handleSend(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const btn = form.querySelector(".btn-send");

  const name = document.getElementById("contact-name");
  const email = document.getElementById("contact-email");
  const message = document.getElementById("contact-message");

  // Validar campos obligatorios
  [name, email, message].forEach((el) => {
    el.style.borderColor = "";
  });

  const errors = [];

  if (!name.value.trim()) {
    errors.push(name);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
    errors.push(email);
  }

  if (!message.value.trim() || message.value.trim().length < 10) {
    errors.push(message);
  }

  if (errors.length > 0) {
    errors.forEach((el) => {
      el.style.borderColor = "#ef4444";
    });

    errors[0].focus();
    return;
  }

  const originalContent = btn.innerHTML;

  btn.disabled = true;
  btn.textContent = "Enviando...";

  try {
    const response = await fetch("https://formspree.io/f/xrbaolpn", {
      method: "POST",
      body: new FormData(form),
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al enviar el mensaje");
    }

    alert("¡Mensaje enviado correctamente!");
    form.reset();
  } catch (error) {
    alert("No se pudo enviar el mensaje. Inténtalo nuevamente.");
  } finally {
    btn.disabled = false;
    btn.innerHTML = originalContent;
  }
}

// ── MANEJO DEL BOTÓN DE ENVÍO Y VALIDACIÓN (HU-05) ──

// Mostrar y ocultar detalles de los proyectos
document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-details-toggle]");

  if (!button) return;

  const detailsId = button.getAttribute("aria-controls");
  const details = document.getElementById(detailsId);

  if (!details) return;

  const isExpanded = button.getAttribute("aria-expanded") === "true";

  details.hidden = isExpanded;
  button.setAttribute("aria-expanded", String(!isExpanded));
  button.textContent = isExpanded ? "Ver detalles" : "Ocultar detalles";
});
