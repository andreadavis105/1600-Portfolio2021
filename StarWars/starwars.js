import { films } from '../data/films.js'

/* let movieOne = document.querySelector("#movie1")
let movieTwo = document.querySelector("#movie2")

movieOne.textContent = films[2].title
movieTwo.textContent = films[1].title

console.log(films[0].title) */

let movietitle = document.querySelector(".movieTitle")

for (var i = 0; i < films.length; i++) {
    let title = films[i].title
    let newTitle = document.createElement("li")
    newTitle.textContent = title
    movietitle.appendChild(newTitle)
}