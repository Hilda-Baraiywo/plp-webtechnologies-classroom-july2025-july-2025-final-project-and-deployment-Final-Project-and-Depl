// Global Variables
let currentPage = 'home';

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeContactForm();
    initializeAnimations();
});

// Navigation Functions
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageId;
    }

    updateNavigation(pageId);
    document.getElementById('navMenu').classList.remove('active');
    window.scrollTo(0, 0);
}

function updateNavigation(pageId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));

    const activeLink = document.querySelector(`[onclick*="${pageId}"]`);
    if (activeLink && activeLink.classList.contains('nav-link')) {
        activeLink.classList.add('active');
    }

    const dropdownItem = document.querySelector(`[onclick*="${pageId}"].dropdown-item`);
    if (dropdownItem) {
        const parentNavItem = dropdownItem.closest('.nav-item');
        if (parentNavItem) {
            const parentNavLink = parentNavItem.querySelector('.nav-link');
            if (parentNavLink) parentNavLink.classList.add('active');
        }
    }
}

function toggleMobileMenu() {
    document.getElementById('navMenu').classList.toggle('active');
}

function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link, .dropdown-item');
    navLinks.forEach(link => {
        if (link.getAttribute('onclick')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
            });
        }
    });
}

// Contact Form Functions
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', handleFormSubmit);

    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearFieldError(input));
    });
}

function handleFormSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const submitBtn = document.getElementById('submitBtn');
  const submitText = document.getElementById('submitText');
  const submitLoader = document.getElementById('submitLoader');
  const successMessage = document.getElementById('successMessage');

  // Validate form
  if (!validateForm(form)) return;

  // Show loading
  submitText.style.display = 'none';
  submitLoader.style.display = 'inline-block';
  submitBtn.disabled = true;

  // Simulate submission
  setTimeout(() => {
    // Hide loading
    submitText.style.display = 'inline';
    submitLoader.style.display = 'none';
    submitBtn.disabled = false;

    // ✅ Show success
    successMessage.style.display = 'block';

    // Reset form
    form.reset();

    // Hide success after 5s
    setTimeout(() => {
      successMessage.style.display = 'none';
    }, 5000);
  }, 2000);
}


function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    requiredFields.forEach(field => { if (!validateField(field)) isValid = false; });
    return isValid;
}

function validateField(field) {
  const value = field.value.trim();
  const fieldName = field.name;
  let isValid = true;
  let errorMessage = '';

  // Clear previous error
  clearFieldError(field);

  // Required validation
  if (field.hasAttribute('required') && !value) {
    errorMessage = `${getFieldLabel(field)} is required`;
    isValid = false;
  }
  // Email validation
  else if (fieldName === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      errorMessage = 'Please enter a valid email address';
      isValid = false;
    }
  }
  // Phone validation
  else if (fieldName === 'phone' && value) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
      errorMessage = 'Please enter a valid phone number';
      isValid = false;
    }
  }
  // Name validation
  else if (fieldName === 'name' && value && value.length < 2) {
    errorMessage = 'Name must be at least 2 characters long';
    isValid = false;
  }
  // Message validation
  else if (fieldName === 'message' && value.length < 10) {
    errorMessage = 'Message must be at least 10 characters long';
    isValid = false;
  }

  if (!isValid) {
    field.classList.add('error');
    const errorDiv = document.getElementById(field.id + 'Error');
    if (errorDiv) errorDiv.textContent = errorMessage;
  }

  return isValid;
}


function clearFieldError(field) {
    field.classList.remove('error');
    const errorDiv = document.getElementById(field.id + 'Error');
    if (errorDiv) errorDiv.textContent = '';
}

function getFieldLabel(field) {
    const label = document.querySelector(`label[for="${field.id}"]`);
    return label ? label.textContent.replace('*', '').trim() : field.name;
}

// Placeholder for animations (you can extend if needed)
function initializeAnimations() {
    // Add future scroll/animation logic here
}
