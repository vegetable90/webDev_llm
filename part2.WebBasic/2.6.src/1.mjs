// 내보내기 (math.mjs)
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

// 기본 내보내기
export default function multiply(a, b) {
  return a * b;
}

// 가져오기 (app.mjs)
import { add, subtract } from './math.mjs';
import multiply from './math.mjs'; // 기본 내보내기 가져오기

console.log(add(5, 3)); // 8
console.log(multiply(4, 2)); // 8
