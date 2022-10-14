// mise en place de la page d'accueil
// import des informations et image depuis la factorie
import photographerFactory from '../factories/photographer.js';
import getData from '../utils/function.js';

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
  const { photographers } = await getData();
  displayData(photographers);
}

init();
