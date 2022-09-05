//mise en place d'une fonction pour incrémentation et décrémentation des likes
const listenForLikes = (tabMedia) => {    
    const likes = document.querySelectorAll(".likeLabel");
    const likeEncart = document.getElementById("likeEncart");
    likes.forEach(like => {
        like.addEventListener("click", (event) => {            
            event.target.classList.toggle('unchecked');
            event.target.classList.toggle('checked');
            const id = like.getAttribute("for");
            //localStorage.setItem(`like${id}`, document.getElementById(`likeCount_${id}`).innerHTML)
            if (event.target.classList.contains('checked')) {
                document.getElementById(`likeCount_${id}`).innerHTML = parseInt(document.getElementById(`likeCount_${id}`).innerHTML)+1;
                likeEncart.innerHTML = parseInt(likeEncart.innerHTML)+1;
            } else {
                document.getElementById(`likeCount_${id}`).innerHTML = parseInt(document.getElementById(`likeCount_${id}`).innerHTML)-1;
                likeEncart.innerHTML = parseInt(likeEncart.innerHTML)-1;
            };
        });
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
        likeEncart.textContent = sum ;

};

export {listenForLikes}