// 파일명: args.js
console.log('Command-line arguments:');
console.log(process.argv);

// 사용자 입력 인자만 처리
const userArgs = process.argv.slice(2);
console.log('User arguments:', userArgs);
