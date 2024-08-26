const socket = io();

document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('message-input').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

socket.on('chat message', function (msg) {
    addMessage(msg, 'received');
});

function sendMessage() {
    const inputField = document.getElementById('message-input');
    const message = inputField.value.trim();

    if (message) {
        addMessage(message, 'sent');
        socket.emit('chat message', message);
        inputField.value = '';
        inputField.focus();
    }
}

function addMessage(text, type) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;
    messageElement.textContent = text;

    document.getElementById('messages').appendChild(messageElement);

    // Scroll to the bottom
    document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
}
