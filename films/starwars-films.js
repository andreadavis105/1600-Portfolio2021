import { films } from '../data/films.js'
import { getLastNum} from '../UtilityFunctions/index.js'

/* let movieOne = document.querySelector("#movie1")
let movieTwo = document.querySelector("#movie2")

movieOne.textContent = films[2].title
movieTwo.textContent = films[1].title

console.log(films[0].title) */

let movieList = document.querySelector(".movieList")

for (let i = 0; i < films.length; i++) {
    const filmLookup = films.find(film => getMovieNumber(film.url) === (i + 1))
    let figure = document.createElement("figure")
    let newPoster = document.createElement("img")
    let figCaption= document.createElement("figcaption")
    newPoster.src = `https://starwars-visualguide.com/assets/img/films/${i + 1}.jpg`
    figCaption.textContent = filmLookup.title
    
    figure.appendChild(newPoster)
    figure.appendChild(figCaption)
    movieList.appendChild(figure)

    

}
function getMovieNumber(url) {
    let movNum = url.charAt(url.length - 2)
    return parseInt(movNum, 10)
}