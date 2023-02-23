const socket = io();


const inputMsg = document.getElementById('inputMsg');
const messageBox = document.querySelector('.messageBox');

const userName = prompt('enter your name');

inputMsg.addEventListener('keyup', (e)=>{
    if(e.key === 'Enter'){
        sendMessage(e.target.value);
    }
})


function sendMessage(message){
    let msg = {
        user : userName,
        message : message.trim()
    }
    // append messages
    appendMessage(msg, 'outgoing');
    scrollTopToBottom();

    // send to server
    socket.emit('message', msg);
}



function appendMessage(msg, type){
    let divEle = document.createElement('div');
    let classname = type;
    divEle.classList.add(classname);
    divEle.classList.add('message');

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    divEle.innerHTML = markup;
    messageBox.appendChild(divEle);
    inputMsg.value = ""

}

//receive msg
socket.on('receieve', (msg)=>{
    console.log(msg);
    appendMessage(msg, 'incoming');
    scrollTopToBottom();

})

const scrollTopToBottom = () =>{
    messageBox.scrollTop = messageBox.scrollHeight;
}