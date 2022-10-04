/* eslint-disable import/extensions */
// Mettre le code JavaScript lié à la page photographer.html
// mise en place des infos surr la page photogaphe
// import des données
import { getMediaPhotographer, displayDataMedia } from '../utils/function.js';
import infoFactory from '../factories/info.js';
import listenForLikes from '../utils/like.js';
import lightbox from '../utils/lightbox.js';

// création d'une constante correspondante a l'URL
// const idPage = window.location.search.split('?id=').join('');

// mise en place d'une fonction pour recupèrer infos du json
async function getInfosPhotographer(idPage) {
  const response = await fetch('data/photographers.json');
  const data = await response.json();
  const photographers = await data.photographers;
  // filtre pour avoir infos du photographe sur la page
  const tabPhotographe = photographers.filter((value) => value.id === idPage);
  return ({ tabPhotographe: [...tabPhotographe] });
}

// mise en place d'une fonction pour afficher le contenu
async function displayData(tabPhotographe) {
  const profil = document.getElementById('photographer-profil');
  tabPhotographe.forEach(() => {
    const photographerModel = infoFactory(tabPhotographe);
    const userCardDOM = photographerModel.getPhotographersInfos();
    const buttonForm = document.querySelector('.contact_button');
    profil.insertBefore(userCardDOM, buttonForm);
  });
}
async function initMedia(idPage) {
  // Récupère les datas des photographes
  const { tabMedia } = await getMediaPhotographer(idPage);
  displayDataMedia(tabMedia);
  listenForLikes();
  lightbox.init();
}

async function init(data, idPage) {
  // Récupère les datas des photographes
  const { tabPhotographe } = await getInfosPhotographer(data);
  displayData(tabPhotographe);
  infoFactory(data);
  initMedia(idPage);
}
init();
