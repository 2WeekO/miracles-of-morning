
# MIRACLES OF MORNING Management Application
아침 일찍 활동을 하게 만드는 헬스 케어 어플리케이션 개발 프로젝트
![alt text](README/logo.png)

## Tech Stack
Frontend (React Native/Expo)
- TypeScript, React Native, Expo
- 네비게이션: Expo Router
- HTTP 통신: Axios
- 푸시 알림: Expo Notifications

Backend (Node.js/TypeScript)
- TypeScript, Node.js, Express
- ORM: TypeORM
- 데이터베이스: MySQL
- WebSocket: Socket.io

## 기능
- 회원가입 / 로그인
- 자는 시간, 일어나는 시간 설정
- 돈을 넣고 못하면 차감되는 방식

## 주요 기능 구현
1. 인증 시스템
- JWT 기반 사용자 인증
- QR 코드 기반 챌린지 인증
- 이메일 인증 코드 시스템

2. 실시간 기능
- Socket.io 기반 채팅 기능
- 룸 멤버 실시간 상태 업데이트
- Expo Notifications 기반 알림

3. 데이터 관리
- TypeORM을 활용한 DB 스키마 설계
- 사용자, 챌린지, 룸, 거래 내역 관리
- 관계형 데이터베이스 활용

4. UI/UX
- 직관적인 QR 스캔 인터페이스
- 챌린지 및 룸 관리 인터페이스
- 사용자 프로필 관리

## 프로젝트 구조
Frontend
/app
- /Auth - 로그인/회원가입
- /Extra - QR스캔/룸 생성
- /Main - 홈/챌린지/프로필
- /Service - API 통신
- /Style - 스타일 정의


Backend
/src
- /controllers - 요청 처리
- /services - 비즈니스 로직
- /entities - DB 스키마
- /routes - API 라우팅
- /middleware - 인증 등

## 성과 및 개선점
1. 기술적 성과
- TypeScript 도입으로 코드 안정성 향상
- 모듈화된 서비스 계층 설계
- 실시간 채팅 기능 구현

2. 사용자 경험
- QR 코드 스캔으로 간편한 인증
- 푸시 알림으로 정시 알림 제공
- 실시간 채팅으로 사용자 간 소통
