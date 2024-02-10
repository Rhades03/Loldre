let intentoChamp = null;
let campeones = null;
let acierto = false;
let  datos;
let intentos = 0;
let contadorPista = 10;
let titulo = null;
let campeon1 = null;
async function obtenerCampeon() {
    try {
        const respuesta = await fetch('http://ddragon.leagueoflegends.com/cdn/11.14.1/data/es_ES/champion.json');
        const datos = await respuesta.json();
        
        const campeones = datos.data;
        const nombresCampeones = Object.keys(campeones);
        
        const numTotalCampeones = nombresCampeones.length;
        const numCampeon = Math.floor(Math.random() * numTotalCampeones); // Utiliza Math.floor en lugar de Math.round para asegurar que el número generado esté dentro del rango correcto
        
        const campeon = nombresCampeones[numCampeon]; // Accede al nombre del campeón utilizando el índice generado
        
        return campeon;
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        return null; // Asegúrate de devolver null en caso de error
    }
}


async function adivinarCampeon() {
    const campeon = await obtenerCampeon();
    campeon1 = campeon;
    try {
        
        

        const respuesta = await fetch('https://ddragon.leagueoflegends.com/cdn/11.14.1/data/es_ES/champion/' + campeon + '.json');
        
        datos = await respuesta.json();
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}


async function enviarRespuesta() {
    intentoChamp = document.getElementById("input").value;
    intentos++;
    

    if(contadorPista != 0) contadorPista--;

    document.getElementById("intentosParrafo").innerHTML = `Llevas ${intentos} intentos.`;
    if(contadorPista != 0) document.getElementById("pista").innerHTML = `Pista en ${contadorPista} intentos.`;

    if(contadorPista == 0){
        const respuesta = await fetch('https://ddragon.leagueoflegends.com/cdn/11.14.1/data/es_ES/champion/' + campeon1 + '.json');

        datos = await respuesta.json();
        titulo = datos.data[campeon1].title;
        document.getElementById("pista").innerHTML = `Se le conoce como: ${titulo}`;
    }
    if (intentoChamp === campeon1) {
        acierto = true;
    }

    if (!acierto) {
        const iconUrl = `https://ddragon.leagueoflegends.com/cdn/11.14.1/img/champion/${intentoChamp}.png`; 
        const img = document.createElement("img");
        img.src = iconUrl;
        document.getElementById("icon").appendChild(img);
    }
}


window.onload = function() {
    adivinarCampeon();
};