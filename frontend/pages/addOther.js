import loadOthersPage from './others.js';

function createAddOtherPage() {
    const main = document.createElement('main');
    main.classList.add('add-other-main');

    const h1 = document.createElement('h1');
    h1.textContent = 'Agregar Otro';

    const form = document.createElement('form');
    form.classList.add('add-other-form');

    const fields = [
        { label: 'Tipo', type: 'text', name: 'tipo_otro' },
        { label: 'Descripción', type: 'text', name: 'descrip_otro' },
        { label: 'Precio', type: 'number', name: 'precio_otro' },
        { label: 'Contacto', type: 'text', name: 'contact_otro' },
        { label: 'Teléfono', type: 'text', name: 'tel_otro' },
        { label: 'Imagen', type: 'file', name: 'img_otro' }
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
    submitButton.textContent = 'Agregar Otro';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('tipo_otro', form.tipo_otro.value);
        formData.append('descrip_otro', form.descrip_otro.value);
        formData.append('precio_otro', form.precio_otro.value);
        formData.append('contact_otro', form.contact_otro.value);
        formData.append('tel_otro', form.tel_otro.value);
        formData.append('img_otro', form.img_otro.files[0]);

        await fetch('/api/otros', {
            method: 'POST',
            body: formData
        });

        //loadOthersPage(); // Reload the page after adding
    });

    form.appendChild(submitButton);

    main.appendChild(h1);
    main.appendChild(form);

    return main;
}

function loadAddOtherPage() {
    const container = document.getElementById('page-content');
    container.innerHTML = '';
    container.appendChild(createAddOtherPage());
}

export default loadAddOtherPage;
