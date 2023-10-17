// Manually define the list of Pokémon generations
const generations = [
  "Generation 1 (Kanto)",
  "Generation 2 (Johto)",
  "Generation 3 (Hoenn)",
  "Generation 4 (Sinnoh)",
  "Generation 5 (Unova)",
  "Generation 6 (Kalos)",
  "Generation 7 (Alola)",
  "Generation 8 (Galar)"
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