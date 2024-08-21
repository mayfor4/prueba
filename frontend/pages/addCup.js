import loadCupsPage from './cups.js';

function createAddCupPage() {
    const main = document.createElement('main');
    main.classList.add('add-cup-main');

    const h1 = document.createElement('h1');
    h1.textContent = 'Agregar Copas';

    const form = document.createElement('form');
    form.classList.add('add-cup-form');

    const fields = [
        { label: 'Tipo', type: 'text', name: 'tipo_copa' },
        { label: 'Descripción', type: 'text', name: 'descrip_copa' },
        { label: 'Precio', type: 'number', name: 'precio_copa' },
        { label: 'Contacto', type: 'text', name: 'contact_copa' },
        { label: 'Teléfono', type: 'text', name: 'tel_copa' },
        { label: 'Imagen', type: 'file', name: 'img_copa' }
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
    submitButton.textContent = 'Agregar Copas';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('tipo_copa', form.tipo_copa.value);
        formData.append('descrip_copa', form.descrip_copa.value);
        formData.append('precio_copa', form.precio_copa.value);
        formData.append('contact_copa', form.contact_copa.value);
        formData.append('tel_copa', form.tel_copa.value);
        formData.append('img_copa', form.img_copa.files[0]);

        await fetch('/api/copas', {
            method: 'POST',
            body: formData
        });

        //loadCupsPage(); // Reload the page after adding
    });

    form.appendChild(submitButton);

    main.appendChild(h1);
    main.appendChild(form);

    return main;
}

function loadAddCupPage() {
    const container = document.getElementById('page-content');
    container.innerHTML = '';
    container.appendChild(createAddCupPage());
}

export default loadAddCupPage;
