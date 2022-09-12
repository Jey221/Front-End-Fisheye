//mise en place des fonction pour les media sur la page photographers
//IMPORT
import {openCloseListbox,popularitySort} from '../utils/sort.js'
import {listenForLikes} from '../utils/like.js'
import { lightbox } from "../utils/lightbox.js";

//création d'une constante correspondante a l'id du photographe affiché
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
    popularitySort(tabMedia)//mise en place du tri populaire par défaut
    openCloseListbox(tabMedia);//appel de la fonction de tri via l'ouverture de la listbox
    return ({tabMedia: [...tabMedia]});
};

//mise en place d'une fonction pour afficher le contenu
async function displayDataMedia(tabMedia) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = "";
    tabMedia.forEach((tabMedia) => {
        const photographerModel = mediaFactory(tabMedia);
        const userCardDOM = photographerModel.getPhotographersMedias(tabMedia);
        gallery.appendChild(userCardDOM);
    });
};

async function initMedia() {
    // Récupère les datas des photographes
    const { tabMedia } = await getMediaPhotographer();
    displayDataMedia(tabMedia);
    listenForLikes(tabMedia);
    lightbox.init()
};
initMedia();

//mise en place d'une fonction pour l'intégration des medias sur la page photographe 
function mediaFactory(data) {  
    
    function getPhotographersMedias() { 
        //créer les espaces pour les medias
        const id = data.id
        const gallery = document.getElementById('gallery');
        const article = document.createElement( 'article' );
        article.setAttribute("id",`article-${id}`);
        gallery.appendChild(article);
        //créer les espaces pour le media cliquable
        const card = document.createElement( 'div' );
        const links = document.createElement( 'a' );
        const pictureName = data.image;
        const videoName = data.video;
        card.setAttribute("class","cardMedia");
        links.setAttribute("href",`assets/picture/${idPage}/${videoName || pictureName}`)
        links.setAttribute("aria-label", `Ouverture de la lightbox avec le media ${videoName || pictureName}` );
        article.appendChild(card);
        card.appendChild(links)
        //intégrer le media
        let articleMedia;
        if (data.hasOwnProperty('image')) {
            const titlePicture = data.title;
            //console.log(data);
            articleMedia = document.createElement( 'img' );
            articleMedia.setAttribute("src", `assets/picture/${idPage}/${pictureName}`);
            links.appendChild(articleMedia);
            articleMedia.setAttribute("class", "medias image");
            articleMedia.setAttribute("id", id);
            articleMedia.setAttribute("alt", titlePicture );
            articleMedia.setAttribute("aria-label", titlePicture );
        }else if (data.hasOwnProperty('video')) {
            const titlePicture = data.title;
            articleMedia = document.createElement('video')
            articleMedia.setAttribute("src", `assets/picture/${idPage}/${videoName}`);
            links.appendChild(articleMedia);
            articleMedia.setAttribute("class", "medias video");
            articleMedia.setAttribute("alt", titlePicture );
            articleMedia.setAttribute("aria-label", titlePicture );
            articleMedia.setAttribute("id", id);
        };

        //création du footer
        const footer = document.createElement( 'footer' );
        footer.setAttribute("class","footerMedias");
        article.appendChild(footer);

        //intégrer les infos du footer
        //nom du media
        const span = document.createElement( 'span' );
        const h2 = document.createElement( 'h2' );
        footer.appendChild(span);
        span.appendChild(h2)
        h2.setAttribute("class","article_media_title");
        h2.setAttribute("id",data.video || data.image );
        h2.setAttribute("aria-describedby", id);
        h2.textContent = data.title;

        //like sur media
        //délimitation de la zone de like 
        const likeZone = document.createElement( 'div' );
        footer.appendChild(likeZone);
        likeZone.setAttribute("class", "likeZone");

        //compteur de like
        const likeCount = document.createElement( 'span' );
        likeZone.appendChild(likeCount);
        likeCount.setAttribute("class", "likeCount");
        likeCount.setAttribute("id", `likeCount_${id}`);
        localStorage.setItem(`like${id}`,data.likes)
        likeCount.innerText = parseInt(localStorage.getItem(`like${id}`));

        //création d'un label like 
        const likeLabel = document.createElement( 'label' );
        likeZone.appendChild(likeLabel);
        likeLabel.setAttribute("for", id );
        likeLabel.setAttribute("tabindex", "0");
        likeLabel.classList.add('likeLabel');

        //création d'un Input like   
        const likeZoneInput = document.createElement( 'input' );
        likeLabel.appendChild(likeZoneInput);
        likeZoneInput.setAttribute("id", `like_${id}` );
        likeZoneInput.setAttribute("aria-label", "like checkbox");
        likeZoneInput.setAttribute("type", "checkbox");

        //mise en place d'un icon coeur   
        const heartCheck = document.createElement( 'i' );
        likeLabel.appendChild(heartCheck);
        heartCheck.setAttribute("class", "fa-solid fa-heart unchecked");
    
        return (article);
    };
    return { getPhotographersMedias}; 
};

mediaFactory();


export {getMediaPhotographer, displayDataMedia, initMedia};