//Tableaux de personnages :
const usersHuman = [{
        type: "humain",
        name: "John Doe",
        email: "j.smith@gmail.com",
        age: 25,
        avatar : './img/john.png',
        icon : './img/john_icon.png',
        latitude : 43.604429,
        longitude : 1.443812
    },
    {
        type: "humain",
        name: "Jane Smith",
        email: "ja.doe@sfr.fr",
        age: 5,
        avatar : './img/jane.png',
        icon : './img/jane_icon.png',
        latitude : 43.60792, 
        longitude : 1.44133
    },
    {
        type: "humain",
        name: "Le Vénérable",
        email: "levy@gmail.com",
        age: 500,
        avatar : './img/venerable.png',
        icon : './img/venerable_icon.png',
        latitude : 43.60053,
        longitude : 1.44590
    }
];

const usersPet = [{
        type: "animal de compagnie",
        espece: "chien",
        name: "Rox",
        age: 7,
        propriétaire: "John Doe",
        avatar : './img/chien.png',
        icon : './img/chien_icon.png',
        latitude : 43.60377,
        longitude : 1.43583
    },
    {
        type: "animal de compagnie",
        espece: "renard",
        name: "Roukie",
        age: 300,
        propriétaire: "Le Vénérable",
        avatar : './img/renard.jpg',
        icon : './img/renard_icon.png',
        latitude : 43.59602,
        longitude : 1.43692
    }
];

const usersXeno = [{
        type: "Xeno",
        espece: "Krogan",
        name: "Wrex",
        menace: "Rouge",
        age: 45,
        avatar : './img/wrex.png',
        icon : './img/wrex_icon.png',
        latitude : 43.59555,
        longitude : 1.45257
    },
    {
        type: "Xeno",
        espece: "Turien",
        name: "Garrus",
        menace: "Vert",
        age: 35,
        avatar : './img/garrus.png',
        icon : './img/garrus_icon.png',
        latitude : 43.61108,
        longitude : 1.45539
    },
    {
        type: "Xeno",
        espece: "Asari",
        name: "Liara",
        menace: "ULTRA Rouge",
        age: 25,
        avatar : './img/liara.png',
        icon : './img/liara_icon.png',
        latitude : 43.61183,
        longitude :  1.43222
    }
];

//Variable contenant tous les personnages :

const tabData = [];
tabData.push(usersHuman, usersXeno, usersPet);


// Fonctions pour créer une carte de personnage:

function cardHuman(objet){
    const article = document.createElement("article");
    const titre = document.createElement("h2");
    titre.innerText = objet.name;
    const img = document.createElement("img");
    img.setAttribute("src", objet.avatar);
    img.setAttribute("alt", `Portrait de : ${objet.name}`);
    const p = document.createElement("p");
    p.innerText = `Age : ${objet.age} Email : ${objet.email}`
    article.append(titre, img, p);
    article.classList.add("card");
    return article;
};
function cardPet(objet){
    const article = document.createElement("article");
    const titre = document.createElement("h2");
    titre.innerText = objet.name;
    const img = document.createElement("img");
    img.setAttribute("src", objet.avatar);
    img.setAttribute("alt", `Portrait de : ${objet.name}`);
    const p = document.createElement("p");
    p.innerText = `Age : ${objet.age} Espèce : ${objet.espece} Propriétaire : ${objet.propriétaire}`
    article.append(titre, img, p);
    article.classList.add("card")
    return article;
};
function cardXeno(objet){
    const article = document.createElement("article");
    const titre = document.createElement("h2");
    titre.innerText = objet.name;
    const img = document.createElement("img");
    img.setAttribute("src", objet.avatar);
    img.setAttribute("alt", `Portrait de : ${objet.name}`);
    const p = document.createElement("p");
    p.innerText = `Age : ${objet.age} Espèce : ${objet.email} Niveau de menace : ${objet.menace}`
    article.append(titre, img, p);
    article.classList.add("card")
    return article;
};

//Fonction pour creer une carte de personnage en fonction de son type :

function profil(tabObjet){
    const cardList = [];
    for (let i=0 ; i<tabObjet.length ; i++){
        if (tabObjet[i].type == "humain"){
            cardList.push(cardHuman(tabObjet[i]));
        } else if (tabObjet[i].type == "animal de compagnie"){
            cardList.push(cardPet(tabObjet[i]));
        }else if (tabObjet[i].type == "Xeno") {
            cardList.push(cardXeno(tabObjet[i]));
        }else {
            console.log("Type de Profil non Existant")
        };
    }; return cardList;
};

//Fonction pour afficher toutes les cartes contenues dans le tableau:

function profilAll(tabObjet){
    const profils = document.querySelector(".profils");
    for (let i=0 ; i< tabObjet.length ; i++){
        const cardTab = profil(tabObjet[i]);
        for (let j=0 ; j< cardTab.length ; j++){
            profils.appendChild(cardTab[j]);
        };
    };
};

// Appel de la fonction pour afficher toutes les cartes personnages dans le DOM :

profilAll(tabData);

// Intégration carte via API :

var map = L.map('map').setView([ 43.604429, 1.443812], 14);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


// Fonction pour ajouter un marqueur personnage sur la carte :

function markerProfil(objet){
const ICON = L.icon({
    iconUrl: objet.icon,
    iconSize: [50, 83], 
    iconAnchor: [25, 83]
});
L.marker([objet.latitude, objet.longitude], {icon: ICON}).addTo(map);
};

// Appel de la fonction sur tous les personnages :

tabData.forEach(profil => {
    profil.forEach(perso => {
        markerProfil(perso);
    })
    
});

