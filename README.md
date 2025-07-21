# cher1sh-next-app
이 템플릿은 FSD 아키텍쳐가 적용되어 있습니다.
로그인, 회원가입, 유저 불러오기가 기본 기능으로 포함되어 있습니다. (유저 타입, 입력 필드는 서버 스펙에 맞춰주세요.)

## 주요 기능
1. 페이지 렌더링시 저장되어있는 토큰을 확인하고 토큰의 exp가 만료되었다면 재발급 후 다시 페이지를 렌더링 합니다.

2. api 프록시를 통해 요청을 중앙화 하고, 서버 스펙에 맞추어 httpOnly 쿠키의 토큰을 api route에서 꺼내어 헤더의 Authorization에 삽입합니다.

3. api 프록시에는 토큰 재발급 로직이 포함되어 있습니다.

## 설치 & 적용된 라이브러리
1. axios: Next.js API Route <-> 외부 API 서버 통신에 사용됩니다.
2. tailwindcss: 스타일링에 사용됩니다.
3. lucide-react: 다양한 아이콘을 제공합니다.
4. zustand: 전역 상태 관리에 사용됩니다.

## 유틸리티
1. CustomLink, useCustomRouter, LoadingProvider를 통해 페이지 이동시 화면 상단에 프로그레스바가 표시됩니다.
2. ToastProvider, toast.메서드("메시지")를 통해 토스트 메시지를 띄웁니다. 훅이 아니기에 SSR, CSR 모두 사용가능합니다.

## ETC
- 프리텐다드 폰트가 적용되어 있습니다.


### With npm
```bash
npx create-cher1sh-next-app
```
### With pnpm
```bash
pnpm create cher1sh-next-app
```