// Enhanced Application Data with More Realistic Data
const appData = {
  sampleSubscriptions: [
    {
      id: 1,
      name: "Netflix",
      category: "Entertainment",
      cost: 15.49,
      billingCycle: "monthly",
      nextBilling: "2025-10-15",
      startDate: "2024-10-15",
      status: "active",
      color: "#E50914",
      icon: "🎬",
      usageScore: 85,
      description: "Streaming entertainment platform"
    },
    {
      id: 2,
      name: "Spotify Premium",
      category: "Music",
      cost: 9.99,
      billingCycle: "monthly",
      nextBilling: "2025-10-08",
      startDate: "2024-05-08",
      status: "active",
      color: "#1DB954",
      icon: "🎵",
      usageScore: 95,
      description: "Music streaming service"
    },
    {
      id: 3,
      name: "Adobe Creative Cloud",
      category: "Productivity",
      cost: 52.99,
      billingCycle: "monthly",
      nextBilling: "2025-10-20",
      startDate: "2024-08-20",
      status: "active",
      color: "#FF0000",
      icon: "🎨",
      usageScore: 65,
      description: "Creative software suite"
    },
    {
      id: 4,
      name: "Microsoft 365",
      category: "Productivity",
      cost: 99.99,
      billingCycle: "yearly",
      nextBilling: "2026-03-15",
      startDate: "2025-03-15",
      status: "active",
      color: "#0078D4",
      icon: "💼",
      usageScore: 80,
      description: "Office productivity suite"
    },
    {
      id: 5,
      name: "Dropbox Pro",
      category: "Cloud Storage",
      cost: 11.99,
      billingCycle: "monthly",
      nextBilling: "2025-10-12",
      startDate: "2024-07-12",
      status: "active",
      color: "#0061FF",
      icon: "☁️",
      usageScore: 70,
      description: "Cloud storage service"
    }
  ],
  
  monthlySpendingData: [
    {month: "Apr", amount: 110.45},
    {month: "May", amount: 122.44},
    {month: "Jun", amount: 98.47},
    {month: "Jul", amount: 175.43},
    {month: "Aug", amount: 189.45},
    {month: "Sep", amount: 189.46}
  ],
  
  categorySpending: [
    {category: "Entertainment", amount: 25.48, percentage: 13.5, color: "#E50914"},
    {category: "Productivity", amount: 152.98, percentage: 80.7, color: "#0078D4"},
    {category: "Cloud Storage", amount: 11.99, percentage: 6.3, color: "#0061FF"},
    {category: "Music", amount: 9.99, percentage: 5.3, color: "#1DB954"}
  ],
  
  popularServices: [
    {name: "Disney+", category: "Entertainment", price: 7.99, icon: "🏰"},
    {name: "YouTube Premium", category: "Entertainment", price: 11.99, icon: "📺"},
    {name: "Notion", category: "Productivity", price: 8.00, icon: "📝"},
    {name: "Figma", category: "Design", price: 12.00, icon: "🎨"},
    {name: "GitHub Pro", category: "Developer", price: 4.00, icon: "💻"},
    {name: "Canva Pro", category: "Design", price: 12.99, icon: "🖼️"}
  ],
  
  notifications: [
    {
      id: 1,
      type: "renewal",
      message: "Spotify Premium renews tomorrow",
      time: "2 hours ago",
      read: false,
      icon: "🔔"
    },
    {
      id: 2,
      type: "achievement",
      message: "You unlocked 'Subscription Master' achievement!",
      time: "1 day ago",
      read: false,
      icon: "🏆"
    }
  ]
};

// Enhanced Application State
let currentPage = 'homepage';
let isAuthenticated = false;
let currentUser = null;
let userSubscriptions = [];
let currentTheme = getInitialTheme();
let charts = {};
let animationObservers = [];
let toastId = 0;

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 SubTracker Pro initializing...');
  showLoadingScreen();
  
  setTimeout(() => {
    try {
      initializeTheme();
      setupEventListeners();
      checkAuthentication();
      initializeAnimations();
      initializeParticles();
      showPage('homepage');
      hideLoadingScreen();
      console.log('✅ Application initialized successfully');
    } catch (error) {
      console.error('❌ Application initialization failed:', error);
      showToast('Application failed to initialize properly', 'error');
      hideLoadingScreen();
    }
  }, 1500);
});

// Loading Screen Management
function showLoadingScreen() {
  const loadingScreen = document.getElementById('loadingScreen');
  if (loadingScreen) {
    loadingScreen.style.display = 'flex';
  }
}

function hideLoadingScreen() {
  const loadingScreen = document.getElementById('loadingScreen');
  if (loadingScreen) {
    loadingScreen.classList.add('fade-out');
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 500);
  }
}

// Theme Management with Enhanced Functionality
function getInitialTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme && savedTheme !== 'auto') {
    return savedTheme;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function initializeTheme() {
  document.documentElement.setAttribute('data-color-scheme', currentTheme);
  updateThemeIcons();
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    const savedTheme = localStorage.getItem('theme');
    if (!savedTheme || savedTheme === 'auto') {
      currentTheme = e.matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-color-scheme', currentTheme);
      updateThemeIcons();
    }
  });
  
  console.log('🎨 Theme initialized:', currentTheme);
}

function toggleTheme() {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-color-scheme', currentTheme);
  localStorage.setItem('theme', currentTheme);
  updateThemeIcons();
  
  // Add transition class for smooth theme switching
  document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
  setTimeout(() => {
    document.body.style.transition = '';
  }, 300);
  
  showToast(`Switched to ${currentTheme} mode`, 'success');
  console.log('🌓 Theme toggled to:', currentTheme);
}

function updateThemeIcons() {
  const sunIcons = document.querySelectorAll('.sun-icon');
  const moonIcons = document.querySelectorAll('.moon-icon');
  
  sunIcons.forEach(icon => {
    icon.style.opacity = currentTheme === 'light' ? '1' : '0';
    icon.style.transform = currentTheme === 'light' ? 'translate(-50%, -50%) rotate(0deg)' : 'translate(-50%, -50%) rotate(-180deg)';
  });
  
  moonIcons.forEach(icon => {
    icon.style.opacity = currentTheme === 'dark' ? '1' : '0';
    icon.style.transform = currentTheme === 'dark' ? 'translate(-50%, -50%) rotate(0deg)' : 'translate(-50%, -50%) rotate(180deg)';
  });
}

// Enhanced Event Listeners Setup
function setupEventListeners() {
  console.log('🎯 Setting up enhanced event listeners...');
  
  try {
    // Theme toggle with animation
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
          this.style.transform = '';
          toggleTheme();
        }, 100);
      });
    }
    
    // Enhanced navigation with smooth transitions
    document.addEventListener('click', handleDocumentClick);
    
    // Mobile nav toggle
    const navToggle = document.getElementById('navToggle');
    if (navToggle) {
      navToggle.addEventListener('click', toggleMobileNav);
    }
    
    // Search functionality
    setupSearchFunctionality();
    
    // Notification system
    setupNotificationSystem();
    
    // Authentication forms
    setupAuthenticationListeners();
    
    // Modal handlers
    setupModalListeners();
    
    // Scroll effects
    setupScrollEffects();
    
    // Form enhancements
    setupFormEnhancements();
    
    // Newsletter form
    setupNewsletterForm();
    
    // Back to top button
    setupBackToTopButton();
    
    console.log('✅ Event listeners setup complete');
  } catch (error) {
    console.error('❌ Event listeners setup failed:', error);
  }
}

// Enhanced Document Click Handler
function handleDocumentClick(e) {
  const target = e.target;
  
  // Navigation clicks - improved selector
  const navTarget = target.closest('[data-page]');
  if (navTarget) {
    e.preventDefault();
    e.stopPropagation();
    const pageId = navTarget.getAttribute('data-page');
    console.log('🧭 Navigation clicked:', pageId);
    handlePageNavigation(pageId);
    return;
  }
  
  // User menu toggle
  const userAvatar = target.closest('#userAvatar');
  if (userAvatar) {
    e.preventDefault();
    e.stopPropagation();
    toggleUserDropdown();
    return;
  }
  
  // Notification bell toggle
  const notificationBell = target.closest('#notificationBell');
  if (notificationBell) {
    e.preventDefault();
    e.stopPropagation();
    toggleNotificationDropdown();
    return;
  }
  
  // Search toggle
  const searchToggle = target.closest('#searchToggle');
  if (searchToggle) {
    e.preventDefault();
    e.stopPropagation();
    toggleSearchDropdown();
    return;
  }
  
  // Logout handler
  const logoutBtn = target.closest('#logoutBtn');
  if (logoutBtn) {
    e.preventDefault();
    e.stopPropagation();
    handleLogout();
    return;
  }
  
  // Modal overlay clicks
  if (target.classList.contains('modal-overlay')) {
    hideAllModals();
    return;
  }
  
  // Toast close buttons
  const toastClose = target.closest('.toast-close');
  if (toastClose) {
    e.preventDefault();
    hideToast(toastClose.closest('.toast'));
    return;
  }
  
  // Close dropdowns when clicking outside
  closeDropdownsOnOutsideClick(target);
}

// Page Navigation with Enhanced Transitions
function handlePageNavigation(pageId) {
  console.log('🧭 Navigation clicked:', pageId);
  
  // Check authentication for protected pages
  const protectedPages = ['dashboard', 'analytics', 'profile'];
  if (protectedPages.includes(pageId) && !isAuthenticated) {
    console.log('🔒 Redirecting to signin - authentication required');
    showPage('signin');
    showToast('Please sign in to access this feature', 'info');
    return;
  }
  
  // Add page transition effect
  const currentPageEl = document.querySelector('.page:not(.hidden)');
  if (currentPageEl) {
    currentPageEl.style.opacity = '0.5';
    currentPageEl.style.transform = 'translateY(-10px)';
  }
  
  setTimeout(() => {
    showPage(pageId);
    if (currentPageEl) {
      currentPageEl.style.opacity = '';
      currentPageEl.style.transform = '';
    }
  }, 150);
}

// Search Functionality
function setupSearchFunctionality() {
  const searchToggle = document.getElementById('searchToggle');
  const searchDropdown = document.getElementById('searchDropdown');
  const globalSearch = document.getElementById('globalSearch');
  const searchResults = document.getElementById('searchResults');
  
  if (globalSearch) {
    globalSearch.addEventListener('input', function(e) {
      const query = e.target.value.toLowerCase().trim();
      if (query.length > 0) {
        performGlobalSearch(query);
      } else {
        if (searchResults) searchResults.innerHTML = '';
      }
    });
  }
}

function performGlobalSearch(query) {
  const searchResults = document.getElementById('searchResults');
  if (!searchResults || !isAuthenticated) return;
  
  const results = userSubscriptions.filter(sub => 
    sub.name.toLowerCase().includes(query) || 
    sub.category.toLowerCase().includes(query)
  );
  
  if (results.length === 0) {
    searchResults.innerHTML = '<div class="search-no-results" style="padding: 16px; text-align: center; color: var(--color-text-secondary);">No subscriptions found</div>';
    return;
  }
  
  searchResults.innerHTML = results.map(sub => `
    <div class="search-result-item hover-lift" onclick="showSubscriptionDetails(${sub.id})" style="display: flex; align-items: center; gap: 12px; padding: 12px; border-radius: 8px; cursor: pointer; transition: background 0.2s;">
      <div class="search-result-icon" style="width: 32px; height: 32px; border-radius: 6px; background-color: ${sub.color}; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">${sub.icon}</div>
      <div class="search-result-info" style="flex: 1;">
        <div class="search-result-name" style="font-weight: 500; color: var(--color-text);">${sub.name}</div>
        <div class="search-result-category" style="font-size: 12px; color: var(--color-text-secondary);">${sub.category} • $${sub.cost}/${sub.billingCycle}</div>
      </div>
    </div>
  `).join('');
}

// Notification System
function setupNotificationSystem() {
  const markAllReadBtn = document.getElementById('markAllRead');
  if (markAllReadBtn) {
    markAllReadBtn.addEventListener('click', markAllNotificationsRead);
  }
  
  updateNotificationBadge();
  populateNotifications();
}

function populateNotifications() {
  const notificationList = document.getElementById('notificationList');
  if (!notificationList) return;
  
  notificationList.innerHTML = appData.notifications.map(notif => `
    <div class="notification-item ${notif.read ? '' : 'unread'} hover-lift" onclick="markNotificationRead(${notif.id})">
      <div class="notification-icon">${notif.icon}</div>
      <div class="notification-content">
        <div class="notification-title">${notif.message}</div>
        <div class="notification-time">${notif.time}</div>
      </div>
    </div>
  `).join('');
}

function updateNotificationBadge() {
  const badge = document.getElementById('notificationBadge');
  const unreadCount = appData.notifications.filter(n => !n.read).length;
  
  if (badge) {
    if (unreadCount > 0) {
      badge.textContent = unreadCount;
      badge.style.display = 'block';
    } else {
      badge.style.display = 'none';
    }
  }
}

function markAllNotificationsRead() {
  appData.notifications.forEach(n => n.read = true);
  populateNotifications();
  updateNotificationBadge();
  showToast('All notifications marked as read', 'success');
}

function markNotificationRead(id) {
  const notification = appData.notifications.find(n => n.id === id);
  if (notification && !notification.read) {
    notification.read = true;
    populateNotifications();
    updateNotificationBadge();
  }
}

// Dropdown Management
function toggleUserDropdown() {
  const dropdown = document.getElementById('userDropdown');
  if (dropdown) {
    dropdown.classList.toggle('show');
    closeOtherDropdowns('userDropdown');
  }
}

function toggleNotificationDropdown() {
  const dropdown = document.getElementById('notificationDropdown');
  if (dropdown) {
    dropdown.classList.toggle('show');
    closeOtherDropdowns('notificationDropdown');
  }
}

function toggleSearchDropdown() {
  const dropdown = document.getElementById('searchDropdown');
  if (dropdown) {
    dropdown.classList.toggle('show');
    closeOtherDropdowns('searchDropdown');
    
    // Focus search input when opened
    if (dropdown.classList.contains('show')) {
      const searchInput = document.getElementById('globalSearch');
      if (searchInput) {
        setTimeout(() => searchInput.focus(), 100);
      }
    }
  }
}

function closeOtherDropdowns(except) {
  const dropdowns = ['userDropdown', 'notificationDropdown', 'searchDropdown'];
  dropdowns.forEach(id => {
    if (id !== except) {
      const dropdown = document.getElementById(id);
      if (dropdown) {
        dropdown.classList.remove('show');
      }
    }
  });
}

function closeDropdownsOnOutsideClick(target) {
  const dropdownContainers = ['.user-menu', '.notification-bell', '.search-container'];
  let clickedInside = false;
  
  dropdownContainers.forEach(selector => {
    if (target.closest(selector)) {
      clickedInside = true;
    }
  });
  
  if (!clickedInside) {
    closeOtherDropdowns();
  }
}

// Enhanced Authentication System
function setupAuthenticationListeners() {
  // Sign in form
  const signinForm = document.getElementById('signinForm');
  if (signinForm) {
    signinForm.addEventListener('submit', handleSignIn);
  }
  
  // Register form
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', handleRegister);
  }
  
  // Password toggles
  setupPasswordToggles();
  
  // Password strength
  const registerPassword = document.getElementById('registerPassword');
  if (registerPassword) {
    registerPassword.addEventListener('input', updatePasswordStrength);
  }
}

function setupPasswordToggles() {
  const toggles = [
    { btnId: 'toggleSigninPassword', inputId: 'signinPassword' },
    { btnId: 'toggleRegisterPassword', inputId: 'registerPassword' }
  ];
  
  toggles.forEach(({ btnId, inputId }) => {
    const btn = document.getElementById(btnId);
    if (btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        togglePasswordVisibility(inputId);
        this.style.transform = 'scale(1.1)';
        setTimeout(() => {
          this.style.transform = '';
        }, 100);
      });
    }
  });
}

function handleSignIn(e) {
  e.preventDefault();
  
  const submitBtn = document.getElementById('signinSubmit');
  const email = document.getElementById('signinEmail').value;
  const password = document.getElementById('signinPassword').value;
  
  if (!email || !password) {
    showToast('Please enter both email and password', 'error');
    return;
  }
  
  // Add loading state
  setButtonLoading(submitBtn, true);
  
  // Simulate authentication delay
  setTimeout(() => {
    const existingUser = localStorage.getItem(`user_${email}`);
    if (!existingUser) {
      setButtonLoading(submitBtn, false);
      showToast('Account not found. Please register first.', 'error');
      return;
    }
    
    const userData = JSON.parse(existingUser);
    
    if (userData.password !== password) {
      setButtonLoading(submitBtn, false);
      showToast('Incorrect password', 'error');
      return;
    }
    
    // Success
    localStorage.setItem('authToken', 'token-' + Date.now());
    localStorage.setItem('currentUser', JSON.stringify(userData));
    isAuthenticated = true;
    currentUser = userData;
    
    // Load user's subscriptions
    const savedSubscriptions = localStorage.getItem(`subscriptions_${email}`);
    if (savedSubscriptions) {
      userSubscriptions = JSON.parse(savedSubscriptions);
    } else {
      userSubscriptions = [...appData.sampleSubscriptions];
      localStorage.setItem(`subscriptions_${email}`, JSON.stringify(userSubscriptions));
    }
    
    setButtonLoading(submitBtn, false);
    updateAuthUI();
    showPage('dashboard');
    showToast(`Welcome back, ${userData.firstName}!`, 'success');
  }, 1500);
}

function handleRegister(e) {
  e.preventDefault();
  
  const submitBtn = document.getElementById('registerSubmit');
  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const email = document.getElementById('registerEmail').value.trim();
  const password = document.getElementById('registerPassword').value;
  const termsAccepted = document.getElementById('termsAccepted').checked;
  
  if (!firstName || !lastName || !email || !password) {
    showToast('Please fill in all required fields', 'error');
    return;
  }
  
  if (!termsAccepted) {
    showToast('Please accept the terms and conditions', 'error');
    return;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showToast('Please enter a valid email address', 'error');
    return;
  }
  
  if (localStorage.getItem(`user_${email}`)) {
    showToast('Account already exists. Please sign in instead.', 'error');
    return;
  }
  
  setButtonLoading(submitBtn, true);
  
  const userData = {
    firstName,
    lastName,
    email,
    password,
    registeredDate: new Date().toISOString()
  };
  
  setTimeout(() => {
    localStorage.setItem(`user_${email}`, JSON.stringify(userData));
    localStorage.setItem('authToken', 'token-' + Date.now());
    localStorage.setItem('currentUser', JSON.stringify(userData));
    
    userSubscriptions = [...appData.sampleSubscriptions];
    localStorage.setItem(`subscriptions_${email}`, JSON.stringify(userSubscriptions));
    
    isAuthenticated = true;
    currentUser = userData;
    setButtonLoading(submitBtn, false);
    updateAuthUI();
    showPage('dashboard');
    showToast(`Welcome to SubTracker, ${firstName}!`, 'success');
  }, 2000);
}

function setButtonLoading(button, loading) {
  if (!button) return;
  
  if (loading) {
    button.classList.add('loading');
    button.disabled = true;
  } else {
    button.classList.remove('loading');
    button.disabled = false;
  }
}

function togglePasswordVisibility(inputId) {
  const input = document.getElementById(inputId);
  const toggleBtn = document.getElementById(`toggle${inputId.charAt(0).toUpperCase() + inputId.slice(1)}`);
  
  if (input && toggleBtn) {
    if (input.type === 'password') {
      input.type = 'text';
      toggleBtn.textContent = '🙈';
    } else {
      input.type = 'password';
      toggleBtn.textContent = '👁️';
    }
  }
}

function updatePasswordStrength(e) {
  const password = e.target.value;
  const strengthContainer = document.getElementById('passwordStrength');
  const strengthFill = document.getElementById('strengthFill');
  const strengthLevel = document.getElementById('strengthLevel');
  
  if (!strengthFill || !strengthLevel || !strengthContainer) return;
  
  strengthContainer.classList.add('show');
  
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  
  let level = 'Weak';
  let className = '';
  
  if (score >= 4) {
    level = 'Strong';
    className = 'strong';
  } else if (score >= 3) {
    level = 'Medium';
    className = 'medium';
  }
  
  strengthFill.className = `strength-fill ${className}`;
  strengthLevel.textContent = level;
}

function handleLogout() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('currentUser');
  isAuthenticated = false;
  currentUser = null;
  userSubscriptions = [];
  updateAuthUI();
  showPage('homepage');
  showToast('Logged out successfully', 'info');
  closeOtherDropdowns();
}

function checkAuthentication() {
  const authToken = localStorage.getItem('authToken');
  const userData = localStorage.getItem('currentUser');
  
  if (authToken && userData) {
    isAuthenticated = true;
    currentUser = JSON.parse(userData);
    
    const savedSubscriptions = localStorage.getItem(`subscriptions_${currentUser.email}`);
    if (savedSubscriptions) {
      userSubscriptions = JSON.parse(savedSubscriptions);
    }
  }
  
  updateAuthUI();
  console.log('🔐 Authentication status:', isAuthenticated);
}

function updateAuthUI() {
  const guestActions = document.getElementById('guestActions');
  const userMenu = document.getElementById('userMenu');
  const authRequiredElements = document.querySelectorAll('.auth-required');
  
  if (isAuthenticated && currentUser) {
    if (guestActions) guestActions.classList.add('hidden');
    if (userMenu) userMenu.classList.remove('hidden');
    
    // Update user display
    const userAvatar = document.getElementById('userAvatar');
    const displayUserName = document.getElementById('displayUserName');
    const displayUserEmail = document.getElementById('displayUserEmail');
    
    if (userAvatar) {
      userAvatar.textContent = `${currentUser.firstName.charAt(0)}${currentUser.lastName.charAt(0)}`;
    }
    if (displayUserName) {
      displayUserName.textContent = `${currentUser.firstName} ${currentUser.lastName}`;
    }
    if (displayUserEmail) {
      displayUserEmail.textContent = currentUser.email;
    }
    
    authRequiredElements.forEach(el => {
      el.style.display = '';
    });
  } else {
    if (guestActions) guestActions.classList.remove('hidden');
    if (userMenu) userMenu.classList.add('hidden');
    authRequiredElements.forEach(el => {
      el.style.display = 'none';
    });
  }
}

// Enhanced Page Management
function showPage(pageId) {
  console.log('📄 Showing page:', pageId);
  
  try {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
      page.classList.add('hidden');
      page.style.opacity = '0';
    });
    
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
      targetPage.classList.remove('hidden');
      
      // Smooth page transition
      setTimeout(() => {
        targetPage.style.opacity = '1';
      }, 50);
      
      currentPage = pageId;
      updateNavigation();
      initializePage(pageId);
      closeMobileNav();
      closeOtherDropdowns();
      
      console.log('✅ Page shown successfully:', pageId);
    } else {
      console.error('❌ Page not found:', pageId);
      showToast(`Page "${pageId}" not found`, 'error');
    }
  } catch (error) {
    console.error('❌ Show page error:', error);
  }
}

function updateNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.dataset.page === currentPage) {
      link.classList.add('active');
    }
  });
}

function initializePage(pageId) {
  console.log('🔧 Initializing page:', pageId);
  
  switch(pageId) {
    case 'homepage':
      initializeHomepage();
      break;
    case 'dashboard':
      initializeDashboard();
      break;
    case 'analytics':
      initializeAnalytics();
      break;
    case 'profile':
      initializeProfile();
      break;
  }
}

// Homepage Initialization with Animations
function initializeHomepage() {
  // Animate counters on homepage
  setTimeout(() => {
    animateCounters();
  }, 500);
}

// Enhanced Dashboard
function initializeDashboard() {
  if (!isAuthenticated || !currentUser) return;
  
  // Update welcome message
  const welcomeMessage = document.getElementById('welcomeMessage');
  if (welcomeMessage) {
    welcomeMessage.innerHTML = `Welcome back, <span class="gradient-text">${currentUser.firstName}</span>! 👋`;
  }
  
  updateDashboardStats();
  populateSubscriptions();
  populateUpcomingRenewals();
  setupSubscriptionSearch();
  
  // Animate stats
  setTimeout(() => {
    animateStatCards();
  }, 300);
}

function updateDashboardStats() {
  if (userSubscriptions.length === 0) return;
  
  const activeSubscriptions = userSubscriptions.filter(s => s.status === 'active');
  const monthlySpending = calculateMonthlySpending(activeSubscriptions);
  const yearlyTotal = monthlySpending * 12;
  const nextRenewal = getNextRenewal(activeSubscriptions);
  
  // Update stat values with animation
  const stats = [
    { id: 'totalSubscriptions', value: activeSubscriptions.length },
    { id: 'monthlySpending', value: `$${monthlySpending.toFixed(2)}` },
    { id: 'yearlyTotal', value: `$${yearlyTotal.toFixed(2)}` },
    { id: 'nextRenewal', value: nextRenewal }
  ];
  
  stats.forEach(stat => {
    const element = document.getElementById(stat.id);
    if (element) {
      if (typeof stat.value === 'number') {
        element.dataset.target = stat.value;
        animateCounter(element);
      } else {
        element.textContent = stat.value;
      }
    }
  });
}

function calculateMonthlySpending(subscriptions) {
  return subscriptions.reduce((total, sub) => {
    if (sub.billingCycle === 'yearly') {
      return total + (sub.cost / 12);
    } else if (sub.billingCycle === 'quarterly') {
      return total + (sub.cost / 3);
    } else if (sub.billingCycle === 'weekly') {
      return total + (sub.cost * 4.33);
    } else {
      return total + sub.cost;
    }
  }, 0);
}

function getNextRenewal(subscriptions) {
  const today = new Date();
  const renewalDates = subscriptions
    .map(sub => ({
      name: sub.name,
      date: new Date(sub.nextBilling)
    }))
    .filter(renewal => renewal.date >= today)
    .sort((a, b) => a.date - b.date);
  
  if (renewalDates.length === 0) return 'None upcoming';
  
  const nextRenewal = renewalDates[0];
  const daysUntil = Math.ceil((nextRenewal.date - today) / (1000 * 60 * 60 * 24));
  
  return `${daysUntil} day${daysUntil !== 1 ? 's' : ''}`;
}

function populateSubscriptions() {
  const subscriptionsGrid = document.getElementById('subscriptionsGrid');
  if (!subscriptionsGrid) return;
  
  subscriptionsGrid.innerHTML = '';
  
  if (userSubscriptions.length === 0) {
    subscriptionsGrid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
        <div class="empty-icon" style="font-size: 4rem; margin-bottom: 16px;">📊</div>
        <h3>No subscriptions yet</h3>
        <p style="color: var(--color-text-secondary); margin-bottom: 24px;">Click "Add Subscription" to get started tracking your subscriptions</p>
        <button class="btn btn--primary hover-lift pulse-glow" onclick="showAddSubscriptionModal()">Add Your First Subscription</button>
      </div>
    `;
    return;
  }
  
  userSubscriptions.forEach((subscription, index) => {
    const card = createSubscriptionCard(subscription);
    card.style.animationDelay = `${index * 0.1}s`;
    subscriptionsGrid.appendChild(card);
  });
}

function createSubscriptionCard(subscription) {
  const card = document.createElement('div');
  card.className = 'subscription-card glassmorphism hover-lift';
  
  const nextBilling = new Date(subscription.nextBilling);
  const today = new Date();
  const daysUntil = Math.ceil((nextBilling - today) / (1000 * 60 * 60 * 24));
  
  // Determine status color
  let statusClass = '';
  let statusText = '';
  if (daysUntil <= 3) {
    statusClass = 'warning';
    statusText = `⚠️ Renews in ${daysUntil} day${daysUntil !== 1 ? 's' : ''}`;
  } else if (daysUntil <= 7) {
    statusClass = 'info';
    statusText = `🔔 Renews in ${daysUntil} days`;
  } else {
    statusClass = 'success';
    statusText = `✅ Next billing: ${daysUntil} days`;
  }
  
  card.innerHTML = `
    <div class="subscription-header">
      <div class="subscription-icon pulse-animation" style="background-color: ${subscription.color};">
        ${subscription.icon || subscription.name.charAt(0)}
      </div>
      <div class="subscription-info">
        <h4>${subscription.name}</h4>
        <div class="subscription-category">${subscription.category}</div>
      </div>
    </div>
    <div class="subscription-cost">
      <div class="subscription-price">$${subscription.cost}</div>
      <div class="subscription-cycle">/${subscription.billingCycle}</div>
    </div>
    <div class="subscription-usage">
      <div class="usage-label">Usage Score</div>
      <div class="usage-bar">
        <div class="usage-fill" style="width: ${subscription.usageScore || 0}%"></div>
      </div>
      <div class="usage-text">${subscription.usageScore || 0}%</div>
    </div>
    <div class="subscription-next status--${statusClass}">
      ${statusText}
    </div>
    <div class="subscription-actions">
      <button class="action-btn hover-bounce" onclick="editSubscription(${subscription.id})" title="Edit">
        ✏️
      </button>
      <button class="action-btn hover-bounce" onclick="viewSubscriptionDetails(${subscription.id})" title="Details">
        👁️
      </button>
      <button class="action-btn hover-bounce" onclick="deleteSubscription(${subscription.id})" title="Delete">
        🗑️
      </button>
    </div>
  `;
  
  return card;
}

function populateUpcomingRenewals() {
  const renewalsList = document.getElementById('renewalsList');
  if (!renewalsList) return;
  
  const upcomingRenewals = [...userSubscriptions]
    .filter(sub => sub.status === 'active')
    .sort((a, b) => new Date(a.nextBilling) - new Date(b.nextBilling))
    .slice(0, 5);
  
  if (upcomingRenewals.length === 0) {
    renewalsList.innerHTML = `
      <div class="empty-renewals" style="text-align: center; padding: 20px;">
        <div class="empty-icon" style="font-size: 2rem; margin-bottom: 8px;">📅</div>
        <p style="color: var(--color-text-secondary);">No upcoming renewals</p>
      </div>
    `;
    return;
  }
  
  renewalsList.innerHTML = upcomingRenewals.map((subscription, index) => {
    const nextBilling = new Date(subscription.nextBilling);
    const today = new Date();
    const daysUntil = Math.ceil((nextBilling - today) / (1000 * 60 * 60 * 24));
    
    return `
      <div class="renewal-item hover-lift" style="animation-delay: ${index * 0.1}s">
        <div class="renewal-info">
          <div class="renewal-icon" style="width: 24px; height: 24px; border-radius: 4px; background-color: ${subscription.color}; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; margin-right: 8px;">${subscription.icon}</div>
          <div>
            <div class="renewal-service">${subscription.name}</div>
            <div class="renewal-date">in ${daysUntil} day${daysUntil !== 1 ? 's' : ''}</div>
          </div>
        </div>
        <div class="renewal-cost">$${subscription.cost}</div>
      </div>
    `;
  }).join('');
}

function setupSubscriptionSearch() {
  const searchInput = document.getElementById('subscriptionSearch');
  const categoryFilter = document.getElementById('categoryFilter');
  
  if (searchInput) {
    searchInput.addEventListener('input', debounce(filterSubscriptions, 300));
  }
  if (categoryFilter) {
    categoryFilter.addEventListener('change', filterSubscriptions);
  }
}

function filterSubscriptions() {
  const searchTerm = document.getElementById('subscriptionSearch')?.value.toLowerCase() || '';
  const categoryFilter = document.getElementById('categoryFilter')?.value || 'all';
  
  const filteredSubscriptions = userSubscriptions.filter(sub => {
    const matchesSearch = sub.name.toLowerCase().includes(searchTerm) || 
                         sub.category.toLowerCase().includes(searchTerm);
    const matchesCategory = categoryFilter === 'all' || sub.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });
  
  const subscriptionsGrid = document.getElementById('subscriptionsGrid');
  if (!subscriptionsGrid) return;
  
  subscriptionsGrid.innerHTML = '';
  
  if (filteredSubscriptions.length === 0) {
    subscriptionsGrid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 40px;">
        <div class="empty-icon" style="font-size: 3rem; margin-bottom: 16px;">🔍</div>
        <h3>No matches found</h3>
        <p style="color: var(--color-text-secondary);">Try adjusting your search or filter criteria</p>
      </div>
    `;
    return;
  }
  
  filteredSubscriptions.forEach((subscription, index) => {
    const card = createSubscriptionCard(subscription);
    card.style.animationDelay = `${index * 0.05}s`;
    subscriptionsGrid.appendChild(card);
  });
}

// Enhanced Modal System
function setupModalListeners() {
  const addBtn = document.getElementById('addSubscriptionBtn');
  const closeBtn = document.getElementById('closeModalBtn');
  const cancelBtn = document.getElementById('cancelModalBtn');
  const form = document.getElementById('addSubscriptionForm');
  
  if (addBtn) {
    addBtn.addEventListener('click', showAddSubscriptionModal);
  }
  if (closeBtn) {
    closeBtn.addEventListener('click', hideAddSubscriptionModal);
  }
  if (cancelBtn) {
    cancelBtn.addEventListener('click', hideAddSubscriptionModal);
  }
  if (form) {
    form.addEventListener('submit', handleAddSubscription);
  }
  
  // Tab switching in modal
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const tabName = this.dataset.tab;
      switchModalTab(tabName);
    });
  });
  
  // Popular service cards
  setupPopularServiceCards();
  
  // Cost calculator
  setupCostCalculator();
}

function switchModalTab(tabName) {
  // Update tab buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  const activeTabBtn = document.querySelector(`[data-tab="${tabName}"]`);
  if (activeTabBtn) activeTabBtn.classList.add('active');
  
  // Update tab content
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.remove('active');
  });
  const activeTabContent = document.getElementById(`${tabName}-tab`);
  if (activeTabContent) activeTabContent.classList.add('active');
}

function setupPopularServiceCards() {
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.addEventListener('click', function() {
      const serviceName = this.dataset.service;
      const service = appData.popularServices.find(s => s.name === serviceName);
      
      if (service) {
        fillFormWithService(service);
        switchModalTab('manual');
      }
    });
  });
}

function fillFormWithService(service) {
  const serviceNameInput = document.getElementById('serviceName');
  const serviceCostInput = document.getElementById('serviceCost');
  
  if (serviceNameInput) serviceNameInput.value = service.name;
  if (serviceCostInput) serviceCostInput.value = service.price;
  
  // Select appropriate category radio button
  const categoryRadios = document.querySelectorAll('input[name="serviceCategory"]');
  categoryRadios.forEach(radio => {
    if (radio.value === service.category) {
      radio.checked = true;
    }
  });
  
  updateCostSummary();
}

function setupCostCalculator() {
  const costInput = document.getElementById('serviceCost');
  const billingSelect = document.getElementById('billingCycle');
  
  if (costInput) {
    costInput.addEventListener('input', updateCostSummary);
  }
  if (billingSelect) {
    billingSelect.addEventListener('change', updateCostSummary);
  }
}

function updateCostSummary() {
  const cost = parseFloat(document.getElementById('serviceCost')?.value || 0);
  const billingCycle = document.getElementById('billingCycle')?.value || 'monthly';
  
  const monthlyCostEl = document.getElementById('monthlyCost');
  const yearlyCostEl = document.getElementById('yearlyCost');
  
  if (!monthlyCostEl || !yearlyCostEl) return;
  
  let monthlyCost = 0;
  let yearlyCost = 0;
  
  switch (billingCycle) {
    case 'weekly':
      monthlyCost = cost * 4.33;
      yearlyCost = cost * 52;
      break;
    case 'monthly':
      monthlyCost = cost;
      yearlyCost = cost * 12;
      break;
    case 'quarterly':
      monthlyCost = cost / 3;
      yearlyCost = cost * 4;
      break;
    case 'yearly':
      monthlyCost = cost / 12;
      yearlyCost = cost;
      break;
  }
  
  monthlyCostEl.textContent = `$${monthlyCost.toFixed(2)}`;
  yearlyCostEl.textContent = `$${yearlyCost.toFixed(2)}`;
}

function showAddSubscriptionModal() {
  const modal = document.getElementById('addSubscriptionModal');
  if (modal) {
    modal.classList.remove('hidden');
    
    // Set default next billing date
    const nextBilling = document.getElementById('nextBilling');
    if (nextBilling) {
      const defaultDate = new Date();
      defaultDate.setDate(defaultDate.getDate() + 30);
      nextBilling.value = defaultDate.toISOString().split('T')[0];
    }
    
    // Reset form
    const form = document.getElementById('addSubscriptionForm');
    const submitBtn = form?.querySelector('button[type="submit"]');
    if (submitBtn) {
      const btnText = submitBtn.querySelector('.btn-text');
      if (btnText) btnText.textContent = 'Add Subscription';
    }
    if (form) {
      form.reset();
      delete form.dataset.editId;
    }
    
    // Switch to manual tab
    switchModalTab('manual');
    
    // Focus first input
    setTimeout(() => {
      const firstInput = document.getElementById('serviceName');
      if (firstInput) firstInput.focus();
    }, 100);
  }
}

function hideAddSubscriptionModal() {
  const modal = document.getElementById('addSubscriptionModal');
  if (modal) {
    modal.classList.add('hidden');
    const form = document.getElementById('addSubscriptionForm');
    if (form) {
      form.reset();
      delete form.dataset.editId;
    }
  }
}

function handleAddSubscription(e) {
  e.preventDefault();
  
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const serviceName = document.getElementById('serviceName').value.trim();
  const serviceCost = parseFloat(document.getElementById('serviceCost').value);
  const billingCycle = document.getElementById('billingCycle').value;
  const serviceCategory = document.querySelector('input[name="serviceCategory"]:checked')?.value;
  const nextBilling = document.getElementById('nextBilling').value;
  
  if (!serviceName || !serviceCost || !billingCycle || !serviceCategory || !nextBilling) {
    showToast('Please fill in all required fields', 'error');
    return;
  }
  
  if (serviceCost <= 0) {
    showToast('Cost must be greater than 0', 'error');
    return;
  }
  
  setButtonLoading(submitBtn, true);
  
  const editId = form.dataset.editId;
  
  setTimeout(() => {
    if (editId) {
      // Edit existing subscription
      const subscription = userSubscriptions.find(s => s.id == editId);
      if (subscription) {
        subscription.name = serviceName;
        subscription.cost = serviceCost;
        subscription.billingCycle = billingCycle;
        subscription.category = serviceCategory;
        subscription.nextBilling = nextBilling;
        subscription.icon = getServiceIcon(serviceName);
        subscription.usageScore = subscription.usageScore || Math.floor(Math.random() * 40) + 60;
        
        localStorage.setItem(`subscriptions_${currentUser.email}`, JSON.stringify(userSubscriptions));
        showToast(`${serviceName} updated successfully!`, 'success');
      }
    } else {
      // Add new subscription
      const newSubscription = {
        id: Date.now(),
        name: serviceName,
        category: serviceCategory,
        cost: serviceCost,
        billingCycle: billingCycle,
        nextBilling: nextBilling,
        startDate: new Date().toISOString().split('T')[0],
        status: 'active',
        color: getRandomColor(),
        icon: getServiceIcon(serviceName),
        usageScore: Math.floor(Math.random() * 40) + 60,
        description: `${serviceCategory} service`
      };
      
      userSubscriptions.push(newSubscription);
      localStorage.setItem(`subscriptions_${currentUser.email}`, JSON.stringify(userSubscriptions));
      showToast(`${serviceName} added successfully!`, 'success');
    }
    
    setButtonLoading(submitBtn, false);
    hideAddSubscriptionModal();
    
    if (currentPage === 'dashboard') {
      initializeDashboard();
    }
  }, 1000);
}

function getRandomColor() {
  const colors = ['#E50914', '#1DB954', '#FF0000', '#0078D4', '#0061FF', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57'];
  return colors[Math.floor(Math.random() * colors.length)];
}

function getServiceIcon(serviceName) {
  const icons = {
    'netflix': '🎬',
    'spotify': '🎵', 
    'adobe': '🎨',
    'microsoft': '💼',
    'dropbox': '☁️',
    'google': '🔍',
    'apple': '🍎',
    'amazon': '📦',
    'youtube': '📺',
    'disney': '🏰',
    'notion': '📝',
    'figma': '🎨',
    'github': '💻',
    'canva': '🖼️'
  };
  
  const key = serviceName.toLowerCase();
  for (const [service, icon] of Object.entries(icons)) {
    if (key.includes(service)) {
      return icon;
    }
  }
  
  return serviceName.charAt(0).toUpperCase();
}

// Global functions for onclick handlers
window.editSubscription = function(id) {
  const subscription = userSubscriptions.find(s => s.id === id);
  if (!subscription) return;
  
  showAddSubscriptionModal();
  
  setTimeout(() => {
    document.getElementById('serviceName').value = subscription.name;
    document.getElementById('serviceCost').value = subscription.cost;
    document.getElementById('billingCycle').value = subscription.billingCycle;
    document.getElementById('nextBilling').value = subscription.nextBilling;
    
    // Select category
    const categoryRadio = document.querySelector(`input[name="serviceCategory"][value="${subscription.category}"]`);
    if (categoryRadio) {
      categoryRadio.checked = true;
    }
    
    // Update form to edit mode
    const form = document.getElementById('addSubscriptionForm');
    const submitBtn = form?.querySelector('button[type="submit"]');
    if (submitBtn) {
      const btnText = submitBtn.querySelector('.btn-text');
      if (btnText) btnText.textContent = 'Update Subscription';
    }
    
    if (form) {
      form.dataset.editId = id;
    }
    
    updateCostSummary();
  }, 100);
};

window.deleteSubscription = function(id) {
  const subscription = userSubscriptions.find(s => s.id === id);
  if (!subscription) return;
  
  if (confirm(`Are you sure you want to delete ${subscription.name}?`)) {
    userSubscriptions = userSubscriptions.filter(s => s.id !== id);
    localStorage.setItem(`subscriptions_${currentUser.email}`, JSON.stringify(userSubscriptions));
    
    showToast(`${subscription.name} deleted successfully`, 'success');
    
    if (currentPage === 'dashboard') {
      initializeDashboard();
    }
  }
};

window.viewSubscriptionDetails = function(id) {
  const subscription = userSubscriptions.find(s => s.id === id);
  if (!subscription) return;
  
  // Simple details view - could be enhanced with a detailed modal
  showToast(`${subscription.name}: $${subscription.cost}/${subscription.billingCycle} - Usage: ${subscription.usageScore}%`, 'info');
};

window.showSubscriptionDetails = function(id) {
  window.viewSubscriptionDetails(id);
  closeOtherDropdowns();
};

window.showAddSubscriptionModal = showAddSubscriptionModal;

// Enhanced Analytics
function initializeAnalytics() {
  if (!isAuthenticated || userSubscriptions.length === 0) return;
  
  setTimeout(() => {
    createSpendingChart();
    createCategoryChart();
    updateAnalyticsStats();
    animateAnalyticsStats();
  }, 100);
}

function createSpendingChart() {
  const ctx = document.getElementById('spendingChart');
  if (!ctx) return;
  
  // Destroy existing chart
  if (charts.spendingChart) {
    charts.spendingChart.destroy();
  }
  
  const monthlySpending = calculateMonthlySpending(userSubscriptions);
  const chartData = appData.monthlySpendingData.map((item, index) => ({
    ...item,
    amount: monthlySpending * (0.8 + Math.random() * 0.4) // Simulate variation
  }));
  
  charts.spendingChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: chartData.map(item => item.month),
      datasets: [{
        label: 'Monthly Spending',
        data: chartData.map(item => item.amount),
        backgroundColor: 'rgba(31, 184, 205, 0.1)',
        borderColor: '#1FB8CD',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#1FB8CD',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
        mode: 'index'
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: '#1FB8CD',
          borderWidth: 1,
          callbacks: {
            label: function(context) {
              return `Spending: $${context.parsed.y.toFixed(2)}`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            callback: function(value) {
              return '$' + value.toFixed(0);
            }
          }
        }
      },
      animation: {
        duration: 2000,
        easing: 'easeInOutQuart'
      }
    }
  });
}

function createCategoryChart() {
  const ctx = document.getElementById('categoryChart');
  if (!ctx) return;
  
  // Destroy existing chart
  if (charts.categoryChart) {
    charts.categoryChart.destroy();
  }
  
  // Calculate category spending
  const categorySpending = {};
  userSubscriptions.forEach(sub => {
    const monthlyCost = sub.billingCycle === 'yearly' ? sub.cost / 12 : 
                       sub.billingCycle === 'quarterly' ? sub.cost / 3 :
                       sub.billingCycle === 'weekly' ? sub.cost * 4.33 : sub.cost;
    
    if (!categorySpending[sub.category]) {
      categorySpending[sub.category] = 0;
    }
    categorySpending[sub.category] += monthlyCost;
  });
  
  const categories = Object.keys(categorySpending);
  const amounts = Object.values(categorySpending);
  const colors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F'];
  
  charts.categoryChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: categories,
      datasets: [{
        data: amounts,
        backgroundColor: colors.slice(0, categories.length),
        borderWidth: 0,
        hoverBorderWidth: 3,
        hoverBorderColor: '#fff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 20,
            usePointStyle: true,
            font: {
              size: 12
            }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: '#1FB8CD',
          borderWidth: 1,
          callbacks: {
            label: function(context) {
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = ((context.parsed / total) * 100).toFixed(1);
              return `${context.label}: $${context.parsed.toFixed(2)} (${percentage}%)`;
            }
          }
        }
      },
      animation: {
        animateRotate: true,
        duration: 2000
      }
    }
  });
}

function updateAnalyticsStats() {
  if (userSubscriptions.length === 0) return;
  
  const monthlySpending = calculateMonthlySpending(userSubscriptions);
  const yearlySpending = monthlySpending * 12;
  const mostExpensive = userSubscriptions.reduce((prev, current) => 
    (prev.cost > current.cost) ? prev : current
  );
  
  // Update elements
  const elements = [
    { id: 'totalSpentYtd', value: yearlySpending.toFixed(2) },
    { id: 'avgMonthlySpend', value: monthlySpending.toFixed(2) },
    { id: 'mostExpensive', value: mostExpensive.name },
    { id: 'totalSavings', value: '156.80' }
  ];
  
  elements.forEach(({ id, value }) => {
    const element = document.getElementById(id);
    if (element) {
      if (!isNaN(value)) {
        element.dataset.target = value;
      } else {
        element.textContent = value;
      }
    }
  });
}

function animateAnalyticsStats() {
  const counterElements = document.querySelectorAll('.analytics-stat .animate-counter');
  counterElements.forEach((element, index) => {
    setTimeout(() => {
      animateCounter(element);
    }, index * 200);
  });
}

// Profile Management
function initializeProfile() {
  if (!currentUser) return;
  
  // Populate profile form
  const elements = [
    { id: 'profileFirstName', value: currentUser.firstName },
    { id: 'profileLastName', value: currentUser.lastName },
    { id: 'profileEmail', value: currentUser.email },
    { id: 'profileUserName', value: `${currentUser.firstName} ${currentUser.lastName}` },
    { id: 'profileUserEmail', value: currentUser.email }
  ];
  
  elements.forEach(({ id, value }) => {
    const element = document.getElementById(id);
    if (element) {
      if (element.tagName === 'INPUT') {
        element.value = value;
      } else {
        element.textContent = value;
      }
    }
  });
  
  // Update avatar
  const profileAvatar = document.getElementById('profileAvatar');
  if (profileAvatar) {
    profileAvatar.textContent = `${currentUser.firstName.charAt(0)}${currentUser.lastName.charAt(0)}`;
  }
  
  // Setup theme switching
  setupProfileThemeSwitch();
  
  // Setup profile form
  const profileForm = document.getElementById('profileForm');
  if (profileForm) {
    profileForm.addEventListener('submit', handleProfileUpdate);
  }
}

function setupProfileThemeSwitch() {
  const themeRadios = document.querySelectorAll('input[name="theme"]');
  const savedTheme = localStorage.getItem('theme') || 'auto';
  
  themeRadios.forEach(radio => {
    if (radio.value === savedTheme) {
      radio.checked = true;
    }
    
    radio.addEventListener('change', (e) => {
      const newTheme = e.target.value;
      localStorage.setItem('theme', newTheme);
      
      if (newTheme === 'auto') {
        currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      } else {
        currentTheme = newTheme;
      }
      
      document.documentElement.setAttribute('data-color-scheme', currentTheme);
      updateThemeIcons();
      showToast(`Theme updated to ${newTheme}`, 'success');
    });
  });
}

function handleProfileUpdate(e) {
  e.preventDefault();
  
  const firstName = document.getElementById('profileFirstName').value.trim();
  const lastName = document.getElementById('profileLastName').value.trim();
  const email = document.getElementById('profileEmail').value.trim();
  
  if (!firstName || !lastName || !email) {
    showToast('Please fill in all fields', 'error');
    return;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showToast('Please enter a valid email address', 'error');
    return;
  }
  
  const oldEmail = currentUser.email;
  currentUser.firstName = firstName;
  currentUser.lastName = lastName;
  currentUser.email = email;
  
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  localStorage.setItem(`user_${email}`, JSON.stringify(currentUser));
  
  // Move subscriptions if email changed
  if (oldEmail !== email) {
    const subscriptions = localStorage.getItem(`subscriptions_${oldEmail}`);
    if (subscriptions) {
      localStorage.setItem(`subscriptions_${email}`, subscriptions);
      localStorage.removeItem(`subscriptions_${oldEmail}`);
    }
    localStorage.removeItem(`user_${oldEmail}`);
  }
  
  updateAuthUI();
  showToast('Profile updated successfully', 'success');
}

// Animation System
function initializeAnimations() {
  setupIntersectionObserver();
  setupScrollAnimations();
}

function setupIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, observerOptions);
  
  // Observe elements for scroll animations
  const animatedElements = document.querySelectorAll('.scroll-reveal, .feature-card, .stat-card');
  animatedElements.forEach(el => observer.observe(el));
  
  animationObservers.push(observer);
}

function animateCounters() {
  const counters = document.querySelectorAll('.animate-counter');
  counters.forEach(counter => animateCounter(counter));
}

function animateCounter(element) {
  const target = parseInt(element.dataset.target) || 0;
  const duration = 2000;
  const increment = target / (duration / 16);
  let current = 0;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    
    if (element.textContent.includes('$')) {
      element.textContent = '$' + Math.floor(current);
    } else if (element.textContent.includes('%')) {
      element.textContent = Math.floor(current) + '%';
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

function animateStatCards() {
  const statCards = document.querySelectorAll('.stat-card');
  statCards.forEach((card, index) => {
    setTimeout(() => {
      card.style.transform = 'translateY(0)';
      card.style.opacity = '1';
      
      // Animate progress bars
      const progressBar = card.querySelector('.progress-bar');
      if (progressBar) {
        const width = progressBar.style.width;
        progressBar.style.width = '0';
        setTimeout(() => {
          progressBar.style.width = width;
        }, 200);
      }
    }, index * 100);
  });
}

// Particles System
function initializeParticles() {
  const particles = document.querySelectorAll('.particle');
  particles.forEach((particle, index) => {
    // Random positioning
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Random animation duration
    particle.style.animationDuration = (3 + Math.random() * 4) + 's';
    particle.style.animationDelay = Math.random() * 2 + 's';
  });
}

// Scroll Effects
function setupScrollEffects() {
  let scrollTimeout;
  
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      updateScrollEffects();
    }, 10);
  });
}

function updateScrollEffects() {
  const scrollY = window.scrollY;
  
  // Update navbar
  const navbar = document.getElementById('navbar');
  if (navbar) {
    if (scrollY > 100) {
      navbar.style.backgroundColor = 'rgba(var(--glass-bg), 0.95)';
      navbar.style.backdropFilter = 'blur(20px)';
    } else {
      navbar.style.backgroundColor = 'var(--glass-bg)';
      navbar.style.backdropFilter = 'blur(16px)';
    }
  }
  
  // Update back to top button
  updateBackToTopButton(scrollY);
  
  // Parallax effect for particles
  const particles = document.querySelectorAll('.particle');
  particles.forEach((particle, index) => {
    const speed = 0.5 + index * 0.1;
    particle.style.transform = `translateY(${scrollY * speed}px)`;
  });
}

// Back to Top Button
function setupBackToTopButton() {
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

function updateBackToTopButton(scrollY) {
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    if (scrollY > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  }
}

// Form Enhancements
function setupFormEnhancements() {
  // Add focus effects to all form controls
  const formControls = document.querySelectorAll('.form-control');
  formControls.forEach(control => {
    control.addEventListener('focus', function() {
      this.closest('.form-group')?.classList.add('focused');
    });
    
    control.addEventListener('blur', function() {
      this.closest('.form-group')?.classList.remove('focused');
    });
  });
}

// Newsletter Form
function setupNewsletterForm() {
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = document.getElementById('newsletterEmail').value;
      const consent = this.querySelector('input[type="checkbox"]').checked;
      
      if (!email || !consent) {
        showToast('Please enter your email and accept the consent', 'error');
        return;
      }
      
      // Simulate subscription
      showToast('Successfully subscribed to newsletter!', 'success');
      this.reset();
    });
  }
}

// Toast Notification System
function showToast(message, type = 'info', duration = 4000) {
  const toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) return;
  
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.id = `toast-${++toastId}`;
  
  const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  };
  
  toast.innerHTML = `
    <div class="toast-content">
      <div class="toast-icon">${icons[type] || icons.info}</div>
      <div class="toast-message">${message}</div>
      <button class="toast-close" onclick="hideToast(this.closest('.toast'))">×</button>
    </div>
  `;
  
  toastContainer.appendChild(toast);
  
  // Show with animation
  setTimeout(() => {
    toast.classList.add('show');
  }, 100);
  
  // Auto hide
  setTimeout(() => {
    hideToast(toast);
  }, duration);
}

function hideToast(toast) {
  if (toast && toast.parentNode) {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }
}

window.hideToast = hideToast;

// Mobile Navigation
function toggleMobileNav() {
  const navMenu = document.getElementById('navMenu');
  const navToggle = document.getElementById('navToggle');
  
  if (navMenu && navToggle) {
    navMenu.classList.toggle('show');
    navToggle.classList.toggle('active');
  }
}

function closeMobileNav() {
  const navMenu = document.getElementById('navMenu');
  const navToggle = document.getElementById('navToggle');
  
  if (navMenu && navToggle) {
    navMenu.classList.remove('show');
    navToggle.classList.remove('active');
  }
}

// Utility Functions
function hideAllModals() {
  document.querySelectorAll('.modal').forEach(modal => {
    modal.classList.add('hidden');
  });
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function setupScrollAnimations() {
  // Setup scroll-triggered animations
  const scrollElements = document.querySelectorAll('.scroll-reveal');
  
  const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
      elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
  };
  
  const displayScrollElement = (element) => {
    element.classList.add('scrolled');
  };
  
  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el, 1.25)) {
        displayScrollElement(el);
      }
    });
  };
  
  window.addEventListener('scroll', handleScrollAnimation);
}

// Cleanup function
window.addEventListener('beforeunload', () => {
  // Cleanup observers
  animationObservers.forEach(observer => {
    if (observer && observer.disconnect) {
      observer.disconnect();
    }
  });
  
  // Cleanup charts
  Object.values(charts).forEach(chart => {
    if (chart && chart.destroy) {
      chart.destroy();
    }
  });
});

// Console welcome message
console.log(`
🚀 SubTracker Pro - Personal Subscription Manager
💡 Features available:
   • Enhanced theme switching with smooth transitions
   • Interactive animations and micro-interactions
   • Real-time notifications and alerts
   • Advanced analytics with Chart.js
   • Gamified user experience
   • Comprehensive search functionality
   • Mobile-responsive design
   • Professional UI/UX polish
   • Local storage data persistence
   • Progressive loading and animations
   
✨ Ready to win your hackathon!
`);

console.log('🎉 SubTracker Pro initialized successfully!');