function createEditMusicPage(music) {
    const main = document.createElement('main');
    main.classList.add('edit-music-main');

    const h1 = document.createElement('h1');
    h1.textContent = 'Modificar Música';

    const form = document.createElement('form');
    form.classList.add('edit-music-form');

    const fields = [
        { label: 'Tipo de Música', type: 'text', name: 'tipo_music', value: music.tipo_music },
        { label: 'Nombre del Grupo', type: 'text', name: 'nom_grupo', value: music.nom_grupo },
        { label: 'Descripción del Grupo', type: 'text', name: 'descrip_music', value: music.descrip_music },
        { label: 'Precio', type: 'number', name: 'precio_music', value: music.precio_music },
        { label: 'Telefono', type: 'number', name: 'tel_music', value: music.tel_music}
    ];

    fields.forEach(field => {
        const label = document.createElement('label');
        label.textContent = field.label;
        const input = document.createElement('input');
        input.type = field.type;
        input.name = field.name;
        input.value = field.value;
        form.appendChild(label);
        form.appendChild(input);
    });

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Modificar Música';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const updatedMusic = {
            tipo_music: form.tipo_music.value,
            nom_grupo: form.nom_grupo.value,
            descrip_music: form.descrip_music.value,
            precio_music: form.precio_music.value,
            tel_music: form.tel_music.value,
        };

        await fetch(`/api/musica/${music.id_music}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedMusic),
        });

        loadMusicPage(); // Reload the page after updating
    });

    form.appendChild(submitButton);

    main.appendChild(h1);
    main.appendChild(form);

    return main;
}

function loadEditMusicPage(music) {
    const container = document.getElementById('page-content');
    container.innerHTML = '';
    container.appendChild(createEditMusicPage(music));
}

export default loadEditMusicPage;
