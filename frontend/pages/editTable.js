import loadTablesPage from './tables.js';

function createEditTablePage(table) {
    const main = document.createElement('main');
    main.classList.add('edit-table-main');

    const h1 = document.createElement('h1');
    h1.textContent = 'Modificar Mesa';

    const form = document.createElement('form');
    form.classList.add('edit-table-form');

    const fields = [
        { label: 'Tipo', type: 'text', name: 'tipo_mesa', value: table.tipo_mesa },
        { label: 'Descripción', type: 'text', name: 'descrip_mesa', value: table.descrip_mesa },
        { label: 'Precio', type: 'number', name: 'precio_mesa', value: table.precio_mesa },
        { label: 'Contacto', type: 'text', name: 'contact_mesa', value: table.contact_mesa },
        { label: 'Teléfono', type: 'text', name: 'tel_mesa', value: table.tel_mesa },
        { label: 'Imagen', type: 'file', name: 'img_mesa' }
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
    submitButton.textContent = 'Modificar Mesa';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('tipo_mesa', form.tipo_mesa.value);
        formData.append('descrip_mesa', form.descrip_mesa.value);
        formData.append('precio_mesa', form.precio_mesa.value);
        formData.append('contact_mesa', form.contact_mesa.value);
        formData.append('tel_mesa', form.tel_mesa.value);
        if (form.img_mesa.files[0]) {
            formData.append('img_mesa', form.img_mesa.files[0]);
        }

        await fetch(`/api/mesas/${table.id_mesa}`, {
            method: 'PUT',
            body: formData
        });

        loadTablesPage(); // Reload the page after updating
    });

    form.appendChild(submitButton);

    main.appendChild(h1);
    main.appendChild(form);

    return main;
}



async function loadEditTablePage(id) {
    const response = await fetch(`/api/mesas/${id}`);
    const table = await response.json();
    const container = document.getElementById('page-content');
    container.innerHTML = '';
    container.appendChild(createEditTablePage(table));
}

export default loadEditTablePage;
