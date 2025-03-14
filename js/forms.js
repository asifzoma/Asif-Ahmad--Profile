// Form validation functionality
$(document).ready(function() {
    try {
        // Contact form validation
        $("#contact-form").validate({
            // Improved accessibility
            errorElement: "span",
            
            // Define validation rules
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                email: {
                    required: true,
                    email: true
                },
                message: {
                    required: true,
                    minlength: 10
                }
            },
            
            // Custom error messages
            messages: {
                name: {
                    required: "Please enter your name",
                    minlength: "Your name must consist of at least 2 characters"
                },
                email: {
                    required: "Please enter your email address",
                    email: "Please enter a valid email address"
                },
                message: {
                    required: "Please enter a message",
                    minlength: "Your message must be at least 10 characters long"
                }
            },
            
            // Submit handler
            submitHandler: function(form) {
                alert("Thank you for your message! I will get back to you soon.");
                form.reset();
                return false; // Prevent actual form submission
            }
        });
    } catch (e) {
        console.error("Form validation error:", e);
    }
}); 