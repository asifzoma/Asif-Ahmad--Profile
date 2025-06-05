            <!-- Contact Form -->
            <section id="contact" class="contact">
                <h2>Contact Me</h2>
                <p class="contact-description">Have a project in mind? Let's work together to bring your ideas to life.</p>
                
                <!-- Consolidated Error Messages Container -->
                <div class="error-messages-container" id="all-error-messages-container" style="display: none;">
                    <h3 class="error-messages-title">Please fix the following errors:</h3>
                    <ul class="error-messages-list" id="all-error-messages-list">
                        <!-- All error messages will be populated here by JavaScript -->
                    </ul>
                </div>
                
                <!-- Success Message Container -->
                <div class="form-success" id="form-success">
                    <span class="success-icon">✓</span>
                    Thank you! Your message has been received successfully.
                </div>
                
                <form id="contact-form" action="contact_submit.php" method="POST" novalidate>
                    <div class="form-group">
                        <label for="name">Full Name</label>
                        <input type="text" id="name" name="name" placeholder="Enter your full name" required>
                        <div class="field-error" id="name-error"></div>
                    </div>
                    
                    <div class="form-group">
                        <label for="email">Email Address</label>
                        <input type="email" id="email" name="email" placeholder="Enter your email address" required>
                        <div class="field-error" id="email-error"></div>
                    </div>
                    
                    <div class="form-group">
                        <label for="message">Message</label>
                        <textarea id="message" name="message" placeholder="Tell me about your project or any questions you have..." required></textarea>
                        <div class="field-error" id="message-error"></div>
                    </div>
                    
                    <button type="submit" id="submit-btn">Send Message</button>
                </form>
            </section> 