const app = require('./app');
const port = process.env.PORT || 3000;

// 서버 시작
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다`);
});