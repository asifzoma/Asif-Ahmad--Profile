// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const submitButton = document.getElementById('submit-btn');
    const errorContainer = document.getElementById('all-error-messages-container');
    const errorList = document.getElementById('all-error-messages-list');
    const successToaster = document.getElementById('success-toaster');
    
    // Form fields
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const messageField = document.getElementById('message');
    
    // Individual error containers
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    
    // Prevent default browser validation UI for all fields
    const fieldsToValidate = [nameField, emailField, messageField];
    fieldsToValidate.forEach(field => {
        field.addEventListener('invalid', function(event) {
            // event.preventDefault(); // Allow browser default validation bubble
            event.stopPropagation(); // Still stop propagation if other listeners exist
        });
        // Also ensure custom validity is cleared on input, so our JS validation can take over for the consolidated list
        field.addEventListener('input', function() {
            field.setCustomValidity(''); 
        });
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
        
        // Clear previous custom error styling from field itself (border, background)
        field.classList.remove('error', 'valid');
        // No longer interact with individual errorContainer (e.g., nameError.textContent = ...)
        // errorContainer.classList.remove('show');
        // errorContainer.textContent = '';
        
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
            field.classList.add('error'); // Keep this to style the field itself (e.g., red border)
            // No longer show message in individual errorContainer
            // errorContainer.textContent = errorMessage;
            // errorContainer.classList.add('show');
        } else if (value) {
            field.classList.add('valid'); // Keep this to style the field itself (e.g., green border)
        }
        
        // Return the error message so it can be added to the consolidated list
        return { isValid, errorMessage }; 
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
        successToaster.classList.remove('show');
        
        // Clear and hide consolidated error messages
        if (errorContainer) {
            errorContainer.style.display = 'none';
            errorList.innerHTML = '';
        }
        
        // No longer need to clear individual field errors as they are not being populated by JS
        // document.querySelectorAll('.field-error').forEach(error => {
        //     error.classList.remove('show');
        //     error.textContent = '';
        // });
        
        // Clear field error states (borders/backgrounds)
        document.querySelectorAll('.form-group input, .form-group textarea').forEach(field => {
            field.classList.remove('error', 'valid');
        });
    }
    
    // Display errors from server response
    function displayErrors(errors) {
        clearErrors();
        let hasErrors = false;
        const errorMessages = []; // This will hold messages for the consolidated list
        
        if (errors.name) {
            nameField.classList.add('error'); // Style field border
            // No longer populate nameError.textContent or add .show
            errorMessages.push(errors.name);
            hasErrors = true;
        }
        
        if (errors.email) {
            emailField.classList.add('error'); // Style field border
            // No longer populate emailError.textContent or add .show
            errorMessages.push(errors.email);
            hasErrors = true;
        }
        
        if (errors.message) {
            messageField.classList.add('error'); // Style field border
            // No longer populate messageError.textContent or add .show
            errorMessages.push(errors.message);
            hasErrors = true;
        }
        
        if (errors.general) {
            errorMessages.push(errors.general);
            if (!hasErrors) { 
                nameField.classList.add('error'); // Optionally style first field for general error
            }
            hasErrors = true;
        }
        
        if (hasErrors && errorContainer) {
            errorList.innerHTML = errorMessages.map(msg => `<li>${msg}</li>`).join('');
            errorContainer.style.display = 'block';
            errorContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (hasErrors) {
            // Fallback if main container isn't there, scroll to first individual error
            const firstError = document.querySelector('.field-error.show');
            if (firstError) {
                firstError.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }
        }
    }
    
    // Display success message
    function displaySuccess(message) {
        // Completely clear all error states and messages first
        clearErrors();
        
        // Show success message
        successToaster.classList.add('show');
        form.classList.add('success');
        
        // Scroll to success message
        successToaster.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
        
        // Reset form after delay
        setTimeout(() => {
            form.reset();
            form.classList.remove('success');
            successToaster.classList.remove('show');
            
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
        
        // Reset previous errors
        errorContainer.classList.remove('show');
        errorList.innerHTML = '';
        const errors = [];
        
        // Validate name
        const nameInput = document.getElementById('name');
        if (!nameInput.value.trim()) {
            errors.push('Please enter your full name');
            nameInput.classList.add('error');
        } else {
            nameInput.classList.remove('error');
        }
        
        // Validate email
        const emailInput = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim() || !emailRegex.test(emailInput.value)) {
            errors.push('Please enter a valid email address');
            emailInput.classList.add('error');
        } else {
            emailInput.classList.remove('error');
        }
        
        // Validate message
        const messageInput = document.getElementById('message');
        if (!messageInput.value.trim()) {
            errors.push('Please enter your message');
            messageInput.classList.add('error');
        } else {
            messageInput.classList.remove('error');
        }
        
        // Show errors if any
        if (errors.length > 0) {
            errorContainer.classList.add('show');
            errors.forEach(error => {
                const li = document.createElement('li');
                li.textContent = error;
                errorList.appendChild(li);
            });
            return;
        }
        
        // If no errors, submit the form
        submitButton.disabled = true;
        submitButton.classList.add('loading');
        
        try {
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                // Show success toaster
                showSuccessToaster();
                form.reset();
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            errorContainer.classList.add('show');
            const li = document.createElement('li');
            li.textContent = 'Failed to send message. Please try again later.';
            errorList.appendChild(li);
        } finally {
            submitButton.disabled = false;
            submitButton.classList.remove('loading');
        }
    });
    
    // Success toaster functions
    function showSuccessToaster() {
        successToaster.classList.add('show');
        setTimeout(() => {
            closeToaster();
        }, 5000); // Auto hide after 5 seconds
    }
    
    window.closeToaster = function() {
        successToaster.classList.remove('show');
    };
    
    // Clear error styling on input
    form.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('error');
            if (!errorList.children.length) {
                errorContainer.classList.remove('show');
            }
        });
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