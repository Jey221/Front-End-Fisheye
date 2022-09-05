//mise en place d'une fonction pour incrémentation et décrémentation des likes
const listenForLikes = (tabMedia) => {    
    const likes = document.querySelectorAll(".likeLabel");
    likes.forEach(like => {
        like.addEventListener("click", (event) => {            
            event.target.classList.toggle('unchecked');
            event.target.classList.toggle('checked');
            const id = like.getAttribute("for");
            //localStorage.setItem(`like${id}`, document.getElementById(`likeCount_${id}`).innerHTML)
            if (event.target.classList.contains('checked')) {
                document.getElementById(`likeCount_${id}`).innerHTML = parseInt(document.getElementById(`likeCount_${id}`).innerHTML)+1;
                const likeEncart = document.getElementById("likeEncart");
                likeEncart.innerHTML = parseInt(likeEncart.innerHTML)+1;
            } else {
                document.getElementById(`likeCount_${id}`).innerHTML = parseInt(document.getElementById(`likeCount_${id}`).innerHTML)-1;
                likeEncart.innerHTML = parseInt(likeEncart.innerHTML)-1;
            };
        });
    });
};

export {listenForLikes}