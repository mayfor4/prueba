import loadOthersPage from './others.js';

function createEditOtherPage(other) {
    const main = document.createElement('main');
    main.classList.add('edit-other-main');

    const h1 = document.createElement('h1');
    h1.textContent = 'Modificar Otro';

    const form = document.createElement('form');
    form.classList.add('edit-other-form');

    const fields = [
        { label: 'Tipo', type: 'text', name: 'tipo_otro', value: other.tipo_otro },
        { label: 'Descripción', type: 'text', name: 'descrip_otro', value: other.descrip_otro },
        { label: 'Precio', type: 'number', name: 'precio_otro', value: other.precio_otro },
        { label: 'Contacto', type: 'text', name: 'contact_otro', value: other.contact_otro },
        { label: 'Teléfono', type: 'text', name: 'tel_otro', value: other.tel_otro },
        { label: 'Imagen', type: 'file', name: 'img_otro' }
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
    submitButton.textContent = 'Modificar Otro';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('tipo_otro', form.tipo_otro.value);
        formData.append('descrip_otro', form.descrip_otro.value);
        formData.append('precio_otro', form.precio_otro.value);
        formData.append('contact_otro', form.contact_otro.value);
        formData.append('tel_otro', form.tel_otro.value);
        if (form.img_otro.files[0]) {
            formData.append('img_otro', form.img_otro.files[0]);
        }

        await fetch(`/api/otros/${other.id_otro}`, {
            method: 'PUT',
            body: formData
        });

        loadOthersPage(); // Reload the page after updating
    });

    form.appendChild(submitButton);

    main.appendChild(h1);
    main.appendChild(form);

    return main;
}

//Archivo Editar
async function loadEditOtherPage(id) {
    const response = await fetch(`/api/otros/${id}`);
    const other = await response.json();
    const container = document.getElementById('page-content');
    container.innerHTML = '';
    container.appendChild(createEditOtherPage(other));
}

export default loadEditOtherPage;
