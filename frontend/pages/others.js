import loadAddOtherPage from './addOther.js';
import loadEditOtherPage from './editOther.js';

async function fetchOthers() {
    const response = await fetch('/api/otros');
    return await response.json();
}

async function deleteOther(id) {
    const response = await fetch(`/api/otros/${id}`, {
        method: 'DELETE',
    });
    return await response.json();
}

function createOthersPage() {
    const main = document.createElement('main');
    main.classList.add('others-main');

     // Contenedor para el título y el buscador
     const headerContainer = document.createElement('div');
     headerContainer.classList.add('header-container');

    const h1 = document.createElement('h1');
    h1.textContent = 'Otros';
     // Crear el campo de búsqueda
     const searchInput = document.createElement('input');
     searchInput.type = 'text';
     searchInput.placeholder = 'Buscar...';
     searchInput.classList.add('others-search');
     
     searchInput.addEventListener('input', () => {
         const searchTerm = searchInput.value.toLowerCase();
         const rows = document.querySelectorAll('.others-table tbody tr');
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
    table.classList.add('others-table');

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
    buttonsContainer.classList.add('others-buttons');

    const addOtherButton = document.createElement('button');
    addOtherButton.textContent = 'Agregar Otro';
    addOtherButton.addEventListener('click', () => {
        window.location.hash = '#/agregar-otro';
        navigate('#/agregar-otro'); // Navegación
    });

    buttonsContainer.appendChild(addOtherButton);

    main.appendChild(headerContainer);  // Agrega el contenedor del título y el buscador al DOM
    main.appendChild(tableContainer);
    main.appendChild(buttonsContainer);

    fetchOthers().then(others => {
        others.forEach(other => {
            const row = document.createElement('tr');

            const keys = ['id_otro', 'tipo_otro', 'descrip_otro', 'precio_otro', 'contact_otro', 'tel_otro'];
            keys.forEach(key => {
                const td = document.createElement('td');
                td.textContent = other[key];
                row.appendChild(td);
            });

            const imgTd = document.createElement('td');
            const img = document.createElement('img');
            img.src = `icons/${other.img_otro}`;
            img.style.width = '50px'; // Adjust size as needed
            imgTd.appendChild(img);
            row.appendChild(imgTd);

            const actionsTd = document.createElement('td');

            const editButton = document.createElement('button');
            editButton.textContent = 'Modificar';
            editButton.addEventListener('click', () => {
                window.location.hash =`#/modificar-otro/${other.id_otro}`;
                 navigate(`#/modificar-otro/${other.id_otro}`); 
                });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.addEventListener('click', async () => {
                await deleteOther(other.id_otro);
                loadOthersPage(); // Reload the page after deleting
            });

            actionsTd.appendChild(editButton);
            actionsTd.appendChild(deleteButton);
            row.appendChild(actionsTd);

            tbody.appendChild(row);
        });
    });

    return main;
}

function loadOthersPage() {
    const container = document.getElementById('page-content');
    container.innerHTML = '';
    container.appendChild(createOthersPage());
}

export default loadOthersPage;
