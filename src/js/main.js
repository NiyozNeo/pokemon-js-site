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
let modalList = findEl(".modal__list")
let openM = findEl(".open")
let modal = findEl(".modal")
let body = findEl("body");
let modalBtn = findEl(".modal__btn")
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
function create (arr) {
    let temp = template.cloneNode(true);
    temp.querySelector(".item__img").src = arr.img;
    temp.querySelector(".item__img").width = 157;
    temp.querySelector(".item__img").height = 157;
    temp.querySelector(".item__name").textContent = arr.name;
    temp.querySelector(".item__type").textContent = arr.type;
    temp.querySelector(".item__kilo").textContent = arr.weight;
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

let buttons = document.querySelectorAll(".item__save");
let itemClone = document.querySelectorAll(".item");

buttons.forEach( (element, i) =>{
    element.addEventListener("click", function (){
        let cloned = itemClone[i].cloneNode(true);
        
        cloned.querySelector(".item__save").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg>`

        cloned.querySelector(".item__save").classList.add("remove");
        cloned.querySelector(".item__save").classList.remove("item__save");

        modalList.appendChild(cloned);

        itemClone[i].querySelector(".item__save").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"/></svg>`;
        itemClone[i].querySelector(".item__save").classList.add("unlike");
        itemClone[i].querySelector(".item__save").classList.remove("item__save");
        
    })

})

openM.addEventListener("click", function () {
    modal.style = "display: block;"
    body.classList.add("body--active")
})
modalBtn.addEventListener("click", function (){
    modal.style = "display: none;"
    body.classList.remove("body--active")
})

