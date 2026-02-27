/**
 * 공공데이터포털 - 농촌진흥청 국가표준식품성분정보(CCDB) 조회 유틸리티
 * Base URL: http://apis.data.go.kr/1390803/AgriFood/NationStdFood/V2
 */

// 발급받은 실제 환경변수는 .env.local의 VITE_PUBLIC_CCDB_API_KEY 로 관리하는 것이 좋습니다.
// 테스트 또는 직접 하드코딩 시 아래에 입력
const API_KEY = "Tm9U4A4bvXGp8V3BL5wMFSc3vKZqECQ95p6DaEcNh9Hm00HIe0wpxkz3f11Vsgvx8sB6sCN6sg7izcBesPFP3Q==";
const ENC_KEY = encodeURIComponent(API_KEY);
const BASE_URL = "http://apis.data.go.kr/1390803/AgriFood/NationStdFood/V2";

/**
 * 1. 국가표준식품성분 코드 정보 조회 (getKoreanFoodNationStdList)
 * @param {string} fdGrupp 식품군 식별ID 값 (예: "01" 이나 차후 HWP 다운 시 확인되는 코드)
 * @param {number} pageNo 페이지 번호
 * @param {number} pageSize 한 페이지 결과 수
 */
export async function getFoodList(fdGrupp: string, pageNo = 1, pageSize = 10) {
  // 공공데이터포털은 종종 인코딩된 키 자체를 파라미터로 요구하는 경우가 많아, encodeURIComponent 처리 후 사용 권장.
  const url = `${BASE_URL}/getKoreanFoodNationStdList?serviceKey=${ENC_KEY}&page_No=${pageNo}&Page_Size=${pageSize}&fd_Grupp=${encodeURIComponent(fdGrupp)}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const textData = await res.text();
    
    // 이 API는 보통 JSON 응답을 명시적으로 요구하는 파라미터(예:_type=json)가 없으면 XML로 응답합니다.
    // 만약 XML을 JSON으로 바꿔주는 라이브러리(xml2js 등)를 나중에 쓰거나 백엔드(Supabase Edge Functions)에서 파싱하면 됩니다.
    return textData; 
  } catch (error) {
    console.error("CCDB 식품 코드 목록 조회 실패:", error);
    throw error;
  }
}

/**
 * 2. 국가표준식품 코드별 상세 영양 성분 정보 조회 (getKoreanFoodNationStdIdntList)
 * @param {string} foodCode 식품 고유 코드 (예: 1번 목록 조회에서 얻어낸 food_Code)
 */
export async function getFoodDetailIngredients(foodCode: string) {
  const url = `${BASE_URL}/getKoreanFoodNationStdIdntList?serviceKey=${ENC_KEY}&food_Code=${encodeURIComponent(foodCode)}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const textData = await res.text();
    return textData;
  } catch (error) {
    console.error(`CCDB [${foodCode}] 성분 조회 실패:`, error);
    throw error;
  }
}

/**
 * [가이드] HWP 파일 없이도 개발하는 법:
 * 서버 점검이 끝나고나면, getFoodList("01") 등으로 찔러보고 응답받은 `<food_Code>` 1개를 얻어옵니다.
 * 얻어온 코드(예: D000001)를 getFoodDetailIngredients("D000001")에 넣습니다.
 * 그러면 "비타민", "지방산" 등 영양소 항목들(irdnt_Nm)이 결과(result_Code=200)로 쏟아져 나옵니다.
 */
