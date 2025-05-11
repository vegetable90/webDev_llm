// 샘플 사용자 데이터 (실제로는 데이터베이스에서 가져와야 함)
const users = [
  { id: 1, name: '홍길동', email: 'hong@example.com' },
  { id: 2, name: '김철수', email: 'kim@example.com' },
  { id: 3, name: '이영희', email: 'lee@example.com' }
];

const UserController = {
  // 모든 사용자 조회
  getUsers: (req, res) => {
    res.json(users);
  },
  
  // 특정 사용자 조회
  getUserById: (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);
    
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }
  },
  
  // 사용자 생성
  createUser: (req, res) => {
    const { name, email } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ message: '이름과 이메일은 필수 입력 항목입니다.' });
    }
    
    // 새 사용자 ID 생성 (실제로는 데이터베이스에서 자동 생성)
    const newId = Math.max(...users.map(u => u.id)) + 1;
    
    const newUser = {
      id: newId,
      name,
      email
    };
    
    // 배열에 추가 (실제로는 데이터베이스에 저장)
    users.push(newUser);
    
    res.status(201).json(newUser);
  },
  
  // 사용자 정보 수정
  updateUser: (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }
    
    const { name, email } = req.body;
    
    // 기존 사용자 객체에 업데이트
    users[userIndex] = {
      ...users[userIndex],
      name: name || users[userIndex].name,
      email: email || users[userIndex].email
    };
    
    res.json(users[userIndex]);
  },
  
  // 사용자 삭제
  deleteUser: (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }
    
    // 배열에서 사용자 제거 (실제로는 데이터베이스에서 삭제)
    const deletedUser = users.splice(userIndex, 1)[0];
    
    res.json({ message: '사용자가 삭제되었습니다.', user: deletedUser });
  }
};

module.exports = UserController;