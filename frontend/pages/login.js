//import loadAdminPanel from './adminPanel.js';

function createLoginPage() {
    const main = document.createElement('main');
    main.classList.add('login-main');

    const h1 = document.createElement('h1');
    h1.textContent = 'Acceso Administrativo';

    const img = document.createElement('img');
    img.src = '/icons/taven.png';
    img.alt = 'Taven Logo';
    img.classList.add('login-logo');

    const form = document.createElement('form');
    form.id = 'login-form';

    const usernameLabel = document.createElement('label');
    usernameLabel.textContent = 'Usuario:';
    const usernameInput = document.createElement('input');
    usernameInput.type = 'text';
    usernameInput.name = 'Usuario:';
    form.appendChild(usernameLabel);
    form.appendChild(usernameInput);

    const passwordLabel = document.createElement('label');
    passwordLabel.textContent = 'Contraseña:';
    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.name = 'password';
    form.appendChild(passwordLabel);
    form.appendChild(passwordInput);

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Acceder';
    form.appendChild(submitButton);

    main.appendChild(h1);
    main.appendChild(img);
    main.appendChild(form);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: usernameInput.value,
                password: passwordInput.value
            })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('authToken', data.token);
            alert('Login successful');
            loadAdminPanel(); // Redirige al panel de control
        } else {
            alert('Login failed: ' + data.message);
        }
    });

    return main;
}

function loadLoginPage() {
    const container = document.getElementById('page-content');
    container.innerHTML = '';
    container.appendChild(createLoginPage());
}

export default loadLoginPage;
