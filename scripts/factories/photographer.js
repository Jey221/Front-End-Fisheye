function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price } = data;
    const picture = `assets/photographers/${portrait}`;
    function getUserCardDOM() {   

        //création des éléments du DOM
        //création des articles
        const article = document.createElement( 'article' );

        //création des articles
        const card = document.createElement("section");
        card.setAttribute("class","card");
        article.appendChild(card);

        //création des liens 
        const a = document.createElement('a');
        a.setAttribute("class","lienCliquable");
        this.id = data.id;
        a.setAttribute("href","photographer.html?id=" + this.id);
        a.setAttribute("aria-label", "lien vers page de " + this.name);
        card.appendChild(a);

        //création des conteneur photo
        const container = document.createElement('div');
        container.setAttribute("class","container");
        a.appendChild(container);

        //intégration des photos
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        this.name = data.name;
        img.setAttribute("alt", "photo de profil de " + this.name );
        img.setAttribute("class", "imgPhotographe");
        container.appendChild(img);

        //intégration des noms des photographes
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        a.appendChild(h2);

        //intégration des infos du photographe (non cliquable)
        //ville
        const pCity = document.createElement( 'p' );
        pCity.textContent = city +", "+ country;
        article.appendChild(pCity);
        pCity.classList.add('ville');


        //tagline
        const pTagline = document.createElement( 'p' );
        pTagline.textContent = tagline;
        article.appendChild(pTagline);
        pTagline.classList.add('tagline');


        //prix
        const pPrice = document.createElement( 'p' );
        pPrice.textContent = price + "€/jour";
        article.appendChild(pPrice);
        pPrice.classList.add('prix');

        return (article);
    }
    return { name, picture, getUserCardDOM }
}
