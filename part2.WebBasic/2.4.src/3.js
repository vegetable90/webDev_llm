// 기본 함수
function add(a, b) {
  return a + b;
}

// 화살표 함수
const multiply = (a, b) => a * b;

// 콜백 함수
function calculate(a, b, operation) {
  return operation(a, b);
}
console.log(calculate(5, 3, add));
