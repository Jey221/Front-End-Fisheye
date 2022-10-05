/* eslint-disable import/extensions */
import { openCloseListbox, popularitySort } from './sort.js';

// mise en place d'une fonction pour recupèrer infos du json
export default async function getMediaPhotographer(idPage) {
  const response = await fetch('data/photographers.json');
  const data = await response.json();
  const media = await data.media;
  // filtre pour avoir medias du photographe sur la page
  const tabMedia = media.filter((value) => value.photographerId === idPage);
  popularitySort(tabMedia);// mise en place du tri populaire par défaut
  openCloseListbox(tabMedia, idPage);// appel de la fonction de tri via l'ouverture de la listbox
  return tabMedia;
}
