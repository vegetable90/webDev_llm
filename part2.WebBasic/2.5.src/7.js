const fs = require('fs');
const readline = require('readline');

// 파일 이름 설정
const TODO_FILE = 'todos.json';

// 할일 목록을 저장할 배열
let todos = [];

// readline 인터페이스 생성
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 파일에서 할일 목록 로드
function loadTodos() {
  try {
    if (fs.existsSync(TODO_FILE)) {
      const data = fs.readFileSync(TODO_FILE, 'utf8');
      todos = JSON.parse(data);
      console.log('할일 목록을 불러왔습니다.');
    } else {
      console.log('새 할일 목록을 시작합니다.');
      saveTodos(); // 빈 할일 목록 파일 생성
    }
  } catch (error) {
    console.error('할일 목록을 불러오는 중 오류 발생:', error.message);
    console.log('새 할일 목록을 시작합니다.');
    saveTodos(); // 초기화
  }
}

// 할일 목록을 파일에 저장
function saveTodos() {
  try {
    fs.writeFileSync(TODO_FILE, JSON.stringify(todos, null, 2), 'utf8');
  } catch (error) {
    console.error('할일 목록을 저장하는 중 오류 발생:', error.message);
  }
}

// 할일 목록 표시
function displayTodos() {
  console.log('\n===== 할일 목록 =====');
  if (todos.length === 0) {
    console.log('할일이 없습니다.');
  } else {
    todos.forEach((todo, index) => {
      const status = todo.completed ? '[완료]' : '[진행중]';
      console.log(`${index + 1}. ${status} ${todo.text}`);
    });
  }
  console.log('=====================\n');
}

// 할일 추가
function addTodo(text) {
  todos.push({
    text,
    completed: false,
    createdAt: new Date().toISOString()
  });
  saveTodos();
  console.log(`'${text}' 항목이 추가되었습니다.`);
}

// 할일 완료 처리
function completeTodo(index) {
  if (index < 0 || index >= todos.length) {
    console.log('유효하지 않은 항목 번호입니다.');
    return;
  }
  
  todos[index].completed = true;
  saveTodos();
  console.log(`'${todos[index].text}' 항목이 완료 처리되었습니다.`);
}

// 할일 삭제
function deleteTodo(index) {
  if (index < 0 || index >= todos.length) {
    console.log('유효하지 않은 항목 번호입니다.');
    return;
  }
  
  const deleted = todos.splice(index, 1)[0];
  saveTodos();
  console.log(`'${deleted.text}' 항목이 삭제되었습니다.`);
}

// 메인 메뉴 표시
function showMainMenu() {
  console.log('\n===== 할일 관리 앱 =====');
  console.log('1. 할일 목록 보기');
  console.log('2. 할일 추가하기');
  console.log('3. 할일 완료하기');
  console.log('4. 할일 삭제하기');
  console.log('0. 종료하기');
  console.log('=======================\n');
  
  rl.question('원하는 작업을 선택하세요: ', (choice) => {
    switch (choice) {
      case '0':
        console.log('프로그램을 종료합니다.');
        rl.close();
        break;
      case '1':
        displayTodos();
        showMainMenu();
        break;
      case '2':
        rl.question('추가할 할일을 입력하세요: ', (text) => {
          addTodo(text);
          showMainMenu();
        });
        break;
      case '3':
        displayTodos();
        rl.question('완료할 항목 번호를 입력하세요: ', (num) => {
          completeTodo(parseInt(num) - 1);
          showMainMenu();
        });
        break;
      case '4':
        displayTodos();
        rl.question('삭제할 항목 번호를 입력하세요: ', (num) => {
          deleteTodo(parseInt(num) - 1);
          showMainMenu();
        });
        break;
      default:
        console.log('올바른 선택이 아닙니다. 다시 시도하세요.');
        showMainMenu();
        break;
    }
  });
}

// 앱 시작
loadTodos();
showMainMenu();
