const onSubmit = (e) => {
    e.preventDefault();
    addUser();
}

const addUser = () => {

    let localStorageArray = [];

    const currentUsers = localStorage.getItem("miRegistro");

    localStorageArray = (currentUsers) ? JSON.parse(currentUsers) : [];

    let newUser = {
        email: document.querySelector("#Email").value,
        password: document.querySelector("#Pass").value,
        avatar: document.querySelector('input[name="avatares"]:checked').value,
    }

    localStorageArray.push(newUser);
    localStorage.setItem("miRegistro", JSON.stringify(localStorageArray));
    setTimeout(function(){document.location.href = "index.html";},250);
}

const btnRegister = document.getElementById("btn-register");

btnRegister.addEventListener("click", onSubmit)