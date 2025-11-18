/* script.js
   - Mobile nav toggle
   - IntersectionObserver reveal (variants + stagger)
   - Hero subtle parallax on mouse move
   - Set current year in footer
*/

document.addEventListener('DOMContentLoaded', () => {
    // mobile nav
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    hamburger && hamburger.addEventListener('click', () => {
      const open = mobileNav.getAttribute('aria-hidden') === 'false';
      mobileNav.setAttribute('aria-hidden', String(!open));
      mobileNav.style.display = open ? 'none' : 'block';
      hamburger.classList.toggle('open');
    });
  
    // IntersectionObserver for reveal animations
    const reveals = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target); // reveal once
        }
      });
    }, {
      threshold: 0.18,
      rootMargin: '0px 0px -10% 0px'
    });
  
    reveals.forEach(el => obs.observe(el));
  // Black to color reveal
const blackReveal = document.querySelectorAll(".black-reveal");

function showBlackReveal() {
  blackReveal.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 120) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", showBlackReveal);
showBlackReveal();

    // Hero parallax / subtle movement for media
    const heroBg = document.querySelector('.hero-bg');
    const heroMediaImg = document.querySelector('.hero-media img');
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX - window.innerWidth / 2) / 80;
      const y = (e.clientY - window.innerHeight / 2) / 120;
      if (heroBg) heroBg.style.transform = `translate(${x}px, ${y}px) scale(1.03)`;
      if (heroMediaImg) heroMediaImg.style.transform = `translate(${x/1.5}px, ${y/1.2}px) scale(1.01)`;
    });
    window.addEventListener('mouseleave', () => {
      if (heroBg) heroBg.style.transform = '';
      if (heroMediaImg) heroMediaImg.style.transform = '';
    });
  
    // Set footer year
    const yearSpan = document.getElementById('year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
  });
  
  // Transformation section slider
const slides = [
    {
      img: "image/jon.webp",
      quote: "When I first joined, I couldn’t even do a proper push-up. Now I’m hitting triple digits on deadlifts. The coaching is next level, and they take time to teach you the ‘why’ behind everything. Liftline turned me from a total beginner into someone who walks into the gym with confidence.",
      author: "— Jonathan R, 20"
    },
    {
      img: "image/simon.webp",
      quote: "I’ve been to a few gyms before, but nothing compares to the energy of Liftline’s MMA sessions. It’s not just about fighting — it’s skill, endurance, mindset. I come out drenched and smiling every time. It’s therapy with gloves on.",
      author: "— Simon S, 26"
    },
    {
      img: "image/688aec964122c176c83fd9db_testi_2.webp",
      quote: "I work long hours and was burned out. Joining PulseFit reminded me what it feels like to challenge myself physically and mentally. The Pro plan with monthly PT was the best investment I made for myself this year.",
      author: "— Clara F, 22"
    }
  ];
  
  let currentSlide = 0;
  
  const imgEl = document.getElementById("transform-img");
  const quoteEl = document.getElementById("transform-quote");
  const authorEl = document.getElementById("transform-author");
  
  function updateSlide() {
    // Fade-out animation
    quoteEl.classList.remove("fade-in");
    authorEl.classList.remove("fade-in");
  
    setTimeout(() => {
      imgEl.src = slides[currentSlide].img;
      quoteEl.textContent = slides[currentSlide].quote;
      authorEl.textContent = slides[currentSlide].author;
  
      // Fade-in animation
      quoteEl.classList.add("fade-in");
      authorEl.classList.add("fade-in");
    }, 300);
  }
  
  // Buttons
  document.getElementById("prevSlide").addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlide();
  });
  
  document.getElementById("nextSlide").addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlide();
  });
  
  // Auto-slide every 6 sec
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlide();
  }, 6000);
  
  // Initial fade-in
  setTimeout(() => {
    quoteEl.classList.add("fade-in");
    authorEl.classList.add("fade-in");
  }, 200);
  // Expand/Collapse Accordion
document.querySelectorAll(".accordion-header").forEach(header => {
    header.addEventListener("click", () => {

        const content = header.nextElementSibling;
        const isOpen = content.classList.contains("open");

        // Close all
        document.querySelectorAll(".accordion-content").forEach(c => c.classList.remove("open"));
        document.querySelectorAll(".accordion-header .icon").forEach(i => i.textContent = "+");

        // Open selected
        if (!isOpen) {
            content.classList.add("open");
            header.querySelector(".icon").textContent = "−";
        }
    });
});

  
