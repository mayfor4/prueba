import loadAddFoodPage from './addFood.js';
import loadEditFoodPage from './editFood.js';

async function fetchFoods() {
    const response = await fetch('/api/comidas');
    return await response.json();
}

async function deleteFood(id) {
    const response = await fetch(`/api/comidas/${id}`, {
        method: 'DELETE',
    });
    return await response.json();
}

function createFoodsPage() {
    const main = document.createElement('main');
    main.classList.add('foods-main');

     // Contenedor para el título y el buscador
     const headerContainer = document.createElement('div');
     headerContainer.classList.add('header-container');
 
     const h1 = document.createElement('h1');
     h1.textContent = 'Comidas';
 
     // Crear el campo de búsqueda
     const searchInput = document.createElement('input');
     searchInput.type = 'text';
     searchInput.placeholder = 'Buscar...';
     searchInput.classList.add('food-search');
     
     searchInput.addEventListener('input', () => {
         const searchTerm = searchInput.value.toLowerCase();
         const rows = document.querySelectorAll('.foods-table tbody tr');
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
    table.classList.add('foods-table');

    const thead = document.createElement('thead');
    const headers = ['ID', 'Tipo de Comida', 'Descripción','Contacto', 'Acciones'];
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
    buttonsContainer.classList.add('foods-buttons');

    const addFoodButton = document.createElement('button');
    addFoodButton.textContent = 'Agregar Comida';
    addFoodButton.addEventListener('click', () => {
        window.location.hash = '#/agregar-comida';
        navigate('#/agregar-comida'); // Navegación
    });

    buttonsContainer.appendChild(addFoodButton);

    main.appendChild(headerContainer);  // Agrega el contenedor del título y el buscador al DOM
    main.appendChild(tableContainer);
    main.appendChild(buttonsContainer);

    fetchFoods().then(foods => {
        foods.forEach(food => {
            const row = document.createElement('tr');

            const keys = ['id_comida', 'tipo_comida', 'desc_comida','contacto_comida'];
            keys.forEach(key => {
                const td = document.createElement('td');
                td.textContent = food[key];
                row.appendChild(td);
            });

            const actionsTd = document.createElement('td');

            const editButton = document.createElement('button');
            editButton.textContent = 'Modificar';
            editButton.addEventListener('click', () => {
                window.location.hash = `#/modificar-comida/${food.id_comida}`;
                navigate(`#/modificar-comida/${food.id_comida}`); 
                });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.addEventListener('click', async () => {
                await deleteFood(food.id_comida);
                loadFoodsPage(); // Reload the page after deleting
            });

            actionsTd.appendChild(editButton);
            actionsTd.appendChild(deleteButton);
            row.appendChild(actionsTd);

            tbody.appendChild(row);
        });
    });

    return main;
}

function loadFoodsPage() {
    const container = document.getElementById('page-content');
    container.innerHTML = '';
    container.appendChild(createFoodsPage());
}

export default loadFoodsPage;
