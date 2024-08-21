import loadGlassesPage from './glasses.js';

function createAddGlassesPage() {
    const main = document.createElement('main');
    main.classList.add('add-glasses-main');

    const h1 = document.createElement('h1');
    h1.textContent = 'Agregar Vaso';

    const form = document.createElement('form');
    form.classList.add('add-glasses-form');

    const fields = [
        { label: 'Tipo', type: 'text', name: 'tipo_vaso' },
        { label: 'Descripción', type: 'text', name: 'descrip_vaso' },
        { label: 'Precio', type: 'number', name: 'precio_vaso' },
        { label: 'Contacto', type: 'text', name: 'contact_vaso' },
        { label: 'Teléfono', type: 'text', name: 'tel_vaso' },
        { label: 'Imagen', type: 'file', name: 'img_vaso' }
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
    submitButton.textContent = 'Agregar Vaso';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('tipo_vaso', form.tipo_vaso.value);
        formData.append('descrip_vaso', form.descrip_vaso.value);
        formData.append('precio_vaso', form.precio_vaso.value);
        formData.append('contact_vaso', form.contact_vaso.value);
        formData.append('tel_vaso', form.tel_vaso.value);
        formData.append('img_vaso', form.img_vaso.files[0]);

        await fetch('/api/vasos', {
            method: 'POST',
            body: formData
        });

        //loadGlassesPage(); // Reload the page after adding
    });

    form.appendChild(submitButton);

    main.appendChild(h1);
    main.appendChild(form);

    return main;
}

function loadAddGlassesPage() {
    const container = document.getElementById('page-content');
    container.innerHTML = '';
    container.appendChild(createAddGlassesPage());
}

export default loadAddGlassesPage;
