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

// Handle form submission and real-time validation
const recipeForm = document.getElementById('recipeForm');
if (recipeForm) {
    recipeForm.addEventListener('submit', (e) => {
        if (!e.target.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            e.preventDefault();
            setTimeout(() => {
                e.target.reset();
                location.reload();
            }, 100);
        }
    });

    // Unified validation handler
    const validate = (element) => {
        if (!element.matches('input, textarea, select')) return;
        const isValid = element.checkValidity();
        element.classList.toggle('valid', isValid);
        element.classList.toggle('invalid', !isValid);
    };

    recipeForm.addEventListener('input', (e) => validate(e.target));
    recipeForm.addEventListener('blur', (e) => validate(e.target), true);
}

