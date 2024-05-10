'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnScrollTo = document.querySelector('.scroll-to');
const sectionFeatures = document.querySelector('#features');
const sectionOperations = document.querySelector('#operations');
const sectionTestimonials = document.querySelector('#testimonials');
const btnCloseModal = document.querySelector('.close-modal');
const btnOpenModal = document.querySelectorAll('.show-modal');

const message = document.createElement('div');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden'))
    closeModal();
});

// Cookies Notification
setTimeout(() => {
  message.classList.add('message');
  message.style.backgroundColor = '#034748cc';
  message.style.backdropFilter = 'blur(1rem)';
  message.innerHTML = `<div class='container'><div class='left'><img src='/assets/img/the-bankist-footer.svg' width='80'>We use cookies for improved functionality and analytics.</div><button class="btn btn-secondary close-message">Got it!</button></div>`;
  document.body.append(message);
  message.style.height = Number.parseInt(getComputedStyle(message).height, 10) + 40 + 'px';
  document.querySelector('.close-message').addEventListener('click', function () {
    message.style.transform = 'translateY(100%)';
    setTimeout(() => message.remove(), 2000);
  });
}, 1000);

setTimeout(() => { message.style.transform = 'translateY(0)'; }, 2000);

// Smooth Scrolling for "Learn more" button
btnScrollTo.addEventListener('click', function () {
  sectionFeatures.scrollIntoView({ behavior: 'smooth' });
});