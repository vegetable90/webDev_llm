const express = require('express');
const path = require('path');
const app = express();
const userRoutes = require('./routes/userRoutes');

// 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'public')));

// 기본 라우트
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API 라우트
app.use('/api/users', userRoutes);

// 에러 핸들링 미들웨어
app.use((req, res, next) => {
  res.status(404).json({ message: '요청한 리소스를 찾을 수 없습니다.' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: '서버 오류가 발생했습니다.' });
});

// 내보내기 (테스트를 위해)
module.exports = app;