function createContactoPage() {
    const main = document.createElement('main');
    main.classList.add('contacto-main');

    const container = document.createElement('div');
    container.classList.add('contacto-container');

    const h1 = document.createElement('h1');
    h1.textContent = 'Contacto';

    const phone = document.createElement('p');
    phone.textContent = 'Teléfono: +52 729 876 3716';

    const socialIcons = document.createElement('div');
    socialIcons.classList.add('social-icons');

    const icons = [
        { href: 'https://wa.me/7298763716', src: 'icons/whatsapp.png', alt: 'WhatsApp' },
        { href: 'https://www.instagram.com/tav.en_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', src: 'icons/instagram.png', alt: 'Instagram' },
        { href: 'https://www.facebook.com/EventosTaven', src: 'icons/facebook.png', alt: 'Facebook' }
    ];

    icons.forEach(icon => {
        const a = document.createElement('a');
        a.href = icon.href;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';

        const img = document.createElement('img');
        img.src = icon.src;
        img.alt = icon.alt;

        a.appendChild(img);
        socialIcons.appendChild(a);
    });

    container.appendChild(h1);
    container.appendChild(phone);
    container.appendChild(socialIcons);

    main.appendChild(container);
    return main;
}

function loadContactoPage() {
    const container = document.getElementById('page-content');
    container.innerHTML = '';
    container.appendChild(createContactoPage());
}

export default loadContactoPage;
