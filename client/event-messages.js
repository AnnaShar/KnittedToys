const showMessage = (message, status) => {
    let messageContainer = document.querySelector('.event-message');
    messageContainer.innerHTML = message;
    messageContainer.classList.add(status);
};

const clearMessage = () => {
    let messageContainer = document.querySelector('.event-message');
    messageContainer.innerHTML = '';
    messageContainer.classList.remove('success', 'failed');
};

export default {
    show: showMessage,
    clear: clearMessage
}