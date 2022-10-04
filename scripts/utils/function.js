/* eslint-disable import/extensions */
import { openCloseListbox, popularitySort } from './sort.js';
import mediaFactory from '../factories/media.js';

// mise en place d'une fonction pour recupèrer infos du json
async function getMediaPhotographer(idPage) {
  const response = await fetch('data/photographers.json');
  const data = await response.json();
  const media = await data.media;
  // filtre pour avoir medias du photographe sur la page
  const tabMedia = media.filter((value) => value.photographerId === parseInt(idPage, 10));
  popularitySort(tabMedia);// mise en place du tri populaire par défaut
  openCloseListbox(tabMedia);// appel de la fonction de tri via l'ouverture de la listbox
  return ({ tabMedia: [...tabMedia] });
}

// mise en place d'une fonction pour afficher la galerie
async function displayDataMedia(tabMedia) {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';
  tabMedia.forEach(() => {
    const photographerModel = mediaFactory(tabMedia);
    const userCardDOM = photographerModel.getPhotographersMedias(tabMedia);
    gallery.appendChild(userCardDOM);
  });
}

export { getMediaPhotographer, displayDataMedia };
