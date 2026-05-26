const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const sendButton = document.getElementById('send-btn');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError')

sendButton.addEventListener('click', (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';
    sendButton.textContent = 'Processing...'

    setTimeout(()=> {
        let isValid = true;

        if(!name) {
            nameError.textContent = 'Please enter the name.';
            isValid = false;
        } else if(!email) {
            emailError.textContent = 'Please enter the email.';
            isValid = false;
        } else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            emailError.textContent = 'Email is not valid';
            isValid = false;
        } else if(!message) {
            messageError.textContent = 'Please enter the message.';
            isValid = false;
        }

        sendButton.textContent = 'Send Message';
        if(isValid) {
            alert("Message Sent successfully");
            nameInput.value = '';
            emailInput.value = '';
            messageInput.value = '';
            window.location.href = 'mailto:bharat12rokaya123@gmail.com';

        }

    },1000);
})