// adminPanel.js 

import loadEventsPage from './events.js';
import loadProvidersPage from './providers.js';
import loadPlacesPage from './places.js';
import loadMusicPage from './music.js';
import loadServicesPage from './services.js';
import loadFoodPage from './food.js';
import loadCenterpiecesPage from './centerpieces.js';
import loadDecorationPage from './decorations.js';
import loadFurniturePanel from './furniturePanel.js';
import loadTablewarePanel from './tablewarePanel.js';
import loadExtrasPanel from './extrasPanel.js';
import { navigate } from '../components/navigation.js';
 
//add
import loadAddMusicPage from './addMusic.js';
import loadAddProviderPage from './addProvider.js';
import loadAddEventPage from './addEvent.js';
import loadAddPlacePage from './addPlace.js';
import loadAddServicePage from './addService.js';
import loadAddFoodPage from './addFood.js';
import loadAddCenterpiecePage from './addCenterpiece.js';
import loadAddDecorationPage from './addDecoration.js';



//adit
import loadEditMusicPage from './editMusic.js';
import loadEditProviderPage from './editProvider.js';
import loadEditEventPage from './editEvent.js';
import loadEditPlacePage from './editPlace.js';
import loadEditServicePage from './editService.js';
import loadEditFoodPage from './editFood.js';
import loadEditCenterpiecePage from './editCenterpiece.js';
import loadEditDecorationPage from './editDecoration.js';



function createAdminPanel() {
    const main = document.createElement('main');
    main.classList.add('admin-panel');

    const h1 = document.createElement('h1');
    h1.textContent = 'PANEL DE CONTROL';

    const options = [
        { name: 'Eventos', img: 'evento.png' },
        { name: 'Proveedores', img: 'proveedor.png' },
        { name: 'Lugares', img: 'lugares.png' },
        { name: 'Musica', img: 'musica.png' },
        { name: 'Servicios', img: 'servicios.png' },
        { name: 'Comida', img: 'comida.png' },
        { name: 'Centros de mesa', img: 'centro_mesa.png' },
        { name: 'Mobiliario', img: 'mobiliario.png' },
        { name: 'Decoración', img: 'decoracion.png' },
        { name: 'Loza y cristalería', img: 'loza_cristaleria.png' },
        { name: 'Adicionales', img: 'adicionales.png' }
    ];

    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('admin-buttons');

    const createButton = (option) => {
        const button = document.createElement('button');
        button.classList.add('admin-button');

        const img = document.createElement('img');
        img.src = `/icons/${option.img}`;
        img.alt = option.name;

        const span = document.createElement('span');
        span.textContent = option.name;

        button.appendChild(img);
        button.appendChild(span);
        
        button.addEventListener('click', () => {
            handleNavigation(option.name);
        });

        return button;
    };

    options.forEach(option => {
        buttonsContainer.appendChild(createButton(option));
    });

    main.appendChild(h1);
    main.appendChild(buttonsContainer);

    const logoutButton = document.createElement('button');
    logoutButton.textContent = 'Cerrar Sesión';
    logoutButton.classList.add('logout-button');
    logoutButton.addEventListener('click', () => {
        console.log('Cerrando sesión...');
        localStorage.removeItem('authToken');
        window.location.hash = '#admin';
        navigate('#admin');
        window.location.reload();
    });

    main.appendChild(logoutButton);

    return main;
}

function handleNavigation(name) {
    const routes = {
        'Eventos': '#/eventos',
        'Proveedores': '#/proveedores',
        'Lugares': '#/lugares',
        'Musica': '#/musica',
        'Servicios': '#/servicios',
        'Comida': '#/comida',
        'Centros de mesa': '#/centrosdemesa',
        'Mobiliario': '#/mobiliario',
        'Decoración': '#/decoracion',
        'Loza y cristalería': '#/loza',
        'Adicionales': '#/adicionales',
        'Agregar Proveedor': '#/agregar-proveedor',
        'Editar Proveedor': '#/modificar-proveedor/:id',
        'Editar Musica':'#/modificar-musica/:id',
        'Agregar Musica':'#/agregar-musica',
        //ADD
        'Agregar Evento':'#/agregar-evento',
        'Agregar lugar':'#/agregar-lugar',
        'Agregar Servicio':'#/agregar-servicio',
        'Agregar Comida':'#/agregar-comida',
        'Agregar Centros de mesa':'#/agregar-centrosdemesa',
        'Agregar Mobiliario':'#/agregar-mobiliario',
        

        //edit
        'Editar Evento':'#/modificar-evento/:id',
        'Editar lugar':'#/modificar-lugar/:id',
        'Editar Servicio':'#/modificar-servicio/:id',
        'Editar Comida':'#/modificar-comida/:id',
        'Editar Centros de mesa':'#/modificar-centrosdemesa/:id',
        'Editar Mobiliario':'#/modificar-mobiliario/:id',
    };

    const hash = routes[name];
    if (hash) {
        window.location.hash = hash;
        navigate(hash);
    }
}

export function loadAdminRoutes() {
    return {
        '#/eventos': loadEventsPage,
        '#/proveedores': loadProvidersPage,
        '#/lugares': loadPlacesPage,
        '#/musica': loadMusicPage,
        '#/servicios': loadServicesPage,
        '#/comida': loadFoodPage,
        '#/centrosdemesa': loadCenterpiecesPage,
        '#/mobiliario': loadFurniturePanel,
        '#/decoracion': loadDecorationPage,
        '#/loza': loadTablewarePanel,
        '#/adicionales': loadExtrasPanel,
        '#/agregar-proveedor': loadAddProviderPage,
       '#/modificar-proveedor/:id': loadEditProviderPage ,// Ruta dinámica
       '#/modificar-musica/:id':loadEditMusicPage,
       '#/agregar-musica':loadAddMusicPage,
       //add
       '#/agregar-evento': loadAddEventPage,
      '#/agregar-lugar': loadAddPlacePage,
      '#/agregar-servicio': loadAddServicePage,
      '#/agregar-comida': loadAddFoodPage,
      '#/agregar-centrosdemesa': loadAddCenterpiecePage,
      '#/agregar-decoracion': loadAddDecorationPage,
      

       //edit
     '#/modificar-evento/:id': loadEditEventPage,
     '#/modificar-lugar/:id': loadEditPlacePage,
     '#/modificar-servicio/:id': loadEditServicePage,
     '#/modificar-comida/:id': loadEditFoodPage,
     '#/modificar-centrosdemesa/:id': loadEditCenterpiecePage,
     '#/modificar-decoracion/:id': loadEditDecorationPage,
    
    };
}

function loadAdminPanel() {
    const container = document.getElementById('page-content');
    if (container) {
        container.innerHTML = '';
        container.appendChild(createAdminPanel());
    }
}

export default loadAdminPanel;
