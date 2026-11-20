// Register the service worker to enable local caching and offline support.
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(registration => console.log('ServiceWorker registered: ', registration.scope))
            .catch(error => console.error('ServiceWorker registration failed: ', error));
    });
}

// Event Delegation for ingredient checkboxes
document.addEventListener('change', (event) => {
    if (event.target.matches('.ingredients input[type="checkbox"]')) {
        const listItem = event.target.closest('li');
        if (listItem) {
            listItem.classList.toggle('checked', event.target.checked);
        }
    }
});

// Set initial checked state
document.querySelectorAll('.ingredients input[type="checkbox"]:checked').forEach(checkbox => {
    checkbox.closest('li')?.classList.add('checked');
});

// Validate the demo form locally and reload after a valid submission.
const recipeForm = document.getElementById('recipeForm');
if (recipeForm) {
    const submitButton = recipeForm.querySelector('button[type="submit"]');

    function updateFieldError(field) {
        const error = field.nextElementSibling;
        if (!error?.matches('.error-message[id]')) return;

        if (field.matches(':user-invalid')) {
            field.setAttribute('aria-describedby', error.id);
        } else {
            field.removeAttribute('aria-describedby');
        }
    }

    recipeForm.addEventListener('input', (event) => updateFieldError(event.target));
    recipeForm.addEventListener('focusout', (event) => updateFieldError(event.target));

    recipeForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const isValid = recipeForm.checkValidity();

        for (const field of recipeForm.elements) {
            updateFieldError(field);
        }

        if (!isValid) {
            recipeForm.querySelector(':is(input, select, textarea):invalid')?.focus();
            return;
        }

        setTimeout(() => {
            recipeForm.reset();
            location.reload();
        }, 100);
    });

    recipeForm.noValidate = true;
    submitButton.disabled = false;
}
