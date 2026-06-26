// CATIGS 2026 - Site Scripts

// GSAP Registration
gsap.registerPlugin(ScrollTrigger);

// Mobile Menu Toggle
function toggleMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const btn = document.getElementById('mobile-menu-toggle');
    if (mobileMenu) {
        const isHidden = mobileMenu.classList.toggle('hidden');
        if (btn) btn.setAttribute('aria-expanded', (!isHidden).toString());
    }
}

// Close mobile menu on resize
window.addEventListener('resize', () => {
    const mobileMenu = document.getElementById('mobile-menu');
    const btn = document.getElementById('mobile-menu-toggle');
    if (window.innerWidth >= 1024 && mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        if (btn) btn.setAttribute('aria-expanded', 'false');
    }
});

// Navbar scroll effect
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('main-nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }

    // Hero Animations
    const heroTimeline = gsap.timeline();
    heroTimeline
        .from("nav", { y: -100, opacity: 0, duration: 1, ease: "power4.out" })
        .from("#hero h1", { y: 80, opacity: 0, duration: 1.2, ease: "power4.out" }, "-=0.5")
        .from("#hero p", { y: 40, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.8")
        .from("#hero .badge-gold", { scale: 0.8, opacity: 0, duration: 0.8, ease: "back.out(1.7)" }, "-=1")
        .from("#hero .flex.flex-col.sm\\:flex-row", { y: 30, opacity: 0, duration: 0.8, ease: "power2.out" }, "-=0.6");

    // Scroll Animations
    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section, {
            opacity: 0,
            y: 60,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: section,
                start: "top 85%",
                toggleActions: "play none none none"
            }
        });
    });

    // Stat Counter Animation
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0) {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            if (target) {
                ScrollTrigger.create({
                    trigger: stat,
                    start: "top 85%",
                    onEnter: () => {
                        let current = 0;
                        const increment = target / 60;
                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= target) {
                                current = target;
                                clearInterval(timer);
                            }
                            stat.textContent = Math.floor(current).toLocaleString() + (stat.getAttribute('data-suffix') || '');
                        }, 30);
                    },
                    once: true
                });
            }
        });
    }

    // Countdown Timer
    const countdownDate = new Date('2026-11-12T00:00:00').getTime();
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        
        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            const daysEl = document.getElementById('countdown-days');
            const hoursEl = document.getElementById('countdown-hours');
            const minutesEl = document.getElementById('countdown-minutes');
            const secondsEl = document.getElementById('countdown-seconds');
            
            if (daysEl) daysEl.textContent = days;
            if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
            if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
            if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Speaker Carousel
    const speakerCarousel = document.getElementById('speaker-carousel');
    if (speakerCarousel) {
        let currentSlide = 0;
        const slides = speakerCarousel.querySelectorAll('.speaker-slide');
        const totalSlides = slides.length;
        
        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.style.transform = `translateX(${(i - index) * 100}%)`;
            });
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        }
        
        if (totalSlides > 0) {
            showSlide(0);
            setInterval(nextSlide, 5000);
        }
    }

    // Sponsor Carousel
    const sponsorTrack = document.getElementById('sponsor-track');
    if (sponsorTrack) {
        let position = 0;
        const speed = 0.12;
        
        function animateSponsors() {
            position -= speed;
            if (position <= -50) {
                position = 0;
            }
            sponsorTrack.style.transform = `translateX(${position}%)`;
            requestAnimationFrame(animateSponsors);
        }
        
        animateSponsors();
    }

    // Newsletter Form
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]').value;
            if (email) {
                alert('Thank you for subscribing to CATIGS 2026 updates!');
                form.reset();
            }
        });
    });

    // Registration Form
    const regForms = document.querySelectorAll('.registration-form');
    regForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Registration inquiry submitted! Our team will contact you shortly.');
            form.reset();
        });
    });

    // Contact Form
    const contactForms = document.querySelectorAll('.contact-form');
    contactForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Message sent successfully! We will get back to you soon.');
            form.reset();
        });
    });
});
