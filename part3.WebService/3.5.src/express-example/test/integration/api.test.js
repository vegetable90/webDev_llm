const request = require('supertest');
const { expect } = require('chai');
const app = require('../../app');

describe('User API', () => {
  describe('GET /api/users', () => {
    it('사용자 목록을 반환해야 함', async () => {
      const response = await request(app)
        .get('/api/users')
        .expect('Content-Type', /json/)
        .expect(200);
      
      expect(response.body).to.be.an('array');
      expect(response.body.length).to.be.at.least(1);
      expect(response.body[0]).to.have.property('id');
      expect(response.body[0]).to.have.property('name');
      expect(response.body[0]).to.have.property('email');
    });
  });
  
  describe('GET /api/users/:id', () => {
    it('유효한 ID로 사용자를 찾아야 함', async () => {
      const response = await request(app)
        .get('/api/users/1')
        .expect('Content-Type', /json/)
        .expect(200);
      
      expect(response.body).to.be.an('object');
      expect(response.body.id).to.equal(1);
      expect(response.body).to.have.property('name');
      expect(response.body).to.have.property('email');
    });
    
    it('유효하지 않은 ID에 대해 404 오류를 반환해야 함', async () => {
      const response = await request(app)
        .get('/api/users/999')
        .expect('Content-Type', /json/)
        .expect(404);
      
      expect(response.body).to.have.property('message');
    });
  });
  
  describe('POST /api/users', () => {
    it('유효한 데이터로 새 사용자를 생성해야 함', async () => {
      const userData = {
        name: '통합 테스트 사용자',
        email: 'integration@example.com'
      };
      
      const response = await request(app)
        .post('/api/users')
        .send(userData)
        .expect('Content-Type', /json/)
        .expect(201);
      
      expect(response.body).to.have.property('id');
      expect(response.body.name).to.equal(userData.name);
      expect(response.body.email).to.equal(userData.email);
    });
    
    it('유효하지 않은 데이터에 대해 400 오류를 반환해야 함', async () => {
      const invalidUserData = {
        name: '이메일 없는 사용자'
        // 이메일 필드 없음
      };
      
      const response = await request(app)
        .post('/api/users')
        .send(invalidUserData)
        .expect('Content-Type', /json/)
        .expect(400);
      
      expect(response.body).to.have.property('message');
    });
  });
});