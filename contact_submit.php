<?php
# Database 
// $DB_HOST = 'localhost';
// $DB_USER = 'root';
// $DB_PASS = '';
// $DB_NAME = 'Asif_db';
// $DB_PORT = 3306;

// Set content type to JSON for AJAX responses
header('Content-Type: application/json');

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Load Composer's autoloader from the project root
require_once __DIR__ . '/vendor/autoload.php';

// Import PHPMailer classes
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

file_put_contents(__DIR__ . '/debug.log', "Script hit\n", FILE_APPEND);
file_put_contents(__DIR__ . '/debug.log', print_r($_POST, true), FILE_APPEND);

// Load .env file from the project root
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Database connection settings
$servername = $_ENV['DB_HOST'];
$username = $_ENV['DB_USER'];
$password = $_ENV['DB_PASS'];
$dbname = $_ENV['DB_NAME'];
$port = $_ENV['DB_PORT'];

// Create connection
$conn = "mysql:host=$servername;port=$port;dbname=$dbname;charset=utf8mb4";

$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

// Function to validate input and return errors
function validateInput($name, $email, $message) {
    $errors = [];
    
    // Validate name
    if (empty($name)) {
        $errors['name'] = 'Name is required';
    } elseif (strlen($name) < 2) {
        $errors['name'] = 'Name must be at least 2 characters long';
    } elseif (strlen($name) > 100) {
        $errors['name'] = 'Name must be less than 100 characters';
    } elseif (!preg_match('/^[a-zA-Z\s\'-]+$/', $name)) {
        $errors['name'] = 'Name can only contain letters, spaces, hyphens, and apostrophes';
    }
    
    // Validate email
    if (empty($email)) {
        $errors['email'] = 'Email is required';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'Please enter a valid email address';
    } elseif (strlen($email) > 254) {
        $errors['email'] = 'Email address is too long';
    }
    
    // Validate message
    if (empty($message)) {
        $errors['message'] = 'Message is required';
    } elseif (strlen($message) < 10) {
        $errors['message'] = 'Message must be at least 10 characters long';
    } elseif (strlen($message) > 5000) {
        $errors['message'] = 'Message must be less than 5000 characters';
    }
    
    return $errors;
}

// Function to send email notification
function sendEmailNotification($name, $email, $message) {
    try {
        $mail = new PHPMailer(true);
        
        // Server settings
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = $_ENV['GMAIL_USERNAME'];
        $mail->Password = $_ENV['GMAIL_APP_PASSWORD'];
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;
        
        // Recipients
        $mail->setFrom($_ENV['GMAIL_USERNAME'], 'Contact Form');
        $mail->addAddress($_ENV['ADMIN_EMAIL']);
        $mail->addReplyTo($email, $name);
        
        // Content
        $mail->isHTML(true);
        $mail->Subject = 'New Contact Form Submission';
        $mail->Body = "
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> {$name}</p>
            <p><strong>Email:</strong> {$email}</p>
            <p><strong>Message:</strong></p>
            <p>" . nl2br(htmlspecialchars($message)) . "</p>
        ";
        
        $mail->send();
        return true;
    } catch (Exception $e) {
        file_put_contents(__DIR__ . '/debug.log', "Email error: " . $e->getMessage() . "\n", FILE_APPEND);
        return false;
    }
}

try {
    // Create PDO instance
    $pdo = new PDO($conn, $username, $password, $options);
    
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Check if required fields are present
        if (!isset($_POST['name'], $_POST['email'], $_POST['message'])) {
            echo json_encode([
                'success' => false,
                'errors' => ['general' => 'All fields are required. Please fill out the complete form.']
            ]);
            exit;
        }
        
        $name = trim($_POST['name']);
        $email = trim($_POST['email']);
        $message = trim($_POST['message']);
        
        // Validate all inputs and collect errors
        $errors = validateInput($name, $email, $message);
        
        // If there are validation errors, return them all at once
        if (!empty($errors)) {
            echo json_encode([
                'success' => false,
                'errors' => $errors
            ]);
            exit;
        }
        
        // If validation passes, insert into database
        $stmt = $pdo->prepare("INSERT INTO contacts (name, email, message, submitted_at) VALUES (?, ?, ?, NOW())");
        
        if ($stmt->execute([$name, $email, $message])) {
            // Try to send email notification
            $emailSent = sendEmailNotification($name, $email, $message);
            
            echo json_encode([
                'success' => true,
                'message' => 'Thank you! Your message has been received successfully. I\'ll get back to you soon.' . 
                            (!$emailSent ? ' (Note: Email notification could not be sent)' : '')
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'errors' => ['general' => 'There was an error saving your message. Please try again.']
            ]);
        }
    } else {
        echo json_encode([
            'success' => false,
            'errors' => ['general' => 'Invalid request method. Please submit the form properly.']
        ]);
    }

} catch (PDOException $e) {
    // Handle database errors
    file_put_contents(__DIR__ . '/debug.log', "Database error: " . $e->getMessage() . "\n", FILE_APPEND);
    echo json_encode([
        'success' => false,
        'errors' => ['general' => 'Database connection error. Please try again later.']
    ]);
}

file_put_contents(__DIR__ . '/debug.log', "Script completed\n", FILE_APPEND);
?>