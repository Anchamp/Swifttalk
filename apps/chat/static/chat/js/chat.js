///const split_path = window.location.pathname.split('/');
//const room_name = split_path[split_path.length - 1];
//const chatSection = document.getElementById("chat-content");
//const chatSocket = new WebSocket(`ws://${window.location.host}/ws/chat/${room_name}/`);
//const chat_div = document.querySelector(".chat");
//const btnMessage = document.getElementById("send-message");
//const notif_socket = new WebSocket(`ws://${window.location.host}/ws/notif_socket/`);
//const message = document.getElementById("message");
//
//const room_api_url = `/api/chat/room/data/${room_name}`;
//
//message.addEventListener("keypress", function (ev) {
//    if (ev.key === 'Enter') {
//        ev.preventDefault();
//        if (message.value.trim().length !== 0) {
//            btnMessage.click();
//        }
//    }

//});
//
//async function get_chats() {
//    try {
//        const response = await fetch(room_api_url);
//        return response.json();
//    } catch (error) {
//        console.error("Error fetching chat data:", error);
//    }
//}
//
//notif_socket.onopen = function () {
//    console.log('notif socket opened!');
//    notif_socket.send(JSON.stringify({ room: room_name, joined: true }));
//};
//
//function create_formatted_date(d) {
//    const date = new Date(d);
//    const hours = date.getHours().toString().padStart(2, '0');
//    const minutes = date.getMinutes().toString().padStart(2, '0');
//    return `${hours}:${minutes}`;
//}
//
//chatSocket.onopen = function () {
//    get_chats()
//        .then((r) => {
//            const loadingp = document.getElementById("loadingp");
//            loadingp.innerHTML = "";
//
//            for (const chat of r) {
//                const formatted_date = create_formatted_date(chat.created);
//                create_chat_box(chat.text, chat.from_user, formatted_date);
//            }
//        })
//        .catch((error) => {
//            console.error("Error initializing chat:", error);
//        })
//        .finally(() => {
//            loadingp.style.color = "red";
//        });
//};
//
//function create_chat_box(message, sender, formatted_date) {
//    const isCurrentUser = sender === current_user;
//    const element = `
//        <div class="message${isCurrentUser ? ' me' : ''}">
//            <div>
//                <h4>${sender}</h4>
//                <p>${message}</p>
//                <p>${formatted_date}</p>
//            </div>
//        </div>
//    `;
//    chatSection.innerHTML += element;
//    scroll_bottom();
//}
//
//function scroll_bottom() {
//    window.scrollTo(0, chat_div.scrollHeight);
//}
//
//function send_message() {
//    const messageValue = message.value.trim();
//    if (messageValue.length !== 0) {
//        chatSocket.send(JSON.stringify({ "message": messageValue }));
//        message.value = '';
//    }
//}
//
//chatSocket.onerror = function (e) {
//    console.error('WebSocket error:', e);
//};
//
//chatSocket
const split_path = window.location.pathname.split('/');
const room_name = split_path[split_path.length - 1];
const chatSection = document.getElementById("chat-content");
const chatSocket = new WebSocket(
    'ws://' + window.location.host + '/ws/chat/' + room_name + '/'
);
const chat_div = document.querySelector(".chat");
const menu = document.querySelector(".menu");
const btnMessage = document.getElementById("send-message");
const notif_socket = new WebSocket(
    'ws://' + window.location.host + '/ws/notif/'
);
const message = document.getElementById("message");
const current_user = "{{request.user}}";  // Define or retrieve the current user

message.addEventListener("keypress", function(ev) {
    if (ev.key === 'Enter') {
        ev.preventDefault();
        if (message.value.trim().length !== 0) {
            btnMessage.click();
        }
    }
});

async function get_chats() {
    try {
        const response = await fetch(room_api_url);
        return response.json();
    } catch (error) {
        console.error("Error fetching chat data:", error);
        throw error;  // Propagate the error
    }
}

notif_socket.onopen = function(n) {
    console.log('notif socket opened!');
    notif_socket.send(
        JSON.stringify({
            "room": room_name,
            "joined": true
        })
    );
};

function create_formatted_date(d) {
    const options = { hour: 'numeric', minute: 'numeric' };
    return new Date(d).toLocaleTimeString(undefined, options);
}

chatSocket.onopen = function() {
    get_chats()
        .then((r) => {
            const loadingp = document.getElementById("loadingp");
            loadingp.innerHTML = "";

            for (const chat of r) {
                const formatted_date = create_formatted_date(chat.created);
                create_chat_box(chat.text, chat.from_user, formatted_date);
            }
        })
        .catch((error) => {
            console.error("Error initializing chat:", error);
        })
        .finally(() => {
            loadingp.style.color = "red";
        });
};

function create_chat_box(message, sender, formatted_date) {
    const isCurrentUser = sender === current_user;
    const element = `
        <div class="message${isCurrentUser ? ' me' : ''}">
            <div>
                <h4>${sender}</h4>
                <p>${message}</p>
                <p>${formatted_date}</p>
            </div>
        </div>
    `;
    chatSection.innerHTML += element;
    scroll_bottom();
}

function scroll_bottom() {
    window.scrollTo(0, chat_div.scrollHeight);
}

function send_message() {
    const messageValue = message.value.trim();
    if (messageValue.length !== 0) {
        chatSocket.send(JSON.stringify({ "message": messageValue }));
        message.value = '';
    }
}

chatSocket.onerror = function(e) {
    console.error('WebSocket error:', e);
};

chatSocket.onmessage = function(m) {
    console.log("Received message:", m.data);
    const json_parser = JSON.parse(m.data);
    const date = json_parser.date ? new Date(json_parser.date) : new Date();
    const formatted_date = create_formatted_date(date);
    create_chat_box(json_parser.message, json_parser.sender, formatted_date);
};
