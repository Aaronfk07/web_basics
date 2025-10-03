interface Person {
    firstname: string;
    lastname: string;
    age: number;
    isMale?: boolean;
}



const person: Person = {
    "firstname": "John",
    "lastname": "Doe",
    "age": 30,
    "isMale": false
};

function printName(person: Person) {
    console.log(person.isMale);
}
printName(person);