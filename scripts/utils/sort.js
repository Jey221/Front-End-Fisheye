// gestion des tris sur la page des photographes
// IMPORT
import lightbox from './lightbox.js';
import listenForLikes from './like.js';
import displayDataMedia from '../factories/media.js';

// définition des cibles
const listboxOptionActuelle = document.getElementById('listboxOptionActuelle');
const iconActuel = document.getElementById('listboxOptionActuelleIcon');
const listboxContainer = document.getElementById('listboxContainer');
const listbox = document.getElementById('listbox');

// fonction de tri par Popularité (+ de like à - de like )
const popularitySort = (tabMedia) => {
  tabMedia.sort((a, b) => b.likes - a.likes);
};
// fonction de tri par date (+ ancien au + récent)
const dateSort = (tabMedia) => {
  tabMedia.sort((a, b) => new Date(a.date) - new Date(b.date));
};
// fonction de tri par titre (ordre alphabétique)
const titleSort = (tabMedia) => {
  tabMedia.sort((a, b) => a.title.localeCompare(b.title));
};

// option de la box de tri
const clickListbox = (tabMedia, idPage) => {
  const listboxOption = document.querySelectorAll('.listboxOption');
  listboxOption.forEach((option) => {
    // écouteur souris
    option.addEventListener('click', (e) => {
      listboxOptionActuelle.innerHTML = e.target.innerHTML;
      if (e.target.innerHTML === 'Popularité') {
        popularitySort(tabMedia);
      } else if (e.target.innerHTML === 'Date') {
        dateSort(tabMedia);
      } else {
        titleSort(tabMedia);
      }
      displayDataMedia(tabMedia, idPage);
      lightbox.init();
      listenForLikes();
    });
    // écouteur clavier
    option.addEventListener('keydown', (e) => {
      // mise en place du focus sur la box de tri et gestion de la navigation via clavier
      const focusableListboxOption = 'div';
      const modalListbox = document.getElementById('options');
      const focusableContent = modalListbox.querySelectorAll(focusableListboxOption);
      const firstFocusableListboxOption = focusableContent[0];
      const lastFocusableListboxOption = focusableContent[focusableContent.length - 1];
      switch (e.key) {
        case 'Tab':
          if (document.activeElement === lastFocusableListboxOption) {
            firstFocusableListboxOption.focus();
            e.preventDefault();
          }
          break;
        case 'Enter':
          listboxOptionActuelle.innerHTML = e.target.innerHTML;
          if (e.target.innerHTML === 'Popularité') {
            popularitySort(tabMedia);
          } else if (e.target.innerHTML === 'Date') {
            dateSort(tabMedia);
          } else {
            titleSort(tabMedia);
          }
          displayDataMedia(tabMedia, idPage);
          lightbox.init();
          listenForLikes();
          e.target.parentNode.replaceWith(e.target.parentNode.cloneNode(true));
          Array.from(document.querySelector('#options').children).find((elt) => elt.textContent === e.target.textContent).focus();
          break;
        default:
          break;
      }
    });
  });
};

// ouverture de la box de tri
function openListbox(tabMedia, idPage) {
  listboxContainer.setAttribute('aria-expanded', 'true');
  listbox.style.setProperty('display', 'flex');
  listboxOptionActuelle.style.setProperty('display', 'none');
  iconActuel.style.setProperty('display', 'none');
  clickListbox(tabMedia, idPage);
}

// fermeture de la box de tri
function closeListbox() {
  listboxContainer.setAttribute('aria-expanded', 'false');
  listbox.style.setProperty('display', 'none');
  listboxOptionActuelle.style.setProperty('display', 'block');
  iconActuel.style.setProperty('display', 'block');
}

// écouteur souris sur la box de tri et lancement des fonctions ouverture/fermeture
const openCloseListbox = (tabMedia, idPage) => {
  listboxContainer.addEventListener('click', () => {
    if (window.getComputedStyle(listbox).display === 'none') {
      openListbox(tabMedia, idPage);
    } else {
      closeListbox(tabMedia);
    }
  });
};

// mise en place d'une fonction pour recupèrer infos du json dans le désordre
async function getUnorderedMediaPhotographer() {
  const idPage = window.location.search.split('?id=').join('');
  const response = await fetch('data/photographers.json');
  const data = await response.json();
  const media = await data.media;
  // filtre pour avoir medias du photographe sur la page
  const tabMedia = media.filter((value) => value.photographerId === parseInt(idPage, 10));
  return ([...tabMedia]);
}

// gestion de l'ouverture et fermeture de la box de tri avec clavier
const idPage = window.location.search.split('?id=').join('');
const medias = await getUnorderedMediaPhotographer();
listboxContainer.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'Enter':
      openListbox(medias, idPage);
      break;
    case 'Escape':
      closeListbox();
      break;
    default:
      break;
  }
});

export { openCloseListbox, popularitySort };
