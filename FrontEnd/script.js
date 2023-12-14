const API_BASE_URL = "http://localhost:5678/api/"

function getWorks() {
    fetch(API_BASE_URL + "works")
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        })
        .catch((error) => console.log(error));
}

getWorks();

function getCategories() {
    fetch(API_BASE_URL + "categories")
    .then((response) => response.json)
    .then((data) => {
        console.log(data);
    })
    .catch((error) => console.log(error));
}

getCategories();