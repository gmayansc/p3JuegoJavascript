
const checkLogin = (localStorageArray) => {

    let formEmail = document.querySelector("#Email").value;
    let formPassword = document.querySelector("#Pass").value;

    localStorageArray.map((usuario) => {
        if (usuario.email == formEmail && usuario.password == formPassword){
            window.location.href=`home.html?email=${formEmail}&password=${formPassword}&avatar=${usuario.avatar}`;
        } 
    })

}


const onSubmit = (e) =>{
    e.preventDefault();

    let localStorageArray = [];
    const currentUsers = localStorage.getItem("miRegistro");
    localStorageArray = JSON.parse(currentUsers);

    checkLogin( localStorageArray );

}


const btnLogin = document.getElementById("btn-login");

btnLogin.addEventListener("click", onSubmit)