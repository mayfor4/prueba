import loadDecorationsPage from './decorations.js';

function createAddDecorationPage() {
    const main = document.createElement('main');
    main.classList.add('add-decoration-main');

    const h1 = document.createElement('h1');
    h1.textContent = 'Agregar Decoración';

    const form = document.createElement('form');
    form.classList.add('add-decoration-form');

    const fields = [
        { label: 'Tipo', type: 'text', name: 'tipo_dec' },
        { label: 'Descripción', type: 'text', name: 'decrip_dec' },
        { label: 'Precio', type: 'number', name: 'precio_dec' },
        { label: 'Contacto', type: 'text', name: 'contact_dec' },
        { label: 'Teléfono', type: 'text', name: 'tel_dec' },
        { label: 'Imagen', type: 'file', name: 'img_dec' }
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
    submitButton.textContent = 'Agregar Decoración';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('tipo_dec', form.tipo_dec.value);
        formData.append('decrip_dec', form.decrip_dec.value);
        formData.append('precio_dec', form.precio_dec.value);
        formData.append('contact_dec', form.contact_dec.value);
        formData.append('tel_dec', form.tel_dec.value);
        formData.append('img_dec', form.img_dec.files[0]);

        await fetch('/api/decoraciones', {
            method: 'POST',
            body: formData
        });

       // loadDecorationsPage(); // Reload the page after adding
    });

    form.appendChild(submitButton);

    main.appendChild(h1);
    main.appendChild(form);

    return main;
}

function loadAddDecorationPage() {
    const container = document.getElementById('page-content');
    container.innerHTML = '';
    container.appendChild(createAddDecorationPage());
}

export default loadAddDecorationPage;
