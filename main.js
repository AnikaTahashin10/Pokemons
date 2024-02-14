document.addEventListener("DOMContentLoaded", () => {
  const generationButtons = document.querySelectorAll("#generation button");
  const searchInput = document.getElementById("search");
  const pokemonList = document.getElementById("pokemon-list");
  const generationCount = document.getElementById('generation-count');

  generationButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const generation = button.value;
      try {
        const pokemons = await fetchPokemonsByGeneration(generation);
        displayPokemonList(pokemons);
        displayGenerationCount(pokemons.length);
      } catch (error) {
        console.error("Error fetching pokemons by generation:", error);
      }
    });
  });

  async function fetchPokemonsByGeneration(generation) {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/generation/${generation}/`
      );
      const data = await response.json();
      return data.pokemon_species;
    } catch (error) {
      throw new Error("Error fetching pokemons:", error);
    }
  }
  async function fetchPokemons(id) {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${id}/`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Error fetching pokemons:", error);
    }
  }

  function displayPokemonList(pokemons) {
    pokemonList.innerHTML = ""; // Clear existing list
    pokemons.forEach(async (pokemon) => {
      const listItem = document.createElement("li");
      listItem.classList.add("pokemon-card");
  
      const serialNumber = document.createElement("span");
      serialNumber.textContent = pokemons.indexOf(pokemon) + 1 + "."; // Index for ordering
      listItem.appendChild(serialNumber);
  
      const name = document.createElement("span");
      name.textContent = pokemon.name; // Pokémon name
      listItem.appendChild(name);
  
      // Extract Pokemon ID
      const pokemonId = extractPokemonId(pokemon.url);
  
      try {
        // Fetch single Pokémon details
        let singlePokemon = await fetchPokemons(pokemonId);
  
        // Display weight and height
        const weight = document.createElement("span");
        weight.textContent = `Weight: ${singlePokemon.weight}`;
        listItem.appendChild(weight);
  
        const height = document.createElement("span");
        height.textContent = `Height: ${singlePokemon.height} `; 
        listItem.appendChild(height);
  
        // Display types
        const types = document.createElement("span");
        types.textContent = `Types: ${singlePokemon.types.map(t => t.type.name).join(", ")}`; // Map types to a string
        listItem.appendChild(types);
  
        // Fetch and display image
        const pokeImage = await loadPokemon(pokemonId);
        pokeImage.alt = pokemon.name;
        listItem.appendChild(pokeImage);
      } catch (error) {
        console.error("Failed to load details for Pokémon:", pokemon.name, error);
      }
  
      pokemonList.appendChild(listItem);
    });
  }
  function extractPokemonId(url) {
    // Extracting the ID from the Pokemon's URL
    const parts = url.split("/");
    return parts[parts.length - 2];
  }

  function displayGenerationCount(count) {
    generationCount.textContent = `Number of Pokemons in this generation: ${count}`;
  }


  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const pokemonCards = pokemonList.getElementsByClassName("pokemon-card");
    Array.from(pokemonCards).forEach((card) => {
      const pokemonName = card
        .getElementsByTagName("span")[1]
        .textContent.toLowerCase();
      if (pokemonName.includes(searchTerm)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});




// This function loads the image of a given pokemon
async function loadPokemon(pokemon) {
	const requestURL =
	"https://pokeapi.co/api/v2/pokemon/" + pokemon;
	const request = new Request(requestURL);

	// Wait till we get a response
	const response = await fetch(request);
	// The response is a JSON file, convert it to JavaScript object
	const pokeObject = await response.json();
	// Read a member from the object
	let frontSprite = pokeObject.sprites.front_default;

	// Create a new image and set the source
	let pokeImage = new Image();
	pokeImage.src = frontSprite; 

	// NOTE: because this function is marked async
	// this image is wrapped inside a Promise, that 
	// we must wait to resolve
	return pokeImage;
}

// Call the function, get a Promise object
let pokeImagePromise = loadPokemon();
// When the promise is completed (when image loads) then...
pokeImagePromise.then(
		// The function gets the contents of the promise as a parameter
		// this parameter is our Image
		function(imageObject) {
			let img = document.createElement("img");
			img.setAttribute("src", imageObject.src);
			// And so on...
			let b = document.getElementById("images");
			b.appendChild(img);
});