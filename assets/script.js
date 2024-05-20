'use strict';

const nav = document.querySelector('.nav');
const logo = document.querySelector('.logo');
const modal = document.querySelector('.modal');
const header = document.querySelector('.header');
const overlay = document.querySelector('.overlay');
const features = document.querySelector('#features');
const navLinks = document.querySelector('.nav__links');
const addSticky = document.querySelector('.add-sticky');
const highlight = document.querySelectorAll('h1 span');
const highlightModal = document.querySelector('h2 span');
const btnScrollTo = document.querySelector('.scroll-to');
const tabs = document.querySelectorAll('.operations__tab');
const btnCloseModal = document.querySelector('.close-modal');
const btnOpenModal = document.querySelectorAll('.show-modal');
const tabsContent = document.querySelectorAll('.operations__content');
const tabsContainer = document.querySelector('.operations__tab-container');

const message = document.createElement('div');

// Modal
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
  setTimeout(() => highlightModal.classList.add('highlight'), 100);
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
  setTimeout(() => highlightModal.classList.remove('highlight'), 100);
};

btnOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden'))
    closeModal();
});

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
const rootMargin = `-${navHeight}px 0px 0px`;

const callback = function (entries) {
  entries.forEach(entry => {
    const className = entry.target.classList.value;
    if (className === 'add-sticky') { if (!entry.isIntersecting) nav.classList.add('sticky'); else nav.classList.remove('sticky'); }
    else if (className === 'header') { if (!entry.isIntersecting) nav.classList.add('show'); else nav.classList.remove('show'); }
  });
}

const observer = function (element, rootMargin = '0px', threshold = 0) {
  return new IntersectionObserver(callback, { rootMargin, threshold }).observe(element);
}

observer(addSticky);
observer(header, rootMargin);