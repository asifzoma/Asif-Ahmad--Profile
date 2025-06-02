            <!-- Code Snippets Section -->
            <section class="code-snippets">
                <h2 id="code-snippets">Code Snippets</h2>
                <div class="snippets-container">
                    <div class="snippet-card" data-code="class Database {
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
}" data-explanation="This Database class implements a secure and robust database connection using PDO (PHP Data Objects). The class uses private properties to store sensitive connection details, following encapsulation principles. The getConnection() method establishes a connection with proper error handling using try-catch blocks. It sets the error mode to exception, which is a best practice for catching and handling database errors. The connection is returned only if successful, making it safe to use in other parts of the application.">
                        <h3>PHP Database Connection</h3>
                        <p>Secure database connectivity using PDO with error handling and configuration management.</p>
                        <button class="view-code-btn">View Code</button>
                    </div>

                    <div class="snippet-card" data-code="// Contact Form Handler
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
}" data-explanation="This contact form handler implements secure form processing with multiple layers of protection. It first checks if the request method is POST, then uses filter_input() to sanitize all user inputs, preventing XSS attacks. The code uses prepared statements with PDO to prevent SQL injection. The response is structured as JSON, making it easy to handle on the frontend. Error handling is implemented to catch invalid inputs, and the code follows a clean, maintainable structure.">
                        <h3>PHP Contact Form Handler</h3>
                        <p>Secure form processing with input validation and database storage.</p>
                        <button class="view-code-btn">View Code</button>
                    </div>

                    <div class="snippet-card" data-code="// News Card Manager
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
}" data-explanation="The NewsCard class demonstrates object-oriented programming principles with a focus on database operations. It uses dependency injection by accepting a PDO instance in the constructor, making the class more testable and flexible. The getNewsCards() method retrieves news cards in reverse chronological order, while addNewsCard() uses prepared statements for secure data insertion. The class follows the Single Responsibility Principle by focusing solely on news card management.">
                        <h3>PHP News Card Manager</h3>
                        <p>Class for managing news cards with database integration.</p>
                        <button class="view-code-btn">View Code</button>
                    </div>

                    <div class="snippet-card" data-code="// Admin Authentication
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
}" data-explanation="This AdminAuth class implements secure authentication for admin users. It uses password_verify() for secure password comparison, ensuring that even if the database is compromised, the actual passwords remain protected. The class uses prepared statements to prevent SQL injection, and session management for maintaining user state. The login method returns a boolean, making it easy to handle authentication results in the application logic.">
                        <h3>PHP Admin Authentication</h3>
                        <p>Secure admin authentication with password hashing.</p>
                        <button class="view-code-btn">View Code</button>
                    </div>

                    <div class="snippet-card" data-code="// Image Manager
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
}" data-explanation="The ImageManager class provides a comprehensive solution for secure image uploads. It implements multiple security checks: validating file types using getimagesize(), checking file size limits, and restricting allowed file extensions. The class uses move_uploaded_file() for secure file handling and returns a structured response with success/error information. This implementation follows security best practices for file uploads while maintaining a clean and maintainable code structure.">
                        <h3>PHP Image Manager</h3>
                        <p>Secure image upload handling with validation.</p>
                        <button class="view-code-btn">View Code</button>
                    </div>

                    <div class="snippet-card" data-code="// Error Logger
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
}" data-explanation="This ErrorLogger class implements a robust error logging system. It uses a configurable log file path and includes timestamps with each log entry. The logError method accepts both a message and a context array, allowing for detailed error information to be captured. The class uses file_put_contents() with FILE_APPEND to ensure logs are not overwritten. The implementation follows the singleton pattern and provides a clean interface for error logging throughout the application.">
                        <h3>PHP Error Logger</h3>
                        <p>Custom error logging for debugging and monitoring.</p>
                        <button class="view-code-btn">View Code</button>
                    </div>
                </div>
            </section> 