    async function getPhotographers() {
        // Penser à remplacer par les données récupérées dans le json

        let response = await fetch("data/photographers.json");
        console.log(response);
        let data = await response.json();
        console.log(data);
        let photographers = await data.photographers;
        console.log(photographers);

        // et bien retourner le tableau photographers seulement une fois
        return ({
            photographers: [...photographers]})
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
    