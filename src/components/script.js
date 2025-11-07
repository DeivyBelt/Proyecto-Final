// ============================================
// ANIMACIONES AVANZADAS ESTILO STEAM
// ============================================

// Efecto de partículas en el fondo
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.init();
    }

    init() {
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '1';
        document.body.prepend(this.canvas);

        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        // Crear partículas iniciales
        for (let i = 0; i < 50; i++) {
            this.createParticle();
        }
        
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticle() {
        this.particles.push({
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            size: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            opacity: Math.random() * 0.5 + 0.2
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach((particle, index) => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Rebotar en los bordes
            if (particle.x < 0 || particle.x > this.canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.speedY *= -1;

            // Dibujar partícula
            this.ctx.fillStyle = `rgba(102, 192, 244, ${particle.opacity})`;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Iniciar sistema de partículas
const particleSystem = new ParticleSystem();

// ============================================
// EFECTO DE PARALLAX EN SCROLL
// ============================================
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const banner = document.querySelector('.hero-banner');
            const bannerOverlay = document.querySelector('.banner-overlay');
            
            if (banner) {
                banner.style.transform = `translateY(${scrolled * 0.4}px)`;
            }
            
            if (bannerOverlay) {
                bannerOverlay.style.transform = `scale(${1 + scrolled * 0.001})`;
            }
            
            ticking = false;
        });
        ticking = true;
    }
});

// ============================================
// ANIMACIÓN DE SCREENSHOTS CON HOVER 3D
// ============================================
const screenshots = document.querySelectorAll('.screenshot');

screenshots.forEach(screenshot => {
    screenshot.addEventListener('mousemove', (e) => {
        const rect = screenshot.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        screenshot.style.transform = `
            perspective(1000px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg) 
            translateY(-10px) 
            scale(1.05)
        `;
    });
    
    screenshot.addEventListener('mouseleave', () => {
        screenshot.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
    });
});

// ============================================
// EFECTO TYPEWRITER EN EL TÍTULO
// ============================================
const gameTitle = document.querySelector('.game-title');
if (gameTitle) {
    const originalText = gameTitle.textContent;
    gameTitle.textContent = '';
    let i = 0;
    
    const typeWriter = () => {
        if (i < originalText.length) {
            gameTitle.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    setTimeout(typeWriter, 500);
}

// ============================================
// INTERSECTION OBSERVER PARA ANIMACIONES
// ============================================
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card').forEach(card => {
    observer.observe(card);
});

// ============================================
// EFECTO DE BRILLO EN BOTONES
// ============================================
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('mouseenter', function(e) {
        const shine = document.createElement('div');
        shine.className = 'shine-effect';
        shine.style.cssText = `
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
            transition: left 0.5s;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(shine);
        
        setTimeout(() => {
            shine.style.left = '100%';
        }, 10);
        
        setTimeout(() => {
            shine.remove();
        }, 600);
    });
});

// ============================================
// EFECTO RIPPLE EN FEATURE CARDS
// ============================================
const featureCards = document.querySelectorAll('.feature-card');

featureCards.forEach(card => {
    card.addEventListener('click', function(e) {
        const ripple = document.createElement('div');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(26, 157, 255, 0.3);
            transform: scale(0);
            animation: ripple-effect 0.6s ease-out;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Agregar animación de ripple al CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-effect {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .shine-effect {
        animation: shine 0.5s ease-out;
    }
`;
document.head.appendChild(style);

// ============================================
// EFECTO DE GLITCH EN EL LOGO
// ============================================
const logo = document.querySelector('.logo');
let glitchInterval;

logo.addEventListener('mouseenter', () => {
    let iterations = 0;
    glitchInterval = setInterval(() => {
        if (iterations < 5) {
            logo.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
            iterations++;
        } else {
            clearInterval(glitchInterval);
            logo.style.transform = 'translate(0, 0)';
        }
    }, 50);
});

// ============================================
// ANIMACIÓN DE CONTADOR EN ESTADÍSTICAS
// ============================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = Math.round(target);
            clearInterval(timer);
        } else {
            element.textContent = Math.round(current);
        }
    }, 16);
}

// ============================================
// EFECTO DE HOVER EN NAVEGACIÓN
// ============================================
const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.textShadow = '0 0 10px rgba(26, 157, 255, 0.8)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.textShadow = 'none';
    });
});

// ============================================
// LOADING SCREEN (opcional)
// ============================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// CURSOR PERSONALIZADO CON EFECTO STEAM
// ============================================
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border: 2px solid rgba(26, 157, 255, 0.8);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.1s ease, width 0.2s, height 0.2s;
    mix-blend-mode: difference;
`;
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
});

// Agrandar cursor en hover de elementos interactivos
document.querySelectorAll('a, button, .feature-card').forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.width = '40px';
        cursor.style.height = '40px';
        cursor.style.borderColor = 'rgba(26, 157, 255, 1)';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.borderColor = 'rgba(26, 157, 255, 0.8)';
    });
});

// ============================================
// EFECTO DE STEAM EN TAGS
// ============================================
const tags = document.querySelectorAll('.tag, .mini-tag');

tags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 0 15px rgba(26, 157, 255, 0.5)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = 'none';
    });
});

console.log('🎮 GM STORE - Animaciones cargadas exitosamente');