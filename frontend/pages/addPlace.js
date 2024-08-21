import loadPlacesPage from './places.js';

function createAddPlacePage() {
    const main = document.createElement('main');
    main.classList.add('add-place-main');

    const h1 = document.createElement('h1');
    h1.textContent = 'Agregar Lugar';

    const form = document.createElement('form');
    form.classList.add('add-place-form');

    const fields = [
        { label: 'Nombre del Lugar', type: 'text', name: 'nombre_lugar' },
        { label: 'Tipo de Lugar', type: 'text', name: 'tipo_lugar' },
        { label: 'Dirección del Lugar', type: 'text', name: 'dir_lugar' },
        { label: 'Zona del Lugar', type: 'text', name: 'zona_lugar' },
        { label: 'Capacidad del Lugar', type: 'number', name: 'capacidad_lugar' },
        { label: 'Contacto del Lugar', type: 'text', name: 'contact_lugar' },
        { label: 'Teléfono del Lugar', type: 'tel', name: 'tel_lugar' },
        { label: 'Adicional', type: 'text', name: 'adicional_lugar' },
        { label: 'Condiciones del Lugar', type: 'text', name: 'condiciones_lugar' },
        { label: 'Paquete 1', type: 'text', name: 'paq1_lugar' }, // Aquí removí el value: place.paq1_lugar
        { label: 'Paquete 2', type: 'text', name: 'paq2_lugar' },
        { label: 'Paquete 3', type: 'text', name: 'paq3_lugar' },
        { label: 'Paquete 4', type: 'text', name: 'paq4_lugar' },
        { label: 'Paquete 5', type: 'text', name: 'paq5_lugar' },
        { label: 'Paquete 6', type: 'text', name: 'paq6_lugar' },
        { label: 'Imagen del Lugar', type: 'file', name: 'img_lugar' }
    ];
    

    fields.forEach(field => {
        const label = document.createElement('label');
        label.textContent = field.label;
        const input = document.createElement('input');
        input.type = field.type;
        input.name = field.name;
        form.appendChild(label);
        form.appendChild(input);
    });

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Agregar Lugar';
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
    
        fetch('/api/lugares', {
            method: 'POST',
            body: formData, // Envía el FormData directamente
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al agregar el lugar');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un problema al agregar el lugar');
        });
    });
    form.appendChild(submitButton);

    main.appendChild(h1);
    main.appendChild(form);

    return main;
}

function loadAddPlacePage() {
    const container = document.getElementById('page-content');
    container.innerHTML = '';
    container.appendChild(createAddPlacePage());
}

export default loadAddPlacePage;