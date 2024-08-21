import loadDinnerwarePage from './dinnerware.js';

function createEditDinnerwarePage(dinnerware) {
    const main = document.createElement('main');
    main.classList.add('edit-dinnerware-main');

    const h1 = document.createElement('h1');
    h1.textContent = 'Modificar Loza';

    const form = document.createElement('form');
    form.classList.add('edit-dinnerware-form');

    const fields = [
        { label: 'Tipo', type: 'text', name: 'tipo_loza', value: dinnerware.tipo_loza },
        { label: 'Descripción', type: 'text', name: 'descrip_loza', value: dinnerware.descrip_loza },
        { label: 'Precio', type: 'number', name: 'precio_loza', value: dinnerware.precio_loza },
        { label: 'Contacto', type: 'text', name: 'contact_loza', value: dinnerware.contact_loza },
        { label: 'Teléfono', type: 'text', name: 'tel_loza', value: dinnerware.tel_loza },
        { label: 'Imagen', type: 'file', name: 'img_loza' }
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
    submitButton.textContent = 'Modificar Loza';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('tipo_loza', form.tipo_loza.value);
        formData.append('descrip_loza', form.descrip_loza.value);
        formData.append('precio_loza', form.precio_loza.value);
        formData.append('contact_loza', form.contact_loza.value);
        formData.append('tel_loza', form.tel_loza.value);
        if (form.img_loza.files[0]) {
            formData.append('img_loza', form.img_loza.files[0]);
        }

        await fetch(`/api/loza/${dinnerware.id_loza}`, {
            method: 'PUT',
            body: formData
        });

        //loadDinnerwarePage(); // Reload the page after updating
    });

    form.appendChild(submitButton);

    main.appendChild(h1);
    main.appendChild(form);

    return main;
}

async function loadEditDinnerwarePage(id) {
    const response = await fetch(`/api/loza/${id}`);
    const dinnerware = await response.json();
    const container = document.getElementById('page-content');
    container.innerHTML = '';
    container.appendChild(createEditDinnerwarePage(dinnerware));
}

export default loadEditDinnerwarePage;
