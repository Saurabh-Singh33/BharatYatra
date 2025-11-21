// Initialize AOS animation library
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });
    
    // Initialize the application
    initializeApp();
});

// Main application initialization
function initializeApp() {
    // Initialize event listeners
    initializeEventListeners();
    
    // Set initial tab state
    switchTab('user');
}

// Initialize all event listeners
function initializeEventListeners() {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Navigation links
    const navLinks = document.querySelectorAll('nav a, #mobile-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const type = this.textContent.trim();
                handleNavLinkClick(type);
                
                // Close mobile menu if open
                if (mobileMenu) mobileMenu.classList.add('hidden');
            }
        });
    });
    
    // Login buttons
    const userLoginBtn = document.getElementById('user-login-btn');
    const adminLoginBtn = document.getElementById('admin-login-btn');
    const mobileUserLogin = document.getElementById('mobile-user-login');
    const mobileAdminLogin = document.getElementById('mobile-admin-login');
    
    if (userLoginBtn) userLoginBtn.addEventListener('click', () => openLoginModal('user'));
    if (adminLoginBtn) adminLoginBtn.addEventListener('click', () => openLoginModal('admin'));
    if (mobileUserLogin) mobileUserLogin.addEventListener('click', () => {
        openLoginModal('user');
        if (mobileMenu) mobileMenu.classList.add('hidden');
    });
    if (mobileAdminLogin) mobileAdminLogin.addEventListener('click', () => {
        openLoginModal('admin');
        if (mobileMenu) mobileMenu.classList.add('hidden');
    });
    
    // Search button
    const searchBtn = document.getElementById('search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', simulateHeroSearch);
    }
    
    // Modal controls
    const closeModalBtn = document.getElementById('close-modal');
    const loginModal = document.getElementById('login-modal');
    const backToAdminLogin = document.getElementById('back-to-admin-login');
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            if (loginModal) loginModal.classList.add('hidden');
        });
    }
    
    if (backToAdminLogin) {
        backToAdminLogin.addEventListener('click', () => {
            switchTab('admin');
        });
    }
    
    // Close modal when clicking outside
    if (loginModal) {
        loginModal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.add('hidden');
            }
        });
    }
    
    // Tab switching
    const userTab = document.getElementById('tab-user');
    const adminTab = document.getElementById('tab-admin');
    
    if (userTab) userTab.addEventListener('click', () => switchTab('user'));
    if (adminTab) adminTab.addEventListener('click', () => switchTab('admin'));
    
    // Form submissions
    const userForm = document.getElementById('login-form-user');
    const adminForm = document.getElementById('login-form-admin');
    
    if (userForm) {
        userForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alertMessage('Success! User login simulated. Loading profile.', 'green');
            const loginModal = document.getElementById('login-modal');
            if (loginModal) loginModal.classList.add('hidden');
        });
    }
    
    if (adminForm) {
        adminForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleAdminLogin();
        });
    }
    
    // Sidebar navigation in admin dashboard
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            setActiveSidebarItem(this);
        });
    });
}

// Function called when a main navigation link (Flights, Hotels, etc.) is clicked
function handleNavLinkClick(type) {
    const resultsContainer = document.getElementById('dynamic-search-results');
    
    // 1. Generate Simulated Content
    const randomContent = `
        <p class="font-bold text-lg">Results for: ${type}</p>
        <p class="text-sm mt-1">Simulating search: dynamically loaded list of 5 random ${type} deals matching the latest trends. Scroll below (and horizontally on small screens) to see highlighted destinations!</p>
    `;

    // 2. Inject and Show Content
    if (resultsContainer) {
        resultsContainer.innerHTML = randomContent;
        resultsContainer.classList.remove('hidden');

        // 3. Scroll to the results container for visibility
        resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Function called when the Hero section's "Find Deals" button is clicked
function simulateHeroSearch() {
    const tripType = document.getElementById('trip-type');
    const destination = document.getElementById('destination');
    
    let message = '';
    if (destination && destination.value.trim()) {
        message = `Search initiated for ${tripType ? tripType.value : 'Flights'} to: ${destination.value.trim()}. Loading best current offers...`;
    } else {
        message = `Search initiated for all ${tripType ? tripType.value : 'Flights'} offers. Please enter a destination for refined results!`;
    }

    alertMessage(message, 'green'); 
}

// --- Modal Control Functions ---
function openLoginModal(role) {
    const modal = document.getElementById('login-modal');
    if (modal) {
        modal.classList.remove('hidden');
        switchTab(role);
    }
}

// Function to switch between User and Admin tabs
function switchTab(role) {
    const userTab = document.getElementById('tab-user');
    const adminTab = document.getElementById('tab-admin');
    const userForm = document.getElementById('login-form-user');
    const adminForm = document.getElementById('login-form-admin');
    const adminDashboard = document.getElementById('admin-dashboard'); 
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.querySelector('#login-modal > div');
    
    // Reset visibility of forms and dashboard
    if (userForm) userForm.classList.add('hidden');
    if (adminForm) adminForm.classList.add('hidden');
    if (adminDashboard) adminDashboard.classList.add('hidden');
    
    const modalHeader = document.getElementById('modal-header');
    const modalTabs = document.getElementById('modal-tabs');
    
    if (modalHeader) modalHeader.classList.remove('hidden');
    if (modalTabs) modalTabs.classList.remove('hidden');

    // Reset modal size for login view
    if (modalContent) {
        modalContent.classList.remove('max-w-7xl', 'h-[90vh]', 'overflow-y-auto');
        modalContent.classList.add('max-w-md', 'h-auto');
    }
    
    if (role === 'user') {
        // Activate User tab styling and show User form
        if (userTab) {
            userTab.classList.add('text-indigo-600', 'border-indigo-600');
            userTab.classList.remove('text-gray-500', 'border-transparent', 'text-red-600', 'border-red-600');
        }
        if (adminTab) {
            adminTab.classList.add('text-gray-500', 'border-transparent');
            adminTab.classList.remove('text-indigo-600', 'border-indigo-600', 'text-red-600', 'border-red-600');
        }
        
        if (userForm) userForm.classList.remove('hidden');
        
        if (modalTitle) modalTitle.textContent = 'User Dashboard Login';

    } else if (role === 'admin') {
        // Activate Admin tab styling and show Admin form
        if (adminTab) {
            adminTab.classList.add('text-red-600', 'border-red-600');
            adminTab.classList.remove('text-gray-500', 'border-transparent', 'text-indigo-600', 'border-indigo-600');
        }
        if (userTab) {
            userTab.classList.add('text-gray-500', 'border-transparent');
            userTab.classList.remove('text-red-600', 'border-red-600', 'text-indigo-600', 'border-indigo-600');
        }
        
        // Show the login form
        if (adminForm) adminForm.classList.remove('hidden');
        
        if (modalTitle) modalTitle.textContent = 'Admin Control Panel';
    }
}

// Handle admin login and show dashboard
function handleAdminLogin() {
    // Simulate successful login
    alertMessage('Admin Login Successful! Loading dashboard.', 'green');
    
    const adminForm = document.getElementById('login-form-admin');
    const modalHeader = document.getElementById('modal-header');
    const modalTabs = document.getElementById('modal-tabs');
    const adminDashboard = document.getElementById('admin-dashboard');
    const modalContent = document.querySelector('#login-modal > div');
    
    // 1. Hide tabs, forms, and login header
    if (adminForm) adminForm.classList.add('hidden');
    if (modalHeader) modalHeader.classList.add('hidden');
    if (modalTabs) modalTabs.classList.add('hidden');
    
    // 2. Adjust modal size for dashboard view (fuller screen)
    if (modalContent) {
        modalContent.classList.remove('max-w-md', 'h-auto');
        modalContent.classList.add('max-w-7xl', 'h-[90vh]', 'overflow-y-auto'); 
    }
    
    // 3. Show dashboard
    if (adminDashboard) adminDashboard.classList.remove('hidden');
    
    // 4. Initialize dashboard animations
    initializeDashboardAnimations();
}

// Custom non-alert message box function
function alertMessage(message, color) {
    const tempAlert = document.createElement('div');
    tempAlert.textContent = message;
    tempAlert.className = 'alert-message';
    
    const bgColor = color === 'green' ? '#10B981' : 
                   color === 'indigo' ? '#4F46E5' :
                   '#EF4444';
    
    tempAlert.style.backgroundColor = bgColor;
    
    document.body.appendChild(tempAlert);

    setTimeout(() => {
        if (tempAlert.parentNode) {
            tempAlert.parentNode.removeChild(tempAlert);
        }
    }, 4000);
}

// Admin Dashboard Functions
function setActiveSidebarItem(element) {
    // Remove active class from all sidebar items
    document.querySelectorAll('.sidebar-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to clicked item
    element.classList.add('active');
    
    // Add animation effect
    element.style.transform = 'scale(0.98)';
    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, 150);
}

function initializeDashboardAnimations() {
    // Animate chart bars
    const chartBars = document.querySelectorAll('.chart-bar');
    chartBars.forEach((bar, index) => {
        // Reset height to 0 for animation
        const originalHeight = bar.style.height;
        bar.style.height = '0%';
        
        // Animate to original height with delay
        setTimeout(() => {
            bar.style.height = originalHeight;
        }, 300 + (index * 100));
    });
    
    // Animate cards with staggered delay
    const adminCards = document.querySelectorAll('.admin-card');
    adminCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 200 + (index * 100));
    });
}