// 파일명: update-json.js
const fs = require('fs');

// 파일에서 데이터 읽기
let data;
try {
  const rawData = fs.readFileSync('output.json', 'utf8');
  data = JSON.parse(rawData);
} catch (err) {
  console.error('파일 읽기 오류:', err.message);
  // 파일이 없으면 기본 데이터 구조 생성
  data = { users: [] };
}

// 데이터 업데이트
data.users.push({ id: 4, name: "박민수", active: true });
data.lastUpdated = new Date();

// 업데이트된 데이터 저장
try {
  fs.writeFileSync('output.json', JSON.stringify(data, null, 2), 'utf8');
  console.log('파일 업데이트 성공');
} catch (err) {
  console.error('파일 업데이트 오류:', err.message);
}
