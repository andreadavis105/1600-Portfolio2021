import { senators } from '../data/senators.js'
import { representatives } from '../data/representatives.js'
import { removeChildren } from '../UtilityFunctions/index.js'


const congressGrid = document.querySelector('.membersGrid')
const senioritySen = document.querySelector('.senioritySen')
const seniorityRep = document.querySelector('.seniorityRep')

const repubButtonSen = document.querySelector('.republicansSen')
const democButtonSen = document.querySelector('.democratsSen')
const othersButtonSen = document.querySelector('.othersSen')

const repubButtonRep = document.querySelector('.republicansRep')
const democButtonRep = document.querySelector('.democratsRep')



repubButtonSen.addEventListener('click', () => {
    displayMembers(getMembersByParty(senators, 'R'))
})

democButtonSen.addEventListener('click', () => {
    displayMembers(getMembersByParty(senators, 'D'))
})

othersButtonSen.addEventListener('click', () => {
    displayMembers(getMembersByParty(senators, "ID"))
})


senioritySen.addEventListener('click', () => senioritysortbySen())

seniorityRep.addEventListener('click', () => senioritysortbyReps())


repubButtonRep.addEventListener('click', () => {
    displayMembers(getMembersByParty(representatives, 'R'))
})

democButtonRep.addEventListener('click', () => {
    displayMembers(getMembersByParty(representatives, 'D'))
})

function displayMembers(simpleList) {
    removeChildren(congressGrid)
    simpleList.forEach(person => {
        let personDiv = document.createElement('div')
        personDiv.className = 'figElement'
        let personFigure = document.createElement('figure')
        let figureImg = document.createElement('img')
        let figureCap = document.createElement('figcaption')
        
        if (person.party === 'R') personDiv.className = 'repub'
        if (person.party === 'D') personDiv.className = 'democ'
        if (person.party === 'ID') personDiv.className = 'other'

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
            name: `${person.first_name} ${middleName} ${person.last_name}`,
            imgURL: `https://www.govtrack.us/static/legislator-photos/${person.govtrack_id}-100px.jpeg`,
            seniority: parseInt(person.seniority, 10),  //convert string to int. I don't need to do this but incase I do it would be      seniority: parseInt(person.seniority, 10)     10 is for the base 10 number system
            party: person.party
        }
    })
}

function senioritysortbySen() {
    displayMembers(getImpInfo(senators).sort((a, b) => {
        return a.seniority -b.seniority
    }))
}

function senioritysortbyReps() {
    displayMembers(getImpInfo(representatives).sort((a, b) => {
        return a.seniority - b.seniority
    }))
}

// displayMembers(getImpInfo(senators))


const getMembersByParty = (group, partyAff) => {
    return getImpInfo(group).filter(peep => peep.party === partyAff)
}









/* const republicanButton = document.querySelector('.republicans')

republicanButton.addEventListener('click', () => {
    displayRepublicans()
})

function displayRepublicans() {
    const republicanMembers = representatives.filter((representative) => {
        return representative.party === 'R'
    })
} */