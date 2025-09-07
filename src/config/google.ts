/**
 * Google API Configuration
 * Store your Google API keys here
 */

// Google Sheets API Key
// Get this from: https://console.cloud.google.com/apis/credentials
export const GOOGLE_SHEETS_API_KEY = process.env.VITE_GOOGLE_SHEETS_API_KEY || '';

// Google Drive API Key (if needed for file uploads)
export const GOOGLE_DRIVE_API_KEY = process.env.VITE_GOOGLE_DRIVE_API_KEY || '';

// Google Sheets Spreadsheet ID
export const SPREADSHEET_ID = '1ETDI-dl3cMhr53Xx19WB9bmhJCoQf4rlGMiwPSp7qhU';

// Configuration validation
export const validateGoogleConfig = (): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!GOOGLE_SHEETS_API_KEY) {
    errors.push('Google Sheets API key is required');
  }
  
  if (!SPREADSHEET_ID) {
    errors.push('Spreadsheet ID is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};
