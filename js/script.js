let currentPokemonId = 1;

const pokemonName = document.getElementById('pokemon-name');
const pokemonImage = document.getElementById('pokemon-image');
const pokemonType = document.getElementById('pokemon-type');
const pokedex = document.querySelector('.pokedex');
const searchInput = document.getElementById('search-input');

const typeColors = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD'
};

document.getElementById('next-btn').addEventListener('click', () => {
    currentPokemonId++;
    fetchPokemon(currentPokemonId);
});

document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentPokemonId > 1) {
        currentPokemonId--;
        fetchPokemon(currentPokemonId);
    }
});


document.getElementById('search-btn').addEventListener('click', () => {
    const searchTerm = searchInput.value.toLowerCase().trim();
    if (searchTerm) {
        if (isNaN(searchTerm)) {
            fetchPokemonByName(searchTerm);
        } else {
            fetchPokemon(Number(searchTerm));
        }
    }
});


function fetchPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => response.json())
        .then(data => {
            currentPokemonId = id;
            updatePokedex(data);
        })
        .catch(error => {
            console.error('Error fetching Pokémon:', error);
            alert('Pokémon não encontrado!');
        });
}


function fetchPokemonByName(name) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(response => response.json())
        .then(data => {
            currentPokemonId = data.id;
            updatePokedex(data);
        })
        .catch(error => {
            console.error('Error fetching Pokémon:', error);
            alert('Pokémon não encontrado!');
        });
}


function updatePokedex(pokemon) {
    pokemonName.textContent = pokemon.name.toUpperCase();
    pokemonImage.src = pokemon.sprites.front_default;
    pokemonType.textContent = `Type: ${pokemon.types.map(type => type.type.name).join(', ')}`;
    
    const primaryType = pokemon.types[0].type.name;
    const backgroundColor = typeColors[primaryType] || '#FFFFFF';
    pokedex.style.backgroundColor = backgroundColor;
}


fetchPokemon(currentPokemonId);
