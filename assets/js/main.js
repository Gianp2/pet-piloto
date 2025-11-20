/*=============== MODAL PARA AMPLIAR FOTO DE PERFIL ===============*/
const modal = document.getElementById('imgModal');
const openBtn = document.getElementById('openImgModal');
const closeBtn = document.querySelector('.img-modal-close');

// Abrir modal
openBtn.addEventListener('click', () => {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
});

// Cerrar con X
closeBtn.addEventListener('click', () => {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
});

// Cerrar al hacer clic fuera
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

// Cerrar con Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

/*=============== FILTERS TABS ===============*/
const tabs = document.querySelectorAll('[data-target]');
const tabContents = document.querySelectorAll('[data-content]');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target);

        tabContents.forEach(tc => tc.classList.remove('filters__active'));
        target.classList.add('filters__active');

        tabs.forEach(t => t.classList.remove('filter-tab-active'));
        tab.classList.add('filter-tab-active');
    });
});

/*=============== DARK / LIGHT THEME ===============*/
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'ri-sun-line';

const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line';

if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme);
}

themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
});

/*=============== SCROLL REVEAL - SOLO TEXTO Y ELEMENTOS, SIN IMÁGENES ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
    reset: false,
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
});

// Solo animamos texto y contenedores, NUNCA las imágenes
sr.reveal('.profile__name',       { delay: 300 });
sr.reveal('.profile__profession', { delay: 400 });
sr.reveal('.profile__info',       { delay: 500 });
sr.reveal('.health-card',         { delay: 600 });
sr.reveal('.contact-title-section', { delay: 700 });
sr.reveal('.contact-buttons',     { delay: 800 });
sr.reveal('.filters__content',    { delay: 900 });
sr.reveal('.footer',              { delay: 400, origin: 'bottom' });

// LAS IMÁGENES APARECEN DIRECTO (sin animación)
document.querySelectorAll('.projects__card img, .profile__perfil img').forEach(img => {
    img.style.opacity = '1';
    img.style.transform = 'none';
});