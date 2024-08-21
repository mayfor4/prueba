function createAddProviderPage() {
    const main = document.createElement('main');
    main.classList.add('add-provider-main');

    const h1 = document.createElement('h1');
    h1.textContent = 'Agregar Proveedor';

    const form = document.createElement('form');
    form.classList.add('add-provider-form');

    const fields = [
        { label: 'Nombre del Proveedor', type: 'text', name: 'nombre_prov' },
        { label: 'Tipo de Proveedor', type: 'text', name: 'tipo_prov' },
        { label: 'Descripción del Proveedor', type: 'text', name: 'descrip_prov' },
        { label: 'Teléfono del Proveedor', type: 'tel', name: 'tel_prov' },
        { label: 'Zona del Proveedor', type: 'text', name: 'zona_prov' },
        { label: 'Precio del Proveedor', type: 'number', name: 'precio_prov' },
        { label: 'Calificación del Proveedor', type: 'number', name: 'calif_prov' },
        { label: 'Comentario del Proveedor', type: 'text', name: 'comment_prov' },
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
    submitButton.textContent = 'Agregar Proveedor';

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        fetch('/api/proveedores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al agregar el proveedor');
            }
            return response.json();
        })
        .then(data => {
            alert(data.message);
            loadProvidersPage(); // Volver a la página de proveedores después de agregar uno nuevo
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un problema al agregar el proveedor');
        });
    });

    form.appendChild(submitButton);

    main.appendChild(h1);
    main.appendChild(form);

    return main;
}

function loadAddProviderPage() {
    const container = document.getElementById('page-content');
    container.innerHTML = '';
    container.appendChild(createAddProviderPage());
}

export default loadAddProviderPage;
