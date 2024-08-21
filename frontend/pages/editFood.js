import loadFoodsPage from './food.js';

function createEditFoodPage(food) {
    const main = document.createElement('main');
    main.classList.add('edit-food-main');

    const h1 = document.createElement('h1');
    h1.textContent = 'Modificar Comida';

    const form = document.createElement('form');
    form.classList.add('edit-food-form');

    const fields = [
        { label: 'Tipo de Comida', type: 'text', name: 'tipo_comida', value: food.tipo_comida },
        { label: 'Descripción', type: 'text', name: 'desc_comida', value: food.desc_comida },
        { label: 'Contacto', type: 'text', name: 'contacto_comida', value: food.contacto_comida }
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
    submitButton.textContent = 'Modificar Comida';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const updatedFood = {
            tipo_comida: form.tipo_comida.value,
            desc_comida: form.desc_comida.value,
            contacto_comida: form.contacto_comida.value
        };

        await fetch(`/api/comidas/${food.id_comida}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedFood)
        });

        //loadFoodsPage(); // Reload the page after updating
    });

    form.appendChild(submitButton);

    main.appendChild(h1);
    main.appendChild(form);

    return main;
}

async function loadEditFoodPage(id) {
    const response = await fetch(`/api/comidas/${id}`);
    const food = await response.json();
    const container = document.getElementById('page-content');
    container.innerHTML = '';
    container.appendChild(createEditFoodPage(food));

}

export default loadEditFoodPage;
