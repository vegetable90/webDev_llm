// ./config/config.js
module.exports = {
  port: process.env.PORT || 3000,
  dbUrl: process.env.DB_URL || 'mongodb://localhost:27017/myapp',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key'
};

// ./utils/logger.js
function logInfo(message) {
  console.log(`[INFO] ${new Date().toISOString()}: ${message}`);
}

function logError(message) {
  console.error(`[ERROR] ${new Date().toISOString()}: ${message}`);
}

module.exports = {
  logInfo,
  logError
};

// ./models/user.js
const users = [];

function findUserById(id) {
  return users.find(user => user.id === id);
}

function createUser(userData) {
  const newUser = {
    id: Date.now().toString(),
    ...userData
  };
  users.push(newUser);
  return newUser;
}

module.exports = {
  findUserById,
  createUser
};

// ./controllers/userController.js
const { findUserById, createUser } = require('../models/user');
const { logInfo, logError } = require('../utils/logger');

function getUser(req, res) {
  const userId = req.params.id;
  const user = findUserById(userId);
  
  if (user) {
    logInfo(`User found: ${userId}`);
    return user;
  } else {
    logError(`User not found: ${userId}`);
    return null;
  }
}

function addUser(userData) {
  try {
    const newUser = createUser(userData);
    logInfo(`User created: ${newUser.id}`);
    return newUser;
  } catch (error) {
    logError(`Error creating user: ${error.message}`);
    throw error;
  }
}

module.exports = {
  getUser,
  addUser
};

// index.js (애플리케이션 진입점)
const config = require('./config/config');
const { logInfo } = require('./utils/logger');
const userController = require('./controllers/userController');

logInfo(`Starting application on port ${config.port}`);

// 사용자 추가 테스트
const newUser = userController.addUser({ name: 'John Doe', email: 'john@example.com' });
console.log('새 사용자:', newUser);

// 사용자 조회 테스트 (가상의 요청/응답 객체)
const req = { params: { id: newUser.id } };
const user = userController.getUser(req);
console.log('조회된 사용자:', user);
