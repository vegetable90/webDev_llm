// 자바스크립트 객체
const person = {
  name: "홍길동",
  age: 25,
  hobbies: ["독서", "등산"],
  active: true
};

// JSON 문자열로 변환
const jsonString = JSON.stringify(person);
console.log(jsonString);
// 결과: {"name":"홍길동","age":25,"hobbies":["독서","등산"],"active":true}

// 들여쓰기 적용하여 가독성 높이기
const prettyJson = JSON.stringify(person, null, 2);
console.log(prettyJson);
// 결과:
// {
//   "name": "홍길동",
//   "age": 25,
//   "hobbies": [
//     "독서",
//     "등산"
//   ],
//   "active": true
// }
