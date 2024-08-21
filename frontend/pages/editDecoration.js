import loadDecorationsPage from './decorations.js';

function createEditDecorationPage(decoration) {
    const main = document.createElement('main');
    main.classList.add('edit-decoration-main');

    const h1 = document.createElement('h1');
    h1.textContent = 'Modificar Decoración';

    const form = document.createElement('form');
    form.classList.add('edit-decoration-form');

    const fields = [
        { label: 'Tipo', type: 'text', name: 'tipo_dec', value: decoration.tipo_dec },
        { label: 'Descripción', type: 'text', name: 'decrip_dec', value: decoration.decrip_dec },
        { label: 'Precio', type: 'number', name: 'precio_dec', value: decoration.precio_dec },
        { label: 'Contacto', type: 'text', name: 'contact_dec', value: decoration.contact_dec },
        { label: 'Teléfono', type: 'text', name: 'tel_dec', value: decoration.tel_dec },
        { label: 'Imagen', type: 'file', name: 'img_dec' }
    ];

    fields.forEach(field => {
        const label = document.createElement('label');
        label.textContent = field.label;
        const input = document.createElement('input');
        input.type = field.type;
        input.name = field.name;
        if (field.value) {
            input.value = field.value;
        }
        form.appendChild(label);
        form.appendChild(input);
    });

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Modificar Decoración';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('tipo_dec', form.tipo_dec.value);
        formData.append('decrip_dec', form.decrip_dec.value);
        formData.append('precio_dec', form.precio_dec.value);
        formData.append('contact_dec', form.contact_dec.value);
        formData.append('tel_dec', form.tel_dec.value);
        if (form.img_dec.files[0]) {
            formData.append('img_dec', form.img_dec.files[0]);
        }

        await fetch(`/api/decoraciones/${decoration.id_dec}`, {
            method: 'PUT',
            body: formData
        });

        //loadDecorationsPage(); // Reload the page after updating
    });

    form.appendChild(submitButton);

    main.appendChild(h1);
    main.appendChild(form);

    return main;
}

//Archivo Editar
async function loadEditDecorationPage(id) {
    const response = await fetch(`/api/decoraciones/${id}`);
    const decoration = await response.json();
    const container = document.getElementById('page-content');
    container.innerHTML = '';
    container.appendChild(createEditDecorationPage(decoration));

}

export default loadEditDecorationPage;
