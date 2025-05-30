<?php
// Step 1: Check if .env is loaded (if using vlucas/phpdotenv)
if (file_exists(__DIR__ . '/.env')) {
    echo ".env file exists\n";
    // Load .env if not already loaded
    if (!isset($_ENV['DB_HOST'])) {
        require_once __DIR__ . '/vendor/autoload.php';
        $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
        $dotenv->load();
        echo ".env loaded\n";
    }
} else {
    echo ".env file NOT found\n";
}

// Step 2: Print each environment variable
$vars = ['DB_HOST', 'DB_USER', 'DB_PASS', 'DB_NAME', 'DB_PORT'];
foreach ($vars as $var) {
    $val = isset($_ENV[$var]) ? $_ENV[$var] : '(not set)';
    echo "$var: $val" . PHP_EOL;
}

// Step 3: Attempt database connection and print errors
$host = $_ENV['DB_HOST'] ?? 'localhost';
$user = $_ENV['DB_USER'] ?? '';
$pass = $_ENV['DB_PASS'] ?? '';
$db   = $_ENV['DB_NAME'] ?? '';
$port = $_ENV['DB_PORT'] ?? 3306;

$conn = mysqli_connect($host, $user, $pass, $db, (int)$port);
if (!$conn) {
    die('Connection failed: ' . mysqli_connect_error());
} else {
    echo "Connected successfully\n";
    $sql = "INSERT INTO contacts (name, email, message) VALUES ('Test User', 'test@example.com', 'Hello! This is a test.')";
    if (mysqli_query($conn, $sql)) {
        echo "Test row inserted\n";
    } else {
        echo "Insert error: " . mysqli_error($conn) . "\n";
    }
    echo "Current DB: " . mysqli_get_host_info($conn) . "\n";
    mysqli_close($conn);
}
?> 