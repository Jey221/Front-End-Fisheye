//mise en place d'une fonction pour incrémentation et décrémentation des likes
const listenForLikes = () => {    
    const likes = document.querySelectorAll(".likeLabel");
    likes.forEach(like => {
        like.addEventListener("click", (event) => {
            console.log(event.target);           
            manageLike(event);
        });
        like.addEventListener("keydown", (event) => {
            if (event.key==="Enter"){ 
                console.log(event.target);           
                manageLike(event);
            };
        });
        function manageLike(event) {
            let target;
            if (event.target.classList.contains("fa-heart")) {
                target = event.target 
            } else {
                target = like.lastChild
            } 
            console.log(target);
            const likeEncart = document.getElementById("likeEncart");
            target.classList.toggle('unchecked');
            target.classList.toggle('checked');
            const id = like.getAttribute("for");                
            //localStorage.setItem(`like${id}`, document.getElementById(`likeCount_${id}`).innerHTML)
            if (target.classList.contains('checked')) {
                document.getElementById(`likeCount_${id}`).innerHTML = parseInt(document.getElementById(`likeCount_${id}`).innerHTML)+1;
                likeEncart.innerHTML = parseInt(likeEncart.innerHTML)+1;
            } else {
                document.getElementById(`likeCount_${id}`).innerHTML = parseInt(document.getElementById(`likeCount_${id}`).innerHTML)-1;
                likeEncart.innerHTML = parseInt(likeEncart.innerHTML)-1;
            }
        };    
    });
    //calcul de la somme des likes sur la gallerie
    var allLikeSpans = document.querySelectorAll('.likeCount');
    var arrayLike = [];
    for (var i = 0; i < allLikeSpans.length; i++) {
        arrayLike.push(allLikeSpans[i].innerHTML);
    }
    var numberSpans = []
    for (var i = 0; i < arrayLike.length; i++) {
        numberSpans.push(parseInt(arrayLike[i]));
    }
    let sum = 0;
    for (let i = 0; i <numberSpans.length; i++) {
        sum += numberSpans[i];
    }
    document.getElementById("likeEncart").textContent = sum ;
    //WIP: MISE EN PLACE DE LA FONCTION DE LIKE AVEC L'UTILISATION DU CLAVIER OU NON

};

export {listenForLikes}
