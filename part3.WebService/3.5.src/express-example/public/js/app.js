// DOM 요소
const userForm = document.getElementById('userForm');
const loadUsersBtn = document.getElementById('loadUsers');
const userListDiv = document.getElementById('userList');

// 사용자 목록 조회
async function fetchUsers() {
  try {
    const response = await fetch('/api/users');
    if (!response.ok) {
      throw new Error('서버 응답 오류');
    }
    
    const users = await response.json();
    displayUsers(users);
  } catch (error) {
    console.error('사용자 조회 오류:', error);
    userListDiv.innerHTML = `<p class="error">사용자 목록을 불러오는 중 오류가 발생했습니다: ${error.message}</p>`;
  }
}

// 사용자 목록 표시
function displayUsers(users) {
  if (users.length === 0) {
    userListDiv.innerHTML = '<p>등록된 사용자가 없습니다.</p>';
    return;
  }
  
  let html = '';
  users.forEach(user => {
    html += `
      <div class="user-card">
        <h4>${user.name}</h4>
        <p class="user-email">${user.email}</p>
        <p>ID: ${user.id}</p>
        <button onclick="deleteUser(${user.id})">삭제</button>
      </div>
    `;
  });
  
  userListDiv.innerHTML = html;
}

// 새 사용자 생성
async function createUser(userData) {
  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || '사용자를 생성할 수 없습니다.');
    }
    
    const newUser = await response.json();
    return newUser;
  } catch (error) {
    console.error('사용자 생성 오류:', error);
    throw error;
  }
}

// 사용자 삭제
async function deleteUser(id) {
  if (!confirm(`ID가 ${id}인 사용자를 삭제하시겠습니까?`)) {
    return;
  }
  
  try {
    const response = await fetch(`/api/users/${id}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) {
      throw new Error('사용자를 삭제할 수 없습니다.');
    }
    
    alert('사용자가 삭제되었습니다.');
    fetchUsers(); // 목록 갱신
  } catch (error) {
    console.error('사용자 삭제 오류:', error);
    alert(`사용자 삭제 오류: ${error.message}`);
  }
}

// 이벤트 리스너
userForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  
  const userData = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim()
  };
  
  try {
    await createUser(userData);
    alert('사용자가 생성되었습니다.');
    nameInput.value = '';
    emailInput.value = '';
    fetchUsers(); // 목록 갱신
  } catch (error) {
    alert(`사용자 생성 오류: ${error.message}`);
  }
});

loadUsersBtn.addEventListener('click', fetchUsers);

// 페이지 로드 시 사용자 목록 가져오기
document.addEventListener('DOMContentLoaded', fetchUsers);