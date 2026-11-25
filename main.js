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
  // ── MENÚ DE NAVEGACIÓN MÓVIL (HU-01) ──
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const mobileMenu = document.querySelector(".nav-links");
  const nav = document.querySelector("nav");

  if (mobileMenuToggle && mobileMenu && nav) {
    mobileMenuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("menu-open");

      mobileMenuToggle.setAttribute("aria-expanded", String(isOpen));
      mobileMenuToggle.setAttribute(
        "aria-label",
        isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"
      );
    });

    // Cerrar el menú después de seleccionar una sección
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("menu-open");
        mobileMenuToggle.setAttribute("aria-expanded", "false");
        mobileMenuToggle.setAttribute(
          "aria-label",
          "Abrir menú de navegación"
        );
      });
    });

    // Permitir cerrar el menú utilizando la tecla Escape
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        nav.classList.remove("menu-open");
        mobileMenuToggle.setAttribute("aria-expanded", "false");
        mobileMenuToggle.setAttribute(
          "aria-label",
          "Abrir menú de navegación"
        );
      }
    });
  }

    // ── LIMPIAR MENSAJES DE ERROR AL CORREGIR LOS CAMPOS (HU-04) ──
   
  const fieldsWithValidation = [
    {
      field: document.getElementById("contact-name"),
      error: document.getElementById("contact-name-error"),
    },
    {
      field: document.getElementById("contact-email"),
      error: document.getElementById("contact-email-error"),
    },
    {
      field: document.getElementById("contact-message"),
      error: document.getElementById("contact-message-error"),
    },
  ];

  fieldsWithValidation.forEach(({ field, error }) => {
    if (!field || !error) return;

    field.addEventListener("input", () => {
      field.style.borderColor = "";
      field.removeAttribute("aria-invalid");
      error.textContent = "";
      error.hidden = true;
    });
  });

  // Controlar el envío del formulario directamente desde el JS
  const contactForm = document.querySelector(".contact-form-card");
  const sendBtn = document.querySelector(".btn-send");

  if (contactForm && sendBtn) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault(); // Evita que la página se recargue
      handleSend(sendBtn);
    });
  }
});

// ── MANEJO DEL BOTÓN DE ENVÍO Y VALIDACIÓN (HU-05) ──
function handleSend(btn) {
const name = document.getElementById("contact-name");
const email = document.getElementById("contact-email");
const message = document.getElementById("contact-message");

const nameError = document.getElementById("contact-name-error");
const emailError = document.getElementById("contact-email-error");
const messageError = document.getElementById("contact-message-error");

  // Limpiar estados de error anteriores
  [name, email, message].forEach((el) => {
    if (el) {
      el.style.borderColor = "";
      el.removeAttribute("aria-invalid");
    }
  });

  [nameError, emailError, messageError].forEach((error) => {
    if (error) {
      error.textContent = "";
      error.hidden = true;
    }
  });

  const errors = [];

  // Validación del campo Nombre
 
  if (!name || !name.value.trim()) {
    errors.push(name);

    if (name) {
      name.style.borderColor = "#ef4444";
      name.setAttribute("aria-invalid", "true");
    }

    if (nameError) {
      nameError.textContent = "El campo Nombre es obligatorio.";
      nameError.hidden = false;
    }
  }

 
  // Validación del campo Email 
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !email.value.trim()) {
    errors.push(email);

    if (email) {
      email.style.borderColor = "#ef4444";
      email.setAttribute("aria-invalid", "true");
    }

    if (emailError) {
      emailError.textContent = "El campo Email es obligatorio.";
      emailError.hidden = false;
    }
  } else if (!emailRegex.test(email.value.trim())) {
    errors.push(email);

    email.style.borderColor = "#ef4444";
    email.setAttribute("aria-invalid", "true");

    if (emailError) {
      emailError.textContent = "Ingresa un correo electrónico válido.";
      emailError.hidden = false;
    }
  }

  // Validación del campo Mensaje (Mínimo 10 caracteres)
if (!message || !message.value.trim()) {
  errors.push(message);

  if (message) {
    message.style.borderColor = "#ef4444";
    message.setAttribute("aria-invalid", "true");
  }

  if (messageError) {
    messageError.textContent = "El campo Mensaje es obligatorio.";
    messageError.hidden = false;
  }
} else if (message.value.trim().length < 10) {
  errors.push(message);

  message.style.borderColor = "#ef4444";
  message.setAttribute("aria-invalid", "true");

  if (messageError) {
    messageError.textContent =
      "El mensaje debe tener al menos 10 caracteres.";
    messageError.hidden = false;
  }
}

  // Si hay errores, detener el envío y enfocar el primer campo inválido
  if (errors.length > 0) {
    if (errors[0]) errors[0].focus();
    return;
  }

  // Formulario válido — Bloquear botón y mostrar feedback de éxito
  btn.disabled = true;
  btn.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round" style="width:20px;height:20px">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
    ¡Mensaje enviado!
  `;
  btn.style.background = "#1a1a2e";
  btn.style.color = "#fff";

  // Simulación de espera de red (3 segundos)
  setTimeout(() => {
    // Restaurar estado original del botón
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
    btn.disabled = false;

    // Limpiar campos del formulario
    if (name) name.value = "";
    if (email) email.value = "";
    if (message) message.value = "";
  }, 3000);
}

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
