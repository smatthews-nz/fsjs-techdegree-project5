//use the fetchData method to request 12 random employes from english speaking countries for searching later
const employeesRequest = fetchData('https://randomuser.me/api/?results=12&nat=au,ca,gb,nz,us');

//declare global variable to hold the employee objects
let employees = [];
console.log(employees);

/**
 * fetchData takes 
 * @param (url) url or resource to be retrieved
 */
function fetchData(url){
    return fetch(url)
    .then(checkStatus)
    .then(response => response.json())
    .then(data => data.results.map(person => {
        employees.push(person);
    }))
    .catch(error => console.log("Looks like there was an error!", error));
}

function checkStatus(response){
    if(response.ok){
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

// function displayEmployee(data){

// }