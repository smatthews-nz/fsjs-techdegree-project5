//use the fetch API to request 12 random employes from english speaking countries for searching later
const employeesRequest = fetchData('https://randomuser.me/api/?results=12&nat=au,ca,gb,nz,us');

//declare global variable to hold the employee objects
let employees = [];
//parse the 12 employee objects and store them in the variable
employees = employeesRequest.map((employee, index) => {
    employee.name = `${employeesRequest[index].name.first} ${employeesRequest[index.name.last]}`;
    employees.push(employee);
});

console.log(employees);

function fetchData(url){
    return fetch(url)
    .then(response => response.json())
    .catch(error => console.log("Looks like there was an error!", error));
}

function displayEmployee(data){

}