const messagesDiv = document.getElementById("chat-messages");
const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// 🔴 TU PODMIENISZ LINK PÓŹNIEJ
const BACKEND_URL = "https://TWOJ_BACKEND_URL/chat";

function addMessage(text, sender) {
    const div = document.createElement("div");
    div.classList.add("message", sender);
    div.innerText = text;
    messagesDiv.appendChild(div);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") sendMessage();
});

function sendMessage() {
    const text = input.value.trim();
    if (text === "") return;

    addMessage(text, "user");
    input.value = "";

    fetch(BACKEND_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: text })
    })
    .then(res => res.json())
    .then(data => {
        addMessage(data.reply, "bot");
    })
    .catch(() => {
        addMessage("Błąd połączenia z serwerem.", "bot");
    });
}
