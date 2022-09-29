// gestion de la lightbox
// import { getMediaPhotographer } from './function';

// récupération des datas
const idPage = window.location.search.split('?id=').join('');
/* const promise = getMediaPhotographer(idPage);
const data = await promise.catch(() => false); */

// création de la classe lightbox
class lightbox {
  static init() {
    const links = Array.from(document.querySelectorAll('a[href$=".jpg"], a[href$=".mp4"]'));
    const gallery = links.map((link) => link.getAttribute('href'));
    links.forEach((link) => link.addEventListener('click', (e) => {
      e.preventDefault();
      lightbox(e.currentTarget.getAttribute('href'), gallery);
    }));
  }

  // url de l'image cliqué
  constructor(url, gallery) {
    this.element = this.buildDOM(url);
    this.gallery = gallery;
    document.body.appendChild(this.element);
    this.loadImage(url);
    this.onKeyUp = this.onKeyUp.bind(this);
    document.addEventListener('keyup', this.onKeyUp);
  }

  // chargement de l'image
  loadImage(url) {
    this.url = null;
    const containerMedia = this.element.querySelector('#mediaLightbox');
    const spanInfo = this.element.querySelector('#infoMediaLightbox');
    const target = url.split(`assets/picture/${idPage}/`).join('');
    const typeImage = url.includes('.jpg');
    let media;
    if (typeImage === true) {
      // Si Image
      media = document.createElement('img');
      media.classList.add('imageLightbox');
      media.setAttribute('src', url);
      media.setAttribute('alt', document.getElementById(target).innerHTML);
      media.setAttribute('tabindex', '0');
      containerMedia.lastChild.remove();
      containerMedia.appendChild(media);
      this.url = url;
      spanInfo.textContent = document.getElementById(target).innerHTML;
    } else {
      // Si Video
      media = document.createElement('video');
      media.classList.add('videoLightbox');
      media.setAttribute('src', url);
      media.setAttribute('alt', document.getElementById(target).innerHTML);
      media.setAttribute('tabindex', '0');
      media.controls = true;
      containerMedia.lastChild.remove();
      containerMedia.appendChild(media);
      this.url = url;
      spanInfo.textContent = document.getElementById(target).innerHTML;
    }
  }

  // création des fonctions claviers
  onKeyUp(e) {
    if (e.key === 'Escape') {
      this.close(e);
    } else if (e.key === 'ArrowLeft') {
      this.prev(e);
    } else if (e.key === 'ArrowRight') {
      this.next(e);
    }
  }

  // fonction de fermeture
  close(e) {
    e.preventDefault();
    this.element.classList.add('fadeOut');
    window.setTimeout(() => {
      this.element.parentElement.removeChild(this.element);
    }, 500);
    document.removeEventListener('keyup', this.onKeyUp);
  }

  // fonction suivante
  next(e) {
    e.preventDefault();
    let i = this.gallery.findIndex(() => i === this.url);// définition de la position du click
    if (i === this.gallery.length - 1) {
      i = -1;
    }
    this.loadImage(this.gallery[i + 1]);
  }

  // fonction précédente
  prev(e) {
    e.preventDefault();
    let i = this.gallery.findIndex(() => i === this.url);// définition de la position du click
    if (i === 0) {
      i = this.gallery.length - 1;
    }
    this.loadImage(this.gallery[i - 1]);
  }

  // crétion des elements HTML pour la Lightbox
  buildDOM() {
    const dom = document.createElement('div');
    dom.classList.add('lightbox');
    dom.setAttribute('id', 'lightbox');
    dom.innerHTML = `
            <section id="template_lightbox">
                <div id="arrowLeft" class="arrow prev" role="navigation"><img src="assets/icons/chevron-left-solid.svg" aria-label="aller au media précédent" alt="précédent" tabindex="0"/></div>
                <div id="mediaContainerZone">
                    <figure id="mediaLightbox">
                        <figcaption id="infoMediaLightbox"></figcaption>
                    </figure>
                </div>
                <div id="arrowRight" class="arrow next" role="navigation"><img src="assets/icons/chevron-right-solid.svg" aria-label="aller au media suivant" alt="suivant" tabindex="0"/></div>
                <div id="closeLightbox" role="navigation"><img id="closeLightboxImage" src="assets/icons/close2.svg" aria-label="fermer la lightbox" alt="fermeture" tabindex="0"/></div>
            </section>`;
    // mise en place des fonction de navigation //
    dom.querySelector('#closeLightbox').addEventListener('click', this.close.bind(this));
    dom.querySelector('#arrowLeft').addEventListener('click', this.prev.bind(this));
    dom.querySelector('#arrowRight').addEventListener('click', this.next.bind(this));

    return dom;
  }
}

lightbox.init();
export default { lightbox };
