const user = {
  id: 1,
  name: "관리자",
  password: "secret123",
  email: "admin@example.com",
  createdAt: new Date(),
  getFullInfo: function() {
    return `${this.name} (${this.email})`;
  }
};

// 필요한 속성만 선택하여 변환 (리플레이서 함수)
const jsonStringReplacer = JSON.stringify(user, (key, value) => {
  // 비밀번호 제외, 함수는 자동 제외됨
  if (key === "password") return undefined;
  return value;
}, 2);

console.log(jsonStringReplacer);
// password 제외, getFullInfo 함수 제외됨

// 리플레이서 배열 사용
const jsonStringSelectedProps = JSON.stringify(user, ["name", "email"], 2);
console.log(jsonStringSelectedProps);
// name과 email만 포함
