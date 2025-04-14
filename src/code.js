// Mobile Nav
// 1- get the nav button
const navButton = document.querySelector('.mobile-nav');
const headerEl = document.querySelector('.header');
const bodyEl = document.querySelector('body');

let scrollY = 0;
navButton.addEventListener('click', () => {
  scrollY = window.scrollY;
  // 2- check the state of the nav (open or close), by checking if the header has the active class

  if (headerEl.classList.contains('active')) {
    // 3- if the nav is open, close it by removing the active class from the header
    headerEl.classList.remove('active');
    bodyEl.classList.remove('body-lock');
    bodyEl.style.top = '';
    window.scrollTo(0, scrollY);
  } else {
    // 4- if the nav is closed, open it by adding the active class to the header
    headerEl.classList.add('active');
    bodyEl.classList.add('body-lock');
    bodyEl.style.top = `-${scrollY}px`;
  }
});

// Testimonials Carousel

// 1- get all the images
const testimonialsEls = document.querySelectorAll('.testimonial');
const testimonialButtonsContainerEl = document.querySelector(
  '.testimonials__buttons-container'
);
const container = document.querySelector('.testimonials__container');

let curPosition = 0;
const maxSlide = testimonialsEls.length;

// functions
function createDots() {
  testimonialsEls.forEach((_, i) => {
    testimonialButtonsContainerEl.insertAdjacentHTML(
      'beforeend',
      `<button class="testimonials__button" data-slide="${i}"></button>`
    );
  });
}

function activateDot(slide) {
  document
    .querySelectorAll('.testimonials__button')
    .forEach(button => button.classList.remove('testimonials__button--active'));

  document
    .querySelector(`.testimonials__button[data-slide="${slide}"]`)
    .classList.add('testimonials__button--active');
}

function goToSlide(slide) {
  curPosition = slide;
  testimonialsEls.forEach((s, index) => {
    s.style.transform = `translateX(${(index - slide) * 100}%)`;
  });
}

let interval;
function startAutoSlide() {
  const maxSlides = testimonialsEls.length;
  interval = setInterval(() => {
    if (curPosition >= maxSlides) curPosition = 0;
    goToSlide(curPosition);
    activateDot(curPosition);
    curPosition++;
  }, 5000);
}

function stopAutoSlide() {
  clearInterval(interval);
}
function changeSlide() {
  startAutoSlide();

  // Pause on hover (desktop)
  container.addEventListener('mouseenter', stopAutoSlide);
  container.addEventListener('mouseleave', startAutoSlide);

  // Pause on touch (mobile)
  container.addEventListener('touchstart', stopAutoSlide);
  container.addEventListener('touchend', startAutoSlide);
}

function init() {
  goToSlide(0);
  createDots();
  activateDot(0);
  changeSlide();
}
init();

// make the testimonials periodically change

testimonialButtonsContainerEl.addEventListener('click', e => {
  if (e.target.classList.contains('testimonials__button')) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});
