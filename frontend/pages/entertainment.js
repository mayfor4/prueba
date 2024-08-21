import loadAddEntertainmentPage from './addEntertainment.js';
import loadEditEntertainmentPage from './editEntertainment.js';

async function fetchEntertainment() {
    const response = await fetch('/api/diversion');
    return await response.json();
}

async function deleteEntertainment(id) {
    const response = await fetch(`/api/diversion/${id}`, {
        method: 'DELETE',
    });
    return await response.json();
}

function createEntertainmentPage() {
    const main = document.createElement('main');
    main.classList.add('entertainment-main');

   
    // Contenedor para el título y el buscador
    const headerContainer = document.createElement('div');
    headerContainer.classList.add('header-container');

    const h1 = document.createElement('h1');
    h1.textContent = 'Diversión';

    // Crear el campo de búsqueda
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Buscar...';
    searchInput.classList.add('entertainment-search');
    
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const rows = document.querySelectorAll('.entertainment-table tbody tr');
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
    table.classList.add('entertainment-table');

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
    buttonsContainer.classList.add('entertainment-buttons');

    const addEntertainmentButton = document.createElement('button');
    addEntertainmentButton.textContent = 'Agregar Diversión';
    addEntertainmentButton.addEventListener('click', () => {
        window.location.hash = '#/agregar-diversion';
        navigate('#/agregar-diversion'); 
    });

    buttonsContainer.appendChild(addEntertainmentButton);

    main.appendChild(headerContainer);  // Agrega el contenedor del título y el buscador al DOM
    main.appendChild(tableContainer);
    main.appendChild(buttonsContainer);

    fetchEntertainment().then(entertainment => {
        entertainment.forEach(item => {
            const row = document.createElement('tr');

            const keys = ['id_diversion', 'tipo_diversion', 'descrip_diversion', 'precio_diversion', 'contact_diversion', 'tel_diversion'];
            keys.forEach(key => {
                const td = document.createElement('td');
                td.textContent = item[key];
                row.appendChild(td);
            });

            const actionsTd = document.createElement('td');

            const editButton = document.createElement('button');
            editButton.textContent = 'Modificar';
            editButton.addEventListener('click', () => {
                window.location.hash =`#/modificar-diversion/${item.id_diversion}`;
                     navigate(`#/modificar-diversion/${item.id_diversion}`); 
                      });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.addEventListener('click', async () => {
                await deleteEntertainment(item.id_diversion);
                loadEntertainmentPage();
            });

            actionsTd.appendChild(editButton);
            actionsTd.appendChild(deleteButton);
            row.appendChild(actionsTd);

            tbody.appendChild(row);
        });
    });

    return main;
}

function loadEntertainmentPage() {
    const container = document.getElementById('page-content');
    container.innerHTML = '';
    container.appendChild(createEntertainmentPage());
}

export default loadEntertainmentPage;
