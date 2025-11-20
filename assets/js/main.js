/*=============== MODAL PARA AMPLIAR FOTO DE PERFIL ===============*/
const modal = document.getElementById('imgModal');
const modalImage = document.getElementById('modalImage'); // la imagen dentro del modal
const openBtn = document.getElementById('openImgModal');
const closeBtn = document.querySelector('.img-modal-close');

// Función para abrir el modal y cargar la imagen del perfil
const openModal = () => {
    // Copiamos la misma imagen que está en el botón del perfil
    const profileImg = document.querySelector('.profile__perfil img');
    if (profileImg) {
        modalImage.src = profileImg.src;
        modalImage.alt = profileImg.alt || 'Foto ampliada de Nerón';
    }

    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
};

const closeModal = () => {
    modal.classList.remove('show');
    document.body.style.overflow = '';
    // Opcional: limpiar la src para ahorrar memoria
    setTimeout(() => { modalImage.src = ''; }, 300);
};

// Abrir modal al hacer clic en la foto de perfil
openBtn?.addEventListener('click', openModal);

// Cerrar con la X
closeBtn?.addEventListener('click', closeModal);

// Cerrar clic fuera de la imagen
modal?.addEventListener('click', (e) => {
    if (e.target === modal || e.target === modalImage) {
        closeModal();
    }
});

// Cerrar con tecla Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
        closeModal();
    }
});

/*=============== FILTERS TABS ===============*/
const tabs = document.querySelectorAll('[data-target]');
const tabContents = document.querySelectorAll('[data-content]');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target);

        if (!target) return;

        // Mostrar contenido
        tabContents.forEach(tc => tc.classList.remove('filters__active'));
        target.classList.add('filters__active');

        // Activar tab
        tabs.forEach(t => t.classList.remove('filter-tab-active'));
        tab.classList.add('filter-tab-active');
    });
});

/*=============== DARK / LIGHT THEME ===============*/
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'ri-sun-line';

// Guardados
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon  = localStorage.getItem('selected-icon');

// Obtener estado actual
const getCurrentTheme = () =>
    document.body.classList.contains(darkTheme) ? 'dark' : 'light';

const getCurrentIcon = () =>
    themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line';

// Aplicar guardados
if (selectedTheme) {
    document.body.classList.toggle(darkTheme, selectedTheme === 'dark');
    themeButton.classList.toggle(iconTheme, selectedIcon === 'ri-moon-line');
}

// Cambiar tema
themeButton?.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);

    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
});

/*=============== SCROLL REVEAL (solo texto) ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 1200,
    delay: 200,
    reset: false,
    easing: 'cubic-bezier(0.5, 0, 0, 1)'
});

// Elementos a animar
sr.reveal('.profile__name',          { delay: 200 });
sr.reveal('.profile__profession',    { delay: 300 });
sr.reveal('.profile__info',          { delay: 400 });
sr.reveal('.health-card',            { delay: 500 });
sr.reveal('.contact-title-section',  { delay: 600 });
sr.reveal('.contact-buttons',        { delay: 700 });
sr.reveal('.filters__content',       { delay: 800 });
sr.reveal('.footer',                 { origin: 'bottom', delay: 300 });

// Las imágenes aparecen sin animación (mejor rendimiento)
document.querySelectorAll('img').forEach(img => {
    img.style.opacity = '1';
    img.style.transform = 'none';
});
