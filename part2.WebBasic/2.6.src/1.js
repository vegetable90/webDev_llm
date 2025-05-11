// 내보내기 (math.js)
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;

module.exports = {
  add,
  subtract
};

// 또는 개별적으로 내보내기
module.exports.multiply = (a, b) => a * b;

// 가져오기 (app.js)
const math = require('./math');
console.log(math.add(5, 3)); // 8

// 구조 분해 할당으로 가져오기
const { subtract, multiply } = require('./math');
console.log(subtract(10, 4)); // 6
