/**
 * Google Sheets API Service
 * Direct integration with Google Sheets for form submissions
 */

interface FormSubmissionData {
  contactInfo: {
    name: string;
    email: string;
    phone: string;
  };
  businessInfo: {
    companyName: string;
    industry: string;
    website: string;
    businessDescription: string;
  };
  consultationPackage: string;
  scheduling: {
    preferredDate: string;
    preferredTime: string;
  };
  voiceAgentCustomization: {
    useCase: string;
    targetUsers: string;
    languageStyle: string;
    interactionMode: string;
    industryContext: string;
  };
  uploadedFiles: Array<{
    name: string;
    size: number;
    type: string;
    lastModified: number;
  }>;
  source: string;
  submittedAt: string;
}

class GoogleSheetsService {
  private spreadsheetId: string = '1ETDI-dl3cMhr53Xx19WB9bmhJCoQf4rlGMiwPSp7qhU';
  private apiKey: string;
  private baseUrl: string = 'https://sheets.googleapis.com/v4/spreadsheets';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Submit form data directly to Google Sheets
   */
  async submitFormData(data: FormSubmissionData): Promise<{ success: boolean; message: string; rowNumber?: number }> {
    try {
      // Prepare the row data
      const rowData = this.prepareRowData(data);
      
      // Append to the sheet
      const response = await fetch(
        `${this.baseUrl}/${this.spreadsheetId}/values/Sheet1!A:U:append?valueInputOption=RAW&key=${this.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            values: [rowData]
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Google Sheets API error: ${errorData.error?.message || 'Unknown error'}`);
      }

      const result = await response.json();
      const rowNumber = result.updates?.updatedRange?.match(/Sheet1!A(\d+):U\d+/)?.[1];

      return {
        success: true,
        message: 'Form submitted successfully to Google Sheets',
        rowNumber: rowNumber ? parseInt(rowNumber) : undefined
      };

    } catch (error) {
      console.error('Google Sheets submission error:', error);
      return {
        success: false,
        message: `Failed to submit to Google Sheets: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  /**
   * Prepare row data for Google Sheets
   */
  private prepareRowData(data: FormSubmissionData): string[] {
    const timestamp = new Date().toISOString();
    const fileNames = data.uploadedFiles.map(file => file.name).join(', ');
    const fileCount = data.uploadedFiles.length;
    const totalFileSize = data.uploadedFiles.reduce((sum, file) => sum + file.size, 0);

    return [
      timestamp, // A: Timestamp
      data.contactInfo.name, // B: Name
      data.contactInfo.email, // C: Email
      data.contactInfo.phone, // D: Phone
      data.businessInfo.companyName, // E: Company
      data.businessInfo.industry, // F: Industry
      data.businessInfo.businessDescription, // G: Business Description
      data.consultationPackage, // H: Consultation Package
      data.scheduling.preferredDate, // I: Preferred Date
      data.scheduling.preferredTime, // J: Preferred Time
      data.voiceAgentCustomization.useCase, // K: Use Case
      data.voiceAgentCustomization.targetUsers, // L: Target Users
      data.voiceAgentCustomization.languageStyle, // M: Language & Style
      data.voiceAgentCustomization.interactionMode, // N: Interaction Mode
      data.voiceAgentCustomization.industryContext, // O: Industry Context
      fileCount.toString(), // P: Files Uploaded
      fileNames, // Q: File Names
      totalFileSize.toString(), // R: Total File Size (bytes)
      data.source, // S: Source
      data.submittedAt, // T: Submitted At
      'Direct API' // U: Integration Method
    ];
  }

  /**
   * Get the current sheet data (for testing)
   */
  async getSheetData(range: string = 'Sheet1!A1:U10'): Promise<any> {
    try {
      const response = await fetch(
        `${this.baseUrl}/${this.spreadsheetId}/values/${range}?key=${this.apiKey}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch sheet data: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching sheet data:', error);
      throw error;
    }
  }
}

export default GoogleSheetsService;
export type { FormSubmissionData };
