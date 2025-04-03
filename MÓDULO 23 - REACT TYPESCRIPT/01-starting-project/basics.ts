///primitives

let age: number;

age = 12;

let userName: string;

userName = "Bruno";

let isStudent: boolean;

isStudent = true;

//more complex types

let hobbies: string[];
hobbies = ["Sports", "Cooking", "Gaming"];

type Person = {
  //type Alias
  name: string;
  age: number;
};

let person: Person;

person = {
  name: "Bruno",
  age: 29,
};

let persons: Person[];

persons = [
  {
    name: "Max",
    age: 32,
  },
  {
    name: "bruno",
    age: 29,
  },
];

//Type inference

let course: string | number = "React course";

course = 123564;

//Functios types

function add(a: number, b: number): number {
  return a + b;
}

function print(value: any) {
    console.log(value);
}


//Generics - o mesmo deve ser valor usado nos parâmetros

function insertAtBeginning<T>(array: T[], value: T) {
    const newArray = [value, ...array];
    return newArray;
}

const demoArray = [1,2,3];

const updatedArray = insertAtBeginning(demoArray, -1); // [-1,1,2,3]

const stringArray = insertAtBeginning(['a', 'b', 'c'], 'z');


updatedArray[0].split('');
stringArray[0].split('');