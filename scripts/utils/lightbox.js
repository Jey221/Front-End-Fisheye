
function displayLightbox() {
    const lightbox = document.getElementsById("template_lightbox");
    console.log(lightbox);
	lightbox.style.display = "block";
}

function closeLightbox() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

export {displayLightbox,closeLightbox}