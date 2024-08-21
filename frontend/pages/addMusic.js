function createAddMusicPage() {
    const main = document.createElement('main');
    main.classList.add('add-music-main');

    const h1 = document.createElement('h1');
    h1.textContent = 'Agregar Música';

    const form = document.createElement('form');
    form.classList.add('add-music-form');

    const fields = [
        { label: 'Tipo de Música', type: 'text', name: 'tipo_music' },
        { label: 'Nombre del Grupo', type: 'text', name: 'nom_grupo' },
        { label: 'Descripción del Grupo', type: 'text', name: 'descrip_music' },
        { label: 'Precio', type: 'number', name: 'precio_music' },
        { label: 'Telefono', type: 'number', name: 'tel_music'}
    ];

    fields.forEach(field => {
        const label = document.createElement('label');
        label.textContent = field.label;
        const input = document.createElement('input');
        input.type = field.type;
        input.name = field.name;
        form.appendChild(label);
        form.appendChild(input);
    });

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Agregar Música';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const newMusic = {
            tipo_music: form.tipo_music.value,
            nom_grupo: form.nom_grupo.value,
            descrip_music: form.descrip_music.value,
            precio_music: form.precio_music.value,
            tel_music: form.tel_music.value,
        };

        await fetch('/api/musica', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newMusic),
        });

        loadMusicPage(); // Reload the page after adding
    });

    form.appendChild(submitButton);

    main.appendChild(h1);
    main.appendChild(form);

    return main;
}

function loadAddMusicPage() {
    const container = document.getElementById('page-content');
    container.innerHTML = '';
    container.appendChild(createAddMusicPage());
}

export default loadAddMusicPage;
