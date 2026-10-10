import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
    }

    // Server-to-server upload to tmpfiles.org (bypasses CORS and Vercel read-only filesystem restrictions)
    const uploadData = new FormData();
    uploadData.append('file', file);

    const upstreamRes = await fetch('https://tmpfiles.org/api/v1/upload', {
      method: 'POST',
      body: uploadData
    });

    if (upstreamRes.ok) {
      const json = await upstreamRes.json();
      if (json?.status === 'success' && json?.data?.url) {
        // Return viewable URL (tmpfiles.org format: /ID/filename) so PDF opens directly in browser
        const viewableUrl = json.data.url;
        return NextResponse.json({
          success: true,
          url: viewableUrl
        });
      }
    }

    // Fallback: file.io server-side upload
    const fileIoData = new FormData();
    fileIoData.append('file', file);
    const fileIoRes = await fetch('https://file.io', {
      method: 'POST',
      body: fileIoData
    });

    if (fileIoRes.ok) {
      const json = await fileIoRes.json();
      if (json?.success && json?.link) {
        return NextResponse.json({
          success: true,
          url: json.link
        });
      }
    }

    return NextResponse.json({ success: false, error: 'Upload provider unavailable' }, { status: 502 });
  } catch (err: any) {
    console.error('PDF Upload API Error:', err);
    return NextResponse.json({ success: false, error: err?.message || 'Upload failed' }, { status: 500 });
  }
}
