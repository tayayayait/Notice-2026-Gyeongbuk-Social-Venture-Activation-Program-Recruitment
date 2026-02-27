import React, { useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Printer, Download } from 'lucide-react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';

interface EsgDataRow {
  month: string;
  collectedKg: number;
  carbonReductionTCO2e: number;
}

interface EsgReportProps {
  companyName: string;
  period: string;
  totalCollectedKg: number;
  totalCarbonReduction: number;
  data: EsgDataRow[];
  className?: string;
  onExportPdf?: () => void;
}

export function EsgReport({
  companyName,
  period,
  totalCollectedKg,
  totalCarbonReduction,
  data,
  className = '',
  onExportPdf
}: EsgReportProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={`w-full max-w-[1000px] mx-auto flex flex-col gap-6 ${className}`}>
      
      {/* 액션 바: 프린트(A4) 관련 기능 */}
      <div className="flex justify-between items-center bg-white p-4 border border-border rounded-md shadow-1 print:hidden">
        <div>
          <h2 className="text-h2 font-semibold">ESG 감축 실적 리포트</h2>
          <p className="text-body2 text-muted-foreground">인쇄 시 A4(210mm) 기준폭 레이아웃으로 변환됩니다.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="w-4 h-4 mr-2" /> 
            인쇄
          </Button>
          <Button onClick={onExportPdf} className="bg-primary text-primary-foreground">
            <Download className="w-4 h-4 mr-2" />
            PDF 내보내기
          </Button>
        </div>
      </div>

      {/* 리포트 본문 (A4 210mm 비율 가상 랜더링 영역) */}
      <div 
        ref={printRef}
        className="bg-white mx-auto p-10 md:p-12 w-full lg:w-[210mm] lg:min-h-[297mm] shadow-3 print:shadow-none print:w-[210mm] print:m-0 print:p-0 border border-border"
      >
        <div className="text-center mb-10 pb-6 border-b-2 border-primary">
          <h1 className="text-display font-bold text-foreground mb-4">
            ESG 환경가치 창출 리포트
          </h1>
          <p className="text-body text-neutral-600">대상: {companyName} | 산출 기간: {period}</p>
        </div>

        {/* 핵심 KPI 섹션 */}
        <div className="grid grid-cols-2 gap-6 mb-10">
          <div className="bg-brand-green-50 rounded-lg p-6 border border-brand-green-100 flex flex-col items-center justify-center">
            <span className="text-body2 font-medium text-brand-green-700 mb-2">총 순환자원 누적 수거량</span>
            <div className="flex items-baseline gap-1 text-primary">
              <span className="text-4xl font-bold">{totalCollectedKg.toLocaleString()}</span>
              <span className="text-body2 font-normal">kg</span>
            </div>
          </div>
          <div className="bg-brand-blue-50 rounded-lg p-6 border border-brand-blue-100 flex flex-col items-center justify-center">
            <span className="text-body2 font-medium text-brand-blue-700 mb-2">온실가스 감축 효과</span>
            <div className="flex items-baseline gap-1 text-info">
              <span className="text-4xl font-bold">{totalCarbonReduction.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              <span className="text-body2 font-normal">tCO₂e</span>
            </div>
          </div>
        </div>

        {/* 4.3 ESG 리포트: report.chart.altTable 규칙 - 차트 대신 대체 테이블 우선 제공 (A11y/Print 고려) */}
        <div className="mb-10 page-break-inside-avoid">
          <h3 className="text-h3 font-semibold mb-4 text-foreground border-l-4 border-primary pl-3">
            월별 실적 상세
          </h3>
          <Table className="border border-border">
            <TableHeader className="bg-neutral-50 border-b border-border">
              <TableRow>
                <TableHead className="text-center">월(Month)</TableHead>
                <TableHead className="text-right">수거량 (kg)</TableHead>
                <TableHead className="text-right">탄소감축량 (tCO₂e)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.month} className="even:bg-neutral-50/50">
                  <TableCell className="text-center font-medium">{row.month}</TableCell>
                  <TableCell className="text-right">{row.collectedKg.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{row.carbonReductionTCO2e.toLocaleString(undefined, { minimumFractionDigits: 2 })}</TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-neutral-100 font-semibold border-t-2 border-border">
                <TableCell className="text-center">합계</TableCell>
                <TableCell className="text-right">{totalCollectedKg.toLocaleString()}</TableCell>
                <TableCell className="text-right">{totalCarbonReduction.toLocaleString(undefined, { minimumFractionDigits: 2 })}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        {/* 4.3 요구사항: report.confidence.note */}
        <div className="mt-16 pt-6 border-t border-border text-center page-break-inside-avoid text-neutral-600">
          <p className="text-caption">
            * 본 리포트의 탄소 감축량(tCO₂e) 수치는 환경부 배출량 계수 및 공공 가이드라인 기반의 자체 추정치로,
            <br /> 법적 효력을 보장하지 않으며 내부 참고용/제출 보조용으로만 활용 바랍니다.
          </p>
          <p className="text-caption mt-2 font-medium text-neutral-400">
            생성 일시: {new Date().toLocaleString('ko-KR')}
          </p>
        </div>
      </div>
    </div>
  );
}
