// --------- temporizador -----------------
const targetDate = new Date("september 12, 2026 16:30:00").getTime();

const updateTimer = () => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
        return;
    }

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    if (daysEl) daysEl.innerHTML = d < 10 ? "0" + d : d;
    if (hoursEl) hoursEl.innerHTML = h < 10 ? "0" + h : h;
    if (minutesEl) minutesEl.innerHTML = m < 10 ? "0" + m : m;
    if (secondsEl) secondsEl.innerHTML = s < 10 ? "0" + s : s;
};

setInterval(updateTimer, 1000);
updateTimer();


// --------------------------------fotos---------------------------------




document.addEventListener("DOMContentLoaded", function () {
    var swiper = new Swiper(".mySwiper", {
        effect: "cards",
        grabCursor: true,
    });

    // Inicializar Fancybox
    $(".fancybox").fancybox({
        buttons: [
            "zoom",
            "slideShow",
            "fullScreen",
            "thumbs",
            "close"
        ],
        loop: true,
        infobar: true,
        arrows: true,
        protect: true,
        animationEffect: "fade",
        transitionEffect: "slide",
        transitionDuration: 500,
        touch: {
            vertical: false,
        },
        autoFocus: false,
    });
});


// --------------------- regalos ------------------
const btnRegalos = document.getElementById('btn-regalos');
const infoRegalos = document.getElementById('regalos-info');

if (btnRegalos && infoRegalos) {
    btnRegalos.addEventListener('click', () => {
        infoRegalos.classList.toggle('active');
        if (infoRegalos.classList.contains('active')) {
            btnRegalos.textContent = 'OCULTAR DATOS BANCARIOS';
        } else {
            btnRegalos.textContent = 'VER DATOS BANCARIOS';
        }
    });
}

const copyBtns = document.querySelectorAll('.regalos__copy-btn');
copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const textToCopy = btn.getAttribute('data-copy');
        const originalText = btn.textContent;

        navigator.clipboard.writeText(textToCopy).then(() => {
            btn.textContent = '¡COPIADO!';
            btn.classList.add('copied');

            setTimeout(() => {
                btn.textContent = originalText;
                btn.classList.remove('copied');
            }, 2000);
        });
    });
});

// --------------------- playlist ------------------
const formPlaylist = document.getElementById('form-playlist');
const whatsappNumber = "543814437468";

if (formPlaylist) {
    formPlaylist.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('play-name').value;
        const song = document.getElementById('play-song').value;

        const message = `Hola, mi nombre es ${name} y mi tema recomendado es ${song}`;
        const url = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;

        window.open(url, '_blank');

        formPlaylist.reset();
    });
}


// ------------------- confirmacion --------------------



document.addEventListener('DOMContentLoaded', function () {
    // Definir los números de teléfono
    const recipientNumber1 = '543814437468'; // Número para el primer botón
    const recipientNumber2 = '543815829319'; // Número para el segundo botón

    // Función para enviar mensaje por WhatsApp
    function sendMessage(phoneNumber) {
        const userName = document.getElementById('userFullName').value.trim();
        const userMessage = document.getElementById('customMessage').value.trim();
        const attendanceStatus = document.querySelector('input[name="attendanceOption"]:checked');

        if (!attendanceStatus) {
            alert('Por favor, selecciona si asistirás o no.');
            return;
        }

        if (userName === '') {
            alert('Por favor, completa todos los campos antes de enviar.');
            return;
        }

        const alimenticioSeleccionado = document.querySelector('input[name="alimenticioOption"]:checked');
        let restriccionAlimenticia = 'N/A';
        if (alimenticioSeleccionado) {
            const selectedId = alimenticioSeleccionado.id;
            switch (selectedId) {
                case 'celiaca':
                    restriccionAlimenticia = 'Celíac@';
                    break;
                case 'vegetariana':
                    restriccionAlimenticia = 'Vegetarian@';
                    break;
                case 'hipertesion':
                    restriccionAlimenticia = 'Hipertensión';
                    break;
                case 'diabetica':
                    restriccionAlimenticia = 'Diabétic@';
                    break;
                case 'ninguna':
                    restriccionAlimenticia = 'Ninguna';
                    break;
            }
        }

        const finalMessage = `*Presencia:* ${attendanceStatus.value}\n*Nombre y Apellido:* ${userName}\n*Restricción alimenticia:* ${restriccionAlimenticia}\n*Mensaje:* ${userMessage ? userMessage : 'N/A'}`;
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(finalMessage)}`;

        // Abre la URL de WhatsApp en una nueva pestaña
        window.open(whatsappLink, '_blank');

        // Mostrar mensaje de confirmación
        alert('Mensaje enviado');

        // Limpiar los campos de entrada
        document.getElementById('userFullName').value = '';
        document.getElementById('customMessage').value = '';
        document.querySelectorAll('input[name="attendanceOption"]').forEach(radio => radio.checked = false);
        document.querySelectorAll('input[name="alimenticioOption"]').forEach(radio => radio.checked = false);

        // Redirigir a la sección con id 'correo'
        window.location.hash = 'correo';
    }

    // Asignar eventos a los botones
    document.getElementById('btnConfirmacion1').addEventListener('click', function () {
        sendMessage(recipientNumber1);
    });

    document.getElementById('btnConfirmacion2').addEventListener('click', function () {
        sendMessage(recipientNumber2);
    });
    // ------------------ música & lightbox ------------------

    const musicLightbox = document.getElementById('music-lightbox');
    const btnWithMusic = document.getElementById('btn-with-music');
    const btnWithoutMusic = document.getElementById('btn-without-music');
    const weddingMusic = document.getElementById('wedding-music');
    const musicControl = document.getElementById('music-control');
    const musicToggle = document.getElementById('music-toggle');
    const musicIcon = document.getElementById('music-icon');

    btnWithMusic.addEventListener('click', () => {
        weddingMusic.play();
        musicLightbox.style.display = 'none';
        musicControl.style.display = 'block';
        musicIcon.className = 'fas fa-pause';
    });

    btnWithoutMusic.addEventListener('click', () => {
        musicLightbox.style.display = 'none';
        musicControl.style.display = 'block';
        musicIcon.className = 'fas fa-play';
    });

    musicToggle.addEventListener('click', () => {
        if (weddingMusic.paused) {
            weddingMusic.play();
            musicIcon.className = 'fas fa-pause';
        } else {
            weddingMusic.pause();
            musicIcon.className = 'fas fa-play';
        }
    });
});