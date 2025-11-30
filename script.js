
async function sendMessage() {
    const input = document.getElementById("userInput");
    const chatbox = document.getElementById("chatbox");

    if (!input.value.trim()) return;

    chatbox.innerHTML += `<div class='message user'>${input.value}</div>`;
    chatbox.scrollTop = chatbox.scrollHeight;

    const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input.value })
    });

    const data = await response.json();
    const answer = data.answer;

    chatbox.innerHTML += `<div class='message bot'>${answer}</div>`;
    chatbox.scrollTop = chatbox.scrollHeight;

    input.value = "";
}
