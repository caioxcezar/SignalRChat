"use strict";

const connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

//Disable the send button until connection is established.
document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", (user, message) => {
    const li = document.createElement("li");
    document.getElementById("messagesList").appendChild(li);
    // We can assign user-supplied strings to an element's textContent because it
    // is not interpreted as markup. If you're assigning in any other way, you 
    // should be aware of possible script injection concerns.
    li.textContent = `${user} says ${message}`;
});

connection.start().then(() => {
    document.getElementById("sendButton").disabled = false;
    document.getElementById("connectionId").innerText = connection.connectionId;
}).catch((err) => console.error(err.toString()));

document.getElementById("sendButton").addEventListener("click", async (event) => {
    try {
        event.preventDefault();
        const user = document.getElementById("userInput").value;
        const message = document.getElementById("messageInput").value;
        const sendTo = document.getElementById("sendToInput").value;
        const ret = await connection.invoke("SendMessage", sendTo, user, message);
        console.log(ret);
    } catch (err) {
        console.error(err.toString());
    }

});