const readline = require('readline');

// 계산기 인터페이스 생성
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 시작 메시지
console.log('===== 간단한 계산기 =====');
console.log('사용법: 숫자 연산자 숫자');
console.log('지원 연산자: +, -, *, /, %');
console.log('종료: exit 입력');
console.log('========================\n');

// 계산 함수
function calculate(num1, operator, num2) {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);
  
  if (isNaN(num1) || isNaN(num2)) {
    return '오류: 유효한 숫자를 입력하세요.';
  }
  
  switch (operator) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '*':
      return num1 * num2;
    case '/':
      if (num2 === 0) {
        return '오류: 0으로 나눌 수 없습니다.';
      }
      return num1 / num2;
    case '%':
      if (num2 === 0) {
        return '오류: 0으로 나눌 수 없습니다.';
      }
      return num1 % num2;
    default:
      return '오류: 지원하지 않는 연산자입니다.';
  }
}

// 사용자 입력 처리 함수
function promptUser() {
  rl.question('계산식 입력: ', (input) => {
    // 종료 조건
    if (input.toLowerCase() === 'exit') {
      console.log('계산기를 종료합니다.');
      rl.close();
      return;
    }
    
    // 입력값 파싱
    const parts = input.trim().split(' ');
    
    // 입력 형식 확인
    if (parts.length !== 3) {
      console.log('오류: "숫자 연산자 숫자" 형식으로 입력하세요.');
      promptUser();
      return;
    }
    
    const [num1, operator, num2] = parts;
    const result = calculate(num1, operator, num2);
    
    console.log(`결과: ${result}`);
    console.log('-------------------');
    
    // 다음 입력 받기
    promptUser();
  });
}

// 계산기 시작
promptUser();
