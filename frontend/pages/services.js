import loadAddServicePage from './addService.js';
import loadEditServicePage from './editService.js';

async function fetchServices() {
    const response = await fetch('/api/servicios');
    return await response.json();
}

async function deleteService(id) {
    const response = await fetch(`/api/servicios/${id}`, {
        method: 'DELETE',
    });
    return await response.json();
}

function createServicesPage() {
    const main = document.createElement('main');
    main.classList.add('services-main');

     // Contenedor para el título y el buscador
     const headerContainer = document.createElement('div');
     headerContainer.classList.add('header-container');
 
     const h1 = document.createElement('h1');
     h1.textContent = 'Servicios';
 
     // Crear el campo de búsqueda
     const searchInput = document.createElement('input');
     searchInput.type = 'text';
     searchInput.placeholder = 'Buscar...';
     searchInput.classList.add('service-search');
     
     searchInput.addEventListener('input', () => {
         const searchTerm = searchInput.value.toLowerCase();
         const rows = document.querySelectorAll('.services-table tbody tr');
         let firstMatch = null;  // Para almacenar la primera coincidencia
     
         rows.forEach(row => {
             // Obtener todo el contenido de texto de la fila y convertirlo a minúsculas
             const rowText = row.textContent.toLowerCase();
     
             // Verificar si el término de búsqueda se encuentra en el contenido de la fila
             if (rowText.includes(searchTerm)) {
                 row.style.display = ''; // Mostrar la fila si coincide
     
                 // Solo almacenar la primera coincidencia si existe un término de búsqueda
                 if (searchTerm && !firstMatch) {
                     firstMatch = row;
                 }
             } else {
                 row.style.display = 'none'; // Ocultar la fila si no coincide
             }
         });
     
         // Desplazarse solo si hay un término de búsqueda y se encontró una coincidencia
         if (firstMatch) {
             firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
         }
     });
     
     headerContainer.appendChild(h1);
     headerContainer.appendChild(searchInput);

    const tableContainer = document.createElement('div');
    tableContainer.classList.add('table-container');

    const table = document.createElement('table');
    table.classList.add('services-table');

    const thead = document.createElement('thead');
    const headers = ['ID', 'Tipo', 'Descripción', 'Precio', 'Contacto', 'Teléfono', 'Acciones'];
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
    buttonsContainer.classList.add('services-buttons');

    const addServiceButton = document.createElement('button');
    addServiceButton.textContent = 'Agregar Servicio';
    addServiceButton.addEventListener('click', () => {
        window.location.hash = '#/agregar-servicio';
        navigate('#/agregar-servicior'); // Navegación
    });


    buttonsContainer.appendChild(addServiceButton);

    main.appendChild(headerContainer);  // Agrega el contenedor del título y el buscador al DOM
    main.appendChild(tableContainer);
    main.appendChild(buttonsContainer);

    fetchServices().then(services => {
        services.forEach(service => {
            const row = document.createElement('tr');

            // Añadir cada celda a la fila
            const keys = ['id_service', 'tipo_service', 'descrip_service', 'precio_service', 'contact_service', 'tel_service'];
            keys.forEach(key => {
                const td = document.createElement('td');
                td.textContent = service[key];
                row.appendChild(td);
            });

            // Añadir las acciones (modificar, eliminar)
            const actionsTd = document.createElement('td');

            const editButton = document.createElement('button');
            editButton.textContent = 'Modificar';
            editButton.addEventListener('click', () => {
                window.location.hash = `#/modificar-servicio/${service.id_service}`;
                navigate(`#/modificar-servicio/${service.id_service}`); 
                });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.addEventListener('click', async () => {
                await deleteService(service.id_service);
                loadServicesPage(); // Reload the page after deleting
            });

            actionsTd.appendChild(editButton);
            actionsTd.appendChild(deleteButton);
            row.appendChild(actionsTd);

            tbody.appendChild(row);
        });
    });

    return main;
}

function loadServicesPage() {
    const container = document.getElementById('page-content');
    container.innerHTML = '';
    container.appendChild(createServicesPage());
}

export default loadServicesPage;
