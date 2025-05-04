// Basic Scrollspy for Navigation Highlighting

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.main-nav a');

function activateNavLink() {
    let currentSectionId = '';
    const scrollPosition = window.scrollY;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100; // Offset for header height + buffer
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSectionId = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        // Check if the link's href matches the current section ID
        if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
        }
    });

     // Handle case when scrolled to the very top or bottom
    if (scrollPosition < sections[0].offsetTop - 100) {
         navLinks.forEach(link => link.classList.remove('active')); // No active link at the top
         // Or activate the first link if preferred:
         // if (navLinks[0]) navLinks[0].classList.add('active');
    }
    // Add similar logic for bottom if needed
}

window.addEventListener('scroll', activateNavLink);
window.addEventListener('load', activateNavLink); // Activate on page load

// TODO: Test this scrollspy thoroughly and adjust offset/logic if needed.
// Consider using Intersection Observer API for a more performant solution if desired.