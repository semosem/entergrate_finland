const body = document.body;
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

function closeNavigation() {
  if (!navToggle || !navLinks) return;
  navLinks.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.querySelector(".sr-only").textContent = "Open navigation";
}

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.querySelector(".sr-only").textContent = isOpen
      ? "Close navigation"
      : "Open navigation";
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNavigation);
  });
}

const cookieBanner = document.getElementById('cookie-banner');
const acceptCookiesButton = document.getElementById('accept-cookies');
const rejectCookiesButton = document.getElementById('reject-cookies');

const COOKIE_CHOICE_KEY = 'entergrate-cookie-choice';

function saveCookieChoice(choice) {
  localStorage.setItem(COOKIE_CHOICE_KEY, choice);
  cookieBanner.hidden = true;
}

if (cookieBanner && acceptCookiesButton && rejectCookiesButton) {
  const savedChoice = localStorage.getItem(COOKIE_CHOICE_KEY);

  if (!savedChoice) {
    cookieBanner.hidden = false;
  }

  acceptCookiesButton.addEventListener('click', function () {
    saveCookieChoice('accepted');
  });

  rejectCookiesButton.addEventListener('click', function () {
    saveCookieChoice('rejected');
  });
}


const carousel = document.querySelector("[data-carousel]");
const carouselSlides = [...document.querySelectorAll(".hero-slide")];
const carouselDots = [...document.querySelectorAll("[data-carousel-dot]")];
const carouselPrevious = document.querySelector("[data-carousel-prev]");
const carouselNext = document.querySelector("[data-carousel-next]");
const carouselPause = document.querySelector("[data-carousel-pause]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let carouselIndex = 0;
let carouselTimer = null;
let carouselPaused = prefersReducedMotion.matches;

function showCarouselSlide(index) {
  if (!carouselSlides.length) return;
  carouselIndex = (index + carouselSlides.length) % carouselSlides.length;
  carouselSlides.forEach((slide, slideIndex) => {
    slide.classList.toggle("active", slideIndex === carouselIndex);
  });
  carouselDots.forEach((dot, dotIndex) => {
    const isActive = dotIndex === carouselIndex;
    dot.classList.toggle("active", isActive);
    if (isActive) dot.setAttribute("aria-current", "true");
    else dot.removeAttribute("aria-current");
  });
}

function stopCarousel() {
  if (carouselTimer) window.clearInterval(carouselTimer);
  carouselTimer = null;
}

function startCarousel() {
  stopCarousel();
  if (carouselPaused || carouselSlides.length < 2) return;
  carouselTimer = window.setInterval(() => {
    showCarouselSlide(carouselIndex + 1);
  }, 5500);
}

function setCarouselPaused(paused) {
  carouselPaused = paused;
  if (carouselPause) {
    carouselPause.textContent = paused ? "Play" : "Pause";
    carouselPause.setAttribute(
      "aria-label",
      paused ? "Play carousel" : "Pause carousel",
    );
  }
  startCarousel();
}

if (carousel && carouselSlides.length) {
  showCarouselSlide(0);
  startCarousel();

  carouselPrevious?.addEventListener("click", () => {
    showCarouselSlide(carouselIndex - 1);
    startCarousel();
  });
  carouselNext?.addEventListener("click", () => {
    showCarouselSlide(carouselIndex + 1);
    startCarousel();
  });
  carouselDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      showCarouselSlide(Number(dot.dataset.carouselDot));
      startCarousel();
    });
  });
  carouselPause?.addEventListener("click", () => {
    setCarouselPaused(!carouselPaused);
  });
}

document.querySelectorAll("[data-year]").forEach((year) => {
  year.textContent = new Date().getFullYear().toString();
});

const eventDate = new Date(2026, 9, 27, 0, 0, 0);
const countdownParts = {
  days: document.querySelector("[data-days]"),
  hours: document.querySelector("[data-hours]"),
  minutes: document.querySelector("[data-minutes]"),
  seconds: document.querySelector("[data-seconds]"),
};

function updateCountdown() {
  if (Object.values(countdownParts).some((part) => !part)) return false;

  const remaining = eventDate.getTime() - Date.now();
  if (remaining <= 0) {
    Object.values(countdownParts).forEach((part) => {
      part.textContent = "00";
    });
    return false;
  }

  countdownParts.days.textContent = Math.floor(remaining / 86_400_000);
  countdownParts.hours.textContent = String(
    Math.floor((remaining % 86_400_000) / 3_600_000),
  ).padStart(2, "0");
  countdownParts.minutes.textContent = String(
    Math.floor((remaining % 3_600_000) / 60_000),
  ).padStart(2, "0");
  countdownParts.seconds.textContent = String(
    Math.floor((remaining % 60_000) / 1_000),
  ).padStart(2, "0");
  return true;
}

if (updateCountdown()) {
  const countdownTimer = window.setInterval(() => {
    if (!updateCountdown()) window.clearInterval(countdownTimer);
  }, 1000);
}

let activeModal = null;
let modalTrigger = null;

function openModal(modal, trigger) {
  if (!modal) return;
  activeModal = modal;
  modalTrigger = trigger;
  modal.hidden = false;
  body.classList.add("modal-open");
  modal.querySelector(".modal-close")?.focus();
}

function closeModal() {
  if (!activeModal) return;
  activeModal.hidden = true;
  body.classList.remove("modal-open");
  modalTrigger?.focus();
  activeModal = null;
  modalTrigger = null;
}

const eventModal = document.querySelector("[data-event-modal]");
document.querySelectorAll("[data-event-open]").forEach((trigger) => {
  trigger.addEventListener("click", () => openModal(eventModal, trigger));
});
eventModal
  ?.querySelector("[data-event-close]")
  ?.addEventListener("click", closeModal);

const galleryModal = document.querySelector("[data-gallery-modal]");
const galleryImage = galleryModal?.querySelector("[data-gallery-image]");
const galleryCaption = galleryModal?.querySelector("[data-gallery-caption]");
const galleryTriggers = [...document.querySelectorAll("[data-gallery]")];
let galleryIndex = 0;

function showGalleryImage(index) {
  if (!galleryImage || !galleryCaption || !galleryTriggers.length) return;
  galleryIndex = (index + galleryTriggers.length) % galleryTriggers.length;
  const trigger = galleryTriggers[galleryIndex];
  galleryImage.src = trigger.dataset.gallery;
  galleryImage.alt = trigger.querySelector("img")?.alt || "Event photograph";
  galleryCaption.textContent = trigger.dataset.caption || "Entergrate event";
}

galleryTriggers.forEach((trigger, index) => {
  trigger.addEventListener("click", () => {
    showGalleryImage(index);
    openModal(galleryModal, trigger);
  });
});
galleryModal
  ?.querySelector("[data-gallery-prev]")
  ?.addEventListener("click", () => showGalleryImage(galleryIndex - 1));
galleryModal
  ?.querySelector("[data-gallery-next]")
  ?.addEventListener("click", () => showGalleryImage(galleryIndex + 1));
galleryModal
  ?.querySelector("[data-gallery-close]")
  ?.addEventListener("click", closeModal);

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });
});

document.addEventListener("keydown", (event) => {
  if (activeModal === galleryModal && event.key === "ArrowLeft") {
    showGalleryImage(galleryIndex - 1);
  }

  if (activeModal === galleryModal && event.key === "ArrowRight") {
    showGalleryImage(galleryIndex + 1);
  }

  if (event.key === "Escape") {
    closeNavigation();
    closeModal();
  }

  if (event.key === "Tab" && activeModal) {
    const focusable = activeModal.querySelectorAll(
      'button, a[href], input, textarea, select, [tabindex]:not([tabindex="-1"])',
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});
