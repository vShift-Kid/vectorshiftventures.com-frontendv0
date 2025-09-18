/**
 * VAPI MCP (Model Context Protocol) Integration
 * Enhanced phone calling functionality with MCP capabilities
 */

export interface VapiMCPConfig {
  apiKey: string;
  assistantId: string;
  mcpServerUrl?: string;
  enablePhoneCalls?: boolean;
  enableSMS?: boolean;
  enableEmail?: boolean;
}

export interface CallData {
  id: string;
  phoneNumber: string;
  duration?: number;
  status: 'initiated' | 'ringing' | 'answered' | 'completed' | 'failed';
  transcript?: string;
  recordingUrl?: string;
  timestamp: Date;
}

export interface MCPTool {
  name: string;
  description: string;
  parameters: Record<string, any>;
  serverUrl: string;
}

export class VapiMCPClient {
  private config: VapiMCPConfig;
  private vapi: any = null;
  private mcpTools: MCPTool[] = [];

  constructor(config: VapiMCPConfig) {
    this.config = {
      mcpServerUrl: 'https://mcp.vapi.ai/mcp',
      enablePhoneCalls: true,
      enableSMS: false,
      enableEmail: false,
      ...config
    };
  }

  async initialize(): Promise<void> {
    if (typeof window === 'undefined') return;

    try {
      const { default: Vapi } = await import('@vapi-ai/web');
      this.vapi = new Vapi(this.config.apiKey);
      
      // Set up MCP tools
      await this.setupMCPTools();
      
      // Configure event listeners
      this.setupEventListeners();
      
      console.log('VAPI MCP Client initialized successfully');
    } catch (error) {
      console.error('Failed to initialize VAPI MCP Client:', error);
      throw error;
    }
  }

  private async setupMCPTools(): Promise<void> {
    // Phone calling tool
    if (this.config.enablePhoneCalls) {
      this.mcpTools.push({
        name: 'make_phone_call',
        description: 'Initiate a phone call to a customer or prospect',
        parameters: {
          phoneNumber: { type: 'string', required: true },
          purpose: { type: 'string', required: false },
          customerName: { type: 'string', required: false }
        },
        serverUrl: this.config.mcpServerUrl!
      });
    }

    // SMS tool
    if (this.config.enableSMS) {
      this.mcpTools.push({
        name: 'send_sms',
        description: 'Send an SMS message to a customer',
        parameters: {
          phoneNumber: { type: 'string', required: true },
          message: { type: 'string', required: true }
        },
        serverUrl: this.config.mcpServerUrl!
      });
    }

    // Email tool
    if (this.config.enableEmail) {
      this.mcpTools.push({
        name: 'send_email',
        description: 'Send an email to a customer or prospect',
        parameters: {
          email: { type: 'string', required: true },
          subject: { type: 'string', required: true },
          body: { type: 'string', required: true }
        },
        serverUrl: this.config.mcpServerUrl!
      });
    }
  }

  private setupEventListeners(): void {
    if (!this.vapi) return;

    this.vapi.on('call-start', (data: any) => {
      console.log('MCP Call started:', data);
    });

    this.vapi.on('call-end', (data: any) => {
      console.log('MCP Call ended:', data);
    });

    this.vapi.on('speech-start', (data: any) => {
      console.log('MCP Speech started:', data);
    });

    this.vapi.on('speech-end', (data: any) => {
      console.log('MCP Speech ended:', data);
    });

    this.vapi.on('message', (data: any) => {
      console.log('MCP Message received:', data);
    });

    this.vapi.on('error', (error: any) => {
      console.error('MCP Error:', error);
    });
  }

  async startCall(assistantId?: string): Promise<void> {
    if (!this.vapi) {
      throw new Error('VAPI MCP Client not initialized');
    }

    const config = {
      assistantId: assistantId || this.config.assistantId,
      tools: this.mcpTools
    };

    await this.vapi.start(config);
  }

  async stopCall(): Promise<void> {
    if (!this.vapi) return;
    await this.vapi.stop();
  }

  async makePhoneCall(phoneNumber: string, purpose?: string): Promise<CallData> {
    if (!this.config.enablePhoneCalls) {
      throw new Error('Phone calls are not enabled');
    }

    const callData: CallData = {
      id: `call_${Date.now()}`,
      phoneNumber,
      status: 'initiated',
      timestamp: new Date()
    };

    try {
      // This would integrate with VAPI's phone calling capabilities
      // For now, we'll simulate the call initiation
      console.log(`Initiating phone call to ${phoneNumber} for purpose: ${purpose || 'general inquiry'}`);
      
      // In a real implementation, this would use VAPI's phone calling API
      // await this.vapi.makePhoneCall(phoneNumber, { purpose });
      
      return callData;
    } catch (error) {
      callData.status = 'failed';
      throw error;
    }
  }

  async sendSMS(phoneNumber: string, message: string): Promise<void> {
    if (!this.config.enableSMS) {
      throw new Error('SMS is not enabled');
    }

    // This would integrate with VAPI's SMS capabilities
    console.log(`Sending SMS to ${phoneNumber}: ${message}`);
    
    // In a real implementation, this would use VAPI's SMS API
    // await this.vapi.sendSMS(phoneNumber, message);
  }

  async sendEmail(email: string, subject: string, body: string): Promise<void> {
    if (!this.config.enableEmail) {
      throw new Error('Email is not enabled');
    }

    // This would integrate with VAPI's email capabilities
    console.log(`Sending email to ${email}: ${subject}`);
    
    // In a real implementation, this would use VAPI's email API
    // await this.vapi.sendEmail(email, subject, body);
  }

  getMCPTools(): MCPTool[] {
    return this.mcpTools;
  }

  isInitialized(): boolean {
    return this.vapi !== null;
  }
}

// Default configuration
export const defaultVapiMCPConfig: VapiMCPConfig = {
  apiKey: '349dbab8-5f4e-4c16-a1a7-5dce7e63d512',
  assistantId: '94189137-6370-4561-a03f-a69e22fd29de',
  enablePhoneCalls: true,
  enableSMS: true,
  enableEmail: true
};

// Singleton instance
let vapiMCPInstance: VapiMCPClient | null = null;

export const getVapiMCPClient = (config?: Partial<VapiMCPConfig>): VapiMCPClient => {
  if (!vapiMCPInstance) {
    vapiMCPInstance = new VapiMCPClient({
      ...defaultVapiMCPConfig,
      ...config
    });
  }
  return vapiMCPInstance;
};
