// 가져오기 (app.mjs)
import { add, subtract } from './math.mjs';
import multiply from './math.mjs'; // 기본 내보내기 가져오기

console.log(add(5, 3)); // 8
console.log(subtract(10, 4)); // 6
console.log(multiply(4, 2)); // 8 