const search = document.getElementById('searchBar'); 
const pokedex = document.getElementById('pokedex');
const generationButtons = document.getElementById('.generation-button');
const pokemonList = document.getElementById("pokemon-list");

let pokemon = [];

console.log(pokedex);

//searchBar functionality
console.log(searchBar);
searchBar.addEventListener('keyup', (e) => {
  const searchString = (e.target.value.toLowerCase());
  const filteredCharacters = pokemon.filter(pokeman => {
    return pokeman.name.toLowerCase().includes(searchString) || pokeman.type.includes(searchString);
  });
  displayPokemon(filteredCharacters )
});


//to get pokemon by generation using each gen button
// generationButtons.addEventListener("click", (event) => {
//   if (event.target.tagName === "BUTTON") {
//     const generation = event.target.id;
//     getPokemonByGeneration(generation);
//   }
// });


//fetching data using margits code

const fetchPokemon = async () => {
  
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=121&offset=0');
    const data = await response.json();

    const fetches = data.results.map((item) => {
      return fetch(item.url)
        .then((res) => res.json())
        .then((data) => data);
    });

    Promise.all(fetches).then((results) => {
      const pokemon = results.map((data) => ({
        id: data.id,
        name: data.name,
        image: data.sprites['front_default'],
        type: data.types.map((type) => type.type.name).join(', '),
        weight: data.weight,
        height: data.height,
       generation: data.generation,
       
      }
      ));
      displayPokemon(pokemon);
    });
  }

fetchPokemon();



//to display the pokemons
const displayPokemon = (pokemon) => {
  console.log(pokemon);
  const pokemonHTMLString = pokemon.map((pokeman) => ` <li class = "card">
  <img class = "card-image" src ="${pokeman.image}"/>
  <h2 class = "card-title">${pokeman.id}. ${pokeman.name}</h2>
  <p class = "card-subtitle">Type: ${pokeman.type}</p>
  <p class = "card-subtitle">Height: ${pokeman.height}</p>
  <p class = "card-subtitle">Weight: ${pokeman.weight}</p>
  </li>`).join('');
  pokedex.innerHTML = pokemonHTMLString;
};

 fetchpokemon()

















// let pokeData = [];

// const fetchData = async () => {
//   await fetch('https://pokeapi.co/api/v2/pokemon?limit=121&offset=0')
//     .then((response) => response.json())
//     .then((data) => {
//       const fetches = data.results.map((item) => {
//         return fetch(item.url)
//           .then((res) => res.json())
//           .then((data) => {
//             return {
//               id: data.id,
//               name: data.name,
//               img: data.sprites.other['official-artwork'].front_default,
//               types: data.types,
//               height: data.height,
//               weight: data.weight,
//             };
//           });
//       });
//       Promise.all( fetches).then((res) => {
//         pokeData = res;
//         pokeCards();
//       });
//     });
// };







 



