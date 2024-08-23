import loadEventsPage from './events.js';

function createAddEventPage() {
    const main = document.createElement('main');
    main.classList.add('add-event-main');

    const h1 = document.createElement('h1');
    h1.textContent = 'Agregar Evento';

    const form = document.createElement('form');
    form.classList.add('add-event-form');

    const fields = [
        { label: 'Nombre del Evento', type: 'text', name: 'nombre_event' },
        { label: 'Tipo', type: 'text', name: 'tipo_event' },
        { label: 'Fecha', type: 'date', name: 'fecha_event' },
        { label: 'Cliente', type: 'text', name: 'cli_event' },
        { label: 'Lugar', type: 'text', name: 'lugar_event' }
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
    submitButton.textContent = 'Agregar Evento';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        await fetch('/api/eventos', {
            method: 'POST',
            body: JSON.stringify(Object.fromEntries(formData)),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        //loadEventsPage(); // Reload the page after adding
    });

    form.appendChild(submitButton);

    main.appendChild(h1);
    main.appendChild(form);

    return main;
}

function loadAddEventPage() {
    const container = document.getElementById('page-content');
    container.innerHTML = '';
    container.appendChild(createAddEventPage());
}

export default loadAddEventPage;
