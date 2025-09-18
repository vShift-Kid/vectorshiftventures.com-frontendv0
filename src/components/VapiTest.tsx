import React, { useState, useEffect } from 'react';

const VapiTest: React.FC = () => {
  const [envVars, setEnvVars] = useState<any>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check environment variables
    const apiKey = import.meta.env.VITE_VAPI_API_KEY;
    const assistantId = import.meta.env.VITE_VAPI_ASSISTANT_ID;
    
    setEnvVars({
      apiKey: apiKey || 'NOT_SET',
      assistantId: assistantId || 'NOT_SET',
      apiKeyLength: apiKey ? apiKey.length : 0,
      assistantIdLength: assistantId ? assistantId.length : 0
    });

    if (!apiKey || apiKey === 'your-api-key-here') {
      setError('VAPI API key not configured');
    } else if (!assistantId || assistantId === 'your-assistant-id-here') {
      setError('VAPI Assistant ID not configured');
    }
  }, []);

  return (
    <div className="fixed top-4 right-4 bg-black/80 text-white p-4 rounded-lg max-w-sm z-50">
      <h3 className="font-mono font-bold mb-2">VAPI Debug Info</h3>
      <div className="text-xs space-y-1">
        <div>API Key: {envVars.apiKeyLength > 0 ? `Set (${envVars.apiKeyLength} chars)` : 'NOT_SET'}</div>
        <div>Assistant ID: {envVars.assistantIdLength > 0 ? `Set (${envVars.assistantIdLength} chars)` : 'NOT_SET'}</div>
        {error && <div className="text-red-400">Error: {error}</div>}
        <div className="text-gray-400 mt-2">
          API Key starts with: {envVars.apiKey?.substring(0, 8)}...
        </div>
        <div className="text-gray-400">
          Assistant ID: {envVars.assistantId?.substring(0, 8)}...
        </div>
      </div>
    </div>
  );
};

export default VapiTest;
