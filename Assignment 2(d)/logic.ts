


export interface Student { 
    name: string;
    age: number;
    grade: number;
}

export const filteredPassedStudent = (students: Student[]): Student[] => {
    return students.filter(student => student.grade >= 50);
}

export const namesOfStudent = (students: Student[]): string[] => {
    return students.map(student => student.name);
}

export const sortWithGrade = (students: Student[]): Student[] => {
    return students.sort((a, b) => a.grade - b.grade);
}

export const avgAge = (students: Student[]): number => {
    if (students.length === 0) return 0;

    let totalAge = 0;
    students.forEach(student => {
        totalAge += student.age;
    });
    return totalAge / students.length;
}