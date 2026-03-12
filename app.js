document.addEventListener('DOMContentLoaded', () => {
    
    // 1. ANIMACIÓN DE SCROLL (Intersection Observer)
    // Esto es mucho más eficiente que escuchar el evento de scroll en toda la página
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15, // Activa la animación cuando el 15% del elemento es visible
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Solo se anima una vez
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

});

// 2. LÓGICA DEL LIGHTBOX (Modal para videos e imágenes)
const modal = document.getElementById('mediaModal');
const modalContent = document.getElementById('modalContent');

// Función para abrir el modal
window.openModal = function(src, type) {
    modalContent.innerHTML = ''; // Limpiar contenido anterior
    
    if (type === 'image') {
        modalContent.innerHTML = `<img src="${src}" class="max-w-full max-h-[85vh] rounded-xl shadow-2xl border border-gray-700 animate-[fadeIn_0.3s_ease-in-out]">`;
    } else if (type === 'video') {
        modalContent.innerHTML = `
            <video controls autoplay class="max-w-full max-h-[85vh] rounded-xl shadow-2xl border border-gray-700 w-full outline-none">
                <source src="${src}" type="video/mp4">
                Tu navegador no soporta videos.
            </video>
        `;
    }

    modal.classList.remove('hidden');
    // Pequeño delay para que la transición de opacidad funcione
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        modal.classList.add('opacity-100');
    }, 10);
    
    document.body.style.overflow = 'hidden'; // Evitar scroll de fondo
};

// Función para cerrar el modal
window.closeModal = function() {
    modal.classList.remove('opacity-100');
    modal.classList.add('opacity-0');
    
    setTimeout(() => {
        modal.classList.add('hidden');
        modalContent.innerHTML = ''; // Limpiar para que el video deje de reproducirse
        document.body.style.overflow = 'auto'; // Restaurar scroll
    }, 300); // Esperar que termine la transición
};

// Cerrar el modal si dan clic fuera de la imagen/video
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeModal();
    }
});

// Cerrar con la tecla ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});