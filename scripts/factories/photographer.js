function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price } = data;
    const picture = `assets/photographers/${portrait}`;
    function getUserCardDOM() {   

        

        //création des éléments du DOM
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        const pCity = document.createElement( 'p' );
        const pTagline = document.createElement( 'p' );
        const pPrice = document.createElement( 'p' );
        const a = document.createElement('a');

        //insertion de la variable dans les éléments créés
        h2.textContent = name;
        pCity.textContent = city +", "+ country;
        pTagline.textContent = tagline;
        pPrice.textContent = price + "€/jour";

        //faire apparaitre l'enfant dans le parent
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(pCity);
        article.appendChild(pTagline);
        article.appendChild(pPrice);

        //mise en place des liens pour les pages des photographes
        this.id=data.id;
        const liens = {img , h2}
        console.log(liens);

        a.href = "photographer.html?id=${this.id}";


        //ajout de class spécifique pour la mise en forme CSS
        pCity.classList.add('ville');
        pTagline.classList.add('tagline');
        pPrice.classList.add('prix');

        return (article);
    }
    return { name, picture, getUserCardDOM }
}
