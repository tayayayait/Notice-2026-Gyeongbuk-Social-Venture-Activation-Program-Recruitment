# XML 예시 (상세서.md 구조)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<uiux_spec source="상세서.md" lang="ko-KR">
  <document>
    <title>UI/UX 구현 상세서 (경북 농업 부산물 업사이클링 원료 공급 SaaS)</title>
    <table index="1" name="문서 메타">
      <columns>
        <column>항목</column>
        <column>값(HEX·px·ms)</column>
        <column>사용처</column>
        <column>규칙</column>
      </columns>
      <rows>
        <row>
          <item>문서 버전</item>
          <value>v1.0</value>
          <usage>전체</usage>
          <rule>본 문서는 디자인/개발이 동일 기준으로 구현하는 UI 규격서다.</rule>
        </row>
        <row>
          <item>작성일</item>
          <value>2026-02-26</value>
          <usage>전체</usage>
          <rule>변경 시 버전/작성일을 갱신한다.</rule>
        </row>
        <row>
          <item>대상 디바이스</item>
          <value>Web(반응형), Mobile(모바일 웹/앱 WebView)</value>
          <usage>전체</usage>
          <rule>Admin/Buyer는 Web 우선, Farmer/Logistics는 Mobile 우선.</rule>
        </row>
        <row>
          <item>기본 테마</item>
          <value>Light only</value>
          <usage>전체</usage>
          <rule>다크 모드는 가정(Assumptions)에 따라 범위 밖이다.</rule>
        </row>
        <row>
          <item>디자인 키워드</item>
          <value>Trust(Blue) + Eco(Green)</value>
          <usage>전체</usage>
          <rule>Primary=Green, Info/Focus=Blue. 색만으로 상태를 구분하지 않는다.</rule>
        </row>
      </rows>
    </table>
  </document>
  <content>
    <section id="1" md_level="2">
      <title>
        <main>디자인 토큰</main>
        <paren>Design Tokens</paren>
      </title>
      <section id="1.1" md_level="3">
        <title>
          <main>색상 토큰</main>
          <paren>Color</paren>
        </title>
        <table index="2">
          <columns>
            <column>항목</column>
            <column>값(HEX·px·ms)</column>
            <column>사용처</column>
            <column>규칙</column>
          </columns>
          <rows>
            <row>
              <item>color.brand.green.50</item>
              <value>#F2FBF5</value>
              <usage>배경 틴트</usage>
              <rule>넓은 면적 배경에만 사용(텍스트 금지).</rule>
            </row>
            <row>
              <item>color.brand.green.100</item>
              <value>#DCF3E4</value>
              <usage>배경/배지</usage>
              <rule>배지 배경, 선택 영역의 약한 강조.</rule>
            </row>
            <row>
              <item>color.brand.green.600</item>
              <value>#1E7B3A</value>
              <usage>Primary</usage>
              <rule>주요 CTA(수거 요청/샘플 신청/저장). 텍스트는 #FFFFFF.</rule>
            </row>
            <row>
              <item>color.brand.green.700</item>
              <value>#186632</value>
              <usage>Primary hover/active</usage>
              <rule>hover=700, active=800 수준으로 더 진하게.</rule>
            </row>
            <row>
              <item>color.brand.green.800</item>
              <value>#145A2C</value>
              <usage>Primary active</usage>
              <rule>active에서만 사용(면적 사용 금지).</rule>
            </row>
            <row>
              <item>color.brand.blue.50</item>
              <value>#EFF6FF</value>
              <usage>정보 틴트</usage>
              <rule>정보 배너/가이드 영역 배경.</rule>
            </row>
            <row>
              <item>color.brand.blue.600</item>
              <value>#2563EB</value>
              <usage>Info/Focus</usage>
              <rule>링크/포커스 링/정보 강조. Primary 버튼 배경으로는 사용하지 않는다.</rule>
            </row>
            <row>
              <item>color.brand.blue.700</item>
              <value>#1D4ED8</value>
              <usage>Info hover/active</usage>
              <rule>링크 hover/active, 정보 버튼 active.</rule>
            </row>
            <row>
              <item>color.neutral.0</item>
              <value>#FFFFFF</value>
              <usage>Surface</usage>
              <rule>카드/모달/입력 배경 기본.</rule>
            </row>
            <row>
              <item>color.neutral.50</item>
              <value>#F7FAF8</value>
              <usage>Canvas</usage>
              <rule>앱 전체 배경(대시보드 캔버스).</rule>
            </row>
            <row>
              <item>color.neutral.100</item>
              <value>#F1F5F9</value>
              <usage>Sub-surface</usage>
              <rule>테이블 헤더/인풋 hover 배경 등.</rule>
            </row>
            <row>
              <item>color.neutral.200</item>
              <value>#E2E8F0</value>
              <usage>Border light</usage>
              <rule>구분선/테이블 라인.</rule>
            </row>
            <row>
              <item>color.neutral.300</item>
              <value>#CBD5E1</value>
              <usage>Border</usage>
              <rule>입력 기본 보더, 비활성 경계.</rule>
            </row>
            <row>
              <item>color.neutral.600</item>
              <value>#475569</value>
              <usage>Text muted</usage>
              <rule>보조 텍스트(설명/메타). #64748B 이하 사용 금지(가독성).</rule>
            </row>
            <row>
              <item>color.neutral.900</item>
              <value>#0F172A</value>
              <usage>Text strong</usage>
              <rule>본문/제목 기본.</rule>
            </row>
            <row>
              <item>color.semantic.success.600</item>
              <value>#16A34A</value>
              <usage>성공</usage>
              <rule>완료/승인/정상 상태. brand.green과 혼용 시 의미를 우선한다.</rule>
            </row>
            <row>
              <item>color.semantic.warning.600</item>
              <value>#D97706</value>
              <usage>경고</usage>
              <rule>주의/확인 필요. 텍스트는 #0F172A 우선.</rule>
            </row>
            <row>
              <item>color.semantic.danger.600</item>
              <value>#DC2626</value>
              <usage>위험/삭제</usage>
              <rule>오류/삭제/거절. Primary를 대체하지 않는다.</rule>
            </row>
            <row>
              <item>color.semantic.info.600</item>
              <value>#2563EB</value>
              <usage>정보</usage>
              <rule>안내/참고. brand.blue.600과 동일 값으로 둔다.</rule>
            </row>
            <row>
              <item>color.state.focus.ring</item>
              <value>#2563EB</value>
              <usage>포커스 링</usage>
              <rule>2px 내부 링 + 4px 외곽 글로우를 사용한다(아래 컴포넌트 규격 참고).</rule>
            </row>
            <row>
              <item>color.state.overlay.scrim</item>
              <value>#0F172A66</value>
              <usage>모달/드로어 오버레이</usage>
              <rule>오버레이는 최소 40% 불투명도(66)로 본문 대비 확보.</rule>
            </row>
            <row>
              <item>color.state.disabled.fg</item>
              <value>#94A3B8</value>
              <usage>disabled 텍스트</usage>
              <rule>disabled는 대비를 유지하되(배경과 구분) 정보 전달 텍스트는 금지.</rule>
            </row>
            <row>
              <item>color.state.disabled.bg</item>
              <value>#F1F5F9</value>
              <usage>disabled 배경</usage>
              <rule>disabled는 cursor: not-allowed 적용.</rule>
            </row>
            <row>
              <item>color.state.error.bg</item>
              <value>#FEF2F2</value>
              <usage>오류 배경</usage>
              <rule>인풋/배너 error 틴트.</rule>
            </row>
            <row>
              <item>color.state.error.border</item>
              <value>#FCA5A5</value>
              <usage>오류 보더</usage>
              <rule>인풋 error 보더.</rule>
            </row>
            <row>
              <item>color.state.error.fg</item>
              <value>#B91C1C</value>
              <usage>오류 텍스트</usage>
              <rule>에러 메시지/아이콘.</rule>
            </row>
          </rows>
        </table>
      </section>
      <section id="1.2" md_level="3">
        <title>
          <main>데이터 시각화 토큰</main>
          <paren>Chart/Map</paren>
        </title>
        <table index="3">
          <columns>
            <column>항목</column>
            <column>값(HEX·px·ms)</column>
            <column>사용처</column>
            <column>규칙</column>
          </columns>
          <rows>
            <row>
              <item>color.chart.series.1</item>
              <value>#1E7B3A</value>
              <usage>시리즈 1</usage>
              <rule>동일 의미는 동일 색을 유지한다(필터 변경에도 색 고정).</rule>
            </row>
            <row>
              <item>color.chart.series.2</item>
              <value>#2563EB</value>
              <usage>시리즈 2</usage>
              <rule>시리즈는 최대 6개 권장, 8개 초과 시 패턴/마커를 추가한다.</rule>
            </row>
            <row>
              <item>color.chart.series.3</item>
              <value>#0F766E</value>
              <usage>시리즈 3</usage>
              <rule>색만으로 구분하지 말고 범례/라벨을 항상 제공한다.</rule>
            </row>
            <row>
              <item>color.chart.series.4</item>
              <value>#D97706</value>
              <usage>시리즈 4</usage>
              <rule>경고색(amber)은 시리즈에 쓸 수 있으나 오류 의미로 쓰지 않는다.</rule>
            </row>
            <row>
              <item>color.chart.series.5</item>
              <value>#DC2626</value>
              <usage>시리즈 5</usage>
              <rule>빨강은 "감소/위험" 의미가 섞이지 않도록 범례 문구를 명확히.</rule>
            </row>
            <row>
              <item>color.chart.series.6</item>
              <value>#475569</value>
              <usage>시리즈 6</usage>
              <rule>비교 기준/기준선에 주로 사용.</rule>
            </row>
            <row>
              <item>color.chart.gridline</item>
              <value>#E2E8F0</value>
              <usage>그리드 라인</usage>
              <rule>1px, 과도한 강조 금지.</rule>
            </row>
            <row>
              <item>color.chart.axis</item>
              <value>#94A3B8</value>
              <usage>축/틱</usage>
              <rule>축 라벨은 최소 12px 이상.</rule>
            </row>
            <row>
              <item>color.chart.tooltip.bg</item>
              <value>#0F172AE6</value>
              <usage>툴팁 배경</usage>
              <rule>90% 불투명( E6 ), 텍스트 #FFFFFF.</rule>
            </row>
            <row>
              <item>color.map.pin.available</item>
              <value>#1E7B3A</value>
              <usage>수거 가능 핀</usage>
              <rule>지도 핀은 최소 24px, 선택 시 32px로 확대.</rule>
            </row>
            <row>
              <item>color.map.pin.scheduled</item>
              <value>#2563EB</value>
              <usage>예정 핀</usage>
              <rule>예정/예약 상태.</rule>
            </row>
            <row>
              <item>color.map.pin.limited</item>
              <value>#D97706</value>
              <usage>제한 핀</usage>
              <rule>물량 부족/시간 제한.</rule>
            </row>
            <row>
              <item>color.map.pin.blocked</item>
              <value>#DC2626</value>
              <usage>불가 핀</usage>
              <rule>법적/행정 불가.</rule>
            </row>
          </rows>
        </table>
      </section>
      <section id="1.3" md_level="3">
        <title>
          <main>타이포그래피 토큰</main>
          <paren>Typography</paren>
        </title>
        <table index="4">
          <columns>
            <column>항목</column>
            <column>값(HEX·px·ms)</column>
            <column>사용처</column>
            <column>규칙</column>
          </columns>
          <rows>
            <row>
              <item>font.family.base</item>
              <value>Pretendard, "Noto Sans KR", system-ui, -apple-system, "Segoe UI", sans-serif</value>
              <usage>전체</usage>
              <rule>한글 가독성 우선. 숫자/단위가 많으므로 자간 과도한 폰트 금지.</rule>
            </row>
            <row>
              <item>font.family.mono</item>
              <value>ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace</value>
              <usage>코드/ID</usage>
              <rule>API 키/식별자/수치 표기.</rule>
            </row>
            <row>
              <item>font.weight.regular</item>
              <value>400</value>
              <usage>본문</usage>
              <rule>본문 기본.</rule>
            </row>
            <row>
              <item>font.weight.medium</item>
              <value>500</value>
              <usage>라벨/버튼</usage>
              <rule>버튼/탭/필터 칩.</rule>
            </row>
            <row>
              <item>font.weight.semibold</item>
              <value>600</value>
              <usage>섹션 타이틀</usage>
              <rule>카드 타이틀/테이블 헤더.</rule>
            </row>
            <row>
              <item>font.size.display</item>
              <value>32px</value>
              <usage>대시보드 핵심 수치</usage>
              <rule>모바일에서는 28px로 다운.</rule>
            </row>
            <row>
              <item>font.size.h1</item>
              <value>24px</value>
              <usage>페이지 타이틀</usage>
              <rule>Web 기본.</rule>
            </row>
            <row>
              <item>font.size.h2</item>
              <value>20px</value>
              <usage>섹션 타이틀</usage>
              <rule>카드 그룹/모듈 타이틀.</rule>
            </row>
            <row>
              <item>font.size.h3</item>
              <value>18px</value>
              <usage>카드 타이틀</usage>
              <rule>KPI 카드, 패널 제목.</rule>
            </row>
            <row>
              <item>font.size.body</item>
              <value>16px</value>
              <usage>본문</usage>
              <rule>모바일 최소 16px(축소 금지).</rule>
            </row>
            <row>
              <item>font.size.body2</item>
              <value>14px</value>
              <usage>보조 본문</usage>
              <rule>테이블/필터/헬퍼 텍스트.</rule>
            </row>
            <row>
              <item>font.size.caption</item>
              <value>12px</value>
              <usage>캡션/메타</usage>
              <rule>타임스탬프/단위.</rule>
            </row>
            <row>
              <item>line.height.tight</item>
              <value>1.25</value>
              <usage>제목</usage>
              <rule>헤딩용.</rule>
            </row>
            <row>
              <item>line.height.base</item>
              <value>1.5</value>
              <usage>본문</usage>
              <rule>기본 본문.</rule>
            </row>
            <row>
              <item>line.height.relaxed</item>
              <value>1.75</value>
              <usage>긴 설명</usage>
              <rule>도움말/가이드.</rule>
            </row>
            <row>
              <item>text.maxLineLength</item>
              <value>72ch</value>
              <usage>긴 문단</usage>
              <rule>설명 문단은 72ch 초과 금지(가독성).</rule>
            </row>
          </rows>
        </table>
      </section>
      <section id="1.4" md_level="3">
        <title>
          <main>간격 토큰</main>
          <paren>Spacing, 4px 기반</paren>
        </title>
        <table index="5">
          <columns>
            <column>항목</column>
            <column>값(HEX·px·ms)</column>
            <column>사용처</column>
            <column>규칙</column>
          </columns>
          <rows>
            <row>
              <item>space.0</item>
              <value>0px</value>
              <usage>리셋</usage>
              <rule>예외적으로만 사용.</rule>
            </row>
            <row>
              <item>space.1</item>
              <value>4px</value>
              <usage>아이콘-텍스트 간격</usage>
              <rule>가장 작은 간격.</rule>
            </row>
            <row>
              <item>space.2</item>
              <value>8px</value>
              <usage>폼 요소 간격</usage>
              <rule>라벨-필드, 칩 내부 여백 등.</rule>
            </row>
            <row>
              <item>space.3</item>
              <value>12px</value>
              <usage>카드 내부 보조 간격</usage>
              <rule>본문/보조텍스트 분리.</rule>
            </row>
            <row>
              <item>space.4</item>
              <value>16px</value>
              <usage>기본 패딩</usage>
              <rule>카드/패널 기본 padding.</rule>
            </row>
            <row>
              <item>space.5</item>
              <value>20px</value>
              <usage>섹션 간격</usage>
              <rule>필터 바-컨텐츠.</rule>
            </row>
            <row>
              <item>space.6</item>
              <value>24px</value>
              <usage>섹션 패딩</usage>
              <rule>페이지 섹션 여백.</rule>
            </row>
            <row>
              <item>space.8</item>
              <value>32px</value>
              <usage>큰 구획 분리</usage>
              <rule>대시보드 행 간격.</rule>
            </row>
            <row>
              <item>space.10</item>
              <value>40px</value>
              <usage>페이지 상하 여백</usage>
              <rule>Web에서 섹션 시작/끝.</rule>
            </row>
            <row>
              <item>space.12</item>
              <value>48px</value>
              <usage>헤더-본문 분리</usage>
              <rule>큰 타이틀 아래.</rule>
            </row>
            <row>
              <item>space.16</item>
              <value>64px</value>
              <usage>랜딩/공백</usage>
              <rule>과도 사용 금지(정보 밀도 유지).</rule>
            </row>
          </rows>
        </table>
      </section>
      <section id="1.5" md_level="3">
        <title>
          <main>라운드/테두리 토큰</main>
          <paren>Radius/Border</paren>
        </title>
        <table index="6">
          <columns>
            <column>항목</column>
            <column>값(HEX·px·ms)</column>
            <column>사용처</column>
            <column>규칙</column>
          </columns>
          <rows>
            <row>
              <item>radius.sm</item>
              <value>8px</value>
              <usage>입력/버튼</usage>
              <rule>컨트롤 기본.</rule>
            </row>
            <row>
              <item>radius.md</item>
              <value>12px</value>
              <usage>카드/모달</usage>
              <rule>패널류 기본.</rule>
            </row>
            <row>
              <item>radius.lg</item>
              <value>16px</value>
              <usage>드로어/대형 패널</usage>
              <rule>모바일 풀시트에서 사용.</rule>
            </row>
            <row>
              <item>radius.full</item>
              <value>9999px</value>
              <usage>칩/배지</usage>
              <rule>pill 형태.</rule>
            </row>
            <row>
              <item>border.width.1</item>
              <value>1px</value>
              <usage>기본 보더</usage>
              <rule>테이블/입력/카드.</rule>
            </row>
            <row>
              <item>border.width.2</item>
              <value>2px</value>
              <usage>포커스/강조</usage>
              <rule>focus 링 내부 라인.</rule>
            </row>
          </rows>
        </table>
      </section>
      <section id="1.6" md_level="3">
        <title>
          <main>그림자 토큰</main>
          <paren>Shadow</paren>
        </title>
        <table index="7">
          <columns>
            <column>항목</column>
            <column>값(HEX·px·ms)</column>
            <column>사용처</column>
            <column>규칙</column>
          </columns>
          <rows>
            <row>
              <item>shadow.1</item>
              <value>0 1px 2px #0F172A14</value>
              <usage>카드 기본</usage>
              <rule>배경과 구분만 제공(과장 금지).</rule>
            </row>
            <row>
              <item>shadow.2</item>
              <value>0 6px 16px #0F172A1F</value>
              <usage>hover/팝오버</usage>
              <rule>hover 시에만 강화.</rule>
            </row>
            <row>
              <item>shadow.3</item>
              <value>0 16px 40px #0F172A2E</value>
              <usage>모달</usage>
              <rule>오버레이와 함께 사용.</rule>
            </row>
            <row>
              <item>focus.ring</item>
              <value>0 0 0 4px #2563EB38</value>
              <usage>포커스 글로우</usage>
              <rule>prefers-reduced-motion과 무관(접근성).</rule>
            </row>
          </rows>
        </table>
      </section>
      <section id="1.7" md_level="3">
        <title>
          <main>모션 토큰</main>
          <paren>Motion</paren>
        </title>
        <table index="8">
          <columns>
            <column>항목</column>
            <column>값(HEX·px·ms)</column>
            <column>사용처</column>
            <column>규칙</column>
          </columns>
          <rows>
            <row>
              <item>motion.duration.fast</item>
              <value>120ms</value>
              <usage>hover 색 변화</usage>
              <rule>색/보더 변화 기본.</rule>
            </row>
            <row>
              <item>motion.duration.base</item>
              <value>200ms</value>
              <usage>모달/드로어</usage>
              <rule>오픈/클로즈, 패널 전환.</rule>
            </row>
            <row>
              <item>motion.duration.slow</item>
              <value>320ms</value>
              <usage>페이지 전환</usage>
              <rule>과한 애니메이션 금지.</rule>
            </row>
            <row>
              <item>motion.easing.standard</item>
              <value>cubic-bezier(0.2,0,0,1)</value>
              <usage>대부분</usage>
              <rule>transform/opacity에 사용.</rule>
            </row>
            <row>
              <item>motion.easing.emphasis</item>
              <value>cubic-bezier(0.2,0,0,0.6)</value>
              <usage>오버레이</usage>
              <rule>시작이 빠르고 끝이 부드럽게.</rule>
            </row>
            <row>
              <item>motion.reduce</item>
              <value>0ms</value>
              <usage>접근성</usage>
              <rule>prefers-reduced-motion: reduce 시 transform 애니메이션 제거.</rule>
            </row>
          </rows>
        </table>
      </section>
      <section id="1.8" md_level="3">
        <title>
          <main>Z-index 토큰</main>
          <paren>Z</paren>
        </title>
        <table index="9">
          <columns>
            <column>항목</column>
            <column>값(HEX·px·ms)</column>
            <column>사용처</column>
            <column>규칙</column>
          </columns>
          <rows>
            <row>
              <item>z.base</item>
              <value>0</value>
              <usage>기본</usage>
              <rule>일반 컨텐츠.</rule>
            </row>
            <row>
              <item>z.sticky</item>
              <value>30</value>
              <usage>상단바/필터바</usage>
              <rule>스크롤 시 고정.</rule>
            </row>
            <row>
              <item>z.dropdown</item>
              <value>40</value>
              <usage>셀렉트/메뉴</usage>
              <rule>sticky보다 위.</rule>
            </row>
            <row>
              <item>z.overlay</item>
              <value>50</value>
              <usage>오버레이</usage>
              <rule>모달/드로어 배경.</rule>
            </row>
            <row>
              <item>z.modal</item>
              <value>60</value>
              <usage>모달/드로어</usage>
              <rule>overlay 위.</rule>
            </row>
            <row>
              <item>z.toast</item>
              <value>70</value>
              <usage>토스트</usage>
              <rule>가장 위(툴팁 제외).</rule>
            </row>
            <row>
              <item>z.tooltip</item>
              <value>80</value>
              <usage>툴팁</usage>
              <rule>토스트 위, 단 과다 사용 금지.</rule>
            </row>
          </rows>
        </table>
      </section>
    </section>
    <section id="2" md_level="2">
      <title>
        <main>레이아웃</main>
        <paren>Layout</paren>
      </title>
      <section id="2.1" md_level="3">
        <title>
          <main>브레이크포인트</main>
          <paren>Breakpoints</paren>
        </title>
        <table index="10">
          <columns>
            <column>항목</column>
            <column>값(HEX·px·ms)</column>
            <column>사용처</column>
            <column>규칙</column>
          </columns>
          <rows>
            <row>
              <item>bp.xs</item>
              <value>360px</value>
              <usage>소형 모바일</usage>
              <rule>최저 기준(가로 스크롤 금지).</rule>
            </row>
            <row>
              <item>bp.sm</item>
              <value>480px</value>
              <usage>모바일</usage>
              <rule>폼/카드 1열.</rule>
            </row>
            <row>
              <item>bp.md</item>
              <value>768px</value>
              <usage>태블릿</usage>
              <rule>2열 카드/8컬럼 그리드.</rule>
            </row>
            <row>
              <item>bp.lg</item>
              <value>1024px</value>
              <usage>데스크톱</usage>
              <rule>사이드바+본문 12컬럼.</rule>
            </row>
            <row>
              <item>bp.xl</item>
              <value>1280px</value>
              <usage>대형 데스크톱</usage>
              <rule>컨테이너 최대폭 적용.</rule>
            </row>
            <row>
              <item>bp.2xl</item>
              <value>1440px</value>
              <usage>와이드</usage>
              <rule>여백 확장, 정보 밀도 유지.</rule>
            </row>
          </rows>
        </table>
      </section>
      <section id="2.2" md_level="3">
        <title>
          <main>컨테이너/그리드</main>
          <paren>Container/Grid</paren>
        </title>
        <table index="11">
          <columns>
            <column>항목</column>
            <column>값(HEX·px·ms)</column>
            <column>사용처</column>
            <column>규칙</column>
          </columns>
          <rows>
            <row>
              <item>container.maxWidth</item>
              <value>1200px</value>
              <usage>Web 본문</usage>
              <rule>1280px 이상에서도 본문은 1200px로 제한(가독성).</rule>
            </row>
            <row>
              <item>container.padding.mobile</item>
              <value>16px</value>
              <usage>Mobile</usage>
              <rule>좌우 패딩 고정.</rule>
            </row>
            <row>
              <item>container.padding.desktop</item>
              <value>24px</value>
              <usage>Web</usage>
              <rule>1024px 이상.</rule>
            </row>
            <row>
              <item>grid.columns.mobile</item>
              <value>4</value>
              <usage>Mobile</usage>
              <rule>카드/폼은 4컬럼 기준 배치.</rule>
            </row>
            <row>
              <item>grid.columns.tablet</item>
              <value>8</value>
              <usage>Tablet</usage>
              <rule>8컬럼.</rule>
            </row>
            <row>
              <item>grid.columns.desktop</item>
              <value>12</value>
              <usage>Web</usage>
              <rule>12컬럼.</rule>
            </row>
            <row>
              <item>grid.gutter.mobile</item>
              <value>16px</value>
              <usage>Mobile</usage>
              <rule>거터 고정.</rule>
            </row>
            <row>
              <item>grid.gutter.desktop</item>
              <value>24px</value>
              <usage>Web</usage>
              <rule>거터 고정.</rule>
            </row>
            <row>
              <item>section.gap</item>
              <value>24px</value>
              <usage>섹션 간격</usage>
              <rule>대시보드 패널 간 기본 간격.</rule>
            </row>
            <row>
              <item>card.minWidth</item>
              <value>280px</value>
              <usage>카드 레이아웃</usage>
              <rule>카드가 280px 미만이면 자동 1열로.</rule>
            </row>
          </rows>
        </table>
      </section>
      <section id="2.3" md_level="3">
        <title>
          <main>앱 셸</main>
          <paren>App Shell</paren>
        </title>
        <table index="12">
          <columns>
            <column>항목</column>
            <column>값(HEX·px·ms)</column>
            <column>사용처</column>
            <column>규칙</column>
          </columns>
          <rows>
            <row>
              <item>topbar.height.web</item>
              <value>64px</value>
              <usage>Admin/Buyer</usage>
              <rule>고정(sticky). 왼쪽 로고, 중앙 검색(옵션), 오른쪽 유틸.</rule>
            </row>
            <row>
              <item>sidebar.width.expanded</item>
              <value>280px</value>
              <usage>Admin/Buyer</usage>
              <rule>데스크톱 기본.</rule>
            </row>
            <row>
              <item>sidebar.width.collapsed</item>
              <value>72px</value>
              <usage>Admin/Buyer</usage>
              <rule>아이콘만, 툴팁 필수.</rule>
            </row>
            <row>
              <item>sidebar.item.height</item>
              <value>44px</value>
              <usage>Admin/Buyer</usage>
              <rule>클릭 타깃 44px 이상.</rule>
            </row>
            <row>
              <item>bottombar.height.mobile</item>
              <value>56px</value>
              <usage>Farmer/Logistics</usage>
              <rule>모바일 하단 탭. 안전 영역(safe-area) 추가 패딩.</rule>
            </row>
            <row>
              <item>appbar.height.mobile</item>
              <value>56px</value>
              <usage>Farmer/Logistics</usage>
              <rule>상단 앱바. 뒤로/제목/액션.</rule>
            </row>
            <row>
              <item>page.title.marginBottom</item>
              <value>16px</value>
              <usage>Web</usage>
              <rule>페이지 타이틀 아래 여백.</rule>
            </row>
          </rows>
        </table>
      </section>
      <section id="2.4" md_level="3">
        <title>
          <main>스크롤/고정 규칙</main>
          <paren>Scroll/Sticky</paren>
        </title>
        <table index="13">
          <columns>
            <column>항목</column>
            <column>값(HEX·px·ms)</column>
            <column>사용처</column>
            <column>규칙</column>
          </columns>
          <rows>
            <row>
              <item>scroll.body</item>
              <value>1</value>
              <usage>전체</usage>
              <rule>기본은 body 스크롤 1개만 사용(이중 스크롤 금지).</rule>
            </row>
            <row>
              <item>sticky.topbar</item>
              <value>z=30</value>
              <usage>Web</usage>
              <rule>Topbar는 항상 상단 고정.</rule>
            </row>
            <row>
              <item>sticky.filters</item>
              <value>top=64px</value>
              <usage>Web</usage>
              <rule>테이블/리스트 상단 필터는 Topbar 아래에 sticky.</rule>
            </row>
            <row>
              <item>table.scrollRegion.maxHeight</item>
              <value>70vh</value>
              <usage>Web</usage>
              <rule>대형 테이블은 내부 스크롤 + 헤더 sticky.</rule>
            </row>
            <row>
              <item>modal.body.scroll</item>
              <value>auto</value>
              <usage>모달</usage>
              <rule>모달 컨텐츠가 길면 본문만 스크롤, 헤더/푸터 고정.</rule>
            </row>
            <row>
              <item>mobile.safeArea</item>
              <value>env(safe-area-inset-*)</value>
              <usage>Mobile</usage>
              <rule>하단 탭/버튼이 제스처 영역과 겹치지 않게.</rule>
            </row>
          </rows>
        </table>
      </section>
    </section>
    <section id="3" md_level="2">
      <title>
        <main>컴포넌트 규격</main>
        <paren>Components</paren>
      </title>
      <section id="3.0" md_level="3">
        <title>
          <main>공통 상호작용 규칙</main>
          <paren>All Interactive</paren>
        </title>
        <table index="14">
          <columns>
            <column>항목</column>
            <column>값(HEX·px·ms)</column>
            <column>사용처</column>
            <column>규칙</column>
          </columns>
          <rows>
            <row>
              <item>hitTarget.min</item>
              <value>44x44px</value>
              <usage>Mobile 우선</usage>
              <rule>아이콘 버튼/체크박스 포함 최소 터치 타깃.</rule>
            </row>
            <row>
              <item>focus.ring.inner</item>
              <value>2px #2563EB</value>
              <usage>전체</usage>
              <rule>키보드 포커스 시 내부 라인.</rule>
            </row>
            <row>
              <item>focus.ring.outer</item>
              <value>4px #2563EB38</value>
              <usage>전체</usage>
              <rule>외곽 글로우(그림자 토큰).</rule>
            </row>
            <row>
              <item>transition.colors</item>
              <value>120ms standard</value>
              <usage>전체</usage>
              <rule>hover/active 색 전환은 120ms.</rule>
            </row>
            <row>
              <item>transition.transform</item>
              <value>200ms standard</value>
              <usage>카드/드로어</usage>
              <rule>레이아웃을 흔드는 scale 애니메이션 금지(필요 시 1.01 이하).</rule>
            </row>
            <row>
              <item>cursor.interactive</item>
              <value>pointer</value>
              <usage>Web</usage>
              <rule>클릭 가능한 카드/행/아이콘 버튼에 반드시 적용.</rule>
            </row>
            <row>
              <item>disabled.opacity</item>
              <value>0.55</value>
              <usage>전체</usage>
              <rule>disabled는 불투명도+색상으로 구분, 클릭 이벤트 차단.</rule>
            </row>
            <row>
              <item>loading.pattern</item>
              <value>Skeleton/Spinner</value>
              <usage>전체</usage>
              <rule>400ms 이상 지연이면 skeleton, 짧으면 spinner.</rule>
            </row>
            <row>
              <item>error.messaging</item>
              <value>필드 하단 1줄</value>
              <usage>폼</usage>
              <rule>에러는 필드 바로 아래, 해결 행동을 포함(예: "숫자만 입력").</rule>
            </row>
          </rows>
        </table>
      </section>
      <section id="3.1" md_level="3">
        <title>
          <main>Button</main>
        </title>
        <section id="3.1.1" md_level="4">
          <title>
            <main>버튼 크기</main>
            <paren>Size</paren>
          </title>
          <table index="15">
            <columns>
              <column>항목</column>
              <column>값(HEX·px·ms)</column>
              <column>사용처</column>
              <column>규칙</column>
            </columns>
            <rows>
              <row>
                <item>button.height.sm</item>
                <value>32px</value>
                <usage>테이블 내 액션</usage>
                <rule>아이콘+텍스트 가능(아이콘 16px).</rule>
              </row>
              <row>
                <item>button.height.md</item>
                <value>40px</value>
                <usage>기본</usage>
                <rule>Web 기본.</rule>
              </row>
              <row>
                <item>button.height.lg</item>
                <value>48px</value>
                <usage>주요 CTA/모바일</usage>
                <rule>Mobile 기본.</rule>
              </row>
              <row>
                <item>button.paddingX.sm</item>
                <value>12px</value>
                <usage>sm</usage>
                <rule>텍스트 1~2단어 기준.</rule>
              </row>
              <row>
                <item>button.paddingX.md</item>
                <value>16px</value>
                <usage>md</usage>
                <rule>기본.</rule>
              </row>
              <row>
                <item>button.paddingX.lg</item>
                <value>18px</value>
                <usage>lg</usage>
                <rule>모바일 엄지 도달 고려.</rule>
              </row>
              <row>
                <item>button.gap</item>
                <value>8px</value>
                <usage>아이콘+텍스트</usage>
                <rule>아이콘-텍스트 간격.</rule>
              </row>
              <row>
                <item>button.radius</item>
                <value>8px</value>
                <usage>전체</usage>
                <rule>radius.sm 고정.</rule>
              </row>
              <row>
                <item>button.iconOnly.size</item>
                <value>40px</value>
                <usage>아이콘 버튼</usage>
                <rule>최소 40px, Mobile은 44px 권장.</rule>
              </row>
            </rows>
          </table>
        </section>
        <section id="3.1.2" md_level="4">
          <title>
            <main>버튼 상태/변형</main>
            <paren>Variants + States</paren>
          </title>
          <table index="16">
            <columns>
              <column>항목</column>
              <column>값(HEX·px·ms)</column>
              <column>사용처</column>
              <column>규칙</column>
            </columns>
            <rows>
              <row>
                <item>button.primary.default</item>
                <value>bg #1E7B3A / fg #FFFFFF / border 0</value>
                <usage>주요 CTA</usage>
                <rule>텍스트는 동사형(예: "샘플 신청").</rule>
              </row>
              <row>
                <item>button.primary.hover</item>
                <value>bg #186632</value>
                <usage>Web hover</usage>
                <rule>hover는 색만 변화(크기 변화 금지).</rule>
              </row>
              <row>
                <item>button.primary.active</item>
                <value>bg #145A2C</value>
                <usage>press</usage>
                <rule>active는 150ms 이내 복귀.</rule>
              </row>
              <row>
                <item>button.primary.focus</item>
                <value>ring 2px #2563EB + outer 4px glow</value>
                <usage>키보드</usage>
                <rule>포커스는 색만으로 구분하지 않도록 링 필수.</rule>
              </row>
              <row>
                <item>button.primary.disabled</item>
                <value>bg #F1F5F9 / fg #94A3B8</value>
                <usage>비활성</usage>
                <rule>클릭 불가 + not-allowed.</rule>
              </row>
              <row>
                <item>button.primary.loading</item>
                <value>spinner 16px / text "처리 중"</value>
                <usage>비동기</usage>
                <rule>로딩 중 중복 클릭 방지(자동 disabled).</rule>
              </row>
              <row>
                <item>button.primary.error</item>
                <value>bg #DC2626 / fg #FFFFFF</value>
                <usage>위험 행동</usage>
                <rule>삭제/거절처럼 되돌리기 어려운 작업에만 사용.</rule>
              </row>
              <row>
                <item>button.secondary.default</item>
                <value>bg #FFFFFF / fg #186632 / border 1px #CBD5E1</value>
                <usage>보조 CTA</usage>
                <rule>기본은 흰 배경, Primary와 동등한 의미 금지.</rule>
              </row>
              <row>
                <item>button.secondary.hover</item>
                <value>bg #F2FBF5 / border #1E7B3A</value>
                <usage>hover</usage>
                <rule>틴트는 brand.green.50 사용.</rule>
              </row>
              <row>
                <item>button.secondary.active</item>
                <value>bg #DCF3E4</value>
                <usage>active</usage>
                <rule>눌림 느낌은 색/보더로만.</rule>
              </row>
              <row>
                <item>button.secondary.focus</item>
                <value>ring 동일</value>
                <usage>키보드</usage>
                <rule>Primary와 동일 규칙.</rule>
              </row>
              <row>
                <item>button.secondary.disabled</item>
                <value>bg #F1F5F9 / fg #94A3B8 / border #E2E8F0</value>
                <usage>비활성</usage>
                <rule>대비가 지나치게 낮아지지 않게.</rule>
              </row>
              <row>
                <item>button.secondary.loading</item>
                <value>spinner 16px</value>
                <usage>비동기</usage>
                <rule>텍스트/아이콘은 유지, spinner는 왼쪽.</rule>
              </row>
              <row>
                <item>button.secondary.error</item>
                <value>fg #B91C1C / border #FCA5A5</value>
                <usage>오류/취소</usage>
                <rule>"취소"는 secondary로, "삭제"는 danger로.</rule>
              </row>
              <row>
                <item>button.tertiary.default</item>
                <value>bg transparent / fg #2563EB</value>
                <usage>링크형 버튼</usage>
                <rule>텍스트 링크와 구분: padding 유지(버튼 형태).</rule>
              </row>
              <row>
                <item>button.tertiary.hover</item>
                <value>bg #EFF6FF</value>
                <usage>hover</usage>
                <rule>배경 틴트만.</rule>
              </row>
              <row>
                <item>button.tertiary.active</item>
                <value>bg #DBEAFE</value>
                <usage>active</usage>
                <rule>진해짐.</rule>
              </row>
              <row>
                <item>button.tertiary.focus</item>
                <value>ring 동일</value>
                <usage>키보드</usage>
                <rule>링 필수.</rule>
              </row>
              <row>
                <item>button.tertiary.disabled</item>
                <value>fg #94A3B8</value>
                <usage>비활성</usage>
                <rule>underline 금지.</rule>
              </row>
              <row>
                <item>button.tertiary.loading</item>
                <value>spinner 16px</value>
                <usage>비동기</usage>
                <rule>레이아웃 점프 금지(폭 고정).</rule>
              </row>
              <row>
                <item>button.tertiary.error</item>
                <value>fg #B91C1C</value>
                <usage>오류</usage>
                <rule>파괴적 행동에는 tertiary 사용 금지.</rule>
              </row>
              <row>
                <item>button.danger.default</item>
                <value>bg #DC2626 / fg #FFFFFF</value>
                <usage>삭제/거절</usage>
                <rule>2차 확인(모달)과 함께 사용.</rule>
              </row>
              <row>
                <item>button.danger.hover</item>
                <value>bg #B91C1C</value>
                <usage>hover</usage>
                <rule>더 진하게.</rule>
              </row>
              <row>
                <item>button.danger.active</item>
                <value>bg #991B1B</value>
                <usage>active</usage>
                <rule>active는 짧게.</rule>
              </row>
              <row>
                <item>button.danger.focus</item>
                <value>ring 동일</value>
                <usage>키보드</usage>
                <rule>링 유지.</rule>
              </row>
              <row>
                <item>button.danger.disabled</item>
                <value>bg #F1F5F9 / fg #94A3B8</value>
                <usage>비활성</usage>
                <rule>위험 행동 disabled는 이유 툴팁 제공.</rule>
              </row>
              <row>
                <item>button.danger.loading</item>
                <value>spinner 16px</value>
                <usage>비동기</usage>
                <rule>로딩 중 취소 버튼 제공.</rule>
              </row>
              <row>
                <item>button.danger.error</item>
                <value>bg #B91C1C / fg #FFFFFF</value>
                <usage>오류</usage>
                <rule>동일(에러 상태는 보통 토스트/배너로 처리).</rule>
              </row>
            </rows>
          </table>
        </section>
      </section>
      <section id="3.2" md_level="3">
        <title>
          <main>Input</main>
          <paren>Text/Number/Search/Select 공통</paren>
        </title>
        <section id="3.2.1" md_level="4">
          <title>
            <main>입력 규격</main>
            <paren>Base</paren>
          </title>
          <table index="17">
            <columns>
              <column>항목</column>
              <column>값(HEX·px·ms)</column>
              <column>사용처</column>
              <column>규칙</column>
            </columns>
            <rows>
              <row>
                <item>input.height.md</item>
                <value>40px</value>
                <usage>Web 기본</usage>
                <rule>기본 높이.</rule>
              </row>
              <row>
                <item>input.height.lg</item>
                <value>48px</value>
                <usage>Mobile</usage>
                <rule>터치 타깃 확보.</rule>
              </row>
              <row>
                <item>input.paddingX</item>
                <value>12px</value>
                <usage>전체</usage>
                <rule>좌우 패딩 고정.</rule>
              </row>
              <row>
                <item>input.paddingY</item>
                <value>10px</value>
                <usage>md 기준</usage>
                <rule>높이에 맞춰 중앙 정렬.</rule>
              </row>
              <row>
                <item>input.radius</item>
                <value>8px</value>
                <usage>전체</usage>
                <rule>radius.sm.</rule>
              </row>
              <row>
                <item>input.border</item>
                <value>1px #CBD5E1</value>
                <usage>default</usage>
                <rule>기본 보더.</rule>
              </row>
              <row>
                <item>input.bg</item>
                <value>#FFFFFF</value>
                <usage>default</usage>
                <rule>hover 시 #F1F5F9.</rule>
              </row>
              <row>
                <item>input.text</item>
                <value>16px / #0F172A</value>
                <usage>본문</usage>
                <rule>숫자/단위가 많으므로 최소 16px.</rule>
              </row>
              <row>
                <item>input.placeholder</item>
                <value>#94A3B8</value>
                <usage>플레이스홀더</usage>
                <rule>플레이스홀더는 라벨을 대체하지 않는다.</rule>
              </row>
              <row>
                <item>input.label</item>
                <value>14px / #334155</value>
                <usage>라벨</usage>
                <rule>label 필수(상단).</rule>
              </row>
              <row>
                <item>input.helper</item>
                <value>12px / #475569</value>
                <usage>도움말</usage>
                <rule>필요 시 1줄만.</rule>
              </row>
              <row>
                <item>input.errorText</item>
                <value>12px / #B91C1C</value>
                <usage>오류</usage>
                <rule>해결 행동 포함 문장.</rule>
              </row>
            </rows>
          </table>
        </section>
        <section id="3.2.2" md_level="4">
          <title>
            <main>입력 상태</main>
            <paren>States</paren>
          </title>
          <table index="18">
            <columns>
              <column>항목</column>
              <column>값(HEX·px·ms)</column>
              <column>사용처</column>
              <column>규칙</column>
            </columns>
            <rows>
              <row>
                <item>input.default</item>
                <value>bg #FFFFFF / border #CBD5E1</value>
                <usage>기본</usage>
                <rule>기본 상태.</rule>
              </row>
              <row>
                <item>input.hover</item>
                <value>bg #F1F5F9 / border #94A3B8</value>
                <usage>Web hover</usage>
                <rule>hover로만 검증 상태를 암시하지 않는다.</rule>
              </row>
              <row>
                <item>input.active</item>
                <value>border #2563EB</value>
                <usage>입력 중</usage>
                <rule>active는 포커스와 동일하게 처리 가능.</rule>
              </row>
              <row>
                <item>input.focus</item>
                <value>border #2563EB + ring(2px+glow)</value>
                <usage>키보드/클릭</usage>
                <rule>포커스 링 필수.</rule>
              </row>
              <row>
                <item>input.disabled</item>
                <value>bg #F1F5F9 / fg #94A3B8 / border #E2E8F0</value>
                <usage>비활성</usage>
                <rule>값 복사 필요 시 readOnly를 별도 제공.</rule>
              </row>
              <row>
                <item>input.loading</item>
                <value>right spinner 16px</value>
                <usage>검색/연동</usage>
                <rule>자동완성/공공 API 조회 시 사용.</rule>
              </row>
              <row>
                <item>input.error</item>
                <value>bg #FEF2F2 / border #FCA5A5 / helper #B91C1C</value>
                <usage>검증 실패</usage>
                <rule>에러는 즉시 보여주되(blur 또는 제출) 과도한 방해 금지.</rule>
              </row>
            </rows>
          </table>
        </section>
      </section>
      <section id="3.3" md_level="3">
        <title>
          <main>Textarea</main>
        </title>
        <section id="3.3.1" md_level="4">
          <title>
            <main>규격</main>
            <paren>Base</paren>
          </title>
          <table index="19">
            <columns>
              <column>항목</column>
              <column>값(HEX·px·ms)</column>
              <column>사용처</column>
              <column>규칙</column>
            </columns>
            <rows>
              <row>
                <item>textarea.minHeight</item>
                <value>96px</value>
                <usage>메모/요청사항</usage>
                <rule>3줄 기준.</rule>
              </row>
              <row>
                <item>textarea.maxHeight</item>
                <value>240px</value>
                <usage>긴 입력</usage>
                <rule>내부 스크롤 허용.</rule>
              </row>
              <row>
                <item>textarea.resize</item>
                <value>vertical</value>
                <usage>Web</usage>
                <rule>Mobile은 resize 비활성 권장.</rule>
              </row>
              <row>
                <item>textarea.padding</item>
                <value>12px</value>
                <usage>전체</usage>
                <rule>input과 동일.</rule>
              </row>
              <row>
                <item>textarea.radius</item>
                <value>8px</value>
                <usage>전체</usage>
                <rule>input과 동일.</rule>
              </row>
              <row>
                <item>textarea.counter</item>
                <value>12px / #475569</value>
                <usage>글자수</usage>
                <rule>제한이 있을 때만 노출.</rule>
              </row>
            </rows>
          </table>
        </section>
        <section id="3.3.2" md_level="4">
          <title>
            <main>상태</main>
            <paren>States</paren>
          </title>
          <table index="20">
            <columns>
              <column>항목</column>
              <column>값(HEX·px·ms)</column>
              <column>사용처</column>
              <column>규칙</column>
            </columns>
            <rows>
              <row>
                <item>textarea.default</item>
                <value>bg #FFFFFF / border #CBD5E1</value>
                <usage>기본</usage>
                <rule>기본.</rule>
              </row>
              <row>
                <item>textarea.hover</item>
                <value>bg #F1F5F9</value>
                <usage>Web hover</usage>
                <rule>hover는 배경만.</rule>
              </row>
              <row>
                <item>textarea.active</item>
                <value>border #2563EB</value>
                <usage>입력 중</usage>
                <rule>active는 포커스와 동일.</rule>
              </row>
              <row>
                <item>textarea.focus</item>
                <value>border #2563EB + ring</value>
                <usage>키보드/클릭</usage>
                <rule>링 필수.</rule>
              </row>
              <row>
                <item>textarea.disabled</item>
                <value>bg #F1F5F9 / fg #94A3B8</value>
                <usage>비활성</usage>
                <rule>제출 불가.</rule>
              </row>
              <row>
                <item>textarea.loading</item>
                <value>placeholder "불러오는 중"</value>
                <usage>자동 채움</usage>
                <rule>AI 도슨트 결과 가져오기 등.</rule>
              </row>
              <row>
                <item>textarea.error</item>
                <value>bg #FEF2F2 / border #FCA5A5</value>
                <usage>오류</usage>
                <rule>에러 메시지 하단.</rule>
              </row>
            </rows>
          </table>
        </section>
      </section>
      <section id="3.4" md_level="3">
        <title>
          <main>Card</main>
          <paren>KPI/리스트/상품/원료 카드</paren>
        </title>
        <section id="3.4.1" md_level="4">
          <title>
            <main>규격</main>
            <paren>Base</paren>
          </title>
          <table index="21">
            <columns>
              <column>항목</column>
              <column>값(HEX·px·ms)</column>
              <column>사용처</column>
              <column>규칙</column>
            </columns>
            <rows>
              <row>
                <item>card.bg</item>
                <value>#FFFFFF</value>
                <usage>기본</usage>
                <rule>캔버스 위 surface.</rule>
              </row>
              <row>
                <item>card.border</item>
                <value>1px #E2E8F0</value>
                <usage>기본</usage>
                <rule>테두리로 영역 구분.</rule>
              </row>
              <row>
                <item>card.radius</item>
                <value>12px</value>
                <usage>기본</usage>
                <rule>radius.md.</rule>
              </row>
              <row>
                <item>card.padding</item>
                <value>16px</value>
                <usage>기본</usage>
                <rule>밀도 높은 화면은 12px까지 허용.</rule>
              </row>
              <row>
                <item>card.shadow</item>
                <value>shadow.1</value>
                <usage>기본</usage>
                <rule>기본 그림자.</rule>
              </row>
              <row>
                <item>card.header.gap</item>
                <value>8px</value>
                <usage>타이틀/액션</usage>
                <rule>타이틀과 액션 분리.</rule>
              </row>
              <row>
                <item>card.kpi.value</item>
                <value>32px / 600</value>
                <usage>KPI</usage>
                <rule>단위는 caption 12px로 분리.</rule>
              </row>
            </rows>
          </table>
        </section>
        <section id="3.4.2" md_level="4">
          <title>
            <main>상태</main>
            <paren>States</paren>
          </title>
          <table index="22">
            <columns>
              <column>항목</column>
              <column>값(HEX·px·ms)</column>
              <column>사용처</column>
              <column>규칙</column>
            </columns>
            <rows>
              <row>
                <item>card.default</item>
                <value>border #E2E8F0 / shadow.1</value>
                <usage>기본</usage>
                <rule>클릭 불가 카드도 동일.</rule>
              </row>
              <row>
                <item>card.hover</item>
                <value>shadow.2 / border #CBD5E1</value>
                <usage>클릭 가능한 카드</usage>
                <rule>hover는 클릭 가능 카드에만 적용.</rule>
              </row>
              <row>
                <item>card.active</item>
                <value>border #2563EB</value>
                <usage>선택/드래그</usage>
                <rule>선택 상태는 배경 틴트 대신 보더로.</rule>
              </row>
              <row>
                <item>card.focus</item>
                <value>ring(2px+glow)</value>
                <usage>키보드</usage>
                <rule>카드 전체가 링크/버튼이면 focus 적용.</rule>
              </row>
              <row>
                <item>card.disabled</item>
                <value>opacity 0.55</value>
                <usage>비활성</usage>
                <rule>클릭 이벤트 차단.</rule>
              </row>
              <row>
                <item>card.loading</item>
                <value>skeleton(라인 3개)</value>
                <usage>로딩</usage>
                <rule>카드 크기 고정(점프 금지).</rule>
              </row>
              <row>
                <item>card.error</item>
                <value>bg #FEF2F2 / border #FCA5A5</value>
                <usage>오류</usage>
                <rule>재시도 버튼 포함.</rule>
              </row>
            </rows>
          </table>
        </section>
      </section>
      <section id="3.5" md_level="3">
        <title>
          <main>Modal</main>
        </title>
        <section id="3.5.1" md_level="4">
          <title>
            <main>규격</main>
            <paren>Base</paren>
          </title>
          <table index="23">
            <columns>
              <column>항목</column>
              <column>값(HEX·px·ms)</column>
              <column>사용처</column>
              <column>규칙</column>
            </columns>
            <rows>
              <row>
                <item>modal.scrim</item>
                <value>#0F172A66</value>
                <usage>오버레이</usage>
                <rule>배경 클릭 시 닫기 여부는 위험도에 따라 결정.</rule>
              </row>
              <row>
                <item>modal.width.sm</item>
                <value>360px</value>
                <usage>단순 확인</usage>
                <rule>모바일에서는 100% - 32px.</rule>
              </row>
              <row>
                <item>modal.width.md</item>
                <value>560px</value>
                <usage>폼/신청</usage>
                <rule>기본.</rule>
              </row>
              <row>
                <item>modal.width.lg</item>
                <value>720px</value>
                <usage>상세/리포트</usage>
                <rule>데스크톱만.</rule>
              </row>
              <row>
                <item>modal.radius</item>
                <value>12px</value>
                <usage>기본</usage>
                <rule>radius.md.</rule>
              </row>
              <row>
                <item>modal.padding</item>
                <value>20px</value>
                <usage>기본</usage>
                <rule>헤더/바디/푸터 분리.</rule>
              </row>
              <row>
                <item>modal.header.height</item>
                <value>56px</value>
                <usage>헤더</usage>
                <rule>제목+닫기.</rule>
              </row>
              <row>
                <item>modal.footer.height</item>
                <value>72px</value>
                <usage>푸터</usage>
                <rule>Primary/Secondary 버튼 우측 정렬.</rule>
              </row>
              <row>
                <item>modal.animation</item>
                <value>200ms ease standard</value>
                <usage>오픈/클로즈</usage>
                <rule>opacity+transform(Y 8px).</rule>
              </row>
            </rows>
          </table>
        </section>
        <section id="3.5.2" md_level="4">
          <title>
            <main>상태</main>
            <paren>States</paren>
          </title>
          <table index="24">
            <columns>
              <column>항목</column>
              <column>값(HEX·px·ms)</column>
              <column>사용처</column>
              <column>규칙</column>
            </columns>
            <rows>
              <row>
                <item>modal.default</item>
                <value>open + focus trap</value>
                <usage>기본</usage>
                <rule>열릴 때 첫 포커스는 제목 다음의 첫 입력/버튼.</rule>
              </row>
              <row>
                <item>modal.hover</item>
                <value>해당 없음</value>
                <usage>컨테이너</usage>
                <rule>hover/active는 내부 버튼에만 적용.</rule>
              </row>
              <row>
                <item>modal.active</item>
                <value>해당 없음</value>
                <usage>컨테이너</usage>
                <rule>동일.</rule>
              </row>
              <row>
                <item>modal.focus</item>
                <value>ring 없음(내부 요소만)</value>
                <usage>접근성</usage>
                <rule>모달 컨테이너에 링을 주지 말고 내부 포커스 요소로 관리.</rule>
              </row>
              <row>
                <item>modal.disabled</item>
                <value>primary disabled</value>
                <usage>제출 불가</usage>
                <rule>폼 미완료 시 primary를 disabled.</rule>
              </row>
              <row>
                <item>modal.loading</item>
                <value>footer에 spinner + "저장 중"</value>
                <usage>비동기</usage>
                <rule>닫기/취소 허용 여부를 명시(권장: 취소 허용).</rule>
              </row>
              <row>
                <item>modal.error</item>
                <value>상단 error banner + 필드 하이라이트</value>
                <usage>오류</usage>
                <rule>서버 오류는 토스트+배너, 필드 오류는 각 필드에.</rule>
              </row>
            </rows>
          </table>
        </section>
      </section>
      <section id="3.6" md_level="3">
        <title>
          <main>Drawer</main>
          <paren>모바일 수거 요청/필터 패널</paren>
        </title>
        <section id="3.6.1" md_level="4">
          <title>
            <main>규격</main>
            <paren>Base</paren>
          </title>
          <table index="25">
            <columns>
              <column>항목</column>
              <column>값(HEX·px·ms)</column>
              <column>사용처</column>
              <column>규칙</column>
            </columns>
            <rows>
              <row>
                <item>drawer.scrim</item>
                <value>#0F172A66</value>
                <usage>오버레이</usage>
                <rule>modal과 동일.</rule>
              </row>
              <row>
                <item>drawer.width.desktop</item>
                <value>420px</value>
                <usage>Web 우측 패널</usage>
                <rule>필터/상세.</rule>
              </row>
              <row>
                <item>drawer.height.mobile</item>
                <value>80vh</value>
                <usage>Mobile bottom sheet</usage>
                <rule>기본 80vh, 드래그로 확장 가능.</rule>
              </row>
              <row>
                <item>drawer.radius</item>
                <value>16px</value>
                <usage>mobile sheet</usage>
                <rule>상단 모서리만 radius.lg.</rule>
              </row>
              <row>
                <item>drawer.padding</item>
                <value>16px</value>
                <usage>기본</usage>
                <rule>상단 핸들 포함.</rule>
              </row>
              <row>
                <item>drawer.animation</item>
                <value>200ms standard</value>
                <usage>오픈/클로즈</usage>
                <rule>slide-in (transform).</rule>
              </row>
              <row>
                <item>drawer.handle</item>
                <value>36x4px / #CBD5E1</value>
                <usage>Mobile</usage>
                <rule>핸들은 항상 표시.</rule>
              </row>
            </rows>
          </table>
        </section>
        <section id="3.6.2" md_level="4">
          <title>
            <main>상태</main>
            <paren>States</paren>
          </title>
          <table index="26">
            <columns>
              <column>항목</column>
              <column>값(HEX·px·ms)</column>
              <column>사용처</column>
              <column>규칙</column>
            </columns>
            <rows>
              <row>
                <item>drawer.default</item>
                <value>open + focus trap(데스크톱)</value>
                <usage>기본</usage>
                <rule>데스크톱은 키보드 포커스 이동 가능.</rule>
              </row>
              <row>
                <item>drawer.hover</item>
                <value>해당 없음</value>
                <usage>컨테이너</usage>
                <rule>내부 컨트롤만 hover.</rule>
              </row>
              <row>
                <item>drawer.active</item>
                <value>drag 중</value>
                <usage>Mobile</usage>
                <rule>드래그 중 배경 스크롤 잠금.</rule>
              </row>
              <row>
                <item>drawer.focus</item>
                <value>내부 요소 focus ring</value>
                <usage>접근성</usage>
                <rule>drawer 컨테이너 링 금지.</rule>
              </row>
              <row>
                <item>drawer.disabled</item>
                <value>CTA disabled</value>
                <usage>제출 불가</usage>
                <rule>필수값 미입력.</rule>
              </row>
              <row>
                <item>drawer.loading</item>
                <value>skeleton/inline spinner</value>
                <usage>데이터 조회</usage>
                <rule>필터 적용/지도 핀 조회.</rule>
              </row>
              <row>
                <item>drawer.error</item>
                <value>상단 banner + 재시도</value>
                <usage>오류</usage>
                <rule>네트워크 오류 시 캐시/재시도 제공.</rule>
              </row>
            </rows>
          </table>
        </section>
      </section>
      <section id="3.7" md_level="3">
        <title>
          <main>Toast</main>
          <paren>알림</paren>
        </title>
        <section id="3.7.1" md_level="4">
          <title>
            <main>규격</main>
            <paren>Base</paren>
          </title>
          <table index="27">
            <columns>
              <column>항목</column>
              <column>값(HEX·px·ms)</column>
              <column>사용처</column>
              <column>규칙</column>
            </columns>
            <rows>
              <row>
                <item>toast.position.web</item>
                <value>top-right 24px</value>
                <usage>Web</usage>
                <rule>스택 간격 12px.</rule>
              </row>
              <row>
                <item>toast.position.mobile</item>
                <value>top 16px</value>
                <usage>Mobile</usage>
                <rule>노치 고려 safe-area 적용.</rule>
              </row>
              <row>
                <item>toast.width</item>
                <value>360px(max)</value>
                <usage>Web</usage>
                <rule>모바일은 100% - 32px.</rule>
              </row>
              <row>
                <item>toast.radius</item>
                <value>12px</value>
                <usage>전체</usage>
                <rule>radius.md.</rule>
              </row>
              <row>
                <item>toast.padding</item>
                <value>12px 14px</value>
                <usage>전체</usage>
                <rule>아이콘+텍스트.</rule>
              </row>
              <row>
                <item>toast.shadow</item>
                <value>shadow.2</value>
                <usage>전체</usage>
                <rule>떠있는 느낌.</rule>
              </row>
              <row>
                <item>toast.duration</item>
                <value>4000ms</value>
                <usage>기본</usage>
                <rule>성공/정보는 4s, 오류는 6s 권장(수동 닫기 필수).</rule>
              </row>
              <row>
                <item>toast.ariaLive</item>
                <value>polite/assertive</value>
                <usage>접근성</usage>
                <rule>success/info=polite, error=assertive.</rule>
              </row>
            </rows>
          </table>
        </section>
        <section id="3.7.2" md_level="4">
          <title>
            <main>타입/상태</main>
            <paren>Types + States</paren>
          </title>
          <table index="28">
            <columns>
              <column>항목</column>
              <column>값(HEX·px·ms)</column>
              <column>사용처</column>
              <column>규칙</column>
            </columns>
            <rows>
              <row>
                <item>toast.success.default</item>
                <value>left bar #16A34A / bg #FFFFFF / fg #0F172A</value>
                <usage>성공</usage>
                <rule>성공은 짧게, 다음 행동 제안.</rule>
              </row>
              <row>
                <item>toast.info.default</item>
                <value>left bar #2563EB</value>
                <usage>정보</usage>
                <rule>안내/저장됨.</rule>
              </row>
              <row>
                <item>toast.warning.default</item>
                <value>left bar #D97706</value>
                <usage>경고</usage>
                <rule>주의/확인 필요.</rule>
              </row>
              <row>
                <item>toast.error.default</item>
                <value>left bar #DC2626</value>
                <usage>오류</usage>
                <rule>해결 행동(재시도/문의) 포함.</rule>
              </row>
              <row>
                <item>toast.hover</item>
                <value>close 버튼 강조</value>
                <usage>Web hover</usage>
                <rule>토스트 전체 hover 확대 금지.</rule>
              </row>
              <row>
                <item>toast.active</item>
                <value>close 버튼 pressed</value>
                <usage>클릭</usage>
                <rule>close만 active.</rule>
              </row>
              <row>
                <item>toast.focus</item>
                <value>close 버튼 ring</value>
                <usage>키보드</usage>
                <rule>닫기 버튼 포커스 가능.</rule>
              </row>
              <row>
                <item>toast.disabled</item>
                <value>해당 없음</value>
                <usage>토스트</usage>
                <rule>토스트 자체는 disabled 개념 없음(필요 시 버튼 disabled).</rule>
              </row>
              <row>
                <item>toast.loading</item>
                <value>"처리 중" + spinner</value>
                <usage>진행</usage>
                <rule>장시간 작업 시작/종료 알림에만.</rule>
              </row>
              <row>
                <item>toast.error</item>
                <value>error 타입 사용</value>
                <usage>오류</usage>
                <rule>error는 자동 사라짐 금지(6s)+닫기 제공.</rule>
              </row>
            </rows>
          </table>
        </section>
      </section>
      <section id="3.8" md_level="3">
        <title>
          <main>Table</main>
          <paren>데이터/이력/매칭 리스트</paren>
        </title>
        <section id="3.8.1" md_level="4">
          <title>
            <main>규격</main>
            <paren>Base</paren>
          </title>
          <table index="29">
            <columns>
              <column>항목</column>
              <column>값(HEX·px·ms)</column>
              <column>사용처</column>
              <column>규칙</column>
            </columns>
            <rows>
              <row>
                <item>table.header.height</item>
                <value>44px</value>
                <usage>Web</usage>
                <rule>헤더는 sticky 가능.</rule>
              </row>
              <row>
                <item>table.row.height</item>
                <value>48px</value>
                <usage>Web</usage>
                <rule>밀도 높은 화면은 44px까지 허용.</rule>
              </row>
              <row>
                <item>table.cell.paddingX</item>
                <value>12px</value>
                <usage>전체</usage>
                <rule>숫자열은 오른쪽 정렬.</rule>
              </row>
              <row>
                <item>table.cell.paddingY</item>
                <value>10px</value>
                <usage>전체</usage>
                <rule>세로 정렬 중앙.</rule>
              </row>
              <row>
                <item>table.border</item>
                <value>1px #E2E8F0</value>
                <usage>전체</usage>
                <rule>외곽+행 구분선.</rule>
              </row>
              <row>
                <item>table.header.bg</item>
                <value>#F1F5F9</value>
                <usage>헤더</usage>
                <rule>헤더 텍스트 14px/600.</rule>
              </row>
              <row>
                <item>table.row.hoverBg</item>
                <value>#F7FAF8</value>
                <usage>hover</usage>
                <rule>클릭 가능한 행만.</rule>
              </row>
              <row>
                <item>table.zebra</item>
                <value>off</value>
                <usage>기본</usage>
                <rule>기본은 zebra off, 필요 시 리포트 화면에서만 on.</rule>
              </row>
              <row>
                <item>table.empty.minHeight</item>
                <value>240px</value>
                <usage>빈 상태</usage>
                <rule>빈 상태는 아이콘+문장+CTA 1개.</rule>
              </row>
            </rows>
          </table>
        </section>
        <section id="3.8.2" md_level="4">
          <title>
            <main>상태</main>
            <paren>States</paren>
          </title>
          <table index="30">
            <columns>
              <column>항목</column>
              <column>값(HEX·px·ms)</column>
              <column>사용처</column>
              <column>규칙</column>
            </columns>
            <rows>
              <row>
                <item>table.default</item>
                <value>header bg #F1F5F9 / row bg #FFFFFF</value>
                <usage>기본</usage>
                <rule>기본.</rule>
              </row>
              <row>
                <item>table.hover</item>
                <value>row bg #F7FAF8</value>
                <usage>Web hover</usage>
                <rule>hover는 선택/클릭 가능한 행에만.</rule>
              </row>
              <row>
                <item>table.active</item>
                <value>row border-left 3px #2563EB</value>
                <usage>선택</usage>
                <rule>선택은 좌측 인디케이터로 표현(색만으로 구분 금지).</rule>
              </row>
              <row>
                <item>table.focus</item>
                <value>cell ring 2px #2563EB</value>
                <usage>키보드</usage>
                <rule>셀 단위 포커스 이동 지원 시.</rule>
              </row>
              <row>
                <item>table.disabled</item>
                <value>row opacity 0.55</value>
                <usage>권한/잠금</usage>
                <rule>행 액션 disabled + 이유 툴팁.</rule>
              </row>
              <row>
                <item>table.loading</item>
                <value>skeleton rows 6개</value>
                <usage>조회</usage>
                <rule>테이블 높이 고정(레이아웃 점프 금지).</rule>
              </row>
              <row>
                <item>table.error</item>
                <value>inline banner + 재시도</value>
                <usage>오류</usage>
                <rule>캐시 데이터가 있으면 캐시 표시 후 재시도 버튼 제공.</rule>
              </row>
            </rows>
          </table>
        </section>
      </section>
    </section>
    <section id="4" md_level="2">
      <title>
        <main>화면 패턴</main>
        <paren>핵심 UX 규칙</paren>
      </title>
      <section id="4.1" md_level="3">
        <title>
          <main>데이터 신뢰성/캐시 표시</main>
          <paren>공공 API 지연 대응</paren>
        </title>
        <table index="31">
          <columns>
            <column>항목</column>
            <column>값(HEX·px·ms)</column>
            <column>사용처</column>
            <column>규칙</column>
          </columns>
          <rows>
            <row>
              <item>data.stale.badge</item>
              <value>bg #EFF6FF / fg #1D4ED8</value>
              <usage>지연/캐시</usage>
              <rule>API 실패 시 "캐시 데이터" 배지와 마지막 업데이트 시각을 표기.</rule>
            </row>
            <row>
              <item>data.refresh.action</item>
              <value>버튼(tertiary)</value>
              <usage>대시보드/지도</usage>
              <rule>수동 새로고침 제공.</rule>
            </row>
            <row>
              <item>data.timeout.threshold</item>
              <value>4000ms</value>
              <usage>API 호출</usage>
              <rule>4s 초과 시 "지연" 배너 노출 + 캐시 fallback.</rule>
            </row>
            <row>
              <item>data.skeleton.delay</item>
              <value>300ms</value>
              <usage>로딩</usage>
              <rule>300ms 이내면 spinner, 초과면 skeleton.</rule>
            </row>
            <row>
              <item>data.lastUpdated.format</item>
              <value>YYYY-MM-DD HH:mm</value>
              <usage>전체</usage>
              <rule>사용자가 비교 가능한 절대시간 사용.</rule>
            </row>
          </rows>
        </table>
      </section>
      <section id="4.2" md_level="3">
        <title>
          <main>지도 기반 수급 대시보드</main>
          <paren>Map UX</paren>
        </title>
        <table index="32">
          <columns>
            <column>항목</column>
            <column>값(HEX·px·ms)</column>
            <column>사용처</column>
            <column>규칙</column>
          </columns>
          <rows>
            <row>
              <item>map.panel.minHeight</item>
              <value>420px</value>
              <usage>Web 대시보드</usage>
              <rule>지도는 최소 420px 확보(읽기/조작).</rule>
            </row>
            <row>
              <item>map.panel.minHeight.mobile</item>
              <value>320px</value>
              <usage>Mobile</usage>
              <rule>상단 지도 + 하단 리스트(드로어) 구성.</rule>
            </row>
            <row>
              <item>map.pin.size</item>
              <value>24px(default) / 32px(selected)</value>
              <usage>지도 핀</usage>
              <rule>선택 핀은 크기+외곽 링으로 표현.</rule>
            </row>
            <row>
              <item>map.cluster.threshold</item>
              <value>12 pins</value>
              <usage>클러스터</usage>
              <rule>핀이 12개 이상이면 클러스터링.</rule>
            </row>
            <row>
              <item>map.tooltip.delay</item>
              <value>120ms</value>
              <usage>hover tooltip</usage>
              <rule>hover=120ms, mobile은 tap으로.</rule>
            </row>
            <row>
              <item>map.filter.chips</item>
              <value>height 32px / radius full</value>
              <usage>필터</usage>
              <rule>품목/시군/수거가능 시점 칩, 다중 선택 허용.</rule>
            </row>
            <row>
              <item>map.list.sync</item>
              <value>1</value>
              <usage>지도+리스트</usage>
              <rule>지도 선택=리스트 스크롤/하이라이트 동기화.</rule>
            </row>
          </rows>
        </table>
      </section>
      <section id="4.3" md_level="3">
        <title>
          <main>ESG 리포트</main>
          <paren>Export/Print</paren>
        </title>
        <table index="33">
          <columns>
            <column>항목</column>
            <column>값(HEX·px·ms)</column>
            <column>사용처</column>
            <column>규칙</column>
          </columns>
          <rows>
            <row>
              <item>report.pageWidth</item>
              <value>A4(210mm)</value>
              <usage>PDF</usage>
              <rule>PDF 내보내기 시 A4 기준.</rule>
            </row>
            <row>
              <item>report.kpi.format</item>
              <value>숫자+단위 분리</value>
              <usage>리포트</usage>
              <rule>tCO2e, kg, ton 등 단위는 캡션.</rule>
            </row>
            <row>
              <item>report.chart.altTable</item>
              <value>제공</value>
              <usage>접근성</usage>
              <rule>차트는 동일 데이터 테이블을 함께 제공.</rule>
            </row>
            <row>
              <item>report.confidence.note</item>
              <value>1줄</value>
              <usage>산출 결과</usage>
              <rule>"계수/가이드라인 기반 추정" 문구 표기(법적 고지).</rule>
            </row>
          </rows>
        </table>
      </section>
    </section>
    <section id="5" md_level="2">
      <title>
        <main>접근성(A11y) 체크리스트</main>
      </title>
      <table index="34">
        <columns>
          <column>항목</column>
          <column>값(HEX·px·ms)</column>
          <column>사용처</column>
          <column>규칙</column>
        </columns>
        <rows>
          <row>
            <item>대비(텍스트)</item>
            <value>4.5:1 이상</value>
            <usage>전체</usage>
            <rule>본문 16px 기준. 큰 텍스트(18px+ 또는 14px/700)는 3:1 이상.</rule>
          </row>
          <row>
            <item>포커스 표시</item>
            <value>2px 링 + 4px 글로우</value>
            <usage>전체</usage>
            <rule>키보드 탐색 시 항상 보이게.</rule>
          </row>
          <row>
            <item>탭 순서</item>
            <value>시각적 순서와 동일</value>
            <usage>전체</usage>
            <rule>사이드바→본문→푸터 순.</rule>
          </row>
          <row>
            <item>터치 타깃</item>
            <value>44x44px 이상</value>
            <usage>Mobile</usage>
            <rule>체크박스/아이콘 버튼도 포함.</rule>
          </row>
          <row>
            <item>라벨/설명</item>
            <value>label + helper + error 연계</value>
            <usage>폼</usage>
            <rule>aria-describedby로 도움말/에러 연결.</rule>
          </row>
          <row>
            <item>오류 전달</item>
            <value>텍스트로 명시</value>
            <usage>폼</usage>
            <rule>색만으로 오류 표시 금지(문장/아이콘 병행).</rule>
          </row>
          <row>
            <item>모달 접근성</item>
            <value>aria-modal, focus trap</value>
            <usage>모달/드로어</usage>
            <rule>ESC 닫기 제공(필수 입력 폼은 확인 후).</rule>
          </row>
          <row>
            <item>토스트 접근성</item>
            <value>aria-live</value>
            <usage>토스트</usage>
            <rule>에러는 assertive, 자동 사라짐 시간 연장.</rule>
          </row>
          <row>
            <item>표 접근성</item>
            <value>caption/헤더 scope</value>
            <usage>테이블</usage>
            <rule>열 헤더는 scope="col", 필요 시 행 헤더 제공.</rule>
          </row>
          <row>
            <item>지도 대체</item>
            <value>리스트/테이블 제공</value>
            <usage>지도</usage>
            <rule>핀 데이터는 리스트로도 접근 가능해야 한다.</rule>
          </row>
          <row>
            <item>모션 감소</item>
            <value>reduce 시 0ms</value>
            <usage>전체</usage>
            <rule>transform 애니메이션 제거, 정보 손실 금지.</rule>
          </row>
          <row>
            <item>아이콘 버튼</item>
            <value>aria-label</value>
            <usage>Web/Mobile</usage>
            <rule>아이콘만 있는 버튼은 의미 텍스트 제공.</rule>
          </row>
        </rows>
      </table>
    </section>
    <section id="6" md_level="2">
      <title>
        <main>UI QA 체크리스트</main>
        <paren>릴리즈 전</paren>
      </title>
      <table index="35">
        <columns>
          <column>항목</column>
          <column>값(HEX·px·ms)</column>
          <column>사용처</column>
          <column>규칙</column>
        </columns>
        <rows>
          <row>
            <item>반응형 검증</item>
            <value>360/480/768/1024/1280/1440</value>
            <usage>전체</usage>
            <rule>각 구간에서 레이아웃 깨짐/겹침/잘림 없음.</rule>
          </row>
          <row>
            <item>가로 스크롤</item>
            <value>0</value>
            <usage>Mobile</usage>
            <rule>360px에서 수평 스크롤 발생 금지.</rule>
          </row>
          <row>
            <item>상태 검증</item>
            <value>default/hover/active/focus/disabled/loading/error</value>
            <usage>모든 컴포넌트</usage>
            <rule>각 상태에서 텍스트/아이콘/보더가 명확히 변한다.</rule>
          </row>
          <row>
            <item>로딩 처리</item>
            <value>skeleton/spinner</value>
            <usage>데이터 화면</usage>
            <rule>300ms 초과 시 skeleton, 완료 후 점프/깜빡임 없음(CLS).</rule>
          </row>
          <row>
            <item>빈 상태(Empty)</item>
            <value>안내+CTA 1개</value>
            <usage>리스트/테이블</usage>
            <rule>"데이터 없음"만 표기 금지, 다음 행동 제시.</rule>
          </row>
          <row>
            <item>오류 처리(Error)</item>
            <value>재시도+문의 경로</value>
            <usage>전체</usage>
            <rule>서버/네트워크 오류 메시지에 행동 포함.</rule>
          </row>
          <row>
            <item>캐시 폴백</item>
            <value>lastUpdated 표기</value>
            <usage>공공 API</usage>
            <rule>실패 시 캐시 데이터 표기 및 새로고침 제공.</rule>
          </row>
          <row>
            <item>지도 동기화</item>
            <value>핀↔리스트</value>
            <usage>지도/대시보드</usage>
            <rule>선택 상태가 양쪽에 반영된다.</rule>
          </row>
          <row>
            <item>파일 업로드</item>
            <value>10MB/타입 제한</value>
            <usage>Mobile</usage>
            <rule>사진 업로드 전 미리보기, 실패 시 원인 표기.</rule>
          </row>
          <row>
            <item>접근성</item>
            <value>키보드/스크린리더</value>
            <usage>Web</usage>
            <rule>주요 플로우(로그인/신청/저장/삭제) 완주 가능.</rule>
          </row>
          <row>
            <item>권한/보안 UI</item>
            <value>401/403 처리</value>
            <usage>전체</usage>
            <rule>세션 만료 시 재로그인 유도, 민감 정보 화면 캡처 주의 문구(필요 시).</rule>
          </row>
        </rows>
      </table>
    </section>
    <section id="assumptions" md_level="2">
      <title>
        <main>가정</main>
        <paren>Assumptions</paren>
      </title>
      <table index="36">
        <columns>
          <column>항목</column>
          <column>값(HEX·px·ms)</column>
          <column>사용처</column>
          <column>규칙</column>
        </columns>
        <rows>
          <row>
            <item>다크 모드</item>
            <value>미지원</value>
            <usage>전체</usage>
            <rule>추후 요구 시 토큰 확장(색/그림자/보더 재정의).</rule>
          </row>
          <row>
            <item>아이콘 세트</item>
            <value>SVG(예: Lucide)</value>
            <usage>전체</usage>
            <rule>이모지 아이콘 사용 금지.</rule>
          </row>
          <row>
            <item>지도 SDK</item>
            <value>범용(Map SDK 미확정)</value>
            <usage>지도</usage>
            <rule>핀/클러스터/툴팁 규칙은 SDK와 무관하게 구현 가능하도록 정의.</rule>
          </row>
          <row>
            <item>차트 라이브러리</item>
            <value>범용(미확정)</value>
            <usage>차트</usage>
            <rule>시리즈 색/툴팁/대체 테이블 규칙을 우선 적용.</rule>
          </row>
          <row>
            <item>로그인</item>
            <value>OAuth 2.0 기반</value>
            <usage>인증</usage>
            <rule>UI는 역할별 메뉴 가시성 제어를 포함한다.</rule>
          </row>
        </rows>
      </table>
    </section>
  </content>
</uiux_spec>
```
