/*

import loadLoginPage from '../pages/login.js';
import loadConocenosPage from '../pages/conocenos.js';
import loadHomePage from '../pages/home.js';
import loadAdminPanel from '../pages/adminPanel.js'; 
import { loadAdminRoutes } from '../pages/adminPanel.js';
import loadFurniturePanel from '../pages/furniturePanel.js';
import { loadFurnitureRoutes } from '../pages/furniturePanel.js';
import loadTablewarePanel from '../pages/tablewarePanel.js'; // Importar panel de loza y cristalería
import { loadTablewareRoutes } from '../pages/tablewarePanel.js'; // Importar rutas del panel de loza y cristalería
import loadExtrasPanel from '../pages/extrasPanel.js'; // Importar panel de adicionales
import { loadExtrasRoutes } from '../pages/extrasPanel.js'; */

import loadHomePage from '../pages/home.js';
import loadCotizacionPage from '../pages/cotizacion.js';
import loadContactoPage from '../pages/contacto.js';
import loadConocenosPage from '../pages/conocenos.js';

function isAuthenticated() {
    return !!localStorage.getItem('authToken');
}

export function navigate(hash) {
    const routes = {
        '#inicio':loadHomePage,
        '#solicitar-cotizacion': loadCotizacionPage,
        '#contacto': loadContactoPage,
        '#conocenos': loadConocenosPage,
        /*'#admin': isAuthenticated() ? loadAdminPanel : loadLoginPage,
        '#mobiliario': isAuthenticated() ? loadFurniturePanel : loadLoginPage,
        '#loza-cristaleria': isAuthenticated() ? loadTablewarePanel : loadLoginPage, 
        '#extras': isAuthenticated() ? loadExtrasPanel : loadLoginPage,
        ...loadAdminRoutes(),
        ...loadFurnitureRoutes(),
        ...loadTablewareRoutes(),
        ...loadExtrasRoutes() ,*/
    };

    const matchedRoute = Object.keys(routes).find(route => {
        if (route.includes(':id')) {
            const dynamicRoute = route.replace(':id', '[^/]+');
            const regex = new RegExp(`^${dynamicRoute}$`);
            return regex.test(hash);
        }
        return route === hash;
    });

    if (matchedRoute) {
        if (matchedRoute.includes(':id')) {
            const id = hash.split('/').pop();
            routes[matchedRoute](id);
        } else {
            routes[matchedRoute]();
        }
    } else {
        loadHomePage();
    }
}

window.addEventListener('popstate', () => {
    navigate(window.location.hash);
});

navigate(window.location.hash || '#inicio');
