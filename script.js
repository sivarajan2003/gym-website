// Mobile nav toggle + IntersectionObserver reveal + subtle hero parallax
document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const hamb = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  hamb && hamb.addEventListener('click', () => {
    const open = mobileNav.getAttribute('aria-hidden') === 'false';
    mobileNav.setAttribute('aria-hidden', String(!open));
    mobileNav.style.display = open ? 'none' : 'block';
    hamb.classList.toggle('open');
  });

  // IntersectionObserver for reveal animations
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // add show (staggered by CSS delay classes)
        entry.target.classList.add('show');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Staggered reveal for hero title + actions (explicitly)
  const title = document.querySelector('.hero-title');
  const actions = document.querySelector('.hero-actions');
  if (title) {
    setTimeout(() => title.classList.add('show'), 420); // headline appears after small delay
    setTimeout(() => actions.classList.add('show'), 620);
  }

  // subtle mouse parallax for hero background (desktop)
  const bg = document.querySelector('.hero-bg');
  if (bg && window.innerWidth > 900) {
    let scale = 1.02;
    let raf = null;
    document.addEventListener('pointermove', (e) => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const px = (e.clientX / window.innerWidth - 0.5) * 18;
        const py = (e.clientY / window.innerHeight - 0.5) * 8;
        bg.style.transform = `translate(${px}px, ${py}px) scale(${scale})`;
      });
    });

    // slow auto-breathe
    setInterval(() => {
      scale = scale === 1.02 ? 1.028 : 1.02;
      bg.style.transition = 'transform 5s ease';
      bg.style.transform = `scale(${scale})`;
    }, 6000);
  }
});

  
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

  
