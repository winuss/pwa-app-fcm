## PWA + WebPush

by, firebase

### Backend api

**API** : demo-pwa-webpush/src/app/api/

- device-token/route.ts : 구독추가 (토큰저장)
- push/route.ts : 푸시 단일 전송
- push-all/route.ts : 푸시 다중 전송

**기타**

- src/lib/firebase-admin-sdk.ts : firebase admin sdk
- src/lib/device-token-db.ts : file token data

### Front

- serviceworker : firebase-messaging-sw.js (파일명 고정)
- src/lib/firebase.ts : firebase sdk
