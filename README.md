# HowToGo API Service

HowToGo 서비스에 사용될 데이터를 제공하는 API

## API 소개

[API 소개 문서🛠](https://github.com/2pow4/HowToGo-API/blob/master/APIDOC.md)를 참고하시기 바랍니다.

## How to Run

1. 의존 모듈 설치

```bash
$ npm install
```

2. `.env` 파일 생성 및 환경값 설정

```bash
PORT=<API 서버의 포트 번호>
API_KEY=<공공 API 사용을 위한 API Key>
```

`PORT`는 기본 입력값이 `3000`이지만, `API_KEY` 값을 제공하지 않으면 서버가 정상적으로 실행되지 않습니다.

3. 서버 실행

```bash
$ npm run start
API Server: 8080번 포트에서 대기중
```

## Tech Stack

- Node.js
