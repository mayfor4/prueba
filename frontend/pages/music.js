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

    const h1 = document.createElement('h1');
    h1.textContent = 'Música';

    const tableContainer = document.createElement('div');
    tableContainer.classList.add('table-container');

    const table = document.createElement('table');
    table.classList.add('music-table');

    const thead = document.createElement('thead');
    const headers = ['ID', 'Tipo de Música', 'Nombre del Grupo', 'Descripción del Grupo', 'Precio', 'Telefono', 'Acciones'];
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
        loadAddMusicPage();
    });

    buttonsContainer.appendChild(addMusicButton);

    main.appendChild(h1);
    main.appendChild(tableContainer);
    main.appendChild(buttonsContainer);

    fetchMusic().then(music => {
        music.forEach(musicItem => {
            const row = document.createElement('tr');

            const keys = ['id_music', 'tipo_music', 'nom_grupo', 'descrip_music', 'precio_music', 'tel_music'];
            keys.forEach(key => {
                const td = document.createElement('td');
                td.textContent = musicItem[key];
                row.appendChild(td);
            });

            const actionsTd = document.createElement('td');

            const editButton = document.createElement('button');
            editButton.textContent = 'Modificar';
            editButton.addEventListener('click', () => {
                loadEditMusicPage(musicItem);
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
