const getPokemons = async () => {
    const urlApi = "api.json"
    try{
        const response = await fetch(urlApi);
        const pokemons = await response.json();
        //console.log(pokemons)
        return pokemons
    }

    catch (error){
        console.log(error.message);
    }

    
}

const getTypes = async () => {
    pokemons = await getPokemons();
    const types = [];
    
    for (let i = 0; i < pokemons.length; i++) {
        if (!types.includes(pokemons[i].type)){
        types.push(pokemons[i].type)
    }
    }
    console.log(types)
    return types;
}




const getButtonTypes = async () => {
    types = await getTypes();
    pokemons = await getPokemons();
    const contenedorTipos =  document.getElementById('typeButtons');
    for (let i = 0; i<types.length; i++){
        const buttonType = document.createElement('button');
        buttonType.classList.add('button-type');
        buttonType.textContent = types[i];
        contenedorTipos.appendChild(buttonType)
    }
    const botones = document.querySelectorAll('.button-type');
    botones.forEach(boton => {
    boton.addEventListener('click', () => {
        const type = boton.innerText.trim().toLowerCase();
        console.log(type);
        const filteredPokemons = pokemons.filter(pokemon =>
            pokemon.type.toLowerCase().includes(type));
                filtrarPokemons(filteredPokemons);
    
    });
    
    
});

}

getButtonTypes();



const mostrarTarjetas = async () => {
    pokemons = await getPokemons();
    //console.log(pokemons)
    const container = document.getElementById('pokemonContainer');
    container.innerHTML = '';
    for (let i = 0; i<pokemons.length; i++){
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('pokemon-card');
        const nombre = document.createElement("p");
        nombre.classList.add('pokemon-name');
        nombre.textContent = pokemons[i].id + " - " +pokemons[i].name;
        tarjeta.appendChild(nombre)
        const imagen = document.createElement("img");
        imagen.classList.add('pokemon-image');
        imagen.src = pokemons[i].ThumbnailImage;
        tarjeta.appendChild(imagen)
        const tipo = document.createElement("p");
        tipo.classList.add('pokemon-type');
        tipo.textContent = "Tipo: " + pokemons[i].type;
        tarjeta.appendChild(tipo)
        tarjeta.setAttribute("id", pokemons[i].number)
        tarjeta.addEventListener('click', function(){mostrarDetalles(i)})
        container.appendChild(tarjeta);

        
    }
    //pokemons.map((pokemon) => {
        
    //});
}

mostrarTarjetas();


async function mostrarDetalles(i, filteredPokemons) {
    let index = i
    pokemons = await getPokemons();
    console.log("detalle mostrado")
    const modal = document.getElementById('pokemonModal');
    const modalContent = document.getElementById('modalContent');

    if (filteredPokemons){
        for (let i=0; i< filteredPokemons.length; i++)
            {
                if(index == i){
                    modalContent.innerHTML = `
                <h2 class="modalPokename">${filteredPokemons[i].name}</h2>
                <img src="${filteredPokemons[i].ThumbnailImage}" class="modalImage"/>
                <p class="modaltext"> Numero Pokedex: ${filteredPokemons[i].number} 
                <br>   Tipo: ${filteredPokemons[i].type} 
                <br>   Habilidad: ${filteredPokemons[i].abilities}
                <br>   Debil contra: <br>${filteredPokemons[i].weakness} </p>               
                
            `;
            modal.style.display = 'flex';
                }
            }
    }

    else{
    for (let i=0; i< pokemons.length; i++)
    {
        if(index == i){
            modalContent.innerHTML = `
        <h2 class="modalPokename">${pokemons[i].name}</h2>
        <img src="${pokemons[i].ThumbnailImage}" class= "modalImage"/>
        <p class="modaltext"> Numero Pokedex: ${pokemons[i].number} 
        <br>   Tipo: ${pokemons[i].type} 
        <br>   Habilidad: ${pokemons[i].abilities}
        <br>   Debil contra:<br> ${pokemons[i].weakness}</p>
        
    `;
    modal.style.display = 'flex';
        }
    }
}

}
const modal = document.getElementById('pokemonModal');
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

document.getElementById('btnBuscar').addEventListener('click', async function() {
    
    const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
    console.log(searchTerm)
    const pokemons = await getPokemons();
    const filteredPokemons = pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm)
    );
    filtrarPokemons(filteredPokemons);
    document.getElementById('searchInput').value = "";
    
})



const filtrarPokemons = (filteredPokemons) => {
    console.log(filteredPokemons)
    const container = document.getElementById('pokemonContainer');
    container.innerHTML = '';
    for (let i = 0; i<filteredPokemons.length; i++){
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('pokemon-card');
        
        // Nombre
        const nombre = document.createElement("p");
        nombre.classList.add('pokemon-name');
        nombre.textContent = filteredPokemons[i].id + " - " +filteredPokemons[i].name;
        tarjeta.appendChild(nombre)
        
        // Imagen
        const imagen = document.createElement("img");
        imagen.classList.add('pokemon-image');
        imagen.src = filteredPokemons[i].ThumbnailImage;
        tarjeta.appendChild(imagen)
        
        // Tipo
        const tipo = document.createElement("p");
        tipo.classList.add('pokemon-type');
        tipo.textContent = "Tipo: " + filteredPokemons[i].type;
        tarjeta.appendChild(tipo)
        
        // ID
        tarjeta.setAttribute("id", filteredPokemons.number);
        
        // Evento clic para mostrar detalles
        tarjeta.addEventListener('click', function() {
            mostrarDetalles(i, filteredPokemons);
        });
        
        container.appendChild(tarjeta);
    }
}
    
