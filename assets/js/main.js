/*=============== MODAL PARA AMPLIAR FOTO DE PERFIL ===============*/
const modal = document.getElementById('imgModal');
const modalImage = document.getElementById('modalImage');
const openBtn = document.getElementById('openImgModal');
const closeBtn = document.querySelector('.img-modal-close');

const openModal = () => {
    if (!modal || !modalImage) return;

    const profileImg = document.querySelector('.profile__perfil img');
    if (profileImg) {
        modalImage.src = profileImg.src;
        modalImage.alt = profileImg.alt || 'Foto ampliada';
    }

    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
};

const closeModal = () => {
    if (!modal || !modalImage) return;

    modal.classList.remove('show');
    document.body.style.overflow = '';
    setTimeout(() => { modalImage.src = ''; }, 300);
};

openBtn?.addEventListener('click', openModal);
closeBtn?.addEventListener('click', closeModal);

modal?.addEventListener('click', (e) => {
    if (e.target === modal || e.target === modalImage) {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('show')) {
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
const selectedIcon  = localStorage.getItem('selected-icon');

const getCurrentTheme = () =>
    document.body.classList.contains(darkTheme) ? 'dark' : 'light';

const getCurrentIcon = () =>
    themeButton?.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line';

if (selectedTheme) {
    document.body.classList.toggle(darkTheme, selectedTheme === 'dark');
    themeButton?.classList.toggle(iconTheme, selectedIcon === 'ri-moon-line');
}

themeButton?.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);

    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
});


/*=============== SCROLL REVEAL (solo en páginas que lo usan) ===============*/
if (typeof ScrollReveal !== "undefined") {
    const sr = ScrollReveal({
        origin: 'top',
        distance: '60px',
        duration: 1200,
        delay: 200,
        reset: false,
        easing: 'cubic-bezier(0.5, 0, 0, 1)'
    });

    sr.reveal('.profile__name',          { delay: 200 });
    sr.reveal('.profile__profession',    { delay: 300 });
    sr.reveal('.profile__info',          { delay: 400 });
    sr.reveal('.health-card',            { delay: 500 });
    sr.reveal('.contact-title-section',  { delay: 600 });
    sr.reveal('.contact-buttons',        { delay: 700 });
    sr.reveal('.filters__content',       { delay: 800 });
    sr.reveal('.footer',                 { origin: 'bottom', delay: 300 });
}


/*=============== IMÁGENES SIN TRANSICIONES AL CARGAR ===============*/
document.querySelectorAll('img').forEach(img => {
    img.style.opacity = '1';
    img.style.transform = 'none';
});


/*=============== ALERTA MANUAL ===============*/
window.addEventListener("DOMContentLoaded", () => {
    const alertBox = document.getElementById("exampleAlert");
    const closeBtn = document.getElementById("alertClose");

    if (!alertBox || !closeBtn) return;

    setTimeout(() => {
        alertBox.classList.add("show");
    }, 400);

    closeBtn.addEventListener("click", () => {
        alertBox.classList.remove("show");
    });
});


/*=============== HEADER QUE SE ACHICA ===============*/
const header = document.querySelector("header");
const headerSubtitle = document.querySelector("header p");

window.addEventListener("scroll", () => {
    if (!header) return;

    if (window.scrollY > 40) {
        header.classList.add("header-small");
        headerSubtitle && (headerSubtitle.style.opacity = "0");
    } else {
        header.classList.remove("header-small");
        headerSubtitle && (headerSubtitle.style.opacity = "1");
    }
});

/*=============== LAZY LOAD DEL MAPA (GOOGLE MAPS) ===============*/
document.addEventListener("DOMContentLoaded", () => {
    const mapa = document.getElementById("mapa");
    if (!mapa) return;

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            mapa.innerHTML = `
                <iframe
                  title="Ubicación de Nerón"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d26864.179135171686!2d-61.5239543!3d-32.6854501!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95c9ef85e947f7df%3A0xca367a6a0135d3bc!2sLas%20Parejas%2C%20Santa%20Fe!5e0!3m2!1ses-419!2sar!4v1763665422133"
                  width="100%"
                  height="100%"
                  style="border:0;"
                  allowfullscreen
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade">
                </iframe>
            `;
            observer.disconnect();
        }
    });

    observer.observe(mapa);
});
