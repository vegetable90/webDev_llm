// for 반복문
for (let i = 0; i < 5; i++) {
  console.log(i);
}

// while 반복문
let count = 0;
while (count < 5) {
  console.log(count);
  count++;
}

// for...of (배열 순회)
let fruits = ["사과", "바나나", "딸기"];
for (let fruit of fruits) {
  console.log(fruit);
}

// for...in (객체 속성 순회)
let person = { name: "김철수", age: 25 };
for (let key in person) {
  console.log(key + ": " + person[key]);
}

// forEach (배열 메소드)
fruits.forEach(fruit => console.log(fruit));
