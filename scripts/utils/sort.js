//gestion des tris sur la page des photographes
//IMPORT
import { displayDataMedia, getUnorderedMediaPhotographer } from "../factories/media.js";
import { lightbox } from "./lightbox.js";
import {listenForLikes} from "./like.js";

//fonction pour l'ouverture de la listbox pour le tri
const openCloseListbox = (tabMedia) => {
    const listboxContainer = document.getElementById('listboxContainer');
    const listbox = document.getElementById('listbox');
    listboxContainer.addEventListener('click', () => {
        if(window.getComputedStyle(listbox).display === "none") {
            openListbox(tabMedia);
        }else{
            closeListbox(tabMedia);
        }
    }); 
};
//définition des cibles
const listboxOptionActuelle = document.getElementById('listboxOptionActuelle');
const iconActuel = document.getElementById("listboxOptionActuelleIcon");

function openListbox(tabMedia) {
    listboxContainer.setAttribute("aria-expanded","true");
    listbox.style.setProperty('display', 'flex');
    listboxOptionActuelle.style.setProperty('display', 'none');
    iconActuel.style.setProperty('display', 'none');
    clickListbox(tabMedia);
}
function closeListbox() {
    listboxContainer.setAttribute("aria-expanded","false");
    listbox.style.setProperty('display', 'none');
    listboxOptionActuelle.style.setProperty('display', 'block');
    iconActuel.style.setProperty('display', 'block');
}

//option de la listbox
const clickListbox = (tabMedia) => {
    const listboxOption = document.querySelectorAll(".listboxOption");
    listboxOption.forEach((listboxOption) => {
        //écouteur souris
        listboxOption.addEventListener('click', (e) => {
            listboxOptionActuelle.innerHTML = e.path[0].innerHTML;
            if (e.path[0].innerHTML === "Popularité") {
                popularitySort(tabMedia);
            }else if (e.path[0].innerHTML === "Date") {
                dateSort(tabMedia);
            }else{
                titleSort(tabMedia);
            }
            displayDataMedia(tabMedia);
            lightbox.init();
            listenForLikes();
        });
        //écouteur clavier
        listboxOption.addEventListener('keydown', (e) => {
            switch (e.key) {
                case "Tab":
                    //mise en place du focus sur la listbox et gestion de l'ouverture/fermeture via clavier
                    const  focusableListboxOption = 'div';
                    const modalListbox= document.getElementById("options");
                    const focusableContent = modalListbox.querySelectorAll(focusableListboxOption);
                    const firstFocusableListboxOption = focusableContent[0];
                    const lastFocusableListboxOption = focusableContent[focusableContent.length - 1];
                    if (document.activeElement === lastFocusableListboxOption) {
                        firstFocusableListboxOption.focus(); 
                        e.preventDefault();
                    };
                break;        
                case "Enter":
                    listboxOptionActuelle.innerHTML = e.path[0].innerHTML;
                    if (e.path[0].innerHTML === "Popularité") {
                        popularitySort(tabMedia);
                    }else if (e.path[0].innerHTML === "Date") {
                        dateSort(tabMedia);
                    }else{
                        titleSort(tabMedia);
                    } 
                    displayDataMedia(tabMedia);
                    lightbox.init();
                    listenForLikes();
                    e.target.parentNode.replaceWith(e.target.parentNode.cloneNode(true));
                    Array.from(document.querySelector('#options').children).find(elt => elt.textContent === e.target.textContent).focus();
                    closeListbox(tabMedia);
                break       
            };
        });
    })
}
//fonction de tri par Popularité (+ de like à - de like )
const popularitySort = (tabMedia) => {
    tabMedia.sort(function (a,b){ return b.likes - a.likes });
};
//fonction de tri par date (+ ancien au + récent)
const dateSort = (tabMedia) => {
    tabMedia.sort(function (a,b){ return new Date(a.date) - new Date(b.date) });
};
//fonction de tri par titre (ordre alphabétique)
const titleSort = (tabMedia) => {
    tabMedia.sort(function (a,b){ return a.title.localeCompare(b.title) });
};

//gestion de l'ouverture et fermeture de la listbox avec clavier
const medias = await getUnorderedMediaPhotographer();
listboxContainer.addEventListener("keydown", function (event){
    switch (event.key) {
        case "Enter":
            openListbox(medias);
            break;
        case "Escape":
            closeListbox();
            break;
    }
})                

export {openCloseListbox,popularitySort};