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

// option de la listbox
const clickListbox = (tabMedia) => {
  const listboxOption = document.querySelectorAll('.listboxOption');
  listboxOption.forEach(() => {
    // écouteur souris
    listboxOption.addEventListener('click', (e) => {
      listboxOptionActuelle.innerHTML = e.path[0].innerHTML;
      if (e.path[0].innerHTML === 'Popularité') {
        popularitySort(tabMedia);
      } else if (e.path[0].innerHTML === 'Date') {
        dateSort(tabMedia);
      } else {
        titleSort(tabMedia);
      }
      displayDataMedia(tabMedia);
      lightbox.init();
      listenForLikes();
    });
    // écouteur clavier
    listboxOption.addEventListener('keydown', (e) => {
      const focusableListboxOption = 'div';
      const modalListbox = document.getElementById('options');
      const focusableContent = modalListbox.querySelectorAll(focusableListboxOption);
      const firstFocusableListboxOption = focusableContent[0];
      const lastFocusableListboxOption = focusableContent[focusableContent.length - 1];
      switch (e.key) {
        case 'Tab':
          // mise en place du focus sur la listbox et gestion de l'ouverture/fermeture via clavier
          if (document.activeElement === lastFocusableListboxOption) {
            firstFocusableListboxOption.focus();
            e.preventDefault();
          }
          break;
        case 'Enter':
          listboxOptionActuelle.innerHTML = e.path[0].innerHTML;
          if (e.path[0].innerHTML === 'Popularité') {
            popularitySort(tabMedia);
          } else if (e.path[0].innerHTML === 'Date') {
            dateSort(tabMedia);
          } else {
            titleSort(tabMedia);
          }
          displayDataMedia(tabMedia);
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

function openListbox(tabMedia) {
  listboxContainer.setAttribute('aria-expanded', 'true');
  listbox.style.setProperty('display', 'flex');
  listboxOptionActuelle.style.setProperty('display', 'none');
  iconActuel.style.setProperty('display', 'none');
  clickListbox(tabMedia);
}
function closeListbox() {
  listboxContainer.setAttribute('aria-expanded', 'false');
  listbox.style.setProperty('display', 'none');
  listboxOptionActuelle.style.setProperty('display', 'block');
  iconActuel.style.setProperty('display', 'block');
}

// fonction pour l'ouverture de la listbox pour le tri
const openCloseListbox = (tabMedia) => {
  listboxContainer.addEventListener('click', () => {
    if (window.getComputedStyle(listbox).display === 'none') {
      openListbox(tabMedia);
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

// gestion de l'ouverture et fermeture de la listbox avec clavier
const medias = await getUnorderedMediaPhotographer();
listboxContainer.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'Enter':
      openListbox(medias);
      break;
    case 'Escape':
      closeListbox();
      break;
    default:
      break;
  }
});

export { openCloseListbox, popularitySort };
