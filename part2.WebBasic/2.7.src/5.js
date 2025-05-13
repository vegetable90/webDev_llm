// 파일명: read-json.js
const fs = require('fs');

// 동기적으로 JSON 파일 읽기
try {
  const rawData = fs.readFileSync('5.data.json', 'utf8');
  const data = JSON.parse(rawData);
  console.log('데이터 읽기 성공:', data);
} catch (err) {
  console.error('파일 읽기 오류:', err.message);
}

// 비동기적으로 JSON 파일 읽기
fs.readFile('5.data.json', 'utf8', (err, rawData) => {
  if (err) {
    console.error('파일 읽기 오류:', err.message);
    return;
  }
  
  try {
    const data = JSON.parse(rawData);
    console.log('데이터 읽기 성공 (비동기):', data);
  } catch (err) {
    console.error('JSON 파싱 오류:', err.message);
  }
});
