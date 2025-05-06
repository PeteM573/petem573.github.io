// --- Scrollspy for Navigation Highlighting ---

const sections = document.querySelectorAll('section[id]');
// Select links within the main navigation UL specifically
const navLinks = document.querySelectorAll('.main-nav ul li a[href^="#"]');

function activateNavLink() {
    let currentSectionId = '';
    // Adjust the offset based on your sticky header's height + a buffer
    const scrollOffset = 100;
    const scrollPosition = window.scrollY;

    sections.forEach(section => {
        // Calculate the top and bottom boundaries of the section considering the offset
        const sectionTop = section.offsetTop - scrollOffset;
        const sectionBottom = sectionTop + section.offsetHeight;

        // Check if the current scroll position is within the section's boundaries
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentSectionId = section.getAttribute('id');
        }
    });

    // Update active class on navigation links
    navLinks.forEach(link => {
        link.classList.remove('active');
        // Check if the link's href matches the current section ID
        // Ensure comparison accounts for the '#' symbol
        if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
        }
    });

    // Handle edge case: when scrolled very close to the top
    if (scrollPosition < sections[0].offsetTop - scrollOffset) {
         navLinks.forEach(link => link.classList.remove('active'));
    }
    // Add similar logic if needed for the very bottom of the page
}

// Add event listeners for scroll and page load
window.addEventListener('scroll', activateNavLink);
window.addEventListener('load', activateNavLink); // Activate on page load to highlight correctly


// --- Theme Toggle Code ---
const themeToggle = document.getElementById('theme-toggle');
// Function to set the theme (applies class and saves preference)
function setTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        // Optional: Update button icon/text for dark mode
        // themeToggle.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        // Optional: Update button icon/text for light mode
        // themeToggle.textContent = '🌓';
        localStorage.setItem('theme', 'light');
    }
}

// Apply saved theme on initial load or detect system preference
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme) {
    // Use saved theme if it exists
    setTheme(savedTheme);
} else if (prefersDark) {
    // Default to system preference if no theme is saved
    setTheme('dark');
} else {
    // Default to light theme otherwise
    setTheme('light');
}


// Add event listener for the toggle button
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        // Check current theme and toggle
        if (document.body.classList.contains('dark-mode')) {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    });
} else {
    console.error("Theme toggle button with ID 'theme-toggle' not found.");
}

// Optional: Listen for changes in system preference
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    // Only change if no theme preference is explicitly saved by the user
    if (!localStorage.getItem('theme')) {
        if (event.matches) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }
});