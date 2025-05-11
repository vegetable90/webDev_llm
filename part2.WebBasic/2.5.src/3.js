// 파일명: readline-input.js
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('당신의 이름은 무엇인가요? ', (name) => {
  console.log(`안녕하세요, ${name}님!`);
  
  rl.question('몇 살인가요? ', (age) => {
    console.log(`${name}님은 ${age}세입니다.`);
    rl.close();
  });
});

rl.on('close', () => {
  console.log('프로그램을 종료합니다.');
  process.exit(0);
});
