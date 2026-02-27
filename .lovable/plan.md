

# 경북 농업 부산물 업사이클링 원료 공급 SaaS 구현 계획

## 개요
상세서.md의 디자인 토큰과 컴포넌트 규격을 기반으로, 4가지 역할(Admin, Buyer, Farmer, Logistics)을 위한 풀스택 SaaS 플랫폼을 구축합니다. Supabase를 백엔드로 사용하여 인증, 데이터베이스, 역할 기반 접근 제어를 포함합니다.

---

## Phase 1: 디자인 시스템 구축

### 1-1. 디자인 토큰 적용
- **색상 시스템**: Brand Green(Primary), Brand Blue(Info/Focus), Neutral, Semantic 색상을 CSS 변수로 정의
- **타이포그래피**: Pretendard 폰트, Display(32px)~Caption(12px) 스케일
- **간격/라운드/그림자/모션**: 4px 기반 간격, radius(8/12/16px), shadow 3단계, 120~320ms 전환

### 1-2. 커스텀 컴포넌트
- **Button**: Primary(Green)/Secondary/Tertiary/Danger 4가지 변형, sm/md/lg 크기, 로딩/disabled 상태
- **Input/Textarea**: 라벨+헬퍼+에러 연계, hover/focus/error 상태
- **Card**: KPI 카드, 원료 카드, 리스트 카드 (hover shadow, skeleton 로딩)
- **Table**: sticky 헤더, 정렬, 빈 상태/로딩/에러 처리
- **Modal/Drawer**: 모바일 bottom sheet, 포커스 트랩
- **Toast**: 좌측 컬러바 4가지 타입(success/info/warning/error)
- **Filter Chips/Badge**: pill 형태 다중 선택 필터

---

## Phase 2: 앱 셸 & 레이아웃

### 2-1. 반응형 앱 셸
- **Web (Admin/Buyer)**: 64px 상단바 + 280px 사이드바(접기 72px) + 본문 영역
- **Mobile (Farmer/Logistics)**: 56px 상단 앱바 + 56px 하단 탭바, safe-area 대응
- 브레이크포인트: 360/480/768/1024/1280/1440px

### 2-2. 역할별 네비게이션
- 로그인 후 역할에 따라 다른 사이드바 메뉴/하단 탭 표시
- Admin: 대시보드, 수거관리, 원료관리, 사용자관리, ESG리포트, 설정
- Buyer: 원료탐색, 샘플신청, 구매내역, ESG인증서
- Farmer: 수거요청, 정산확인, 내 농가정보
- Logistics: 수거일정, 배차관리, 수거완료 보고

---

## Phase 3: Supabase 백엔드

### 3-1. 인증 & 역할
- Supabase Auth 기반 로그인/회원가입
- `user_roles` 테이블로 역할 관리 (admin/buyer/farmer/logistics)
- `has_role()` Security Definer 함수로 RLS 정책 구현
- 역할별 접근 제어 (보호된 라우트)

### 3-2. 데이터베이스 테이블
- `profiles`: 사용자 프로필 (이름, 연락처, 소속 등)
- `farms`: 농가 정보 (위치, 재배작물 등)
- `materials`: 부산물/원료 목록 (품목, 수량, 상태, 위치)
- `collection_requests`: 수거 요청 (농가→플랫폼)
- `sample_requests`: 샘플 신청 (구매자→플랫폼)
- `orders`: 주문/거래 내역
- `settlements`: 정산 내역
- `esg_reports`: ESG 지표 및 리포트 데이터

---

## Phase 4: 핵심 화면 구현

### 4-1. Admin 화면 (웹)
- **대시보드**: KPI 카드(총 수거량, 거래액, 탄소감축량 등) + 차트(recharts) + 지역별 수급 현황
- **수거 관리**: 수거 요청 목록 테이블, 상태 변경, 배차 배정
- **원료 관리**: 원료 목록, 등록/수정 모달
- **사용자 관리**: 역할별 사용자 목록, 승인/권한 관리
- **ESG 리포트**: 탄소 감축량 차트, A4 PDF 내보내기용 레이아웃

### 4-2. Buyer 화면 (웹)
- **원료 탐색**: 카드형 원료 목록, 필터(품목/지역/수량), 검색
- **원료 상세**: 상세 정보 + 샘플 신청 모달
- **샘플/구매 내역**: 진행 상태 테이블
- **ESG 인증서**: 구매에 따른 탄소 감축 기여 확인

### 4-3. Farmer 화면 (모바일 우선)
- **수거 요청**: 품목 선택, 수량 입력, 사진 업로드 → bottom sheet 폼
- **요청 내역**: 카드 리스트로 진행 상태 확인
- **정산 확인**: 정산 내역 및 금액 확인

### 4-4. Logistics 화면 (모바일 우선)
- **수거 일정**: 오늘/주간 수거 일정 리스트
- **배차 확인**: 배정된 수거건 상세
- **수거 완료 보고**: 수거량 입력, 사진 촬영/업로드

---

## Phase 5: 공통 기능

### 5-1. 데이터 신뢰성
- API 지연 시 캐시 데이터 배지 + 마지막 업데이트 시각 표시
- 300ms 이내 spinner, 초과 시 skeleton 로딩
- 빈 상태: 안내 메시지 + CTA 버튼

### 5-2. 접근성
- 포커스 링(2px+4px glow), 키보드 네비게이션
- 44px 최소 터치 타깃, aria 속성 적용
- 색만으로 상태 구분 금지 (아이콘/텍스트 병행)

---

## 구현 순서 (단계별 진행)
1. **디자인 토큰 + 컴포넌트 시스템** → 기반 완성
2. **앱 셸 + 인증 + 역할 시스템** → Supabase 연동
3. **Admin 대시보드 + 관리 화면** → 핵심 기능
4. **Buyer 원료 탐색/신청** → 구매자 플로우
5. **Farmer 수거 요청** → 농가 플로우  
6. **Logistics 수거 관리** → 물류 플로우
7. **ESG 리포트 + 공통 기능** → 마무리

