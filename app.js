let amigos = []; 
// moises miranda gt.2025
function agregarAmigo() {
    let inputNombre = document.getElementById("amigo");
    let nombre = inputNombre.value.trim();

    if (nombre === "") {
        mostrarAlerta("Error", "⚠️ Ingrese el nombre del amigo secreto.");
        return;
    }

    const MAX_LONGITUD = 100;
    if (nombre.length > MAX_LONGITUD) {
        mostrarAlerta("Error", `⚠️ El nombre no debe exceder los ${MAX_LONGITUD} caracteres.`);
        return;
    }

    const regexNombre = /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ\s'-]+$/;
    if (!regexNombre.test(nombre)) {
        mostrarAlerta("Error", "⚠️ El nombre no debe contener números ni caracteres inválidos.");
        return;
    }

    if (amigos.some(amigo => amigo.toLowerCase() === nombre.toLowerCase())) {
        mostrarAlerta("Error", "⚠️ Este nombre ya ha sido ingresado.");
        return;
    }

    amigos.push(nombre);
    actualizarListaAmigos();
    actualizarContador();
    inputNombre.value = "";
}

function actualizarListaAmigos() {
    let lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";

    amigos.forEach((amigo, index) => {
        let li = document.createElement("li");
        li.textContent = amigo;

        let botonEliminar = document.createElement("button");
        botonEliminar.innerHTML = "&times;";
        botonEliminar.classList.add("boton-eliminar");
        botonEliminar.onclick = function () {
            eliminarAmigo(amigo);
        };

        let botonEditar = document.createElement("button");
        botonEditar.innerHTML = "✎";
        botonEditar.classList.add("boton-editar");
        botonEditar.onclick = function () {
            editarAmigo(index);
        };

        li.appendChild(botonEliminar);
        li.appendChild(botonEditar);
        lista.appendChild(li);
    });
}

function editarAmigo(index) {
    let nuevoNombre = prompt("Ingrese el nuevo nombre:", amigos[index]);
    if (nuevoNombre && nuevoNombre.trim() !== "") {
        const MAX_LONGITUD = 100;
        if (nuevoNombre.length > MAX_LONGITUD) {
            mostrarAlerta("Error", `⚠️ El nombre no debe exceder los ${MAX_LONGITUD} caracteres.`);
            return;
        }

        const regexNombre = /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ\s'-]+$/;
        if (!regexNombre.test(nuevoNombre)) {
            mostrarAlerta("Error", "⚠️ El nombre no debe contener números ni caracteres inválidos.");
            return;
        }

        if (amigos.some((amigo, i) => i !== index && amigo.toLowerCase() === nuevoNombre.toLowerCase())) {
            mostrarAlerta("Error", "⚠️ Este nombre ya ha sido ingresado.");
            return;
        }

        amigos[index] = nuevoNombre.trim();
        actualizarListaAmigos();
        actualizarContador();
    }
}

function sortearAmigo() {
    if (amigos.length < 2) {
        alert("⚠️ Debe haber al menos dos nombres en la lista para realizar el sorteo.");
        return;
    }

    let indiceAleatorio = Math.floor(Math.random() * amigos.length);
    let amigoSecreto = amigos[indiceAleatorio];

    let resultadoLista = document.getElementById("resultado");
    resultadoLista.innerHTML = "";

    let li = document.createElement("li");
    li.textContent = `🎉 El amigo secreto es: ${amigoSecreto}`;
    resultadoLista.appendChild(li);

    document.getElementById("btnReiniciar").disabled = false;
}

function reiniciarLista() {
    amigos = [];
    document.getElementById("listaAmigos").innerHTML = "";
    document.getElementById("resultado").innerHTML = "";
    document.getElementById("btnReiniciar").disabled = true;
    actualizarContador();
}

function formatearTexto(input) {
    input.value = input.value
        .toLowerCase()
        .split(" ")
        .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
        .join(" ");
}

function eliminarAmigo(nombre) {
    amigos = amigos.filter(amigo => amigo !== nombre);
    actualizarListaAmigos();
    actualizarContador();
}

window.onload = function () {
    document.getElementById("btnReiniciar").disabled = true;
    actualizarContador();
};

function mostrarAlerta(titulo, mensaje) {
    const customAlert = document.getElementById("customAlert");
    const customAlertTitle = document.getElementById("customAlertTitle");
    const customAlertMessage = document.getElementById("customAlertMessage");

    customAlertTitle.textContent = titulo;
    customAlertMessage.textContent = mensaje;

    customAlert.style.display = "flex";
}

function cerrarAlerta() {
    const customAlert = document.getElementById("customAlert");
    customAlert.style.display = "none";
}

document.getElementById("customAlertClose").addEventListener("click", cerrarAlerta);

function actualizarContador() {
    const contador = document.getElementById("contadorAmigos");
    contador.textContent = `Total de amigos: ${amigos.length}`;
}
