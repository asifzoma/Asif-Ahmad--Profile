<?php include 'header.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Asif Ahmad</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <script src="js/script.js" defer></script>
</head>

<body>  
    <div class="page-wrapper">
        <!-- Hamburger Menu -->
        <button class="hamburger-menu">
            <span></span>
            <span></span>
            <span></span>
        </button>

        <!-- Sidebar Container -->
        <nav id="navigator"class="sidebar-container">
            <div class="sidebar-header">
                <h3><a href="#about-accordion">AZA</a></h3>
            </div>
            <div class="sidebar-menu">
                <ul>
                    <li class="nav-tab"><a href="#about-accordion">About Me</a></li>
                    <li class="nav-tab"><a href='index.php#portfolio'>My Portfolio</a></li>
                    <li class="nav-tab"><a href="#code-snippets">Code Snippets</a></li>
                    <li class="nav-tab"><a href="scs-scheme.php#SCS-scheme">SCS Scheme</a></li>
                    <li class="nav-tab"><a href="#contact">Contact Me</a></li>
                </ul>
            </div>
            <div class="sidebar-social">
                <a href="https://github.com/asifzahma"><i class="fab fa-github"></i></a>
                <a href="https://www.linkedin.com/in/asifzahmad/"><i class="fab fa-linkedin"></i></a>
                <a href="https://discord.com/users/AsifZahmad"><i class="fab fa-discord"></i></a>
            </div>
        </nav>

        <!-- Main Content -->
        <div class="main-container">
            <!-- Header Section with Hero Image -->
            <div class="image-container">
                <header class="header">
                    <div class="hero-text">
                        <h1>Asif Ahmad</h1>
                        <span id="typed"></span>
                    </div>
                </header>
            </div>

            <!-- Banner -->
            <?php include 'about-section.php'; ?>

            <!-- Portfolio Section -->
            <?php include 'portfolio-section.php'; ?>

            <!-- Code Snippets Section -->
            <?php include 'code-snippets-section.php'; ?>

            <!-- Contact Form -->
            <?php include 'contact-section.php'; ?>

            <!-- Scion Scheme Section -->
            <?php include 'scs-scheme-section.php'; ?>

            <div class="footer">
                <p>© 2025 Asif Ahmad</p>
            </div>
        </div>
    </div>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="https://unpkg.com/typed.js@2.1.0/dist/typed.umd.js"></script>
    <!-- jQuery Validation Plugin -->
    <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.5/dist/jquery.validate.min.js"></script>
    <script src="js/home.js"></script>

    </body>
</html>
