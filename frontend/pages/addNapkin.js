import loadNapkinsPage from './napkins.js';

function createAddNapkinPage() {
    const main = document.createElement('main');
    main.classList.add('add-napkin-main');

    const h1 = document.createElement('h1');
    h1.textContent = 'Agregar Servilleta';

    const form = document.createElement('form');
    form.classList.add('add-napkin-form');

    const fields = [
        { label: 'Tipo', type: 'text', name: 'tipo_servilleta' },
        { label: 'Descripción', type: 'text', name: 'descrip_servilleta' },
        { label: 'Precio', type: 'number', name: 'precio_servilleta' },
        { label: 'Contacto', type: 'text', name: 'contact_servilleta' },
        { label: 'Teléfono', type: 'text', name: 'tel_servilleta' },
        { label: 'Imagen', type: 'file', name: 'img_servilleta' }
    ];

    fields.forEach(field => {
        const label = document.createElement('label');
        label.textContent = field.label;
        const input = document.createElement('input');
        input.type = field.type;
        input.name = field.name;
        form.appendChild(label);
        form.appendChild(input);
    });

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Agregar Servilleta';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('tipo_servilleta', form.tipo_servilleta.value);
        formData.append('descrip_servilleta', form.descrip_servilleta.value);
        formData.append('precio_servilleta', form.precio_servilleta.value);
        formData.append('contact_servilleta', form.contact_servilleta.value);
        formData.append('tel_servilleta', form.tel_servilleta.value);
        formData.append('img_servilleta', form.img_servilleta.files[0]);

        await fetch('/api/napkins', {
            method: 'POST',
            body: formData
        });

        //loadNapkinsPage(); // Reload the page after adding
    });

    form.appendChild(submitButton);

    main.appendChild(h1);
    main.appendChild(form);

    return main;
}

function loadAddNapkinPage() {
    const container = document.getElementById('page-content');
    container.innerHTML = '';
    container.appendChild(createAddNapkinPage());
}

export default loadAddNapkinPage;
