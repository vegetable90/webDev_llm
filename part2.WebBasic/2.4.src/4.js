// if, else if, else
let score = 85;

if (score >= 90) {
  console.log("A 등급");
} else if (score >= 80) {
  console.log("B 등급");
} else {
  console.log("C 등급");
}

// 삼항 연산자
let result = score >= 60 ? "합격" : "불합격";

// switch문
let day = 3;
switch(day) {
  case 1:
    console.log("월요일");
    break;
  case 2:
    console.log("화요일");
    break;
  default:
    console.log("다른 요일");
}
