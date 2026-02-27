import fs from 'fs';

const API_KEY = "Tm9U4A4bvXGp8V3BL5wMFSc3vKZqECQ95p6DaEcNh9Hm00HIe0wpxkz3f11Vsgvx8sB6sCN6sg7izcBesPFP3Q==";

async function testApi() {
  const baseUrlList = "http://apis.data.go.kr/1390803/AgriFood/NationStdFood/V2/getKoreanFoodNationStdList";

  // 브루트포스 테스트 배열: 01~99, 001~099, 100~0900, "곡류", "과실류", "과일류", "채소류", "버섯류" 등
  const groupsToTest = [];
  for(let i=1; i<=30; i++) {
      groupsToTest.push(i.toString().padStart(2, '0'));   // 01 ~ 30
      groupsToTest.push(i.toString().padStart(3, '0'));   // 001 ~ 030
      groupsToTest.push(i.toString());                    // 1 ~ 30
  }
  const textGroups = ["곡류", "감자류", "당류", "두류", "견과류", "채소류", "버섯류", "과실류", "과일류", "농산물"];
  groupsToTest.push(...textGroups);

  console.log(`총 ${groupsToTest.length}개의 그룹 코드를 브루트포스 테스트합니다.`);

  // 병렬 처리를 위해 묶어서 실행
  const chunkSize = 10;
  for(let i=0; i<groupsToTest.length; i+=chunkSize) {
      const chunk = groupsToTest.slice(i, i+chunkSize);
      
      const promises = chunk.map(async (group) => {
          const url = `${baseUrlList}?serviceKey=${API_KEY}&page_No=1&Page_Size=1&fd_Grupp=${encodeURIComponent(group)}`;
          try {
              const res = await fetch(url);
              const txt = await res.text();
              if (txt.includes("result_Code>200</result_Code>") || txt.includes(`"result_Code":"200"`)) {
                  console.log(`\n🎉 BINGO! 유효한 fd_Grupp 발견: ${group}`);
                  fs.writeFileSync('result_success.xml', txt);
                  process.exit(0); // 발견 즉시 종료
              }
          } catch(e) {}
      });

      await Promise.all(promises);
      process.stdout.write("."); // 진행상황
  }
  
  console.log("\n❌ 모든 경우의 수를 시도했으나 200번 응답을 찾지 못했습니다.");
}

testApi();
