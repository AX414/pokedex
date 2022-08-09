const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');
let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status == 200) {
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {  
    pokemonNumber.innerHTML = '';
    pokemonName.innerHTML = 'Loading...';
    const data = await fetchPokemon(pokemon);

    //Se tiver dados, renderiza na tela
    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id + ' - ';
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']
            ['animated']['front_default'];
        input.value = '';
        searchPokemon = data.id;
    }else{
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not Found';
        pokemonNumber.innerHTML = '';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
    new Audio('../music/A button.mp3').play();
});

btnPrev.addEventListener('click', () => {
    new Audio('../music/A button.mp3').play();
    if(searchPokemon>1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

btnNext.addEventListener('click', () => {
    new Audio('../music/A button.mp3').play();
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

//Renderiza o primeiro pokemon quando entrar
renderPokemon(searchPokemon);

//Loop do Audio
myAudio = new Audio('../music/Littleroot Town.mp3'); 
if (typeof myAudio.loop == 'boolean')
{
    myAudio.loop = true;
}
else
{
    myAudio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
}
myAudio.play();