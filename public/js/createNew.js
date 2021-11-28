const createNewBtn = document.querySelector('#createNewBtn');

createNewBtn.addEventListener('click', async (event) => {
    // Stop the browser from submitting the form so we can do so with JavaScript
    event.preventDefault();
    
    // Gather the data from the form elements on the page
    const user_name = document.querySelector('#new-name').value.trim();
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    
        const response = await fetch('/api/users/', {
        method: 'POST',
        body: JSON.stringify({ user_name, email, password }),
        headers: { 'Content-Type': 'application/json' },
        });
        
        if (response.ok) {
        document.location.replace('/dashboard');
        } else {
        alert('Failed to log in');
        document
        .querySelector('.login-form')
        .addEventListener('submit', loginFormHandler)};
        });