import loadTablesPage from './tables.js';
import loadChairsPage from './chairs.js';
import loadLinensPage from './linens.js';
import loadOthersPage from './others.js';
import { navigate } from '../components/navigation.js';
//add
import loadAddTablePage from './addTable.js';
import loadEditTablePage from './editTable.js';
import loadAddChairPage from './addChair.js';
import loadEditChairPage from './editChair.js';
import loadAddLinenPage from './addLinen.js';
import loadEditLinenPage from './editLinen.js';

import loadAddOtherPage from './addOther.js';
import loadEditOtherPage from './editOther.js';

function createFurniturePanel() {
    const main = document.createElement('main');
    main.classList.add('furniture-panel');

    const h1 = document.createElement('h1');
    h1.textContent = 'Mobiliario';

    const options = [
        { name: 'Mesas', img: 'mesas.png' },
        { name: 'Sillas', img: 'sillas.png' },
        { name: 'Mantelería', img: 'manteleria.png' },
        { name: 'Otros', img: 'otros.png' }
    ];

    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('furniture-buttons');

    const createButton = (option) => {
        const button = document.createElement('button');
        button.classList.add('furniture-button');

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
        'Mesas': '#/mesas',
        'Agregar mesas':'#/agregar-mesa',
        'Editar mesas':'#/modificar-mesas/:id',
        'Sillas': '#/sillas',
        'Agregar sillas':'#/agregar-sillas',
        'Editar sillas':'#/modificar-sillas/:id',
        'Mantelería': '#/manteleria',
        'Agregar mantelería':'#/agregar-mantel',
        'Editar mantelería':'#/modificar-mantel/:id',
        'Otros': '#/otros',
        'Agregar Otros':'#/agregar-otro',
        'Editar Otros':'#/modificar-otro/:id',  
    };

    const hash = routes[name];
    if (hash) {
        window.location.hash = hash;
        navigate(hash);
    }
}

export function loadFurnitureRoutes() {
    return {
        '#/mesas': loadTablesPage,
        '#/agregar-mesa': loadAddTablePage,
        '#/modificar-mesas/:id': loadEditTablePage,
        '#/sillas': loadChairsPage,
        '#/agregar-sillas': loadAddChairPage,
        '#/modificar-sillas/:id':loadEditChairPage ,

        '#/manteleria': loadLinensPage,
        '#/agregar-mantel': loadAddLinenPage,
        '#/modificar-mantel/:id': loadEditLinenPage,

        '#/otros': loadOthersPage,
       '#/agregar-otro': loadAddOtherPage,
        '#/modificar-otro/:id': loadEditOtherPage,

    };
}

function loadFurniturePanel() {
    const container = document.getElementById('page-content');
    if (container) {
        container.innerHTML = '';
        container.appendChild(createFurniturePanel());
    }
}

export default loadFurniturePanel;
