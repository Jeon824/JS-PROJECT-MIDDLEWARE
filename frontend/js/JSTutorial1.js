const list = document.createElement('ul');
const info = document.createElement('p');
const html = document.querySelector('html');
import * as THREE from './three';

info.textContent = 'Below is a dynamic list. Click anywhere on the page to add a new list item. Click an existing list item to change its text to something else.';

document.body.appendChild(info);
document.body.appendChild(list);


html.onclick = function() {
  const listItem = document.createElement('li');
  const listContent = prompt('What content do you want the list item to have?');
  listItem.textContent = listContent;
  list.appendChild(listItem);

  listItem.onclick = function(e) {
    e.stopPropagation();
    const listContent = prompt('Enter new content for your list item');
    this.textContent = listContent;
  }
}
// function Person(first, last, name, age, gender){
//     this.name = {
//         first,last
//     };
//     this.age = age;
//     this.first = first;
//     this.gender = gender;
// }

// function Teacher(first, last, age, gender, interests, subject) {
//     Person.call(this, first, last, age, gender, interests);
//     this.subject = subject;
//   }

// Teacher.prototype = Object.create(Person.prototype);
// Teacher.prototype.constructor = Teacher;
// var p1 = new Person('a','b','c',18,'d');

// console.log(Object.prototype);
// var p2 = Object.create(p1);
// console.log(p2.__proto__);
// console.log(p2);
// console.log(p1);
// console.log(p1.constructor);
// console.log(p2.constructor);

// var p3 = new p1.constructor('Karen', 'Stephenson', 26, 'female');
// console.log('@p3.name.first');
// console.log(p3.age);
// console.log(p1.constructor.name);
// Person.prototype.farewell = function() {
//     console.log(this.name.first + ' has left the building. Bye for now!');
//   };

//   p1.farewell();
// t1 = new Teacher('tango', 'down', 100, 'FEMALE', ['basket','baseball']);
// t1.farewell()

//   console.log(Object.getOwnPropertyNames(Teacher.prototype));
//   console.log(Object.getOwnPropertyNames(Person.prototype));
