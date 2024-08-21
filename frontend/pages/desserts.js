import loadAddDessertPage from './addDessert.js';
import loadEditDessertPage from './editDessert.js';

async function fetchDesserts() {
    const response = await fetch('/api/postres');
    return await response.json();
}

async function deleteDessert(id) {
    const response = await fetch(`/api/postres/${id}`, {
        method: 'DELETE',
    });
    return await response.json();
}

function createDessertsPage() {
    const main = document.createElement('main');
    main.classList.add('desserts-main');

    
    // Contenedor para el título y el buscador
    const headerContainer = document.createElement('div');
    headerContainer.classList.add('header-container');

    const h1 = document.createElement('h1');
    h1.textContent = 'Postres';

    // Crear el campo de búsqueda
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Buscar...';
    searchInput.classList.add('dessert-search');
    
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const rows = document.querySelectorAll('.desserts-table tbody tr');
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
    table.classList.add('desserts-table');

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
    buttonsContainer.classList.add('desserts-buttons');

    const addDessertButton = document.createElement('button');
    addDessertButton.textContent = 'Agregar Postre';
    addDessertButton.addEventListener('click', () => {
        window.location.hash = '#/agregar-postre';
        navigate('#/agregar-postre'); 
    });

    buttonsContainer.appendChild(addDessertButton);

    main.appendChild(headerContainer);  // Agrega el contenedor del título y el buscador al DOM
    main.appendChild(tableContainer);
    main.appendChild(buttonsContainer);

    fetchDesserts().then(desserts => {
        desserts.forEach(dessert => {
            const row = document.createElement('tr');

            const keys = ['id_postre', 'tipo_postre', 'descrip_postre', 'precio_postre', 'contact_postre', 'tel_postre'];
            keys.forEach(key => {
                const td = document.createElement('td');
                td.textContent = dessert[key];
                row.appendChild(td);
            });

            const actionsTd = document.createElement('td');

            const editButton = document.createElement('button');
            editButton.textContent = 'Modificar';
            editButton.addEventListener('click', () => {
                window.location.hash =`#/modificar-postre/${dessert.id_postre}`;
                navigate(`#/modificar-postre/${dessert.id_postre}`); 
                 });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.addEventListener('click', async () => {
                await deleteDessert(dessert.id_postre);
                loadDessertsPage();
            });

            actionsTd.appendChild(editButton);
            actionsTd.appendChild(deleteButton);
            row.appendChild(actionsTd);

            tbody.appendChild(row);
        });
    });

    return main;
}

function loadDessertsPage() {
    const container = document.getElementById('page-content');
    container.innerHTML = '';
    container.appendChild(createDessertsPage());
}

export default loadDessertsPage;
