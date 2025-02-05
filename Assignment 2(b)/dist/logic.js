"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shiftHobbies = exports.getUniqueHobbies = exports.sortByAge = exports.groupByHobbies = exports.flatMapdata = exports.includdata = exports.finddata = exports.reducedata = exports.mapdata = exports.filterdata = void 0;
const filterdata = (employees) => {
    return employees.filter(employee => employee.age >= 30);
};
exports.filterdata = filterdata;
const mapdata = (employees) => {
    return employees.map(employee => employee.name);
};
exports.mapdata = mapdata;
const reducedata = (employees) => {
    return employees.reduce((sum, employee) => sum + employee.age, 0);
};
exports.reducedata = reducedata;
const finddata = (employees) => {
    return employees.find(employee => employee.name === "Charlie");
};
exports.finddata = finddata;
const includdata = (employees) => {
    const emails = employees.map(employee => employee.email);
    return emails.includes('alice@example.com');
};
exports.includdata = includdata;
// for flat map new payload is passed
/*
const nestedData = [
    { id: 1, name: 'Alice', hobbies: ['reading', 'swimming'] },
    { id: 2, name: 'Bob', hobbies: ['cycling'] },
    { id: 3, name: 'Charlie', hobbies: ['hiking', 'gaming'] }
  ];
*/
const flatMapdata = (persons) => {
    console.log(persons);
    return persons.flatMap(person => person.hobbies);
};
exports.flatMapdata = flatMapdata;
const groupByHobbies = (persons) => {
    const grouped = {};
    persons.forEach(person => {
        person.hobbies.forEach(hobby => {
            if (!grouped[hobby]) {
                grouped[hobby] = [];
            }
            grouped[hobby].push(person);
        });
    });
    return grouped;
};
exports.groupByHobbies = groupByHobbies;
const sortByAge = (employees) => {
    return employees.sort((a, b) => a.age - b.age);
};
exports.sortByAge = sortByAge;
const getUniqueHobbies = (persons) => {
    const allHobbies = persons.flatMap(person => person.hobbies);
    return Array.from(new Set(allHobbies));
};
exports.getUniqueHobbies = getUniqueHobbies;
const shiftHobbies = (persons) => {
    return persons.map(person => {
        const [firstHobby, ...restHobbies] = person.hobbies;
        return Object.assign(Object.assign({}, person), { hobbies: [...restHobbies, firstHobby] });
    });
};
exports.shiftHobbies = shiftHobbies;
