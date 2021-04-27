import { planets} from '../data/planets.js'
import { getLastNum, removeChildren} from '../UtilityFunctions/index.js'

const main = document.querySelector("main")
const planetsList = document.querySelector(".planetNames")
const planetPhotos = document.querySelector(".photos")


function navigation() {
    planets.forEach(planet => {
        let anchor = document.createElement("a")
        anchor.href = "#"
        anchor.addEventListener("click", () => {
            displayPhoto(planet)
        })
        let item = document.createElement("li")
        item.textContent = planet.name

        anchor.appendChild(item)
        planetsList.appendChild(anchor)
    })
}

function displayPhoto(property) {
    removeChildren(planetPhotos)
    let image = document.createElement("img")
    let imageNum = getLastNum(property.url)
    image.src = `https://starwars-visualguide.com/assets/img/planets/${imageNum}.jpg`
    
    //fix the broken images icon from displaying
    /* image.addEventListener("error", () => {
        image.hidden = true
    }) */
    image.addEventListener("error", ()=> image.src = 'Images/planetsUnavail_caps.png')
    planetPhotos.appendChild(image)
}

navigation()
//displayPhoto()  -already called in the navigation function/forEach loop