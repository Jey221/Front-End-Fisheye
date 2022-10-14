// Mettre le code JavaScript lié à la page photographer.html
// mise en place des infos surr la page photogaphe
// import des données
import infoFactory from '../factories/info.js';
import listenForLikes from '../utils/like.js';
import lightbox from '../utils/lightbox.js';
import displayDataMedia from '../factories/media.js';
import { openCloseListbox, popularitySort } from '../utils/sort.js';
import getData from '../utils/function.js';

// création d'une constante correspondante a l'URL
const id = parseInt(window.location.search.split('?id=').join(''), 10);

// mise en place d'une fonction pour recupèrer infos du json
async function getInfosPhotographer(idPage) {
  const data = await getData();
  const photographers = await data.photographers;
  // filtre pour avoir infos du photographe sur la page
  const photographer = photographers.find((value) => value.id === idPage);
  return photographer;
}

export default async function getMediaPhotographer(idPage) {
  const data = await getData();
  const media = await data.media;
  // filtre pour avoir medias du photographe sur la page
  const tabMedia = media.filter((value) => value.photographerId === idPage);
  popularitySort(tabMedia);// mise en place du tri populaire par défaut
  openCloseListbox(tabMedia, idPage);// appel de la fonction de tri via l'ouverture de la listbox
  return tabMedia;
}

// initiation des medias
async function initMedia(idPage) {
  // Récupère les datas des photographes
  const tabMedia = await getMediaPhotographer(idPage);
  displayDataMedia(tabMedia, idPage);
  listenForLikes();
  lightbox.init();
}

// mise en place d'une fonction pour afficher le contenu
async function displayData(photographer) {
  const profil = document.getElementById('photographer-profil');
  const photographerModel = infoFactory(photographer);
  const userCardDOM = photographerModel.getPhotographersInfos();
  const buttonForm = document.querySelector('.contact_button');
  profil.insertBefore(userCardDOM, buttonForm);
}

// initiation des fonctions sur la page des photographes
async function init(idPage) {
  // Récupère les datas des photographes
  const photographer = await getInfosPhotographer(idPage);
  displayData(photographer);
  initMedia(idPage);
}
init(id);
