/*import createHeader from './components/header.js';
import createFooter from './components/footer.js';
import loadCotizacionPage from './pages/cotizacion.js';
import loadLoginPage from './pages/login.js';
import loadAdminPanel from './pages/adminPanel.js';

document.addEventListener('DOMContentLoaded', () => {
    document.body.insertBefore(createHeader(), document.body.firstChild);
    document.body.appendChild(createFooter());

    const container = document.getElementById('page-content');
    container.innerHTML = '';
    loadCotizacionPage();  // Load the default page

    document.getElementById('admin-button').addEventListener('click', () => {
        loadAdminPanel();
    });

    document.getElementById('login-button').addEventListener('click', () => {
        loadLoginPage();
    });

    document.getElementById('cotizacion-button').addEventListener('click', () => {
        loadCotizacionPage();
    });
});
*/