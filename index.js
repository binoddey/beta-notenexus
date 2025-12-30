
// Initialize Swiper (kept)
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    breakpoints: {
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

// --- NAVBAR MOBILE MENU LOGIC (taken from notes.html for parity) ---
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
mobileBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('flex');
});

// Navbar shrink / glass effect on scroll (notes.html behavior)
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.classList.add('py-2');
        nav.classList.remove('py-4');
        // add a subtle backdrop + border to emphasize glass
        nav.querySelector('div > div').classList.add('shadow-lg');
    } else {
        nav.classList.add('py-4');
        nav.classList.remove('py-2');
        nav.querySelector('div > div').classList.remove('shadow-lg');
    }
});

// --- Scroll reveal using IntersectionObserver (keeps animations clean & performant) ---
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.12
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // animate once
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

// small helper: add animate-fade-in-up class when filtering or showing elements
function fadeInUpOnce(el) {
    el.classList.add('animate-fade-in-up');
    setTimeout(() => el.classList.remove('animate-fade-in-up'), 1000);
}