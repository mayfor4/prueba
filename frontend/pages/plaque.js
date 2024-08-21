import loadAddPlaquePage from './addPlaque.js';
import loadEditPlaquePage from './editPlaque.js';

async function fetchPlaques() {
    const response = await fetch('/api/plaques');
    return await response.json();
}

async function deletePlaque(id) {
    const response = await fetch(`/api/plaques/${id}`, {
        method: 'DELETE',
    });
    return await response.json();
}

function createPlaquesPage() {
    const main = document.createElement('main');
    main.classList.add('plaques-main');

    
    // Contenedor para el título y el buscador
    const headerContainer = document.createElement('div');
    headerContainer.classList.add('header-container');

    const h1 = document.createElement('h1');
    h1.textContent = 'Placas';

    // Crear el campo de búsqueda
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Buscar...';
    searchInput.classList.add('plaques-search');
    
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const rows = document.querySelectorAll('.plaques-table tbody tr');
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
    table.classList.add('plaques-table');

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
    buttonsContainer.classList.add('plaques-buttons');

    const addPlaqueButton = document.createElement('button');
    addPlaqueButton.textContent = 'Agregar Placa';
    addPlaqueButton.addEventListener('click', () => {
        window.location.hash = '#/agregar-placas';
        navigate('#/agregar-placas'); 
    });

    buttonsContainer.appendChild(addPlaqueButton);

    main.appendChild(headerContainer);  // Agrega el contenedor del título y el buscador al DOM
    main.appendChild(tableContainer);
    main.appendChild(buttonsContainer);

    fetchPlaques().then(plaques => {
        plaques.forEach(item => {
            const row = document.createElement('tr');

            const keys = ['id_plaque', 'tipo_plaque', 'descrip_plaque', 'precio_plaque', 'contact_plaque', 'tel_plaque'];
            keys.forEach(key => {
                const td = document.createElement('td');
                td.textContent = item[key];
                row.appendChild(td);
            });

            const imgTd = document.createElement('td');
            const img = document.createElement('img');
            img.src = `icons/${item.img_plaque}`;
            img.style.width = '50px'; // Adjust size as needed
            imgTd.appendChild(img);
            row.appendChild(imgTd);

            const actionsTd = document.createElement('td');

            const editButton = document.createElement('button');
            editButton.textContent = 'Modificar';
            editButton.addEventListener('click', () => {
                window.location.hash =`#/modificar-placas/${item.id_plaque}`;
                navigate(`#/modificar-placas/${item.id_plaque}`); 
                 });
        

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.addEventListener('click', async () => {
                await deletePlaque(item.id_plaque);
                loadPlaquesPage(); // Reload the page after deleting
            });

            actionsTd.appendChild(editButton);
            actionsTd.appendChild(deleteButton);
            row.appendChild(actionsTd);

            tbody.appendChild(row);
        });
    });

    return main;
}

function loadPlaquesPage() {
    const container = document.getElementById('page-content');
    container.innerHTML = '';
    container.appendChild(createPlaquesPage());
}

export default loadPlaquesPage;
