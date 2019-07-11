//get the gallery from the dom
const gallery = $('#gallery');
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
        creatModal(people, index);
    })
   });
}

function creatModal(people, index){

    const employee = people[index];
    const modalDiv = $('<div>');

    modalDiv.addClass('modal-container');

    gallery.append(modalDiv);

    modalDiv.html(
        `
        <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        </div>
        `
    )

}
