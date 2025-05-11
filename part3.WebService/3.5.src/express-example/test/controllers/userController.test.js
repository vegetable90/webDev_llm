const { expect } = require('chai');
const sinon = require('sinon');
const UserController = require('../../controllers/userController');

describe('User Controller', () => {
  describe('getUsers', () => {
    it('사용자 목록을 반환해야 함', () => {
      // 모의 요청 및 응답 객체 설정
      const req = {};
      const res = {
        json: sinon.spy()
      };
      
      // 컨트롤러 메서드 호출
      UserController.getUsers(req, res);
      
      // 결과 검증
      expect(res.json.calledOnce).to.be.true;
      expect(res.json.firstCall.args[0]).to.be.an('array');
      expect(res.json.firstCall.args[0].length).to.be.at.least(1);
    });
  });
  
  describe('getUserById', () => {
    it('유효한 ID로 사용자를 찾아야 함', () => {
      // 모의 요청 및 응답 객체 설정
      const req = {
        params: { id: '1' }
      };
      const res = {
        json: sinon.spy()
      };
      
      // 컨트롤러 메서드 호출
      UserController.getUserById(req, res);
      
      // 결과 검증
      expect(res.json.calledOnce).to.be.true;
      expect(res.json.firstCall.args[0]).to.be.an('object');
      expect(res.json.firstCall.args[0].id).to.equal(1);
    });
    
    it('유효하지 않은 ID에 대해 404 오류를 반환해야 함', () => {
      // 모의 요청 및 응답 객체 설정
      const req = {
        params: { id: '999' }
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };
      
      // 컨트롤러 메서드 호출
      UserController.getUserById(req, res);
      
      // 결과 검증
      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      expect(res.json.firstCall.args[0]).to.have.property('message');
    });
  });
  
  describe('createUser', () => {
    it('유효한 데이터로 새 사용자를 생성해야 함', () => {
      // 모의 요청 및 응답 객체 설정
      const req = {
        body: {
          name: '테스트 사용자',
          email: 'test@example.com'
        }
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };
      
      // 컨트롤러 메서드 호출
      UserController.createUser(req, res);
      
      // 결과 검증
      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      expect(res.json.firstCall.args[0]).to.have.property('id');
      expect(res.json.firstCall.args[0].name).to.equal('테스트 사용자');
      expect(res.json.firstCall.args[0].email).to.equal('test@example.com');
    });
    
    it('유효하지 않은 데이터에 대해 400 오류를 반환해야 함', () => {
      // 모의 요청 및 응답 객체 설정 (이메일 없음)
      const req = {
        body: {
          name: '테스트 사용자'
        }
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };
      
      // 컨트롤러 메서드 호출
      UserController.createUser(req, res);
      
      // 결과 검증
      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      expect(res.json.firstCall.args[0]).to.have.property('message');
    });
  });
});