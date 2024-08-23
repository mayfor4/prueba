import loadAddMusicPage from './addMusic.js';
import loadEditMusicPage from './editMusic.js';

async function fetchMusic() {
    const response = await fetch('/api/musica');
    return await response.json();
}

async function deleteMusic(id) {
    const response = await fetch(`/api/musica/${id}`, {
        method: 'DELETE',
    });
    return await response.json();
}

function createMusicPage() {
    const main = document.createElement('main');
    main.classList.add('music-main');

     // Contenedor para el título y el buscador
     const headerContainer = document.createElement('div');
     headerContainer.classList.add('header-container');
 
     const h1 = document.createElement('h1');
     h1.textContent = 'Musica';
 
     // Crear el campo de búsqueda
     const searchInput = document.createElement('input');
     searchInput.type = 'text';
     searchInput.placeholder = 'Buscar...';
     searchInput.classList.add('music-search');
     
     searchInput.addEventListener('input', () => {
         const searchTerm = searchInput.value.toLowerCase();
         const rows = document.querySelectorAll('.music-table tbody tr');
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
    table.classList.add('music-table');

    const thead = document.createElement('thead');
    const headers = ['ID', 'Tipo de Música', 'Nombre del Grupo', 'Descripción del Grupo', 'Precio', 'Telefono','Contacto', 'Acciones'];
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
    buttonsContainer.classList.add('music-buttons');

    const addMusicButton = document.createElement('button');
    addMusicButton.textContent = 'Agregar Música';
    addMusicButton.addEventListener('click', () => {
          window.location.hash = '#/agregar-musica';
        navigate('#/agregar-musica'); // Navegación
        //loadAddMusicPage();
    });

    buttonsContainer.appendChild(addMusicButton);

    main.appendChild(headerContainer);  // Agrega el contenedor del título y el buscador al DOM
    main.appendChild(tableContainer);
    main.appendChild(buttonsContainer);

    fetchMusic().then(music => {
        music.forEach(musicItem => {
            const row = document.createElement('tr');

            const keys = ['id_music', 'tipo_music', 'nom_grupo', 'descrip_music', 'precio_music', 'tel_music','contac_music'];
            keys.forEach(key => {
                const td = document.createElement('td');
                td.textContent = musicItem[key];
                row.appendChild(td);
            });

            const actionsTd = document.createElement('td');

            const editButton = document.createElement('button');
            editButton.textContent = 'Modificar';
            editButton.addEventListener('click', () => {
                window.location.hash = `#/modificar-musica/${musicItem.id_music}`;
                navigate(`#/modificar-musica/${musicItem.id_music}`);
            });


            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.addEventListener('click', async () => {
                await deleteMusic(musicItem.id_music);
                loadMusicPage(); // Reload the page after deleting
            });

            actionsTd.appendChild(editButton);
            actionsTd.appendChild(deleteButton);
            row.appendChild(actionsTd);

            tbody.appendChild(row);
        });
    });

    return main;
}

function loadMusicPage() {
    const container = document.getElementById('page-content');
    container.innerHTML = '';
    container.appendChild(createMusicPage());
}

export default loadMusicPage;
