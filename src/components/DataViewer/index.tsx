import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { RefreshCw, Loader2, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

interface DataViewerProps {
  children: React.ReactNode;
  isLoading: boolean;
  isError: boolean;
  lastUpdated?: Date;
  onRefresh?: () => void;
  className?: string;
  skeletonUI?: React.ReactNode;
}

export function DataViewer({
  children,
  isLoading,
  isError,
  lastUpdated,
  onRefresh,
  className = '',
  skeletonUI,
}: DataViewerProps) {
  const [loadingTimeMs, setLoadingTimeMs] = useState(0);
  const [isStale, setIsStale] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingTimeMs((prev) => prev + 100);
      }, 100);
    } else {
      setLoadingTimeMs(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLoading]);

  // 4s 지연시 지연 안내 및 캐시 처리
  useEffect(() => {
    if (loadingTimeMs >= 4000 && isLoading) {
      setIsStale(true);
    } else if (!isLoading && !isError) {
      setIsStale(false);
    }
  }, [loadingTimeMs, isLoading, isError]);

  const formattedDate = lastUpdated 
    ? format(lastUpdated, 'yyyy-MM-dd HH:mm') 
    : '';

  const renderLoading = () => {
    // 300ms 초과 시 skeleton 노출, 그 이하는 spinner
    if (loadingTimeMs > 300) {
      return (
        <div className="w-full h-full min-h-[100px] flex items-center justify-center">
          {skeletonUI || <Skeleton className="w-full h-full min-h-[100px] rounded-md" />}
        </div>
      );
    }
    
    // 짧은 로딩은 스피너
    return (
      <div className="w-full h-full min-h-[100px] flex items-center justify-center bg-background/50 absolute inset-0 z-10 backdrop-blur-sm">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  };

  if (isError) {
    return (
      <div className={`w-full p-6 flex flex-col items-center justify-center border border-danger-border bg-danger-bg text-danger-fg rounded-md ${className}`}>
        <AlertCircle className="w-8 h-8 mb-2" />
        <p className="mb-4 text-sm">데이터를 불러오는 중 문제가 발생했습니다.</p>
        <div className="flex gap-2">
          {lastUpdated && (
            <Badge variant="outline" className="bg-info-tint text-info-foreground">
              캐시 데이터 (마지막 업데이트: {formattedDate})
            </Badge>
          )}
          {onRefresh && (
            <Button variant="outline" size="sm" onClick={onRefresh}>
              <RefreshCw className="w-4 h-4 mr-2" />
              재시도
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full ${className}`}>
      {/* 캐시 데이터 배너 / 지연 경고 */}
      {(isStale || (lastUpdated && !isLoading && isStale)) && (
        <div className="flex items-center justify-between mb-4 p-3 bg-info-tint text-info-foreground rounded-md text-sm border border-info-strong">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-info text-info-foreground">캐시 데이터</Badge>
            <span>
              {isStale && isLoading ? '응답이 지연되고 있습니다. ' : ''}
              마지막 업데이트: {formattedDate}
            </span>
          </div>
          {onRefresh && (
            <Button variant="ghost" size="sm" onClick={onRefresh} disabled={isLoading} className="text-info-foreground hover:bg-info-hover/10">
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              새로고침
            </Button>
          )}
        </div>
      )}

      <div className="relative">
        {/* Child Content */}
        <div className={isLoading && loadingTimeMs > 300 ? 'hidden' : 'block'}>
          {children}
        </div>
        
        {/* Loading Overlay / Skeleton */}
        {isLoading && renderLoading()}
      </div>
    </div>
  );
}
