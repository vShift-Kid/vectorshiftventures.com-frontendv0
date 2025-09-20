import React, { useState, useEffect } from 'react';
import { BarChart3, Phone, PhoneCall, Clock, CheckCircle, XCircle, TrendingUp, Users, DollarSign, Activity } from 'lucide-react';

interface CallData {
  id: string;
  status: string;
  purpose: string;
  duration?: number;
  cost?: number;
  createdAt: string;
  startedAt?: string;
  endedAt?: string;
}

interface AnalyticsData {
  totalCalls: number;
  successfulCalls: number;
  failedCalls: number;
  totalDuration: number;
  averageCallDuration: number;
  activeCalls: number;
  callsByPurpose: Record<string, number>;
  callsByStatus: Record<string, number>;
  hourlyStats: Record<string, number>;
  dailyStats: Record<string, number>;
}

interface CallAnalyticsProps {
  hidden?: boolean;
}

const CallAnalytics: React.FC<CallAnalyticsProps> = ({ hidden = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [calls, setCalls] = useState<CallData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const webhookUrl = import.meta.env.VITE_WEBHOOK_URL || 'http://localhost:3001';

  useEffect(() => {
    if (isOpen) {
      fetchAnalytics();
      fetchRecentCalls();
    }
  }, [isOpen]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${webhookUrl}/api/analytics`);
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      } else {
        throw new Error('Failed to fetch analytics');
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setError('Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentCalls = async () => {
    try {
      const response = await fetch(`${webhookUrl}/api/calls?limit=10`);
      if (response.ok) {
        const data = await response.json();
        setCalls(data.calls);
      }
    } catch (error) {
      console.error('Error fetching calls:', error);
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
      case 'ended':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'failed':
      case 'error':
        return <XCircle className="w-4 h-4 text-red-400" />;
      case 'started':
      case 'answered':
        return <Phone className="w-4 h-4 text-blue-400" />;
      case 'ringing':
        return <PhoneCall className="w-4 h-4 text-yellow-400 animate-pulse" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'ended':
        return 'text-green-400';
      case 'failed':
      case 'error':
        return 'text-red-400';
      case 'started':
      case 'answered':
        return 'text-blue-400';
      case 'ringing':
        return 'text-yellow-400';
      default:
        return 'text-gray-400';
    }
  };

  if (!isOpen) {
    return hidden ? null : (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-20 z-50 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
        title="View Call Analytics"
      >
        <BarChart3 className="w-5 h-5" />
        <span className="font-mono text-sm font-semibold">Analytics</span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-mono font-semibold text-xl">Call Analytics Dashboard</h3>
                <p className="text-purple-100 text-sm">VectorShift Ventures AI Sales Agent</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <XCircle className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
              <p className="text-red-400 font-mono">{error}</p>
              <button
                onClick={fetchAnalytics}
                className="mt-4 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-mono"
              >
                Retry
              </button>
            </div>
          ) : analytics ? (
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-400 font-mono text-sm">Total Calls</p>
                      <p className="text-white font-mono text-2xl font-bold">{analytics.totalCalls}</p>
                    </div>
                    <Phone className="w-8 h-8 text-blue-400" />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-400 font-mono text-sm">Success Rate</p>
                      <p className="text-white font-mono text-2xl font-bold">
                        {analytics.totalCalls > 0 ? Math.round((analytics.successfulCalls / analytics.totalCalls) * 100) : 0}%
                      </p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-400 font-mono text-sm">Avg Duration</p>
                      <p className="text-white font-mono text-2xl font-bold">
                        {formatDuration(analytics.averageCallDuration)}
                      </p>
                    </div>
                    <Clock className="w-8 h-8 text-purple-400" />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-yellow-400 font-mono text-sm">Active Calls</p>
                      <p className="text-white font-mono text-2xl font-bold">{analytics.activeCalls}</p>
                    </div>
                    <Activity className="w-8 h-8 text-yellow-400" />
                  </div>
                </div>
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Calls by Purpose */}
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <h4 className="text-white font-mono font-semibold mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-purple-400" />
                    Calls by Purpose
                  </h4>
                  <div className="space-y-3">
                    {Object.entries(analytics.callsByPurpose).map(([purpose, count]) => (
                      <div key={purpose} className="flex items-center justify-between">
                        <span className="text-gray-300 font-mono text-sm capitalize">
                          {purpose.replace('_', ' ')}
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-purple-400 h-2 rounded-full" 
                              style={{ width: `${(count / analytics.totalCalls) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-white font-mono text-sm w-8 text-right">{count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Calls by Status */}
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <h4 className="text-white font-mono font-semibold mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-400" />
                    Calls by Status
                  </h4>
                  <div className="space-y-3">
                    {Object.entries(analytics.callsByStatus).map(([status, count]) => (
                      <div key={status} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(status)}
                          <span className="text-gray-300 font-mono text-sm capitalize">
                            {status.replace('_', ' ')}
                          </span>
                        </div>
                        <span className={`font-mono text-sm ${getStatusColor(status)}`}>{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Calls */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <h4 className="text-white font-mono font-semibold mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-green-400" />
                  Recent Calls
                </h4>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {calls.map((call) => (
                    <div key={call.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(call.status)}
                        <div>
                          <p className="text-white font-mono text-sm">Call {call.id.substring(0, 8)}...</p>
                          <p className="text-gray-400 font-mono text-xs">
                            {call.purpose.replace('_', ' ')} • {new Date(call.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-mono text-sm ${getStatusColor(call.status)}`}>
                          {call.status.replace('_', ' ')}
                        </p>
                        {call.duration && (
                          <p className="text-gray-400 font-mono text-xs">
                            {formatDuration(call.duration)}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CallAnalytics;
