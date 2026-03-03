const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle");
navClose = document.getElementById("nav-close");
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*======================= ACCORD SKILLS ======================*/

const skillsContent = document.getElementsByClassName("skills__content"),
  skillsHeader = document.querySelectorAll(".skills__header");

function toggleSkills() {
  let itemClass = this.parentNode.className;

  for (i = 0; i < skillsContent.length; i++) {
    skillsContent[i].className = "skills__content skills__close";
  }
  if (itemClass === "skills__content skills__close") {
    this.parentNode.className = "skills__content skills__open";
  }
}

skillsHeader.forEach((el) => {
  el.addEventListener("click", toggleSkills);
});

/*============== Qualification Skills ===============*/

/*const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]')
tabs.forEach(tab =>{
    tab.addEventListener('click', () =>{
        const target = document.querySelector(tab.dataset.target)
        tabContents.forEach(tabContent =>{
            tabContent.classList.remove('qualification__active')
        })
        target.classList.add('qualification__active')
        tab.forEach(tab =>{
            tab.classList.remove('qualification__active')
        })
        tab.classList.add('qualification__active')
    })
})      
*/

/*======================= Services Modal ===================*/
const modalViews = document.querySelectorAll(".services__modal"),
  modalBtns = document.querySelectorAll(".services__button"),
  modalCloses = document.querySelectorAll(".services__modal-close");

let modal = function (modalClick) {
  modalViews[modalClick].classList.add("active-modal");
};

modalBtns.forEach((modalBtn, i) => {
  modalBtn.addEventListener("click", () => {
    modal(i);
  });
});

modalCloses.forEach((modalClose) => {
  modalClose.addEventListener("click", () => {
    modalViews.forEach((modalView) => {
      modalView.classList.remove("active-modal");
    });
  });
});

/*======================= Portfolio Swiper ===================*/
var swiper = new Swiper(".portfolio__container", {
  loop: true,
  speed: 400,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
  const nav = document.getElementById("header");
  // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 80) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*==================== SHOW SCROLL up ====================*/
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 560) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme,
  );
  themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](
    iconTheme,
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

/*==================== GSAP SCROLL ANIMATIONS ====================*/
gsap.registerPlugin(ScrollTrigger);

// ── Helper: skip if user prefers reduced motion
const noMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!noMotion) {

  // ── HOME (plays on load)
  const homeTl = gsap.timeline({ defaults: { ease: "power3.out" } });
  homeTl
    .from(".home__social", { x: -60, opacity: 0, duration: 0.8 })
    .from(".home__img", { scale: 0.82, opacity: 0, duration: 0.9, ease: "back.out(1.5)" }, "-=0.5")
    .from(".home__data", { x: 60, opacity: 0, duration: 0.8 }, "-=0.7")
    .from(".home__decorations > *", { scale: 0, opacity: 0, stagger: 0.08, duration: 0.45, ease: "back.out(2)" }, "-=0.4");

  // ── SECTION HEADINGS (reusable)
  gsap.utils.toArray(".section__title").forEach((el) => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
      y: 40, opacity: 0, duration: 0.7, ease: "power3.out",
    });
  });
  gsap.utils.toArray(".section__subtitle").forEach((el) => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
      y: 25, opacity: 0, duration: 0.6, delay: 0.1, ease: "power3.out",
    });
  });

  // ── ABOUT
  gsap.from(".about__img", {
    scrollTrigger: { trigger: ".about__container", start: "top 78%" },
    x: -70, opacity: 0, duration: 0.85, ease: "power3.out",
  });
  gsap.from([".about__description", ".about__info", ".about__buttons"], {
    scrollTrigger: { trigger: ".about__container", start: "top 78%" },
    y: 40, opacity: 0, stagger: 0.16, duration: 0.7, ease: "power3.out",
  });

  // ── SKILLS
  gsap.utils.toArray(".skills__content").forEach((el, i) => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: "top 85%" },
      y: 50, opacity: 0, duration: 0.65, delay: i * 0.12, ease: "power3.out",
    });
  });

  // ── QUALIFICATION – SMOOTH SCRUB DOT + SNAP AT NODES + CARD REVEAL
  const travelDot = document.querySelector(".qual__travel-dot");
  const qualTimeline = document.querySelector(".qual__timeline");
  if (travelDot && qualTimeline) {

    const dotColors = ["#FBBF24", "#F472B6", "#8B5CF6"];
    const entries = gsap.utils.toArray(".qual__entry");
    const nodeWraps = entries.map(e => e.querySelector(".qual__node-wrap"));
    const staticDots = entries.map(e => e.querySelector(".qual__dot"));
    const cards = entries.map(e => e.querySelector(".qual__card"));

    // Burst ring element
    const burst = document.createElement("div");
    burst.className = "qual__burst";
    qualTimeline.appendChild(burst);

    // Hide cards + static dots, show travel dot (invisible until section enters)
    cards.forEach((card, i) => {
      gsap.set(card, { opacity: 0, x: entries[i].classList.contains("qual__entry--right") ? 70 : -70 });
    });
    staticDots.forEach(d => gsap.set(d, { scale: 0, opacity: 0 }));
    gsap.set(travelDot, { opacity: 0, top: 0 });

    // Returns the node's centre Y relative to qualTimeline (for absolute positioning)
    // Tweak OFFSET (px) to shift the snap point up (-) or down (+)
    const DOT_OFFSET = 24; // accounts for node-wrap padding-top
    function nodeTopFor(nw) {
      const nR = nw.getBoundingClientRect();
      const tR = qualTimeline.getBoundingClientRect();
      return (nR.top - tR.top) + DOT_OFFSET;
    }

    // One-shot card reveal (called when dot reaches that node)
    const revealed = [false, false, false];
    function revealAt(i) {
      if (revealed[i]) return;
      revealed[i] = true;

      // Static dot pops in
      gsap.to(staticDots[i], {
        scale: 1.25, opacity: 1, duration: 0.18, ease: "back.out(3)",
        onComplete: () => gsap.to(staticDots[i], { scale: 1, duration: 0.2, ease: "power2.out" }),
      });

      // Burst ring expands + fades from current dot position
      const dotTop = parseFloat(gsap.getProperty(travelDot, "top"));
      gsap.set(burst, {
        top: dotTop + travelDot.offsetHeight / 2,
        yPercent: -50,
        scale: 1, opacity: 1,
        borderColor: dotColors[i],
      });
      gsap.to(burst, { scale: 4.5, opacity: 0, duration: 0.55, ease: "power2.out" });

      // Card slides in
      gsap.to(cards[i], {
        opacity: 1, x: 0, duration: 0.65, ease: "back.out(1.5)",
        clearProps: "transform",
      });
    }

    // Build the scrub timeline once the section comes into view
    ScrollTrigger.create({
      trigger: qualTimeline,
      start: "top 90%",
      once: true,
      onEnter: () => {
        // Fade dot in
        gsap.to(travelDot, { opacity: 1, duration: 0.4, ease: "power2.out" });

        // Measure node positions now (layout is stable)
        const positions = nodeWraps.map(nodeTopFor);

        /*
          Scrub timeline structure — gives the "dwell-snap" feel:
          For each node:
            travel segment (ease: power2.inOut) → dwell segment (no movement)
          Travel = most of the scroll distance, giving smooth movement.
          Dwell = brief zero-movement window so the dot lingers when scrolling
          slowly past a node (feels snappy / magnetic).
        */
        const TRAVEL = 3;  // relative units of scroll per gap
        const DWELL = 0.8;// relative units of scroll at each node

        const tl = gsap.timeline({ paused: true });

        positions.forEach((targetY, i) => {
          // Travel to node i — reveal fires when the dot animation completes,
          // not on scroll progress, so fast scrolling won't trigger it early.
          tl.to(travelDot, {
            top: targetY,
            background: dotColors[i],
            duration: TRAVEL,
            ease: "power2.inOut",
            onComplete: () => revealAt(i),
          });
          // Dwell at node i (dot stays put while scroll ticks)
          tl.to(travelDot, { duration: DWELL });
        });

        ScrollTrigger.create({
          trigger: qualTimeline,
          start: "top 80%",
          end: "bottom 90%",
          scrub: 1.5,
          animation: tl,
        });
      },
    });
  }

  // ── PROJECTS
  gsap.from(".proj__outer", {
    scrollTrigger: { trigger: ".proj__outer", start: "top 80%" },
    y: 60, opacity: 0, duration: 0.85, ease: "power3.out",
  });

  // ── CONTACT
  gsap.from(".contact__panel", {
    scrollTrigger: { trigger: ".contact__wrapper", start: "top 80%" },
    x: -70, opacity: 0, duration: 0.8, ease: "power3.out",
  });
  gsap.from(".contact__form-card", {
    scrollTrigger: { trigger: ".contact__wrapper", start: "top 80%" },
    x: 70, opacity: 0, duration: 0.8, delay: 0.15, ease: "power3.out",
  });

  // ── FOOTER
  gsap.from(".footer__bg", {
    scrollTrigger: { trigger: ".footer", start: "top 90%" },
    y: 30, opacity: 0, duration: 0.7, ease: "power3.out",
  });

}
