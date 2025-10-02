const video1 = document.getElementById('projectVideo1');
const video2 = document.getElementById('projectVideo2');
const video3 = document.getElementById('projectVideo3');

// Sidebar elements
const sideBar = document.querySelector('.sidebar');
const menu = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon');
const hoverSign = document.querySelector('.hover-sign');

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
  
  function validateField(input, isValid) {
    if (isValid) {
      input.style.borderColor = '#72a1de';
      input.style.boxShadow = '0 0 5px #72a1de';
    } else {
      input.style.borderColor = '#ff4444';
      input.style.boxShadow = '0 0 5px #ff4444';
    }
  }
  
  function validateForm() {
    const isNameValid = nameInput.value.trim().length >= 2;
    const isEmailValid = emailRegex.test(emailInput.value.trim());
    const isMessageValid = messageInput.value.trim().length >= 10;
    
    validateField(nameInput, isNameValid);
    validateField(emailInput, isEmailValid);
    validateField(messageInput, isMessageValid);
    
    const isFormValid = isNameValid && isEmailValid && isMessageValid;
    submitBtn.disabled = !isFormValid;
    submitBtn.style.opacity = isFormValid ? '1' : '0.5';
    
    return isFormValid;
  }
  
  // Add event listeners for real-time validation
  nameInput.addEventListener('input', validateForm);
  emailInput.addEventListener('input', validateForm);
  messageInput.addEventListener('input', validateForm);
  
  // Initial validation
  validateForm();
  
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    
    if (!validateForm()) {
      const status = document.getElementById("formStatus");
      status.innerHTML = "Please fill in all fields correctly ❌";
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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

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
        status.innerHTML = result.message || "Failed to send message ❌";
        status.style.color = "red";
      }
    } catch (error) {
      console.error('Error:', error);
      status.innerHTML = "Network error. Please check your connection and try again ❌";
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

// Initialize enhancements
window.addEventListener('load', () => { if (window.AOS) { AOS.init(); } });

document.addEventListener('DOMContentLoaded', () => {
  updateSocialLinks();
  setupTechScrollObserver();
  setupDisabledProjectButtons();
  setupMenuKeyboardAccess();
  setupContactButtons();
});
