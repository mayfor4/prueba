function createEditProviderPage(provider) {
    const main = document.createElement('main');
    main.classList.add('edit-provider-main');

    const h1 = document.createElement('h1');
    h1.textContent = 'Modificar Proveedor';

    const form = document.createElement('form');
    form.classList.add('edit-provider-form');

    const fields = [
        { label: 'Nombre', type: 'text', name: 'nombre_prov', value: provider.nombre_prov },
        { label: 'Tipo', type: 'text', name: 'tipo_prov', value: provider.tipo_prov },
        { label: 'Descripción', type: 'text', name: 'descrip_prov', value: provider.descrip_prov },
        { label: 'Teléfono', type: 'tel', name: 'tel_prov', value: provider.tel_prov },
        { label: 'Zona', type: 'text', name: 'zona_prov', value: provider.zona_prov },
        { label: 'Precio', type: 'number', name: 'precio_prov', value: provider.precio_prov },
        { label: 'Calificación', type: 'number', name: 'calif_prov', value: provider.calif_prov },
        { label: 'Comentarios', type: 'text', name: 'comment_prov', value: provider.comment_prov },
    ];

    fields.forEach(field => {
        const label = document.createElement('label');
        label.textContent = field.label;
        const input = document.createElement('input');
        input.type = field.type;
        input.name = field.name;
        input.value = field.value;
        form.appendChild(label);
        form.appendChild(input);
    });

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Modificar Proveedor';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const updatedProvider = {
            nombre_prov: form.nombre_prov.value,
            tipo_prov: form.tipo_prov.value,
            tel_prov: form.tel_prov.value,
            zona_prov: form.zona_prov.value,
            precio_prov: form.precio_prov.value,
            calif_prov: form.calif_prov.value,
            comment_prov: form.comment_prov.value,
            descrip_prov: form.descrip_prov.value
        };

        await fetch(`/api/proveedores/${provider.id_prov}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedProvider)
        });

        loadProvidersPage(); // Reload the page after updating
    });

    form.appendChild(submitButton);

    main.appendChild(h1);
    main.appendChild(form);

    return main;
}

async function loadEditProviderPage(id) {
    const response = await fetch(`/api/proveedores/${id}`);
    const provider = await response.json();
    const container = document.getElementById('page-content');
    container.innerHTML = '';
    container.appendChild(createEditProviderPage(provider));
}

export default loadEditProviderPage;
