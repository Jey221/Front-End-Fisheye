//Mettre le code JavaScript lié à la page photographer.html

async function getInfosPhotographer() {

    let response = await fetch("data/photographers.json");
    let data = await response.json();
    console.log(data);

    let photographers = await data.photographers;
    let media = await data.media;
    console.log(photographers);
    console.log(media);

    return ({photographers: [...photographers]});
};
console.log(getInfosPhotographer());

async function displayData(photographers) {    
    const profil = document.getElementById('photographer-profil');
    photographers.forEach((photographer) => {
        const photographerModel = infoFactory(photographer);
        const userCardDOM = photographerModel.getPhotographersInfos();
        profil.appendChild(userCardDOM);
    });
};
async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getInfosPhotographer();
    displayData(photographers);
};
init();


//mise en place d'une fonction pour la mise en place des info sur page Photograher

function infoFactory(data) {    
    const { name, portrait, city, country, tagline, price } = data; 
    function getPhotographersInfos() { 

        //selectionner l'espace du profil photographe
        const profil = document.getElementById('photographer-profil');
        const buttonForm = document.querySelector('.contact_button')
        console.log(profil);


        //créer une div pour les info du photographe
        const infoPhotographe = document.createElement( 'div' );
        infoPhotographe.setAttribute("class","infoPhotographe");
        profil.insertBefore(infoPhotographe , buttonForm);

        //créer une div pour chaque lignes d'infos
        //NOM
        const nomPhotographe = document.createElement( 'div' );
        nomPhotographe.setAttribute("class","nomPhotographe");
        infoPhotographe.appendChild(nomPhotographe);
        h2.textContent = name;

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
        //h2.textContent = city +", "+ country;

        //VILLE,PAYS
        const pVille = document.createElement( 'p' );
        villePhotographe.appendChild(pVille);
        pVille.classList.add('p_Ville_Info_Photographe');
        //pCity.textContent = city +", "+ country;

        //TAGLINE
        const pTagline = document.createElement( 'p' );
        taglinePhotographe.appendChild(pTagline);
        pTagline.classList.add('p_Tagline_Info_Photographe');
        //pCity.textContent = city +", "+ country;

        //TAG LIST
        return (infoPhotographe);
    };
    return { getPhotographersInfos };

};
console.log(infoFactory());


