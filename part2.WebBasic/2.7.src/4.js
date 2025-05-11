// 날짜 문자열을 포함한 JSON
const jsonWithDate = '{"name":"이벤트","date":"2023-12-31T00:00:00.000Z","active":true}';

// 리바이버(reviver) 함수로 날짜 문자열을 Date 객체로 변환
const event = JSON.parse(jsonWithDate, (key, value) => {
  // date 키를 가진 값을 Date 객체로 변환
  if (key === "date") return new Date(value);
  return value;
});

console.log(event.date instanceof Date); // true
console.log(event.date.getFullYear()); // 2023
