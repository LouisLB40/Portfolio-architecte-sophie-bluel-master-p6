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
// Simplifier le Code avec ChatGPT et demander de le mettre en function - A Supprimer

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
function closeModale() {
    const close = document.querySelector('.closed');
    const modale = document.querySelector('#modale');
    close;addEventListener("click", () => {
        modale.style.display = "none";
    })
}

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
        //modale.addEventListener('click', closeModale);
        modale.querySelector('.fa-xmark').addEventListener('click', closeModale);

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

                const buttonTrash = document.createElement('button');
                buttonTrash.classList.add('buttonTrash');
                buttonTrash.setAttribute('data-id', work.id);
                const iconTrash = document.createElement('span');
                iconTrash.classList.add('fa-solid', 'fa-trash-can');
                iconTrash.classList.add('fa-trash-can');

                buttonTrash.appendChild(iconTrash);

                container.append(img);
                divImages.append(container);
                container.append(buttonTrash);
                
            });

            const buttonTrashList = document.querySelectorAll('.buttonTrash');

            if (token) {
                buttonTrashList.forEach(buttonTrash => {
                    buttonTrash.addEventListener('click', () => {
                        console.log(buttonTrash);
                        const token = localStorage.getItem('token');
                        console.log(token);
                        const id = buttonTrash.parentNode.querySelector('img').id;
                        fetch(`http://localhost:5678/api/works/${id}`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`,
                            }
                        })
                            .then(response => {
                                if (response.ok) {
                                    const element = buttonTrash.parentNode;
                                    element.remove();
                                } else {
                                    console.error(`La suppression a échoué.`);
                                }
                            })
                            .catch(error => {
                                console.error(`Une erreur est survenue lors de la suppression de l'élément `, error)
                            });
                    });
                })
            }
        }
    });
    
    const lineGrey = document.createElement('div');
    lineGrey.setAttribute('class', 'lineGrey');
    modale1.appendChild(lineGrey);

    const addButton = document.createElement('button');
    addButton.setAttribute('class', 'addButton');
    addButton.innerText = 'Ajouter une photo';
    modale1.appendChild(addButton);

    const deleteHref = document.createElement('a');
    deleteHref.setAttribute('class', 'deleteHref');
    deleteHref.innerText = 'Supprimer la galerie'
    modale1.appendChild(deleteHref);


    addButton.addEventListener('click', () => {
        closeModale();
        const aside2 = document.querySelector('#modale2');
        aside2.style.display = null;
        aside2.removeAttribute('aria-hidden');
        aside2.setAttribute('aria-modale', 'true');
        modale = aside2;
        modale.querySelector('.fa-xmark').addEventListener('click', closeModale);
        
    });

    const divAddPhoto = document.createElement('div');
    divAddPhoto.setAttribute('class', 'divAddPhoto');

    const divIconPng = document.createElement('div');
    divIconPng.classList.add('divIconPng');

    divAddPhoto.appendChild(divIconPng);

    const iconPng = document.createElement('span');
    iconPng.classList.add('far', 'fa-image');
    iconPng.classList.add('logoImageSvg');

    divIconPng.appendChild(iconPng);

    const addPhoto = document.createElement('input');
    addPhoto.setAttribute('type', 'file');
    addPhoto.setAttribute('id', 'filesInput');
    addPhoto.setAttribute('accept', 'image/jpeg');
    addPhoto.setAttribute('accept', 'image/png');

    addPhoto.addEventListener('change', function () {
        if (this.files && this.files[0]) {
            const reader = new FileReader();

            reader.onload = function (e) {
                const img = document.createElement('img');
                img.setAttribute('src', e.target.result);
                img.style.objectFit = 'cover'
                divIconPng.classList.add('hidden');
                addPhoto.classList.add('hidden');
                addPhotoLabel.classList.add('hidden');
                spanAddPhoto.classList.add('hidden');

                divAddPhoto.appendChild(img);
            };

            reader.readAsDataURL(this.files[0]);
        }
    });

    const addPhotoLabel = document.createElement('label');
    addPhotoLabel.setAttribute('for', 'filesInput');
    addPhotoLabel.setAttribute('class', 'addPhoto');
    addPhotoLabel.innerHTML = '+ Ajouter photo';

    const spanAddPhoto = document.createElement('span');
    spanAddPhoto.setAttribute('class', 'spanAddPhoto');
    spanAddPhoto.innerText = 'jpg, png : 4mo max'
    modale2.appendChild(divAddPhoto);

    divAddPhoto.append(addPhoto, addPhotoLabel, spanAddPhoto);

    const divInput1 = document.createElement('div');
    divInput1.setAttribute('class', 'divInput1');
    modale2.appendChild(divInput1);

    const labelTitle = document.createElement("label");
    labelTitle.setAttribute('class', 'label');
    labelTitle.setAttribute('for', 'titleimage');
    labelTitle.innerText = 'Titre';

    const input1 = document.createElement('input');
    input1.setAttribute('class', 'input2');
    input1.type = 'text';

    divInput1.append(labelTitle, input1);

    const divInput2 = document.createElement('div');
    divInput2.setAttribute('class', 'divInput2');
    modale2.appendChild(divInput2);

    const labelCategories = document.createElement("label");
    labelCategories.setAttribute('class', 'label');
    labelCategories.setAttribute('for', 'categorieimage');
    labelCategories.innerText = 'Catégorie';

    const selectCategories = document.createElement('select');
    selectCategories.setAttribute('id', 'categorieimage');
    divInput2.appendChild(labelCategories);
    divInput2.appendChild(selectCategories);

    const option1 = document.createElement('option');
    option1.text = '';
    selectCategories.appendChild(option1);

    fetch('http://localhost:5678/api/categories', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .then(data => {
            showCategories(data, selectCategories);
        })
        .catch(error => console.error(error));

    const showCategories = (categories, selectCategories) => {

        categories.forEach((category) => {
    
            const option = document.createElement('option');
            option.innerText = category.name;
            option.value = category.id;
            console.log(option);
            selectCategories.appendChild(option);
        });
    }  

    const lineGrey2 = document.createElement('div');
    lineGrey2.setAttribute('class', 'lineGrey2');

    modale2.appendChild(lineGrey2);

    const OkButton = document.createElement('button');
    OkButton.setAttribute('class', 'addButton2');
    OkButton.innerText = 'Valider';
    OkButton.setAttribute('disabled', 'true');

    modale2.appendChild(OkButton);

    function disableButton() {
        if (addPhoto.value && input1.value && selectCategories.value) {
            OkButton.disabled = false;
            OkButton.style.cursor = 'pointer';
            OkButton.style.backgroundColor = '#1D6154';
        } else {
            OkButton.disabled = true;
        }
    }

    addPhoto.addEventListener('input', disableButton);
    input1.addEventListener('input', disableButton);
    selectCategories.addEventListener('input', disableButton);
    

}