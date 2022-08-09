//mise en place des fonction pour les media sur la page photographers
//import {displayLightbox,closeLightbox} from '../utils/lightbox.js'

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
        //card.onclick = displayLightbox();
        article.appendChild(card);


        /*//créer le lien
        const a = document.createElement( 'a' );
        a.setAttribute("href","");
        a.setAttribute("aria-label", "lien vers media");
        card.appendChild(a);*/

        //intégrer le media
        let articleMedia;

        if (data.hasOwnProperty('image')) {
            const pictureName = data.image;
            const titlePicture = data.title;
            articleMedia = document.createElement( 'img' );
            articleMedia.setAttribute("src", `assets/picture/${idPage}/${pictureName}`);
            card.appendChild(articleMedia);
            articleMedia.setAttribute("class", "medias");
            articleMedia.setAttribute("alt", "photo de " + titlePicture );
        }else if (data.hasOwnProperty('video')) {
            const videoName = data.video;
            const titlePicture = data.title;
            articleMedia = document.createElement('video')
            articleMedia.setAttribute("src", `assets/picture/${idPage}/${videoName}`);
            card.appendChild(articleMedia);
            articleMedia.setAttribute("class", "medias");
            articleMedia.setAttribute("alt", "video de " + titlePicture );
        };

        //création du footer
        const footer = document.createElement( 'footer' );
        footer.setAttribute("class","footerMedias");
        article.appendChild(footer);

        //intégrer les infos du footer
        const span = document.createElement( 'span' );
        article.appendChild(span);
        span.setAttribute("class","article_media_title");
        span.textContent = data.title;
     

        return (article);
    };
    return { getPhotographersMedias };

};

mediaFactory();


export {getMediaPhotographer,displayDataMedia,init2,mediaFactory}