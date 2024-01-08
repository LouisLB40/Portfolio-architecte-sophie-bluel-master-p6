const API_BASE_URL = "http://localhost:5678/api/"

function login() {

    // Récupérer ce que l'utilisateur a inscrit dans les champs
    let email = document.querySelector("#userlogin").value;
    let password = document.querySelector("#userpassword").value;

    // Créer un objet avec ces données
    let data = {
        email: email,
        password: password
    }
    console.log(data);


    fetch(API_BASE_URL + "users/login" , {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data.token);
            localStorage.setItem('token', data.token);
            window.location.href = "index.html";
        })
        .catch(error => console.error(error));
}

document.querySelector('.btn_Tologin').addEventListener('click', login);
        