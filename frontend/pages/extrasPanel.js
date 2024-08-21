import loadCocktailsPage from './cocktails.js';
import loadDessertsPage from './desserts.js';
import loadPhotosPage from './photos.js';
import loadFunPage from './entertainment.js';
import loadExtrasPage from './extras.js';

import loadAddCocktailPage from './addCocktail.js';
import loadEditCocktailPage from './editCocktail.js';

import loadAddDessertPage from './addDessert.js';
import loadEditDessertPage from './editDessert.js';

import loadAddPhotoPage from './addPhoto.js';
import loadEditPhotoPage from './editPhoto.js';

import loadAddEntertainmentPage from './addEntertainment.js';
import loadEditEntertainmentPage from './editEntertainment.js';

import loadAddExtraPage from './addExtra.js';
import loadEditExtraPage from './editExtra.js';



function createExtrasPanel() {
    const main = document.createElement('main');
    main.classList.add('extras-panel');

    const h1 = document.createElement('h1');
    h1.textContent = 'Adicionales';

    const options = [
        { name: 'Cocteleria', img: 'cocteleria.png' },
        { name: 'Postres', img: 'postres.png' },
        { name: 'Fotos', img: 'fotos.png' },
        { name: 'Diversion', img: 'diversion.png' },
        { name: 'Extras', img: 'extras.png' }
    ];

    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('extras-buttons');

    options.forEach(option => {
        const button = document.createElement('button');
        button.classList.add('extras-button');

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

        buttonsContainer.appendChild(button);
    });

    main.appendChild(h1);
    main.appendChild(buttonsContainer);

    return main;
}

function handleNavigation(name) {
    const routes = {
        'Cocteleria': '#/extras/cocteleria',
        'Agregar Coctel':'#/agregar-coctel',
        'Modificar':'#/modificar-coctel/:id',
        'Postres': '#/extras/postres',
        'Agregar fotos':'#/agregar-foto',
        'Modificar fotos':'#/modificar-foto/:id',

        'Agregar Postres': '#/agregar-postres',
        'Modificar Postres':'#/modificar-postres:/id',
        'Fotos': '#/extras/fotos',
        'Diversion': '#/extras/diversion',
        'Agregar Diversion': '#/agregar-diversion',
        'Modificar Diversion':'#/modificar-diversion/:id',
        'Extras': '#/extras/extras',
        'Agregar Extras': '#/agregar-extras',
       'Modificar Extras':'#/modificar-extras/:id',


    };

    const hash = routes[name];
    if (hash) {
        window.location.hash = hash;
        navigate(hash);
    }
}

export function loadExtrasRoutes() {
    return {
        '#/extras/cocteleria': loadCocktailsPage,
        '#/agregar-coctel':loadAddCocktailPage,
        '#/modificar-coctel/:id': loadEditCocktailPage,
        '#/extras/postres': loadDessertsPage,
        '#/agregar-postre': loadAddDessertPage,
        '#/modificar-postre/:id': loadEditDessertPage,
        '#/extras/fotos': loadPhotosPage,
        '#/agregar-foto': loadAddPhotoPage,
        '#/modificar-foto/:id': loadEditPhotoPage,
        '#/extras/diversion': loadFunPage,
        '#/agregar-diversion': loadAddEntertainmentPage,
         '#/modificar-diversion/:id': loadEditEntertainmentPage,
        '#/extras/extras': loadExtrasPage,
        '#/agregar-extra': loadAddExtraPage,
        '#/modificar-extra/:id': loadEditExtraPage,
    };
}

function loadExtrasPanel() {
    const container = document.getElementById('page-content');
    if (container) {
        container.innerHTML = '';
        container.appendChild(createExtrasPanel());
    }
}

export default loadExtrasPanel;
