// mise en place de la page d'accueil
// import des informations et image depuis la factorie
// eslint-disable-next-line import/extensions
import photographerFactory from '../factories/photographer.js';

// récupération des données sur le json
async function getPhotographers() {
  const response = await fetch('data/photographers.json');
  const data = await response.json();
  const photographers = await data.photographers;

  // retourner le tableau photographers
  return ({ photographers: [...photographers] });
}

// mise en place des articles sur la page
async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section');// crée une const pour ajouter les articles sur la page
  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

// initiation des fonctions de la page d'accueil
async function init() {
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
