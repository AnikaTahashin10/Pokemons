const search = document.getElementById('searchBar'); 
const pokedex = document.getElementById('pokedex');
let pokemon = [];

console.log(pokedex);

//to make the searchbar work
console.log(searchBar);
searchBar.addEventListener('keyup', (e) => {
  const searchString = (e.target.value.toLowerCase());
  const filteredCharacters = pokemon.filter(pokeman => {
    return pokeman.name.toLowerCase().includes(searchString);
  });
  displayPokemon(filteredCharacters )
});


const fetchpokemon = () => {
  const promises = [];
  for (i = 1; i<= 150 ; i++ ){
const url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
promises.push(fetch(url).then((res) => res.json()))
  }

  Promise.all(promises).then((results) => {
     pokemon = results.map((data) => ({
      id: data.id,
      name: data.name,
      image: data.sprites['front_default'],
      type: data.types.map((type) => type.type.name).join(', '),
      weight: data.weight,
      height: data.height,
      //generation: data.generation.name,
    }));
   displayPokemon(pokemon);
  });
};

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






 





//  document.addEventListener("DOMContentLoaded", function () {
//   const imgOptions = {};
//   const imgObserver = new IntersectionObserver((entries, imgObserver) => {
//     entries.forEach((entry) => {
//       if (!entry.isIntersecting) return;
//       const img = entry.target;
//       const dataImage = img.getAttribute("data-image");
//       img.src = dataImage;
//       imgObserver.unobserve(img);
//     });
//   }, imgOptions);

//   const orderNumber = (str) => {
//     const mySubString = str.substring(str.lastIndexOf("s/") + 2, str.lastIndexOf("/"));
//     return mySubString;
//   };

//   const container = document.getElementById("container");

//   const fetchPokemons = async (endpoint) => {
//     try {
//       const response = await fetch(endpoint, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       const data = await response.json();
//       return data.pokemon_species;
//     } catch (error) {
//       console.log(error);
//       return [];
//     }
//   };

//   const updateImageClass = (img) => {
//     const imagelink = img.parentNode;
//     imagelink.classList.add("loaded");
//   };

//   const createPokemonItem = (pokemon, toggleurl) => {
//     const numero3decimals = orderNumber(pokemon.url);
//     const paddedNumber = numero3decimals.padStart(3, "0");
//     const imageUrl = `${toggleurl}${paddedNumber}.png`;

//     const divitem = document.createElement("li");
//     divitem.classList.add("item");

//     const img = new Image();
//     img.src = "https://i.gifer.com/origin/28/2860d2d8c3a1e402e0fc8913cd92cd7a_w200.gif";
//     img.setAttribute("data-image", imageUrl);
//     img.setAttribute("class", "pokeimage");
//     img.setAttribute("alt", pokemon.name);

//     divitem.innerHTML = `
//       <div>${orderNumber(pokemon.url)} - ${pokemon.name}</div>`;
//     divitem.appendChild(img);
//     container.appendChild(divitem);
//     imgObserver.observe(img);
//   };

//   const getPokemons = async (numero, toggle) => {
//     const endpoint = `https://pokeapi.co/api/v2/generation/${numero}/`;
//     container.innerHTML = "";
//     const pokemons = await fetchPokemons(endpoint);
    
//     const toggleurl = toggle
//       ? "https://assets.pokemon.com/assets/cms2/img/pokedex/full/"
//       : "https://www.serebii.net/pokemongo/pokemon/";

//     pokemons.sort((a, b) => a.nr - b.nr);

//     pokemons.forEach((pokemon) => {
//       createPokemonItem(pokemon, toggleurl);
//     });
//   };

  // const filters = document.getElementById("filters");
  // const geners = [
  //   "generation-1",
  //   "generation-2",
  //   "generation-3",
  //   "generation-4",
  //   "generation-5",
  //   "generation-6",
  //   "generation-7",
  // ];

//   let gen = "";
//   for (let i = 0; i < geners.length; i++) {
//     gen += `
//       <input class="radio-gens" type="radio" id=${geners[i]} value=${i + 1} name="generation" checked>
//       <label for=${geners[i]} class="label-gens">${geners[i]}</label>`;
//   }
//   filters.innerHTML = gen;

//   filters.addEventListener("click", function (e) {
//     if (e.target.type === "radio") {
//       getPokemons(e.target.value, toggle);
//       title.innerHTML = "Pokemon " + e.target.id;
//     }
//   });

//   const btnAllSchool = document.getElementById("btnAllSchool");
//   let toggle = false;
//   btnAllSchool.addEventListener("click", function () {
//     toggle = !toggle;
//     getPokemons(numero, toggle);
//   });

//   const title = document.getElementById("title");
//   const numero = 1;

//   getPokemons(numero);
// });




















/* async function logPokedex() {
  const response = await fetch("https://pokeapi.co/api/v2/generation/{id or name}/");
  const pokedex = await response.json();
  console.log(pokedex);
}
console.log(logPokedex());

// Manually define the list of Pokémon generations
const generations = [
  "Generation 1 ",
  "Generation 2 ",
  "Generation 3 ",
  "Generation 4 ",
  "Generation 5 ",
  "Generation 6 ",
  "Generation 7 ",
  "Generation 8 ",
  "Generation 9 "

];

// Function to display the generations
function displayGenerations() {
  const generationList = document.getElementById('generation-list');

  generations.forEach(generationName => {
      const generationElement = document.createElement('li');
      generationElement.textContent = generationName;
      
      // Added a click event listener to handle when a generation is clicked
      generationElement.addEventListener('click', () => {
          // code here to handle the click event

      });
//to add each newly created list item to the HTML element with the ID generation-list.
      generationList.appendChild(generationElement);
  });
}

displayGenerations();

*/