// Animation functionality
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Typed.js initialization
        const typedElement = document.getElementById('typed');
        if (typedElement) {
            var typed = new Typed('#typed', {
                strings: ['Full Stack Web Developer', 'JavaScript Developer', 'PHP Developer', 'SQL Developer', 'HTML Developer', 'CSS Developer'],
                typeSpeed: 50,
                backSpeed: 50,
                loop: true,
                cursorChar: '|',
                className: 'typed-text-class',
                preStringTyped: (arrayPos, self) => {
                    typedElement.style.opacity = '10';
                    typedElement.style.visibility = 'visible';
                    typedElement.style.color = '#95252f';
                }
            });
        }
    } catch (e) {
        console.error("Animation error:", e);
    }
}); 