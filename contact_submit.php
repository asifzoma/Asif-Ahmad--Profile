<?php
# Database 
// $DB_HOST = 'localhost';
// $DB_USER = 'root';
// $DB_PASS = '';
// $DB_NAME = 'Asif_db';
// $DB_PORT = 3306;




ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

file_put_contents(__DIR__ . '/debug.log', "Script hit\n", FILE_APPEND);
file_put_contents(__DIR__ . '/debug.log', print_r($_POST, true), FILE_APPEND);

// Load Composer's autoloader from the project root
require_once __DIR__ . '/vendor/autoload.php';

// Load .env file from the project root
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

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

try {
    // Create PDO instance
    $pdo = new PDO($conn, $username, $password, $options);
    
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['name'], $_POST['email'], $_POST['message'])) {
        $name = trim($_POST['name']);
        $email = trim($_POST['email']);
        $message = trim($_POST['message']);

        // Prepare the statement
        $stmt = $pdo->prepare("INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)");
        
        // Execute with parameters as an array
        if ($stmt->execute([$name, $email, $message])) {
            echo "Thank you! Your message has been received.";
        } else {
            echo "Error: " . $stmt->errorInfo()[2];
        }
    } else {
        echo '<div style="color: red; font-weight: bold;">Error: This page should only be accessed via the contact form. Please fill out the form on the <a href="index.php">contact page</a>.</div>';
        exit;
    }

} catch (PDOException $e) {
    // Handle errors
    die("Database error: " . $e->getMessage());
}

file_put_contents(__DIR__ . '/debug.log', "Script hit\n", FILE_APPEND);
file_put_contents(__DIR__ . '/debug.log', print_r($_POST, true), FILE_APPEND);

// (Your existing form handling code here)
// ?>