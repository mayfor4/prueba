function createCotizacionPage() {
    const main = document.createElement('main');
    main.classList.add('cotizacion-main');

    const h1 = document.createElement('h1');
    h1.textContent = 'Solicitud de Cotización';

    const form = document.createElement('form');
    form.id = 'cotizacion-form';
    form.method = 'post';
    form.action = '/api/generar-pdf';

    // Function to create input fields
    const createInputField = (labelText, name, type = 'text') => {
        const label = document.createElement('label');
        label.textContent = labelText;

        const input = document.createElement('input');
        input.type = type;
        input.name = name;

        form.appendChild(label);
        form.appendChild(input);
    };

    // Function to create dropdown
    const createDropdown = (labelText, name, options) => {
        const label = document.createElement('label');
        label.textContent = labelText;

        const select = document.createElement('select');
        select.name = name;

        options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option;
            opt.textContent = option;
            select.appendChild(opt);
        });

        form.appendChild(label);
        form.appendChild(select);
    };

    // Function to create checkboxes
    const createCheckboxes = (labelText, name, options, imagePathPrefix = '') => {
        const label = document.createElement('label');
        label.textContent = labelText;
        form.appendChild(label);

        const div = document.createElement('div');
        div.className = 'checkbox-group';

        options.forEach((option, index) => {
            const wrapper = document.createElement('div');
            wrapper.className = 'checkbox-wrapper';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = name;
            checkbox.value = option;

            const checkboxLabel = document.createElement('label');
            checkboxLabel.textContent = option;
            checkboxLabel.appendChild(checkbox);

            wrapper.appendChild(checkboxLabel);

            if (imagePathPrefix) {
                const img = document.createElement('img');
                img.src = `${imagePathPrefix}${index + 1}.png`;
                img.alt = option;
                wrapper.appendChild(img);
            }

            div.appendChild(wrapper);
        });

        form.appendChild(div);
    };

    // Numero de personas adultas
    createInputField('NUMERO DE PERSONAS ADULTAS:', 'numPersonas', 'number');

    // Numero de personas menores
    createInputField('NUMERO DE PERSONAS MENORES:', 'numPersonasMenor', 'number');

    // Presupuesto
    createInputField('PRESUPUESTO:', 'presupuesto', 'number');

    // Tipo de evento
    createDropdown('TIPO DE EVENTO:', 'tipoEvento', ['Boda', 'XV años', 'Graduacion', 'Empresarial', 'Bautizo', 'Primera comunión', 'Aniversario', 'Cumpleaños', 'Otros']);

    // Lugar
    createDropdown('LUGAR:', 'lugar', ['Hacienda', 'Salon', 'Terraza', 'Jardin', 'Con alberca', 'Otro']);

    // Zona
    createDropdown('ZONA:', 'zona', ['Norte', 'Centro', 'Sur']);

    // Comida
    createCheckboxes('COMIDA:', 'comida', ['Menu 2 tiempos', 'Menu 3 tiempos', 'Menu 4 tiempos', 'Bufete', 'Parrillada', 'Espadas', 'Tacos de guisos', 'Tacos de canasta', 'Tacos de pastor', 'Barbacoa', 'Carnitas', 'Mole con pollo', 'Otro']);

    // Música
    createCheckboxes('MUSICA:', 'musica', ['Dj', 'Grupo versatil', 'Trio', 'Duo', 'Solista', 'Marimba', 'Saxofonista', 'Violinista', 'Pianista', 'Mariachi', 'Banda', 'Banda rock', 'Norteño']);

    // Servicios
    createCheckboxes('SERVICIOS:', 'servicios', ['Hostess', 'Maestro de ceremonia', 'Niñera', 'Meseros', 'Valet parking', 'Arlequin', 'Robot LED', 'Batucada', 'Botarga', 'Cabezones']);

    // Mobiliario de mesas
    createCheckboxes('MESAS:', 'mesas', ['Vintage', 'Marmol blanco', 'Marmol negro', 'Madera redonda negra', 'Madera serpiente', 'Redonda', 'Cuadrada', 'Tablon'], 'icons/mesa');

    // Mobiliario de manteleria
    createCheckboxes('MANTELERIA:', 'manteleria', ['Mantel blanco', 'Mantel de color', 'Mantel estampado', 'Camino mesa', 'Otro']);

    // Mobiliario de sillas
    createCheckboxes('SILLAS:', 'sillas', ['Crossback', 'Tifany', 'Ovalo blanca', 'Avant garde', 'Phoenix', 'Charlotte', 'Luca', 'Lea', 'Amelia', 'Plegable negra'], 'icons/silla');

    // Mobiliario de otros
    createCheckboxes('MAS MOBILIARIO:', 'otros', ['Salas lounge', 'Periqueras', 'Barras servicio', 'Carpas', 'Sombrillas', 'Calentadores', 'Mesa principal', 'Mesa de regalos', 'Mesa para pastel', 'Otros']);

    // Decoración
    createCheckboxes('DECORACION:', 'decoracion', ['Back decorativo con flores', 'Back decorativo con globos', 'Decoracion de mesa principal', 'Luces LED', 'Decoracion de telas', 'Otro']);

    // Centros de mesa
    createDropdown('CENTROS DE MESA:', 'centrosMesa', ['Basico con flor de temporada', 'Basico con flor artificial', 'Basico de globos', 'Otro']);

    // Loza y cristalería de loza
    createCheckboxes('LOZA:', 'loza', ['Loza blanca basica', 'Loza decorativa', 'Otro']);

    // Loza y cristalería de plaque
    createDropdown('PLAQUE:', 'plaque', ['Cubierto basico', 'Cubierto decorativo', 'Otro']);

    // Loza y cristalería de vaso
    createCheckboxes('VASOS:', 'vaso', ['Vaso haibolero', 'Vaso old fashion', 'Vaso tequilero']);

    // Loza y cristalería de copa
    createCheckboxes('COPAS:', 'copa', ['Copa para vino de mesa', 'Copa decorativa de color', 'Copa de diseño']);

    // Loza y cristalería de servilletas
    createDropdown('SERVILLETAS:', 'servilletas', ['Servilleta blanca basica', 'Servilleta de color', 'Servilleta estampada', 'Otro']);

    // Adicionales de coctelería
    createCheckboxes('COCTELERIA:', 'cocteleria', ['Cocteleria de bienvenida sin alcohol', 'Cocteleria de bienvenida con alcohol', 'Cervezas con aguas frias', 'Carrito de shots']);

    // Adicionales de postres
    createCheckboxes('POSTRES:', 'postres', ['Mesa de dulces', 'Mesa de postres', 'Mesa de quesos']);

    // Adicionales de fotos
    createCheckboxes('FOTOS:', 'fotos', ['Camara 360', 'Cabina fotografica con accesorios', 'Paquete basico de foto y video', 'Sesion previa de foto y video', 'Espejo para selfie en recepcion']);

    // Adicionales de diversión
    createCheckboxes('DIVERSION:', 'diversion', ['Inflable', 'Brincolin', 'Show infantil', 'Payaso', 'Mago', 'Juegos de feria']);

    // Adicionales de extras
    createCheckboxes('SERVICIOS EXTRAS:', 'extras', ['Limusina', 'Pastel', 'Pirotecnia', 'Menu tornafiesta']);

    // Nombre cliente
    createInputField('NOMBRE DEL CLIENTE:', 'nomcliente');

    // Telefono cliente
    createInputField('TELEFONO DEL CLIENTE:', 'telcliente');

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Enviar';
    form.appendChild(submitButton);

    main.appendChild(h1);
    main.appendChild(form);

    // Div for displaying the message
    const messageDiv = document.createElement('div');
    messageDiv.id = 'mensaje';
    messageDiv.style.display = 'none';
    messageDiv.style.backgroundColor = 'white';
    messageDiv.style.border = '1px solid black';
    messageDiv.style.padding = '10px';
    messageDiv.style.marginTop = '10px';
    main.appendChild(messageDiv);

    return main;
}
function loadCotizacionPage() {
    const container = document.getElementById('page-content');
    container.innerHTML = '';
    container.appendChild(createCotizacionPage());

    const form = document.getElementById('cotizacion-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita el envío estándar del formulario y la recarga de la página

        const formData = new FormData(form);

        fetch('/api/generar-pdf', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            mostrarMensaje('Solicitud enviada exitosamente');
        })
        .catch(error => {
            mostrarMensaje('Error al enviar la solicitud');
        });
    });
}

function mostrarMensaje(mensaje) {
    const mensajeDiv = document.getElementById('mensaje');
    mensajeDiv.innerText = mensaje;
    mensajeDiv.style.display = 'block';

    // Ocultar el mensaje después de 3 segundos (3000 ms)
    setTimeout(() => {
        mensajeDiv.style.display = 'none';
    }, 3000);
}

export default loadCotizacionPage;
