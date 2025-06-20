<?php
# Database 
// $DB_HOST = 'localhost';
// $DB_USER = 'root';
// $DB_PASS = '';
// $DB_NAME = 'Asif_db';
// $DB_PORT = 3306;

// Set content type to JSON for AJAX responses
header('Content-Type: application/json');

// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Use a more reliable path for the log file
$debug_log = __DIR__ . '/debug.log';
file_put_contents($debug_log, "--- Script hit at " . date('Y-m-d H:i:s') . " ---\n", FILE_APPEND);
file_put_contents($debug_log, "POST data: " . print_r($_POST, true) . "\n", FILE_APPEND);

// Check if Composer autoloader exists
if (!file_exists(__DIR__ . '/vendor/autoload.php')) {
    $errorMsg = "Error: Composer autoloader not found. Please run 'composer install'.\n";
    file_put_contents($debug_log, $errorMsg, FILE_APPEND);
    echo json_encode(['success' => false, 'errors' => ['general' => 'Server configuration error. Please contact the administrator.']]);
    exit;
}

// Load Composer's autoloader
require_once __DIR__ . '/vendor/autoload.php';

// Import PHPMailer classes
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Check if .env file exists
if (!file_exists(__DIR__ . '/.env')) {
    $errorMsg = "Error: .env file not found at " . __DIR__ . "/.env\n";
    file_put_contents($debug_log, $errorMsg, FILE_APPEND);
    echo json_encode(['success' => false, 'errors' => ['general' => 'Server configuration error. Please contact the administrator.']]);
    exit;
}

// Load .env file using dotenv
try {
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
    $dotenv->load();
} catch (Exception $e) {
    file_put_contents($debug_log, "Error loading .env: " . $e->getMessage() . "\n", FILE_APPEND);
    echo json_encode(['success' => false, 'errors' => ['general' => 'Server configuration error. Please contact the administrator.']]);
    exit;
}

// Function to validate input and return errors
function validateInput($name, $email, $message) {
    $errors = [];
    if (empty($name)) { $errors['name'] = 'Name is required'; }
    elseif (strlen($name) < 2) { $errors['name'] = 'Name must be at least 2 characters long'; }
    if (empty($email)) { $errors['email'] = 'Email is required'; }
    elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) { $errors['email'] = 'Please enter a valid email address'; }
    if (empty($message)) { $errors['message'] = 'Message is required'; }
    elseif (strlen($message) < 10) { $errors['message'] = 'Message must be at least 10 characters long'; }
    return $errors;
}

// Function to send email notification using PHPMailer
function sendEmailNotification($name, $email, $message, $log_file) {
    try {
        $mail = new PHPMailer(true);
        
        // Server settings for Mailpit
        $mail->isSMTP();
        $mail->Host = $_ENV['GMAIL_HOST'] ?? 'localhost';
        $mail->Port = $_ENV['GMAIL_PORT'] ?? 1025;
        $mail->SMTPAuth = false; // Mailpit doesn't require authentication
        $mail->SMTPSecure = false; // No encryption for local Mailpit
        $mail->SMTPAutoTLS = false;
        
        // Recipients
        $mail->setFrom($_ENV['GMAIL_USERNAME'] ?? 'from@example.com', 'Portfolio Contact Form');
        $mail->addAddress($_ENV['ADMIN_EMAIL']);
        $mail->addReplyTo($email, $name);
        
        // Content
        $mail->isHTML(true);
        $mail->Subject = 'New Contact Form Submission from ' . $name;
        $mail->Body = "
        <html>
        <body>
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> " . htmlspecialchars($name) . "</p>
            <p><strong>Email:</strong> " . htmlspecialchars($email) . "</p>
            <p><strong>Message:</strong></p>
            <p>" . nl2br(htmlspecialchars($message)) . "</p>
        </body>
        </html>
        ";
        
        $mail->send();
        file_put_contents($log_file, "Email sent successfully via PHPMailer to " . $_ENV['ADMIN_EMAIL'] . "\n", FILE_APPEND);
        return true;
    } catch (Exception $e) {
        file_put_contents($log_file, "PHPMailer error: " . $mail->ErrorInfo . "\n", FILE_APPEND);
        return false;
    }
}

// --- Main Script Logic ---
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'errors' => ['general' => 'Invalid request method.']]);
    exit;
}

$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$message = trim($_POST['message'] ?? '');

$errors = validateInput($name, $email, $message);
if (!empty($errors)) {
    echo json_encode(['success' => false, 'errors' => $errors]);
    exit;
}

// Database and Email processing
$db_success = false;
$email_success = false;

// 1. Try to save to Database
try {
    $dsn = "mysql:host=" . $_ENV['DB_HOST'] . ";port=" . $_ENV['DB_PORT'] . ";dbname=" . $_ENV['DB_NAME'] . ";charset=utf8mb4";
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ];
    $pdo = new PDO($dsn, $_ENV['DB_USER'], $_ENV['DB_PASS'], $options);
    
    $tableCheck = $pdo->query("SHOW TABLES LIKE 'contacts'");
    if ($tableCheck->rowCount() == 0) {
        $createTable = "CREATE TABLE contacts (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(254) NOT NULL,
            message TEXT NOT NULL,
            submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )";
        $pdo->exec($createTable);
        file_put_contents($debug_log, "Created 'contacts' table.\n", FILE_APPEND);
    }
    
    $stmt = $pdo->prepare("INSERT INTO contacts (name, email, message, submitted_at) VALUES (?, ?, ?, NOW())");
    $db_success = $stmt->execute([$name, $email, $message]);
    if($db_success) {
        file_put_contents($debug_log, "Database insert successful.\n", FILE_APPEND);
    }
} catch (PDOException $e) {
    file_put_contents($debug_log, "Database error: " . $e->getMessage() . "\n", FILE_APPEND);
}

// 2. Try to send Email
$email_success = sendEmailNotification($name, $email, $message, $debug_log);

// 3. Determine final response
if ($db_success || $email_success) {
    $success_message = "Thank you! Your message has been received.";
    if (!$email_success && $db_success) {
        $success_message = "Your message was saved successfully.";
    }
    if (!$db_success && $email_success) {
        $success_message = "Your message was sent successfully by email.";
    }
    echo json_encode(['success' => true, 'message' => $success_message]);
} else {
    echo json_encode(['success' => false, 'errors' => ['general' => 'A critical error occurred. Please contact the administrator.']]);
}

file_put_contents($debug_log, "--- Script finished at " . date('Y-m-d H:i:s') . " ---\n\n", FILE_APPEND);
?>