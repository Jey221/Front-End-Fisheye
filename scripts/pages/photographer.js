//Mettre le code JavaScript lié à la page photographer.html
//mise en place des infos surr la page photogaphe
//import des données
import {getMediaPhotographer, initMedia} from '../factories/media.js'

//création d'une constante correspondante a l'URL
const idPage = window.location.search.split("?id=").join("");

//mise en place d'une fonction pour recupèrer infos du json
async function getInfosPhotographer() {

    let response = await fetch("data/photographers.json");
    let data = await response.json();
    let photographers = await data.photographers;
    //filtre pour avoir infos du photographe sur la page
    const tabPhotographe = photographers.filter(value => {
        if( value.id == idPage ) return true;
        });
    return ({tabPhotographe: [...tabPhotographe]});
};

//mise en place d'une fonction pour afficher le contenu
async function displayData(tabPhotographe) {    
    const profil = document.getElementById('photographer-profil');
    tabPhotographe.forEach((tabPhotographe) => {
        const photographerModel = infoFactory(tabPhotographe);
        const userCardDOM = photographerModel.getPhotographersInfos();
        const buttonForm = document.querySelector('.contact_button')  
        profil.insertBefore(userCardDOM , buttonForm);
    });


};
async function init() {
    // Récupère les datas des photographes
    const { tabPhotographe } = await getInfosPhotographer();
    displayData(tabPhotographe);
    getMediaPhotographer()
    infoFactory();
    initMedia();
};
init();

//mise en place d'une fonction pour les différentes info sur page Photographer
function infoFactory(data) {  
    function getPhotographersInfos() { 

        //selectionner l'espace du profil photographe
        const profil = document.getElementById('photographer-profil');
        const buttonForm = document.querySelector('.contact_button')

        //créer une div pour les info du photographe
        const infoPhotographe = document.createElement( 'div' );
        infoPhotographe.setAttribute("class","infoPhotographe");
        profil.insertBefore(infoPhotographe , buttonForm);

        //créer une div pour chaque lignes d'infos
        //NOM
        const nomPhotographe = document.createElement( 'div' );
        nomPhotographe.setAttribute("class","nomPhotographe");
        nomPhotographe.setAttribute("tabindex","0");
        infoPhotographe.appendChild(nomPhotographe);

        //VILLE,PAYS
        const villePhotographe = document.createElement( 'div' );
        villePhotographe.setAttribute("class","villePhotographe");
        villePhotographe.setAttribute("tabindex","0");
        infoPhotographe.appendChild(villePhotographe);

        //TAGLINE
        const taglinePhotographe = document.createElement( 'div' );
        taglinePhotographe.setAttribute("class","taglinePhotographe");
        taglinePhotographe.setAttribute("tabindex","0");
        infoPhotographe.appendChild(taglinePhotographe);
        
        //intégration des infos du photographe 
        //NOM
        const h1 = document.createElement( 'h1' );
        nomPhotographe.appendChild(h1);
        this.name = data.name;
        h1.textContent = this.name;

        //VILLE,PAYS
        const pVille = document.createElement( 'p' );
        villePhotographe.appendChild(pVille);
        pVille.classList.add('p_Ville_Info_Photographe');
        this.city=data.city;
        this.country=data.country;
        pVille.textContent = this.city +", "+ this.country;;

        //TAGLINE
        const pTagline = document.createElement( 'p' );
        taglinePhotographe.appendChild(pTagline);
        pTagline.classList.add('p_Tagline_Info_Photographe');
        this.tagline=data.tagline;
        pTagline.textContent = this.tagline;
        
        //créer une div pour la photo de profil du photographe
        const photoProfil = document.createElement( 'div' );
        photoProfil.setAttribute("class","photoProfil");
        profil.appendChild(photoProfil);

        //insérer la photo de profil du photographe
        const profilPicture = data.portrait;
        const img = document.createElement( 'img' );
        img.setAttribute("src", `assets/photographers/${profilPicture}`);
        photoProfil.appendChild(img);
        img.setAttribute("alt", "photo de profil de " + this.name );
        img.setAttribute("aria-label", this.name );
        img.setAttribute("tabindex","0");
        img.setAttribute("class", "photo_profil_info_photographe");

        //intégrer encart tarif & total like
        const main = document.getElementById('main');
        const encart = document.createElement( "aside" );
        main.appendChild(encart);
        encart.setAttribute("class","encart");
        const spanPrix = document.createElement( 'span' );
        const spanLike = document.createElement( 'span' );
        const heart = document.createElement( 'i' );
        heart.setAttribute("class", "fa-solid fa-heart");
        spanLike.setAttribute("id", "likeEncart");
        encart.appendChild(spanLike);
        encart.appendChild(heart);
        encart.appendChild(spanPrix);
        spanPrix.textContent = data.price + "€/jour";

        //intégrer nom du photographe dans le modal
        const titreModal = document.getElementById("titreModalContact");
        titreModal.textContent = "Contactez-moi " + this.name;

        return (infoPhotographe);
    };
    return { getPhotographersInfos };

};

