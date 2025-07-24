document.addEventListener('DOMContentLoaded', () => {
    const startAnimationButton = document.getElementById('startAnimationButton');
    const backgroundCanvas = document.getElementById('backgroundCanvas');
    const introLanguagesSection = document.getElementById('intro-languages'); // Get the section
    const ctx = backgroundCanvas.getContext('2d');

    let animationStarted = false;
    let texts = [];

    // Set canvas dimensions
    function setCanvasSize() {
        backgroundCanvas.width = window.innerWidth;
        backgroundCanvas.height = window.innerHeight;
    }

    window.addEventListener('resize', setCanvasSize);
    setCanvasSize();

    // Define the "Hello, World!" messages for each language
    const helloWorlds = [
        { text: 'Hello, World! // C++', color: '#00BFFF' }, // Deep Sky Blue
        { text: 'print("Hello, World!") # Python', color: '#FFD700' }, // Gold
        { text: 'Console.WriteLine("Hello, World!"); // C#', color: '#BA55D3' }, // Medium Orchid
        { text: 'console.log("Hello, World!"); // JavaScript', color: '#32CD32' } // Lime Green
    ];

    function createTextParticle() {
        const randomIndex = Math.floor(Math.random() * helloWorlds.length);
        const hw = helloWorlds[randomIndex];
        return {
            text: hw.text,
            x: Math.random() * backgroundCanvas.width,
            y: backgroundCanvas.height + Math.random() * 100, // Start below the screen
            speed: Math.random() * 0.8 + 0.3, // Slower speeds for subtle effect
            color: hw.color,
            fontSize: Math.random() * 15 + 10 // Font sizes between 10px and 25px
        };
    }

    function initTextParticles(count) {
        texts = [];
        for (let i = 0; i < count; i++) {
            texts.push(createTextParticle());
        }
    }

    function animateBackground() {
        if (!animationStarted) return; // Stop animation if not active

        ctx.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);

        texts.forEach(textParticle => {
            textParticle.y -= textParticle.speed;

            // If text goes off screen, reset its position
            if (textParticle.y < -textParticle.fontSize) {
                Object.assign(textParticle, createTextParticle()); // Re-initialize a new text particle
                textParticle.y = backgroundCanvas.height + Math.random() * 50; // Reset just below the screen
                textParticle.x = Math.random() * backgroundCanvas.width; // New random X position
            }

            ctx.font = `${textParticle.fontSize}px 'Fira Code', monospace`;
            ctx.fillStyle = textParticle.color;
            ctx.fillText(textParticle.text, textParticle.x, textParticle.y);
        });

        requestAnimationFrame(animateBackground);
    }

    startAnimationButton.addEventListener('click', () => {
        if (!animationStarted) {
            // Show the "Introduction to Coding Languages" section
            introLanguagesSection.classList.remove('hidden');
            introLanguagesSection.classList.add('visible'); // For the transition effect

            backgroundCanvas.style.display = 'block'; // Show the canvas
            backgroundCanvas.style.opacity = '0.1'; // Ensure it's visible with subtle opacity

            initTextParticles(50); // Create an initial set of text particles
            animationStarted = true;
            animateBackground(); // Start the animation loop
            startAnimationButton.textContent = 'Background Running...';
            startAnimationButton.disabled = true; // Disable button after starting
            startAnimationButton.style.backgroundColor = '#444';
            startAnimationButton.style.cursor = 'default';

            // Optional: Scroll to the newly revealed section
            introLanguagesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});