import { starships } from '../data/starships.js'

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
    let shipImage = document.createElement("img")
    shipImage.src = `https://starwars-visualguide.com/assets/img/starships/${starShip}.jpg`
    shipView.appendChild(shipImage)
}

popNav()
popShips()