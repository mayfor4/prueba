function createAddEntertainmentPage() {
    const main = document.createElement('main');
    main.classList.add('add-entertainment-main');

    const h1 = document.createElement('h1');
    h1.textContent = 'Agregar Diversión';

    const form = document.createElement('form');
    form.classList.add('add-entertainment-form');

    const fields = [
        { label: 'Tipo de Diversión', type: 'text', name: 'tipo_diversion' },
        { label: 'Descripción', type: 'text', name: 'descrip_diversion' },
        { label: 'Precio', type: 'number', name: 'precio_diversion' },
        { label: 'Contacto', type: 'text', name: 'contact_diversion' },
        { label: 'Teléfono', type: 'tel', name: 'tel_diversion' },
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
    submitButton.textContent = 'Agregar Diversión';

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        fetch('/api/diversion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al agregar la diversión');
            }
            return response.json();
        })
        .then(data => {
            alert(data.message);
            loadEntertainmentPage();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un problema al agregar la diversión');
        });
    });

    form.appendChild(submitButton);

    main.appendChild(h1);
    main.appendChild(form);

    return main;
}

function loadAddEntertainmentPage() {
    const container = document.getElementById('page-content');
    container.innerHTML = '';
    container.appendChild(createAddEntertainmentPage());
}

export default loadAddEntertainmentPage;
