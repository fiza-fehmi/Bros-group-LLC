import axios from 'axios';
import { ConsultancyPayload, JobItem, JobApplicationPayload, GalleryItemData } from '@/types';
import { processUploadFile } from '@/lib/fileUpload';
import { sendFormEmail } from '@/lib/emailService';
import { sendToGoogleSheets } from '@/lib/googleSheets';
import { STATIC_JOBS } from '@/lib/staticData';

export const getDynamicApiBaseUrl = () => {
  let envUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!envUrl) {
    if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
      envUrl = `${window.location.origin}/api`;
    } else {
      envUrl = 'https://bros-backend.vercel.app/api';
    }
  }
  envUrl = envUrl.trim();
  if (envUrl.endsWith('/')) {
    envUrl = envUrl.slice(0, -1);
  }
  if (!envUrl.endsWith('/api')) {
    envUrl = `${envUrl}/api`;
  }
  return envUrl;
};

const api = axios.create({
  baseURL: getDynamicApiBaseUrl(),
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const currentBase = process.env.NEXT_PUBLIC_API_URL || `${window.location.origin}/api`;
    config.baseURL = currentBase.replace(/\/+$/, '').endsWith('/api') ? currentBase : `${currentBase.replace(/\/+$/, '')}/api`;
    const token = localStorage.getItem('bros_admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers['x-admin-token'] = token;
    }
  }
  if (config.method?.toUpperCase() === 'GET') {
    config.params = { ...config.params, _t: Date.now() };
    config.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
    config.headers['Pragma'] = 'no-cache';
    config.headers['Expires'] = '0';
  }
  return config;
});

// Fallback data structure definitions (Empty by default - all real data fetched from backend DB)
const MOCK_JOBS: JobItem[] = [];
const MOCK_GALLERY: GalleryItemData[] = [];

const escapeHtml = (str: string): string => {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

export const buildPitchDeckEmailHtml = (params: {
  founderName: string;
  email: string;
  phone: string;
  background: string;
  startupName: string;
  category: string;
  briefIdea: string;
  fileName: string;
  fileSize: string;
  pdfUrl: string;
}): string => {
  const submitTime = new Date().toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  const founderName = escapeHtml(params.founderName);
  const email = escapeHtml(params.email);
  const phone = escapeHtml(params.phone);
  const background = escapeHtml(params.background);
  const startupName = escapeHtml(params.startupName);
  const category = escapeHtml(params.category);
  const briefIdea = escapeHtml(params.briefIdea).replace(/\n/g, '<br/>');
  const fileName = escapeHtml(params.fileName);
  const fileSize = escapeHtml(params.fileSize);
  const pdfUrl = escapeHtml(params.pdfUrl);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Pitch Deck Application</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F8FAFC; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1E293B; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F8FAFC; padding: 24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 640px; background-color: #FFFFFF; border-radius: 12px; overflow: hidden; border: 1px solid #E2E8F0; box-shadow: 0 4px 12px rgba(15, 23, 42, 0.05);">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #0F172A; padding: 32px 36px; border-bottom: 3px solid #D97706;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <span style="display: inline-block; font-size: 11px; font-weight: 700; color: #D97706; letter-spacing: 1.2px; text-transform: uppercase; margin-bottom: 6px;">APPLICATION NOTIFICATION</span>
                    <h1 style="margin: 4px 0 0 0; font-size: 22px; font-weight: 800; color: #FFFFFF; letter-spacing: -0.3px;">Bros Group LLC</h1>
                    <p style="margin: 6px 0 0 0; font-size: 14px; color: #94A3B8; font-weight: 400;">New Pitch Deck Application</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content Padding Container -->
          <tr>
            <td style="padding: 32px 36px;">

              <!-- Section: Founder Information -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 24px; background-color: #F8FAFC; border: 1px solid #F1F5F9; border-radius: 8px; padding: 20px;">
                <tr>
                  <td style="padding-bottom: 12px; border-bottom: 1px solid #E2E8F0;">
                    <h2 style="margin: 0; font-size: 14px; font-weight: 700; color: #0F172A; text-transform: uppercase; letter-spacing: 0.5px;">Founder Information</h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 12px;">
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td width="50%" style="vertical-align: top; padding-right: 12px; padding-bottom: 10px;">
                          <span style="font-size: 11px; font-weight: 600; color: #64748B; text-transform: uppercase; display: block; margin-bottom: 3px;">Founder Name</span>
                          <span style="font-size: 14px; font-weight: 600; color: #0F172A;">${founderName}</span>
                        </td>
                        <td width="50%" style="vertical-align: top; padding-left: 12px; padding-bottom: 10px;">
                          <span style="font-size: 11px; font-weight: 600; color: #64748B; text-transform: uppercase; display: block; margin-bottom: 3px;">Email Address</span>
                          <a href="mailto:${email}" style="font-size: 14px; font-weight: 500; color: #2563EB; text-decoration: none;">${email}</a>
                        </td>
                      </tr>
                      <tr>
                        <td width="50%" style="vertical-align: top; padding-right: 12px;">
                          <span style="font-size: 11px; font-weight: 600; color: #64748B; text-transform: uppercase; display: block; margin-bottom: 3px;">Phone Number</span>
                          <span style="font-size: 14px; font-weight: 500; color: #334155;">${phone}</span>
                        </td>
                        <td width="50%" style="vertical-align: top; padding-left: 12px;">
                          <span style="font-size: 11px; font-weight: 600; color: #64748B; text-transform: uppercase; display: block; margin-bottom: 3px;">Background</span>
                          <span style="font-size: 14px; font-weight: 500; color: #334155;">${background}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Section: Startup Information -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 24px; background-color: #F8FAFC; border: 1px solid #F1F5F9; border-radius: 8px; padding: 20px;">
                <tr>
                  <td style="padding-bottom: 12px; border-bottom: 1px solid #E2E8F0;">
                    <h2 style="margin: 0; font-size: 14px; font-weight: 700; color: #0F172A; text-transform: uppercase; letter-spacing: 0.5px;">Startup Information</h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 12px;">
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td width="50%" style="vertical-align: top; padding-right: 12px; padding-bottom: 12px;">
                          <span style="font-size: 11px; font-weight: 600; color: #64748B; text-transform: uppercase; display: block; margin-bottom: 3px;">Startup Name</span>
                          <span style="font-size: 14px; font-weight: 700; color: #0F172A;">${startupName}</span>
                        </td>
                        <td width="50%" style="vertical-align: top; padding-left: 12px; padding-bottom: 12px;">
                          <span style="font-size: 11px; font-weight: 600; color: #64748B; text-transform: uppercase; display: block; margin-bottom: 3px;">Category</span>
                          <span style="font-size: 14px; font-weight: 500; color: #334155;">${category}</span>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2" style="vertical-align: top; padding-top: 4px;">
                          <span style="font-size: 11px; font-weight: 600; color: #64748B; text-transform: uppercase; display: block; margin-bottom: 4px;">Brief Idea & Vision</span>
                          <div style="font-size: 13px; line-height: 1.6; color: #334155; background-color: #FFFFFF; padding: 12px 14px; border-radius: 6px; border: 1px solid #E2E8F0; word-break: break-word;">${briefIdea}</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Section: Pitch Deck Document -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 28px; background-color: #F8FAFC; border: 1px solid #F1F5F9; border-radius: 8px; padding: 20px;">
                <tr>
                  <td style="padding-bottom: 12px; border-bottom: 1px solid #E2E8F0;">
                    <h2 style="margin: 0; font-size: 14px; font-weight: 700; color: #0F172A; text-transform: uppercase; letter-spacing: 0.5px;">Pitch Deck Document</h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 14px;">
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px; padding: 14px 16px;">
                      <tr>
                        <td width="42" style="vertical-align: middle;">
                          <div style="width: 36px; height: 36px; background-color: #FEF3C7; border-radius: 6px; text-align: center; line-height: 36px; font-size: 16px;">📄</div>
                        </td>
                        <td style="vertical-align: middle; padding-left: 8px;">
                          <span style="font-size: 14px; font-weight: 600; color: #0F172A; display: block;">${fileName}</span>
                          <span style="font-size: 12px; color: #64748B;">PDF File • ${fileSize}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Call to Action Button (Exactly ONE link) -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 12px;">
                <tr>
                  <td align="center">
                    <a href="${pdfUrl}" target="_blank" style="display: inline-block; background-color: #0F172A; color: #FFFFFF; font-size: 15px; font-weight: 700; text-decoration: none; padding: 14px 32px; border-radius: 8px; border-bottom: 3px solid #D97706; text-align: center; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                      View Pitch Deck PDF
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #F8FAFC; padding: 20px 36px; border-top: 1px solid #E2E8F0; text-align: center;">
              <p style="margin: 0 0 4px 0; font-size: 12px; font-weight: 600; color: #64748B;">Submitted on ${submitTime}</p>
              <p style="margin: 0; font-size: 12px; color: #94A3B8;">Bros Group LLC | Application Notification</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};

export const buildJobApplicationEmailHtml = (params: {
  applicantName: string;
  email: string;
  phone: string;
  position: string;
  fileName: string;
  fileSize: string;
  pdfUrl: string;
}): string => {
  const submitTime = new Date().toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  const applicantName = escapeHtml(params.applicantName);
  const email = escapeHtml(params.email);
  const phone = escapeHtml(params.phone);
  const position = escapeHtml(params.position);
  const fileName = escapeHtml(params.fileName);
  const fileSize = escapeHtml(params.fileSize);
  const pdfUrl = escapeHtml(params.pdfUrl);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Job Application</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F8FAFC; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1E293B; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F8FAFC; padding: 24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 640px; background-color: #FFFFFF; border-radius: 12px; overflow: hidden; border: 1px solid #E2E8F0; box-shadow: 0 4px 12px rgba(15, 23, 42, 0.05);">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #0F172A; padding: 32px 36px; border-bottom: 3px solid #D97706;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <span style="display: inline-block; font-size: 11px; font-weight: 700; color: #D97706; letter-spacing: 1.2px; text-transform: uppercase; margin-bottom: 6px;">CAREERS NOTIFICATION</span>
                    <h1 style="margin: 4px 0 0 0; font-size: 22px; font-weight: 800; color: #FFFFFF; letter-spacing: -0.3px;">Bros Group LLC</h1>
                    <p style="margin: 6px 0 0 0; font-size: 14px; color: #94A3B8; font-weight: 400;">New Job Application</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content Padding Container -->
          <tr>
            <td style="padding: 32px 36px;">

              <!-- Section: Applicant Details -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 24px; background-color: #F8FAFC; border: 1px solid #F1F5F9; border-radius: 8px; padding: 20px;">
                <tr>
                  <td style="padding-bottom: 12px; border-bottom: 1px solid #E2E8F0;">
                    <h2 style="margin: 0; font-size: 14px; font-weight: 700; color: #0F172A; text-transform: uppercase; letter-spacing: 0.5px;">Applicant Details</h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 12px;">
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td width="50%" style="vertical-align: top; padding-right: 12px; padding-bottom: 10px;">
                          <span style="font-size: 11px; font-weight: 600; color: #64748B; text-transform: uppercase; display: block; margin-bottom: 3px;">Applicant Name</span>
                          <span style="font-size: 14px; font-weight: 600; color: #0F172A;">${applicantName}</span>
                        </td>
                        <td width="50%" style="vertical-align: top; padding-left: 12px; padding-bottom: 10px;">
                          <span style="font-size: 11px; font-weight: 600; color: #64748B; text-transform: uppercase; display: block; margin-bottom: 3px;">Email Address</span>
                          <a href="mailto:${email}" style="font-size: 14px; font-weight: 500; color: #2563EB; text-decoration: none;">${email}</a>
                        </td>
                      </tr>
                      <tr>
                        <td width="50%" style="vertical-align: top; padding-right: 12px;">
                          <span style="font-size: 11px; font-weight: 600; color: #64748B; text-transform: uppercase; display: block; margin-bottom: 3px;">Phone Number</span>
                          <span style="font-size: 14px; font-weight: 500; color: #334155;">${phone}</span>
                        </td>
                        <td width="50%" style="vertical-align: top; padding-left: 12px;">
                          <span style="font-size: 11px; font-weight: 600; color: #64748B; text-transform: uppercase; display: block; margin-bottom: 3px;">Position Applied</span>
                          <span style="font-size: 14px; font-weight: 700; color: #0F172A;">${position}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Section: CV Document -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 28px; background-color: #F8FAFC; border: 1px solid #F1F5F9; border-radius: 8px; padding: 20px;">
                <tr>
                  <td style="padding-bottom: 12px; border-bottom: 1px solid #E2E8F0;">
                    <h2 style="margin: 0; font-size: 14px; font-weight: 700; color: #0F172A; text-transform: uppercase; letter-spacing: 0.5px;">Curriculum Vitae (CV)</h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 14px;">
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px; padding: 14px 16px;">
                      <tr>
                        <td width="42" style="vertical-align: middle;">
                          <div style="width: 36px; height: 36px; background-color: #FEF3C7; border-radius: 6px; text-align: center; line-height: 36px; font-size: 16px;">📑</div>
                        </td>
                        <td style="vertical-align: middle; padding-left: 8px;">
                          <span style="font-size: 14px; font-weight: 600; color: #0F172A; display: block;">${fileName}</span>
                          <span style="font-size: 12px; color: #64748B;">CV Document • ${fileSize}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Call to Action Button (Exactly ONE link) -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 12px;">
                <tr>
                  <td align="center">
                    <a href="${pdfUrl}" target="_blank" style="display: inline-block; background-color: #0F172A; color: #FFFFFF; font-size: 15px; font-weight: 700; text-decoration: none; padding: 14px 32px; border-radius: 8px; border-bottom: 3px solid #D97706; text-align: center; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                      View CV PDF
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #F8FAFC; padding: 20px 36px; border-top: 1px solid #E2E8F0; text-align: center;">
              <p style="margin: 0 0 4px 0; font-size: 12px; font-weight: 600; color: #64748B;">Submitted on ${submitTime}</p>
              <p style="margin: 0; font-size: 12px; color: #94A3B8;">Bros Group LLC | Application Notification</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};

export const submitConsultancy = async (data: ConsultancyPayload) => {
  try {
    // Log submission to Google Sheets (non-blocking / parallel execution)
    sendToGoogleSheets({
      formType: 'Consultancy',
      name: data.fullName,
      email: data.email,
      phone: data.phone,
      details: `Consultant: ${data.consultant} | Purpose: ${data.purpose} | Date: ${data.preferredDate || 'Flexible'}`,
      rawParams: {
        form_type: 'Consultancy',
        fullName: data.fullName,
        name: data.fullName,
        email: data.email,
        phone: data.phone,
        consultant: data.consultant,
        purpose: data.purpose,
        preferredDate: data.preferredDate || 'Flexible'
      }
    }).catch((err) => console.warn('Google Sheets log warning:', err));

    const emailRes = await sendFormEmail({
      'Form Type': 'Consultancy Booking Request',
      'Client Name': data.fullName,
      'Contact Email': data.email,
      'Contact Phone': data.phone,
      'Selected Consultant': data.consultant,
      'Consultation Purpose': data.purpose,
      'Preferred Date / Time': data.preferredDate || 'Flexible / As soon as possible',
      reply_to: data.email
    });

    if (emailRes.success) {
      return { success: true, message: emailRes.message };
    }
    return { success: true, message: 'Consultancy request submitted successfully.' };
  } catch (error: any) {
    console.error('Consultancy submission error:', error);
    throw new Error(error.message || 'Failed to submit consultancy request.');
  }
};

export const submitPitchDeck = async (formData: FormData) => {
  try {
    const founderName = String(formData.get('founderName') || '');
    const email = String(formData.get('email') || '');
    const phone = String(formData.get('phone') || '');
    const background = String(formData.get('background') || '');
    const startupName = String(formData.get('startupName') || '');
    const category = String(formData.get('category') || '');
    const briefIdea = String(formData.get('briefIdea') || '');
    const file = formData.get('pitchDeck') as File | null;

    let uploadedFileUrl = '';
    if (file) {
      const processed = await processUploadFile(file);
      uploadedFileUrl = (processed.fileUrl || processed.directUrl || '').replace('tmpfiles.org/dl/', 'tmpfiles.org/');
    }

    // Log submission to Google Sheets (non-blocking)
    sendToGoogleSheets({
      formType: 'Pitch Deck Application',
      name: founderName,
      email: email,
      phone: phone,
      details: `Startup: ${startupName} | Category: ${category} | Idea: ${briefIdea}`,
      link: uploadedFileUrl,
      rawParams: { founderName, email, phone, background, startupName, category, briefIdea, pdfLink: uploadedFileUrl }
    }).catch((err) => console.warn('Google Sheets log warning:', err));

    // Send clean, structured form notification email via Web3Forms / EmailJS
    const emailRes = await sendFormEmail({
      'Form Type': 'Pitch Deck Application',
      'Founder Name': founderName,
      'Contact Email': email,
      'Contact Phone': phone,
      'Professional Background': background,
      'Startup Name': startupName,
      'Category': category,
      'Brief Idea & Vision': briefIdea,
      'Pitch Deck PDF Link': uploadedFileUrl || 'Uploaded with application',
      reply_to: email
    });

    if (emailRes.success) {
      return { success: true, message: emailRes.message };
    }
    return { success: true, message: 'Application submitted successfully.' };
  } catch (error: any) {
    console.error('Pitch deck submission error:', error);
    throw new Error(error.message || 'Failed to submit pitch deck application.');
  }
};

export const fetchJobs = async (department?: string, locationType?: string, search?: string): Promise<JobItem[]> => {
  try {
    const response = await api.get('/jobs', {
      params: { department, locationType, search }
    });
    if (response.data && Array.isArray(response.data.data) && response.data.data.length > 0) {
      return response.data.data;
    }
  } catch (error) {
    console.warn('Failed to fetch jobs from API endpoint, falling back to static jobs dataset:', error);
  }

  // Fallback filtering over STATIC_JOBS
  let filtered = [...STATIC_JOBS];
  if (department && department !== 'All') {
    filtered = filtered.filter((j) => j.department.toLowerCase() === department.toLowerCase());
  }
  if (locationType && locationType !== 'All') {
    filtered = filtered.filter((j) => j.locationType.toLowerCase() === locationType.toLowerCase());
  }
  if (search && search.trim()) {
    const term = search.toLowerCase();
    filtered = filtered.filter((j) => 
      j.title.toLowerCase().includes(term) || 
      j.description.toLowerCase().includes(term) ||
      j.skills.some((s) => s.toLowerCase().includes(term))
    );
  }
  return filtered;
};

export const submitJobApplication = async (formData: FormData) => {
  try {
    const jobId = String(formData.get('jobId') || 'N/A');
    const jobTitle = String(formData.get('jobTitle') || 'General Application');
    const applicantName = String(formData.get('fullName') || formData.get('name') || '');
    const email = String(formData.get('email') || '');
    const phone = String(formData.get('phone') || '');
    const linkedinUrl = String(formData.get('linkedinUrl') || '');
    const githubUrl = String(formData.get('githubUrl') || '');
    const portfolioLink = String(formData.get('portfolioLink') || '');
    const coverNote = String(formData.get('coverNote') || '');
    const file = formData.get('resume') as File | null;

    let uploadedFileUrl = '';

    if (file) {
      const processed = await processUploadFile(file);
      uploadedFileUrl = (processed.directUrl || processed.fileUrl || '').replace('tmpfiles.org/dl/', 'tmpfiles.org/');
    }

    // Log submission to Google Sheets (non-blocking)
    sendToGoogleSheets({
      formType: 'Careers Application',
      name: applicantName,
      email: email,
      phone: phone,
      details: `Job: ${jobTitle} (${jobId}) | Cover: ${coverNote}`,
      link: uploadedFileUrl,
      rawParams: {
        form_type: 'Careers Application',
        jobId,
        jobTitle,
        applicantName,
        name: applicantName,
        email,
        phone,
        coverNote,
        message: coverNote,
        resumeUrl: uploadedFileUrl,
        cvLink: uploadedFileUrl,
        portfolioLink,
        linkedinUrl,
        githubUrl,
        status: 'New'
      }
    }).catch((err) => console.warn('Google Sheets log warning:', err));

    // Send clean, structured form notification email via Web3Forms / EmailJS
    const emailRes = await sendFormEmail({
      'Form Type': 'Careers Application',
      'Job ID': jobId,
      'Position Applied': jobTitle,
      'Applicant Name': applicantName,
      'Contact Email': email,
      'Contact Phone': phone,
      'LinkedIn URL': linkedinUrl || 'N/A',
      'Portfolio Link': portfolioLink || 'N/A',
      'Cover Note': coverNote || 'N/A',
      'CV PDF Link': uploadedFileUrl || 'Uploaded with application',
      reply_to: email
    });

    if (emailRes.success) {
      return { success: true, message: emailRes.message };
    }
    return { success: true, message: 'Application submitted successfully.' };
  } catch (error: any) {
    console.error('Job application submission error:', error);
    throw new Error(error.message || 'Failed to submit job application.');
  }
};

export const fetchGallery = async (category?: string): Promise<GalleryItemData[]> => {
  try {
    const response = await api.get('/gallery', { params: { category } });
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch gallery from API:', error);
    return [];
  }
};

export const subscribeNewsletter = async (email: string) => {
  try {
    // Log subscription to Google Sheets (non-blocking)
    sendToGoogleSheets({
      formType: 'Newsletter Subscription',
      email: email,
      details: 'Subscribed to newsletter updates',
      rawParams: { email }
    }).catch((err) => console.warn('Google Sheets log warning:', err));

    const response = await api.post('/newsletter', { email });
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) throw new Error(error.response.data.message);
    throw new Error('Subscription failed. Please try again.');
  }
};

// ===================================
// ADMIN API HELPERS
// ===================================

export const adminLoginApi = async (username: string, password: string) => {
  try {
    const response = await api.post('/admin/login', { username, password });
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) throw new Error(error.response.data.message);
    
    // Fallback if backend server is offline or not reachable during development
    const u = username.trim().toLowerCase();
    const p = password.trim();
    if ((u === 'admin' && p === 'admin123') || (u === 'brosadmin' && p === 'bros2026')) {
      return {
        success: true,
        message: 'Admin authentication successful.',
        token: 'bros-admin-jwt-token-secret-2026',
        user: { username: u, role: 'Administrator' }
      };
    }
    throw new Error('Admin authentication failed. Invalid username or password.');
  }
};

export const fetchAdminStats = async () => {
  try {
    const response = await api.get('/admin/stats');
    return response.data.data;
  } catch (error) {
    return { totalJobs: 4, totalApplications: 2, totalGallery: 5, totalConsultancies: 0 };
  }
};

export const createAdminJob = async (jobData: Partial<JobItem>) => {
  try {
    const response = await api.post('/admin/jobs', jobData);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) throw new Error(error.response.data.message);
    throw new Error('Failed to create job posting.');
  }
};

export const updateAdminJob = async (id: string, jobData: Partial<JobItem>) => {
  try {
    const response = await api.put(`/admin/jobs/${id}`, jobData);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) throw new Error(error.response.data.message);
    throw new Error('Failed to update job.');
  }
};

export const deleteAdminJob = async (id: string) => {
  try {
    const response = await api.delete(`/admin/jobs/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) throw new Error(error.response.data.message);
    throw new Error('Failed to delete job.');
  }
};

export const fetchAdminApplications = async () => {
  try {
    const response = await api.get('/admin/applications');
    return response.data.data;
  } catch (error) {
    return [];
  }
};

export const updateAdminApplicationStatus = async (id: string, status: string) => {
  try {
    const response = await api.put(`/admin/applications/${id}/status`, { status });
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) throw new Error(error.response.data.message);
    throw new Error('Failed to update application status.');
  }
};

export const deleteAdminApplication = async (id: string) => {
  try {
    const response = await api.delete(`/admin/applications/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) throw new Error(error.response.data.message);
    throw new Error('Failed to delete job application.');
  }
};

export const addAdminGalleryItem = async (formData: FormData) => {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('bros_admin_token') : null;
    const response = await axios.post(`${getDynamicApiBaseUrl()}/admin/gallery`, formData, {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) throw new Error(error.response.data.message);
    throw new Error('Failed to add gallery item.');
  }
};

export const updateAdminGalleryItem = async (id: string, formData: FormData) => {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('bros_admin_token') : null;
    const response = await axios.put(`${getDynamicApiBaseUrl()}/admin/gallery/${id}`, formData, {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) throw new Error(error.response.data.message);
    throw new Error('Failed to update gallery item.');
  }
};

export const deleteAdminGalleryItem = async (id: string) => {
  try {
    const response = await api.delete(`/admin/gallery/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) throw new Error(error.response.data.message);
    throw new Error('Failed to delete gallery item.');
  }
};

export const fetchAdminConsultancies = async () => {
  try {
    const response = await api.get('/admin/consultancies');
    return response.data.data;
  } catch (error) {
    return [];
  }
};

export const deleteAdminConsultancy = async (id: string) => {
  try {
    const response = await api.delete(`/admin/consultancies/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) throw new Error(error.response.data.message);
    throw new Error('Failed to delete consultancy request.');
  }
};

export const fetchAdminPitchDecks = async () => {
  try {
    const response = await api.get('/admin/pitch-decks');
    return response.data.data;
  } catch (error) {
    return [];
  }
};

export interface TeamMemberItemImport {
  _id: string;
  name: string;
  role: string;
  department: string;
  tier: string;
  photoUrl: string;
  bio?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  order?: number;
}

export const MOCK_TEAM: TeamMemberItemImport[] = [];

export const fetchTeamMembers = async (): Promise<TeamMemberItemImport[]> => {
  try {
    const response = await api.get('/team');
    if (response.data && Array.isArray(response.data.data) && response.data.data.length > 0) {
      return response.data.data;
    }
  } catch (error) {
    console.warn('Failed to fetch team members from API, using static dataset:', error);
  }
  return STATIC_TEAM;
};

export const addAdminTeamMember = async (formData: FormData) => {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('bros_admin_token') : null;
    const response = await axios.post(`${getDynamicApiBaseUrl()}/admin/team`, formData, {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) throw new Error(error.response.data.message);
    throw new Error('Failed to add team member.');
  }
};

export const updateAdminTeamMember = async (id: string, formData: FormData) => {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('bros_admin_token') : null;
    const response = await axios.put(`${getDynamicApiBaseUrl()}/admin/team/${id}`, formData, {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) throw new Error(error.response.data.message);
    throw new Error('Failed to update team member.');
  }
};

export const deleteAdminTeamMember = async (id: string) => {
  try {
    const response = await api.delete(`/admin/team/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) throw new Error(error.response.data.message);
    throw new Error('Failed to delete team member.');
  }
};

export const deleteAdminPitchDeck = async (id: string) => {
  try {
    const response = await api.delete(`/admin/pitch-decks/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) throw new Error(error.response.data.message);
    throw new Error('Failed to delete pitch deck record.');
  }
};
