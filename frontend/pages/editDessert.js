function createEditDessertPage(dessert) {
    const main = document.createElement('main');
    main.classList.add('edit-dessert-main');

    const h1 = document.createElement('h1');
    h1.textContent = 'Modificar Postre';

    const form = document.createElement('form');
    form.classList.add('edit-dessert-form');

    const fields = [
        { label: 'Tipo', type: 'text', name: 'tipo_postre', value: dessert.tipo_postre },
        { label: 'Descripción', type: 'text', name: 'descrip_postre', value: dessert.descrip_postre },
        { label: 'Precio', type: 'number', name: 'precio_postre', value: dessert.precio_postre },
        { label: 'Contacto', type: 'text', name: 'contact_postre', value: dessert.contact_postre },
        { label: 'Teléfono', type: 'tel', name: 'tel_postre', value: dessert.tel_postre },
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
    submitButton.textContent = 'Modificar Postre';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const updatedDessert = {
            tipo_postre: form.tipo_postre.value,
            descrip_postre: form.descrip_postre.value,
            precio_postre: form.precio_postre.value,
            contact_postre: form.contact_postre.value,
            tel_postre: form.tel_postre.value
        };

        await fetch(`/api/postres/${dessert.id_postre}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedDessert)
        });

        //loadDessertsPage();
    });

    form.appendChild(submitButton);

    main.appendChild(h1);
    main.appendChild(form);

    return main;
}

async function loadEditDessertPage(id) {
    const response = await fetch(`/api/postres/${id}`);
    const dessert = await response.json();
    const container = document.getElementById('page-content');
    container.innerHTML = '';
    container.appendChild(createEditDessertPage(dessert));
}

export default loadEditDessertPage;
