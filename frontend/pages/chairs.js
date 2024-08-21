import loadAddChairPage from './addChair.js';
import loadEditChairPage from './editChair.js';

async function fetchChairs() {
    const response = await fetch('/api/sillas');
    return await response.json();
}

async function deleteChair(id) {
    const response = await fetch(`/api/sillas/${id}`, {
        method: 'DELETE',
    });
    return await response.json();
}

function createChairsPage() {
    const main = document.createElement('main');
    main.classList.add('chairs-main');

    // Contenedor para el título y el buscador
    const headerContainer = document.createElement('div');
    headerContainer.classList.add('header-container');

    const h1 = document.createElement('h1');
    h1.textContent = 'Sillas';

    // Crear el campo de búsqueda
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Buscar...';
    searchInput.classList.add('chair-search');
    
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const rows = document.querySelectorAll('.chairs-table tbody tr');
        let firstMatch = null;  // Para almacenar la primera coincidencia
    
        rows.forEach(row => {
            // Obtener todo el contenido de texto de la fila 
            const rowText = row.textContent.toLowerCase();
    
          
            if (rowText.includes(searchTerm)) {
                row.style.display = ''; // Mostrar la fila si coincide
    
                if (searchTerm && !firstMatch) {
                    firstMatch = row;
                }
            } else {
                row.style.display = 'none'; 
            }
        });
    
       
        if (firstMatch) {
            firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
    
    headerContainer.appendChild(h1);
    headerContainer.appendChild(searchInput);

    const tableContainer = document.createElement('div');
    tableContainer.classList.add('table-container');

    const table = document.createElement('table');
    table.classList.add('chairs-table');

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
    buttonsContainer.classList.add('chairs-buttons');

    const addChairButton = document.createElement('button');
    addChairButton.textContent = 'Agregar Silla';
    addChairButton.addEventListener('click', () => {
        window.location.hash = '#/agregar-sillas';
        navigate('#/agregar-sillas '); // Navegación
    });

    buttonsContainer.appendChild(addChairButton);

    main.appendChild(headerContainer);  // Agrega el contenedor del título y el buscador al DOM
    main.appendChild(tableContainer);
    main.appendChild(buttonsContainer);

    fetchChairs().then(chairs => {
        chairs.forEach(chair => {
            const row = document.createElement('tr');

            const keys = ['id_silla', 'tipo_silla', 'descrip_silla', 'precio_silla', 'contact_silla', 'tel_silla'];
            keys.forEach(key => {
                const td = document.createElement('td');
                td.textContent = chair[key];
                row.appendChild(td);
            });

            const imgTd = document.createElement('td');
            const img = document.createElement('img');
            img.src = `icons/${chair.img_silla}`;
            img.style.width = '50px'; // Adjust size as needed
            imgTd.appendChild(img);
            row.appendChild(imgTd);

            const actionsTd = document.createElement('td');

            const editButton = document.createElement('button');
            editButton.textContent = 'Modificar';
            editButton.addEventListener('click', () => {
                window.location.hash = `#/modificar-sillas/${chair.id_silla}`;
                navigate(`#/modificar-sillas/${chair.id_silla}`); 
                 });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.addEventListener('click', async () => {
                await deleteChair(chair.id_silla);
                loadChairsPage(); // Reload the page after deleting
            });

            actionsTd.appendChild(editButton);
            actionsTd.appendChild(deleteButton);
            row.appendChild(actionsTd);

            tbody.appendChild(row);
        });
    });

    return main;
}

function loadChairsPage() {
    const container = document.getElementById('page-content');
    container.innerHTML = '';
    container.appendChild(createChairsPage());
}

export default loadChairsPage;
