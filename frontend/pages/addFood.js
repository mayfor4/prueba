import loadFoodsPage from './food.js';

function createAddFoodPage() {
    const main = document.createElement('main');
    main.classList.add('add-food-main');

    const h1 = document.createElement('h1');
    h1.textContent = 'Agregar Comida';

    const form = document.createElement('form');
    form.classList.add('add-food-form');

    const fields = [
        { label: 'Tipo de Comida', type: 'text', name: 'tipo_comida' },
        { label: 'Descripción', type: 'text', name: 'desc_comida' },
        { label: 'Contacto', type: 'text', name: 'contacto_comida' }
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
    submitButton.textContent = 'Agregar Comida';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const newFood = {
            tipo_comida: form.tipo_comida.value,
            desc_comida: form.desc_comida.value,
            contacto_comida: form.contacto_comida.value
        };

        await fetch('/api/comidas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFood)
        });

        //loadFoodsPage(); // Reload the page after adding
    });

    form.appendChild(submitButton);

    main.appendChild(h1);
    main.appendChild(form);

    return main;
}

function loadAddFoodPage() {
    const container = document.getElementById('page-content');
    container.innerHTML = '';
    container.appendChild(createAddFoodPage());
}

export default loadAddFoodPage;
