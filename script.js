const header = document.querySelector("[data-header]");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const contactForm = document.querySelector("[data-contact-form]");
const formNote = document.querySelector("[data-form-note]");
const employeeRange = document.querySelector("[data-employee-range]");
const employeeValue = document.querySelector("[data-employee-value]");
const kitList = document.querySelector("[data-kit-list]");

const setHeaderState = () => {
  if (!header) {
    return;
  }

  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

const closeMenu = () => {
  if (!navToggle || !navLinks) {
    return;
  }

  navToggle.setAttribute("aria-expanded", "false");
  navLinks.classList.remove("is-open");
  document.body.classList.remove("menu-open");
};

window.addEventListener("scroll", setHeaderState, { passive: true });
setHeaderState();

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";

    navToggle.setAttribute("aria-expanded", String(!isOpen));
    navLinks.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      closeMenu();
    }
  });
}

if (contactForm && formNote) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    formNote.textContent =
      "Дякуємо! Це демонстраційна форма порталу. У реальному сайті заявка надсилалася б менеджеру.";
    contactForm.reset();
  });
}

const updateKit = (count) => {
  if (!employeeValue || !kitList) {
    return;
  }

  const pedestals = Math.ceil(count / 2);
  const cabinets = Math.max(1, Math.ceil(count / 4));
  const meetingTables = count > 18 ? 2 : 1;

  employeeValue.textContent = String(count);
  kitList.innerHTML = `
    <p><strong>${count}</strong> офісних столів</p>
    <p><strong>${pedestals}</strong> мобільних тумб</p>
    <p><strong>${cabinets}</strong> шафи для документів</p>
    <p><strong>${meetingTables}</strong> переговорний стіл</p>
  `;
};

if (employeeRange) {
  updateKit(Number(employeeRange.value));
  employeeRange.addEventListener("input", () => updateKit(Number(employeeRange.value)));
}
