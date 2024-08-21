import loadAddEventPage from './addEvent.js';
import loadEditEventPage from './editEvent.js';

async function fetchEvents() {
    const response = await fetch('/api/eventos');
    return await response.json();
}

async function deleteEvent(id) {
    const response = await fetch(`/api/eventos/${id}`, {
        method: 'DELETE',
    });
    return await response.json();
}

function createEventsPage() {
    const main = document.createElement('main');
    main.classList.add('events-main');

    const h1 = document.createElement('h1');
    h1.textContent = 'Eventos';

    // Agregando el contenedor del calendario
    const calendarContainer = document.createElement('div');
    calendarContainer.id = 'calendar-container';
    calendarContainer.classList.add('calendar-container');

    // Cargar el calendario de Google
    loadGoogleCalendar(calendarContainer);

    const tableContainer = document.createElement('div');
    tableContainer.classList.add('table-container');

    const table = document.createElement('table');
    table.classList.add('events-table');

    const thead = document.createElement('thead');
    const headers = ['ID', 'Nombre', 'Tipo', 'Fecha', 'Cliente', 'Lugar', 'Acciones'];
    const tr = document.createElement('tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        tr.appendChild(th);
    });
    thead.appendChild(tr);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    table.appendChild(tbody);

    tableContainer.appendChild(table);

    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('events-buttons');

    const addEventButton = document.createElement('button');
    addEventButton.textContent = 'Agregar Evento';
    addEventButton.addEventListener('click', () => {
        window.location.hash = '#/agregar-evento';
        navigate('#/agregar-evento'); // Navegación
    });

    buttonsContainer.appendChild(addEventButton);

    main.appendChild(h1);
    main.appendChild(calendarContainer);  // Coloca el calendario antes de la tabla
    main.appendChild(tableContainer);
    main.appendChild(buttonsContainer);

    fetchEvents().then(events => {
        events.forEach(event => {
            const row = document.createElement('tr');

            const keys = ['id_event', 'nombre_event', 'tipo_event', 'fecha_event', 'cli_event', 'lugar_event'];
            keys.forEach(key => {
                const td = document.createElement('td');
                td.textContent = event[key];
                row.appendChild(td);
            });

            const actionsTd = document.createElement('td');

            const editButton = document.createElement('button');
            editButton.textContent = 'Modificar';
            editButton.addEventListener('click', () => {
                window.location.hash = `#/modificar-evento/${event.id_event}`;
                navigate(`#/modificar-evento/${event.id_event}`); 
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.addEventListener('click', async () => {
                await deleteEvent(event.id_event);
                loadEventsPage(); // Reload the page after deleting
            });

            actionsTd.appendChild(editButton);
            actionsTd.appendChild(deleteButton);
            row.appendChild(actionsTd);

            tbody.appendChild(row);
        });
    });

    return main;
}

function loadGoogleCalendar(container) {
    const iframe = document.createElement('iframe');
    iframe.src = 'https://calendar.google.com/calendar/embed?src=your_calendar_id&ctz=your_time_zone';
    iframe.style.border = '0';
    iframe.width = '800';
    iframe.height = '600';
    iframe.frameBorder = '0';
    iframe.scrolling = 'no';

    container.appendChild(iframe);
}

function loadEventsPage() {
    const container = document.getElementById('page-content');
    container.innerHTML = '';
    container.appendChild(createEventsPage());
}

export default loadEventsPage;
