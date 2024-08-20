function createFooter() {
    const footer = document.createElement('footer');
    footer.classList.add('footer-container');

    const p = document.createElement('p');
    p.textContent = '© 2024 Taven Page. Todos los derechos reservados.';

    const contactInfo = document.createElement('div');
    contactInfo.classList.add('contact-info');

    const email = document.createElement('p');
    email.innerHTML = 'Email: <a href="mailto:info@tavenpage.com">info@tavenpage.com</a>';

    const phone = document.createElement('p');
    phone.textContent = 'Teléfono: (555) 123-4567';

    contactInfo.appendChild(email);
    contactInfo.appendChild(phone);

    footer.appendChild(p);
    footer.appendChild(contactInfo);

    return footer;
}

export default createFooter;
