// fonction d'ouverture du modal de contact
function displayModal() {
  const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
  modal.setAttribute("aria-hidden", "false")
  document.getElementById("main").setAttribute("aria-hidden", "true")
  firstFocusableElement.focus();  
}

// fonction de fermeture du modal de contact
function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true")
    document.getElementById("main").setAttribute("aria-hidden", "false")
}
// fonction de fermeture du modal de contact avec touche Echap
document.addEventListener('keydown', function(e) {
  let isTabPressed = e.key === 'Escape';
  if(isTabPressed) {
    closeModal();
  };
});

// mise en place du focus sur le formulaire
const  focusableElements ='button, label, input, textarea, [tabindex]:not([tabindex="-1"])';// séléction des cibles du focus
const modal = document.querySelector('#contact_modal'); 

const focusableContent = modal.querySelectorAll(focusableElements);
const firstFocusableElement = focusableContent[0]; // premier élément focusable
const lastFocusableElement = focusableContent[focusableContent.length - 1]; // dernier élément focusable

document.addEventListener('keydown', function(e) { 
  let isTabPressed = e.key === 'Tab' || e.keyCode === 9;

  if (!isTabPressed) { // si une autre touche que tab est préssée
    return;
  }
  if (e.shiftKey) { // retour en arrière si shift+tab
    if (document.activeElement === firstFocusableElement) {
      lastFocusableElement.focus(); // focus sur le dernier element si passe le premier element
      e.preventDefault();
    }
  } else { // defilement dans l'ordre avec la touche tab 
    if (document.activeElement === lastFocusableElement) { 
      firstFocusableElement.focus(); // focus sur le premier element si passe le dernier element
      e.preventDefault();
    }
  }
});

// annonce des variables pour le formulaire
let firstName = document.getElementById('prénom');
let lastName = document.getElementById('nom');               
let email = document.getElementById('email');      
let message=  document.getElementById('message');  

// annonce des variables pour le message d'erreur
let smallFirst = firstName.nextElementSibling;
let smallLast = lastName.nextElementSibling;
let smallEmail = email.nextElementSibling;
let smallMessage = message.nextElementSibling;


// annonce de la fonction de validation du formulaire
// blocage de l'action de soumission de formulaire
document.getElementById("boutonEnvoyer").addEventListener("click",(e) => {
  e.preventDefault();

  // validation Prénom et création si valide de la variables valid
  if (firstName.value.length < 2) {
    firstName.classList.add("error");
    smallFirst.innerHTML = "Veuillez entrer 2 caractères ou plus pour le champ prénom.";
    firstName.focus();
  }else{
    smallFirst.innerHTML = "";
    firstName.classList.remove("error");
    var valueFirstName = firstName.value; 
    var valid = true;
  };

  // validation nom et création si valide de la variables valid1
  if (lastName.value.length < 2) {
    lastName.classList.add("error");
    smallLast.innerHTML = "Veuillez entrer 2 caractères ou plus pour le champ nom.";
    lastName.focus();
  }else{
    lastName.classList.remove("error");
    smallLast.innerHTML = "";
    var valueLastName = lastName.value; 
    var valid1 = true;
  };

  // validation email et création si valide de la variables valid2
  if (email.value == "") {
    email.classList.add("error");
    smallEmail.innerHTML= "Vous devez entrer une adresse email valide.";
    email.focus();
  }else if (email.value.indexOf("@", 0) < 0) {
    email.classList.add("error");
    smallEmail.innerHTML= "Vous devez entrer une adresse email valide.";
    email.focus();
  }else if (email.value.indexOf(".", 0) < 0) {
    email.classList.add("error");
    smallEmail.innerHTML= "Vous devez entrer une adresse email valide.";
    email.focus();    
  }else{
    email.classList.remove("error");
    smallEmail.innerHTML = "";
    var valueEmail = email.value; 
    var valid2 = true;
  };

  // validation message et création si valide de la variables valid3
  if (message.value.length < 3) {
    message.classList.add("error");
    smallMessage.innerHTML = "Veuillez inscrire un message à destination du photographe.";
    message.focus();
  }else{
    smallMessage.innerHTML = "";
    message.classList.remove("error");
    var valueMessage = message.value; 
    var valid3 = true;
  };
	

  // envoi des infos dans la console
  if (valid==true && valid1==true && valid2==true && valid3==true){
    console.log("prénom = " + valueFirstName );
    console.log("nom = " + valueLastName );
    console.log("email = " + valueEmail );
    console.log("message = " + valueMessage );
  }
});