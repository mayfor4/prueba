function createAddCocktailPage() {
    const main = document.createElement('main');
    main.classList.add('add-cocktail-main');

    const h1 = document.createElement('h1');
    h1.textContent = 'Agregar Coctel';

    const form = document.createElement('form');
    form.classList.add('add-cocktail-form');

    const fields = [
        { label: 'Tipo de Coctel', type: 'text', name: 'tipo_coctel' },
        { label: 'Descripción del Coctel', type: 'text', name: 'descrip_coctel' },
        { label: 'Precio del Coctel', type: 'number', name: 'precio_coctel' },
        { label: 'Contacto del Coctel', type: 'text', name: 'contact_coctel' },
        { label: 'Teléfono del Coctel', type: 'tel', name: 'tel_coctel' },
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
    submitButton.textContent = 'Agregar Coctel';

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        fetch('/api/cocteleria', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al agregar el coctel');
            }
            return response.json();
        })
        .then(data => {
            alert(data.message);
            loadCocktailsPage();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un problema al agregar el coctel');
        });
    });

    form.appendChild(submitButton);

    main.appendChild(h1);
    main.appendChild(form);

    return main;
}

function loadAddCocktailPage() {
    const container = document.getElementById('page-content');
    container.innerHTML = '';
    container.appendChild(createAddCocktailPage());
}

export default loadAddCocktailPage;
