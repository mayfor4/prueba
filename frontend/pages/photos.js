import loadAddPhotoPage from './addPhoto.js';
import loadEditPhotoPage from './editPhoto.js';

async function fetchPhotos() {
    const response = await fetch('/api/fotos');
    return await response.json();
}

async function deletePhoto(id) {
    const response = await fetch(`/api/fotos/${id}`, {
        method: 'DELETE',
    });
    return await response.json();
}

function createPhotosPage() {
    const main = document.createElement('main');
    main.classList.add('photos-main');

    
    // Contenedor para el título y el buscador
    const headerContainer = document.createElement('div');
    headerContainer.classList.add('header-container');

    const h1 = document.createElement('h1');
    h1.textContent = 'Fotos';

    // Crear el campo de búsqueda
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Buscar...';
    searchInput.classList.add('photo-search');
    
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const rows = document.querySelectorAll('.photos-table tbody tr');
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
    table.classList.add('photos-table');

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
    buttonsContainer.classList.add('photos-buttons');

    const addPhotoButton = document.createElement('button');
    addPhotoButton.textContent = 'Agregar Foto';
    addPhotoButton.addEventListener('click', () => {
        window.location.hash = '#/agregar-foto';
        navigate('#/agregar-foto'); 
    });
    buttonsContainer.appendChild(addPhotoButton);

    main.appendChild(headerContainer);  // Agrega el contenedor del título y el buscador al DOM
    main.appendChild(tableContainer);
    main.appendChild(buttonsContainer);

    fetchPhotos().then(photos => {
        photos.forEach(photo => {
            const row = document.createElement('tr');

            const keys = ['id_foto', 'tipo_foto', 'descrip_foto', 'precio_foto', 'contact_foto', 'tel_foto'];
            keys.forEach(key => {
                const td = document.createElement('td');
                td.textContent = photo[key];
                row.appendChild(td);
            });

            const actionsTd = document.createElement('td');

            const editButton = document.createElement('button');
            editButton.textContent = 'Modificar';
            editButton.addEventListener('click', () => {
                window.location.hash =`#/modificar-foto/${photo.id_foto}`;
                 navigate(`#/modificar-foto/${photo.id_foto}`); 
                       });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.addEventListener('click', async () => {
                await deletePhoto(photo.id_foto);
                loadPhotosPage();
            });

            actionsTd.appendChild(editButton);
            actionsTd.appendChild(deleteButton);
            row.appendChild(actionsTd);

            tbody.appendChild(row);
        });
    });

    return main;
}

function loadPhotosPage() {
    const container = document.getElementById('page-content');
    container.innerHTML = '';
    container.appendChild(createPhotosPage());
}

export default loadPhotosPage;
