import loadDinnerwarePage from './dinnerware.js';
import loadGlasswarePage from './glasses.js';
import loadCupsPage from './cups.js';
import loadPlaquePage from './plaque.js';
import loadNapkinsPage from './napkins.js';
import { navigate } from '../components/navigation.js';

//add
import loadAddDinnerwarePage from './addDinnerware.js';
import loadEditDinnerwarePage from './editDinnerware.js';

import loadAddGlassesPage from './addGlasses.js';
import loadEditGlassesPage from './editGlasses.js';

import loadAddCupPage from './addCup.js';
import loadEditCupPage from './editCup.js';


import loadAddPlaquePage from './addPlaque.js';
import loadEditPlaquePage from './editPlaque.js';

import loadAddNapkinPage from './addNapkin.js';
import loadEditNapkinPage from './editNapkin.js';

function createTablewarePanel() {
    const main = document.createElement('main');
    main.classList.add('tableware-panel');

    const h1 = document.createElement('h1');
    h1.textContent = 'Loza y Cristalería';

    const options = [
        { name: 'Loza', img: 'loza.png' },
        { name: 'Vasos', img: 'vasos.png' },
        { name: 'Copas', img: 'copas.png' },
        { name: 'Plaque', img: 'plaque.png' },
        { name: 'Servilletas', img: 'servilletas.png' }
    ];

    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('tableware-buttons');

    const createButton = (option) => {
        const button = document.createElement('button');
        button.classList.add('tableware-button');

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

    return main;
}

function handleNavigation(name) {
    const routes = {
        'Loza': '#/tableware/loza',
        'Agregar loza':'#/agregar-loza',
        'Mosdifiacar':'#/modificar-loza/:id',


        'Vasos': '#/tableware/vasos',
        'Agregar vasos':'#/agregar-vaso',
        'Modifiacar':'#/modificar-vaso/:id',

        'Copas': '#/tableware/copas',
        'Agregar copas':'#/agregar-copas',
        'Modifiacar':'#/modificar-copas/:id',
        'Plaque': '#/tableware/plaque',
        'Agregar Placas':'#/agregar-placas',
        'Modificar Placas':'#/modificar-placas:id',

        'Servilletas': '#/tableware/servilletas',
        'Agregar servilletas':'#/agregar-servilletas',
        'Modifiacar':'#/modificar-servilletas/:id',
        

    };

    const hash = routes[name];
    if (hash) {
        window.location.hash = hash;
        navigate(hash);
    }
}

export function loadTablewareRoutes() {
    return {
        '#/tableware/loza': loadDinnerwarePage,
        '#/agregar-loza':loadAddDinnerwarePage,
        '#/modificar-loza/:id': loadEditDinnerwarePage,
        '#/tableware/vasos': loadGlasswarePage,
        '#/agregar-vaso': loadAddGlassesPage, 
        '#/modificar-vaso/:id': loadEditGlassesPage,
        '#/tableware/copas': loadCupsPage,
        '#/agregar-copas': loadAddCupPage,
        '#/modificar-copas/:id': loadEditCupPage,
        '#/tableware/plaque': loadPlaquePage,
        '#/agregar-placas': loadAddPlaquePage,
        '#/modificar-placas/:id': loadEditPlaquePage,
        '#/tableware/servilletas': loadNapkinsPage,
        '#/agregar-servilletas': loadAddNapkinPage,
        '#/modificar-servilletas/:id': loadEditNapkinPage,


        
    };
}

function loadTablewarePanel() {
    const container = document.getElementById('page-content');
    if (container) {
        container.innerHTML = '';
        container.appendChild(createTablewarePanel());
    }
}

export default loadTablewarePanel;
