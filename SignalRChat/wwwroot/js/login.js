document.getElementById("sendButton").addEventListener("click", (event) => {
    event.preventDefault();
    const name = document.getElementById("nameInput").value;
    const password = document.getElementById("passwordInput").value;
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "Name": name,
        "Password": password
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://localhost:7260/login", requestOptions)
        .then(response => {
            if(response.status > 200) throw 'Credencial invalida';
            return response.json();
        })
        .then(json => {
            localStorage.setItem("token", JSON.stringify(json));
            window.location.replace(window.location.origin);
        })
        .catch(e => document.getElementById("error").innerText = `Não foi possível logar. ${e}`);
});