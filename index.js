let searchContainer = document.querySelector(".search-container"); 
let gallery = document.querySelector("#gallery");


function createSearch() {
    let html = `<form action="#" method="get">
                    <input type="search" id="search-input" class="search-input" placeholder="Search...">
                    <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
                </form>`;
    searchContainer.innerHTML = html;
}

function createGallery() {
    let html = `<div class="card">
                    <div class="card-img-container">
                        <img class="card-img" src="https://placehold.it/90x90" alt="profile picture">
                    </div>
                    <div class="card-info-container">
                        <h3 id="name" class="card-name cap">first last</h3>
                        <p class="card-text">email</p>
                        <p class="card-text cap">city, state</p>
                    </div>
                </div>`
    gallery.innerHTML = html;
}



createSearch();
createGallery();