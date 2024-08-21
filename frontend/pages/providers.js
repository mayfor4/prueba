import loadAddProviderPage from './addProvider.js';
import loadEditProviderPage from './editProvider.js';

async function fetchProviders() {
    const response = await fetch('/api/proveedores');
    return await response.json();
}

async function deleteProvider(id) {
    const response = await fetch(`/api/proveedores/${id}`, {
        method: 'DELETE',
    });
    return await response.json();
}

function createProvidersPage() {
    const main = document.createElement('main');
    main.classList.add('providers-main');

    // Contenedor para el título y el buscador
    const headerContainer = document.createElement('div');
    headerContainer.classList.add('header-container');

    const h1 = document.createElement('h1');
    h1.textContent = 'Proveedores';

    // Crear el campo de búsqueda
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Buscar...';
    searchInput.classList.add('provider-search');
    
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const rows = document.querySelectorAll('.providers-table tbody tr');
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
    table.classList.add('providers-table');

    const thead = document.createElement('thead');
    const headers = ['ID', 'Nombre', 'Tipo', 'Descripción', 'Teléfono', 'Zona', 'Precio', 'Calificación', 'Comentarios', 'Acciones'];
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
    buttonsContainer.classList.add('providers-buttons');

    const addProviderButton = document.createElement('button');
    addProviderButton.textContent = 'Agregar Proveedor';
    addProviderButton.addEventListener('click', () => {
        window.location.hash = '#/agregar-proveedor';
        navigate('#/agregar-proveedor'); // Navegación
    });

    buttonsContainer.appendChild(addProviderButton);

    main.appendChild(headerContainer);  // Agrega el contenedor del título y el buscador al DOM
    main.appendChild(tableContainer);
    main.appendChild(buttonsContainer);

    fetchProviders().then(providers => {
        providers.forEach(provider => {
            const row = document.createElement('tr');

            // Añadir cada celda a la fila
            const keys = ['id_prov', 'nombre_prov', 'tipo_prov', 'descrip_prov', 'tel_prov', 'zona_prov', 'precio_prov', 'calif_prov', 'comment_prov'];
            keys.forEach(key => {
                const td = document.createElement('td');
                td.textContent = provider[key];
                row.appendChild(td);
            });

            // Añadir las acciones (modificar, eliminar)
            const actionsTd = document.createElement('td');

            const editButton = document.createElement('button');
            editButton.textContent = 'Modificar';
            editButton.addEventListener('click', () => {
                window.location.hash = `#/modificar-proveedor/${provider.id_prov}`;
                navigate(`#/modificar-proveedor/${provider.id_prov}`); 
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.addEventListener('click', async () => {
                await deleteProvider(provider.id_prov);
                loadProvidersPage(); // Reload the page after deleting
            });

            actionsTd.appendChild(editButton);
            actionsTd.appendChild(deleteButton);
            row.appendChild(actionsTd);

            tbody.appendChild(row);
        });
    });

    return main;
}

function loadProvidersPage() {
    const container = document.getElementById('page-content');
    container.innerHTML = '';
    container.appendChild(createProvidersPage());
}

export default loadProvidersPage;
