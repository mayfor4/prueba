import loadChairsPage from './chairs.js';

function createEditChairPage(chair) {
    const main = document.createElement('main');
    main.classList.add('edit-chair-main');

    const h1 = document.createElement('h1');
    h1.textContent = 'Modificar Silla';

    const form = document.createElement('form');
    form.classList.add('edit-chair-form');

    const fields = [
        { label: 'Tipo', type: 'text', name: 'tipo_silla', value: chair.tipo_silla },
        { label: 'Descripción', type: 'text', name: 'descrip_silla', value: chair.descrip_silla },
        { label: 'Precio', type: 'number', name: 'precio_silla', value: chair.precio_silla },
        { label: 'Contacto', type: 'text', name: 'contact_silla', value: chair.contact_silla },
        { label: 'Teléfono', type: 'text', name: 'tel_silla', value: chair.tel_silla },
        { label: 'Imagen', type: 'file', name: 'img_silla' }
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
    submitButton.textContent = 'Modificar Silla';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('tipo_silla', form.tipo_silla.value);
        formData.append('descrip_silla', form.descrip_silla.value);
        formData.append('precio_silla', form.precio_silla.value);
        formData.append('contact_silla', form.contact_silla.value);
        formData.append('tel_silla', form.tel_silla.value);
        if (form.img_silla.files[0]) {
            formData.append('img_silla', form.img_silla.files[0]);
        }

        await fetch(`/api/sillas/${chair.id_silla}`, {
            method: 'PUT',
            body: formData
        });

        //loadChairsPage(); // Reload the page after updating
    });

    form.appendChild(submitButton);

    main.appendChild(h1);
    main.appendChild(form);

    return main;
}

//Archivo Editar
async function  loadEditChairPage(id) {
    const response = await fetch(`/api/sillas/${id}`);
    const chair = await response.json();
    const container = document.getElementById('page-content');
    container.innerHTML = '';
    container.appendChild(createEditChairPage(chair));
}

export default loadEditChairPage;
