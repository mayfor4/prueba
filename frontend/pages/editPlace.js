

function createEditPlacePage(place) {
    const main = document.createElement('main');
    main.classList.add('edit-place-main');

    const h1 = document.createElement('h1');
    h1.textContent = 'Modificar Lugar';

    const form = document.createElement('form');
    form.classList.add('edit-place-form');

    const fields = [
        { label: 'Nombre', type: 'text', name: 'nombre_lugar', value: place.nombre_lugar },
        { label: 'Tipo', type: 'text', name: 'tipo_lugar', value: place.tipo_lugar },
        { label: 'Dirección', type: 'text', name: 'dir_lugar', value: place.dir_lugar },
        { label: 'Zona', type: 'text', name: 'zona_lugar', value: place.zona_lugar },
        { label: 'Capacidad', type: 'number', name: 'capacidad_lugar', value: place.capacidad_lugar },
        { label: 'Contacto', type: 'text', name: 'contact_lugar', value: place.contact_lugar },
        { label: 'Teléfono', type: 'text', name: 'tel_lugar', value: place.tel_lugar },
        { label: 'Adicional', type: 'text', name: 'adicional_lugar', value: place.adicional_lugar },
        { label: 'Condiciones', type: 'text', name: 'condiciones_lugar', value: place.condiciones_lugar },
        { label: 'Paquete 1', type: 'text', name: 'paq1_lugar', value: place.paq1_lugar },
        { label: 'Paquete 2', type: 'text', name: 'paq2_lugar', value: place.paq2_lugar },
        { label: 'Paquete 3', type: 'text', name: 'paq3_lugar', value: place.paq3_lugar },
        { label: 'Paquete 4', type: 'text', name: 'paq4_lugar', value: place.paq4_lugar },
        { label: 'Paquete 5', type: 'text', name: 'paq5_lugar', value: place.paq5_lugar },
        { label: 'Paquete 6', type: 'text', name: 'paq6_lugar', value: place.paq6_lugar },
        { label: 'Imagen', type: 'file', name: 'img_lugar' }
    ];

    fields.forEach(field => {
        const label = document.createElement('label');
        label.textContent = field.label;
        const input = document.createElement('input');
        input.type = field.type;
        input.name = field.name;
        if (field.value) {
            input.value = field.value;
        }
        form.appendChild(label);
        form.appendChild(input);
        });
        const submitButton = document.createElement('button');
submitButton.type = 'submit';
submitButton.textContent = 'Modificar Lugar';

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nombre_lugar', form.nombre_lugar.value);
    formData.append('tipo_lugar', form.tipo_lugar.value);
    formData.append('dir_lugar', form.dir_lugar.value);
    formData.append('zona_lugar', form.zona_lugar.value);
    formData.append('capacidad_lugar', form.capacidad_lugar.value);
    formData.append('contact_lugar', form.contact_lugar.value);
    formData.append('tel_lugar', form.tel_lugar.value);
    formData.append('adicional_lugar', form.adicional_lugar.value);
    formData.append('condiciones_lugar', form.condiciones_lugar.value);
    formData.append('paq1_lugar', form.paq1_lugar.value);
    formData.append('paq2_lugar', form.paq2_lugar.value);
    formData.append('paq3_lugar', form.paq3_lugar.value);
    formData.append('paq4_lugar', form.paq4_lugar.value);
    formData.append('paq5_lugar', form.paq5_lugar.value);
    formData.append('paq6_lugar', form.paq6_lugar.value);
    if (form.img_lugar.files[0]) {
        formData.append('img_lugar', form.img_lugar.files[0]);
    }

    await fetch(`/api/lugares/${place.id_lugar}`, {
        method: 'PUT',
        body: formData
    });

    loadPlacesPage(); // Reload the page after updating
});

form.appendChild(submitButton);

main.appendChild(h1);
main.appendChild(form);

return main;

}
//archivo editar
async function loadEditPlacePage(id) {
    const response = await fetch(`/api/lugares/${id}`);
    const place = await response.json();
    const container = document.getElementById('page-content');
    container.innerHTML = '';
    container.appendChild(createEditPlacePage(place));
}

export default loadEditPlacePage;
