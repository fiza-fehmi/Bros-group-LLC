import emailjs from '@emailjs/browser';

export interface EmailResponse {
  success: boolean;
  message: string;
}

// Convert a File object to Base64 Data URL
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const sendFormEmail = async (
  templateParams: Record<string, unknown>,
  customTemplateId?: string,
  attachedFile?: File | null
): Promise<EmailResponse> => {
  const web3Key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = customTemplateId || process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  const recipientEmail = process.env.NEXT_PUBLIC_NOTIFICATION_RECIPIENT_EMAIL || 
                        process.env.NOTIFICATION_RECIPIENT_EMAIL || 
                        'brosgroupllcdubai@gmail.com';

  // 1. Web3Forms Dispatcher
  if (web3Key && web3Key.trim() !== '') {
    try {
      const formData = new FormData();
      formData.append('access_key', web3Key.trim());

      const subject = String(templateParams['Form Type'] || templateParams.form_type || 'Form Submission');
      formData.append('subject', `${subject} - Bros Group LLC`);
      formData.append('from_name', 'Bros Group LLC Portal');
      formData.append('to_email', recipientEmail);

      const replyToEmail = String(templateParams.reply_to || templateParams['Contact Email'] || templateParams.email || '');
      if (replyToEmail) {
        formData.append('reply_to', replyToEmail);
      }

      for (const [key, value] of Object.entries(templateParams)) {
        if (value !== undefined && value !== null && key !== 'reply_to' && key !== 'form_type') {
          if (attachedFile && typeof value === 'string' && value.startsWith('data:')) {
            continue;
          }
          formData.append(key, String(value));
        }
      }

      if (attachedFile) {
        formData.append('attachment', attachedFile);
      }

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const json = await res.json();
      if (json.success) {
        return {
          success: true,
          message: 'Your form submission has been sent successfully.'
        };
      } else {
        throw new Error(json.message || 'Web3Forms email submission failed.');
      }
    } catch (web3Err: any) {
      console.warn('Web3Forms dispatch error, falling back to EmailJS:', web3Err?.message || web3Err);
    }
  }

  // 2. EmailJS Dispatcher
  if (!serviceId || !templateId || !publicKey) {
    throw new Error(
      'Email submission service is not configured. Please add EmailJS keys or NEXT_PUBLIC_WEB3FORMS_KEY to your frontend/.env file.'
    );
  }

  const sanitizedParams: Record<string, string> = {
    to_email: recipientEmail,
    recipient_email: recipientEmail
  };
  for (const [key, value] of Object.entries(templateParams)) {
    if (value !== undefined && value !== null) {
      sanitizedParams[key] = String(value);
    }
  }

  try {
    const response = await emailjs.send(serviceId, templateId, sanitizedParams, publicKey);
    if (response.status === 200 || response.text === 'OK') {
      return {
        success: true,
        message: 'Your form submission has been sent successfully.'
      };
    }
  } catch (sdkError: any) {
    console.warn('EmailJS SDK send error, trying REST endpoint fallback:', sdkError);

    try {
      const apiResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: sanitizedParams
        })
      });

      if (apiResponse.ok) {
        return {
          success: true,
          message: 'Your form submission has been sent successfully.'
        };
      }

      const errorMsg = await apiResponse.text();
      throw new Error(errorMsg || `EmailJS returned status ${apiResponse.status}`);
    } catch (apiError: any) {
      const finalMsg = apiError?.message || sdkError?.text || sdkError?.message || 'Failed to deliver email.';
      console.error('EmailJS Submission Error:', finalMsg);
      throw new Error(finalMsg);
    }
  }

  return {
    success: true,
    message: 'Your form submission has been sent successfully.'
  };
};
