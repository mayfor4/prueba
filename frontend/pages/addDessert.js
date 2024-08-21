function createAddDessertPage() {
    const main = document.createElement('main');
    main.classList.add('add-dessert-main');

    const h1 = document.createElement('h1');
    h1.textContent = 'Agregar Postre';

    const form = document.createElement('form');
    form.classList.add('add-dessert-form');

    const fields = [
        { label: 'Tipo de Postre', type: 'text', name: 'tipo_postre' },
        { label: 'Descripción del Postre', type: 'text', name: 'descrip_postre' },
        { label: 'Precio del Postre', type: 'number', name: 'precio_postre' },
        { label: 'Contacto del Postre', type: 'text', name: 'contact_postre' },
        { label: 'Teléfono del Postre', type: 'tel', name: 'tel_postre' },
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
    submitButton.textContent = 'Agregar Postre';

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        fetch('/api/postres', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al agregar el postre');
            }
            return response.json();
        })
        .then(data => {
            alert(data.message);
            loadDessertsPage();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un problema al agregar el postre');
        });
    });

    form.appendChild(submitButton);

    main.appendChild(h1);
    main.appendChild(form);

    return main;
}

function loadAddDessertPage() {
    const container = document.getElementById('page-content');
    container.innerHTML = '';
    container.appendChild(createAddDessertPage());
}

export default loadAddDessertPage;
