
async function logPokedex() {
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