// Mobile Nav
// 1- get the nav button
const navButton = document.querySelector('.mobile-nav');
const headerEl = document.querySelector('.header');
const bodyEl = document.querySelector('body');

const toggleMobileNav = () => {
  // Short circuit if the header or body element is not available.
  // This could happen if the function is called before the DOM is ready.
  if (!headerEl || !bodyEl) return;

  // Toggle the 'active' class on the header element to show or hide the mobile nav.
  headerEl.classList.toggle('active');

  // Toggle the 'body-lock' class on the body element to prevent scrolling
  // when the mobile nav is visible.
  bodyEl.classList.toggle('body-lock', headerEl.classList.contains('active'));

  try {
    // If the mobile nav is being shown...
    if (headerEl.classList.contains('active')) {
      // Save the current scroll position.
      scrollY = window.scrollY;
      // Set the top CSS property on the body element to the negative of the scroll position.
      // This will "lock" the body element in place, preventing the user from scrolling.
      bodyEl.style.top = `-${scrollY}px`;
    } else {
      // If the mobile nav is being hidden...
      // Scroll the window to the saved scroll position.
      window.scrollTo(0, scrollY);
      // Remove the top CSS property on the body element, allowing the user to scroll again.
      bodyEl.style.top = '';
    }
  } catch (error) {
    // Log any errors to the console.
    console.error('Error toggling mobile navigation:', error);
  }
};

navButton.addEventListener('click', toggleMobileNav);

// Testimonials Carousel

// 1- get all the images
const testimonialsEls = document.querySelectorAll('.testimonial');
const testimonialButtonsContainerEl = document.querySelector(
  '.testimonials__buttons-container'
);
const container = document.querySelector('.testimonials__container');

let curPosition = 0;
const maxSlide = testimonialsEls.length;

// Function to create navigation dots for each testimonial
function createDots() {
  // Iterate over each testimonial element using forEach
  testimonialsEls.forEach((_, i) => {
    // Insert a button element into the testimonials buttons container
    // The button acts as a navigation dot for the corresponding testimonial
    // Set a data attribute 'data-slide' with the index 'i'
    testimonialButtonsContainerEl.insertAdjacentHTML(
      'beforeend', // Position where the HTML will be inserted (at the end of the container)
      `<button class="testimonials__button" data-slide="${i}"></button>` // Button HTML template
    );
  });
}

// Function to activate the correct navigation dot for the current testimonial slide.
// This is necessary when the user clicks on a navigation dot or when the carousel
// automatically changes slides.
function activateDot(slide) {
  // First, remove the 'active' class from all navigation dots. This is necessary
  // so that only one dot is active at any given time.
  document
    .querySelectorAll('.testimonials__button')
    .forEach(button => button.classList.remove('testimonials__button--active'));

  // Next, select the navigation dot that corresponds to the current slide (which
  // is passed as an argument to this function).
  // We use a template literal to create a CSS selector that will select the
  // correct navigation dot. The selector is in the format '.testimonials__button[data-slide="X"]',
  // where X is the value of the 'slide' argument.
  const dot = document.querySelector(
    `.testimonials__button[data-slide="${slide}"]`
  );

  // Finally, add the 'active' class to the selected navigation dot.
  dot.classList.add('testimonials__button--active');
}

function goToSlide(slide) {
  curPosition = slide;
  testimonialsEls.forEach((s, index) => {
    s.style.transform = `translateX(${(index - slide) * 110}%)`;
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

// Slider mobile touch functionality
let touchStartX = 0;
let touchEndX = 0;

function checkSwipeDirection() {
  // Determine the swipe direction based on the start and end X positions
  // If touchEndX is less than touchStartX, it's a left swipe, so direction is 1
  // Otherwise, it's a right swipe, so direction is -1
  const direction = touchEndX < touchStartX ? 1 : -1;

  // Update the current position of the testimonial slide
  // Use modulo operator to ensure the position wraps around within the range
  curPosition = (curPosition + direction + maxSlide) % maxSlide;

  // Log the current position (for debugging purposes)
  console.log(curPosition);

  // Move the carousel to the calculated slide position
  goToSlide(curPosition);

  // Activate the corresponding navigation dot for the current slide
  activateDot(curPosition);
}

container.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
});

container.addEventListener('touchend', e => {
  touchEndX = e.changedTouches[0].screenX;
  checkSwipeDirection();
});
