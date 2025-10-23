// Optimize video loading with lazy loading
function optimizeVideoLoading() {
  // Load the blackhole video immediately as it's part of the initial design
  const blackholeVideo = document.querySelector('.blackhole-box video');
  if (blackholeVideo && blackholeVideo.dataset.src) {
    blackholeVideo.src = blackholeVideo.dataset.src;
    blackholeVideo.load();
  }
  
  // Set up other video elements to be loaded lazily
  const videos = document.querySelectorAll('video[data-src]:not(.blackhole-box video)');
  videos.forEach(video => {
    // Only start loading when near viewport
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Load video source when in viewport
            if (video.dataset.src) {
              video.src = video.dataset.src;
              video.load();
            }
            observer.unobserve(video);
          }
        });
      }, {
        root: null,
        rootMargin: '100px', // Load videos 100px before they come into view
        threshold: 0.1
      });
      observer.observe(video);
    } else {
      // Fallback for older browsers - load all videos
      if (video.dataset.src) {
        video.src = video.dataset.src;
        video.load();
      }
    }
  });
}

// Initialize video loading
document.addEventListener('DOMContentLoaded', () => {
  optimizeVideoLoading();
});

// Set up project videos with hover interactions
const video1 = document.getElementById('projectVideo1');
const video2 = document.getElementById('projectVideo2');
const video3 = document.getElementById('projectVideo3');

// Sidebar elements
const sideBar = document.querySelector('.sidebar');
const menu = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon');

const videoList = [video1, video2, video3];

// Add error handling for videos
function handleVideoError(video) {
  if (!video) return;
  
  video.addEventListener('error', function() {
    console.log('Video failed to load:', video.src);
    // Create fallback image
    const fallbackImg = document.createElement('img');
    fallbackImg.src = 'images/project-fallback.png';
    fallbackImg.alt = 'Project preview unavailable';
    fallbackImg.style.width = '100%';
    fallbackImg.style.height = '100%';
    fallbackImg.style.objectFit = 'cover';
    fallbackImg.style.borderRadius = '20px';
    
    // Replace video with image
    if (video.parentNode) {
      video.parentNode.replaceChild(fallbackImg, video);
    }
  });
  
  video.addEventListener('loadstart', function() {
    video.style.opacity = '0.5';
  });
  
  video.addEventListener('canplaythrough', function() {
    video.style.opacity = '1';
  });
}

videoList.forEach(function (video) {
  if (!video) return;
  
  // Add error handling
  handleVideoError(video);
  
  // Find the hover sign associated with this video
  const hoverSign = video.parentElement.querySelector('.hover-sign');
  
  video.addEventListener("mouseover", function () {
    video.play().catch(function(error) {
      console.log('Video play failed:', error);
    });
    hoverSign?.classList.add("active");
  });
  
  video.addEventListener("mouseout", function () {
    video.pause();
    hoverSign?.classList.remove("active");
  });
});

// Sidebar toggle
menu.addEventListener("click", function () {
  sideBar.classList.remove("close-sidebar");
  sideBar.classList.add("open-sidebar");
});

closeIcon.addEventListener("click", function () {
  sideBar.classList.remove("open-sidebar");
  sideBar.classList.add("close-sidebar");
});

// Contact form handler
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  // Add real-time validation
  const nameInput = contactForm.querySelector('input[name="name"]');
  const emailInput = contactForm.querySelector('input[name="email"]');
  const messageInput = contactForm.querySelector('input[name="message"]');
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  
  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Track whether fields have been touched by the user
  const fieldTouched = {
    name: false,
    email: false,
    message: false
  };
  
  function validateField(input, isValid, customMessage = null) {
    // Only show validation if field has been touched
    if (!fieldTouched[input.name]) {
      // Remove any error message if field hasn't been touched
      const errorElement = input.parentNode.querySelector('.error-message');
      if (errorElement) {
        errorElement.remove();
      }
      // Reset styling but don't show errors
      input.style.borderColor = '';
      input.style.boxShadow = '';
      return;
    }
    
    if (isValid) {
      input.style.borderColor = '#72a1de';
      input.style.boxShadow = '0 0 5px #72a1de';
      // Remove any error message if field is valid
      const errorElement = input.parentNode.querySelector('.error-message');
      if (errorElement) {
        errorElement.remove();
      }
    } else {
      input.style.borderColor = '#ff4444';
      input.style.boxShadow = '0 0 5px #ff4444';
      // Add specific error message
      const errorElement = input.parentNode.querySelector('.error-message');
      if (!errorElement) {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.style.cssText = `
          color: #ff4444;
          font-size: 12px;
          margin-top: 5px;
          margin-bottom: 10px;
        `;
        
        if (input.name === 'name') {
          errorMessage.textContent = customMessage || 'Please enter your full name (at least 2 characters)';
        } else if (input.name === 'email') {
          errorMessage.textContent = customMessage || 'Please enter a valid email address';
        } else if (input.name === 'message') {
          errorMessage.textContent = customMessage || 'Please enter your message (at least 10 characters)';
        }
        
        input.parentNode.insertBefore(errorMessage, input.nextSibling);
      }
    }
  }
  
  function validateForm() {
    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const messageValue = messageInput.value.trim();
    
    const isNameValid = nameValue.length >= 2;
    const isEmailValid = emailRegex.test(emailValue);
    const isMessageValid = messageValue.length >= 10;
    
    validateField(nameInput, isNameValid);
    validateField(emailInput, isEmailValid);
    validateField(messageInput, isMessageValid);
    
    const isFormValid = isNameValid && isEmailValid && isMessageValid;
    submitBtn.disabled = !isFormValid;
    submitBtn.style.opacity = isFormValid ? '1' : '0.5';
    
    return isFormValid;
  }
  
  // Add event listeners to track when fields are touched
  nameInput.addEventListener('blur', () => {
    fieldTouched.name = true;
    validateForm();
  });
  
  emailInput.addEventListener('blur', () => {
    fieldTouched.email = true;
    validateForm();
  });
  
  messageInput.addEventListener('blur', () => {
    fieldTouched.message = true;
    validateForm();
  });
  
  // Also validate on input (for real-time feedback after field is touched)
  nameInput.addEventListener('input', () => {
    if (fieldTouched.name) {
      validateForm();
    }
  });
  
  emailInput.addEventListener('input', () => {
    if (fieldTouched.email) {
      validateForm();
    }
  });
  
  messageInput.addEventListener('input', () => {
    if (fieldTouched.message) {
      validateForm();
    }
  });
  
  // Add event listeners for real-time validation
  nameInput.addEventListener('input', validateForm);
  emailInput.addEventListener('input', validateForm);
  messageInput.addEventListener('input', validateForm);
  
  // Initial validation (but don't show errors initially)
  // We'll just set the initial button state based on field content
  const isFormInitiallyValid = 
    nameInput.value.trim().length >= 2 && 
    emailRegex.test(emailInput.value.trim()) && 
    messageInput.value.trim().length >= 10;
    
  submitBtn.disabled = !isFormInitiallyValid;
  submitBtn.style.opacity = isFormInitiallyValid ? '1' : '0.5';
  
  // Enhanced contact form error handling
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    
    // Mark all fields as touched when form is submitted
    fieldTouched.name = true;
    fieldTouched.email = true;
    fieldTouched.message = true;
    
    // First, validate the form
    if (!validateForm()) {
      const status = document.getElementById("formStatus");
      status.innerHTML = "Please fill the required fields ❌";
      status.style.color = "red";
      return;
    }

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    let status = document.getElementById("formStatus");
    const originalBtnText = submitBtn.innerHTML;
    
    // Update UI for loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';
    status.innerHTML = "Sending your message...";
    status.style.color = "orange";

    try {
      // Check for internet connectivity
      if (!navigator.onLine) {
        throw new Error('No internet connection');
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      // Handle case where server is unreachable
      if (!response.ok) {
        if (response.status === 500) {
          throw new Error('Server error. Please try again later.');
        } else if (response.status >= 400 && response.status < 500) {
          throw new Error('Client error. Please check your input and try again.');
        }
      }

      const result = await response.json();

      if (result.success) {
        status.innerHTML = result.message || "Message sent successfully! ✅ I'll get back to you soon.";
        status.style.color = "green";
        contactForm.reset();
        // Reset field styles
        [nameInput, emailInput, messageInput].forEach(input => {
          input.style.borderColor = '';
          input.style.boxShadow = '';
        });
      } else {
        // Display specific error message from server
        status.innerHTML = result.message || "Failed to send message ❌";
        status.style.color = "red";
      }
    } catch (error) {
      console.error('Error:', error);
      
      // Handle different types of errors
      if (error.message === 'No internet connection') {
        status.innerHTML = "No internet connection. Please check your connection and try again ❌";
      } else if (error.message.includes('NetworkError') || error.message.includes('Failed to fetch')) {
        status.innerHTML = "Network error. Server is unreachable. Please try again later ❌";
      } else if (error.message.includes('Server error')) {
        status.innerHTML = error.message;
      } else if (error.message.includes('Client error')) {
        status.innerHTML = error.message;
      } else {
        status.innerHTML = "An unexpected error occurred. Please try again ❌";
      }
      status.style.color = "red";
    } finally {
      // Restore button
      submitBtn.innerHTML = originalBtnText;
      setTimeout(() => {
        submitBtn.disabled = false;
        validateForm(); // Re-validate to set correct button state
      }, 2000);
    }
  });
}

// Fetch and update social links
async function updateSocialLinks() {
  try {
    const response = await fetch('/api/social');
    const socialData = await response.json();
    
    // Update email links
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
      link.href = `mailto:${socialData.email}`;
    });
    
  // Update GitHub links
  const githubLinks = document.querySelectorAll('a[href*="github.com"]');
  githubLinks.forEach(link => {
    link.href = socialData.github;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });
  } catch (error) {
    console.error('Error fetching social links:', error);
  }
}

// Set up custom animation for seamless tech stack scrolling
function setupTechScrollAnimation() {
  const track = document.getElementById('techScrollTrack');
  if (!track) return;
  
  // Calculate the width of original items (first half) to determine the correct scroll distance
  function getOriginalItemsWidth() {
    const totalChildren = track.children.length;
    const originalCount = Math.floor(totalChildren / 2);
    let width = 0;
    
    for (let i = 0; i < originalCount; i++) {
      const item = track.children[i];
      width += item.offsetWidth;
      // Add gap between items (except for the last original item)
      if (i < originalCount - 1) {
        const computedStyle = window.getComputedStyle(item);
        width += parseFloat(computedStyle.marginRight) || 60; // Default to 60px gap
      }
    }
    
    return width;
  }
  
  // Get total track width (including duplicated items)
  function getTotalTrackWidth() {
    return track.scrollWidth || track.offsetWidth;
  }
  
  // Store the original animation state
  let originalAnimation = window.getComputedStyle(track).animation;
  let originalItemsWidth = getOriginalItemsWidth();
  let totalTrackWidth = getTotalTrackWidth();
  
  // For better infinite loop, we should use a more precise animation
  // Update the original animation to ensure it moves by the correct amount
  const styleElement = document.createElement('style');
  styleElement.id = 'tech-scroll-animation';
  
  // Calculate animation based on actual content width
  // This creates a more reliable loop than using percentage-based transforms
  styleElement.textContent = `
    @keyframes scrollTech {
      0% { transform: translateX(0); }
      100% { transform: translateX(-${originalItemsWidth}px); }
    }
  `;
  
  // Replace any existing dynamic animation style
  const existingStyle = document.getElementById('tech-scroll-animation');
  if (existingStyle) {
    existingStyle.remove();
  }
  document.head.appendChild(styleElement);
  
  // Recalculate when the window resizes
  window.addEventListener('resize', () => {
    originalItemsWidth = getOriginalItemsWidth();
    totalTrackWidth = getTotalTrackWidth();
    
    // Update the animation with new calculated width
    styleElement.textContent = `
      @keyframes scrollTech {
        0% { transform: translateX(0); }
        100% { transform: translateX(-${originalItemsWidth}px); }
      }
    `;
    
    // Reset the animation to use the new values
    const wasPaused = track.classList.contains('paused');
    track.style.animation = 'none';
    // Trigger reflow
    track.offsetHeight;
    // Reapply animation
    track.style.animation = originalAnimation;
    if (wasPaused) {
      track.classList.add('paused');
      track.style.animationPlayState = 'paused';
    }
  });
}

// Pause Tech Stack scroll animation when off-screen
function setupTechScrollObserver(){
  const track = document.getElementById('techScrollTrack');
  const container = document.querySelector('.tech-scroll-wrapper') || document.querySelector('.tech-scroll-container');
  if (!track || !('IntersectionObserver' in window) || !container) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      track.classList.toggle('paused', !entry.isIntersecting);
    });
  }, { root: null, threshold: 0 });

  io.observe(container);
}

// Enable touch and mouse drag scrolling for tech stack
function setupTechScrollDragging() {
  const track = document.getElementById('techScrollTrack');
  if (!track) return;
  
  let isDown = false;
  let startX;
  let startTranslateX;
  let animationPaused = false;
  
  // Get current translateX from computed styles
  function getTranslateX() {
    const style = window.getComputedStyle(track);
    const transform = style.transform || style.webkitTransform;
    
    if (transform && transform !== 'none' && transform.includes('matrix')) {
      const matrix = new DOMMatrix(transform);
      return matrix.m41 || 0; // X translation component
    }
    return 0;
  }

  // Mouse events
  track.addEventListener('mousedown', (e) => {
    isDown = true;
    animationPaused = true;
    // Pause animation when dragging starts
    track.style.animationPlayState = 'paused';
    
    startX = e.pageX - track.offsetLeft;
    startTranslateX = getTranslateX();
  });
  
  track.addEventListener('mouseleave', () => {
    if (isDown) {
      isDown = false;
      animationPaused = false;
      // Resume animation when dragging stops
      track.style.animationPlayState = 'running';
    }
  });
  
  track.addEventListener('mouseup', () => {
    isDown = false;
    animationPaused = false;
    // Resume animation after dragging ends
    setTimeout(() => {
      if (!isDown) {
        track.style.animationPlayState = 'running';
      }
    }, 100);
  });
  
  track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 2; // Scroll-fast multiplier
    const newTranslateX = startTranslateX + walk;
    
    // Apply the transform
    track.style.transform = `translateX(${newTranslateX}px)`;
  });

  // Touch events for mobile
  track.addEventListener('touchstart', (e) => {
    isDown = true;
    animationPaused = true;
    // Pause animation when dragging starts
    track.style.animationPlayState = 'paused';
    
    startX = e.touches[0].clientX - track.getBoundingClientRect().left;
    startTranslateX = getTranslateX();
  });
  
  track.addEventListener('touchend', () => {
    isDown = false;
    animationPaused = false;
    // Resume animation after dragging ends
    setTimeout(() => {
      if (!isDown) {
        track.style.animationPlayState = 'running';
      }
    }, 100);
  });
  
  track.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    e.preventDefault(); // Prevent page scrolling
    const x = e.touches[0].clientX - track.getBoundingClientRect().left;
    const walk = (x - startX) * 2; // Scroll-fast multiplier
    const newTranslateX = startTranslateX + walk;
    
    // Apply the transform
    track.style.transform = `translateX(${newTranslateX}px)`;
  });
}

// Make "Coming Soon" buttons accessible
function setupDisabledProjectButtons(){
  const disabledBtns = document.querySelectorAll('.project-btn[aria-disabled="true"]');
  disabledBtns.forEach((btn) => {
    btn.setAttribute('role', 'button');
    btn.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); });
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); }
    });
  });
}

// Keyboard access for menu open/close
function setupMenuKeyboardAccess(){
  const menuEl = document.querySelector('.menu-icon');
  const closeEl = document.querySelector('.close-icon');
  const open = () => { sideBar.classList.remove('close-sidebar'); sideBar.classList.add('open-sidebar'); };
  const close = () => { sideBar.classList.remove('open-sidebar'); sideBar.classList.add('close-sidebar'); };
  if (menuEl){
    menuEl.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }});
  }
  if (closeEl){
    closeEl.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); close(); }});
  }
}


// Smooth scroll to contact section
function setupContactButtons() {
  const contactButtons = document.querySelectorAll('.contact-btn');
  contactButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Project Carousel Functionality
function initProjectCarousel() {
  const projectSlider = document.getElementById('projectSlider');
  const prevBtn = document.getElementById('prevProject');
  const nextBtn = document.getElementById('nextProject');
  const projects = document.querySelectorAll('.project-card');
  let currentProject = 0;
  const totalProjects = projects.length;

  // Initialize the carousel
  function showProject(index) {
    // Remove active class from all projects
    projects.forEach(project => project.classList.remove('active'));
    
    // Add active class to current project
    projects[index].classList.add('active');
    
    currentProject = index;
  }

  // Next button event listener
  nextBtn.addEventListener('click', () => {
    const nextIndex = (currentProject + 1) % totalProjects;
    showProject(nextIndex);
  });

  // Previous button event listener
  prevBtn.addEventListener('click', () => {
    const prevIndex = (currentProject - 1 + totalProjects) % totalProjects;
    showProject(prevIndex);
  });

  // Touch/swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  projectSlider.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  });

  projectSlider.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const minSwipeDistance = 50;
    const swipeDistance = touchStartX - touchEndX;

    if (Math.abs(swipeDistance) < minSwipeDistance) return; // Not enough of a swipe

    if (swipeDistance > 0) {
      // Swiped left - next project
      const nextIndex = (currentProject + 1) % totalProjects;
      showProject(nextIndex);
    } else {
      // Swiped right - previous project
      const prevIndex = (currentProject - 1 + totalProjects) % totalProjects;
      showProject(prevIndex);
    }
  }

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') {
      const nextIndex = (currentProject + 1) % totalProjects;
      showProject(nextIndex);
    } else if (e.key === 'ArrowLeft') {
      const prevIndex = (currentProject - 1 + totalProjects) % totalProjects;
      showProject(prevIndex);
    }
  });
}

// Custom scrollbar implementation
function createCustomScrollbar() {
  // First, disable the default browser scrollbar
  const style = document.createElement('style');
  style.textContent = `
    body::-webkit-scrollbar {
      display: none;
    }
    body {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `;
  document.head.appendChild(style);

  // Create the custom scrollbar elements
  const scrollbarContainer = document.createElement('div');
  scrollbarContainer.id = 'custom-scrollbar';
  scrollbarContainer.style.cssText = `
    position: fixed;
    top: 0;
    right: 0;
    width: 16px;
    height: 100vh;
    background: transparent;
    z-index: 9999;
    pointer-events: none;
  `;
  
  const scrollbarTrack = document.createElement('div');
  scrollbarTrack.id = 'custom-scrollbar-track';
  scrollbarTrack.style.cssText = `
    position: relative;
    width: 100%;
    height: 100%;
    background: transparent;
    pointer-events: none;
  `;
  
  const scrollbarThumb = document.createElement('div');
  scrollbarThumb.id = 'custom-scrollbar-thumb';
  scrollbarThumb.style.cssText = `
    position: absolute;
    top: 0;
    left: 2px;
    width: 12px;
    min-height: 20px;
    border-radius: 6px;
    background: linear-gradient(0deg, #00c9ff, #92fe9d, #00f0ff, #00d2ff, #0072ff);
    background-size: 100% 300%;
    background-position: 0% 0%;
    pointer-events: auto;
    cursor: pointer;
    transition: width 0.1s, opacity 0.3s;
    opacity: 0.4;
    box-shadow: 0 0 8px rgba(0, 201, 255, 0.6);
  `;
  
  // Add the elements to the DOM
  scrollbarTrack.appendChild(scrollbarThumb);
  scrollbarContainer.appendChild(scrollbarTrack);
  document.body.appendChild(scrollbarContainer);
  
  // Calculate scrollbar height based on content
  function updateScrollbarSize() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollbarHeight = (windowHeight / documentHeight) * windowHeight;
    
    scrollbarThumb.style.height = Math.max(20, scrollbarHeight) + 'px';
  }
  
  // Update scrollbar position based on scroll
  function updateScrollbarPosition() {
    const scrollPercentage = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    const maxScrollTop = window.innerHeight - scrollbarThumb.offsetHeight;
    const newTop = scrollPercentage * maxScrollTop;
    
    scrollbarThumb.style.top = newTop + 'px';
  }
  
  // Handle scrollbar dragging
  let isDragging = false;
  let dragOffset = 0;
  
  scrollbarThumb.addEventListener('mousedown', (e) => {
    isDragging = true;
    const rect = scrollbarThumb.getBoundingClientRect();
    dragOffset = e.clientY - rect.top;
    document.body.style.userSelect = 'none';
  });
  
  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    e.preventDefault();
    const scrollbarRect = scrollbarTrack.getBoundingClientRect();
    const newTop = Math.max(0, Math.min(
      e.clientY - scrollbarRect.top - dragOffset,
      window.innerHeight - scrollbarThumb.offsetHeight
    ));
    
    scrollbarThumb.style.top = newTop + 'px';
    
    // Calculate scroll position based on thumb position
    const maxScrollTop = window.innerHeight - scrollbarThumb.offsetHeight;
    const scrollPercentage = newTop / maxScrollTop;
    const scrollAmount = scrollPercentage * (document.documentElement.scrollHeight - window.innerHeight);
    
    window.scrollTo(0, scrollAmount);
  });
  
  document.addEventListener('mouseup', () => {
    isDragging = false;
    document.body.style.userSelect = '';
  });
  
  // Handle mouse enter/leave for visibility
  scrollbarContainer.addEventListener('mouseenter', () => {
    scrollbarThumb.style.opacity = '0.8';
    scrollbarThumb.style.width = '14px';
    scrollbarThumb.style.left = '1px';
  });
  
  scrollbarContainer.addEventListener('mouseleave', () => {
    if (!isDragging) {
      scrollbarThumb.style.opacity = '0.4';
      scrollbarThumb.style.width = '12px';
      scrollbarThumb.style.left = '2px';
    }
  });
  
  // Handle document scroll to move the scrollbar
  let ticking = false;
  function updateScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateScrollbarPosition();
        ticking = false;
      });
      ticking = true;
    }
  }
  
  // Handle window resize
  function handleResize() {
    updateScrollbarSize();
    updateScrollbarPosition();
  }
  
  // Initialize
  updateScrollbarSize();
  updateScrollbarPosition();
  
  // Add event listeners
  document.addEventListener('scroll', updateScroll);
  window.addEventListener('resize', handleResize);
  
  // Add animation to the scrollbar thumb
  scrollbarThumb.style.animation = 'colorShift 8s linear infinite';
  
  // Add CSS for the animation
  const animationStyle = document.createElement('style');
  animationStyle.textContent = `
    @keyframes colorShift {
      0% { background-position: 0% 0%; }
      100% { background-position: 0% 100%; }
    }
  `;
  document.head.appendChild(animationStyle);
}

// Initialize enhancements
window.addEventListener('load', () => { 
  if (window.AOS) { 
    AOS.init({
      once: true, // Only animate once
      duration: 600,
      easing: 'ease-out-quad',
      throttleDelay: 99,
      mirror: false,
      disable: false
    }); 
  } 
  initProjectCarousel(); // Initialize project carousel
  createCustomScrollbar(); // Create stunning custom scrollbar
});

document.addEventListener('DOMContentLoaded', () => {
  updateSocialLinks();
  setupTechScrollAnimation(); // Set up proper animation for tech stack
  setupTechScrollObserver();
  setupTechScrollDragging();  // Add touch scrolling functionality
  setupDisabledProjectButtons();
  setupMenuKeyboardAccess();
  setupContactButtons();
  
  // Hide loading screen after DOM is ready
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 500); // Small delay to ensure content is loaded
  }
});
