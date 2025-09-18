import React, { useState } from 'react';
import { Settings, Copy, Check, ExternalLink, Zap, Wrench, Code } from 'lucide-react';
import { getVapiMCPClient } from '../lib/vapiMCP';

const VapiMCPConfig: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<'zapier' | 'make' | 'composio' | 'vapi'>('zapier');

  const vapiMCPClient = getVapiMCPClient();
  const mcpConfig = vapiMCPClient.getMCPToolConfiguration();

  const copyToClipboard = async (text: string, item: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(item);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const mcpProviders = [
    {
      id: 'zapier',
      name: 'Zapier MCP',
      description: 'Access 7,000+ apps and 30,000+ actions',
      url: 'https://mcp.zapier.com/mcp/?client=vapi',
      icon: Zap,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'make',
      name: 'Make MCP',
      description: 'Build custom tools with business logic',
      url: 'https://www.make.com/en/help/api-access/mcp-token',
      icon: Wrench,
      color: 'from-blue-500 to-purple-500'
    },
    {
      id: 'composio',
      name: 'Composio MCP',
      description: 'Connect to various tools and services',
      url: 'https://mcp.composio.dev/dashboard',
      icon: Code,
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 'vapi',
      name: 'VAPI MCP Server',
      description: 'Use VAPI APIs as callable tools',
      url: 'https://docs.vapi.ai/sdk/mcp-server',
      icon: Settings,
      color: 'from-cyan-500 to-blue-500'
    }
  ];

  const selectedProviderInfo = mcpProviders.find(p => p.id === selectedProvider);

  return (
    <>
      {/* Configuration Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-32 z-50 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
        title="Configure VAPI MCP Tools"
      >
        <Settings className="w-5 h-5" />
        <span className="font-mono text-sm font-semibold">MCP Config</span>
      </button>

      {/* Configuration Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-[#0A0B1E] border border-purple-500/30 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-6 py-4 rounded-t-2xl border-b border-purple-500/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Settings className="w-6 h-6 text-purple-400" />
                  <h3 className="text-white font-mono font-semibold text-lg">VAPI MCP Configuration</h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Check className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Provider Selection */}
              <div>
                <h4 className="text-white font-mono font-semibold mb-4">Select MCP Provider</h4>
                <div className="grid grid-cols-2 gap-4">
                  {mcpProviders.map((provider) => {
                    const Icon = provider.icon;
                    return (
                      <button
                        key={provider.id}
                        onClick={() => setSelectedProvider(provider.id as any)}
                        className={`p-4 rounded-lg border transition-all ${
                          selectedProvider === provider.id
                            ? 'border-purple-500 bg-purple-500/10'
                            : 'border-gray-600 hover:border-purple-400'
                        }`}
                      >
                        <div className={`w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r ${provider.color} flex items-center justify-center`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h5 className="text-white font-mono font-semibold text-sm mb-1">{provider.name}</h5>
                        <p className="text-gray-400 font-mono text-xs">{provider.description}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Provider Instructions */}
              {selectedProviderInfo && (
                <div className="bg-gray-800/30 border border-gray-600 rounded-lg p-4">
                  <h5 className="text-white font-mono font-semibold mb-3 flex items-center gap-2">
                    <selectedProviderInfo.icon className="w-5 h-5 text-purple-400" />
                    {selectedProviderInfo.name} Setup
                  </h5>
                  <div className="space-y-3">
                    <div>
                      <p className="text-gray-300 font-mono text-sm mb-2">1. Visit the provider dashboard:</p>
                      <div className="flex items-center gap-2">
                        <a
                          href={selectedProviderInfo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-400 hover:text-purple-300 font-mono text-sm flex items-center gap-1"
                        >
                          {selectedProviderInfo.url}
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-300 font-mono text-sm mb-2">2. Generate your MCP server URL</p>
                      <p className="text-gray-400 font-mono text-xs">Follow the provider's instructions to get your MCP server URL</p>
                    </div>
                    <div>
                      <p className="text-gray-300 font-mono text-sm mb-2">3. Add the MCP tool to your VAPI assistant</p>
                      <p className="text-gray-400 font-mono text-xs">Use the configuration below in your VAPI dashboard</p>
                    </div>
                  </div>
                </div>
              )}

              {/* MCP Tool Configuration */}
              <div>
                <h4 className="text-white font-mono font-semibold mb-4">MCP Tool Configuration</h4>
                <div className="bg-gray-800/30 border border-gray-600 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-gray-300 font-mono text-sm">Copy this configuration for your VAPI dashboard:</p>
                    <button
                      onClick={() => copyToClipboard(JSON.stringify(mcpConfig, null, 2), 'config')}
                      className="flex items-center gap-1 text-purple-400 hover:text-purple-300 font-mono text-xs"
                    >
                      {copiedItem === 'config' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copiedItem === 'config' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <pre className="bg-black/50 rounded p-3 overflow-x-auto">
                    <code className="text-green-400 font-mono text-xs">
                      {JSON.stringify(mcpConfig, null, 2)}
                    </code>
                  </pre>
                </div>
              </div>

              {/* VAPI Dashboard Instructions */}
              <div>
                <h4 className="text-white font-mono font-semibold mb-4">VAPI Dashboard Setup</h4>
                <div className="space-y-3 text-gray-300 font-mono text-sm">
                  <div className="flex items-start gap-3">
                    <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">1</span>
                    <p>Go to <strong>Dashboard → Tools</strong> page</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">2</span>
                    <p>Click <strong>Create Tool</strong> button</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">3</span>
                    <p>Select <strong>MCP</strong> from available options</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">4</span>
                    <p>Paste the configuration above and add your MCP server URL</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">5</span>
                    <p>Go to <strong>Dashboard → Assistants</strong> and add the tool to your assistant</p>
                  </div>
                </div>
              </div>

              {/* Current Configuration */}
              <div>
                <h4 className="text-white font-mono font-semibold mb-4">Current Configuration</h4>
                <div className="bg-gray-800/30 border border-gray-600 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 font-mono text-sm">Assistant ID:</span>
                    <span className="text-white font-mono text-sm">94189137-6370-4561-a03f-a69e22fd29de</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 font-mono text-sm">Protocol:</span>
                    <span className="text-white font-mono text-sm">Streamable HTTP (shttp)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 font-mono text-sm">MCP Server:</span>
                    <span className="text-white font-mono text-sm">https://mcp.vapi.ai/mcp</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VapiMCPConfig;
