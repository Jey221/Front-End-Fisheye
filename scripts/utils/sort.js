//IMPORT
import { displayDataMedia } from "../factories/media.js";
import { lightbox } from "./lightbox.js";

//fonction pour l'ouverture de la listbox pour le tri
const openCloseListbox = (tabMedia) => {
    const listboxContainer = document.getElementById('listboxContainer');
    const listbox = document.getElementById('listbox');
    let listboxOptionActuelle = document.getElementById('listboxOptionActuelle');
    let iconActuel = document.getElementById("listboxOptionActuelleIcon")
    listboxContainer.addEventListener('click', () => {
        if(window.getComputedStyle(listbox).display === "none") {
            listbox.style.setProperty('display', 'flex');
            listboxOptionActuelle.style.setProperty('display', 'none');
            iconActuel.style.setProperty('display', 'none');
            clickListbox(tabMedia);
        }else{
            listbox.style.setProperty('display', 'none');
            listboxOptionActuelle.style.setProperty('display', 'block');
            iconActuel.style.setProperty('display', 'block');
        }
    });
};
//option de la listbox
const clickListbox = (tabMedia) => {
    const listboxOption = document.querySelectorAll(".listboxOption")
    listboxOption.forEach((listboxOption) => {
        listboxOption.addEventListener('click', (e) => {
            listboxOptionActuelle.innerHTML = e.path[0].innerHTML
            if (e.path[0].innerHTML === "Popularité") {
                popularitySort(tabMedia);
            }else if (e.path[0].innerHTML === "Date") {
                dateSort(tabMedia);
            }else{
                titleSort(tabMedia);
            }
            displayDataMedia(tabMedia);
            lightbox.init()
        })
    })
}
//fonction de tri par Popularité (+ de like à - de like )
const popularitySort = (tabMedia) => {
    tabMedia.sort(function (a,b){ return b.likes - a.likes })  
};
//fonction de tri par date (+ ancien au + récent)
const dateSort = (tabMedia) => {
    tabMedia.sort(function (a,b){ return new Date(a.date) - new Date(b.date) });
};
//fonction de tri par titre (ordre alphabétique)
const titleSort = (tabMedia) => {
    tabMedia.sort(function (a,b){ return a.title.localeCompare(b.title) });
};

export {openCloseListbox,popularitySort}