// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const successContainer = document.getElementById('form-success');
    
    // Form fields
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const messageField = document.getElementById('message');
    
    // Individual error containers
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
// Completely disable browser validation to prevent duplicate error messages
form.noValidate = true;
[nameField, emailField, messageField].forEach(field => {
    field.removeAttribute('required');
    field.addEventListener('invalid', function(e) { e.preventDefault(); });
});
    
    // Apply automatic contrast classes on page load
    function applyContrastClasses() {
        const fields = [nameField, emailField, messageField];
        
        fields.forEach(field => {
            // Check the computed style for placeholder color
            const computedStyle = window.getComputedStyle(field);
            const placeholderColor = computedStyle.getPropertyValue('--placeholder-color') || 'rgba(0, 0, 0, 0.5)';
            
            // If placeholder color starts with rgba(0, 0, 0 or rgb(0, 0, 0, it's dark
            if (placeholderColor.includes('rgba(0, 0, 0') || placeholderColor.includes('rgb(0, 0, 0')) {
                field.classList.add('dark-placeholder');
                field.classList.remove('light-placeholder');
            } else if (placeholderColor.includes('rgba(255, 255, 255') || placeholderColor.includes('rgb(255, 255, 255')) {
                field.classList.add('light-placeholder');
                field.classList.remove('dark-placeholder');
            }
        });
    }
    
    // Apply contrast classes when page loads
    applyContrastClasses();
    
    // Real-time validation
    function validateField(field, errorContainer) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Clear previous error state
        field.classList.remove('error', 'valid');
        errorContainer.classList.remove('show');
        errorContainer.textContent = '';
        
        switch (field.name) {
            case 'name':
                if (!value) {
                    errorMessage = 'Name is required';
                    isValid = false;
                } else if (value.length < 2) {
                    errorMessage = 'Name must be at least 2 characters long';
                    isValid = false;
                } else if (value.length > 100) {
                    errorMessage = 'Name must be less than 100 characters';
                    isValid = false;
                } else if (!/^[a-zA-Z\s\'-]+$/.test(value)) {
                    errorMessage = 'Name can only contain letters, spaces, hyphens, and apostrophes';
                    isValid = false;
                }
                break;
                
            case 'email':
                if (!value) {
                    errorMessage = 'Email is required';
                    isValid = false;
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    errorMessage = 'Please enter a valid email address';
                    isValid = false;
                } else if (value.length > 254) {
                    errorMessage = 'Email address is too long';
                    isValid = false;
                }
                break;
                
            case 'message':
                if (!value) {
                    errorMessage = 'Message is required';
                    isValid = false;
                } else if (value.length < 10) {
                    errorMessage = 'Message must be at least 10 characters long';
                    isValid = false;
                } else if (value.length > 5000) {
                    errorMessage = 'Message must be less than 5000 characters';
                    isValid = false;
                }
                break;
        }
        
        if (!isValid) {
            field.classList.add('error');
            errorContainer.textContent = errorMessage;
            errorContainer.classList.add('show');
        } else if (value) {
            field.classList.add('valid');
        }
        
        return isValid;
    }
    
    // Real-time validation listeners
    nameField.addEventListener('blur', () => validateField(nameField, nameError));
    emailField.addEventListener('blur', () => validateField(emailField, emailError));
    messageField.addEventListener('blur', () => validateField(messageField, messageError));
    
    // Input event listeners for immediate feedback
    nameField.addEventListener('input', () => {
        if (nameField.classList.contains('error')) {
            validateField(nameField, nameError);
        }
    });
    
    emailField.addEventListener('input', () => {
        if (emailField.classList.contains('error')) {
            validateField(emailField, emailError);
        }
    });
    
    messageField.addEventListener('input', () => {
        if (messageField.classList.contains('error')) {
            validateField(messageField, messageError);
        }
    });
    
    // Clear all error states
    function clearErrors() {
        // Hide success container when clearing errors
        successContainer.classList.remove('show');
        
        // Clear individual field errors
        document.querySelectorAll('.field-error').forEach(error => {
            error.classList.remove('show');
            error.textContent = '';
        });
        
        // Clear field error states
        document.querySelectorAll('.form-group input, .form-group textarea').forEach(field => {
            field.classList.remove('error', 'valid');
        });
    }
    
    // Display errors from server response
    function displayErrors(errors) {
        clearErrors();
        
        // Display field-specific errors
        if (errors.name) {
            nameField.classList.add('error');
            nameError.textContent = errors.name;
            nameError.classList.add('show');
        }
        
        if (errors.email) {
            emailField.classList.add('error');
            emailError.textContent = errors.email;
            emailError.classList.add('show');
        }
        
        if (errors.message) {
            messageField.classList.add('error');
            messageError.textContent = errors.message;
            messageError.classList.add('show');
        }
        
        // If there's a general error, show it in the first error field
        if (errors.general) {
            nameField.classList.add('error');
            nameError.textContent = errors.general;
            nameError.classList.add('show');
        }
        
        // Scroll to first error
        const firstError = document.querySelector('.field-error.show');
        if (firstError) {
            firstError.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }
    }
    
    // Display success message
    function displaySuccess(message) {
        // Completely clear all error states and messages first
        clearErrors();
        
        // Show success message
        successContainer.classList.add('show');
        form.classList.add('success');
        
        // Scroll to success message
        successContainer.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
        
        // Reset form after delay
        setTimeout(() => {
            form.reset();
            form.classList.remove('success');
            successContainer.classList.remove('show');
            
            // Clear validation states
            document.querySelectorAll('.form-group input, .form-group textarea').forEach(field => {
                field.classList.remove('error', 'valid');
            });
            
            // Reapply contrast classes after reset
            applyContrastClasses();
        }, 5000);
    }
    
    // Form submission handler
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Clear previous errors
        clearErrors();
        
        // Client-side validation
        const nameValid = validateField(nameField, nameError);
        const emailValid = validateField(emailField, emailError);
        const messageValid = validateField(messageField, messageError);
        
        if (!nameValid || !emailValid || !messageValid) {
            // Scroll to first error
            const firstError = document.querySelector('.field-error.show');
            if (firstError) {
                firstError.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }
            return;
        }
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        form.classList.add('validating');
        
        try {
            // Prepare form data
            const formData = new FormData(form);
            
            // Submit form via AJAX
            const response = await fetch('contact_submit.php', {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            
            if (result.success) {
                displaySuccess(result.message);
            } else {
                displayErrors(result.errors);
            }
            
        } catch (error) {
            console.error('Form submission error:', error);
            displayErrors({
                general: 'There was an error submitting your message. Please check your internet connection and try again.'
            });
        } finally {
            // Reset loading state
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
            form.classList.remove('validating');
        }
    });
    
    // Handle form reset
    form.addEventListener('reset', function() {
        clearErrors();
        
        // Clear validation states
        document.querySelectorAll('.form-group input, .form-group textarea').forEach(field => {
            field.classList.remove('error', 'valid');
        });
        
        // Reapply contrast classes after reset
        setTimeout(() => applyContrastClasses(), 100);
    });
}); 
