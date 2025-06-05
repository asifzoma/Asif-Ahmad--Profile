<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Asif Ahmad - Full Stack Developer</title>
    
    <!-- Primary CSS -->
    <link rel="stylesheet" href="css/style.min.css">
    <!-- Fallback for minified CSS -->
    <link rel="stylesheet" href="css/style.css">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    
    <!-- Preload critical assets -->
    <link rel="preload" href="css/style.min.css" as="style">
    <link rel="preload" href="https://fonts.googleapis.com" as="font" crossorigin>
    
    <!-- Ensure CSS loads in older browsers -->
    <noscript>
        <link rel="stylesheet" href="css/style.css">
    </noscript>
</head>
<body>
    <div class="page-wrapper">
        <!-- Hamburger Menu with separate icons -->
        <button class="hamburger-menu" id="navToggle" aria-label="Toggle navigation">
            <!-- Hamburger Icon -->
            <span class="hamburger-icon">
                <span class="line"></span>
                <span class="line"></span>
                <span class="line"></span>
            </span>
            
            <!-- Close Icon -->
            <span class="close-icon">
                <span class="line"></span>
                <span class="line"></span>
            </span>
        </button>

        <!-- Sidebar Container -->
        <nav id="navigator" class="sidebar-container">
            <div class="sidebar-header">
                <h3><a href="index.php">AZA</a></h3>
            </div>
            <div class="sidebar-menu">
                <ul>
                    <li class="nav-tab"><a href="#about-accordion">About Me</a></li>
                    <li class="nav-tab"><a href='index.php#portfolio'>My Portfolio</a></li>
                    <li class="nav-tab"><a href="#code-snippets">Code Snippets</a></li>
                    <li class="nav-tab"><a href="#scion-scheme-section">SCS Scheme</a></li>
                    <li class="nav-tab"><a href="#contact">Contact Me</a></li>
                </ul>
            </div>
            <div class="sidebar-social">
                <a href="https://github.com/asifzoma"><i class="fab fa-github"></i></a>
                <a href="https://www.linkedin.com/in/asifzahmad/"><i class="fab fa-linkedin"></i></a>
                <a href="https://discord.com/users/AsifZahmad"><i class="fab fa-discord"></i></a>
            </div>
        </nav> 
    </div>
</body>
</html> 