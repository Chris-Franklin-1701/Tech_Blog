const newFormHandler = async (event) => {
    // Stop the browser from submitting the form so we can do so with JavaScript
    event.preventDefault();
    
    // Gather the data from the form elements on the page
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();
    
    if (title && content) {
      // Send the e-mail and password to the server
        const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
        });
        
        if (response.ok) {
        document.location.replace('/dashboard');
        } else {
        alert('Failed to create post');
        }
    }
};

const deleteBtn = async (event) => {
    const deleteBtn = document.getElementById('#deleteBtn').hasAttribute('onclick');

    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`api/posts/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            document.location.replace('/dashboard');
            } else {
            alert('Failed to delete post');
            }
    }
}
    
    document
    .querySelector('.login-form')
    .addEventListener('click', deleteBtnHandler);