import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Info, RefreshCw, X, Layers } from 'lucide-react';

interface MapPinData {
  id: string;
  lat: number;
  lng: number;
  state: 'available' | 'scheduled' | 'limited' | 'blocked';
  title: string;
  detail?: string;
}

interface MapBoardProps {
  pins: MapPinData[];
  onPinClick?: (pin: MapPinData) => void;
  selectedPinId?: string | null;
  onRefresh?: () => void;
  isStale?: boolean;
  filterNodes?: ReactNode;
  className?: string;
}

export function MapBoard({
  pins,
  onPinClick,
  selectedPinId,
  onRefresh,
  isStale,
  filterNodes,
  className = ''
}: MapBoardProps) {
  // 모의 줌/패닝 상태 생략 -> 데모용 스태틱 렌더링
  const mapRef = useRef<HTMLDivElement>(null);
  const [tooltipData, setTooltipData] = useState<MapPinData | null>(null);

  // XML 기준 컬러 토큰 매핑
  const pinColors = {
    available: 'text-[#1E7B3A]',
    scheduled: 'text-[#2563EB]',
    limited: 'text-[#D97706]',
    blocked: 'text-[#DC2626]'
  };

  return (
    <div className={`relative flex flex-col w-full min-h-[420px] bg-neutral-50 rounded-md border border-border overflow-hidden ${className}`}>
      
      {/* 맵 상단 컨트롤 (필터 및 새로고침) */}
      <div className="absolute top-4 left-4 right-4 z-10 flex items-start justify-between pointer-events-none">
        <div className="pointer-events-auto flex flex-col gap-2">
          {filterNodes && (
            <div className="flex flex-wrap gap-2">
              {filterNodes}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 items-end pointer-events-auto">
          {onRefresh && (
            <Button size="icon" variant="secondary" onClick={onRefresh} className="shadow-2 rounded-full h-10 w-10">
              <RefreshCw className="w-5 h-5 text-neutral-600" />
            </Button>
          )}
          <Button size="icon" variant="secondary" className="shadow-2 rounded-full h-10 w-10">
            <Layers className="w-5 h-5 text-neutral-600" />
          </Button>
        </div>
      </div>

      {isStale && (
        <div className="absolute top-16 right-4 z-10 pointer-events-auto">
          <Badge variant="outline" className="bg-info-tint text-info-foreground border-info-strong shadow-1">
            <Info className="w-3 h-3 mr-1" /> 데이터 갱신 지연
          </Badge>
        </div>
      )}

      {/* 모의 맵 캔버스 영역 (Static placeholder for mapping library) */}
      <div 
        ref={mapRef}
        className="flex-1 w-full bg-[#E2E8F0]/30 relative cursor-grab active:cursor-grabbing inset-0 overflow-hidden isolate"
      >
        <div className="absolute inset-0 pattern-grid opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

        {/* 핀 렌더링 로직 (데모용 단순 산포) */}
        {pins.map((pin) => {
          const isSelected = selectedPinId === pin.id;
          const leftPos = Math.min(Math.max(pin.lng % 100, 10), 90);
          const topPos = Math.min(Math.max(pin.lat % 100, 10), 90);
          
          return (
            <div
              key={pin.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 cursor-interactive
                ${isSelected ? 'z-20 scale-125' : 'z-10 hover:scale-110 hover:z-20'}
              `}
              style={{ left: `${leftPos}%`, top: `${topPos}%` }}
              onClick={() => onPinClick?.(pin)}
              onMouseEnter={() => setTooltipData(pin)}
              onMouseLeave={() => setTooltipData(null)}
            >
              <div className="relative">
                <MapPin 
                  className={`drop-shadow-1 ${pinColors[pin.state]} transition-all duration-200`} 
                  size={isSelected ? 32 : 24} 
                  strokeWidth={isSelected ? 2.5 : 2}
                  fill="white"
                />
                {isSelected && (
                  <div className="absolute inset-0 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-background/50 animate-pulse" />
                )}
              </div>
            </div>
          );
        })}

        {/* 툴팁 (hover 시 120ms 지연 후 노출되는 컨셉) */}
        {tooltipData && !selectedPinId && (
          <div 
            className="absolute z-tooltip bg-slate-900/90 text-white px-3 py-2 rounded-md shadow-2 text-sm max-w-[200px] pointer-events-none transform -translate-x-1/2 -translate-y-[120%]"
            style={{ left: `${Math.min(Math.max(tooltipData.lng % 100, 10), 90)}%`, top: `${Math.min(Math.max(tooltipData.lat % 100, 10), 90)}%` }}
          >
            <p className="font-semibold">{tooltipData.title}</p>
            {tooltipData.detail && <p className="text-xs text-slate-300 mt-1">{tooltipData.detail}</p>}
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-900/90 rotate-45" />
          </div>
        )}
      </div>
      
      {/* 맵 하단 범례 */}
      <div className="absolute bottom-4 left-4 z-10 bg-white/90 backdrop-blur-sm p-3 rounded-md shadow-1 border border-border text-xs flex gap-4">
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-[#1E7B3A]" /> 수거 가능</div>
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-[#2563EB]" /> 예정</div>
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-[#D97706]" /> 제한</div>
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-[#DC2626]" /> 불가</div>
      </div>
    </div>
  );
}
