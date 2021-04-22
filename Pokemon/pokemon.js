const pokemonGrid = document.querySelector('.pokemonGrid')
const pokemonButton = document.querySelector('.pokemonButton')
const addNewButton = document.querySelector('.addNew')
const createPokemon = document.querySelector('.createPokemon')

pokemonButton.addEventListener('click', () => {
    loadPage()
})

addNewButton.addEventListener('click', () => {
    let pokemonId = prompt("Enter Pokemons name or ID#:").toLowerCase()
    getPokemonData(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`).then(
        data => displayCard(data)
    ).catch(error => console.log(error))
})


class Pokemon {
    constructor(name, height, weight, moves, abilities) {
        this.name = name
        this.height = height
        this.weight = weight
        this.moves = moves
        this.abilities = abilities
    }
}

createPokemon.addEventListener("click", () => {
    let pokemonName = prompt("Enter the name of your new Pokemon:")
    let pokemonHeight = prompt("Enter the height:")
    let pokemonWeight = prompt("Enter the weight:")
    let pokemonMove = prompt("Enter 1 move:")
    let pokemonMoveTwo = prompt("Enter another move: (only accepts two moves")
    let pokemonAbil = prompt("Enter ability:")
    let pokemonAbilTwo = prompt("Enter another ability:")
    let newPokemon = new Pokemon(pokemonName,
        pokemonHeight,
        pokemonWeight,
        [pokemonMove, pokemonMoveTwo],
        [pokemonAbil, pokemonAbilTwo])
    displayCard(newPokemon)
})

async function getPokemonData(url) {
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        alert("That data is not available")
    }
}

function loadPage() {
    getPokemonData(`https://pokeapi.co/api/v2/pokemon?limit=25&offset=74`).then(
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
    frontText.textContent = pokemon.name
    let frontPic = document.createElement('img')
    frontPic.src = getAllImages(pokemon)
    front.appendChild(frontPic)
    front.appendChild(frontText)
    return front
}

function displayBack(pokemon) {
    let back = document.createElement('div')
    back.className = 'cardSide cardSideBack'
    let backTextOne = document.createElement('p')
    backTextOne.textContent = `ID: ${pokemon.id}`
    let backTextTwo = document.createElement('p')
    backTextTwo.textContent = `weight: ${pokemon.weight}`
    let backTextThree = document.createElement('p')
    backTextThree.textContent = `height: ${pokemon.height}`
    
    // backTextThree.textContent = `abilities: ${pokemon.abilities
    //     .map((ability) => ability.ability.name)
    //     .join("; ")}`
    
    back.appendChild(backTextOne)
    back.appendChild(backTextTwo)
    back.appendChild(backTextThree)
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