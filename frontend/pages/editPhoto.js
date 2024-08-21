function createEditPhotoPage(photo) {
    const main = document.createElement('main');
    main.classList.add('edit-photo-main');

    const h1 = document.createElement('h1');
    h1.textContent = 'Modificar Foto';

    const form = document.createElement('form');
    form.classList.add('edit-photo-form');

    const fields = [
        { label: 'Tipo', type: 'text', name: 'tipo_foto', value: photo.tipo_foto },
        { label: 'Descripción', type: 'text', name: 'descrip_foto', value: photo.descrip_foto },
        { label: 'Precio', type: 'number', name: 'precio_foto', value: photo.precio_foto },
        { label: 'Contacto', type: 'text', name: 'contact_foto', value: photo.contact_foto },
        { label: 'Teléfono', type: 'tel', name: 'tel_foto', value: photo.tel_foto },
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
    submitButton.textContent = 'Modificar Foto';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const updatedPhoto = {
            tipo_foto: form.tipo_foto.value,
            descrip_foto: form.descrip_foto.value,
            precio_foto: form.precio_foto.value,
            contact_foto: form.contact_foto.value,
            tel_foto: form.tel_foto.value
        };

        await fetch(`/api/fotos/${photo.id_foto}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedPhoto)
        });

        loadPhotosPage();
    });

    form.appendChild(submitButton);

    main.appendChild(h1);
    main.appendChild(form);

    return main;
}

async function loadEditPhotoPage(id) {
    const response = await fetch(`/api/fotos/${id}`);
    const photo = await response.json();
    const container = document.getElementById('page-content');
    container.innerHTML = '';
    container.appendChild(createEditPhotoPage(photo));
}

export default loadEditPhotoPage;
