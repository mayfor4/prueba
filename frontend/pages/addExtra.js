function createAddExtraPage() {
    const main = document.createElement('main');
    main.classList.add('add-extra-main');

    const h1 = document.createElement('h1');
    h1.textContent = 'Agregar Extra';

    const form = document.createElement('form');
    form.classList.add('add-extra-form');

    const fields = [
        { label: 'Tipo de Extra', type: 'text', name: 'tipo_extra' },
        { label: 'Descripción del Extra', type: 'text', name: 'descrip_extra' },
        { label: 'Precio del Extra', type: 'number', name: 'precio_extra' },
        { label: 'Contacto del Extra', type: 'text', name: 'contact_extra' },
        { label: 'Teléfono del Extra', type: 'tel', name: 'tel_extra' },
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
    submitButton.textContent = 'Agregar Extra';

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        fetch('/api/extras', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al agregar el extra');
            }
            return response.json();
        })
        .then(data => {
            alert(data.message);
            loadExtrasPage();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un problema al agregar el extra');
        });
    });

    form.appendChild(submitButton);

    main.appendChild(h1);
    main.appendChild(form);

    return main;
}

function loadAddExtraPage() {
    const container = document.getElementById('page-content');
    container.innerHTML = '';
    container.appendChild(createAddExtraPage());
}

export default loadAddExtraPage;
