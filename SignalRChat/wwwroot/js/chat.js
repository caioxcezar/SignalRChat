"use strict";

import {authorizedRequest} from "./fetch.js";

const getContacts = async () => {
    const cboSendTo = document.getElementById("cboSendTo");

    const response = await authorizedRequest(`${window.location.origin}/chat/getall`, "GET");
    if (response.status > 200) return;
    const json = await response.json();
    for (const option of json) {
        const element = document.createElement("option");
        element.value = option.name;
        element.text = option.name;
        cboSendTo.add(element);
    }
}

const addMessage = (user, message) => {
    const li = document.createElement("li");
    document.getElementById("messagesList").appendChild(li);
    li.textContent = `${user}: ${message}`;
}

(async () => {
    const res = localStorage.getItem('token');
    if (!res) return window.location.replace(`${window.location.origin}/login`);
    const {token} = JSON.parse(res);
    getContacts();

    const connection = new signalR.HubConnectionBuilder().withUrl("/chatHub", {
        headers: {"Authorization": `Bearer ${token}`}
    }).build();

    //Disable the send button until connection is established.
    document.getElementById("sendButton").disabled = true;

    connection.on("ReceiveMessage", addMessage);

    connection.start().then(() => {
        document.getElementById("sendButton").disabled = false;
    }).catch((err) => console.error(err.toString()));

    document.getElementById("sendButton").addEventListener("click", (event) => {
        event.preventDefault();
        const message = document.getElementById("messageInput").value;
        const sendTo = document.getElementById("cboSendTo").value;
        const {name} = JSON.parse(localStorage.getItem('token'));
        connection.invoke("SendMessage", sendTo, message).then(() => addMessage(name, message)).catch((err) => console.error(err.toString()));
    });
})();

