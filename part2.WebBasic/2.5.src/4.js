// 파일명: inquirer-demo.js
// 설치: npm install inquirer@^8.0.0
const inquirer = require('inquirer');

const questions = [
  {
    type: 'input',
    name: 'name',
    message: '이름을 입력하세요:',
  },
  {
    type: 'list',
    name: 'language',
    message: '선호하는 프로그래밍 언어는?',
    choices: ['JavaScript', 'Python', 'Java', 'C++', '기타'],
  },
  {
    type: 'confirm',
    name: 'isStudent',
    message: '학생인가요?',
    default: false,
  }
];

inquirer.prompt(questions).then(answers => {
  console.log('\n입력 결과:');
  console.log(JSON.stringify(answers, null, 2));
});
