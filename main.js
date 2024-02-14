const search = document.getElementById('searchBar'); 
const pokedex = document.getElementById('pokedex');
const generationButtons = document.getElementById('.generation-button');
const pokemonList = document.getElementById("pokemon-list");

let pokemon = [];

console.log(pokedex);

//searchBar functionality

searchBar.addEventListener('keyup', (e) => {
  const searchString = (e.target.value.toLowerCase());
  const filteredCharacters = pokemon.filter(pokeman => {
    return pokeman.name.toLowerCase().includes(searchString) || pokeman.type.includes(searchString);
  });
  displayPokemon(filteredCharacters )
});



//fetching data

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

// fetchPokemon();



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

//  fetchpokemon()

 // Filter Pokemon by name or type
 search.addEventListener('keyup', (e) => {
  const searchString = e.target.value.toLowerCase();
  const filteredPokemon = pokemon.filter(pokeman => {
      return pokeman.name.toLowerCase().includes(searchString) || pokeman.type.includes(searchString);
  });
  displayPokemon(filteredPokemon);
});


const generation = async () => {
  
  const response = await fetch('https://pokeapi.co/api/v2/generation/{generation}/');
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




// Initial fetch of all Pokemon
fetchPokemon();







 



