function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price } = data;
    const picture = `assets/photographers/${portrait}`;
    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        console.log(article);
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)

        //création des éléments du DOM
        const h2 = document.createElement( 'h2' );
        const pCity = document.createElement( 'p' );
        const pTagline = document.createElement( 'p' );
        const pPrice = document.createElement( 'p' );

        //insertion de la variable dans les éléments créés
        h2.textContent = name;
        pCity.textContent = city +", "+ country;
        pTagline.textContent = tagline;
        pPrice.textContent = price + "€/jour"

        //faire apparaitre l'enfant dans le parent
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(pCity);
        article.appendChild(pTagline);
        article.appendChild(pPrice);

        //ajout de class spécifique pour la mise en forme CSS
        pCity.classList.add('ville')
        pTagline.classList.add('tagline')
        pPrice.classList.add('prix')

        return (article);
    }
    return { name, picture, getUserCardDOM }
}
