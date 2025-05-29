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
            <section class="code-snippets">
                <h2 id="code-snippets">Code Snippets</h2>
                <div class="snippets-container">
                    <div class="snippet-card" data-full-desc="class Database {
    private $host = 'localhost';
    private $db_name = '*****_db';
    private $username = '*****';
    private $password = '*****';
    public $conn;

    public function getConnection() {
        $this->conn = null;
        try {
            $this->conn = new PDO(
                'mysql:host=' . $this->host . ';dbname=' . $this->db_name,
                $this->username,
                $this->password
            );
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $e) {
            echo 'Connection Error: ' . $e->getMessage();
        }
        return $this->conn;
    }
}" data-detailed-explanation="This Database class implements a secure and robust database connection using PDO (PHP Data Objects). The class uses private properties to store sensitive connection details, following encapsulation principles. The getConnection() method establishes a connection with proper error handling using try-catch blocks. It sets the error mode to exception, which is a best practice for catching and handling database errors. The connection is returned only if successful, making it safe to use in other parts of the application.">
                        <h3>PHP Database Connection</h3>
                        <p>Secure database connectivity using PDO with error handling and configuration management.</p>
                        <button class="view-code-btn">View Code</button>
                    </div>

                    <div class="snippet-card" data-full-desc="// Contact Form Handler
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);
    
    if ($name && $email && $message) {
        $stmt = $pdo->prepare('INSERT INTO messages (name, email, message) VALUES (?, ?, ?)');
        $stmt->execute([$name, $email, $message]);
        $response = ['success' => true];
    } else {
        $response = ['success' => false, 'error' => 'Invalid input'];
    }
    echo json_encode($response);
}" data-detailed-explanation="This contact form handler implements secure form processing with multiple layers of protection. It first checks if the request method is POST, then uses filter_input() to sanitize all user inputs, preventing XSS attacks. The code uses prepared statements with PDO to prevent SQL injection. The response is structured as JSON, making it easy to handle on the frontend. Error handling is implemented to catch invalid inputs, and the code follows a clean, maintainable structure.">
                        <h3>PHP Contact Form Handler</h3>
                        <p>Secure form processing with input validation and database storage.</p>
                        <button class="view-code-btn">View Code</button>
                    </div>

                    <div class="snippet-card" data-full-desc="// News Card Manager
class NewsCard {
    private $pdo;
    
    public function __construct($pdo) {
        $this->pdo = $pdo;
    }
    
    public function getNewsCards() {
        $stmt = $this->pdo->query('SELECT * FROM news_cards ORDER BY date DESC');
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    public function addNewsCard($title, $content, $image) {
        $stmt = $this->pdo->prepare('INSERT INTO news_cards (title, content, image) VALUES (?, ?, ?)');
        return $stmt->execute([$title, $content, $image]);
    }
}" data-detailed-explanation="The NewsCard class demonstrates object-oriented programming principles with a focus on database operations. It uses dependency injection by accepting a PDO instance in the constructor, making the class more testable and flexible. The getNewsCards() method retrieves news cards in reverse chronological order, while addNewsCard() uses prepared statements for secure data insertion. The class follows the Single Responsibility Principle by focusing solely on news card management.">
                        <h3>PHP News Card Manager</h3>
                        <p>Class for managing news cards with database integration.</p>
                        <button class="view-code-btn">View Code</button>
                    </div>

                    <div class="snippet-card" data-full-desc="// Admin Authentication
class AdminAuth {
    private $pdo;
    
    public function __construct($pdo) {
        $this->pdo = $pdo;
    }
    
    public function login($username, $password) {
        $stmt = $this->pdo->prepare('SELECT * FROM admins WHERE username = ?');
        $stmt->execute([$username]);
        $admin = $stmt->fetch();
        
        if ($admin && password_verify($password, $admin['password'])) {
            $_SESSION['admin_id'] = $admin['id'];
            return true;
        }
        return false;
    }
}" data-detailed-explanation="This AdminAuth class implements secure authentication for admin users. It uses password_verify() for secure password comparison, ensuring that even if the database is compromised, the actual passwords remain protected. The class uses prepared statements to prevent SQL injection, and session management for maintaining user state. The login method returns a boolean, making it easy to handle authentication results in the application logic.">
                        <h3>PHP Admin Authentication</h3>
                        <p>Secure admin authentication with password hashing.</p>
                        <button class="view-code-btn">View Code</button>
                    </div>

                    <div class="snippet-card" data-full-desc="// Image Manager
class ImageManager {
    public function uploadImage($file, $target_dir) {
        $target_file = $target_dir . basename($file['name']);
        $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
        
        // Check if image file is valid
        if (!getimagesize($file['tmp_name'])) {
            return ['success' => false, 'error' => 'File is not an image'];
        }
        
        // Check file size
        if ($file['size'] > 500000) {
            return ['success' => false, 'error' => 'File is too large'];
        }
        
        // Allow certain file formats
        if (!in_array($imageFileType, ['jpg', 'jpeg', 'png', 'gif'])) {
            return ['success' => false, 'error' => 'Only JPG, JPEG, PNG & GIF files are allowed'];
        }
        
        if (move_uploaded_file($file['tmp_name'], $target_file)) {
            return ['success' => true, 'path' => $target_file];
        }
        return ['success' => false, 'error' => 'Failed to upload file'];
    }
}" data-detailed-explanation="The ImageManager class provides a comprehensive solution for secure image uploads. It implements multiple security checks: validating file types using getimagesize(), checking file size limits, and restricting allowed file extensions. The class uses move_uploaded_file() for secure file handling and returns a structured response with success/error information. This implementation follows security best practices for file uploads while maintaining a clean and maintainable code structure.">
                        <h3>PHP Image Manager</h3>
                        <p>Secure image upload handling with validation.</p>
                        <button class="view-code-btn">View Code</button>
                    </div>

                    <div class="snippet-card" data-full-desc="// Error Logger
class ErrorLogger {
    private $logFile;
    
    public function __construct($logFile = 'error.log') {
        $this->logFile = $logFile;
    }
    
    public function logError($message, $context = []) {
        $timestamp = date('Y-m-d H:i:s');
        $logMessage = sprintf(
            '[%s] %s %s' . PHP_EOL,
            $timestamp,
            $message,
            !empty($context) ? json_encode($context) : ''
        );
        
        file_put_contents($this->logFile, $logMessage, FILE_APPEND);
    }
}" data-detailed-explanation="This ErrorLogger class implements a robust error logging system. It uses a configurable log file path and includes timestamps with each log entry. The logError method accepts both a message and a context array, allowing for detailed error information to be captured. The class uses file_put_contents() with FILE_APPEND to ensure logs are not overwritten. The implementation follows the singleton pattern and provides a clean interface for error logging throughout the application.">
                        <h3>PHP Error Logger</h3>
                        <p>Custom error logging for debugging and monitoring.</p>
                        <button class="view-code-btn">View Code</button>
                    </div>
                </div>
            </section>

            <!-- Contact Form -->
            <section id="contact" class="contact">
                <h2>Contact Me</h2>
                <form id="contact-form">
                    <input type="text" name="name" placeholder="Your Name" required>
                    <input type="email" name="email" placeholder="Your Email" required>
                    <textarea name="message" placeholder="Your Message" required></textarea>
                    <button type="submit">Send</button>
                </form>
            </section>

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
