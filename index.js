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
    openAndCloseModal(cardDiv, pictureSrc, fullName, email, city, state, phone, fullAddress, birth)
    return cardDiv;
}
       

function openAndCloseModal(cardDiv, pictureSrc, fullName, email, city, state, phone, fullAddress, birth) {
    let modalContainer = document.querySelector(".modal-container");

    cardDiv.addEventListener("click", function() {
        document.querySelector(".modal-img").src = pictureSrc;
        document.querySelector(".modal-name").textContent = fullName;
        document.querySelector(".modal-text:nth-of-type(1)").textContent = email;
        document.querySelector(".modal-text:nth-of-type(2)").textContent = city; 
        document.querySelector(".modal-text:nth-of-type(3)").textContent = phone;
        document.querySelector(".modal-text:nth-of-type(4)").textContent = fullAddress;
        document.querySelector(".modal-text:nth-of-type(5)").textContent = birth;
        modalContainer.style.display = "block";
    })
    modalContainer.querySelector(".modal-close-btn").addEventListener("click", function() {
        modalContainer.style.display = "none"
    })
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

                       
function formatDate(dateString) {
    let date = dateString.slice(0, 10);
    let month = date.slice(5, 7);
    let day = date.slice(8, 10);
    let year = date.slice(0, 4);
    return `${month}/${day}/${year}`
}




/*Fetched Data*/
fetch("https://randomuser.me/api?format=json&results=12&nat=us") // returns promise with resolve value of a http response object
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
    let cardArray = [];
    createSearch();
    createModal();

    data.results.forEach(person => {
        let picture = person.picture.thumbnail;
        let name = `${person.name.first} ${person.name.last}`;
        let email = person.email;
        let city = `${person.location.city}`
        let state = `${person.location.state}`;
        let fullAddress = `${person.location.street.number} ${person.location.street.name}, ${city} ${state} ${person.location.postcode}`
        let phone = person.phone;
        let birth = formatDate(person.dob.date);
        
        let card = createCard(cardDiv, picture, name, email, city, state, phone, fullAddress, birth);
        cardArray.push(card);
        document.querySelector("#gallery").appendChild(card)
    });
    return cardArray
})
.then(results => {
    let prev = document.querySelector("#modal-prev");
    let next = document.querySelector("#modal-next");

    
    let modal = document.querySelector(".modal");
    let currentCard = results.find(card => card.innerHTML.includes(modal.querySelector("#name").textContent))
    let currentIndex = results.indexOf(currentCard);
    console.log(currentIndex)
    
    // prev.addEventListener("click", function() {
    //     if (currentIndex !== 0) {
    //         //document.querySelector(".modal-img").src = results[currentIndex - 1].querySelector("img").src;
    //         // document.querySelector(".modal-name").textContent = fullName;
    //         // document.querySelector(".modal-text:nth-of-type(1)").textContent = email;
    //         // document.querySelector(".modal-text:nth-of-type(2)").textContent = city; 
    //         // document.querySelector(".modal-text:nth-of-type(3)").textContent = phone;
    //         // document.querySelector(".modal-text:nth-of-type(4)").textContent = fullAddress;
    //         // document.querySelector(".modal-text:nth-of-type(5)").textContent = birth;
    //     } else {
    //         this.style.backgroundColor = 'red'
    //     }
    // })


    

    document.querySelector("#search-input").addEventListener("input", function() {
        let filteredData = results.forEach(person => {
            let name = person.querySelector("#name");
           if (!name.innerHTML.toLowerCase().includes(this.value.toLowerCase())) {
                person.style.display = "none"
           } else {
               person.style.display = "flex"
           }
        })
    });
})
.catch(error => console.log("nooooo", error));


     








