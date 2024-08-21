import loadAddCocktailPage from './addCocktail.js';
import loadEditCocktailPage from './editCocktail.js';

async function fetchCocktails() {
    const response = await fetch('/api/cocteleria');
    return await response.json();
}

async function deleteCocktail(id) {
    const response = await fetch(`/api/cocteleria/${id}`, {
        method: 'DELETE',
    });
    return await response.json();
}

function createCocktailsPage() {
    const main = document.createElement('main');
    main.classList.add('cocktails-main');

    
    // Contenedor para el título y el buscador
    const headerContainer = document.createElement('div');
    headerContainer.classList.add('header-container');

    const h1 = document.createElement('h1');
    h1.textContent = 'Coctelería';

    // Crear el campo de búsqueda
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Buscar...';
    searchInput.classList.add('cocktail-search');
    
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const rows = document.querySelectorAll('.cocktails-table tbody tr');
        let firstMatch = null;  // Para almacenar la primera coincidencia
    
        rows.forEach(row => {
            // Obtener todo el contenido de texto de la fila 
            const rowText = row.textContent.toLowerCase();
    
           
            if (rowText.includes(searchTerm)) {
                row.style.display = ''; // Mostrar la fila si coincide
    
                //  primera coincidencia si existe un término de búsqueda
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
    table.classList.add('cocktails-table');

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
    buttonsContainer.classList.add('cocktails-buttons');

    const addCocktailButton = document.createElement('button');
    addCocktailButton.textContent = 'Agregar Coctel';
    addCocktailButton.addEventListener('click', () => {
        window.location.hash = '#/agregar-coctel';
        navigate('#/agregar-coctel'); 
    });

    buttonsContainer.appendChild(addCocktailButton);

    main.appendChild(headerContainer);  // Agrega el contenedor del título y el buscador al DOM
    main.appendChild(tableContainer);
    main.appendChild(buttonsContainer);

    fetchCocktails().then(cocktails => {
        cocktails.forEach(cocktail => {
            const row = document.createElement('tr');

            const keys = ['id_coctel', 'tipo_coctel', 'descrip_coctel', 'precio_coctel', 'contact_coctel', 'tel_coctel'];
            keys.forEach(key => {
                const td = document.createElement('td');
                td.textContent = cocktail[key];
                row.appendChild(td);
            });

            const actionsTd = document.createElement('td');

            const editButton = document.createElement('button');
            editButton.textContent = 'Modificar';
            editButton.addEventListener('click', () => {
                window.location.hash =`#/modificar-coctel/${cocktail.id_coctel}`;
            navigate(`#/modificar-coctel/${cocktail.id_coctel}`); 
                });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.addEventListener('click', async () => {
                await deleteCocktail(cocktail.id_coctel);
                loadCocktailsPage();
            });

            actionsTd.appendChild(editButton);
            actionsTd.appendChild(deleteButton);
            row.appendChild(actionsTd);

            tbody.appendChild(row);
        });
    });

    return main;
}

function loadCocktailsPage() {
    const container = document.getElementById('page-content');
    container.innerHTML = '';
    container.appendChild(createCocktailsPage());
}

export default loadCocktailsPage;
