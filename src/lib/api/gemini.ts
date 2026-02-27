/**
 * Google Gemini API 연동 클라이언트
 * 목적: CCDB API 등의 원시 데이터를 B2B 카피라이팅/마케팅 소구점으로 변환
 */

// .env.local 파일에 설정된 키값을 가져옵니다. (Vite 환경 기준)
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

/**
 * Gemini 모델을 호출하여 텍스트를 생성합니다.
 * @param prompt AI에게 전달할 지시어 (예: "사과 껍질 성분을 바탕으로 화장품 카피 작성해줘")
 * @returns 생성된 AI 텍스트 응답
 */
export async function generateMarketingCopy(prompt: string): Promise<string> {
  if (!GEMINI_API_KEY) {
    throw new Error("Gemini API 키가 환경변수(.env.local)에 설정되지 않았습니다.");
  }

  // 사용자 요청에 따라 최신 'gemini-3-flash-preview' 모델 명시적 지정
  const model = "gemini-3-flash-preview";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ],
        // 결과물의 퀄리티 조절 (선택 사항)
        generationConfig: {
          temperature: 0.7, // 창의성과 정확성의 균형
          topK: 40,
          topP: 0.95,
        }
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API 오류 상세:", errorData);
      throw new Error(`Gemini API 통신 실패: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
    
  } catch (error) {
    console.error("Gemini 프롬프트 실행 중 에러:", error);
    throw error;
  }
}
