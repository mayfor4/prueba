import loadCenterpiecesPage from './centerpieces.js';

function createAddCenterpiecePage() {
    const main = document.createElement('main');
    main.classList.add('add-centerpiece-main');

    const h1 = document.createElement('h1');
    h1.textContent = 'Agregar Centro de Mesa';

    const form = document.createElement('form');
    form.classList.add('add-centerpiece-form');

    const fields = [
        { label: 'Tipo', type: 'text', name: 'tipo_cm' },
        { label: 'Descripción', type: 'text', name: 'descrip_cm' },
        { label: 'Precio', type: 'number', name: 'precio_cm' },
        { label: 'Contacto', type: 'text', name: 'contact_cm' },
        { label: 'Teléfono', type: 'text', name: 'tel_cm' },
        { label: 'Imagen', type: 'file', name: 'img_cm' }
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
    submitButton.textContent = 'Agregar Centro de Mesa';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

    const formData = new FormData();
    formData.append('tipo_cm', form.tipo_cm.value);
    formData.append('descrip_cm', form.descrip_cm.value);
    formData.append('precio_cm', form.precio_cm.value);
    formData.append('contact_cm', form.contact_cm.value);
    formData.append('tel_cm', form.tel_cm.value);
    formData.append('img_cm', form.img_cm.files[0]);

    await fetch('/api/centros-de-mesa', {
        method: 'POST',
        body: formData
    });

    //loadCenterpiecesPage(); // Reload the page after adding
});

form.appendChild(submitButton);

main.appendChild(h1);
main.appendChild(form);

return main;

}

function loadAddCenterpiecePage() {
const container = document.getElementById('page-content');
container.innerHTML = '';
container.appendChild(createAddCenterpiecePage());
}

export default loadAddCenterpiecePage;
