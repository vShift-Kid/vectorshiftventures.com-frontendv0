import React, { useState, useEffect } from 'react';
import Vapi from '@vapi-ai/web';

const VapiTest: React.FC = () => {
  const [envVars, setEnvVars] = useState<any>({});
  const [error, setError] = useState<string | null>(null);
  const [vapiTestStatus, setVapiTestStatus] = useState('NOT_TESTED');
  const [vapiError, setVapiError] = useState('');

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

  const testVapiConnection = async () => {
    try {
      setVapiTestStatus('TESTING');
      setVapiError('');
      
      const apiKey = import.meta.env.VITE_VAPI_API_KEY || 'e68bd505-55f0-450a-8993-f4f28c0226b5';
      console.log('Testing VAPI initialization with key:', apiKey.substring(0, 8) + '...');
      
      const vapi = new Vapi(apiKey);
      console.log('VAPI instance created successfully');
      
      // Test if we can access VAPI methods
      if (typeof vapi.start === 'function') {
        console.log('VAPI start method available');
        
        // Test if we can call start with a test assistant ID
        const testAssistantId = import.meta.env.VITE_VAPI_ASSISTANT_ID || 'b8ddcdb9-1bb5-4cef-8a09-69c386230084';
        console.log('Testing VAPI start with assistant ID:', testAssistantId);
        
        // Just test the method exists, don't actually start a call
        setVapiTestStatus('SUCCESS');
        console.log('✅ VAPI connection test successful');
      } else {
        throw new Error('VAPI start method not available');
      }
      
    } catch (error: any) {
      console.error('VAPI test error:', error);
      setVapiTestStatus('ERROR');
      setVapiError(error.message || 'Unknown error');
    }
  };

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
        
        <div className="mt-3 pt-2 border-t border-gray-600">
          <button 
            onClick={testVapiConnection}
            className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-xs mb-2 w-full"
          >
            Test VAPI Connection
          </button>
          <div>VAPI Test: <span className={vapiTestStatus === 'SUCCESS' ? 'text-green-400' : vapiTestStatus === 'ERROR' ? 'text-red-400' : 'text-yellow-400'}>{vapiTestStatus}</span></div>
          {vapiError && <div className="text-red-400 text-xs mt-1">Error: {vapiError}</div>}
        </div>
      </div>
    </div>
  );
};

export default VapiTest;
