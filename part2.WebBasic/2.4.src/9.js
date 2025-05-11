const fs = require('fs');
const notesFile = 'notes.txt';

// 명령행 인자 가져오기
const args = process.argv.slice(2);
const command = args[0];

// notes.txt 파일이 없으면 빈 파일 생성
if (!fs.existsSync(notesFile)) {
  fs.writeFileSync(notesFile, '', 'utf8');
  console.log(`${notesFile} 파일이 생성되었습니다.`);
}

// 명령어 처리 함수
function handleCommand() {
  switch (command) {
    case 'add':
      // 메모 추가: node notes.js add "새 메모 내용"
      if (args[1]) {
        addNote(args[1]);
      } else {
        console.log('추가할 메모 내용을 입력하세요.');
      }
      break;
    
    case 'list':
      // 메모 목록 조회: node notes.js list
      listNotes();
      break;
    
    case 'clear':
      // 모든 메모 삭제: node notes.js clear
      clearNotes();
      break;
    
    default:
      showHelp();
      break;
  }
}

// 메모 추가 함수
function addNote(note) {
  const timestamp = new Date().toISOString();
  const noteWithTimestamp = `[${timestamp}] ${note}\n`;
  
  fs.appendFile(notesFile, noteWithTimestamp, 'utf8', (err) => {
    if (err) {
      console.error('메모 추가 중 오류 발생:', err);
      return;
    }
    console.log('메모가 추가되었습니다.');
  });
}

// 메모 목록 조회 함수
function listNotes() {
  fs.readFile(notesFile, 'utf8', (err, data) => {
    if (err) {
      console.error('메모 읽기 중 오류 발생:', err);
      return;
    }
    
    if (data.trim() === '') {
      console.log('메모가 없습니다.');
    } else {
      console.log('===== 메모 목록 =====');
      console.log(data);
      console.log('====================');
    }
  });
}

// 모든 메모 삭제 함수
function clearNotes() {
  fs.writeFile(notesFile, '', 'utf8', (err) => {
    if (err) {
      console.error('메모 삭제 중 오류 발생:', err);
      return;
    }
    console.log('모든 메모가 삭제되었습니다.');
  });
}

// 도움말 표시 함수
function showHelp() {
  console.log(`\n사용법:\n  node notes.js add "메모 내용"  - 새 메모 추가\n  node notes.js list            - 모든 메모 조회\n  node notes.js clear           - 모든 메모 삭제\n  `);
}

// 명령어 실행
handleCommand();
