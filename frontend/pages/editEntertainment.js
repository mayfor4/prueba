function createEditEntertainmentPage(entertainment) {
    const main = document.createElement('main');
    main.classList.add('edit-entertainment-main');

    const h1 = document.createElement('h1');
    h1.textContent = 'Modificar Diversión';

    const form = document.createElement('form');
    form.classList.add('edit-entertainment-form');

    const fields = [
        { label: 'Tipo', type: 'text', name: 'tipo_diversion', value: entertainment.tipo_diversion },
        { label: 'Descripción', type: 'text', name: 'descrip_diversion', value: entertainment.descrip_diversion },
        { label: 'Precio', type: 'number', name: 'precio_diversion', value: entertainment.precio_diversion },
        { label: 'Contacto', type: 'text', name: 'contact_diversion', value: entertainment.contact_diversion },
        { label: 'Teléfono', type: 'tel', name: 'tel_diversion', value: entertainment.tel_diversion },
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
    submitButton.textContent = 'Modificar Diversión';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const updatedEntertainment = {
            tipo_diversion: form.tipo_diversion.value,
            descrip_diversion: form.descrip_diversion.value,
            precio_diversion: form.precio_diversion.value,
            contact_diversion: form.contact_diversion.value,
            tel_diversion: form.tel_diversion.value
        };

        await fetch(`/api/diversion/${entertainment.id_diversion}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedEntertainment)
        });

        //loadEntertainmentPage();
    });

    form.appendChild(submitButton);

    main.appendChild(h1);
    main.appendChild(form);

    return main;
}

async function loadEditEntertainmentPage(id) {
    const response = await fetch(`/api/diversion/${id}`);
    const entertainment = await response.json();
    const container = document.getElementById('page-content');
    container.innerHTML = '';
    container.appendChild(createEditEntertainmentPage(entertainment));
}

export default loadEditEntertainmentPage;
