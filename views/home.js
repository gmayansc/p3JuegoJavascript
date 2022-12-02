const emailHeader = document.getElementById("email-header");

const avatar = document.getElementById("avatar-home");

const salas = document.querySelector(".contenedor-salas");

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

let avatarURL = urlParams.get('avatar');
let userEmail = urlParams.get('email');

salas.addEventListener("dragover", e =>{
    e.preventDefault();
    e.target.classList.add("sala-item--hover");
})

salas.addEventListener("dragleave", e =>{
    e.preventDefault();
    e.target.classList.remove("sala-item--hover");
})

salas.addEventListener("drop", e =>{
    e.target.classList.remove("sala-item--hover");
    e.target.append(avatar);
    const size = e.target.getAttribute("data-sala");
    e.target.innerHTML += `<a href='sala.html?size=${size}&email=${userEmail}&avatar=${avatarURL}' class='btn btn-primary'>Entrar</button>`;
    document.getElementById("avatar-home").setAttribute("draggable", "");
    document.querySelector(".avatar-container h2").innerText = "Pulsa el botón 'Entrar' para jugar";
    $("#avatar-home").animate({width: '90px', height: '90px'});
})

function getDataFromURL() {

    document.getElementById("email-header").innerText = userEmail;
    setAvatarImage(avatarURL);
}

function setAvatarImage(url){
    console.log("imagen: " + url)
    document.getElementById("avatar-home").style.backgroundImage= `url('resources/profile-img/${url}.png')`
}


window.addEventListener("load",getDataFromURL() );
