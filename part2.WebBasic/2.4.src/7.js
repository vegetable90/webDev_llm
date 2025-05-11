// 파일명: write-file.js
const fs = require('fs');

// 비동기 방식
const content = '안녕하세요, Node.js 파일 시스템입니다.';
fs.writeFile('output.txt', content, 'utf8', (err) => {
  if (err) {
    console.error('파일 쓰기 오류:', err);
    return;
  }
  console.log('파일이 성공적으로 작성되었습니다.');
});

// 동기 방식
try {
  fs.writeFileSync('output-sync.txt', content, 'utf8');
  console.log('파일이 성공적으로 작성되었습니다 (동기).');
} catch (err) {
  console.error('파일 쓰기 오류:', err);
}
