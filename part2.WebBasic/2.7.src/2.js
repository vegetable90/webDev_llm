// JSON 문자열
const jsonString = '{"name":"김철수","age":30,"isAdmin":false,"skills":["HTML","CSS","JavaScript"]}';

// 자바스크립트 객체로 변환
const person = JSON.parse(jsonString);
console.log(person.name); // 김철수
console.log(person.skills[2]); // JavaScript
