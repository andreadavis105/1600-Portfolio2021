import { senators } from '../data/senators.js'
import { representatives } from '../data/representatives.js'


const congressGrid = document.querySelector('.membersGrid')
const seniority = document.querySelector('.seniority')
const birthday = document.querySelector('.birthday')

function displayMembers(simpleList) {
    simpleList.forEach(person => {
        let personDiv = document.createElement('div')
        let personFigure = document.createElement('figure')
        let figureImg = document.createElement('img')
        let figureCap = document.createElement('figcaption')

        figureImg.src = person.imgURL
        figureCap.textContent = person.name

        personFigure.appendChild(figureImg)
        personFigure.appendChild(figureCap)
        personDiv.appendChild(personFigure)
        congressGrid.appendChild(personDiv)
    })
}


function getImpInfo(peopleList) {
    return peopleList.map(person => {
        let middleName = person.middle_name ? `${person.middle_name}` : ``
        return {
            id: person.id,
            name: `${person.first_name}${middleName} ${person.last_name}`,
            imgURL: `https://www.govtrack.us/static/legislator-photos/${person.govtrack_id}-100px.jpeg`
        }
    })
}

displayMembers(getImpInfo(representatives))










/* const republicanButton = document.querySelector('.republicans')

republicanButton.addEventListener('click', () => {
    displayRepublicans()
})

function displayRepublicans() {
    const republicanMembers = representatives.filter((representative) => {
        return representative.party === 'R'
    })
} */