function loadConocenosPage() {
    const container = document.getElementById('page-content');
    container.innerHTML = `
        <main>
            <div class="conocenos-container">
                <h1>NUESTROS SERVICIOS</h1>
                <p>TAVEN EVENTS PLANNER te ofrece:</p>
                <div class="services">
                    <div class="service">
                        <img src="icons/kn1.png" alt="Servicio 1">
                        <p>Planificación y coordinación integral de eventos</p>
                    </div>
                    <div class="service">
                        <img src="icons/kn2.png" alt="Servicio 2">
                        <p>Diseño temático y decoración personalizada</p>
                    </div>
                    <div class="service">
                        <img src="icons/kn3.png" alt="Servicio 3">
                        <p>Selección y gestión de proveedores confiables</p>
                    </div>
                    <div class="service">
                        <img src="icons/kn4.png" alt="Servicio 4">
                        <p>Gestión logística y coordinación del día del evento</p>
                    </div>
                    <div class="service">
                        <img src="icons/kn5.png" alt="Servicio 5">
                        <p>Asesoramiento en la elección de ubicaciones y espacios</p>
                    </div>
                    <div class="service">
                        <img src="icons/kn6.png" alt="Servicio 6">
                        <p>Gestión y control de presupuesto</p>
                    </div>
                </div>
                <h2 style="color: #F2BD07;">CARACTERÍSTICAS DE NUESTRO SERVICIO</h2>
                <div class="features-container">
                    <div class="feature">
                        <h3>CREATIVIDAD</h3>
                        <p>Tenemos capacidad para generar ideas innovadoras y creativas que hacen que cada evento sea único y memorable</p>
                    </div>
                    <div class="feature">
                        <h3>ATENCIÓN AL DETALLE</h3>
                        <p>Prestamos atención meticulosa a cada aspecto del evento, desde la decoración hasta la logística</p>
                    </div>
                    <div class="feature">
                        <h3>FLEXIBILIDAD</h3>
                        <p>Nos adaptamos a las necesidades y preferencias de nuestros clientes, ofreciendo soluciones personalizadas y flexibles que se ajusten a sus objetivos y presupuesto</p>
                    </div>
                    <div class="feature">
                        <h3>COMUNICACIÓN TRANSPARENTE</h3>
                        <p>Mantenemos una comunicación abierta y transparente con nuestros clientes en cada etapa del proceso de planificación.</p>
                    </div>
                    <div class="feature">
                        <h3>RED DE PROVEEDORES CONFIABLES</h3>
                        <p>Contamos con una red de proveedores confiables y de alta calidad, lo que nos permite ofrecer a nuestros clientes una amplia variedad de opciones para cada aspecto del evento.</p>
                    </div>
                    <div class="feature">
                        <h3>GESTIÓN EFICIENTE DEL TIEMPO</h3>
                        <p>Utilizamos herramientas y técnicas de gestión del tiempo para garantizar que cada fase del evento se complete de manera oportuna y sin contratiempos</p>
                    </div>
                </div>
            </div>
        </main>
    `;
}

export default loadConocenosPage;
