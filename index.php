<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Asif Ahmad | Full Stack Developer</title>
    <meta name="description" content="Full Stack Developer specializing in PHP, JavaScript, SQL, C#/.NET, and Laravel. View my portfolio, code snippets, and get in touch for your next web development project.">
    <meta name="keywords" content="full stack developer, web development, PHP, JavaScript, C#, SLQL, REACT, .NET, Laravel, HTML5, CSS3">
    <meta name="author" content="Asif Ahmad">
    <meta name="robots" content="index, follow">
    
    <!-- Favicons -->
    <link rel="apple-touch-icon" sizes="180x180" href="./favicon_io/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="./favicon_io/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="./favicon_io/favicon-16x16.png">
    <link rel="manifest" href="./favicon_io/site.webmanifest">
    <link rel="shortcut icon" href="./favicon_io/favicon.ico">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="theme-color" content="#ffffff">
    
    <!-- Critical CSS for above-the-fold content -->
    <link rel="stylesheet" href="./css/style.css">
    
    <!-- Preload external resources -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin>
    
    <!-- External resources -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" media="print" onload="this.media='all'">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" media="print" onload="this.media='all'">
    
    <!-- Fallback for disabled JavaScript -->
    <noscript>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    </noscript>
</head>

<body>  
<?php include './header.php'; ?>
    <div class="page-wrapper">
        <!-- Overlay for mobile sidebar -->
        <div class="overlay"></div>

        <!-- Main Content -->
        <main class="main-container" role="main">
            <!-- Hero Section -->
            <section id="hero" class="hero-section" aria-label="Introduction">
                <div class="image-container">
                    <!-- Header Dock Row (appears on scroll) -->
                    <div class="header-dock" id="headerDock">
                        <div class="dock-content">
                            <!-- Icon Container -->
                            <div class="icon-container">
                                <!-- Floating Programming Languages -->
                                <div class="floating-languages">
                                    <div class="floating-tag html" title="HTML5" data-tooltip="HTML5"><i class="fab fa-html5"></i></div>
                                    <div class="floating-tag css" title="CSS3" data-tooltip="CSS3"><i class="fab fa-css3-alt"></i></div>
                                    <div class="floating-tag javascript" title="JavaScript" data-tooltip="JavaScript"><i class="fab fa-js"></i></div>
                                    <div class="floating-tag php" title="PHP" data-tooltip="PHP"><i class="fab fa-php"></i></div>
                                    <div class="floating-tag csharp" title="C# / .NET" data-tooltip="C# / .NET"><i class="fab fa-microsoft"></i></div>
                                    <div class="floating-tag laravel" title="Laravel" data-tooltip="Laravel"><i class="fab fa-laravel"></i></div>
                                </div>
                            </div>
                            
                            <!-- Dock Title -->
                            <h1 class="dock-title">Asif Ahmad</h1>
                            
                            <!-- Digital Clock -->
                            <div class="dock-clock" id="dockClock">
                                <div class="clock-time" id="clockTime"></div>
                                <div class="clock-date" id="clockDate"></div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Original Hero Text (hidden on scroll) -->
                    <header class="header">
                        <div class="hero-text" id="heroText">
                            <h1>Asif Ahmad</h1>
                            <span id="typed" aria-live="polite"></span>
                        </div>
                    </header>
                </div>
            </section>

            <!-- About Section -->
            <?php include './about-section.php'; ?>

            <!-- Portfolio Section -->
            <?php include './portfolio-section.php'; ?>

            <!-- Code Snippets Section -->
            <?php include './code-snippets-section.php'; ?>

            <!-- Scion Scheme Section -->
            <?php include './scs-scheme-section.php'; ?>

            <!-- Contact Form -->
            <?php include './contact-section.php'; ?>

            <!-- Footer with Social Links -->
            <footer class="footer" role="contentinfo">
                <div class="footer-content">
                    <p>© 2025 Asif Ahmad</p>
                    
                        </a>
                    </nav>
                </div>
            </footer>
        </main>
    </div>

    <!-- Schema.org markup -->
    <script type="application/ld+json">
    {
        "@context": "http://schema.org",
        "@type": "Person",
        "name": "Asif Ahmad",
        "jobTitle": "Full Stack Developer",
        "knowsAbout": ["PHP", "JavaScript", "C#", ".NET", "Laravel", "HTML5", "CSS3"],
        "makesOffer": {
            "@type": "Offer",
            "itemOffered": {
                "@type": "Service",
                "name": "Web Development Services",
                "description": "Full stack web development services including frontend and backend development"
            }
        }
    }
    </script>
    
    <!-- Third-party libraries -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="https://unpkg.com/typed.js@2.1.0/dist/typed.umd.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.5/dist/jquery.validate.min.js"></script>
    
    <!-- Custom scripts -->
    <script src="./js/script.js"></script>
    <script src="./js/home.js"></script>
    <script src="./js/header-dock.js"></script>
    <script src="./js/contact-form-new.js"></script>
</body>
</html>
