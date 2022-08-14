import {getMediaPhotographer, mediaFactory, init2} from '../factories/media.js'


const idPage = window.location.search.split("?id=").join("");
const promise = getMediaPhotographer();
const data = await promise.catch(() => false);

const gallery = document.querySelectorAll(".cardMedia .medias")
const lightbox = document.querySelector(".modal_lightbox");
const closeButton = document.getElementById("closeLightbox");
const mediaLightbox = document.getElementById("mediaLightbox");
const infoLightbox = document.getElementById("infoMediaLightbox")
const img = document.createElement( 'img' );
const pInfo = document.createElement( 'p' );


console.log(infoLightbox);

Array.prototype.map.call(gallery, (b) => {
    b.addEventListener("click", function displayLightbox() {
        console.log(b.alt);
        console.log(b.src);
        lightbox.style.display = "block";
        img.setAttribute("src", b.src );
        mediaLightbox.appendChild(img);
        pInfo.textContent = b.alt;
        infoLightbox.appendChild(pInfo);

    });
    closeButton.addEventListener("click", function closeLightbox() {
        lightbox.style.display = "none";
        console.log(img);
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