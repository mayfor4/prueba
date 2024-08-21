export function createEditServicePage(service) {
    const main = document.createElement('main');
    main.classList.add('edit-service-main');

    const h1 = document.createElement('h1');
    h1.textContent = 'Modificar Servicio';

    const form = document.createElement('form');
    form.classList.add('edit-service-form');

    const fields = [
        { label: 'Tipo de Servicio', type: 'text', name: 'tipo_service', value: service.tipo_service },
        { label: 'Descripción del Servicio', type: 'text', name: 'descrip_service', value: service.descrip_service },
        { label: 'Precio del Servicio', type: 'number', name: 'precio_service', value: service.precio_service },
        { label: 'Contacto del Servicio', type: 'text', name: 'contact_service', value: service.contact_service },
        { label: 'Teléfono del Servicio', type: 'tel', name: 'tel_service', value: service.tel_service },
    ];

    fields.forEach(field => {
        const label = document.createElement('label');
        label.textContent = field.label;
        const input = document.createElement('input');
        input.type = field.type;
        input.name = field.name;
        input.value = field.value;
        form.appendChild(label);
        form.appendChild(input);
    });

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Modificar Servicio';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const updatedService = {
            tipo_service: form.tipo_service.value,
            descrip_service: form.descrip_service.value,
            precio_service: form.precio_service.value,
            contact_service: form.contact_service.value,
            tel_service: form.tel_service.value
        };

        await fetch(`/api/servicios/${service.id_service}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedService)
        });

        loadServicesPage(); // Reload the page after updating
    });

    form.appendChild(submitButton);

    main.appendChild(h1);
    main.appendChild(form);

    return main;
}

//Archivo Editar
async function loadEditServicePage(id) {
    const response = await fetch(`/api/servicios/${id}`);
    const service = await response.json();
    const container = document.getElementById('page-content');
    container.innerHTML = '';
    container.appendChild(createEditServicePage(service));
}

export default loadEditServicePage;