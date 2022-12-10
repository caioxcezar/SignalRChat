import {request} from "./fetch.js";

window.login = async () => {
    try {
        const login = document.getElementById("loginInput").value;
        const password = document.getElementById("passwordInput").value;
        const response = await request(`${window.location.origin}/login`, "POST", {"Login": login, "Password": password});
        if (response.status > 200) throw 'Credencial invalida';
        const json = await response.json();
        localStorage.setItem("token", JSON.stringify(json));
        window.location.replace(window.location.origin);
    } catch (e) {
        document.getElementById("error").innerText = `Não foi possível logar. ${e}`;
    }
};

const isAvailable = async (login) => {
    const response = await request(`${window.location.origin}/login/isAvailable/${login}`);
    if (response.status > 200) return false;
    return response.json();
}

window.checkIsAvailable = async () => {
    const login = document.getElementById("loginInput").value;
    if(!login.trim()) return document.getElementById("alert").innerText = "Favor preencher o login. ";
    const isValid = await isAvailable(login);
    document.getElementById("alert").innerText = isValid ? "Login Disponivel" : "Login invalido";
}

window.registerUser = async () => {
    try {
        const name = document.getElementById("nameInput").value;
        const password = document.getElementById("passwordInput").value;
        const login = document.getElementById("loginInput").value;
        const role = document.getElementById("cboRole").value;
        const isValid = await isAvailable(login);
        if (!isValid) throw "Login invalido";
        const body = {name, password, login, role};
        await request(`${window.location.origin}/login/register`, "POST", body);
        if (request.status > 200) throw "Login invalido";
        window.location.replace(`${window.location.origin}/login`);
    } catch (e) {
        document.getElementById("error").innerText = `Não foi possível logar. ${e}`;
    }
}