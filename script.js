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

// Handle form submission - prevent popups, allow page reload when valid
const recipeForm = document.getElementById('recipeForm');
if (recipeForm) {
    // Swedish messages matching the visual .error-message text. setCustomValidity()
    // replaces the browser's default wording; reportValidity() then shows and
    // announces it via the browser's native, screen-reader-accessible validation UI
    // (no ARIA needed - this is built into the Constraint Validation API).
    const customMessages = {
        recipeName: 'Receptets namn är obligatoriskt',
        ingredients: 'Ingredienser är obligatoriska',
        instructions: 'Instruktioner är obligatoriska',
        userEmail: 'Ange en giltig e-postadress',
    };

    // Object.entries(customMessages).forEach(([name, message]) => {
    //     const field = recipeForm.elements[name];
    //     if (!field) return;
    //     field.addEventListener('invalid', () => field.setCustomValidity(message));
    //     field.addEventListener('input', () => field.setCustomValidity(''));
    // });

    recipeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!recipeForm.checkValidity()) {
            recipeForm.reportValidity();
            return;
        }
        setTimeout(() => {
            recipeForm.reset();
            location.reload();
        }, 100);
    });
}

