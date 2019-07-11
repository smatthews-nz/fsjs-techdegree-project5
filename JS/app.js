//get the gallery from the dom
const gallery = $('#gallery');
const search = $('.search-container')
let modalDivs; 

/**
 * fetchData takes a url, creates a fetch request
 * and returns the formatted data
 * and pushes the data to an array of employees
 * @param (url) url or resource to be retrieved
 */
function fetchData(url){
    return fetch(url)
    .then(checkStatus)
    .then(response => response.json())
    .then(data => data.results.map(person => person))
    .catch(error => console.log("Looks like there was an error!", error));
}
fetchData('https://randomuser.me/api/?results=12&nat=au,ca,gb,nz,us').then(displayEmployees);

function checkStatus(response){
    if(response.ok){
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

function displayEmployees(people){
   people.map((person, index) =>{

    console.log(person, index);
    const card = $('<div>');
    card.addClass('card');

    card.html(`<div class="card-img-container">
       <img class="card-img" src='${person.picture.large}' alt="profile picture">
       </div>
       
       <div class="card-info-container">
        <h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
        <p class="card-text">${person.email}</p>
        <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
       </div>
       `);
    
    gallery.append(card);

    card.on('click', () =>{
        createModal(people, index);
    })
   });
}

function createModal(people, index){

    const employee = people[index];
    const modalDiv = $('<div>');
    let birthday = new Date(employee.dob.date);
    birthday = birthday.toLocaleDateString("en-NZ");

    modalDiv.addClass('modal-container');

    gallery.append(modalDiv);

    modalDiv.html(
        `
        <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
        <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
        <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
        <p class="modal-text">${employee.email}</p>
        <p class="modal-text cap">${employee.location.city}</p>
        <hr>
        <p class="modal-text">${employee.phone}</p>
        <p class="modal-text">${employee.location.street}, ${employee.location.city}, ${employee.location.state}, ${employee.location.postcode}</p>
        <p class="modal-text">Birthday: ${birthday}</p>
        </div>
        </div>

        <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
         </div>
        `
    )
    
    //add remove event listener to remove the modal from the page
    const modalClose = $('.modal-close-btn');
    modalClose.on('click', () => {
        modalDiv.remove();
    })
   //get modal buttons from the DOM
    const nextBtn = $('#modal-next');
    const prevBtn = $('#modal-prev');
    //move modal windows using next and prev buttons
    //add next button functionality
    if (index < people.length - 1){
        nextBtn.on('click', () => {
            modalDiv.remove();
            createModal(people, index +1)
        });
    } else {
        nextBtn.attr('disabled', 'true');
    }
    //add prev button functionality
    if(index > 0){
        prevBtn.on('click', () => {
            modalDiv.remove();
            createModal(people, index -1)
        });
    } else if(index === 0) {
        prevBtn.attr('disabled', 'true');
    }
}

//dynamically append the search html.
search.html(
    `<form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
            <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
    </form>`
)

/**
 * searches cards displayed on the screen
 * for the input given
 * @params (cards, input) cards are the objects built from the employee objects
 * input is the search input given
 */
 function searchEmployee(cards, input){

 }