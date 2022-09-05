//import des fonctions
import {getMediaPhotographer} from '../factories/media.js'

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
        console.log(this.gallery);
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
        //mise en place des fonction de navigation //
        dom.querySelector('#closeLightbox').addEventListener('click', this.close.bind(this))
        dom.querySelector('#arrowLeft').addEventListener('click', this.prev.bind(this))
        dom.querySelector('#arrowRight').addEventListener('click', this.next.bind(this))

        return dom
    }
};

lightbox.init()
export {lightbox}