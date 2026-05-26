const mobileMenuButton = document.getElementById('mobileMenuButton');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const closeMobileMenu = document.getElementById('closeMobileMenu');

const openMobileMenu = () => {
    mobileMenuOverlay.classList.remove('hidden');
    mobileMenuButton.setAttribute('aria-expanded', 'true');
    document.body.classList.add('overflow-hidden');
};

const closeMobileMenuPanel = () => {
    mobileMenuOverlay.classList.add('hidden');
    mobileMenuButton.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('overflow-hidden');
};

mobileMenuButton.addEventListener('click', openMobileMenu);
closeMobileMenu.addEventListener('click', closeMobileMenuPanel);

mobileMenuOverlay.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMobileMenuPanel);
});