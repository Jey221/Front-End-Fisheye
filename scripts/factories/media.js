//mise en place des fonction pour les media sur la page photographers

//création d'une constante correspondante a l'URL
const idPage = window.location.search.split("?id=").join("");

//mise en place d'une fonction pour recupèrer infos du json
async function getMediaPhotographer() {

    let response = await fetch("data/photographers.json");
    let data = await response.json();
    let media = await data.media;
    //filtre pour avoir medias du photographe sur la page
    const tabMedia = media.filter(value => {
        if( value.photographerId == parseInt(idPage,10) ) return true;
        });
    return ({tabMedia: [...tabMedia]});
};

//mise en place d'une fonction pour afficher le contenu
async function displayDataMedia(tabMedia) {    
    const gallery = document.getElementById('gallery');
    console.log(tabMedia);
    tabMedia.forEach((tabMedia) => {
        const photographerModel = mediaFactory(tabMedia);
        const userCardDOM = photographerModel.getPhotographersMedias();
        gallery.appendChild(userCardDOM);
    });
};

async function init2() {
    // Récupère les datas des photographes
    const { tabMedia } = await getMediaPhotographer();
    displayDataMedia(tabMedia);
};
init2();


//mise en place d'une fonction pour les différentes info sur page Photographer
function mediaFactory(data) {  
    let dataMedia = getMediaPhotographer();

    /**console.log(getMediaPhotographer());
    const { photographerId, image, video } = data;
    let link, linkNoExtension, pictureName;

    if (data.hasOwnProperty('image')) {
        pictureName = image.slice(0, -4);
        link = `./assets/picture/${photographerId}/${image}`;
        linkNoExtension = `./assets/picture/${photographerId}/${pictureName}`
    } else if (data.hasOwnProperty('video')) 
    {
        link = `./assets/photos/${photographerId}/${video}`;
    };*/
    function getPhotographersMedias() { 

        //créer les espaces pour les medias
        const id = data.id
        const gallery = document.getElementById('gallery');
        const article = document.createElement( 'article' );
        article.setAttribute("id",`article-${id}`);
        gallery.appendChild(article);

        //créer les espaces pour le media cliquable
        const card = document.createElement( 'div' );
        card.setAttribute("class","cardMedia");
        article.appendChild(card);

        //créer le lien
        const a = document.createElement( 'a' );
        a.setAttribute("href","");
        a.setAttribute("aria-label", "lien vers media");
        card.appendChild(a);

        //intégrer le media
        const pictureName = data.image;
        console.log(pictureName);
        const img = document.createElement( 'img' );
        img.setAttribute("src", `assets/picture/${idPage}/${pictureName}`);
        article.appendChild(img);
        img.setAttribute("class", "medias");

        //img.setAttribute("alt", "photo de profil de " + this.name );
        //img.setAttribute("class", "photo_profil_info_photographe");


        //création du footer
        const footer = document.createElement( 'footer' );
        footer.setAttribute("class","footerMedias");
        article.appendChild(footer);


        return (article);
    };
    return { getPhotographersMedias };

};

mediaFactory();


export {getMediaPhotographer,displayDataMedia,init2,mediaFactory}