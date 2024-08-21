import loadNapkinsPage from './napkins.js';

function createEditNapkinPage(napkin) {
    const main = document.createElement('main');
    main.classList.add('edit-napkin-main');

    const h1 = document.createElement('h1');
    h1.textContent = 'Modificar Servilleta';

    const form = document.createElement('form');
    form.classList.add('edit-napkin-form');

    const fields = [
        { label: 'Tipo', type: 'text', name: 'tipo_servilleta', value: napkin.tipo_servilleta },
        { label: 'Descripción', type: 'text', name: 'descrip_servilleta', value: napkin.descrip_servilleta },
        { label: 'Precio', type: 'number', name: 'precio_servilleta', value: napkin.precio_servilleta },
        { label: 'Contacto', type: 'text', name: 'contact_servilleta', value: napkin.contact_servilleta },
        { label: 'Teléfono', type: 'text', name: 'tel_servilleta', value: napkin.tel_servilleta },
        { label: 'Imagen', type: 'file', name: 'img_servilleta' }
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
    submitButton.textContent = 'Modificar Servilleta';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('tipo_servilleta', form.tipo_servilleta.value);
        formData.append('descrip_servilleta', form.descrip_servilleta.value);
        formData.append('precio_servilleta', form.precio_servilleta.value);
        formData.append('contact_servilleta', form.contact_servilleta.value);
        formData.append('tel_servilleta', form.tel_servilleta.value);
        if (form.img_servilleta.files[0]) {
            formData.append('img_servilleta', form.img_servilleta.files[0]);
        }

        await fetch(`/api/napkins/${napkin.id_servilleta}`, {
            method: 'PUT',
            body: formData
        });

       // loadNapkinsPage(); // Reload the page after updating
    });

    form.appendChild(submitButton);

    main.appendChild(h1);
    main.appendChild(form);

    return main;
}

async function loadEditNapkinPage(id) {
    const response = await fetch(`/api/napkins/${id}`);
    const napkin = await response.json();
    const container = document.getElementById('page-content');
    container.innerHTML = '';
    container.appendChild(createEditNapkinPage(napkin));
}

export default loadEditNapkinPage;
