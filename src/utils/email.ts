import emailjs from '@emailjs/browser';

interface EmailParams {
  form_type: string;
  subject: string;
  content: string;
}

export const sendFormEmail = async (
  formType: string,
  formData: Record<string, string | File>
): Promise<void> => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    console.warn('EmailJS not configured - skipping email send');
    return;
  }

  // Format data for email
  const content = Object.entries(formData)
    .filter(([key, value]) => {
      // Skip file objects in the email content
      if (value instanceof File) return false;
      // Skip empty values
      if (!value) return false;
      return true;
    })
    .map(([key, value]) => {
      const label = key.split('_').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
      return `${label}: ${value}`;
    })
    .join('\n\n');

  const params: EmailParams = {
    form_type: formType,
    subject: `New ${formType} Submission`,
    content,
  };

  try {
    await emailjs.send(serviceId, templateId, params, publicKey);
  } catch (error) {
    console.error('Failed to send email:', error);
    throw new Error('Failed to send notification email');
  }
};