function createEditExtraPage(extra) {
    const main = document.createElement('main');
    main.classList.add('edit-extra-main');

    const h1 = document.createElement('h1');
    h1.textContent = 'Modificar Extra';

    const form = document.createElement('form');
    form.classList.add('edit-extra-form');

    const fields = [
        { label: 'Tipo', type: 'text', name: 'tipo_extra', value: extra.tipo_extra },
        { label: 'Descripción', type: 'text', name: 'descrip_extra', value: extra.descrip_extra },
        { label: 'Precio', type: 'number', name: 'precio_extra', value: extra.precio_extra },
        { label: 'Contacto', type: 'text', name: 'contact_extra', value: extra.contact_extra },
        { label: 'Teléfono', type: 'tel', name: 'tel_extra', value: extra.tel_extra },
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
    submitButton.textContent = 'Modificar Extra';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const updatedExtra = {
            tipo_extra: form.tipo_extra.value,
            descrip_extra: form.descrip_extra.value,
            precio_extra: form.precio_extra.value,
            contact_extra: form.contact_extra.value,
            tel_extra: form.tel_extra.value
        };

        await fetch(`/api/extras/${extra.id_extra}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedExtra)
        });

        loadExtrasPage();
    });

    form.appendChild(submitButton);

    main.appendChild(h1);
    main.appendChild(form);

    return main;
}

async function loadEditExtraPage(id) {
    const response = await fetch(`/api/extras/${id}`);
    const extra = await response.json();
    const container = document.getElementById('page-content');
    container.innerHTML = '';
    container.appendChild(createEditExtraPage(extra));

}
export default loadEditExtraPage;
