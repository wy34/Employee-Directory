function createSearch() {
    let searchContainer = document.querySelector(".search-container"); 
    let html = `<form action="#" method="get">
                    <input type="search" id="search-input" class="search-input" placeholder="Search...">
                    <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
                </form>`;
    searchContainer.innerHTML = html;
}

function createCard(cardDiv) {
    cardDiv = document.createElement("div");
    cardDiv.className = "card";
    cardDiv.innerHTML =  `<div class="card-img-container">
                                <img class="card-img" src="https://placehold.it/90x90" alt="profile picture">
                              </div>
                              <div class="card-info-container">
                                <h3 id="name" class="card-name cap">first last</h3>
                                <p class="card-text">email</p>
                                <p class="card-text cap">city, state</p>
                              </div>`
    return cardDiv;
}

function createGallery(numOfCards) {
    let gallery = document.querySelector("#gallery");
    let cardDiv;
    for(let i = 0; i < numOfCards; i++) {
        let card = createCard(cardDiv);
        gallery.appendChild(card);
    };
    // gallery.style.display = "none"
}

function createModal() {
    let modalContainer = document.createElement("div");
    modalContainer.className = "modal-container";
    modalContainer.innerHTML = `<div class="modal">
                                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                                    <div class="modal-info-container">
                                        <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
                                        <h3 id="name" class="modal-name cap">name</h3>
                                        <p class="modal-text">email</p>
                                        <p class="modal-text cap">city</p>
                                        <hr>
                                        <p class="modal-text">(555) 555-5555</p>
                                        <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
                                        <p class="modal-text">Birthday: 10/21/2015</p>
                                    </div>
                                </div>
                                <div class="modal-btn-container">
                                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                                </div>`
    document.body.insertBefore(modalContainer, document.querySelector("[src='index.js']"));
}

function populateData(data) {
    // let picture = data.picture.thumbnail;
    // let name = `${data.name.first} ${data.name.last}`;
    // let email = data.email;
    // let location = `${data.location.city}, ${data.location.state}`

    let cards = document.querySelectorAll(".card");
    for(let i = 0; i < cards.length; i++) {
        
    }
    document.querySelector("#gallery").style.display = "flex"
}





/*Fetched Data*/
fetch("https://randomuser.me/api?results=12") // returns promise with resolve value of a http response object
// since fetch doesnt catch http status errors, we have to check for that
.then(response => {
    if (!response.ok) {
        return Promise.reject(new Error(response.statusText))
    } else {
        return Promise.resolve(response)
    }
})
.then(response => response.json())
.then(data => {
    data.results.map(person => {
        // create a card for each person
        // add their information to the card
        // add them to the gallery
    });
})
.catch(error => console.log("nooooo", error));












