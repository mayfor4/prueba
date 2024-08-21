import loadGlassesPage from './glasses.js';

function createEditGlassesPage(glass) {
    const main = document.createElement('main');
    main.classList.add('edit-glasses-main');

    const h1 = document.createElement('h1');
    h1.textContent = 'Modificar Vaso';

    const form = document.createElement('form');
    form.classList.add('edit-glasses-form');

    const fields = [
        { label: 'Tipo', type: 'text', name: 'tipo_vaso', value: glass.tipo_vaso },
        { label: 'Descripción', type: 'text', name: 'descrip_vaso', value: glass.descrip_vaso },
        { label: 'Precio', type: 'number', name: 'precio_vaso', value: glass.precio_vaso },
        { label: 'Contacto', type: 'text', name: 'contact_vaso', value: glass.contact_vaso },
        { label: 'Teléfono', type: 'text', name: 'tel_vaso', value: glass.tel_vaso },
        { label: 'Imagen', type: 'file', name: 'img_vaso' }
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
    submitButton.textContent = 'Modificar Vaso';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('tipo_vaso', form.tipo_vaso.value);
        formData.append('descrip_vaso', form.descrip_vaso.value);
        formData.append('precio_vaso', form.precio_vaso.value);
        formData.append('contact_vaso', form.contact_vaso.value);
        formData.append('tel_vaso', form.tel_vaso.value);
        if (form.img_vaso.files[0]) {
            formData.append('img_vaso', form.img_vaso.files[0]);
        }

        await fetch(`/api/vasos/${glass.id_vaso}`, {
            method: 'PUT',
            body: formData
        });

        //loadGlassesPage(); // Reload the page after updating
    });

    form.appendChild(submitButton);

    main.appendChild(h1);
    main.appendChild(form);

    return main;
}

async function loadEditGlassesPage(id) {
    const response = await fetch(`/api/vasos/${id}`);
    const glass = await response.json();
    const container = document.getElementById('page-content');
    container.innerHTML = '';
    container.appendChild(createEditGlassesPage(glass));
}

export default loadEditGlassesPage;
