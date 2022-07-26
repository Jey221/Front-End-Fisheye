function photographerFactory(data) {
    const { name, portrait, city, country, id, tagline } = data;
    const picture = `assets/photographers/${portrait}`;
    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        console.log(article);
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        const pCity = document.createElement( 'p' );
        const pCountry = document.createElement( 'p' );
        const pTagline = document.createElement( 'p' );
        const pId = document.createElement( 'p' );
        h2.textContent = name;
        pCity.textContent = city;
        pCountry.textContent = country;
        pTagline.textContent = tagline;
        pId.textContent = id;
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(pId);
        article.appendChild(pCity);
        article.appendChild(pCountry);
        article.appendChild(pTagline);


        return (article);
    }
    return { name, picture, getUserCardDOM }
}
