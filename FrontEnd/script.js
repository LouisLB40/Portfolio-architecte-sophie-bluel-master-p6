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
        
    })
    .catch((error) => console.log(error));

const displayButtons = (categories) => {

    const btn_filter = document.querySelector('.button_filter');
    btn_filter.innerHTML = '';

    const btn_all = document.createElement('button')
    btn_all.textContent = 'Tous'
    btn_all.classList.add('active')
    btn_all.classList.add('button_text')
    btn_all.setAttribute("data-id", 0)

    btn_filter.appendChild(btn_all);

    categories.forEach((category) => {

        const button = document.createElement('button')
        button.innerHTML = category.name;
        button.setAttribute("data-id", category.id);
        
        button.classList.add('button_text')

        btn_filter.appendChild(button);

    });

    let buttons = document.querySelectorAll("button[data-id]");

    buttons.forEach((button) => {
        
        button.addEventListener('click', (event) => {
            const AllBtn = document.querySelectorAll('.button_text');
            AllBtn.forEach((button) => {
                button.classList.remove('active');
            })
            const button = event.target;
            button.classList.add('active')
            const categoryId = parseInt(button.dataset.id);
            console.log(categoryId);
            // pas faire un fetch ici 
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

let token = localStorage.getItem('token');
// console.log(token)

if (token) {
    console.log('TOKEN ACTIF')

    const body = document.querySelector('body');
    const header = document.querySelector('header');
    header.style.marginTop = '100px';
    const blackBanner = document.createElement('div');
    blackBanner.setAttribute('class', 'blackBanner');

    body.insertBefore(blackBanner, header);

    const divBlackBanner = document.createElement('div');
    divBlackBanner.setAttribute('class', 'divBlackBanner');
    blackBanner.appendChild(divBlackBanner);

    const logout = document.querySelector('.ul_btn a');
    logout.textContent = "logout";

    logout.addEventListener('click', () => {
        localStorage.removeItem('token');
    });

    const editIcon1 = () => {
        const editI = document.createElement('i');
        editI.classList.add('far', 'fa-pen-to-square');
        return editI;
    };

    divBlackBanner.appendChild(editIcon1());

    const linkEditor = document.createElement('p');
    linkEditor.setAttribute('class', 'linkEditor');
    linkEditor.innerText = "Mode édition";
    divBlackBanner.appendChild(linkEditor);

    const figureImg = document.getElementById('figure_intro');

    const divEdit1 = document.createElement('div');
    divEdit1.setAttribute('class', 'divEdit1');
    // figureImg.appendChild(divEdit1);

    const editIcon2 = () => {
        const editI = document.createElement('i');
        editI.classList.add('far', 'fa-pen-to-square');
        editI.classList.add('faPen_Black');
        return editI;
    };

    const textEdit = () => {
        const textModifier = document.createElement('p');
        textModifier.setAttribute('class', 'textModifier');
        textModifier.innerText = 'modifier';
        return textModifier;
    }

    divEdit1.appendChild(editIcon2());
    divEdit1.appendChild(textEdit());

    const sectionh2 = document.getElementById('portfolio');
    const projectH2 = document.querySelector('#portfolio h2');
    const buttonFilter = document.querySelector('.button_filter');
    projectH2.style.marginBottom = '0';

    const divH2 = document.createElement('div');
    divH2.setAttribute('class', 'divH2');
    divH2.style.marginBottom = '4rem';
    sectionh2.insertBefore(divH2, buttonFilter);

    divH2.appendChild(projectH2);

    const buttonH2 = document.createElement('button');
    buttonH2.setAttribute('class', 'buttonH2');

    divH2.appendChild(buttonH2);

    buttonH2.appendChild(editIcon2());
    buttonH2.appendChild(textEdit());

    const divFilter = document.querySelector('.button_filter');
    divFilter.style.display = "none";
}

// MODALE
if (token) {
    let modale = null;
    let isDataFetched = false;
    const buttonH2 = document.querySelector('.buttonH2');
    const modale1 = document.querySelector('.first_modale');
    const modale2 = document.querySelector('.second_modale');

    buttonH2.addEventListener('click', () => {
        const aside = document.querySelector('#modale');
        aside.style.display = null;
        aside.removeAttribute('aria-hidden');
        aside.setAttribute('aria-modale', 'true');
        modale = aside;
        modale.addEventListener('click', close);
        modale.querySelector('.fa-xmark').addEventListener('click', close);
        modale.querySelector('.first_modale').addEventListener('click', stop);

        if (!isDataFetched) {
            fetch('http://localhost:5678/api/works', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(response => response.json())
                .then(data => {
                    // console.log(data)
                    displayWorks(data);
                    isDataFetched = true;
                })
                .catch(error => console.error(error));
        }

        const displayWorks = (works) => {
            const divImages = document.querySelector('.imagesModale');

            works.forEach((work) => {
                const container = document.createElement('div');
                container.setAttribute('class', 'imageContainer');

                const img = document.createElement('img');

                img.crossOrigin = 'anonymous';
                img.src = work.imageUrl;
                img.id = work.id;

                container.append(img);
                divImages.append(container);
            });
        }
    });   
}