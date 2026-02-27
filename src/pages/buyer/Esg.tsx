import { EsgReport } from "@/components/EsgReport";

const MOCK_ESG_DATA = [
  { month: "2025-10", collectedKg: 1250, carbonReductionTCO2e: 1.52 },
  { month: "2025-11", collectedKg: 2500, carbonReductionTCO2e: 3.15 },
  { month: "2025-12", collectedKg: 1800, carbonReductionTCO2e: 2.24 },
];

const BuyerEsg = () => (
  <div className="space-y-6 max-w-[1200px] mx-auto">
    <div className="print:hidden">
      <h1 className="text-h1 text-foreground">ESG 인증서</h1>
      <p className="text-body2 text-muted-foreground mt-1">구매를 통한 환경 기여를 확인하세요.</p>
    </div>
    <div className="pt-6">
      <EsgReport 
        companyName="경북 농업 부산물 업사이클링 참여기업"
        period="2025.10 ~ 2025.12"
        totalCollectedKg={5550}
        totalCarbonReduction={6.91}
        data={MOCK_ESG_DATA}
        onExportPdf={() => {
          console.log("PDF Export Triggered");
          alert("데모: PDF 내보내기가 실행되었습니다.");
        }}
      />
    </div>
  </div>
);

export default BuyerEsg;
