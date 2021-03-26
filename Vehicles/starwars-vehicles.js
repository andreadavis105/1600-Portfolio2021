import { vehicles } from '../data/vehicles.js'

const mainContent = document.querySelector("main")

vehicles.forEach(speeder => {
    const carFigure = document.createElement("figure")
    const carImg = document.createElement("img", "div")
    let picNum = getPicNum(speeder.url)
    carImg.src = `https://starwars-visualguide.com/assets/img/vehicles/${picNum}.jpg`
    const carCaption = document.createElement("figcaption")

    carCaption.textContent = speeder.name
    carFigure.appendChild(carImg)
    carFigure.appendChild(carCaption)

    mainContent.appendChild(carFigure)
    carImg.addEventListener("error", () => {
        carImg.hidden = true
    })
    
})

function getPicNum(url) {
    let last = url.lastIndexOf("/")
    let begin = last - 2
    if (url.charAt(begin) === "/") {
        begin = begin + 1
        // shorthand for above line is "begin ++"
    }
    return url.slice (begin, last)
}