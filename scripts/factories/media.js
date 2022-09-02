//mise en place des fonction pour les media sur la page photographers
//création d'une constante correspondante a l'id du photographe affiché
const idPage = window.location.search.split("?id=").join("");

//mise en place d'une fonction pour recupèrer infos du json
async function getMediaPhotographer() {
    let response = await fetch("data/photographers.json");
    let data = await response.json();
    let media = await data.media;
    //filtre pour avoir medias du photographe sur la page
    const tabMedia = media.filter(value => {
        if( value.photographerId == parseInt(idPage,10) ) return true;
    });
    popularitySort(tabMedia)//mise en place du tri populaire par défaut
    openCloseListbox(tabMedia);//appel de la fonction de tri via l'ouverture de la listbox
    return ({tabMedia: [...tabMedia]});
};

//mise en place d'une fonction pour afficher le contenu
async function displayDataMedia(tabMedia) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = ""
    tabMedia.forEach((tabMedia) => {
        const photographerModel = mediaFactory(tabMedia);
        const userCardDOM = photographerModel.getPhotographersMedias(tabMedia);
        gallery.appendChild(userCardDOM);
    });
};


async function init2() {
    // Récupère les datas des photographes
    const { tabMedia } = await getMediaPhotographer();
    displayDataMedia(tabMedia);
    listenForLikes();
};
init2();

//mise en place d'une fonction pour incrémentation et décrémentation des likes
const listenForLikes = () => {    
    const likes = document.querySelectorAll(".likeLabel");
    
    likes.forEach(like => {
        like.addEventListener("click", (event) => {            
            event.target.classList.toggle('unchecked');
            event.target.classList.toggle('checked');
            const id = like.getAttribute("for");     
            if (event.target.classList.contains('checked')) {
                document.getElementById(`likeCount_${id}`).innerHTML = parseInt(document.getElementById(`likeCount_${id}`).innerHTML)+1;
                const likeEncart = document.getElementById("likeEncart");
                likeEncart.innerHTML = parseInt(likeEncart.innerHTML)+1;
                localStorage.setItem("like", document.getElementById(`likeCount_${id}`).innerHTML)
                console.log(localStorage.getItem("like"));
            } else {
                document.getElementById(`likeCount_${id}`).innerHTML = parseInt(document.getElementById(`likeCount_${id}`).innerHTML)-1;
                likeEncart.innerHTML = parseInt(likeEncart.innerHTML)-1;
            };
        });
    });
};

//fonction pour l'ouverture de la listbox pour le tri
const openCloseListbox = (tabMedia) => {
    const listboxContainer = document.getElementById('listboxContainer');
    const listbox = document.getElementById('listbox');
    let listboxOptionActuelle = document.getElementById('listboxOptionActuelle');
    let iconActuel = document.getElementById("listboxOptionActuelleIcon")
    listboxContainer.addEventListener('click', () => {
        if(window.getComputedStyle(listbox).display === "none") {
            listbox.style.setProperty('display', 'flex')
            listboxOptionActuelle.style.setProperty('display', 'none')
            iconActuel.style.setProperty('display', 'none')
            clickListbox(tabMedia)
            console.log(localStorage.getItem("like"));
        }else{
            listbox.style.setProperty('display', 'none')
            listboxOptionActuelle.style.setProperty('display', 'block')
            iconActuel.style.setProperty('display', 'block')
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
                popularitySort(tabMedia)
                console.log(localStorage.getItem("like"));
            }else if (e.path[0].innerHTML === "Date") {
                dateSort(tabMedia)
            }else{
                titleSort(tabMedia)
            }
            displayDataMedia(tabMedia);
            listenForLikes();
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


//mise en place d'une fonction pour l'intégration des medias sur la page photographe 
function mediaFactory(data) {  
    
    function getPhotographersMedias() { 
        //créer les espaces pour les medias
        const id = data.id
        const gallery = document.getElementById('gallery');
        const article = document.createElement( 'article' );
        article.setAttribute("id",`article-${id}`);
        gallery.appendChild(article);
        //créer les espaces pour le media cliquable
        const card = document.createElement( 'div' );
        const links = document.createElement( 'a' );
        const pictureName = data.image;
        const videoName = data.video;
        card.setAttribute("class","cardMedia");
        links.setAttribute("href",`assets/picture/${idPage}/${videoName || pictureName}`)
        article.appendChild(card);
        card.appendChild(links)
        //intégrer le media
        let articleMedia;
        if (data.hasOwnProperty('image')) {
            const titlePicture = data.title;
            //console.log(data);
            articleMedia = document.createElement( 'img' );
            articleMedia.setAttribute("src", `assets/picture/${idPage}/${pictureName}`);
            links.appendChild(articleMedia);
            articleMedia.setAttribute("class", "medias image");
            articleMedia.setAttribute("id", id);
            articleMedia.setAttribute("alt", titlePicture );
        }else if (data.hasOwnProperty('video')) {
            const titlePicture = data.title;
            articleMedia = document.createElement('video')
            articleMedia.setAttribute("src", `assets/picture/${idPage}/${videoName}`);
            links.appendChild(articleMedia);
            articleMedia.setAttribute("class", "medias video");
            articleMedia.setAttribute("alt", titlePicture );
            articleMedia.setAttribute("id", id);
        };

        //création du footer
        const footer = document.createElement( 'footer' );
        footer.setAttribute("class","footerMedias");
        article.appendChild(footer);

        //intégrer les infos du footer
        //nom du media
        const span = document.createElement( 'span' );
        footer.appendChild(span);
        span.setAttribute("class","article_media_title");
        span.setAttribute("id",data.video || data.image );
        span.textContent = data.title;

        //like sur media
        //délimitation de la zone de like 
        const likeZone = document.createElement( 'div' );
        footer.appendChild(likeZone);
        likeZone.setAttribute("class", "likeZone");

        //compteur de like
        const likeCount = document.createElement( 'span' );
        likeZone.appendChild(likeCount);
        likeCount.setAttribute("class", "likeCount");
        likeCount.setAttribute("id", `likeCount_${id}`);
        likeCount.innerText = data.likes;

        //création d'un label like 
        const likeLabel = document.createElement( 'label' );
        likeZone.appendChild(likeLabel);
        likeLabel.setAttribute("for", id );
        likeLabel.classList.add('likeLabel');

        //création d'un Input like   
        const likeZoneInput = document.createElement( 'input' );
        likeLabel.appendChild(likeZoneInput);
        likeZoneInput.setAttribute("id", `like_${id}` );
        likeZoneInput.setAttribute("aria-label", "like checkbox");
        likeZoneInput.setAttribute("type", "checkbox");

        //mise en place d'un icon coeur   
        const heartCheck = document.createElement( 'i' );
        likeLabel.appendChild(heartCheck);
        heartCheck.setAttribute("class", "fa-solid fa-heart unchecked");
    
        return (article);
    };
    return { getPhotographersMedias}; 
};

mediaFactory();


export {getMediaPhotographer};