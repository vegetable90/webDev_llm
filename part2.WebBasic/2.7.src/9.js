// 파일명: filter-json.js
const data = {
  users: [
    { id: 1, name: "홍길동", age: 25, role: "admin" },
    { id: 2, name: "김철수", age: 30, role: "user" },
    { id: 3, name: "이영희", age: 28, role: "user" },
    { id: 4, name: "박민수", age: 22, role: "editor" }
  ]
};

// 역할이 'user'인 사용자만 필터링
const users = data.users.filter(user => user.role === 'user');
console.log('일반 사용자:', users);

// 25세 이상인 사용자만 필터링
const adults = data.users.filter(user => user.age >= 25);
console.log('25세 이상 사용자:', adults);

// 이름에 '김'이 포함된 사용자 찾기
const kimUsers = data.users.filter(user => user.name.includes('김'));
console.log('김씨 사용자:', kimUsers);
