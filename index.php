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
            <section class="banner">
                <h1>Welcome to My Portfolio</h1>
                <p>Showcasing my journey into web development</p>
                <!-- About Me Accordion -->
            <div id="about-accordion" class="about-accordion">
                <button class="accordion-btn">About Me <i class="fas fa-chevron-down"></i></button>
                <div class="accordion-content">
                    <p>
                    I'm Asif, a Full Stack Web Developer passionate about designing and developing dynamic, user-friendly applications. 
                        <p> My journey into web development began with a genuine curiosity about technology and a desire to create digital solutions that make a real difference. I have developed a strong foundation in both front-end and back-end development, with hands-on experience in HTML, CSS, JavaScript, and PHP. </p>
                         <p> I am committed to building efficient, scalable, and innovative web applications that solve real-world problems. My experience spans the entire development lifecycle, from designing intuitive user interfaces to implementing robust server-side logic. </p>
                         <p> Beyond coding, I am passionate about business strategy, problem-solving, and user experience design. These interests enable me to deliver well-rounded applications that provide tangible value to users and stakeholders. I am eager to contribute my skills and enthusiasm to a forward-thinking team, and I look forward to collaborating on impactful projects that drive business success. </p>
                    </p>
                    </div>
                </div>
            </section>

            

            <!-- Portfolio Section -->
            <?php include 'portfolio-section.php'; ?>

            <!-- Code Snippets Section -->
            <?php include 'code-snippets-section.php'; ?>

            <!-- Contact Form -->
            <?php include 'contact-section.php'; ?>

            <!-- Scion Scheme Section -->
            <section class="scion-scheme-section" id="scion-scheme-section">
                <div class="scion-card">
                    <h2 style="text-align:center;">SCS Scheme</h2>
                     <p>
                        The Scion Coalition Scheme is an intensive, specially tailored training program run by Netmatters in order to give willing candidates the opportunity to enter the industry as web developers. Under the supervision of senior web developers, scions generally aim to complete training within six to nine months. The course is intensive and therefore the level of learning achieved is extensive in a short space of time.
                    </p>
                    <h3>Treehouse</h3>
                    <p>
                        Treehouse is an online learning community, featuring videos covering a number of topics from basic HTML to C# programming, iOS development, data analysis, and more. By completing courses users can earn points, allowing them to track their progress and see how much they've covered in certain areas.
                    </p>
                    <p><strong>Total Score</strong> <a href="https://teamtreehouse.com/asifzomaahmad" target="_blank">teamtreehouse.com/asifzomaahmad</a></p>
                    <h3>About Netmatters</h3>
                    <ul style="text-align:left; display:inline-block; margin: 0 auto;">
                        <li>Established in 2008</li>
                        <li>Norfolk's leading technology company</li>
                        <li>Winner of the Princess Royal Training Award</li>
                        <li>Winner of EDP Skills of Tomorrow Award</li>
                        <li>80+ staff, 2 locations across Norfolk</li>
                        <li>Digital Marketing, Website & Software development & IT Support</li>
                        <li>Broad spectrum of clients, working nationwide</li>
                        <li>Operate to strict company values</li>
                    </ul>
                </div>
            </section>

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
    <script src="js/common.js"></script>
</body>
</html>
<?php include 'footer.php'; ?>
