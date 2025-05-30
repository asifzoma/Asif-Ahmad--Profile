// Typed.js initialization
try {
    document.addEventListener('DOMContentLoaded', function() {
        // Only initialize Typed.js if the element exists
        const typedElement = document.getElementById('typed');
        if (typedElement) {
            var typed = new Typed('#typed', {
                strings: ['Full Stack Web Developer', 'Laravel','JavaScript', 'PHP', 'SQL', 'HTML', 'CSS'],
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
    });
} catch (e) {
    console.error("Typed.js error:", e);
}

// Sidebar and navigation functionality
try {
    document.addEventListener('DOMContentLoaded', function() {
        const btn = document.querySelector('.hamburger-menu');
        const sidebar = document.querySelector('.sidebar-container');
        let overlay = document.querySelector('.overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'overlay';
            document.querySelector('.page-wrapper').prepend(overlay);
        }
        if (btn) {
            btn.addEventListener('click', function() {
                sidebar.classList.toggle('active');
                btn.classList.toggle('active');
                overlay.classList.toggle('active');
                if (sidebar.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            });
        }
        overlay.addEventListener('click', function() {
            sidebar.classList.remove('active');
            btn.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
        const navItems = document.querySelectorAll('.sidebar-menu li');
        function highlightActiveNavItem() {
            const currentPath = window.location.pathname;
            const currentPage = currentPath.split('/').pop() || 'index.html';
            const currentHash = window.location.hash;
            navItems.forEach(item => item.classList.remove('active'));
            navItems.forEach(item => {
                const link = item.querySelector('a');
                if (!link) return;
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    if (currentPage === 'index.html' && currentHash === href) {
                        item.classList.add('active');
                    }
                } else if (href.includes('#')) {
                    const [hrefPage, hrefHash] = href.split('#');
                    if (hrefPage === currentPage && currentHash === '#' + hrefHash) {
                        item.classList.add('active');
                    }
                } else if (href === currentPage && !currentHash) {
                    item.classList.add('active');
                }
            });
        }
        highlightActiveNavItem();
        navItems.forEach(item => {
            item.addEventListener('click', function(e) {
                const link = this.querySelector('a');
                if (!link) return;
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    navItems.forEach(i => i.classList.remove('active'));
                    this.classList.add('active');
                }
                if (window.innerWidth <= 768) {
                    const sidebar = document.querySelector('.sidebar-container');
                    const hamburger = document.querySelector('.hamburger-menu');
                    const overlay = document.querySelector('.overlay');
                    if (sidebar) sidebar.classList.remove('active');
                    if (hamburger) hamburger.classList.remove('active');
                    if (overlay) overlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
        window.addEventListener('hashchange', function() {
            highlightActiveNavItem();
        });
    });
} catch (e) {
    console.error("Sidebar functionality error:", e);
}

// Contact form validation
$(document).ready(function() {
    $("#contact-form").validate({
        errorElement: "span",
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            },
            message: {
                required: true,
                minlength: 10
            }
        },
        messages: {
            name: {
                required: "Please enter your name",
                minlength: "Your name must consist of at least 2 characters"
            },
            email: {
                required: "Please enter your email address",
                email: "Please enter a valid email address"
            },
            message: {
                required: "Please enter a message",
                minlength: "Your message must be at least 10 characters long"
            }
        },
        submitHandler: function(form) {
            $.ajax({
                url: 'contact_submit.php',
                type: 'POST',
                data: $(form).serialize(),
                success: function(response) {
                    let msgBox = document.getElementById('submission-success');
                    if (!msgBox) {
                        msgBox = document.createElement('div');
                        msgBox.id = 'submission-success';
                        msgBox.innerHTML = '<strong>Thank you for your message! I will get back to you soon.</strong>';
                        document.body.appendChild(msgBox);
                    } else {
                        msgBox.innerHTML = '<strong>Thank you for your message! I will get back to you soon.</strong>';
                    }
                    // Use a slower transition
                    msgBox.style.transition = 'opacity 1.2s';
                    msgBox.classList.add('active');
                    setTimeout(() => {
                        msgBox.classList.remove('active');
                        setTimeout(() => {
                            if (msgBox.parentNode) msgBox.parentNode.removeChild(msgBox);
                        }, 1200);
                    }, 3500);
                    form.reset();
                },
                error: function() {
                    alert('There was an error submitting the form. Please try again.');
                }
            });
            return false;
        }
    });
}); 