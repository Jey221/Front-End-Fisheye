// intégration sur page photographer
// mise en place d'une fonction pour l'intégration des medias dans la galerie
function mediaFactory(data, idPage) {
  function getPhotographersMedias() {
    // créer les espaces pour les medias
    const { id } = data;
    const gallery = document.getElementById('gallery');
    const article = document.createElement('article');
    article.setAttribute('id', `article-${id}`);
    gallery.appendChild(article);

    // créer les espaces pour le media cliquable
    const card = document.createElement('div');
    const links = document.createElement('a');
    const pictureName = data.image;
    const videoName = data.video;
    card.setAttribute('class', 'cardMedia');
    links.setAttribute('href', `assets/picture/${idPage}/${videoName || pictureName}`);
    links.setAttribute('aria-label', `Ouverture de la lightbox avec le media ${videoName || pictureName}`);
    article.appendChild(card);
    card.appendChild(links);

    // intégrer le media selon sont type
    let articleMedia;
    if (data.image) {
      articleMedia = document.createElement('img');
      articleMedia.setAttribute('src', `assets/picture/${idPage}/${pictureName}`);
      articleMedia.setAttribute('class', 'medias image');
    } else if (data.video) {
      articleMedia = document.createElement('video');
      articleMedia.setAttribute('src', `assets/picture/${idPage}/${videoName}`);
      articleMedia.setAttribute('class', 'medias video');
    }
    links.appendChild(articleMedia);

    // mise en place id pour chaque media
    articleMedia.setAttribute('id', id);

    // intégrer le titre du media
    const titlePicture = data.title;
    articleMedia.setAttribute('alt', titlePicture);

    // création du pied de page
    const footer = document.createElement('footer');
    footer.setAttribute('class', 'footerMedias');
    article.appendChild(footer);

    // intégrer les infos du footer
    // nom du media
    const span = document.createElement('span');
    const h2 = document.createElement('h2');
    footer.appendChild(span);
    span.appendChild(h2);
    h2.setAttribute('class', 'article_media_title');
    h2.setAttribute('id', data.video || data.image);
    h2.setAttribute('aria-describedby', id);
    h2.textContent = data.title;

    // like sur media
    // délimitation de la zone de like
    const likeZone = document.createElement('div');
    footer.appendChild(likeZone);
    likeZone.setAttribute('class', 'likeZone');

    // compteur de like
    const likeCount = document.createElement('span');
    likeZone.appendChild(likeCount);
    likeCount.setAttribute('class', 'likeCount');
    likeCount.setAttribute('id', `likeCount_${id}`);
    localStorage.setItem(`like${id}`, data.likes);
    likeCount.innerText = parseInt(localStorage.getItem(`like${id}`), 10);

    // création d'un label like
    const likeLabel = document.createElement('a');
    likeZone.appendChild(likeLabel);
    likeLabel.setAttribute('for', id);
    likeLabel.setAttribute('tabindex', '0');
    likeLabel.classList.add('likeLabel');

    // création d'un Input like
    const likeZoneInput = document.createElement('input');
    likeLabel.appendChild(likeZoneInput);
    likeZoneInput.setAttribute('id', `like_${id}`);
    likeZoneInput.setAttribute('type', 'checkbox');
    likeZoneInput.setAttribute('aria-label', 'cliquer pou liker');

    // mise en place d'un icon coeur
    const heartCheck = document.createElement('i');
    likeLabel.appendChild(heartCheck);
    heartCheck.setAttribute('class', 'fa-solid fa-heart unchecked');
    heartCheck.setAttribute('role', 'button');
    heartCheck.setAttribute('aria-label', 'button coeur');

    return (article);
  }
  return { getPhotographersMedias };
}

// mise en place d'une fonction pour afficher la galerie
export default async function displayDataMedia(tabMedia, idPage) {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';
  tabMedia.forEach((media) => {
    const photographerModel = mediaFactory(media, idPage);
    const userCardDOM = photographerModel.getPhotographersMedias(media);
    gallery.appendChild(userCardDOM);
  });
}
