// 가져오기 (app.js)
const math = require('./math');
console.log(math.add(5, 3)); // 8

// 구조 분해 할당으로 가져오기
const { subtract, multiply } = require('./math');
console.log(subtract(10, 4)); // 6
console.log(multiply(2, 3)); // 6 