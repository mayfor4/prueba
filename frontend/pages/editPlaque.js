import loadPlaquesPage from './plaque.js';

function createEditPlaquePage(plaque) {
    const main = document.createElement('main');
    main.classList.add('edit-plaque-main');

    const h1 = document.createElement('h1');
    h1.textContent = 'Modificar Placa';

    const form = document.createElement('form');
    form.classList.add('edit-plaque-form');

    const fields = [
        { label: 'Tipo', type: 'text', name: 'tipo_plaque', value: plaque.tipo_plaque },
        { label: 'Descripción', type: 'text', name: 'descrip_plaque', value: plaque.descrip_plaque },
        { label: 'Precio', type: 'number', name: 'precio_plaque', value: plaque.precio_plaque },
        { label: 'Contacto', type: 'text', name: 'contact_plaque', value: plaque.contact_plaque },
        { label: 'Teléfono', type: 'text', name: 'tel_plaque', value: plaque.tel_plaque },
        { label: 'Imagen', type: 'file', name: 'img_plaque' }
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
    submitButton.textContent = 'Modificar Placa';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('tipo_plaque', form.tipo_plaque.value);
        formData.append('descrip_plaque', form.descrip_plaque.value);
        formData.append('precio_plaque', form.precio_plaque.value);
        formData.append('contact_plaque', form.contact_plaque.value);
        formData.append('tel_plaque', form.tel_plaque.value);
        if (form.img_plaque.files[0]) {
            formData.append('img_plaque', form.img_plaque.files[0]);
        }

        await fetch(`/api/plaques/${plaque.id_plaque}`, {
            method: 'PUT',
            body: formData
        });

        //loadPlaquesPage(); // Reload the page after updating
    });

    form.appendChild(submitButton);

    main.appendChild(h1);
    main.appendChild(form);

    return main;
}

async function loadEditPlaquePage(id) {
    const response = await fetch(`/api/plaques/${id}`);
    const plaque = await response.json();
    const container = document.getElementById('page-content');
    container.innerHTML = '';
    container.appendChild(createEditPlaquePage(plaque));
}

export default loadEditPlaquePage;
