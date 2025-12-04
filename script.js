async function sendMsg() {
  const msg = document.getElementById("msg").value;
  const chat = document.getElementById("chat");
  chat.innerHTML += "<div class='user'>" + msg + "</div>";

  const res = await fetch("/chat", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({message: msg})
  });
  const data = await res.json();
  chat.innerHTML += "<div class='bot'>" + data.reply + "</div>";
}
