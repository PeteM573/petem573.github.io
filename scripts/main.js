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

// --- Language Toggle Code ---

const langToggle = document.getElementById('lang-toggle');
const htmlEl = document.documentElement; // Get the <html> element

// Function to set the language
function setLanguage(lang) {
    if (lang === 'ja') {
        // Switch to Japanese
        htmlEl.setAttribute('lang', 'ja'); // Update <html lang="...">
        document.body.classList.add('lang-selected-ja'); // Add class to body
        langToggle.textContent = 'EN'; // Update button text to show the *other* option
        langToggle.setAttribute('aria-label', 'Switch to English'); // Update accessibility label
        localStorage.setItem('portfolioLang', 'ja'); // Save preference
    } else {
        // Switch to English (default)
        htmlEl.setAttribute('lang', 'en'); // Update <html lang="...">
        document.body.classList.remove('lang-selected-ja'); // Remove class from body
        langToggle.textContent = '日本語'; // Update button text
        langToggle.setAttribute('aria-label', 'Switch to Japanese'); // Update accessibility label
        localStorage.setItem('portfolioLang', 'en'); // Save preference
    }
    // Optional: Re-run scrollspy activation in case content height changed significantly
    // activateNavLink();
}

// Apply saved language on initial load
const savedLang = localStorage.getItem('portfolioLang');

// Set initial language based on saved preference or default to 'en'
setLanguage(savedLang === 'ja' ? 'ja' : 'en');


// Add event listener for the language toggle button
if (langToggle) {
    langToggle.addEventListener('click', () => {
        // Check current language and toggle
        const currentLang = htmlEl.getAttribute('lang');
        if (currentLang === 'ja') {
            setLanguage('en');
        } else {
            setLanguage('ja');
        }
    });
} else {
    console.error("Language toggle button with ID 'lang-toggle' not found.");
}

// --- Responsive Navigation (Hamburger Menu) ---

const navToggle = document.querySelector('.nav-toggle');
const mainNavigation = document.getElementById('main-navigation'); // Corrected ID from HTML
const navLinksForMobileMenu = document.querySelectorAll('#main-navigation .nav-link'); // Links for closing menu

if (navToggle && mainNavigation) {
    navToggle.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
        navToggle.setAttribute('aria-expanded', !isExpanded);
        mainNavigation.classList.toggle('is-active');

        // Optional: Prevent body scroll when mobile nav is open
        if (mainNavigation.classList.contains('is-active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close mobile menu when a nav link is clicked (for single-page navigation)
    navLinksForMobileMenu.forEach(link => {
        link.addEventListener('click', () => {
            // Check if the mobile menu is active before trying to close
            if (mainNavigation.classList.contains('is-active')) {
                navToggle.setAttribute('aria-expanded', 'false');
                mainNavigation.classList.remove('is-active');
                document.body.style.overflow = ''; // Restore scroll
            }
        });
    });

    // Optional: Close mobile menu if user clicks outside of it (on the overlay)
    // mainNavigation.addEventListener('click', (event) => {
    //     if (event.target === mainNavigation && mainNavigation.classList.contains('is-active')) {
    //         navToggle.setAttribute('aria-expanded', 'false');
    //         mainNavigation.classList.remove('is-active');
    //         document.body.style.overflow = '';
    //     }
    // });


} else {
    if (!navToggle) console.error("Navigation toggle button (.nav-toggle) not found.");
    if (!mainNavigation) console.error("Main navigation element (#main-navigation) not found.");
}