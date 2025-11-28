document.addEventListener('DOMContentLoaded', () => {
    // 1. Funcionalidad de Comentarios
    const commentForm = document.getElementById('commentForm');
    const commentsListDiv = document.getElementById('commentsList');
    const noCommentsParagraph = commentsListDiv.querySelector('.no-comments');
    
    // Función para renderizar un comentario
    function renderComment(name, text) {
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment-entry');
        commentDiv.innerHTML = `
            <p><strong>${name}</strong> dice:</p>
            <p>${text}</p>
        `;
        commentsListDiv.appendChild(commentDiv);
    }

    // Cargar comentarios guardados (simulación con localStorage)
    const storedComments = JSON.parse(localStorage.getItem('seedGuardianComments')) || [];
    
    if (storedComments.length > 0) {
        if (noCommentsParagraph) {
            noCommentsParagraph.style.display = 'none';
        }
        storedComments.forEach(comment => renderComment(comment.name, comment.text));
    } else {
         if (noCommentsParagraph) {
            noCommentsParagraph.style.display = 'block';
        }
    }


    // Manejar el envío del formulario
    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nameInput = document.getElementById('commentName');
        const textInput = document.getElementById('commentText');

        const newComment = {
            name: nameInput.value.trim(),
            text: textInput.value.trim()
        };

        if (newComment.name && newComment.text) {
            // Ocultar el mensaje de no comentarios
            if (noCommentsParagraph) {
                noCommentsParagraph.style.display = 'none';
            }
            
            // Renderizar el nuevo comentario
            renderComment(newComment.name, newComment.text);

            // Guardar el nuevo comentario
            storedComments.push(newComment);
            localStorage.setItem('seedGuardianComments', JSON.stringify(storedComments));

            // Limpiar el formulario
            commentForm.reset();
            alert('¡Gracias por unirte al Círculo de Comentarios!');
        } else {
            alert('Por favor, completa ambos campos.');
        }
    });

    
    // 2. Efecto de Fondo Creativo (Canvas)
    const canvas = document.getElementById('natureCanvas');
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    const particleCount = 50;

    // Ajustar el tamaño del canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = document.body.scrollHeight; // Ocupa toda la altura del contenido
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Clase para representar una "semilla" o partícula de vida
    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 2 + 0.5; // Tamaño pequeño
            this.speedX = Math.random() * 0.5 - 0.25; // Movimiento horizontal lento
            this.speedY = Math.random() * 0.5 - 0.25; // Movimiento vertical lento
            this.color = '#1b5e20'; // Verde Bosque
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Mantener las partículas dentro del área del canvas
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Inicializar las partículas
    function init() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            particles.push(new Particle(x, y));
        }
    }

    // Bucle de animación
    function animate() {
        // Limpiar el canvas con una transparencia para dejar un "rastro" sutil
        ctx.fillStyle = 'rgba(245, 245, 220, 0.05)'; // Beige claro con baja opacidad
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        requestAnimationFrame(animate);
    }
    
    init();
    animate();
});