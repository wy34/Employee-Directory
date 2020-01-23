function createSearch() {
    let searchContainer = document.querySelector(".search-container"); 
    let html = `<form action="#" method="get">
                    <input type="search" id="search-input" class="search-input" placeholder="Search...">
                    <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
                </form>`;
    searchContainer.innerHTML = html;
}

function createCard(cardDiv, pictureSrc, fullName, email, location) {
    cardDiv = document.createElement("div");
    cardDiv.className = "card";
    cardDiv.innerHTML =  `<div class="card-img-container">
                                <img class="card-img" src="${pictureSrc}" alt="profile picture">
                              </div>
                              <div class="card-info-container">
                                <h3 id="name" class="card-name cap">${fullName}</h3>
                                <p class="card-text">${email}</p>
                                <p class="card-text cap">${location}</p>
                              </div>`
    return cardDiv;
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
    let cardDiv;
    data.results.map(person => {
        let picture = person.picture.thumbnail;
        let name = `${person.name.first} ${person.name.last}`;
        let email = person.email;
        let location = `${person.location.city}, ${person.location.state}`;

        let card = createCard(cardDiv, picture, name, email, location);
        document.querySelector("#gallery").appendChild(card)
    });
})
.catch(error => console.log("nooooo", error));












