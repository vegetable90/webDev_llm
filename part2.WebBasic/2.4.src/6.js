// 파일명: read-file.js
const fs = require('fs');

// 비동기 방식
fs.readFile('sample.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('파일 읽기 오류:', err);
    return;
  }
  console.log('파일 내용 (비동기):', data);
});

// 동기 방식
try {
  const data = fs.readFileSync('sample.txt', 'utf8');
  console.log('파일 내용 (동기):', data);
} catch (err) {
  console.error('파일 읽기 오류:', err);
}
