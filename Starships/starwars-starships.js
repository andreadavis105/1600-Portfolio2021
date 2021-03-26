import { starships } from '../data/starships.js'
import { getLastNum, removeChildren } from '../UtilityFunctions/index.js'

const main = document.querySelector("main")
const navList = document.querySelector(".shipsList")
const shipView = document.querySelector(".view")

function popNav() {
    starships.forEach(starship => {
        let anchorWrap = document.createElement("a")
        anchorWrap.href = "#"
        anchorWrap.addEventListener("click", () => {
            popShips(starship)
        })
        let listItem = document.createElement("li")
        listItem.textContent = starship.name
        
        anchorWrap.appendChild(listItem)
        navList.appendChild(anchorWrap)

    }) 
}

function popShips(shipData) {
    removeChildren(shipView)
    let shipImage = document.createElement("img")
    let shipNum = getLastNum(shipData.url)
    shipImage.src = `https://starwars-visualguide.com/assets/img/starships/${shipNum}.jpg`
    //fix a broken image
    shipImage.addEventListener("error", () => {
    shipImage.hidden = true
    })
    shipView.appendChild(shipImage)
}


popNav()
//popShips()

function starField(element, numStars) {
    element.style.setProperty("background-color", "black")
    for (let i = 0; i < numStars; i++) {
        let star = document.createElement("div")
        star.style.setProperty("width", "2px")
        star.style.setProperty("height", "2px")
        star.style.setProperty("background-color", "white")
        let xy = randomLocation()
        star.style.left = `${xy[0]}px`
        star.style.top = `${xy[1]}px`
        star.style.setProperty("position", "absolute")
        element.appendChild(star)
    }
}

function randomLocation() {
    let y = document.body.scrollHeight
    let x = document.body.scrollWidth
    let randomY = Math.floor(Math.random() * y)
    let randomX = Math.floor(Math.random() * x)
    return [randomX, randomY]
}

starField(document.querySelector("body"), 400)