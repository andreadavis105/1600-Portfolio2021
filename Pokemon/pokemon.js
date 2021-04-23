import { removeChildren } from "../UtilityFunctions/index.js"

const pokemonGrid = document.querySelector('.pokemonGrid')
const pokemonButton = document.querySelector('.pokemonButton')
const addNewButton = document.querySelector('.addNew')
const createPokemon = document.querySelector('.createPokemon')

let offset = 0
let limit = 25

pokemonButton.addEventListener('click', () => {
    loadPage(offset, limit)
    offset += limit
    pokemonButton.textContent = `load the next ${limit} Pokemon`
})

addNewButton.addEventListener('click', () => {
    let pokemonId = prompt("Enter Pokemons name or ID#:").toLowerCase()
    getPokemonData(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`).then(
        data => displayCard(data)
    ).catch(error => console.log(error))
})


class Pokemon {
    constructor(name, height, weight, abilities) {
        this.name = name
        this.height = height
        this.weight = weight
        this.abilities = abilities
    }
}

createPokemon.addEventListener("click", () => {
    let newPokemonId = 899
    let pokemonName = prompt("Enter the name of your new Pokemon:")
    let pokemonHeight = prompt("Enter the height:")
    let pokemonWeight = prompt("Enter the weight:")
    let pokemonAbility = prompt("Enter ability:")
    let abilArray = getAbilitiesArray(pokemonAbility)
    let newPokemon = new Pokemon(newPokemonId, 
        pokemonName,
        pokemonHeight,
        pokemonWeight,
        abilArray)
    displayCard(newPokemon)
    })

/* function getAbilitiesArray(input)
    let tempArr = input.split(',')
    return tempArr.map((abilityName => {
        return {
            ability: {
                name: abilityName,
            }
        }
    })) */

    function getAbilitiesArray(commaString) {
        let tempArray = commaString.split(',')
        return tempArray.map((abilityName) => {
          return {
            ability: {
              name: abilityName,
            },
          }
        })
      }

async function getPokemonData(url) {
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        alert("That data is not available")
    }
}

function loadPage(offset, limit) {
    removeChildren(pokemonGrid)
    getPokemonData(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`).then(
        async (data) => {
            for (const singlePokemon of data.results) {
                await getPokemonData(singlePokemon.url).then(
                    (pokemonInfo) => displayCard(pokemonInfo)
                )
            }
        }
    )
}

function displayCard(singlePokemon) {
    // removeChildren(pokemonPage)
    let pokemonPage = document.createElement('div')
    pokemonPage.className = 'page'
    let pokemonCard = document.createElement('div')
    pokemonCard.className = 'card'

    pokemonCard.addEventListener('click', () => {
        pokemonCard.classList.toggle('flipped-back')
    })
    pokemonCard.appendChild(displayFront(singlePokemon))
    pokemonCard.appendChild(displayBack(singlePokemon))

    pokemonPage.appendChild(pokemonCard)
    pokemonGrid.appendChild(pokemonPage)
}


function displayFront(pokemon) {
    let front = document.createElement('div')
    front.className = 'cardSide cardSideFront'
    let frontText = document.createElement('p')
    frontText.className = 'name'
    frontText.textContent = pokemon.name
    let frontPic = document.createElement('img')
    frontPic.className = 'frontImg'
    frontPic.src = getAllImages(pokemon)

    frontPic.addEventListener('error', () => frontPic.src = 'Images/pokemonCardBack.png')

    front.appendChild(frontPic)
    front.appendChild(frontText)

    //moving back text to front
    /* let frontStats = document.createElement('div')
    // frontStats.className = 'cardSide cardSideFront' */
    let frontStatsId = document.createElement('p')

    frontStatsId.textContent = `ID: ${pokemon.id}`
    let frontStatsWeight = document.createElement('p')
    frontStatsWeight.textContent = `Weight: ${pokemon.weight}`
    let frontStatsHeight = document.createElement('p')
    frontStatsHeight.textContent = `Height: ${pokemon.height}`

    let textAbil = document.createElement('p')
    textAbil.textContent = "Abilities:"
    textAbil.className = 'abilities'

    /* let textAbil = document.createElement('p')
    textAbil.textContent = `abilities: ${pokemon.abilities
         .map((ability) => ability.ability.name)
         .join("; ")}` */

    front.appendChild(frontStatsId)
    front.appendChild(frontStatsWeight)
    front.appendChild(frontStatsHeight)
    front.appendChild(textAbil)

    pokemon.abilities.forEach((pokemonAbility) => {
        console.log(pokemonAbility)
        let frontStatsAbil = document.createElement('p')
        frontStatsAbil.textContent = pokemonAbility.ability.name
        front.appendChild(frontStatsAbil)
    })

   /*  pokemon.abilities.forEach((pokemonAbility) => {
        console.log(pokemonAbility)
        let frontStatsAbil = document.createElement('p')
        frontStatsAbil.textContent = pokemonAbility.ability.name
        front.appendChild(frontStatsAbil)
    }) */

    return front
}

 function displayBack(pokemon) {
    let back = document.createElement('div')
    back.className = 'cardSide cardSideBack'
    let backPic = document.createElement('img')
    backPic.className = 'backPic'
    backPic.src = `Images/pokemonCardBack.png`

    back.appendChild(backPic)

    /*let backTextOne = document.createElement('p')
    backTextOne.textContent = `ID: ${pokemon.id}`
    let backTextTwo = document.createElement('p')
    backTextTwo.textContent = `weight: ${pokemon.weight}`
    let backTextThree = document.createElement('p')
    backTextThree.textContent = `height: ${pokemon.height}`
    let backTextAbil = document.createElement('p')
    backTextAbil.textContent = "Abilities:" */
    
    // backTextThree.textContent = `abilities: ${pokemon.abilities
    //     .map((ability) => ability.ability.name)
    //     .join("; ")}`
    
    /* back.appendChild(backTextOne)
    back.appendChild(backTextTwo)
    back.appendChild(backTextThree)
    back.appendChild(backTextAbil) */

    /* pokemon.types.forEach((pokeType) => {
        //console.log(pokeType.type.name)
        let backTextFour = document.createElement('p')
        backTextFour.textContent = pokeType.type.name
        back.appendChild(backTextFour)
      }) */

    /* pokemon.abilities.forEach((pokemonAbility) => {
        console.log(pokemonAbility)
        let backTextFour = document.createElement('p')

        backTextFour.textContent = pokemonAbility.ability.name
        back.appendChild(backTextFour) 
    }) */
    return back
 }

/* function getAllImages(pokemon) {
    if (pokemon.id < 10) {
        return `images/00${pokemon.id}.png`
    } else if (pokemon.id > 9 && pokemon.id < 100) {
        return `images/0${pokemon.id}.png`
    } else if (pokemon.id > 99 && pokemon.id < 898) {
        return `images/${pokemon.id}.png`
    }
    return `https:raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/749.png`
} */

function getAllImages(pokemon) {
    let pokemonId
    if(pokemon.id < 10) pokemonId = `00${pokemon.id}`
    if(pokemon.id > 9 && pokemon.id < 100) pokemonId = `0${pokemon.id}`
    if(pokemon.id > 99 && pokemon.id < 898) pokemonId = `${pokemon.id}`

    return `https:raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${pokemonId}.png`
}

// add 3 thing to card and make the card collection only populate once for one click so it doesn't keep populating page with pokemon