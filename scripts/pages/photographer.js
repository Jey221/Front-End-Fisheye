//Mettre le code JavaScript lié à la page photographer.html

//selectionner l'espace du profil photographe
const profil = document.getElementById('photographer-profil');
const buttonForm = document.querySelector('.contact_button')

//créer une div pour les info du photographe
const infoPhotographe = document.createElement( 'div' );
infoPhotographe.setAttribute("class","infoPhotographe");
profil.insertBefore(infoPhotographe , buttonForm);

//créer une div pour chaque lignes d'infos
//NOM
const nomPhotographe = document.createElement( 'div' );
nomPhotographe.setAttribute("class","nomPhotographe");
infoPhotographe.appendChild(nomPhotographe);
//VILLE,PAYS
const villePhotographe = document.createElement( 'div' );
villePhotographe.setAttribute("class","villePhotographe");
infoPhotographe.appendChild(villePhotographe);
//TAGLINE
const taglinePhotographe = document.createElement( 'div' );
taglinePhotographe.setAttribute("class","taglinePhotographe");
infoPhotographe.appendChild(taglinePhotographe);
//TAG LIST
const tagListPhotographe = document.createElement( 'div' );
tagListPhotographe.setAttribute("class","tagListPhotographe");
infoPhotographe.appendChild(tagListPhotographe);

//intégration des infos du photographe 
//NOM
const h2 = document.createElement( 'h2' );
nomPhotographe.appendChild(h2);
h2.textContent = city +", "+ country;

//VILLE,PAYS
const pVille = document.createElement( 'p' );
villePhotographe.appendChild(pVille);
pVille.classList.add('p_Ville_Info_Photographe');
//pCity.textContent = city +", "+ country;

//TAGLINE
const pTagline = document.createElement( 'p' );
taglinePhotographe.appendChild(pTagline);
pTagline.classList.add('p_Tagline_Info_Photographe');
//pCity.textContent = city +", "+ country;

//TAG LIST






console.log(profil);

