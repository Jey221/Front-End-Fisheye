import {getMediaPhotographer} from '../factories/media.js'

/*function displayLightbox() {
    const lightbox = document.getElementById("template_lightbox");
    console.log(lightbox);
	lightbox.style.display = "block";
}*/

function closeLightbox() {
    const lightbox = document.getElementById("template_lightbox");
    lightbox.style.display = "none";
}
getMediaPhotographer ();
console.log(getMediaPhotographer ());
export {closeLightbox}