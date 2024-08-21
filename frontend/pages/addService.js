export function createAddServicePage() {
    const main = document.createElement('main');
    main.classList.add('add-service-main');

    const h1 = document.createElement('h1');
    h1.textContent = 'Agregar Servicio';

    const form = document.createElement('form');
    form.classList.add('add-service-form');

    const fields = [
        { label: 'Tipo de Servicio', type: 'text', name: 'tipo_service' },
        { label: 'Descripción del Servicio', type: 'text', name: 'descrip_service' },
        { label: 'Precio del Servicio', type: 'number', name: 'precio_service' },
        { label: 'Contacto del Servicio', type: 'text', name: 'contact_service' },
        { label: 'Teléfono del Servicio', type: 'tel', name: 'tel_service' },
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
    submitButton.textContent = 'Agregar Servicio';

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        fetch('/api/servicios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al agregar el servicio');
            }
            return response.json();
        })
        .then(data => {
            alert(data.message);
            loadServicesPage(); // Volver a la página de servicios después de agregar uno nuevo
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un problema al agregar el servicio');
        });
    });

    form.appendChild(submitButton);

    main.appendChild(h1);
    main.appendChild(form);

    return main;
}

export function loadAddServicePage() {
    const container = document.getElementById('page-content');
    container.innerHTML = '';
    container.appendChild(createAddServicePage());
}

export default loadAddServicePage;