function createEditCocktailPage(cocktail) {
    const main = document.createElement('main');
    main.classList.add('edit-cocktail-main');

    const h1 = document.createElement('h1');
    h1.textContent = 'Modificar Coctel';

    const form = document.createElement('form');
    form.classList.add('edit-cocktail-form');

    const fields = [
        { label: 'Tipo', type: 'text', name: 'tipo_coctel', value: cocktail.tipo_coctel },
        { label: 'Descripción', type: 'text', name: 'descrip_coctel', value: cocktail.descrip_coctel },
        { label: 'Precio', type: 'number', name: 'precio_coctel', value: cocktail.precio_coctel },
        { label: 'Contacto', type: 'text', name: 'contact_coctel', value: cocktail.contact_coctel },
        { label: 'Teléfono', type: 'tel', name: 'tel_coctel', value: cocktail.tel_coctel },
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
    submitButton.textContent = 'Modificar Coctel';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const updatedCocktail = {
            tipo_coctel: form.tipo_coctel.value,
            descrip_coctel: form.descrip_coctel.value,
            precio_coctel: form.precio_coctel.value,
            contact_coctel: form.contact_coctel.value,
            tel_coctel: form.tel_coctel.value
        };

        await fetch(`/api/cocteleria/${cocktail.id_coctel}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedCocktail)
        });

       // loadCocktailsPage();
    });

    form.appendChild(submitButton);

    main.appendChild(h1);
    main.appendChild(form);

    return main;
}

async function loadEditCocktailPage(id) {
    const response = await fetch(`/api/cocteleria/${id}`);
    const cocktail = await response.json();
    const container = document.getElementById('page-content');
    container.innerHTML = '';
    container.appendChild(createEditCocktailPage(cocktail));
}

export default loadEditCocktailPage;
