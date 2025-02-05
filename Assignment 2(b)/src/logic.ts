
export interface Employee{
    id:number,
    name :string,
    age:number,
    email:string

}
export interface Person{
    age: number
    id:number,
    name:string,
    hobbies:string[]
      
}
interface GroupedByHobbies {
    [hobby: string]: Person[];
  }
  
export const filterdata=(employees:Employee[]):Employee[]=>{
    return employees.filter(employee=>employee.age>=30)
}
export const mapdata=(employees :Employee[]):string[]=>{
    return employees.map(employee=>employee.name)
}
export const reducedata=(employees:Employee[]):number=>{
    return employees.reduce((sum,employee)=>sum+employee.age,0)
}

export const finddata=(employees:Employee[])=>{
    return employees.find(employee=>employee.name==="Charlie")
}

export const includdata=(employees:Employee[])=>{
    const emails=employees.map(employee=>employee.email)
    return emails.includes('alice@example.com')
}

export const sortByAge = (employees: Employee[]): Employee[] => {
    return employees.sort((a, b) => a.age - b.age);
}



// for flat map new payload is passed
/*
[
    { "id": 1, "name": "Alice", "hobbies": ["reading", "swimming"] },
    { "id": 2, "name": "Bob", "hobbies": ["cycling"] },
    { "id": 3, "name": "Charlie", "hobbies": ["hiking", "gaming"] }
]
*/  
export const flatMapdata=(persons:Person[]):string[]=>{
    console.log(persons);
    return persons.flatMap(person=>person.hobbies)
}

export const groupByHobbies = (persons: Person[]): GroupedByHobbies => {
  const grouped: GroupedByHobbies = {};

  persons.forEach(person => {
    person.hobbies.forEach(hobby => {
      if (!grouped[hobby]) {
        grouped[hobby] = [];
      }
      grouped[hobby].push(person);
    });
  });

  return grouped;
}




export const getUniqueHobbies = (persons: Person[]): string[] => {
    const allHobbies = persons.flatMap(person => person.hobbies);
    return Array.from(new Set(allHobbies));
}

export const shiftHobbies = (persons: Person[]): Person[] => {
    return persons.map(person => {
        const [firstHobby, ...restHobbies] = person.hobbies;
        return {
            ...person,
            hobbies: [...restHobbies, firstHobby]
        };
    });
}