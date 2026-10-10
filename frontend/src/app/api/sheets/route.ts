import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const formTypeStr = String(body.formType || body.form_type || '').toLowerCase();
    const isPitchDeck = formTypeStr.includes('pitch');
    const isCareer = formTypeStr.includes('career') || formTypeStr.includes('job');

    let webappUrl = '';
    if (isPitchDeck) {
      webappUrl = process.env.PITCH_DECK_GOOGLE_SHEETS_WEBAPP_URL || 
                process.env.NEXT_PUBLIC_PITCH_DECK_GOOGLE_SHEETS_WEBAPP_URL || 
                'https://script.google.com/macros/s/AKfycbzGtLix3IL5PXzGnh1XlSrikAiSeZm0ZuiYmr3cUt4Ct9XjujvP237FEabzeAmqnK4/exec';
    } else if (isCareer) {
      webappUrl = process.env.CAREERS_GOOGLE_SHEETS_WEBAPP_URL || 
                process.env.NEXT_PUBLIC_CAREERS_GOOGLE_SHEETS_WEBAPP_URL || 
                'https://script.google.com/macros/s/AKfycbwSe7Nmsu_HdQ7qCb9t0SZmA_7v697HBgtG8D2PpKXkKatCqfkPmndh62IdjYl6QTE/exec';
    } else {
      webappUrl = process.env.CONSULTANCY_GOOGLE_SHEETS_WEBAPP_URL || 
                process.env.NEXT_PUBLIC_CONSULTANCY_GOOGLE_SHEETS_WEBAPP_URL || 
                process.env.GOOGLE_SHEETS_WEBAPP_URL || 
                process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEBAPP_URL || 
                'https://script.google.com/macros/s/AKfycbyRqZbw4H2oN_ToL23suk9vAXlxlzVTlealsAyZL5CODVx1n-KP05EY-FOTwFde5Cpg/exec';
    }

    if (!webappUrl || webappUrl.trim() === '' || webappUrl.includes('YOUR_GOOGLE_APPS_SCRIPT_URL')) {
      console.log('Google Sheets Web App URL not configured in environment variables. Skipping Sheets logging.');
      return NextResponse.json({
        success: true,
        message: 'Google Sheets integration pending configuration.'
      });
    }

    const payload = {
      timestamp: body.timestamp || new Date().toISOString(),
      formType: body.formType || body.form_type || 'Consultancy',
      form_type: body.form_type || body.formType || 'Consultancy',
      name: body.name || '',
      email: body.email || '',
      phone: body.phone || '',
      subject: body.subject || '',
      message: body.details || body.message || '',
      details: body.details || body.message || '',
      link: body.link || '',
      rawParams: body.rawParams || {}
    };

    const response = await fetch(webappUrl.trim(), {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(payload),
      redirect: 'follow'
    });

    const responseText = await response.text();
    let scriptResult: any = null;
    try {
      scriptResult = JSON.parse(responseText);
    } catch {
      // Response was plain text or HTML
    }

    if (scriptResult) {
      if (scriptResult.success === false || scriptResult.result === 'error' || scriptResult.error) {
        const errorMsg = scriptResult.error || scriptResult.message || 'Google Apps Script returned failure';
        console.warn('Google Sheets Web App returned error:', errorMsg);
        return NextResponse.json({ success: false, error: errorMsg }, { status: 502 });
      }
      if (scriptResult.success === true || scriptResult.result === 'success') {
        return NextResponse.json({ success: true, message: 'Saved to Google Sheets' });
      }
    }

    if (response.ok) {
      return NextResponse.json({ success: true, message: 'Saved to Google Sheets' });
    }

    console.warn('Google Sheets Web App returned status:', response.status, responseText);
    return NextResponse.json({ success: false, error: 'Google Apps Script dispatch error' }, { status: 502 });
  } catch (err: any) {
    console.error('Google Sheets API Route Error:', err);
    return NextResponse.json({ success: false, error: err?.message || 'Failed to dispatch to Google Sheets' });
  }
}
