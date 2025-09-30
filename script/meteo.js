//Variables
const cardMeteo = document.querySelector(".cardMeteo");
const button = document.querySelector("button");
const info = document.createElement("div");

//Animation carte météo via AOS
AOS.init({
    duration : 1000,
});

//Affichage de la météo du jour via bouton charger :

info.setAttribute("style", "height : 300px ; width : 200px; marginTop : 16px ; marginBottom : 16px ; border : solid, 3px, grey ; paddingTop : 16px ; paddingLeft : 12px ; paddingRight : 12px ; paddingBottom : 24px ");
cardMeteo.insertBefore(info, button);

function addInfo(texte){
    info.innerText = texte;
};

function bouton(){
    button.classList.add("button__cardMeteo");
};

button.addEventListener("mousedown", () =>{
    button.setAttribute("style", "background : orange");
})

window.addEventListener("mouseup", () =>{
    button.removeAttribute("style", "background : orange");
});

const getMeteo = async () => {
    return await fetch("https://prevision-meteo.ch/services/json/toulouse")
        .then(response => {
            return response.json();
    });
};
button.addEventListener("click", () => {
    getMeteo().then(data => {
        addInfo(
            `Condition actuelle : ${data.current_condition.condition}\n
            Température : ${data.current_condition.tmp}°\n
            Température maximum : ${data.fcst_day_0.tmax}°\n
            Température minimum : ${data.fcst_day_0.tmin}°`
        );
    });
    bouton();
});

