// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    // --- Form Elements ---
    const form = document.getElementById('contact-form');
    if (!form) return; // Exit if form not found

    const submitButton = document.getElementById('submit-btn');
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const messageField = document.getElementById('message');
    const allFields = [nameField, emailField, messageField];

    // --- Containers ---
    const successToaster = document.getElementById('success-toaster');
    const errorContainer = document.getElementById('all-error-messages-container');
    const errorList = document.getElementById('all-error-messages-list');

    // --- Initial Setup ---
    form.noValidate = true; // Disable native browser validation bubbles

    // --- Validation Logic ---
    function validateField(field) {
        const value = field.value.trim();
        let error = '';

        switch (field.name) {
            case 'name':
                if (!value) error = 'Name is required.';
                else if (value.length < 2) error = 'Name must be at least 2 characters.';
                break;
            case 'email':
                if (!value) error = 'Email is required.';
                else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Please enter a valid email address.';
                break;
            case 'message':
                if (!value) error = 'Message is required.';
                else if (value.length < 10) error = 'Message must be at least 10 characters.';
                break;
        }
        return error;
    }

    // --- UI Update Functions ---
    function clearAllErrors() {
        errorList.innerHTML = '';
        errorContainer.style.display = 'none';
        allFields.forEach(field => field.classList.remove('error', 'valid'));
    }

    function displayErrors(errors) {
        clearAllErrors();
        errorList.innerHTML = errors.map(msg => `<li>${msg}</li>`).join('');
        errorContainer.style.display = 'block';
        errorContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function displaySuccess(message) {
        clearAllErrors();
        form.reset();

        const successMessageEl = successToaster.querySelector('.success-message');
        if (successMessageEl) {
            successMessageEl.textContent = message;
        }
        successToaster.classList.add('show');
        
        setTimeout(() => {
            successToaster.classList.remove('show');
        }, 5000);
    }

    // --- Event Handlers ---
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        clearAllErrors();

        let validationErrors = [];
        allFields.forEach(field => {
            const error = validateField(field);
            if (error) {
                validationErrors.push(error);
                field.classList.add('error');
            } else {
                field.classList.add('valid');
            }
        });

        if (validationErrors.length > 0) {
            displayErrors(validationErrors);
            return;
        }

        submitButton.disabled = true;
        submitButton.classList.add('loading');
        submitButton.textContent = 'Sending...';

        try {
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                displaySuccess(result.message);
            } else {
                const serverErrors = Object.values(result.errors);
                displayErrors(serverErrors);
            }
        } catch (error) {
            console.error('Form submission error:', error);
            displayErrors(['An unexpected error occurred. Please try again.']);
        } finally {
            submitButton.disabled = false;
            submitButton.classList.remove('loading');
            submitButton.textContent = 'Send Message';
        }
    });

    // Real-time feedback on input
    allFields.forEach(field => {
        field.addEventListener('input', () => {
            const error = validateField(field);
            if (error) {
                field.classList.add('error');
                field.classList.remove('valid');
            } else {
                field.classList.remove('error');
                field.classList.add('valid');
            }
        });
    });

    // Global function for the close button on the toaster
    window.closeToaster = function() {
        if (successToaster) {
            successToaster.classList.remove('show');
        }
    };
}); 
