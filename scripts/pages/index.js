async function getPhotographers() {
    // Penser à remplacer par les données récupérées dans le json

    let response = await fetch("data/photographers.json");
    let data = await response.json();
    let photographers = await data.photographers;

    // et bien retourner le tableau photographers seulement une fois
    return ({photographers: [...photographers]})
}

async function displayData(photographers) {    
    const photographersSection = document.querySelector(".photographer_section");// crée une const pour ajouter les articles sur la page
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};
async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
};
init();
    