// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const successContainer = document.getElementById('form-success');
    
    // Consolidated error message container
    const allErrorMessagesContainer = document.getElementById('all-error-messages-container');
    const allErrorMessagesList = document.getElementById('all-error-messages-list');
    
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
        successContainer.classList.remove('show');
        
        // Clear and hide consolidated error messages
        if (allErrorMessagesContainer) {
            allErrorMessagesContainer.style.display = 'none';
            allErrorMessagesList.innerHTML = '';
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
        
        if (hasErrors && allErrorMessagesContainer) {
            allErrorMessagesList.innerHTML = errorMessages.map(msg => `<li>${msg}</li>`).join('');
            allErrorMessagesContainer.style.display = 'block';
            allErrorMessagesContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
        // Browser validation will now trigger on its own due to `required` attributes
        // and `event.preventDefault()` being removed from 'invalid' listeners.
        // However, we still run our custom validation to populate the consolidated error list.

        // Clear previous custom errors (consolidated list and field styles)
        clearErrors();
        
        // Perform our custom validation to gather all messages for the consolidated list
        const nameValidation = validateField(nameField, nameError); // errorContainer arg is now unused by the func for display
        const emailValidation = validateField(emailField, emailError);
        const messageValidation = validateField(messageField, messageError);

        const clientSideErrorMessages = {};
        if (!nameValidation.isValid && nameValidation.errorMessage) {
            clientSideErrorMessages.name = nameValidation.errorMessage;
        }
        if (!emailValidation.isValid && emailValidation.errorMessage) {
            clientSideErrorMessages.email = emailValidation.errorMessage;
        }
        if (!messageValidation.isValid && messageValidation.errorMessage) {
            clientSideErrorMessages.message = messageValidation.errorMessage;
        }

        if (Object.keys(clientSideErrorMessages).length > 0) {
            e.preventDefault(); // Prevent form submission if our custom validation finds errors
            displayErrors(clientSideErrorMessages); // Show errors in the consolidated list
            // Browser default popups will also appear for fields failing HTML5 validation (e.g. required, type=email)
            return;
        }
        
        // If we reach here, our custom validation passed. Now, if browser validation is also happy (which it should be if fields are filled),
        // we can proceed with AJAX submission.
        // Note: if a field is empty, the browser will prevent submission before this JS even runs fully, due to `required`.
        // If a field has bad type (e.g. email), browser will also prevent.
        // This JS logic for consolidated errors essentially runs *in addition* to browser defaults.

        e.preventDefault(); // ALWAYS prevent default for AJAX submission
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