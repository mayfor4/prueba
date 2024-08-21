function createAddPhotoPage() {
    const main = document.createElement('main');
    main.classList.add('add-photo-main');

    const h1 = document.createElement('h1');
    h1.textContent = 'Agregar Foto';

    const form = document.createElement('form');
    form.classList.add('add-photo-form');

    const fields = [
        { label: 'Tipo de Foto', type: 'text', name: 'tipo_foto' },
        { label: 'Descripción', type: 'text', name: 'descrip_foto' },
        { label: 'Precio', type: 'number', name: 'precio_foto' },
        { label: 'Contacto', type: 'text', name: 'contact_foto' },
        { label: 'Teléfono', type: 'tel', name: 'tel_foto' },
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
    submitButton.textContent = 'Agregar Foto';

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        fetch('/api/fotos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al agregar la foto');
            }
            return response.json();
        })
        .then(data => {
            alert(data.message);
            loadPhotosPage();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un problema al agregar la foto');
        });
    });

    form.appendChild(submitButton);

    main.appendChild(h1);
    main.appendChild(form);

    return main;
}

function loadAddPhotoPage() {
    const container = document.getElementById('page-content');
    container.innerHTML = '';
    container.appendChild(createAddPhotoPage());
}

export default loadAddPhotoPage;
