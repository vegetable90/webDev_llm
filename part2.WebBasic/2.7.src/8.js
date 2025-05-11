const fs = require('fs');
const readline = require('readline');

// 파일 경로 설정
const CONTACTS_FILE = 'contacts.json';

// readline 인터페이스 생성
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 연락처 로드
function loadContacts() {
  try {
    if (fs.existsSync(CONTACTS_FILE)) {
      const data = fs.readFileSync(CONTACTS_FILE, 'utf8');
      return JSON.parse(data);
    }
    return { contacts: [] };
  } catch (err) {
    console.error('연락처 로드 중 오류:', err.message);
    return { contacts: [] };
  }
}

// 연락처 저장
function saveContacts(data) {
  try {
    fs.writeFileSync(CONTACTS_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('연락처 저장 중 오류:', err.message);
    return false;
  }
}

// 모든 연락처 표시
function listContacts() {
  const data = loadContacts();
  
  console.log('\n===== 연락처 목록 =====');
  
  if (data.contacts.length === 0) {
    console.log('연락처가 없습니다.');
  } else {
    data.contacts.forEach((contact, index) => {
      console.log(`[${index + 1}] ${contact.name}`);
      console.log(`    전화: ${contact.phone}`);
      console.log(`    이메일: ${contact.email || 'N/A'}`);
      if (contact.address) {
        console.log(`    주소: ${contact.address}`);
      }
      console.log('-------------------------');
    });
  }
  
  showMainMenu();
}

// 연락처 추가
function addContact() {
  rl.question('이름: ', (name) => {
    rl.question('전화번호: ', (phone) => {
      rl.question('이메일(선택): ', (email) => {
        rl.question('주소(선택): ', (address) => {
          const data = loadContacts();
          
          // 새 연락처 객체 생성
          const newContact = {
            id: Date.now().toString(),
            name,
            phone,
            createdAt: new Date().toISOString()
          };
          
          // 선택적 필드 추가
          if (email) newContact.email = email;
          if (address) newContact.address = address;
          
          // 연락처 목록에 추가
          data.contacts.push(newContact);
          
          // 저장
          if (saveContacts(data)) {
            console.log(`\n"${name}" 연락처가 추가되었습니다.`);
          } else {
            console.log('\n연락처 추가 중 오류가 발생했습니다.');
          }
          
          showMainMenu();
        });
      });
    });
  });
}

// 연락처 검색
function searchContact() {
  rl.question('검색어를 입력하세요: ', (searchTerm) => {
    const data = loadContacts();
    const searchTermLower = searchTerm.toLowerCase();
    
    const results = data.contacts.filter(contact => {
      return (
        contact.name.toLowerCase().includes(searchTermLower) ||
        contact.phone.includes(searchTerm) ||
        (contact.email && contact.email.toLowerCase().includes(searchTermLower)) ||
        (contact.address && contact.address.toLowerCase().includes(searchTermLower))
      );
    });
    
    console.log('\n===== 검색 결과 =====');
    
    if (results.length === 0) {
      console.log(`"${searchTerm}"에 대한 검색 결과가 없습니다.`);
    } else {
      results.forEach((contact, index) => {
        console.log(`[${index + 1}] ${contact.name}`);
        console.log(`    전화: ${contact.phone}`);
        console.log(`    이메일: ${contact.email || 'N/A'}`);
        if (contact.address) {
          console.log(`    주소: ${contact.address}`);
        }
        console.log('-------------------------');
      });
    }
    
    showMainMenu();
  });
}

// 연락처 삭제
function deleteContact() {
  rl.question('삭제할 연락처의 이름을 입력하세요: ', (name) => {
    const data = loadContacts();
    const nameLower = name.toLowerCase();
    
    // 해당 이름의 연락처 찾기
    const contactIndex = data.contacts.findIndex(contact => 
      contact.name.toLowerCase() === nameLower);
    
    if (contactIndex === -1) {
      console.log(`\n"${name}" 연락처를 찾을 수 없습니다.`);
      showMainMenu();
      return;
    }
    
    const contactName = data.contacts[contactIndex].name;
    
    rl.question(`"${contactName}" 연락처를 삭제하시겠습니까? (y/n): `, (answer) => {
      if (answer.toLowerCase() === 'y') {
        // 연락처 삭제
        data.contacts.splice(contactIndex, 1);
        
        // 저장
        if (saveContacts(data)) {
          console.log(`\n"${contactName}" 연락처가 삭제되었습니다.`);
        } else {
          console.log('\n연락처 삭제 중 오류가 발생했습니다.');
        }
      } else {
        console.log('\n삭제가 취소되었습니다.');
      }
      
      showMainMenu();
    });
  });
}

// 메인 메뉴 표시
function showMainMenu() {
  console.log('\n===== 주소록 관리 =====');
  console.log('1. 모든 연락처 보기');
  console.log('2. 연락처 추가');
  console.log('3. 연락처 검색');
  console.log('4. 연락처 삭제');
  console.log('0. 종료');
  console.log('====================\n');
  
  rl.question('원하는 작업을 선택하세요: ', (choice) => {
    switch (choice) {
      case '0':
        console.log('프로그램을 종료합니다.');
        rl.close();
        break;
      case '1':
        listContacts();
        break;
      case '2':
        addContact();
        break;
      case '3':
        searchContact();
        break;
      case '4':
        deleteContact();
        break;
      default:
        console.log('올바른 선택이 아닙니다. 다시 시도하세요.');
        showMainMenu();
        break;
    }
  });
}

// 주소록 앱 시작
console.log('===== 주소록 앱 =====');
showMainMenu();
