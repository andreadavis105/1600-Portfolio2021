import { senators } from '../data/senators.js'
import { representatives } from '../data/representatives.js'
import { removeChildren } from '../UtilityFunctions/index.js'


const congressGrid = document.querySelector('.membersGrid')
const seniority = document.querySelector('.seniority')
const birthday = document.querySelector('.birthday')

seniority.addEventListener('click', () => senioritysortby())

function displayMembers(simpleList) {
    removeChildren(congressGrid)
    simpleList.forEach(person => {
        let personDiv = document.createElement('div')
        personDiv.className = 'figElement'
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
            imgURL: `https://www.govtrack.us/static/legislator-photos/${person.govtrack_id}-100px.jpeg`,
            seniority: person.seniority  //convert string to int. I don't need to do this but incase I do it would be      seniority: parseInt(person.seniority, 10)     10 is for the base 10 number system
        }
    })
}

function senioritysortby() {
    displayMembers(getImpInfo(senators).sort((a, b) => {
        return a.seniority -b.seniority
    }))
}

displayMembers(getImpInfo(senators))










/* const republicanButton = document.querySelector('.republicans')

republicanButton.addEventListener('click', () => {
    displayRepublicans()
})

function displayRepublicans() {
    const republicanMembers = representatives.filter((representative) => {
        return representative.party === 'R'
    })
} */