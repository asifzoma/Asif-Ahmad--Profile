            <!-- Code Snippets Section -->
            <section class="code-snippets">
                <h2 id="code-snippets">Code Snippets</h2>
                <div class="snippets-container">
                    <!-- HTML Snippet -->
                    <div class="snippet-card" data-language="html" data-code="&lt;!-- Responsive Navigation Component --&gt;
&lt;nav class=&quot;main-navigation&quot;&gt;
    &lt;div class=&quot;nav-container&quot;&gt;
        &lt;div class=&quot;nav-logo&quot;&gt;
            &lt;a href=&quot;#home&quot;&gt;Portfolio&lt;/a&gt;
        &lt;/div&gt;
        &lt;ul class=&quot;nav-menu&quot;&gt;
            &lt;li&gt;&lt;a href=&quot;#about&quot;&gt;About&lt;/a&gt;&lt;/li&gt;
            &lt;li&gt;&lt;a href=&quot;#portfolio&quot;&gt;Portfolio&lt;/a&gt;&lt;/li&gt;
            &lt;li&gt;&lt;a href=&quot;#contact&quot;&gt;Contact&lt;/a&gt;&lt;/li&gt;
        &lt;/ul&gt;
        &lt;div class=&quot;hamburger&quot;&gt;
            &lt;span&gt;&lt;/span&gt;
            &lt;span&gt;&lt;/span&gt;
            &lt;span&gt;&lt;/span&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/nav&gt;" data-explanation="This HTML structure creates a responsive navigation component with semantic markup and accessibility in mind. The navigation uses a container for proper alignment, includes a logo/brand area, and implements a hamburger menu for mobile devices. The structure follows modern HTML5 semantics with proper use of nav, ul, and li elements. The hamburger menu uses three span elements that can be styled with CSS to create the classic three-line mobile menu icon.">
                        <div class="snippet-header">
                            <i class="fab fa-html5 language-icon"></i>
                            <h3>Responsive Navigation</h3>
                        </div>
                        <p>Semantic HTML structure for responsive navigation with mobile hamburger menu.</p>
                        <button class="view-code-btn">View Code</button>
                    </div>

                    <!-- CSS Snippet -->
                    <div class="snippet-card" data-language="css" data-code="/* Modern Card Component with Glassmorphism */
.card {
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    padding: 2rem;
    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(31, 38, 135, 0.5);
    background: rgba(255, 255, 255, 0.35);
}

.card-title {
    margin-bottom: 1rem;
    color: var(--primary-color);
    font-weight: 600;
}" data-explanation="This CSS implements a modern glassmorphism design pattern with advanced visual effects. The card uses backdrop-filter for the frosted glass effect, rgba colors for transparency, and subtle borders. The hover state includes a smooth translate transform and enhanced shadows for depth. The cubic-bezier timing function provides a more natural animation feel. This approach creates a contemporary, premium look while maintaining excellent performance through hardware-accelerated CSS properties.">
                        <div class="snippet-header">
                            <i class="fab fa-css3-alt language-icon"></i>
                            <h3>Glassmorphism Card</h3>
                        </div>
                        <p>Modern CSS card design with glassmorphism effects and smooth animations.</p>
                        <button class="view-code-btn">View Code</button>
                    </div>

                    <!-- JavaScript Snippet -->
                    <div class="snippet-card" data-language="javascript" data-code="// Smooth Scroll Animation System
class SmoothScroller {
    constructor(options = {}) {
        this.duration = options.duration || 800;
        this.easing = options.easing || this.easeInOutCubic;
        this.offset = options.offset || 0;
    }

    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }

    scrollTo(target, callback) {
        const startPosition = window.pageYOffset;
        const targetPosition = target.getBoundingClientRect().top + startPosition - this.offset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / this.duration, 1);

            window.scrollTo(0, startPosition + distance * this.easing(progress));

            if (progress < 1) {
                requestAnimationFrame(animation);
            } else if (callback) {
                callback();
            }
        };

        requestAnimationFrame(animation);
    }
}" data-explanation="This JavaScript class creates a smooth scrolling system with customizable animations. It uses requestAnimationFrame for 60fps performance and implements cubic easing for natural motion. The class accepts configuration options for duration, easing function, and offset. The scrollTo method calculates the distance and animates the scroll position over time. This approach provides better control than CSS scroll-behavior and works across all browsers while maintaining excellent performance.">
                        <div class="snippet-header">
                            <i class="fab fa-js language-icon"></i>
                            <h3>Smooth Scroll System</h3>
                        </div>
                        <p>Advanced JavaScript class for smooth scrolling with custom easing and performance optimization.</p>
                        <button class="view-code-btn">View Code</button>
                    </div>

                    <!-- PHP Snippet -->
                    <div class="snippet-card" data-language="php" data-code="&lt;?php
// Secure Contact Form Handler
class ContactHandler {
    private $pdo;
    private $config;
    
    public function __construct($pdo, $config) {
        $this->pdo = $pdo;
        $this->config = $config;
    }
    
    public function processSubmission($data) {
        // Validate and sanitize input
        $name = filter_var($data['name'], FILTER_SANITIZE_STRING);
        $email = filter_var($data['email'], FILTER_VALIDATE_EMAIL);
        $message = filter_var($data['message'], FILTER_SANITIZE_STRING);
        
        if (!$name || !$email || !$message) {
            return ['success' => false, 'error' => 'Invalid input data'];
        }
        
        // Rate limiting check
        if (!$this->checkRateLimit($email)) {
            return ['success' => false, 'error' => 'Too many requests'];
        }
        
        // Store in database
        $stmt = $this->pdo->prepare(
            'INSERT INTO contact_messages (name, email, message, ip_address, created_at) VALUES (?, ?, ?, ?, NOW())'
        );
        
        if ($stmt->execute([$name, $email, $message, $_SERVER['REMOTE_ADDR']])) {
            $this->sendNotification($name, $email, $message);
            return ['success' => true, 'message' => 'Message sent successfully'];
        }
        
        return ['success' => false, 'error' => 'Failed to save message'];
    }
    
    private function checkRateLimit($email) {
        $stmt = $this->pdo->prepare(
            'SELECT COUNT(*) FROM contact_messages WHERE email = ? AND created_at > DATE_SUB(NOW(), INTERVAL 1 HOUR)'
        );
        $stmt->execute([$email]);
        return $stmt->fetchColumn() &lt; 3; // Max 3 per hour
    }
}" data-explanation="This PHP contact form handler implements enterprise-level security and functionality. It includes input validation and sanitization using filter_var(), rate limiting to prevent spam, prepared statements for SQL injection prevention, and IP address logging for security monitoring. The class uses dependency injection for the database connection and configuration, making it testable and maintainable. The rate limiting feature prevents abuse while the notification system ensures prompt response to legitimate inquiries.">
                        <div class="snippet-header">
                            <i class="fab fa-php language-icon"></i>
                            <h3>Secure Contact Handler</h3>
                        </div>
                        <p>Enterprise-grade PHP contact form with security, validation, and rate limiting.</p>
                        <button class="view-code-btn">View Code</button>
                    </div>

                    <!-- C# Coming Soon -->
                    <div class="snippet-card coming-soon" data-language="csharp">
                        <div class="snippet-header">
                            <i class="fab fa-microsoft language-icon"></i>
                            <h3>C# / .NET Examples</h3>
                        </div>
                        <p>Advanced C# code examples and .NET framework implementations coming soon...</p>
                        <div class="coming-soon-badge">Coming Soon</div>
                    </div>

                    <!-- Laravel Coming Soon -->
                    <div class="snippet-card coming-soon" data-language="laravel">
                        <div class="snippet-header">
                            <i class="fab fa-laravel language-icon"></i>
                            <h3>Laravel Framework</h3>
                        </div>
                        <p>Laravel PHP framework examples with Eloquent ORM and advanced features coming soon...</p>
                        <div class="coming-soon-badge">Coming Soon</div>
                    </div>
                </div>
            </section> 