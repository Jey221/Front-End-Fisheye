//Mettre le code JavaScript lié à la page photographer.html
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
    let media = await data.media;
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
        infoPhotographe.appendChild(nomPhotographe);

        //VILLE,PAYS
        const villePhotographe = document.createElement( 'div' );
        villePhotographe.setAttribute("class","villePhotographe");
        infoPhotographe.appendChild(villePhotographe);
        //TAGLINE
        const taglinePhotographe = document.createElement( 'div' );
        taglinePhotographe.setAttribute("class","taglinePhotographe");
        infoPhotographe.appendChild(taglinePhotographe);
        //TAG LIST
        const tagListPhotographe = document.createElement( 'div' );
        tagListPhotographe.setAttribute("class","tagListPhotographe");
        infoPhotographe.appendChild(tagListPhotographe);

        //intégration des infos du photographe 
        //NOM
        const h2 = document.createElement( 'h2' );
        nomPhotographe.appendChild(h2);
        this.name = data.name;
        h2.textContent = this.name;

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

        //TAG LIST
        
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
        img.setAttribute("class", "photo_profil_info_photographe");


        return (infoPhotographe);
    };
    return { getPhotographersInfos };

};

infoFactory();


