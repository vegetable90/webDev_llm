// 파일명: stdin-input.js
process.stdin.setEncoding('utf8');

console.log('질문에 답변하세요 (종료: Ctrl+C):');

process.stdin.on('data', (data) => {
  const input = data.trim();
  
  if (input === 'exit') {
    console.log('프로그램을 종료합니다.');
    process.exit(0);
  }
  
  console.log(`입력값: ${input}`);
  console.log('다른 내용을 입력하세요:');
});
