const search = document.getElementById('search'); 
const pokedex = document.getElementById('pokedex');
console.log(pokedex);


const fetchpokemon = () => {
  const promises = [];
  for (i = 1; i<= 150; i++ ){
const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
promises.push(fetch(url).then((res) => res.json()))
  }

  Promise.all(promises).then((results) => {
    const pokemon = results.map((data) => ({
      id: data.id,
      name: data.name,
      image: data.sprites['front_default'],
      type: data.types.map((type) => type.type.name).join(', '),
      weight: data.weight,
      height: data.height,
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