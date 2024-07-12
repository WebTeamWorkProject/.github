export const q = (selector) => document.querySelector(selector);
export const qs = (selector) => document.querySelectorAll(selector);

export const setActiveNav = (page) => {
  const navs = qs('a.nav-link');
  Array.from(navs).forEach(element => element.getAttribute('data-page') === page
    ? element.classList.add('active')
    : element.classList.remove('active')
  );
};