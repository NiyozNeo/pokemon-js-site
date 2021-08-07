/* Select and create func */
let findEl = element => document.querySelector(element);
let createEl = element => document.createElement(element);

/* main selection */
let form = findEl(".form");
let ul = findEl(".list");
let template = findEl("#template").content
let select = findEl(".type__selection");
let search = findEl(".form__search");
let sortSelect = findEl(".sort__selection")

let modalList = findEl(".modal__list");
let openM = findEl(".open");
let modal = findEl(".modal");
let body = findEl("body");
let modalBtn = findEl(".modal__btn");
let modalImg = findEl(".modal__img")
let pokemonsTypes = [];


let sortAz = function (a, b) {
    if (a.name > b.name) {
        return 1
    } else if (a.name < b.name) {
        return -1
    } else {
        return 0
    }
}

let sortZa = function (a, b) {
    if (a.name > b.name) {
        return -1
    } else if (a.name < b.name) {
        return 1
    } else {
        return 0
    }
}

let newOld = function (a, b) {
    return a.birth_date - b.birth_date;
}

let oldNew = function (a, b) {
    return b.birth_date - a.birth_date;
}

let sortObj = {
    0: sortAz,
    1: sortZa,
    2: oldNew,
    3: newOld
}


/* create pokemon list */
function create(arr) {
    let temp = template.cloneNode(true);
    temp.querySelector(".item__img").src = arr.img;
    temp.querySelector(".item__img").width = 157;
    temp.querySelector(".item__img").height = 157;
    temp.querySelector(".item__name").textContent = arr.name;
    temp.querySelector(".item__type").textContent = arr.type;
    temp.querySelector(".item__kilo").textContent = arr.weight;
    temp.querySelector(".item__save").dataset.id = arr.id;
    let age = 2021 - new Date(arr.birth_date).getFullYear()
    temp.querySelector(".item__age").textContent = `${age} age`;
    ul.appendChild(temp)
    for (const iterator of arr.type) {

        findByGenre(iterator)
    }
}


/* round type */

/* Find by types */
function findByGenre(type) {

    if (!pokemonsTypes.includes(type)) {
        pokemonsTypes.push(type)

        /* Find Genre and add to option */
        let option = createEl("option");
        option.textContent = type;
        select.appendChild(option)

    }
}

/* find  */

function searchFunc(evt) {
    evt.preventDefault();

    ul.innerHTML = ""

    let value = select.value;
    let searchValue = search.value;

    let sortValue = sortSelect.value;
    console.log(sortValue);
    let newRegExp = new RegExp(searchValue, "gi")

    let foundPokemons = pokemons.filter(pokemon => {
        if (value === "All") {
            return pokemons

        } else {
            return pokemon.type.includes(value)
        }
    }).filter(pok => {
        return pok.name.match(newRegExp)
    }).sort(sortObj[sortValue])

    foundPokemons.forEach(pokemon => {
        create(pokemon)
    })
}


pokemons.forEach(element => {
    create(element)
})

form.addEventListener("submit", searchFunc);

let savedPokemons = JSON.parse(window.localStorage.getItem("saved")) || []


openM.addEventListener("click", function () {
    body.classList.add("body--active");
    modal.style = "display: block";
    body.addEventListener("click", function (evt) {
        if (evt.target === body  || evt.target === modalBtn || evt.target === modalImg) {
            body.classList.remove("body--active");
            modal.style = "display: none";
        }
    })
})



ul.addEventListener("click", function(evt) {
    if(evt.target.matches(".item__save")){
        let findPok = pokemons.find(pokemon => String(pokemon.id) === evt.target.dataset.id);
        if(!savedPokemons.includes(findPok)) {
            savedPokemons.push(findPok)
            
        }
        window.localStorage.setItem("saved", JSON.stringify(savedPokemons))
        modalList.innerHTML = null
        
        savedPokemons.forEach(element => createModal(element))
        // createModal(findPok);
    }
 
})

savedPokemons.forEach(element => createModal(element))
function createModal(arr) {
    let temp = template.cloneNode(true);
    temp.querySelector(".item__img").src = arr.img;
    temp.querySelector(".item__img").width = 157;
    temp.querySelector(".item__img").height = 157;
    temp.querySelector(".item__name").textContent = arr.name;
    temp.querySelector(".item__type").textContent = arr.type;
    temp.querySelector(".item__kilo").textContent = arr.weight;
    temp.querySelector(".item__save").dataset.id = arr.id;
    temp.querySelector(".item__save").textContent = 'Delate';
    temp.querySelector(".item__save").classList.add("delate");
    temp.querySelector(".item__save").classList.remove("item__save");
    let age = 2021 - new Date(arr.birth_date).getFullYear()
    temp.querySelector(".item__age").textContent = `${age} age`;
    modalList.appendChild(temp)
}

modalList.addEventListener("click", function (evt) {
    if(evt.target.matches(".delate")) {
        
        let foundIndex = savedPokemons.findIndex(item => String(item.id) === evt.target.dataset.id)
        savedPokemons.splice(foundIndex, 1);
        modalList.innerHTML = ''
        window.localStorage.setItem("saved", JSON.stringify(savedPokemons))
        savedPokemons.forEach(element => createModal(element))
    }
})