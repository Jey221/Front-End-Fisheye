//mise en place des fonction pour les media sur la page photographers
//import {displayLightbox} from '../utils/lightbox.js'

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
    listenForLikes(tabMedia);

};
init2();

//mise en place d'une fonction pour incrémentation et décrémentation des likes

const listenForLikes = (tabMedia) => {
    const likes = document.querySelectorAll(".likeLabel");
    console.log(tabMedia);
    likes.forEach(like => {
        like.addEventListener("click", (event) => {
            event.target.classList.toggle('unchecked')
            event.target.classList.toggle('checked')
            const id = like.getAttribute("for")
            if (event.target.classList.contains('checked')) {
                console.log(document.getElementById(`likeCount_${id}`));
                console.log(id);
                document.getElementById(`likeCount_${id}`).innerHTML = parseInt(document.getElementById(`likeCount_${id}`).innerHTML)+1;

            } else {
                console.log(document.querySelector('.unchecked'));
                document.getElementById(`likeCount_${id}`).innerHTML = parseInt(document.getElementById(`likeCount_${id}`).innerHTML)-1;

            }
        })
    })
}


//mise en place d'une fonction pour les différentes info sur page Photographer
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
        article.appendChild(card);
        card.appendChild(links)

        //intégrer le media
        let articleMedia;
        if (data.hasOwnProperty('image')) {
            const titlePicture = data.title;
            articleMedia = document.createElement( 'img' );
            articleMedia.setAttribute("src", `assets/picture/${idPage}/${pictureName}`);
            links.appendChild(articleMedia);
            articleMedia.setAttribute("class", "medias image");
            articleMedia.setAttribute("id", id);
            articleMedia.setAttribute("alt", titlePicture );
        }else if (data.hasOwnProperty('video')) {
            const titlePicture = data.title;
            articleMedia = document.createElement('video')
            articleMedia.setAttribute("src", `assets/picture/${idPage}/${videoName}`);
            links.appendChild(articleMedia);
            articleMedia.setAttribute("class", "medias video");
            articleMedia.setAttribute("alt", titlePicture );
            articleMedia.setAttribute("id", id);
        };

        //création du footer
        const footer = document.createElement( 'footer' );
        footer.setAttribute("class","footerMedias");
        article.appendChild(footer);

        //intégrer les infos du footer
        //nom du media
        const span = document.createElement( 'span' );
        footer.appendChild(span);
        span.setAttribute("class","article_media_title");
        span.setAttribute("id",data.video || data.image );
        span.textContent = data.title;

        //nombre de like sur media
        const likeZone = document.createElement( 'div' );
        footer.appendChild(likeZone);
        likeZone.setAttribute("class", "likeZone");

        const likeCount = document.createElement( 'span' );
        likeZone.appendChild(likeCount);
        likeCount.setAttribute("class", "likeCount");
        likeCount.setAttribute("id", `likeCount_${id}`);
        likeCount.innerText = data.likes;

        const likeLabel = document.createElement( 'label' );
        likeZone.appendChild(likeLabel);
        likeLabel.setAttribute("for", id );
        likeLabel.classList.add('likeLabel');

        const likeZoneInput = document.createElement( 'input' );
        likeLabel.appendChild(likeZoneInput);
        likeZoneInput.setAttribute("id", `like_${id}` );
        likeZoneInput.setAttribute("aria-label", "like checkbox");
        likeZoneInput.setAttribute("type", "checkbox");

        const heartCheck = document.createElement( 'i' ) 
        likeLabel.appendChild(heartCheck);
        heartCheck.setAttribute("class", "fa-solid fa-heart unchecked");


        return (article);
    };
    return { getPhotographersMedias};

    
};

mediaFactory();


export {getMediaPhotographer,displayDataMedia,init2,mediaFactory}