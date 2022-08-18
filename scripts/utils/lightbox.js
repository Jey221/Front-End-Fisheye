//import des fonctions
import {getMediaPhotographer,displayDataMedia} from '../factories/media.js'


//récupération des datas
const promise = getMediaPhotographer();
const data = await promise.catch(() => false);


//création des variables pour la lightbox
const gallery = document.querySelectorAll(".medias")
const lightbox = document.querySelector(".modal_lightbox");
const closeButton = document.getElementById("closeLightbox");
const prevButton = document.getElementById("arrowLeft");
const nextButton = document.getElementById("arrowRight");
const mediaLightbox = document.getElementById("mediaLightbox");
const infoLightbox = document.getElementById("infoMediaLightbox")
const pInfo = document.createElement( 'p' );

const dataLightbox = data.tabMedia

const mdr = dataLightbox.shift();

let media;
 
//fonction pour l'utilisation de la lightbox
Array.prototype.map.call(gallery, (b) => {
    //ouverture de la lightbox
    b.addEventListener("click", function displayLightbox() {
        lightbox.style.display = "block";
        //récupération de la cible
        const target = [b];

        //mise en place du titre en fonction de la cible
        pInfo.textContent = target[0].alt;
        infoLightbox.appendChild(pInfo);
        //fais apparaitre le media selon sont type
        if (target[0].className === "medias image" ) {
            //Si Image
            media = document.createElement( 'img' );
            media.classList.add('imageLightbox')
        	media.setAttribute("src", target[0].src );
        	mediaLightbox.appendChild(media);
        }else{
            //Si Video
            media = document.createElement( 'video' );
            media.classList.add('videoLightbox')
        	media.setAttribute("src", target[0].src );//provisoir car fixe sur l'élément [0] de l'Array tabMedia
            pInfo.textContent = dataLightbox[0].title;//provisoir car fixe sur l'élément [0] de l'Array tabMedia
            media.controls = true;
        	mediaLightbox.appendChild(media);
        };
    });
    //fermeture de la lightbox
    closeButton.addEventListener("click", function closeLightbox() {
        mediaLightbox.removeChild(media);
        lightbox.style.display = "none";
    });

    //bouton précédent
    prevButton.addEventListener("click", function prevLightbox() {
        console.log("pécedent");
    });

    //bouton suivant
    nextButton.addEventListener("click", function nextLightbox() {
        console.log("suivant");
    });
    
})

/**

*/