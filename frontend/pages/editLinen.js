import loadLinensPage from './linens.js';

function createEditLinenPage(linen) {
    const main = document.createElement('main');
    main.classList.add('edit-linen-main');

    const h1 = document.createElement('h1');
    h1.textContent = 'Modificar Mantel';

    const form = document.createElement('form');
    form.classList.add('edit-linen-form');

    const fields = [
        { label: 'Tipo', type: 'text', name: 'tipo_mantel', value: linen.tipo_mantel },
        { label: 'Descripción', type: 'text', name: 'descrip_mantel', value: linen.descrip_mantel },
        { label: 'Precio', type: 'number', name: 'precio_mantel', value: linen.precio_mantel },
        { label: 'Contacto', type: 'text', name: 'contact_mantel', value: linen.contact_mantel },
        { label: 'Teléfono', type: 'text', name: 'tel_mantel', value: linen.tel_mantel },
        { label: 'Imagen', type: 'file', name: 'img_mantel' }
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
    submitButton.textContent = 'Modificar Mantel';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('tipo_mantel', form.tipo_mantel.value);
        formData.append('descrip_mantel', form.descrip_mantel.value);
        formData.append('precio_mantel', form.precio_mantel.value);
        formData.append('contact_mantel', form.contact_mantel.value);
        formData.append('tel_mantel', form.tel_mantel.value);
        if (form.img_mantel.files[0]) {
            formData.append('img_mantel', form.img_mantel.files[0]);
        }

        await fetch(`/api/manteleria/${linen.id_mantel}`, {
            method: 'PUT',
            body: formData
        });

        //loadLinensPage(); // Reload the page after updating
    });

    form.appendChild(submitButton);

    main.appendChild(h1);
    main.appendChild(form);

    return main;
}

//Archivo Editar
async function loadEditLinenPage(id) {
    const response = await fetch(`/api/manteleria/${id}`);
    const linen = await response.json();
    const container = document.getElementById('page-content');
    container.innerHTML = '';
    container.appendChild(createEditLinenPage(linen));
}

export default loadEditLinenPage;
