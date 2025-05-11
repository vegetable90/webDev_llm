const request = require('supertest');
const app = require('../app');

describe('User API', () => {
  describe('GET /api/users', () => {
    test('사용자 목록을 반환해야 함', async () => {
      const response = await request(app)
        .get('/api/users');
      
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThanOrEqual(1);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('name');
      expect(response.body[0]).toHaveProperty('email');
    });
  });
  
  describe('GET /api/users/:id', () => {
    test('유효한 ID로 사용자를 찾아야 함', async () => {
      const response = await request(app)
        .get('/api/users/1');
      
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.id).toBe(1);
      expect(response.body).toHaveProperty('name');
      expect(response.body).toHaveProperty('email');
    });
    
    test('유효하지 않은 ID에 대해 404 오류를 반환해야 함', async () => {
      const response = await request(app)
        .get('/api/users/999');
      
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message');
    });
  });
  
  describe('POST /api/users', () => {
    test('유효한 데이터로 새 사용자를 생성해야 함', async () => {
      const userData = {
        name: 'Jest 테스트 사용자',
        email: 'jest@example.com'
      };
      
      const response = await request(app)
        .post('/api/users')
        .send(userData);
      
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(userData.name);
      expect(response.body.email).toBe(userData.email);
    });
    
    test('유효하지 않은 데이터에 대해 400 오류를 반환해야 함', async () => {
      const invalidUserData = {
        name: '이메일 없는 사용자'
        // 이메일 필드 없음
      };
      
      const response = await request(app)
        .post('/api/users')
        .send(invalidUserData);
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
    });
  });
});