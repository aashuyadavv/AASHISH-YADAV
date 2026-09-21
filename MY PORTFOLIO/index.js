const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const form = document.querySelector('#contact-form');
const formStatus = document.querySelector('.form-status');

const setMenu = (open) => {
	menuToggle.setAttribute('aria-expanded', String(open));
	menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
	navLinks.classList.toggle('open', open);
};

menuToggle.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));

const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 24);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const revealObserver = new IntersectionObserver((entries, observer) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add('visible');
			observer.unobserve(entry.target);
		}
	});
}, { threshold: 0.14 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

document.querySelectorAll('.filter').forEach((filterButton) => {
	filterButton.addEventListener('click', () => {
		document.querySelector('.filter.active').classList.remove('active');
		filterButton.classList.add('active');
		const selectedFilter = filterButton.dataset.filter;
		document.querySelectorAll('.project-card').forEach((project, index) => {
			const shouldShow = selectedFilter === 'all' || project.dataset.category.split(' ').includes(selectedFilter);
			if (shouldShow) {
				project.classList.remove('is-hidden');
				project.style.animation = `project-in .45s ${index * 60}ms both`;
			} else {
				project.classList.add('is-hidden');
				project.style.animation = '';
			}
		});
	});
});

form.addEventListener('submit', (event) => {
	event.preventDefault();
	if (!form.checkValidity()) {
		formStatus.textContent = 'Please complete all fields with a valid email.';
		form.reportValidity();
		return;
	}
	formStatus.textContent = 'Thanks. This form is ready, but no backend is connected yet.';
	form.reset();
});
