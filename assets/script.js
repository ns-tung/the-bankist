'use strict';

const nav = document.querySelector('.nav');
const logo = document.querySelector('.logo');

const message = document.createElement('div');
const header = document.querySelector('.header');
const features = document.querySelector('#features');
const navLinks = document.querySelector('.nav__links');
const addSticky = document.querySelector('.add-sticky');
const btnScrollTo = document.querySelector('.scroll-to');

const animatedIn = 'animate__bounce-in';
const animatedOut = 'animate__bounce-out';
const overlay = document.querySelector('.overlay');
const modals = document.querySelectorAll('.modal');
const modalLogin = document.querySelector('.login');
const modalSignup = document.querySelector('.signup');
const btnSwitch = document.querySelectorAll('.switch');
const btnOpenModal = document.querySelectorAll('.show-modal');
const btnCloseModal = document.querySelectorAll('.close-modal');

const highlight = document.querySelectorAll('h1 span');
const sections = document.querySelectorAll('.section');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');
const tabsContainer = document.querySelector('.operations__tab-container');

const checkModalShow = [...modals].some(el => el.classList.contains(animatedIn));

const spanHighlight = function (el, add = true) {
  const span = el.querySelector('h2 span').classList;
  if (add) return span.add('highlight'); else return span.remove('highlight');
}

const openModal = function (el) {
  el.classList.add(animatedIn);
  overlay.classList.remove('hidden');
  setTimeout(() => spanHighlight(el), 300);
  setTimeout(() => el.classList.add('floating'), 1000);
}

const isModalShow = function (el) {
  return el.classList.contains(animatedIn);
}

const dimmingModal = function (el) {
  el.classList.remove("floating");
  el.classList.add(animatedOut);
  setTimeout(() => {
    spanHighlight(el, false);
    el.classList.remove(animatedIn, animatedOut);
  }, 1000);
}

const closeModal = function () {
  if (checkModalShow) return;
  modals.forEach((el) => {
    isModalShow(el) && dimmingModal(el);
    setTimeout(() => overlay.classList.add('hidden'), 700);
  });
}

const switchModal = function (e) {
  e.preventDefault();
  modals.forEach((el) => {
    if (isModalShow(el)) dimmingModal(el);
    else {
      setTimeout(() => el.classList.add(animatedIn), 600);
      setTimeout(() => spanHighlight(el), 700);
      setTimeout(() => el.classList.add('floating'), 1000);
    };
  })
}

// Handle modal
overlay.addEventListener('click', closeModal);
btnSwitch.forEach(btn => btn.addEventListener('click', switchModal));
btnCloseModal.forEach(btn => btn.addEventListener('click', closeModal));
document.addEventListener('keydown', (e) => e.key === 'Escape' && closeModal());
btnOpenModal.forEach(btn => btn.addEventListener('click', (e) => {
  e.preventDefault();
  openModal(modalSignup);
}));

// Go to the top when click on the logo
logo.addEventListener('click', function (e) {
  e.preventDefault();
  header.scrollIntoView({ behavior: 'smooth' });
});

// Highlight animation
highlight.forEach((e, i) => {
  setTimeout(() => {
    e.classList.add('highlight');
  }, i / 2 * 1000);
});

// Cookies Notification
const removeMessage = function () {
  message.style.transform = 'translateY(100px)';
  setTimeout(() => message.remove(), 2000);
}
message.classList.add('message');
message.style.backgroundColor = 'rgba(var(--tertiary-rgb),.9)';
message.style.backdropFilter = 'blur(.6rem)';
message.innerHTML = `<div class='container'><div class='left'><img src='/assets/img/the-bankist-footer.svg' width='80'>We use cookies for improved functionality and analytics.</div><button class="btn btn-primary close-message">Got it!</button></div>`;
document.body.append(message);
message.style.height = Number.parseInt(getComputedStyle(message).height, 10) + 40 + 'px';
document.querySelector('.close-message').addEventListener('click', () => removeMessage());
setTimeout(() => message.style.transform = 'translateY(0)', 3000);
setTimeout(() => { removeMessage() }, 9000);
setTimeout(() => { if (checkModalShow) return; else openModal(modalSignup) }, 10000);

const styleElement = (element, style, value) => element.style[style] = value;

// Menu dimming effect
const handleHover = function (e) {
  const target = e.target;
  const scale = this < 1 ? 1.1 : this;
  const navSelect = target.closest('.nav');
  const navLogo = navSelect.querySelector('.nav__logo');
  const siblings = navSelect.querySelectorAll('.nav__link');

  if (target.classList.contains('nav__link')) {
    siblings.forEach(el => {
      if (el !== target) styleElement(el, 'opacity', this);
      else styleElement(el, 'transform', `scale(${scale})`);
    });
    styleElement(navLogo, 'opacity', this);
  }
  if (target.classList.value === 'nav__logo') {
    styleElement(target, 'transform', `scale(${scale})`);
    siblings.forEach(el => styleElement(el, 'opacity', this));
  }
}
nav.addEventListener('mouseover', handleHover.bind(.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// Smooth Scrolling for "Learn more" button
btnScrollTo.addEventListener('click', function () {
  features.scrollIntoView({ behavior: 'smooth' });
});

// Page navigation
navLinks.addEventListener('click', function (e) {
  e.preventDefault();
  const target = e.target;
  if (target.classList.value === 'nav__link hover-dot') {
    const id = target.getAttribute('href');
    const section = document.querySelector(id);
    section.scrollIntoView({ behavior: 'smooth' });
  }
});

// Operations Tab
tabsContainer.addEventListener('click', function (e) {
  e.preventDefault();
  const target = e.target.closest('.operations__tab');

  // Guard clause
  if (!target) return;

  tabs.forEach(tab => {
    tab.classList.remove('--active');
  });
  tabsContent.forEach(content => {
    content.classList.remove('--active');
  });
  target.classList.add('--active');
  document.querySelector(`.${target.dataset.tab}`).classList.add('--active');
});

// Sticky navigation
const navHeight = nav.getBoundingClientRect().height;
const margin = `-${navHeight}px 0px 0px`;

const callback = function (entries) {
  const [entry] = entries;
  const className = entry.target.classList.value;
  if (className === 'add-sticky') {
    if (!entry.isIntersecting) nav.classList.add('sticky'); else nav.classList.remove('sticky');
  }
  else if (className === 'header') {
    if (!entry.isIntersecting) nav.classList.add('show'); else nav.classList.remove('show');
  }
}

const observer = function (element, rootMargin) {
  return new IntersectionObserver(callback, { rootMargin }).observe(element);
}

observer(addSticky);
observer(header, margin);

// Revealing sections on scroll
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('--hidden');
  observer.unobserve(entry.target);
}

sections.forEach(section => {
  new IntersectionObserver(revealSection, { threshold: .2 }).observe(section);
  section.classList.add('--hidden');
});

// Lazy loading images
const lazyImgs = document.querySelectorAll('img[data-src]');
const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', () => entry.target.classList.remove('lazy-img'));
  observer.unobserve(entry.target);
};
lazyImgs.forEach(img => new IntersectionObserver(loadImg).observe(img))

// Building testimonials slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelector('.dots');
  const slideLeft = document.querySelector('.slider__btn.--left');
  const slideRight = document.querySelector('.slider__btn.--right');

  let current = 0;
  const maxSlide = slides.length;

  const createDots = function () {
    slides.forEach((_, i) =>
      dots.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`)
    );
  };

  const activeDot = function (number) {
    const allDot = document.querySelectorAll('.dots__dot');
    const activeDot = document.querySelector(`.dots__dot[data-slide='${number}']`);
    allDot.forEach(dot => dot.classList.remove('--active'));
    activeDot.classList.add('--active');
  }

  const slideTo = function (number) {
    slides.forEach((slide, i) => slide.style.transform = `translateX(${100 * (i - number)}%)`);
  }

  const slideNext = function () {
    if (current === maxSlide - 1) current = 0; else current++;
    slideTo(current); activeDot(current);
  }

  const slidePrev = function () {
    if (current === 0) current = maxSlide - 1; else current--;
    slideTo(current); activeDot(current);
  }

  const toggleHover = (element) => element.classList.toggle('--hover');

  const handleArrowKey = function (e) {
    if (e.key === 'ArrowRight') {
      if (e.type === 'keydown') {
        slideNext();
        toggleHover(slideRight);
      } else if (e.type === 'keyup') {
        setTimeout(() => toggleHover(slideRight), 300);
      }
    } else if (e.key === 'ArrowLeft') {
      if (e.type === 'keydown') {
        slidePrev();
        toggleHover(slideLeft);
      } else if (e.type === 'keyup') {
        setTimeout(() => toggleHover(slideLeft), 300);
      }
    }
  };

  slideRight.addEventListener('click', slideNext);
  slideLeft.addEventListener('click', slidePrev);

  document.addEventListener('keyup', handleArrowKey);
  document.addEventListener('keydown', handleArrowKey);

  dots.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      slideTo(slide); activeDot(slide);
    };
  });

  (function () {
    slideTo(current);
    createDots();
    activeDot(current);
  })();
}();