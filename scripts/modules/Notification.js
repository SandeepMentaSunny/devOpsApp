export function Notification(notifyNode, status, messageContent, setTimer){
    let message, removeBtn, timer;
    if(status){
        message = document.createElement('p');
        message.textContent = messageContent;
        message.classList.add('success');
        removeBtn = document.createElement('span');
        removeBtn.innerHTML = '&times;';
        removeBtn.classList.add('success', 'close-btn');
        notifyNode.classList.remove('hide');
        if(notifyNode.classList.contains('danger')){
            notifyNode.classList.remove('danger');
        }
        notifyNode.classList.add('success');
    }else if(!status){
        message = document.createElement('p');
        message.textContent = messageContent;
        message.classList.add('danger');
        removeBtn = document.createElement('span');
        removeBtn.innerHTML = '&times;';
        removeBtn.classList.add('danger', 'close-btn');
        notifyNode.classList.remove('hide');
        if(notifyNode.classList.contains('success')){
            notifyNode.classList.remove('success');
        }
        notifyNode.classList.add('danger');
    }
    notifyNode.appendChild(message);
    notifyNode.appendChild(removeBtn);
    removeBtn.addEventListener('click', (e)=> {
        e.target.parentNode.classList.add('hide');
        e.target.parentNode.innerHTML = '';
    });
    if (setTimer) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            notifyNode.classList.add('hide');
            notifyNode.innerHTML = '';
        }, 5000);
    }
}