//import des fonctions
import {getMediaPhotographer} from '../factories/media.js'

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

const data2 = data.tabMedia
const data3 = data2.title
console.log(data3);
let media;

//fonction pour l'utilisation de la lightbox
Array.prototype.map.call(gallery, (b) => {
    //ouverture de la lightbox
    b.addEventListener("click", function displayLightbox() {
        lightbox.style.display = "block";
        //récupération de la cible
        const target = [b];
        console.log(target[0].alt);

        //mise en place du titre en fonction de la cible
        pInfo.textContent = target[0].alt;
        infoLightbox.appendChild(pInfo);
        //fais apparaitre le media selon sont type
        if (target[0].className === "medias image" ) {
            //Si Image
            media = document.createElement( 'img' );
            media.classList.add('imageLightbox')
        	media.setAttribute("src", target[0].src );
        	media.setAttribute("alt", target[0].alt );
        	mediaLightbox.appendChild(media);

        }else{
            //Si Video
            console.log(target[0].alt);
            media = document.createElement( 'video' );
            media.classList.add('videoLightbox')
        	media.setAttribute("src", target[0].src );
            media.setAttribute("alt", target[0].alt );
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




/*



function closeLightbox() {
    const lightbox = document.getElementById("template_lightbox");
    lightbox.style.display = "none";
}
getMediaPhotographer ();
console.log(getMediaPhotographer ());
export {closeLightbox}


document.getElementsByClassName("cardMedia").addEventListener("click",() => {
    if (idPage=243) {    
        console.log("hello");
    }
    return console.log("bye");

});


export function closeLightbox() {
    const modal2 = document.querySelector(".modal_lightbox");
	modal2.style.display = "none";
}

export function displayLightbox() {
    const modal = document.querySelector(".modal_lightbox");
    console.log(modal);
	modal.style.display = "block";
}

*/