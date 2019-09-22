# HowToGo API Service

HowToGo 서비스에 사용될 데이터를 제공하는 API

## How to Run

1. 의존 모듈 설치

```bash
$ npm install
```

2. `.env` 파일 생성 및 환경값 설정

```bash
PORT=<API 서버의 포트 번호>
DB_IP=<DB 서버의 IP 주소>
DB_PORT=<DB 서버의 포트 번호>
DB_NAME=<사용할 DB의 이름>
```

`.env`를 설정하지 않을 경우, `app.js` 내에 설정된 기본값으로 작동합니다.

3. MongoDB 실행

4. 서버 실행

```bash
$ npm run start
API Server: 8080번 포트에서 대기중
DB Server: 27017번 포트에서 대기중
```

## Tech Stack

- Node.js
- Mongoose
