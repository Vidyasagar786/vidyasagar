document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links a');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3 // Lower threshold to make content visible sooner
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active'); // Apply 'active' to the section itself
                // Update active navigation link
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${entry.target.id}`) {
                        link.classList.add('active');
                    }
                });
            }
            // Removed else block: content remains visible once revealed
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - document.querySelector('.main-header').offsetHeight, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initial check for active section on load
    if (sections.length > 0) {
        sections[0].classList.add('active'); // Activate the first section
        if (navLinks.length > 0) {
            navLinks[0].classList.add('active');
        }
    }
});