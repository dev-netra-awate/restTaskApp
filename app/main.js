import {Person} from './person';
const personsURI = '/data/persons.json';
fetch(personsURI,{
method: 'GET'
}).then(response => { return response.json();
}).then(data =>{
load(data);
});
/**
*
* @param {*} person
* @param {*} parent
*/
const createPerson = (person, parent) => {
const li = document.createElement('li');
li.textContent = `${person.firstName} ${person.lastName}`
parent.appendChild(li);
};
/**
*
* @param {*} persons the person object
*/
const load = (data) => {
const ol = document.getElementById('list');
persons.forEach(item =>{
const person = new Person(item.firstName, item.lastName);
createPerson(person,ol);
});
return true;
}
setTimeout(() =>
{
console.log('Hi');
},
2000);