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

// Check if .env file exists
if (!file_exists(__DIR__ . '/.env')) {
    $errorMsg = "Error: .env file not found at " . __DIR__ . "/.env\n";
    file_put_contents($debug_log, $errorMsg, FILE_APPEND);
    echo json_encode(['success' => false, 'errors' => ['general' => 'Server configuration error. Please contact the administrator.']]);
    exit;
}

// Load .env file manually (without Composer)
$env_vars = [];
$env_file = file_get_contents(__DIR__ . '/.env');
$lines = explode("\n", $env_file);
foreach ($lines as $line) {
    $line = trim($line);
    if (empty($line) || strpos($line, '#') === 0) continue;
    if (strpos($line, '=') !== false) {
        list($key, $value) = explode('=', $line, 2);
        $env_vars[trim($key)] = trim($value, '"\'');
    }
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

// Function to send email notification using PHP's built-in mail function
function sendEmailNotification($name, $email, $message, $log_file, $env_vars) {
    try {
        $to = $env_vars['ADMIN_EMAIL'] ?? 'asif.zoma.ahmad@gmail.com';
        $subject = 'New Contact Form Submission from ' . $name;
        
        $headers = array(
            'From: ' . ($env_vars['GMAIL_USERNAME'] ?? 'noreply@yourdomain.com'),
            'Reply-To: ' . $email,
            'Content-Type: text/html; charset=UTF-8',
            'X-Mailer: PHP/' . phpversion()
        );
        
        $body = "
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
        
        $mail_sent = mail($to, $subject, $body, implode("\r\n", $headers));
        
        if ($mail_sent) {
            file_put_contents($log_file, "Email sent successfully to " . $to . "\n", FILE_APPEND);
            return true;
        } else {
            file_put_contents($log_file, "Email failed to send using PHP mail() function. Check server's mail configuration.\n", FILE_APPEND);
            return false;
        }
    } catch (Exception $e) {
        file_put_contents($log_file, "Email error: " . $e->getMessage() . "\n", FILE_APPEND);
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
    $dsn = "mysql:host=" . ($env_vars['DB_HOST'] ?? 'localhost') . ";port=" . ($env_vars['DB_PORT'] ?? '3306') . ";dbname=" . ($env_vars['DB_NAME'] ?? 'Asif_db') . ";charset=utf8mb4";
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ];
    $pdo = new PDO($dsn, $env_vars['DB_USER'] ?? 'root', $env_vars['DB_PASS'] ?? '', $options);
    
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
$email_success = sendEmailNotification($name, $email, $message, $debug_log, $env_vars);

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
    echo json_encode(['success' => false, 'errors' => ['general' => 'There was an error processing your message. Please try again.']]);
}

file_put_contents($debug_log, "--- Script finished at " . date('Y-m-d H:i:s') . " ---\n\n", FILE_APPEND);
?>