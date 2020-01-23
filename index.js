function createSearch() {
    let searchContainer = document.querySelector(".search-container"); 
    let html = `<form action="#" method="get">
                    <input type="search" id="search-input" class="search-input" placeholder="Search...">
                    <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
                </form>`;
    searchContainer.innerHTML = html;
}

function createCard(cardDiv, pictureSrc, fullName, email, city, state, phone, fullAddress, birth) {
    cardDiv = document.createElement("div");
    cardDiv.className = "card";
    cardDiv.innerHTML =  `<div class="card-img-container">
                                <img class="card-img" src="${pictureSrc}" alt="profile picture">
                              </div>
                              <div class="card-info-container">
                                <h3 id="name" class="card-name cap">${fullName}</h3>
                                <p class="card-text">${email}</p>
                                <p class="card-text cap">${city}, ${state}</p>
                              </div>`
    cardDiv.addEventListener("click", function() {
        createModal(pictureSrc, fullName, email, city, phone, fullAddress, birth);
    })
    return cardDiv;
}


function createModal(pictureSrc, name, email, city, phone, fullAddress, birth) {
    let modalContainer = document.createElement("div");
    modalContainer.style.display = "block";
    modalContainer.className = "modal-container";
    modalContainer.innerHTML = `<div class="modal">
                                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                                    <div class="modal-info-container">
                                        <img class="modal-img" src="${pictureSrc}" alt="profile picture">
                                        <h3 id="name" class="modal-name cap">${name}</h3>
                                        <p class="modal-text">${email}</p>
                                        <p class="modal-text cap">${city}</p>
                                        <hr>
                                        <p class="modal-text">${phone}</p>
                                        <p class="modal-text">${fullAddress}</p>
                                        <p class="modal-text">Birthday: ${birth}</p>
                                    </div>
                                </div>
                                <div class="modal-btn-container">
                                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                                </div>`
    document.body.insertBefore(modalContainer, document.querySelector("[src='index.js']"));
}

function formatDate(dateString) {
    let date = dateString.slice(0, 10);
    let month = date.slice(5, 7);
    let day = date.slice(8, 10);
    let year = date.slice(0, 4);
    return `${month}/${day}/${year}`
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
//.then(response => console.log(response))
.then(data => {
    let cardDiv;
    data.results.map(person => {
        let picture = person.picture.thumbnail;
        let name = `${person.name.first} ${person.name.last}`;
        let email = person.email;
        let city = `${person.location.city}`
        let state = `${person.location.state}`;
        let fullAddress = `${person.location.street.number} ${person.location.street.name}, ${city} ${state} ${person.location.postcode}`
        let phone = person.phone;
        let birth = formatDate(person.dob.date);


        let card = createCard(cardDiv, picture, name, email, city, state, phone, fullAddress, birth);
        document.querySelector("#gallery").appendChild(card)
    });
})
.catch(error => console.log("nooooo", error));











