import loadLinensPage from './linens.js';

function createAddLinenPage() {
    const main = document.createElement('main');
    main.classList.add('add-linen-main');

    const h1 = document.createElement('h1');
    h1.textContent = 'Agregar Mantel';

    const form = document.createElement('form');
    form.classList.add('add-linen-form');

    const fields = [
        { label: 'Tipo', type: 'text', name: 'tipo_mantel' },
        { label: 'Descripción', type: 'text', name: 'descrip_mantel' },
        { label: 'Precio', type: 'number', name: 'precio_mantel' },
        { label: 'Contacto', type: 'text', name: 'contact_mantel' },
        { label: 'Teléfono', type: 'text', name: 'tel_mantel' },
        { label: 'Imagen', type: 'file', name: 'img_mantel' }
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
    submitButton.textContent = 'Agregar Mantel';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('tipo_mantel', form.tipo_mantel.value);
        formData.append('descrip_mantel', form.descrip_mantel.value);
        formData.append('precio_mantel', form.precio_mantel.value);
        formData.append('contact_mantel', form.contact_mantel.value);
        formData.append('tel_mantel', form.tel_mantel.value);
        formData.append('img_mantel', form.img_mantel.files[0]);

        await fetch('/api/manteleria', {
            method: 'POST',
            body: formData
        });

        //loadLinensPage(); // Reload the page after adding
    });

    form.appendChild(submitButton);

    main.appendChild(h1);
    main.appendChild(form);

    return main;
}

function loadAddLinenPage() {
    const container = document.getElementById('page-content');
    container.innerHTML = '';
    container.appendChild(createAddLinenPage());
}

export default loadAddLinenPage;
