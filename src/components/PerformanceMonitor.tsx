import React, { useEffect, useState } from 'react';
import { Activity, Zap, Clock, Wifi } from 'lucide-react';

interface PerformanceMetrics {
  loadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  firstInputDelay: number;
  cumulativeLayoutShift: number;
  connectionType: string;
  effectiveType: string;
}

const PerformanceMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development or if performance monitoring is enabled
    const isDev = import.meta.env.DEV;
    const isMonitoringEnabled = import.meta.env.VITE_ENABLE_PERFORMANCE_MONITORING === 'true';
    
    if (!isDev && !isMonitoringEnabled) return;

    const measurePerformance = () => {
      if (!('performance' in window)) return;

      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paintEntries = performance.getEntriesByType('paint');
      
      const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
      const firstContentfulPaint = paintEntries.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0;
      const largestContentfulPaint = paintEntries.find(entry => entry.name === 'largest-contentful-paint')?.startTime || 0;

      // Get connection info
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
      const connectionType = connection?.type || 'unknown';
      const effectiveType = connection?.effectiveType || 'unknown';

      setMetrics({
        loadTime,
        firstContentfulPaint,
        largestContentfulPaint,
        firstInputDelay: 0, // Would need to measure this separately
        cumulativeLayoutShift: 0, // Would need to measure this separately
        connectionType,
        effectiveType,
      });
    };

    // Measure after page load
    if (document.readyState === 'complete') {
      measurePerformance();
    } else {
      window.addEventListener('load', measurePerformance);
    }

    // Show performance monitor after 3 seconds in dev mode
    if (isDev) {
      const timer = setTimeout(() => setIsVisible(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!metrics || !isVisible) return null;

  const getPerformanceScore = (value: number, thresholds: { good: number; poor: number }) => {
    if (value <= thresholds.good) return 'good';
    if (value <= thresholds.poor) return 'needs-improvement';
    return 'poor';
  };

  const getScoreColor = (score: string) => {
    switch (score) {
      case 'good': return 'text-green-400';
      case 'needs-improvement': return 'text-yellow-400';
      case 'poor': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const loadScore = getPerformanceScore(metrics.loadTime, { good: 1000, poor: 3000 });
  const fcpScore = getPerformanceScore(metrics.firstContentfulPaint, { good: 1800, poor: 3000 });
  const lcpScore = getPerformanceScore(metrics.largestContentfulPaint, { good: 2500, poor: 4000 });

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg p-4 max-w-xs">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400" />
          <span className="text-sm font-mono font-semibold text-white">Performance</span>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white text-xs"
        >
          ×
        </button>
      </div>
      
      <div className="space-y-2 text-xs">
        <div className="flex justify-between items-center">
          <span className="text-gray-400 font-mono">Load Time:</span>
          <span className={`font-mono ${getScoreColor(loadScore)}`}>
            {metrics.loadTime.toFixed(0)}ms
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-400 font-mono">FCP:</span>
          <span className={`font-mono ${getScoreColor(fcpScore)}`}>
            {metrics.firstContentfulPaint.toFixed(0)}ms
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-400 font-mono">LCP:</span>
          <span className={`font-mono ${getScoreColor(lcpScore)}`}>
            {metrics.largestContentfulPaint.toFixed(0)}ms
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-400 font-mono">Connection:</span>
          <span className="text-cyan-400 font-mono">
            {metrics.effectiveType}
          </span>
        </div>
        
        <div className="pt-2 border-t border-gray-700">
          <div className="flex items-center gap-1 text-gray-500">
            <Wifi className="w-3 h-3" />
            <span className="font-mono text-xs">
              {metrics.connectionType}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMonitor;
