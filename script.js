// Demo Google Drive Links Configuration
const demoLinks = {
    repository: 'https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL3UvcyFBdUwzTFhBVzlMZ2dwaWVFTmN5cE1EV25EbnVSP2U9V3lKQ1ZI&id=20B8F416702DF7E2%214903&cid=20B8F416702DF7E2',
    courseMaterials: 'https://drive.google.com/drive/folders/DEMO-COURSES-ID',
    assocDocs: 'https://drive.google.com/drive/folders/DEMO-ASSOCIATION-ID'
};

// Navigation functionality
document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', function () {
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link, .dropdown-menu a, .info-card-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navMenu.classList.remove('active');
        });
    });

    // Page navigation using hash
    function showPage(pageId) {
        // Hide all pages
        const pages = document.querySelectorAll('.page');
        pages.forEach(page => {
            page.classList.remove('active');
        });

        // Show the selected page
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    // Handle hash changes
    function handleHashChange() {
        let hash = window.location.hash.substring(1); // Remove the #
        if (!hash) {
            hash = 'home'; // Default to home page
        }
        showPage(hash);
    }

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    // Handle initial page load
    handleHashChange();

    // Handle all navigation links
    const allLinks = document.querySelectorAll('a[href^="#"]');
    allLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                const pageId = href.substring(1);
                window.location.hash = pageId;
            }
        });
    });

    

    // Contact form handling
    setupContactForm();

    // Dark mode functionality
    initDarkMode();

    
});

// Setup demo Google Drive links
function setupDemoLinks() {
    // Repository links
    const repoLinks = document.querySelectorAll('#repositoryLink, #repositoryLink2');
    repoLinks.forEach(link => {
        link.href = demoLinks.repository;
        link.target = '_blank';
        link.addEventListener('click', function (e) {
            e.preventDefault();
            showDemoAlert('Αποθετήριο', 'Αυτός είναι ένας demo σύνδεσμος Google Drive. Στην πραγματική εφαρμογή, θα οδηγούσε σε φάκελο με κοινόχρηστα αρχεία.');
        });
    });

    // Course materials link
    const courseMaterialsLink = document.getElementById('courseMaterialsLink');
    if (courseMaterialsLink) {
        courseMaterialsLink.href = demoLinks.courseMaterials;
        courseMaterialsLink.target = '_blank';
        courseMaterialsLink.addEventListener('click', function (e) {
            e.preventDefault();
            showDemoAlert('Υλικό Μαθημάτων', 'Αυτός είναι ένας demo σύνδεσμος Google Drive. Στην πραγματική εφαρμογή, θα οδηγούσε σε οργανωμένους φακέλους με υλικό για κάθε μάθημα (σημειώσεις, ασκήσεις, εργαστήρια).');
        });
    }

    // Association documents link
    const assocDocsLink = document.getElementById('assocDocsLink');
    if (assocDocsLink) {
        assocDocsLink.href = demoLinks.assocDocs;
        assocDocsLink.target = '_blank';
        assocDocsLink.addEventListener('click', function (e) {
            e.preventDefault();
            showDemoAlert('Έγγραφα Συλλόγου', 'Αυτός είναι ένας demo σύνδεσμος Google Drive. Στην πραγματική εφαρμογή, θα οδηγούσε σε φάκελο με πρακτικά και αποφάσεις του Συλλόγου Προπτυχιακών Φοιτητών.');
        });
    }
}

// Show demo alert
function showDemoAlert(title, message) {
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;

    // Create modal content
    const modal = document.createElement('div');
    modal.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 15px;
        max-width: 500px;
        margin: 1rem;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        animation: slideIn 0.3s ease;
    `;

    modal.innerHTML = `
        <h2 style="color: #4A90E2; margin-bottom: 1rem; font-size: 1.8rem;">📁 ${title}</h2>
        <p style="color: #6c757d; line-height: 1.6; margin-bottom: 1.5rem;">${message}</p>
        <button id="closeModal" style="
            background: #4A90E2;
            color: white;
            border: none;
            padding: 0.75rem 2rem;
            border-radius: 50px;
            font-weight: 600;
            cursor: pointer;
            font-size: 1rem;
            transition: all 0.3s ease;
        ">Κατάλαβα</button>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Close modal functionality
    const closeBtn = modal.querySelector('#closeModal');
    closeBtn.addEventListener('mouseenter', function () {
        this.style.background = '#357ABD';
        this.style.transform = 'translateY(-2px)';
    });
    closeBtn.addEventListener('mouseleave', function () {
        this.style.background = '#4A90E2';
        this.style.transform = 'translateY(0)';
    });
    closeBtn.addEventListener('click', function () {
        overlay.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => overlay.remove(), 300);
    });

    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) {
            overlay.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => overlay.remove(), 300);
        }
    });
}

// Setup contact form
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Simulate form submission
            formMessage.textContent = 'Η φόρμα υποβλήθηκε επιτυχώς! (Demo - δεν στάλθηκε πραγματικό email)';
            formMessage.className = 'form-message success';

            // Reset form
            contactForm.reset();

            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
                formMessage.className = 'form-message';
            }, 5000);

            // Log to console for demo purposes
            console.log('Form Submission (Demo):', {
                name,
                email,
                subject,
                message
            });
        });
    }
}

// Show demo notification on first load
function showDemoNotification() {
    // Check if notification was already shown
    if (sessionStorage.getItem('demoNotificationShown')) {
        return;
    }

    setTimeout(() => {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 1.5rem 2rem;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            max-width: 350px;
            z-index: 9999;
            animation: slideInRight 0.5s ease;
            cursor: pointer;
        `;

        notification.innerHTML = `
            <div style="display: flex; align-items: start; gap: 1rem;">
                <div style="font-size: 2rem;">ℹ️</div>
                <div>
                    <h4 style="margin: 0 0 0.5rem 0; font-size: 1.1rem;">Demo Mode</h4>
                    <p style="margin: 0; font-size: 0.9rem; opacity: 0.95;">
                        Αυτή είναι μια τοπική αναδημιουργία. Οι σύνδεσμοι Google Drive είναι demo.
                    </p>
                </div>
            </div>
        `;

        document.body.appendChild(notification);

        // Auto-hide after 8 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => notification.remove(), 500);
        }, 8000);

        // Click to dismiss
        notification.addEventListener('click', function () {
            this.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => this.remove(), 500);
        });

        // Mark as shown
        sessionStorage.setItem('demoNotificationShown', 'true');
    }, 1000);
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    @keyframes slideIn {
        from { transform: translateY(-30px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    @keyframes slideInRight {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Dark Mode Functionality
function initDarkMode() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const html = document.documentElement;
    
    // Check for saved theme preference or default to 'light' mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', currentTheme);
    
    // Update icon based on current theme
    updateThemeIcon(currentTheme);
    
    // Toggle theme when button is clicked
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }
    
  function updateThemeIcon(theme) {
    // CSS handles the icon via data-theme attribute
    // No need to set text content anymore
    if (themeIcon) {
        // Optionally, you can add an accessibility attribute
        themeIcon.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
}
}


// Mobile nested dropdown support
const dropdownLinks = document.querySelectorAll('.dropdown-link');
dropdownLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const parent = this.parentElement;
            parent.classList.toggle('active');
            
            // Close other nested dropdowns
            dropdownLinks.forEach(otherLink => {
                if (otherLink !== this) {
                    otherLink.parentElement.classList.remove('active');
                }
            });
        }
    });
});

// Close nested dropdowns when clicking elsewhere on mobile
document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
        if (!e.target.closest('.nav-dropdown-sub')) {
            document.querySelectorAll('.nav-dropdown-sub').forEach(item => {
                item.classList.remove('active');
            });
        }
    }
});
