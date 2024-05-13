'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnScrollTo = document.querySelector('.scroll-to');
const sectionFeatures = document.querySelector('#features');
const sectionOperations = document.querySelector('#operations');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');
const tabsContainer = document.querySelector('.operations__tab-container');
const sectionTestimonials = document.querySelector('#testimonials');
const btnCloseModal = document.querySelector('.close-modal');
const btnOpenModal = document.querySelectorAll('.show-modal');
const highlight = document.querySelectorAll('h1 span');
const highlightModal = document.querySelector('h2 span');
const navLinks = document.querySelector('.nav__links');

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
message.innerHTML = `<div class='container'><div class='left'><img src='/assets/img/the-bankist-footer.svg' width='80'>We use cookies for improved functionality and analytics.</div><button class="btn btn-secondary close-message">Got it!</button></div>`;
document.body.append(message);
message.style.height = Number.parseInt(getComputedStyle(message).height, 10) + 40 + 'px';
document.querySelector('.close-message').addEventListener('click', () => removeMessage());
setTimeout(() => message.style.transform = 'translateY(0)', 3000);
setTimeout(() => { removeMessage() }, 9000);

// Smooth Scrolling for "Learn more" button
btnScrollTo.addEventListener('click', function () {
  sectionFeatures.scrollIntoView({ behavior: 'smooth' });
});

// Page navigation
navLinks.addEventListener('click', function (e) {
  e.preventDefault();
  const target = e.target;
  if (target.classList.value === 'nav__link') {
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