//mise en place de la page d'accueil
import { photographerFactory } from "../factories/photographer.js"
//récupération des données sur la json
async function getPhotographers() {
    // Penser à remplacer par les données récupérées dans le json

    let response = await fetch("data/photographers.json");
    let data = await response.json();
    let photographers = await data.photographers;

    // et bien retourner le tableau photographers seulement une fois
    return ({photographers: [...photographers]})
}
//mise en place des articles sur la page
async function displayData(photographers) {    
    const photographersSection = document.querySelector(".photographer_section");// crée une const pour ajouter les articles sur la page
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};
// Récupère les datas des photographes
async function init() {
    const { photographers } = await getPhotographers();
    displayData(photographers);
};
init();
    