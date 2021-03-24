import { people } from '../data/people.js'

const mainContent = document.querySelector("main")

const mainHeader = document.createElement("header")

const maleButton = document.createElement("button")
maleButton.textContent = "Male Characters"
maleButton.addEventListener("click", () => {
    populateDom(maleCharacters)
})

mainHeader.appendChild(maleButton)
document.body.insertBefore(mainHeader, mainContent)

const maleCharacters = people.filter(person => person.gender ==="male")
const femaleCharacters = people.filter(person => person.gender === "female")
const otherCharacters = people.filter(person => {
    if (person.gender === "n/a" || person.gender === "none") {
        return person
    }
})
function populateDom(characters) {
    removeChildren(mainContent)
    characters.forEach(person => {
    const charFigure = document.createElement("figure")
    const charImg = document.createElement("img")
    let charNum = getLastNum(person.url)
    charImg.src = `https://starwars-visualguide.com/assets/img/characters/${charNum}.jpg`
    const charCaption = document.createElement("figcaption")

    charCaption.textContent = person.name
    charFigure.appendChild(charImg)
    charFigure.appendChild(charCaption)

    mainContent.appendChild(charFigure)
})
}
function getLastNum(url) {
    let end = url.lastIndexOf("/")
    let start = end - 2
    if (url.charAt(start) === "/") {
        start ++
    }
    return url.slice (start, end)
}

function removeChildren(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild)
    }
}