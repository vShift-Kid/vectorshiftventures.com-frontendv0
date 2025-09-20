import React, { useState, useEffect } from 'react';
import { Bug, CheckCircle, XCircle, RefreshCw } from 'lucide-react';

interface VapiDebuggerProps {
  hidden?: boolean;
}

const VapiDebugger: React.FC<VapiDebuggerProps> = ({ hidden = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [debugInfo, setDebugInfo] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  const runDiagnostics = async () => {
    setIsLoading(true);
    const info: any = {};

    try {
      // Test 1: Check if VAPI package is available
      info.vapiPackageAvailable = false;
      try {
        const vapiModule = await import('@vapi-ai/web');
        info.vapiPackageAvailable = true;
        info.vapiModule = vapiModule;
        info.vapiDefault = vapiModule.default;
        info.vapiType = typeof vapiModule.default;
      } catch (error: any) {
        info.vapiImportError = error.message;
      }

      // Test 2: Check environment variables
      info.envVars = {
        VITE_VAPI_API_KEY: !!import.meta.env.VITE_VAPI_API_KEY,
        VITE_VAPI_ASSISTANT_ID: !!import.meta.env.VITE_VAPI_ASSISTANT_ID,
        VITE_VAPI_PHONE_NUMBER_ID: !!import.meta.env.VITE_VAPI_PHONE_NUMBER_ID,
      };

      // Test 3: Check browser compatibility
      info.browser = {
        userAgent: navigator.userAgent,
        hasAudioContext: !!(window.AudioContext || (window as any).webkitAudioContext),
        hasMediaDevices: !!navigator.mediaDevices,
        hasGetUserMedia: !!navigator.mediaDevices?.getUserMedia,
        isSecureContext: window.isSecureContext,
        protocol: window.location.protocol,
      };

      // Test 4: Check microphone permissions
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        info.microphonePermission = 'granted';
        stream.getTracks().forEach(track => track.stop());
      } catch (error: any) {
        info.microphonePermission = error.message;
      }

      // Test 5: Check audio devices
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        info.audioDevices = {
          inputs: devices.filter(d => d.kind === 'audioinput').length,
          outputs: devices.filter(d => d.kind === 'audiooutput').length,
          total: devices.length,
        };
      } catch (error: any) {
        info.audioDevicesError = error.message;
      }

      // Test 6: Check VAPI API key validity
      if (import.meta.env.VITE_VAPI_API_KEY) {
        try {
          const response = await fetch('https://api.vapi.ai/assistant', {
            headers: {
              'Authorization': `Bearer ${import.meta.env.VITE_VAPI_API_KEY}`,
              'Content-Type': 'application/json'
            }
          });
          info.apiKeyValid = response.ok;
          info.apiKeyStatus = response.status;
          if (response.ok) {
            const assistants = await response.json();
            info.assistantsCount = assistants.length;
          } else {
            info.apiKeyError = await response.text();
          }
        } catch (error: any) {
          info.apiKeyError = error.message;
        }
      }

      // Test 7: Check if VAPI can be instantiated
      if (info.vapiPackageAvailable && info.vapiDefault) {
        try {
          const Vapi = info.vapiDefault;
          if (typeof Vapi === 'function') {
            info.vapiConstructor = 'function';
            // Don't actually create instance without API key
            if (import.meta.env.VITE_VAPI_API_KEY) {
              try {
                const vapiInstance = new Vapi(import.meta.env.VITE_VAPI_API_KEY);
                info.vapiInstanceCreated = true;
                info.vapiInstanceMethods = Object.getOwnPropertyNames(vapiInstance).length;
              } catch (error: any) {
                info.vapiInstanceError = error.message;
              }
            }
          } else {
            info.vapiConstructor = typeof Vapi;
          }
        } catch (error: any) {
          info.vapiInstantiationError = error.message;
        }
      }

    } catch (error: any) {
      info.generalError = error.message;
    }

    setDebugInfo(info);
    setIsLoading(false);
  };

  useEffect(() => {
    runDiagnostics();
  }, []);

  const getStatusIcon = (status: boolean | string) => {
    if (status === true) return <CheckCircle className="w-4 h-4 text-green-400" />;
    if (status === false) return <XCircle className="w-4 h-4 text-red-400" />;
    return <XCircle className="w-4 h-4 text-yellow-400" />;
  };

  const getStatusText = (status: boolean | string) => {
    if (status === true) return 'OK';
    if (status === false) return 'Failed';
    return 'Unknown';
  };

  return (
    <>
      {/* Debug Button */}
      {!hidden && (
        <div className="fixed bottom-6 left-6 z-50">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
            title="VAPI Debugger"
          >
            <Bug className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Debug Panel */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <Bug className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-mono font-semibold">VAPI Debugger</h3>
                    <p className="text-purple-100 text-sm">Diagnostic Information</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <div className="space-y-6">
                {/* VAPI Package Test */}
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="text-white font-mono font-semibold mb-3 flex items-center gap-2">
                    {getStatusIcon(debugInfo.vapiPackageAvailable)}
                    VAPI Package Import
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Package Available:</span>
                      <span className={debugInfo.vapiPackageAvailable ? 'text-green-400' : 'text-red-400'}>
                        {getStatusText(debugInfo.vapiPackageAvailable)}
                      </span>
                    </div>
                    {debugInfo.vapiImportError && (
                      <div className="text-red-400">
                        Error: {debugInfo.vapiImportError}
                      </div>
                    )}
                    {debugInfo.vapiType && (
                      <div className="text-gray-300">
                        Type: {debugInfo.vapiType}
                      </div>
                    )}
                  </div>
                </div>

                {/* Environment Variables Test */}
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="text-white font-mono font-semibold mb-3">Environment Variables</h4>
                  <div className="space-y-2 text-sm">
                    {Object.entries(debugInfo.envVars || {}).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-gray-400">{key}:</span>
                        <span className={value ? 'text-green-400' : 'text-red-400'}>
                          {value ? 'Set' : 'Missing'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Browser Compatibility Test */}
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="text-white font-mono font-semibold mb-3">Browser Compatibility</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Secure Context:</span>
                      <span className={debugInfo.browser?.isSecureContext ? 'text-green-400' : 'text-red-400'}>
                        {debugInfo.browser?.isSecureContext ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Protocol:</span>
                      <span className={debugInfo.browser?.protocol === 'https:' ? 'text-green-400' : 'text-red-400'}>
                        {debugInfo.browser?.protocol}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Audio Context:</span>
                      <span className={debugInfo.browser?.hasAudioContext ? 'text-green-400' : 'text-red-400'}>
                        {debugInfo.browser?.hasAudioContext ? 'Available' : 'Not Available'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Media Devices:</span>
                      <span className={debugInfo.browser?.hasMediaDevices ? 'text-green-400' : 'text-red-400'}>
                        {debugInfo.browser?.hasMediaDevices ? 'Available' : 'Not Available'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Microphone Test */}
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="text-white font-mono font-semibold mb-3">Microphone Access</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Permission:</span>
                      <span className={debugInfo.microphonePermission === 'granted' ? 'text-green-400' : 'text-red-400'}>
                        {debugInfo.microphonePermission === 'granted' ? 'Granted' : 'Denied'}
                      </span>
                    </div>
                    {debugInfo.microphonePermission !== 'granted' && (
                      <div className="text-red-400">
                        Error: {debugInfo.microphonePermission}
                      </div>
                    )}
                  </div>
                </div>

                {/* Audio Devices Test */}
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="text-white font-mono font-semibold mb-3">Audio Devices</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Input Devices:</span>
                      <span className="text-gray-300">{debugInfo.audioDevices?.inputs || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Output Devices:</span>
                      <span className="text-gray-300">{debugInfo.audioDevices?.outputs || 0}</span>
                    </div>
                    {debugInfo.audioDevicesError && (
                      <div className="text-red-400">
                        Error: {debugInfo.audioDevicesError}
                      </div>
                    )}
                  </div>
                </div>

                {/* API Key Test */}
                {debugInfo.envVars?.VITE_VAPI_API_KEY && (
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h4 className="text-white font-mono font-semibold mb-3">API Key Validation</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Valid:</span>
                        <span className={debugInfo.apiKeyValid ? 'text-green-400' : 'text-red-400'}>
                          {debugInfo.apiKeyValid ? 'Yes' : 'No'}
                        </span>
                      </div>
                      {debugInfo.apiKeyStatus && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Status:</span>
                          <span className="text-gray-300">{debugInfo.apiKeyStatus}</span>
                        </div>
                      )}
                      {debugInfo.assistantsCount !== undefined && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Assistants:</span>
                          <span className="text-gray-300">{debugInfo.assistantsCount}</span>
                        </div>
                      )}
                      {debugInfo.apiKeyError && (
                        <div className="text-red-400">
                          Error: {debugInfo.apiKeyError}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* VAPI Instance Test */}
                {debugInfo.vapiPackageAvailable && (
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h4 className="text-white font-mono font-semibold mb-3">VAPI Instance</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Constructor:</span>
                        <span className="text-gray-300">{debugInfo.vapiConstructor || 'Unknown'}</span>
                      </div>
                      {debugInfo.vapiInstanceCreated !== undefined && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Instance Created:</span>
                          <span className={debugInfo.vapiInstanceCreated ? 'text-green-400' : 'text-red-400'}>
                            {debugInfo.vapiInstanceCreated ? 'Yes' : 'No'}
                          </span>
                        </div>
                      )}
                      {debugInfo.vapiInstanceMethods && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Methods:</span>
                          <span className="text-gray-300">{debugInfo.vapiInstanceMethods}</span>
                        </div>
                      )}
                      {debugInfo.vapiInstanceError && (
                        <div className="text-red-400">
                          Error: {debugInfo.vapiInstanceError}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* General Error */}
                {debugInfo.generalError && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                    <h4 className="text-red-400 font-mono font-semibold mb-2">General Error</h4>
                    <div className="text-red-300 text-sm">{debugInfo.generalError}</div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="mt-6 flex gap-3">
                <button
                  onClick={runDiagnostics}
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg font-mono text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <RefreshCw className="w-4 h-4" />
                  )}
                  {isLoading ? 'Running...' : 'Run Diagnostics'}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-mono text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VapiDebugger;
