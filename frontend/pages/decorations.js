import loadAddDecorationPage from './addDecoration.js';
import loadEditDecorationPage from './editDecoration.js';

async function fetchDecorations() {
    const response = await fetch('/api/decoraciones');
    return await response.json();
}

async function deleteDecoration(id) {
    const response = await fetch(`/api/decoraciones/${id}`, {
        method: 'DELETE',
    });
    return await response.json();
}

function createDecorationsPage() {
    const main = document.createElement('main');
    main.classList.add('decorations-main');

    // Contenedor para el título y el buscador
    const headerContainer = document.createElement('div');
    headerContainer.classList.add('header-container');

    const h1 = document.createElement('h1');
    h1.textContent = 'Decoraciones';

    // Crear el campo de búsqueda
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Buscar...';
    searchInput.classList.add('decoration-search');
    
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const rows = document.querySelectorAll('.decorations-table tbody tr');
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
    table.classList.add('decorations-table');

    const thead = document.createElement('thead');
    const headers = ['ID', 'Tipo', 'Descripción', 'Precio', 'Contacto', 'Teléfono', 'Imagen', 'Acciones'];
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
    buttonsContainer.classList.add('decorations-buttons');

    const addDecorationButton = document.createElement('button');
    addDecorationButton.textContent = 'Agregar Decoración';
    addDecorationButton.addEventListener('click', () => {
        window.location.hash = '#/agregar-decoracion';
        navigate('#/agregar-decoracion'); // Navegación
    });

    buttonsContainer.appendChild(addDecorationButton);

    main.appendChild(headerContainer);  // Agrega el contenedor del título y el buscador al DOM
    main.appendChild(tableContainer);
    main.appendChild(buttonsContainer);

    fetchDecorations().then(decorations => {
        decorations.forEach(decoration => {
            const row = document.createElement('tr');

            const keys = ['id_dec', 'tipo_dec', 'decrip_dec', 'precio_dec', 'contact_dec', 'tel_dec'];
            keys.forEach(key => {
                const td = document.createElement('td');
                td.textContent = decoration[key];
                row.appendChild(td);
            });

            const imgTd = document.createElement('td');
            const img = document.createElement('img');
            img.src = `icons/${decoration.img_dec}`;
            img.style.width = '50px'; // Adjust size as needed
            imgTd.appendChild(img);
            row.appendChild(imgTd);

            const actionsTd = document.createElement('td');

            const editButton = document.createElement('button');
            editButton.textContent = 'Modificar';
            editButton.addEventListener('click', () => {
                window.location.hash = `#/modificar-decoracion/${decoration.id_dec}`;
                 navigate(`#/modificar-decoracion/${decoration.id_dec}`); 
                });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.addEventListener('click', async () => {
                await deleteDecoration(decoration.id_dec);
                loadDecorationsPage(); // Reload the page after deleting
            });

            actionsTd.appendChild(editButton);
            actionsTd.appendChild(deleteButton);
            row.appendChild(actionsTd);

            tbody.appendChild(row);
        });
    });

    return main;
}

function loadDecorationsPage() {
    const container = document.getElementById('page-content');
    container.innerHTML = '';
    container.appendChild(createDecorationsPage());
}

export default loadDecorationsPage;
