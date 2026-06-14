document.addEventListener('DOMContentLoaded', () => {
	// Theme Toggle (guarded)
	const toggle = document.getElementById('theme-toggle');
	if (toggle) {
		toggle.addEventListener('click', () => {
			document.body.classList.toggle('light-theme');
			localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
		});
	}

	// Load saved theme
	const savedTheme = localStorage.getItem('theme');
	if (savedTheme === 'light') {
		document.body.classList.add('light-theme');
	}

	// Resume download: open in new tab and trigger download for any anchor with `download` or `.download-resume`
	const downloadAnchors = Array.from(document.querySelectorAll('a[download], .download-resume'));
	downloadAnchors.forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();
			const url = this.href;
			// open preview in new tab
			window.open(url, '_blank');
			// trigger download
			const link = document.createElement('a');
			link.href = url;
			link.download = '';
			document.body.appendChild(link);
			link.click();
			link.remove();
		});
	});

	// Smooth scroll behavior for internal navigation links
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();
			const target = document.querySelector(this.getAttribute('href'));
			if (target) {
				target.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}
		});
	});

	// Intersection Observer for fade-in animations
	const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.style.opacity = '1';
				entry.target.style.transform = 'translateY(0px)';
				observer.unobserve(entry.target);
			}
		});
	}, observerOptions);

	// Observe elements for animation
	const elements = document.querySelectorAll('.card, .project-card, .skill-category, .skill-tag');
	elements.forEach(element => {
		element.style.opacity = '0';
		element.style.transform = 'translateY(30px)';
		element.style.transition = 'all 0.6s ease-out';
		observer.observe(element);
	});

	// Footer year
	const yearEl = document.getElementById('year');
	if (yearEl) yearEl.textContent = new Date().getFullYear();
});