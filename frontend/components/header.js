import { navigate } from './navigation.js'; // Importar la función de navegación

function createHeader() {
    const header = document.createElement('header'); 
    header.className = 'text-light p-1 d-flex justify-content-between align-items-center'; // Eliminamos 'bg-dark'
    header.style.backgroundColor = '#711D1D'; // Color de fondo personalizado

    const logoContainer = document.createElement('div');
    logoContainer.className = 'logo-container';

    const logo = document.createElement('img');
    logo.src = 'icons/taven.png'; // Ruta del logo
    logo.alt = 'Logo Taven';
    logo.className = 'logo'; // Clase personalizada para tamaño del logo

    logoContainer.appendChild(logo);

    const nav = document.createElement('nav');
    //nav.className = 'navbar navbar-expand-lg navbar-dark bg-dark';

    const ul = document.createElement('ul');
    ul.className = 'navbar-nav d-flex flex-row justify-content-end ms-auto'; // Alineación a la derecha en fila

    const pages = ['Inicio', 'Solicitar Cotización', 'Contacto', 'Conócenos'];

    pages.forEach(page => {
        const li = document.createElement('li');
        li.className = 'nav-item menu-item'; // Agrega clase adicional para estilos personalizados

        const a = document.createElement('a');
        a.textContent = page;
        a.className = 'nav-link menu-link'; // Agrega clase adicional para estilos personalizados
        a.href = '#';
        a.addEventListener('click', (e) => {
            e.preventDefault();
            navigateToPage(page);
        });

        li.appendChild(a);
        ul.appendChild(li);
    });

    const adminButton = document.createElement('li');
    adminButton.className = 'nav-item menu-item'; // Agrega clase adicional para estilos personalizados

    const adminLink = document.createElement('a');
    adminLink.textContent = 'Admin';
    adminLink.className = 'nav-link menu-link'; // Agrega clase adicional para estilos personalizados
    adminLink.href = '#';
    adminButton.appendChild(adminLink);
    adminButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.hash = '#admin';
        navigate('#admin'); // Utiliza la función de navegación centralizada
    });
    ul.appendChild(adminButton);

    nav.appendChild(ul);

    header.appendChild(logoContainer);
    header.appendChild(nav);

    return header;
}

function navigateToPage(page) {
    const hashMap = {
        'Inicio': '#inicio',
        'Solicitar Cotización': '#solicitar-cotizacion',
        'Contacto': '#contacto',
        'Conócenos': '#conocenos'
    };
    const hash = hashMap[page];
    if (hash) {
        window.location.hash = hash;
        navigate(hash); // Utiliza la función de navegación centralizada
    }
}

// Manejo de navegación al cargar la página
document.body.insertBefore(createHeader(), document.body.firstChild);
navigate(window.location.hash || '#inicio'); // Carga la página inicial según el hash actual

export default createHeader;
