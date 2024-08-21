import loadDinnerwarePage from './dinnerware.js';

function createAddDinnerwarePage() {
    const main = document.createElement('main');
    main.classList.add('add-dinnerware-main');

    const h1 = document.createElement('h1');
    h1.textContent = 'Agregar Loza';

    const form = document.createElement('form');
    form.classList.add('add-dinnerware-form');

    const fields = [
        { label: 'Tipo', type: 'text', name: 'tipo_loza' },
        { label: 'Descripción', type: 'text', name: 'descrip_loza' },
        { label: 'Precio', type: 'number', name: 'precio_loza' },
        { label: 'Contacto', type: 'text', name: 'contact_loza' },
        { label: 'Teléfono', type: 'text', name: 'tel_loza' },
        { label: 'Imagen', type: 'file', name: 'img_loza' }
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
    submitButton.textContent = 'Agregar Loza';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('tipo_loza', form.tipo_loza.value);
        formData.append('descrip_loza', form.descrip_loza.value);
        formData.append('precio_loza', form.precio_loza.value);
        formData.append('contact_loza', form.contact_loza.value);
        formData.append('tel_loza', form.tel_loza.value);
        formData.append('img_loza', form.img_loza.files[0]);

        await fetch('/api/loza', {
            method: 'POST',
            body: formData
        });

        //loadDinnerwarePage(); // Reload the page after adding
    });

    form.appendChild(submitButton);

    main.appendChild(h1);
    main.appendChild(form);

    return main;
}

function loadAddDinnerwarePage() {
    const container = document.getElementById('page-content');
    container.innerHTML = '';
    container.appendChild(createAddDinnerwarePage());
}

export default loadAddDinnerwarePage;
