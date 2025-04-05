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
