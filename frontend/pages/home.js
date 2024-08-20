function loadHomePage() {
    const container = document.getElementById('page-content');
    container.innerHTML = `
        <main>
            <div class="home-title-container">
                <h1 class="main-title">TAVEN EVENT PLANNER</h1>
                <div class="phrase-image-container">
                    <p class="header-phrase">Planificación PERFECTA para tu día ESPECIAL</p>
                    <img src="icons/taven.png" alt="Taven Logo" class="big-logo">
                </div>
            </div>
            <div class="home-content">
                <img src="icons/vista1.png" alt="Vista 1" class="home-image">
                <div class="home-text">
                    <h2>CONOCE MÁS SOBRE TAVEN EVENT PLANNER</h2>
                    <p>Somos una empresa dedicada a organizar y planificar tus eventos, así como llevar la logística en cada momento acorde a tus preferencias, gustos y presupuestos. Sumérgete en nuestro mundo de creatividad, atención al detalle y dedicación para hacer de cada evento una experiencia inolvidable!</p>
                </div>
            </div>
            <div class="carousel">
                <button class="carousel-control prev" aria-label="Previous slide">&#10094;</button>
                <div class="carousel-images">
                    <img src="icons/vista2.png" alt="Vista 2" class="carousel-image">
                    <img src="icons/vista3.png" alt="Vista 3" class="carousel-image">
                    <img src="icons/vista4.png" alt="Vista 4" class="carousel-image">
                    <img src="icons/vista5.png" alt="Vista 5" class="carousel-image">
                </div>
                <button class="carousel-control next" aria-label="Next slide">&#10095;</button>
            </div>
            <div class="final-section">
                <img src="icons/taven.png" alt="Taven Logo" class="final-image">
                <p class="final-text">Estamos comprometidos a hacer realidad la visión de nuestros clientes y a garantizar que cada evento sea único y memorable. Hacemos que tu visión se convierta en realidad con nuestro amplio abanico de servicios de planificación de eventos.</p>
            </div>
        </main>
    `;
    initializeCarousel(); // Llama a la función para inicializar el carrusel
}

function initializeCarousel() {
    const prevButton = document.querySelector('.carousel-control.prev');
    const nextButton = document.querySelector('.carousel-control.next');
    const carouselImages = document.querySelector('.carousel-images');
    const imageCount = document.querySelectorAll('.carousel-image').length;
    let index = 0;

    function updateCarousel() {
        const offset = -index * 100;
        carouselImages.style.transform = `translateX(${offset}%)`;
    }

    prevButton.addEventListener('click', () => {
        index = (index > 0) ? index - 1 : imageCount - 1;
        updateCarousel();
    });

    nextButton.addEventListener('click', () => {
        index = (index < imageCount - 1) ? index + 1 : 0;
        updateCarousel();
    });

    setInterval(() => {
        nextButton.click();
    }, 5000);
}

export default loadHomePage;