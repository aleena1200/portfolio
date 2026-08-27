/* =======================================================
   PORTFOLIO SCRIPT
   -------------------------------------------------------
   This one file runs on every page. Each feature is wrapped
   in its own function and only does something if the
   matching HTML elements actually exist on the page — so
   it's safe to load on all 5 pages without errors.
   ======================================================= */

document.addEventListener('DOMContentLoaded', function () {
  setActiveNavLink();
  setupHamburgerMenu();
  setupScrollReveal();
  setupSkillBars();
  setupBackToTop();
  setupImageFallbacks();
  setupCvButtons();
  setupContactForm();
});

/* ---------------------------------------------------------
   1. HIGHLIGHT THE CURRENT PAGE IN THE NAVBAR
   ---------------------------------------------------------
   Compares each navbar link's href to the current page's
   filename and adds the "active" class to the matching one.
--------------------------------------------------------- */
function setActiveNavLink() {
  // e.g. "/portfolio/about.html" -> "about.html"
  var currentPage = window.location.pathname.split('/').pop();
  if (currentPage === '') currentPage = 'index.html';

  var navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(function (link) {
    var linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.classList.add('active');
    }
  });
}

/* ---------------------------------------------------------
   2. MOBILE HAMBURGER MENU
   ---------------------------------------------------------
   Toggles the ".open" class on the hamburger icon and the
   nav links list, which CSS uses to slide the menu in/out.
--------------------------------------------------------- */
function setupHamburgerMenu() {
  var hamburger = document.querySelector('.hamburger');
  var navLinks = document.querySelector('.nav-links');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close the menu automatically when a link is tapped
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

/* ---------------------------------------------------------
   3. SCROLL REVEAL ANIMATIONS
   ---------------------------------------------------------
   Any element with the class "reveal" fades and slides into
   place the first time it enters the viewport. We use the
   IntersectionObserver API, which is efficient because it
   doesn't run on every scroll event.
--------------------------------------------------------- */
function setupScrollReveal() {
  var revealItems = document.querySelectorAll('.reveal');
  if (revealItems.length === 0) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target); // only animate once
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach(function (item) {
    observer.observe(item);
  });
}

/* ---------------------------------------------------------
   4. ANIMATED SKILL BARS (skills.html)
   ---------------------------------------------------------
   Each ".skill-fill" bar has its target width stored in a
   "data-level" attribute (e.g. data-level="90"). We only set
   the real width once the bar scrolls into view, so the
   animation is visible instead of happening off-screen.
--------------------------------------------------------- */
function setupSkillBars() {
  var bars = document.querySelectorAll('.skill-fill');
  if (bars.length === 0) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var target = entry.target;
          var level = target.getAttribute('data-level');
          target.style.width = level + '%';
          observer.unobserve(target);
        }
      });
    },
    { threshold: 0.4 }
  );

  bars.forEach(function (bar) {
    observer.observe(bar);
  });
}

/* ---------------------------------------------------------
   5. BACK-TO-TOP BUTTON
   ---------------------------------------------------------
   Shows the round button once the user scrolls down a bit,
   and scrolls smoothly to the top when clicked.
--------------------------------------------------------- */
function setupBackToTop() {
  var button = document.querySelector('.back-to-top');
  if (!button) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      button.classList.add('show');
    } else {
      button.classList.remove('show');
    }
  });

  button.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---------------------------------------------------------
   6. IMAGE FALLBACKS
   ---------------------------------------------------------
   Every real <img> in this site (profile photo, CV preview,
   project screenshots) has a matching ".image-placeholder"
   <div> right next to it in the HTML. Until you add your own
   image files into /assets, the real <img> will fail to load
   — so we hide the broken image and show the nice-looking
   placeholder div instead. Once you drop in real images with
   the correct filenames, this fallback simply won't trigger.
--------------------------------------------------------- */
function setupImageFallbacks() {
  var images = document.querySelectorAll('img[data-fallback]');
  images.forEach(function (img) {
    img.addEventListener('error', function () {
      img.style.display = 'none';
      var placeholder = img.nextElementSibling;
      if (placeholder && placeholder.classList.contains('image-placeholder')) {
        placeholder.style.display = 'flex';
      }
    });
  });
}

/* ---------------------------------------------------------
   7. CV BUTTONS (about.html)
   ---------------------------------------------------------
   "View CV" opens assets/cv.jpg in a new browser tab.
   "Download CV" triggers a direct file download using the
   same file. Replace assets/cv.jpg with your real CV
   (ideally a PDF — see the comment in about.html) and these
   buttons will work automatically.
--------------------------------------------------------- */
function setupCvButtons() {
  var viewBtn = document.getElementById('viewCvBtn');
  var downloadBtn = document.getElementById('downloadCvBtn');
  var cvPath = 'assets/cv.jpg'; // <-- replace with your real CV file path

  if (viewBtn) {
    viewBtn.addEventListener('click', function () {
      window.open(cvPath, '_blank');
    });
  }

  if (downloadBtn) {
    downloadBtn.addEventListener('click', function () {
      var link = document.createElement('a');
      link.href = cvPath;
      link.download = 'CV'; // suggested filename for the download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
}

/* ---------------------------------------------------------
   8. CONTACT FORM VALIDATION (contact.html)
 /* */
function setupContactForm() {
  var form = document.getElementById('contactForm');
  if (!form) return;

  var successBox = document.querySelector('.form-success');

  form.addEventListener('submit', function (e) {
    var isValid = true;

    var name = document.getElementById('name');
    var email = document.getElementById('email');
    var subject = document.getElementById('subject');
    var message = document.getElementById('message');

   
    var isNameValid = validateField(name, name.value.trim().length >= 2);
    var isEmailValid = validateField(email, isValidEmail(email.value.trim()));
    var isSubjectValid = validateField(subject, subject.value.trim().length >= 3);
    var isMessageValid = validateField(message, message.value.trim().length >= 10);

    
    isValid = isNameValid && isEmailValid && isSubjectValid && isMessageValid;

    if (!isValid) {
   
      e.preventDefault();
    } else {
    
    }
  });

  [document.getElementById('name'), document.getElementById('email'), document.getElementById('subject'), document.getElementById('message')].forEach(function (field) {
    if (!field) return;
    field.addEventListener('input', function () {
      field.closest('.form-group').classList.remove('invalid');
    });
  });
}