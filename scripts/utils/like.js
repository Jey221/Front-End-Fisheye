// gestion des likes
// mise en place d'une fonction pour incrémentation et décrémentation des likes
const listenForLikes = () => {
  const likes = document.querySelectorAll('.likeLabel');
  const likeEncart = document.getElementById('likeEncart');
  likes.forEach((like) => {
    // gestion des likes
    function manageLike(event) {
      let target;
      if (event.target.classList.contains('fa-heart')) {
        target = event.target;
      } else {
        target = like.lastChild;
      }
      // const likeEncart = document.getElementById('likeEncart');
      target.classList.toggle('unchecked');
      target.classList.toggle('checked');
      const id = like.getAttribute('for');
      if (target.classList.contains('checked')) { // like +1
        document.getElementById(`likeCount_${id}`).innerHTML = parseInt(document.getElementById(`likeCount_${id}`).innerHTML, 10) + 1;
        likeEncart.innerHTML = parseInt(likeEncart.innerHTML, 10) + 1;
      } else { // like -1
        document.getElementById(`likeCount_${id}`).innerHTML = parseInt(document.getElementById(`likeCount_${id}`).innerHTML, 10) - 1;
        likeEncart.innerHTML = parseInt(likeEncart.innerHTML, 10) - 1;
      }
    }
    // écouteur souris
    like.addEventListener('click', (event) => { // à la souis
      manageLike(event);
    });
    // écouteur clavier
    like.addEventListener('keydown', (event) => { // au clavier
      if (event.key === 'Enter') {
        manageLike(event);
      }
    });
  });
  // calcul de la somme des likes sur la gallerie
  const allLikeSpans = document.querySelectorAll('.likeCount');
  const arrayLike = [];
  for (let i = 0; i < allLikeSpans.length; i += 1) {
    arrayLike.push(allLikeSpans[i].innerHTML);
  }
  const numberSpans = [];
  for (let i = 0; i < arrayLike.length; i += 1) {
    numberSpans.push(parseInt(arrayLike[i], 10));
  }
  let sum = 0;
  for (let i = 0; i < numberSpans.length; i += 1) {
    sum += numberSpans[i];
  }
  document.getElementById('likeEncart').textContent = sum;// mise en place du total sur l'encart
};

export default listenForLikes;
