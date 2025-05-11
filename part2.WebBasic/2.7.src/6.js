// 파일명: write-json.js
const fs = require('fs');

// 저장할 데이터
const data = {
  users: [
    { id: 1, name: "홍길동", active: true },
    { id: 2, name: "김철수", active: false },
    { id: 3, name: "이영희", active: true }
  ],
  company: "ABC Corp",
  version: "1.0.0",
  lastUpdated: new Date()
};

// 동기적으로 JSON 파일 쓰기
try {
  fs.writeFileSync('output.json', JSON.stringify(data, null, 2), 'utf8');
  console.log('파일 쓰기 성공');
} catch (err) {
  console.error('파일 쓰기 오류:', err.message);
}

// 비동기적으로 JSON 파일 쓰기
fs.writeFile('output-async.json', JSON.stringify(data, null, 2), 'utf8', (err) => {
  if (err) {
    console.error('파일 쓰기 오류 (비동기):', err.message);
    return;
  }
  console.log('파일 쓰기 성공 (비동기)');
});
