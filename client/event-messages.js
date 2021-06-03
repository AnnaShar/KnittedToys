let messageContainer = document.querySelector('.event-message');

const showMessage = (message, status)=>{
  messageContainer.innerHTML = message;
  messageContainer.classList.add(status);
};

const clearMessage = ()=>{
    messageContainer.innerHTML='';
    messageContainer.classList.
};