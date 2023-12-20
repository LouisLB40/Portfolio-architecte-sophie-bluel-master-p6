const API_BASE_URL = "http://localhost:5678/api/"

function getWorks() {
    fetch(API_BASE_URL + "works")
        .then((response) => response.json())
        .then((data) => {
            displayWorks(data);
            console.log(data);
        })
        .catch((error) => console.log(error));
}

getWorks();

function displayWorks (works) {
    const worksContainer = document.querySelector('.gallery');
    worksContainer.innerHTML = '';
    works.forEach((work) => {
        worksContainer.innerHTML += `
        <div class="work">
            <img src="${work.imageUrl}" alt="${work.title}">
            <h3>${work.title}"</h3>
        </div>
        `
    });
}


fetch(API_BASE_URL + "categories")
    .then(response => response.json())
    .then(data => {
        displayButtons(data);
        console.log(data);
    })
    .catch((error) => console.log(error));

const displayButtons = (categories) => {

    const btn_wrap = document.querySelector('.button_filter');
    btn_wrap.innerHTML = '';

    const btn_all = document.createElement('button')
    btn_all.textContent = 'Tous'
    btn_all.classList.add('button_text')
    btn_all.setAttribute("data-id", 0)

    btn_wrap.appendChild(btn_all);

    categories.forEach((category) => {

        const button = document.createElement('button')
        button.innerHTML = category.name;
        button.setAttribute("data-id", category.id);
        console.log(category.id)
        button.classList.add('button_text')

        console.log(category);

        btn_wrap.appendChild(button);

    });

    let buttons = document.querySelectorAll("button[data-id]");

    buttons.forEach((button) => {

        button.addEventListener('click', (event) => {

            const button = event.target;
            const categoryId = parseInt(button.dataset.id);
            console.log(categoryId);
            
        fetch(API_BASE_URL + "works")
            .then((response) => response.json())
            .then((works) => {
                const workFiltered = categoryId !== 0 ? works.filter(work => work.categoryId === categoryId) : works;
                displayWorks(workFiltered);
        })
            .catch((error) => console.log(error));
        });
    })
}









