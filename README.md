# TodoList

Next.js와 Tailwind CSS로 만든 할 일 관리 앱입니다.

## 기술 스택

- **Next.js 14** - React 프레임워크 (App Router 사용)
- **TypeScript** - 타입 안전성
- **Tailwind CSS** - 유틸리티 퍼스트 CSS 프레임워크
- **ESLint** - 코드 품질 관리

## 시작하기

### 필수 요구사항

- Node.js 18+ 
- npm 또는 yarn

### 설치 및 실행

1. 의존성 설치:
```bash
npm install
```

2. 개발 서버 실행:
```bash
npm run dev
```

3. 브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 사용 가능한 명령어

- `npm run dev` - 개발 서버 실행
- `npm run build` - 프로덕션 빌드
- `npm run start` - 프로덕션 서버 실행
- `npm run lint` - ESLint 실행

## 프로젝트 구조

```
todolist/
├── app/                 # Next.js App Router
│   ├── layout.tsx      # 루트 레이아웃
│   ├── page.tsx        # 홈 페이지
│   └── globals.css     # 글로벌 CSS
├── package.json        # 프로젝트 설정
├── tailwind.config.js  # Tailwind 설정
├── tsconfig.json       # TypeScript 설정
└── next.config.js      # Next.js 설정
```
