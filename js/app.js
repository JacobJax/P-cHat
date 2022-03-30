let msgBox = document.querySelector("#msg");
let msgs = document.querySelector(".msgs");
let frm = document.querySelector("form");
let u_name = document.querySelector("#uname")

frm.addEventListener('submit', (e) => {
   e.preventDefault()

   msg = (msgBox.value != "") ? msgBox.value : `[empty]`

   conn.send(JSON.stringify({name: u_name.value, msg: msg}))
   msgBox.value = ""
})

let conn = new WebSocket('ws://localhost:8080');

conn.onopen = function(e) {
  console.log("Connection established!");
};

conn.onmessage = function(e) {
  let colors = ["#ce93d8", "#64b5f6", "#4db6ac", "#dce775"]

   data = JSON.parse(e.data)
   // user = data.name
   user = (data.name != "") ? data.name : `anonymous`
   msg = data.msg

   const node = document.createElement("p");
   node.innerHTML = `<b style="color: #000; background-color:${colors[Math.floor(Math.random() * 3)]};  padding: 3px 5px; border-radius: 2px;">${user}</b>: ${msg}`
  msgs.appendChild(node)
};
