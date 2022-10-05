/* eslint-disable import/extensions */
// Mettre le code JavaScript lié à la page photographer.html
// mise en place des infos surr la page photogaphe
// import des données
import infoFactory from '../factories/info.js';
import listenForLikes from '../utils/like.js';
import lightbox from '../utils/lightbox.js';
import getMediaPhotographer from '../utils/function.js';
import displayDataMedia from '../factories/media.js';

// création d'une constante correspondante a l'URL
const id = parseInt(window.location.search.split('?id=').join(''), 10);

async function initMedia(idPage) {
  // Récupère les datas des photographes
  const tabMedia = await getMediaPhotographer(idPage);
  displayDataMedia(tabMedia, idPage);
  listenForLikes();
  lightbox.init();
}

// mise en place d'une fonction pour recupèrer infos du json
async function getInfosPhotographer(idPage) {
  const response = await fetch('data/photographers.json');
  const data = await response.json();
  const photographers = await data.photographers;
  // filtre pour avoir infos du photographe sur la page
  const photographer = photographers.find((value) => value.id === idPage);
  return photographer;
}

// mise en place d'une fonction pour afficher le contenu
async function displayData(photographer) {
  const profil = document.getElementById('photographer-profil');
  const photographerModel = infoFactory(photographer);
  const userCardDOM = photographerModel.getPhotographersInfos();
  const buttonForm = document.querySelector('.contact_button');
  profil.insertBefore(userCardDOM, buttonForm);
}

async function init(idPage) {
  // Récupère les datas des photographes
  const photographer = await getInfosPhotographer(idPage);
  displayData(photographer);
  initMedia(idPage);
}
init(id);
