//import des fonctions
import {getMediaPhotographer,displayDataMedia, mediaFactory} from '../factories/media.js'

//récupération des datas
const idPage = window.location.search.split("?id=").join("");
const promise = getMediaPhotographer();
const data = await promise.catch(() => false);

//création de la classe lightbox
class lightbox {

    static init () {
        const links = Array.from(document.querySelectorAll('a[href$=".jpg"], a[href$=".mp4"]'))
        const gallery = links.map(link => link.getAttribute('href'))
        links.forEach(link => link.addEventListener('click', e => {
            e.preventDefault()
            new lightbox(e.currentTarget.getAttribute('href'),gallery)
        }))
    };
    
    //url de l'image cliqué
    constructor (url, gallery) {
        this.element = this.buildDOM(url)
        this.gallery = gallery
        document.body.appendChild(this.element)
        this.loadImage(url)
        this.onKeyUp = this.onKeyUp.bind(this)
        document.addEventListener('keyup', this.onKeyUp)
    };
    //chargement de l'image
    loadImage (url) {
        this.url = null
        const containerMedia = this.element.querySelector('#mediaLightbox')
        const spanInfo = this.element.querySelector('#infoMediaLightbox')
        let target = url.split(`assets/picture/${idPage}/`).join("")
        let typeImage = url.includes('.jpg')
        containerMedia.innerHTML = '';
        let media;
        if (typeImage === true ) {
            //Si Image
            media = document.createElement( 'img' );
            media.classList.add('imageLightbox')     
            media.setAttribute("src", url );
            containerMedia.appendChild(media);
            this.url = url;
            spanInfo.textContent = document.getElementById(target).innerHTML
        }else{
            //Si Video
            media = document.createElement( 'video' );
            media.classList.add('videoLightbox')     
            media.setAttribute("src", url );
            media.controls = true;
            containerMedia.appendChild(media)
            this.url = url;
            spanInfo.textContent = document.getElementById(target).innerHTML

        };
    };
    //création des fonctions claviers
    onKeyUp (e) {
        if(e.key === 'Escape') {
            this.close(e)
        } else if (e.key === 'ArrowLeft'){
            this.prev(e)
        } else if (e.key === 'ArrowRight'){
            this.next(e)    
        }

    }
    //fonction de fermeture
    close(e) {
        e.preventDefault()
        this.element.classList.add('fadeOut')
        window.setTimeout(() => {
            this.element.parentElement.removeChild(this.element)
        }, 500)
        document.removeEventListener('keyup', this.onKeyUp)
    }
    //fonction suivante
    next (e) {
        e.preventDefault()
        let i = this.gallery.findIndex(i => i === this.url)// définition de la position du click
        if (i === this.gallery.length - 1) {
            i = -1
        }
        this.loadImage(this.gallery[i + 1])
    }
    //fonction précédente
    prev (e) {
        e.preventDefault()
        let i = this.gallery.findIndex(i => i === this.url)// définition de la position du click
        if (i === 0) {
            i = this.gallery.length - 1
        }
        this.loadImage(this.gallery[i - 1])
    }
    //crétion des elements HTML pour la Lightbox
    buildDOM (url) {
        const dom = document.createElement('div')
        dom.classList.add('lightbox')
        dom.innerHTML = `
            <div id="template_lightbox">
                <div id="arrowLeft" class="arrow prev"><img src="assets/icons/chevron-left-solid.svg"/></div>
                <div id="mediaContainerZone">
                    <div class="containerMedia"><span id="mediaLightbox"></span></div>
                    <div class="containerDetail"><span id="infoMediaLightbox"></span></div>
                </div>
                <div id="arrowRight" class="arrow next"><img src="assets/icons/chevron-right-solid.svg"/></div>
                <div id="closeLightbox"><img id="closeLightbox" src="assets/icons/close2.svg" /></div>
            </div>`

        //mise en place de la fonction fermer //
        dom.querySelector('#closeLightbox').addEventListener('click', this.close.bind(this))
        dom.querySelector('#arrowLeft').addEventListener('click', this.prev.bind(this))
        dom.querySelector('#arrowRight').addEventListener('click', this.next.bind(this))

        return dom
    }
};

lightbox.init()




/**
 *             let zoneImage = document.createElement( 'img' );
            zoneImage.setAttribute("src", url );
            containerMedia.appendChild(zoneImage)
        } else {
            let zoneVideo = document.createElement( 'video' );
            zoneVideo.setAttribute("src", url );
            zoneVideo.controls = true;
            containerMedia.appendChild(zoneVideo)

 * 
 *         console.log(new Image());
        console.log(document.createElement('img'));
        const image = new Image();
        const containerMedia = this.element.querySelector('#mediaLightbox')
        const loader = document.createElement('div')
        loader.classList.add('lightbox__loader')
        containerMedia.appendChild(loader)
        //console.log(image);

        
        image.onload = function () {
            this.url = url
        }
        image.src = url
        //console.log(image);

 */

/**
 * 
 *         //mise en place du titre en fonction de la cible
        pInfo.textContent = target[0].alt;
        infoLightbox.appendChild(pInfo);
        //fais apparaitre le media selon sont type

                console.log(typeImage);
                typeArea = document.createElement( 'img' );
                typeArea.setAttribute("src", url );
                containerMedia.appendChild(typeArea)


                typeArea = document.createElement( 'video' );
                console.log(typeArea);
                typeArea.setAttribute("src", url );
                typeArea.controls = true;
                containerMedia.appendChild(typeArea)

 */


/**
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


//////////////////////////////////////////////////////////////////////////////////////////




class lightbox {

    static init () {
        const links = Array.from(document.querySelectorAll('a[href$=".jpg"], a[href$=".mp4"]'))
        const gallery = links.map(link => link.getAttribute('href'))
        console.log(gallery);
        links.forEach(link => link.addEventListener('click', e => 
        {
            e.preventDefault()
            new lightbox(e.currentTarget.getAttribute('href'), gallery)
        }))
    };
    
    //url de l'image cliqué
    constructor (url, gallery) {
        this.element = this.buildDOM(url)
        document.body.appendChild(element)
        //filtre pour savoir le type de media (jpg/mp4)
        let containerMedia = document.getElementById('mediaLightbox')
        let typeImage = url.includes(".jpg")
        if (typeImage === true) {
            let zoneImage = document.createElement( 'img' );
            zoneImage.setAttribute("src", url );
            containerMedia.appendChild(zoneImage)
        } else {
            let zoneVideo = document.createElement( 'video' );
            zoneVideo.setAttribute("src", url );
            zoneVideo.controls = true;
            containerMedia.appendChild(zoneVideo)
        };
    };
    

    buildDOM (url) {
        const dom = document.createElement('div')
        dom.classList.add('lightbox')
        dom.innerHTML = `
        <aside class="modal_lightbox">
            <div id="template_lightbox">
            <div id="arrowLeft" class="arrow prev">
                <img src="assets/icons/chevron-left-solid.svg"/>
            </div>
            <div id="mediaContainerZone">
                <div class="containerMedia">
                <span id="mediaLightbox">
                </span>
                </div>
                <div class="containerDetail">
                <span id="infoMediaLightbox"></span>
                </div>
            </div>
            <div id="arrowRight" class="arrow next">
                <img src="assets/icons/chevron-right-solid.svg"/>
            </div>
            <div id="closeLightbox">
                <img id="closeLightbox" src="assets/icons/close2.svg" />
            </div>
            </div>
        </aside>`

        //mise en place de la fonction fermer 
        dom.querySelector('#closeLightbox').addEventListener('click', function closeLightbox() {
            document.body.removeChild(dom)
            document.removeEventListener('keyup', this.onKeyup)
        })
        return dom
    }
};

lightbox.init()

*/