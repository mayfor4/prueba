

function createEditEventPage(event) {
    const main = document.createElement('main');
    main.classList.add('edit-event-main');

    const h1 = document.createElement('h1');
    h1.textContent = 'Modificar Evento';

    const form = document.createElement('form');
    form.classList.add('edit-event-form');

    const fields = [
        { label: 'Nombre del Evento', type: 'text', name: 'nombre_event', value: event.nombre_event },
        { label: 'Tipo', type: 'text', name: 'tipo_event', value: event.tipo_event },
        { label: 'Fecha', type: 'date', name: 'fecha_event', value: event.fecha_event },
        { label: 'Cliente', type: 'text', name: 'cli_event', value: event.cli_event },
        { label: 'Lugar', type: 'text', name: 'lugar_event', value: event.lugar_event }
    ];

    fields.forEach(field => {
        const label = document.createElement('label');
        label.textContent = field.label;
        const input = document.createElement('input');
        input.type = field.type;
        input.name = field.name;
        if (field.value) {
            input.value = field.value;
        }
        form.appendChild(label);
        form.appendChild(input);
    });

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Modificar Evento';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        await fetch(`/api/eventos/${event.id_event}`, {
            method: 'PUT',
            body: JSON.stringify(Object.fromEntries(formData)),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        loadEventsPage(); // Reload the page after updating
    });

    form.appendChild(submitButton);

    main.appendChild(h1);
    main.appendChild(form);

    return main;
}

//archivo editar
async function loadEditEventPage(id) {
    const response = await fetch(`/api/eventos/${id}`);
    const event = await response.json();
    const container = document.getElementById('page-content');
    container.innerHTML = '';
    container.appendChild(createEditEventPage(event));
}

export default loadEditEventPage;
