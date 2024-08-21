import loadAddPlacePage from './addPlace.js';
import loadEditPlacePage from './editPlace.js';

async function fetchPlaces() {
    const response = await fetch('/api/lugares');
    return await response.json();
}

async function deletePlace(id) {
    const response = await fetch(`/api/lugares/${id}`, {
        method: 'DELETE',
    });
    return await response.json();
}

function createPlacesPage() {
    const main = document.createElement('main');
    main.classList.add('places-main');

   // Contenedor para el título y el buscador
   const headerContainer = document.createElement('div');
   headerContainer.classList.add('header-container');

   const h1 = document.createElement('h1');
   h1.textContent = 'Luagres Disponibles';

   // Crear el campo de búsqueda
   const searchInput = document.createElement('input');
   searchInput.type = 'text';
   searchInput.placeholder = 'Buscar...';
   searchInput.classList.add('place-search');
   
   searchInput.addEventListener('input', () => {
       const searchTerm = searchInput.value.toLowerCase();
       const rows = document.querySelectorAll('.places-table tbody tr');
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
    table.classList.add('places-table');


    const thead = document.createElement('thead');
    const headers = ['ID', 'Nombre', 'Tipo', 'Dirección', 'Zona', 'Capacidad', 'Contacto', 'Teléfono', 'Adicional', 'Condiciones', 'Paquete 1', 'Paquete 2', 'Paquete 3', 'Paquete 4', 'Paquete 5', 'Paquete 6', 'Imagen', 'Acciones'];
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
    buttonsContainer.classList.add('places-buttons');

    const addPlaceButton = document.createElement('button');
    addPlaceButton.textContent = 'Agregar Lugar';
    addPlaceButton.addEventListener('click', () => {
        window.location.hash = '#/agregar-lugar';
        navigate('#/agregar-lugar'); // Navegación
    });

    buttonsContainer.appendChild(addPlaceButton);

    main.appendChild(headerContainer);
    main.appendChild(tableContainer);
    main.appendChild(buttonsContainer);

    fetchPlaces().then(places => {
        places.forEach(place => {
            const row = document.createElement('tr');

            const keys = ['id_lugar', 'nombre_lugar', 'tipo_lugar', 'dir_lugar', 'zona_lugar', 'capacidad_lugar', 'contact_lugar', 'tel_lugar', 'adicional_lugar', 'condiciones_lugar', 'paq1_lugar', 'paq2_lugar', 'paq3_lugar', 'paq4_lugar', 'paq5_lugar', 'paq6_lugar', 'img_lugar'];
            keys.forEach(key => {
                const td = document.createElement('td');
                if (key === 'img_lugar' && place[key]) {
                    const img = document.createElement('img');
                    img.src = `./icons/${place[key]}`;
                    img.alt = 'Imagen del Lugar';
                    img.style.width = '50px'; // Ajusta el tamaño aquí
                    img.style.height = '50px'; // Ajusta el tamaño aquí
                    td.appendChild(img);
                } else {
                    td.textContent = place[key];
                }
                row.appendChild(td);
            });

            const actionsTd = document.createElement('td');

            const editButton = document.createElement('button');
            editButton.textContent = 'Modificar';
            editButton.addEventListener('click', () => {
                window.location.hash = `#/modificar-lugar/${place.id_lugar}`;
                navigate(`#/modificar-lugar/${place.id_lugar}`); 
            });
           

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.addEventListener('click', async () => {
                await deletePlace(place.id_lugar);
                loadPlacesPage(); // Reload the page after deleting
            });

            actionsTd.appendChild(editButton);
            actionsTd.appendChild(deleteButton);
            row.appendChild(actionsTd);

            tbody.appendChild(row);
        });
    });

    return main;
}

function loadPlacesPage() {
    const container = document.getElementById('page-content');
    container.innerHTML = '';
    container.appendChild(createPlacesPage());
}

export default loadPlacesPage;
