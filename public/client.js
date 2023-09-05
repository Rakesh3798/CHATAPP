// const socket = io()

// var textarea = document.querySelector("#textarea")
// var sendButton = document.querySelector("#sendButton");
// let name;
// var chatarea = document.querySelector(".message_area")

// do {
//     name = prompt("enter username")
// } while (!name);
// const userNameElement = document.getElementById("userName");
// userNameElement.textContent = "User: " + name; // Set the user's name dynamically

// sendButton.addEventListener("click", sendMessage);
// textarea.addEventListener("keyup", (e) => {
//     if (e.key === 'Enter') {
//         mymsg(e.target.value)
//     }   
// })

// function sendMessage() {
//     const msg = textarea.value.trim();
//     if (msg !== "") {
//         mymsg(msg);
//         textarea.value = ''; // Clear the textarea after sending message
//     }
// }

// const mymsg = (msg) => {
//     var message = {
//         user: name,
//         msg: msg,
//     }
//     socket.emit('message', message)
//     appendmessage(message, 'outgoing')
//     textarea.value = ''; // Clear the textarea after sending message
// }

// function appendmessage(msg, type) {
//     var maindiv = document.createElement(div)
//     maindiv.classList.add(type, 'message')
//     var contnet = "<h4>" + msg.user + "</h4><p>" + msg.msg + "</p>"
//     var div = chatarea.appendChild(maindiv)
//     div.innerHTML = contnet
//     chatarea.scrollTop = chatarea.scrollHeight; // Auto-scroll to bottom
// }

// socket.on('message', (msg) => {
//     appendmessage(msg, 'incoming');
// })


const socket = io();

var textarea = document.querySelector("#textarea");
var sendButton = document.querySelector("#sendButton");
let name;
var chatarea = document.querySelector(".message_area");

do {
    name = prompt("Enter username");
} while (!name);
const userNameElement = document.getElementById("userName");
userNameElement.textContent = "User: " + name; // Set the user's name dynamically

sendButton.addEventListener("click", sendMessage);
textarea.addEventListener("keyup", (e) => {
    if (e.key === 'Enter') {
        mymsg(e.target.value);
    }   
});

function sendMessage() {
    const msg = textarea.value.trim();
    if (msg !== "") {
        mymsg(msg);
        textarea.value = ''; // Clear the textarea after sending the message
    }
}

const mymsg = (msg) => {
    var message = {
        user: name,
        msg: msg,
        timestamp: new Date().toLocaleTimeString() // Add a timestamp to the message
    };
    socket.emit('message', message);
    appendmessage(message, 'outgoing');
    textarea.value = ''; // Clear the textarea after sending the message
};

function appendmessage(msg, type) {
    var maindiv = document.createElement('div'); // Corrected the 'div' tag
    maindiv.classList.add(type, 'message');
    var content = `<h4> ${msg.user}</h4><p>${msg.msg}</p><span class='timestamp'>${msg.timestamp}</span>
                    <button class="delete-btn" onclick="deleteMessage(this)">Delete</button>
                    <button class="edit-btn" onclick="editMessage(this)">Edit</button>`
    var div = chatarea.appendChild(maindiv);
    div.innerHTML = content;
    chatarea.scrollTop = chatarea.scrollHeight; // Auto-scroll to the bottom
}

function deleteMessage(button) {
    var messageDiv = button.parentElement;
    chatarea.removeChild(messageDiv);
    // You may want to emit a socket event to inform the server about the deletion.
}

function editMessage(button) {
    var messageDiv = button.parentElement;
    var messageParagraph = messageDiv.querySelector('p');
    var newMessage = prompt('Edit the message:', messageParagraph.textContent);
    
    if (newMessage !== null && newMessage.trim() !== "") {
        messageParagraph.textContent = newMessage;
        // You may want to emit a socket event to inform the server about the edit.
    }
}

socket.on('message', (msg) => {
    appendmessage(msg, 'incoming');
});


