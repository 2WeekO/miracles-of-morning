# Miracles of Morning Management Application  

**사용자의 기상 습관을 자동화된 방식으로 관리하는 챌린지형 모바일 앱입니다.**  
정해진 시간에 일어나지 못하면 예치금이 차감되는 금전 패널티 구조로, 행동경제학적 동기부여를 제공합니다.  

![alt text](README/logo.png)
---

## Tech Stack  

### Frontend (React Native / Expo)
- TypeScript, React Native, Expo  
- 네비게이션: Expo Router  
- HTTP 통신: Axios  
- 푸시 알림: Expo Notifications  

### Backend (Node.js / TypeScript)
- TypeScript, Node.js (Express)  
- ORM: TypeORM  
- Database: MySQL  
- 실시간 통신: Socket.io  

---

## 주요 기능  

### 인증 시스템  
- JWT 기반 사용자 인증  
- QR 코드 기반 챌린지 인증  
- 이메일 인증 코드 발송 시스템  

### 실시간 기능  
- Socket.io 기반 실시간 룸 상태 업데이트  
- 실시간 채팅 기능  
- Expo Notifications 기반 푸시 알림  

### 데이터 관리  
- TypeORM 기반 DB 스키마 설계  
- 사용자 / 챌린지 / 룸 / 거래 내역 관리  
- 관계형 데이터 무결성 유지  

### UI/UX  
- QR 스캔 기반 간편 인증  
- 챌린지 및 룸 관리 인터페이스  
- 사용자 프로필 관리  

---

## 프로젝트 구조  

**Frontend (/app)**  
- /Auth - 로그인/회원가입
- /Extra - QR스캔/룸 생성
- /Main - 홈/챌린지/프로필
- /Service - API 통신
- /Style - 스타일 정의

**Backend (/src)**  
- /controllers - 요청 처리
- /services - 비즈니스 로직
- /entities - DB 스키마
- /routes - API 라우팅
- /middleware - 인증 및 예외 처리


---

## 성과 및 개선점  

### 기술적 성과  
- TypeScript 적용으로 코드 안정성과 가독성 향상  
- 서비스 계층 분리로 유지보수성과 확장성 강화  
- TypeORM 트랜잭션으로 예치금 중복 차감 문제 방지  
- Socket.io로 실시간 채팅 및 상태 업데이트 기능 구현  

### 사용자 경험  
- QR 스캔을 통한 직관적 인증 흐름  
- Expo Notifications로 정시 알림 제공  
- 챌린지 참여자 간 실시간 소통 기능 구현  

---

## 품질 및 운영 (진행 및 계획)  
- **Winston + Morgan**을 사용한 요청·에러 로깅 기능 적용 중  
- **Jest**를 이용한 단위 테스트 작성 및 검증 시도 중  
- 빠른 응답성과 안정적인 인증 흐름을 목표로 개선 진행  
- GitHub Actions를 활용한 자동 배포 환경을 실험 중  
- 향후 **Nest.js 구조로 리팩토링 및 테스트 커버리지 확장 계획**

---

## 향후 개선 방향  
- 챌린지 성공률 및 사용자 참여 데이터 시각화 대시보드 추가  
- OpenTelemetry 기반 서비스 모니터링 학습 및 적용 예정  
- 모바일 푸시 알림 최적화 및 사용자 알림 이력 저장 기능 보완  


