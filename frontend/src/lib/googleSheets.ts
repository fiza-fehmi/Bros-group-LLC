/**
 * Google Sheets Integration Helper
 * Safely forwards website form submissions to Google Sheets via server-side handler or Apps Script Web App.
 */

export interface GoogleSheetsPayload {
  formType: string;
  timestamp?: string;
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  details?: string;
  link?: string;
  rawParams?: Record<string, unknown>;
}

export const sendToGoogleSheets = async (payload: GoogleSheetsPayload): Promise<boolean> => {
  try {
    const formattedPayload = {
      timestamp: payload.timestamp || new Date().toISOString(),
      formType: payload.formType,
      form_type: payload.formType,
      name: payload.name || '',
      email: payload.email || '',
      phone: payload.phone || '',
      subject: payload.subject || '',
      details: payload.details || '',
      link: payload.link || '',
      rawParams: payload.rawParams || {}
    };

    // Execute single dispatch to Next.js API route (/api/sheets)
    const response = await fetch('/api/sheets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formattedPayload)
    });

    if (response.ok) {
      const data = await response.json();
      return data.success !== false;
    }

    return false;
  } catch (error) {
    // If API route is unreachable, fallback to direct Web App dispatch
    try {
      const webappUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEBAPP_URL || process.env.GOOGLE_SHEETS_WEBAPP_URL;
      if (webappUrl && webappUrl.startsWith('http') && !webappUrl.includes('YOUR_GOOGLE_APPS_SCRIPT_URL')) {
        await fetch(webappUrl.trim(), {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8'
          },
          body: JSON.stringify(payload),
          mode: 'no-cors'
        });
        return true;
      }
    } catch (fallbackErr) {
      console.warn('Google Sheets fallback error:', fallbackErr);
    }

    console.warn('Google Sheets dispatch warning:', error);
    return false;
  }
};
