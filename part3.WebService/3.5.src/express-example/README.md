# Express 서버 예제 및 테스트

Node.js Express 프레임워크를 사용한 간단한 서버 애플리케이션과 다양한 테스트 방법을 보여주는 예제 프로젝트입니다.

## 설치 방법

```bash
# 프로젝트 클론 또는 다운로드 후
npm install
```

## 서버 실행 방법

```bash
# 기본 실행
npm start

# 개발 모드 실행 (파일 변경 감지)
npm run dev
```

## 테스트 실행 방법

```bash
# 모든 테스트 실행 (Mocha)
npm test

# 단위 테스트만 실행
npm run test:unit

# 통합 테스트만 실행
npm run test:integration

# Jest 테스트 실행
npm run test:jest
```

## 프로젝트 구조

```
express-example/
├── app.js                # Express 애플리케이션 정의
├── server.js             # 서버 시작 파일
├── package.json          # 프로젝트 설정
├── controllers/          # 컨트롤러 디렉토리
│   └── userController.js # 사용자 관련 컨트롤러
├── routes/               # 라우트 디렉토리
│   └── userRoutes.js     # 사용자 관련 라우트
├── public/               # 정적 파일 디렉토리
│   ├── index.html        # 웹 인터페이스 메인 페이지
│   ├── css/              # CSS 스타일시트
│   │   └── style.css
│   └── js/               # 클라이언트 사이드 JavaScript
│       └── app.js
├── test/                 # Mocha/Chai 테스트 디렉토리
│   ├── controllers/      # 컨트롤러 단위 테스트
│   └── integration/      # API 통합 테스트
└── __tests__/            # Jest 테스트 디렉토리
    └── api.test.js       # Jest API 테스트
```

## API 엔드포인트

* `GET /api/users` - 모든 사용자 조회
* `GET /api/users/:id` - 특정 ID의 사용자 조회
* `POST /api/users` - 새 사용자 생성 (name, email 필요)
* `PUT /api/users/:id` - 사용자 정보 수정
* `DELETE /api/users/:id` - 사용자 삭제

## 테스트 도구

* **Mocha** - 테스트 러너
* **Chai** - 검증(assertion) 라이브러리
* **Sinon** - 테스트 스파이, 스텁, 모의 객체 생성 라이브러리
* **Supertest** - HTTP 요청 테스트 라이브러리
* **Jest** - 올인원 테스트 프레임워크

## Express 프레임워크 특징

* 미니멀리즘을 지향하는 경량 웹 프레임워크
* 미들웨어 기반 아키텍처로 유연한 애플리케이션 구성 가능
* 라우팅 시스템으로 HTTP 메서드 기반 엔드포인트 구성
* 다양한 템플릿 엔진 지원 (Pug, EJS, Handlebars 등)
* 정적 파일 서빙 기능

## 테스트 기법

### 단위 테스트
컨트롤러, 서비스, 모델 등 애플리케이션의 개별 구성 요소를 독립적으로 테스트합니다.

### 통합 테스트
여러 구성 요소가 함께 작동하는 방식을 테스트합니다. API 엔드포인트에 요청을 보내고 응답을 검증합니다.

### 모의 객체(Mocking)
외부 의존성(데이터베이스, 외부 API 등)을 모의 객체로 대체하여 테스트를 격리시킵니다.
