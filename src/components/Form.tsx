/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import { X, Loader2, Upload, Check } from 'lucide-react'
import emailjs from '@emailjs/browser'

export interface FormField {
  id: string
  label: string
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'file'
  value?: string
  required?: boolean
  readOnly?: boolean
  options?: string[]
  placeholder?: string
}

export const FORM_TYPES = {
  PRODUCT_ENQUIRY: {
    id: 'product_enquiry',
    title: 'Product Enquiry',
    submitLabel: 'Send Enquiry',
    fields: [
      { id: 'segment', label: 'Category', type: 'text', required: true, readOnly: true },
      { id: 'subcategory', label: 'Sub Category', type: 'text', required: true, readOnly: true },
      { id: 'product', label: 'Product', type: 'text', required: true, readOnly: true },
      { id: 'name', label: 'Full Name', type: 'text', required: true, placeholder: 'John Doe' },
      { id: 'company', label: 'Company Name', type: 'text', required: false, placeholder: 'Optional' },
      { id: 'email', label: 'Email', type: 'email', required: true, placeholder: 'you@example.com' },
      { id: 'phone', label: 'Phone', type: 'tel', required: true, placeholder: '+91 98765 43210' },
      { id: 'message', label: 'Message', type: 'textarea', required: false, placeholder: 'Your message here...' },
    ],
  },
  EVENT_FORM: {
    id: 'event_form',
    title: 'Event Registration',
    submitLabel: 'Register',
    fields: [
      { id: 'event_name', label: 'Event', type: 'text', required: true, readOnly: true },
      { id: 'event_location', label: 'Location', type: 'text', required: true, readOnly: true },
      { id: 'event_date', label: 'Date', type: 'text', required: true, readOnly: true },
      { id: 'event_time', label: 'Time', type: 'text', required: true, readOnly: true },
      { id: 'name', label: 'Full Name', type: 'text', required: true, placeholder: 'John Doe' },
      { id: 'company', label: 'Company Name', type: 'text', required: false, placeholder: 'Optional' },
      { id: 'email', label: 'Email', type: 'email', required: true, placeholder: 'you@example.com' },
      { id: 'phone', label: 'Phone', type: 'tel', required: true, placeholder: '+91 98765 43210' },
      { id: 'message', label: 'Message (Optional)', type: 'textarea', required: false, placeholder: 'Any notes...' },
    ],
  },
  CAREER_APPLICATION: {
    id: 'career_application',
    title: 'Job Application',
    submitLabel: 'Submit Application',
    fields: [
      { id: 'position', label: 'Position', type: 'text', required: true, readOnly: true },
      { id: 'department', label: 'Department', type: 'text', required: true, readOnly: true },
      { id: 'name', label: 'Full Name', type: 'text', required: true, placeholder: 'John Doe' },
      { id: 'email', label: 'Email', type: 'email', required: true, placeholder: 'you@example.com' },
      { id: 'phone', label: 'Phone', type: 'tel', required: true, placeholder: '+91 98765 43210' },
      { id: 'cover_message', label: 'Cover Message', type: 'textarea', required: true, placeholder: 'Write a short cover message...' },
    ],
  },
  BROCHURE_DOWNLOAD: {
    id: 'brochure_download',
    title: 'Download Brochure',
    submitLabel: 'Download Brochure',
    fields: [
      { id: 'product', label: 'Product', type: 'text', required: true, readOnly: true },
      { id: 'name', label: 'Name', type: 'text', required: true, placeholder: 'John Doe' },
      { id: 'company', label: 'Company Name (Optional)', type: 'text', required: false, placeholder: 'Company (optional)' },
      { id: 'email', label: 'Email ID', type: 'email', required: true, placeholder: 'you@example.com' },
      { id: 'phone', label: 'Phone No', type: 'tel', required: true, placeholder: '+91 98765 43210' },
    ],
  },
  REGISTRATION: {
    id: 'registration',
    title: 'Course Registration',
    submitLabel: 'Register',
    fields: [
      { id: 'name', label: 'Name', type: 'text', required: true },
      { id: 'company', label: 'Company Name', type: 'text', required: false },
      { id: 'email', label: 'Email', type: 'email', required: true },
      { id: 'phone', label: 'Phone', type: 'tel', required: true },
      { id: 'module', label: 'Module', type: 'select', required: true, options: [] },
    ],
  },
} as const

interface FormProps {
  type: keyof typeof FORM_TYPES
  onClose: () => void
  onSuccess?: (payload: Record<string, string>) => void
  initialData?: Record<string, string>
  fields?: FormField[]
}

const Form: React.FC<FormProps> = ({
  type, onClose, onSuccess, initialData = {}, fields,
}) => {
  const formConfig = FORM_TYPES[type]
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [fileObjects, setFileObjects] = useState<Record<string, File | null>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [fileUploading, setFileUploading] = useState<Record<string, boolean>>({})
  const [fileErrors, setFileErrors] = useState<Record<string, string>>({})
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const cfgFields = fields ?? formConfig.fields
    const initialFormData: Record<string, string> = {}
    const initialFileObjs: Record<string, File | null> = {}
    cfgFields.forEach(field => {
      initialFormData[field.id] = initialData[field.id] ?? field.value ?? ''
      initialFileObjs[field.id] = null
    })
    setFormData(initialFormData)
    setFileObjects(initialFileObjs)
    setErrors({})
    setFileErrors({})
    setFileUploading({})
    setSuccess(false)
  }, [formConfig.fields, initialData, fields])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    const cfgFields = fields ?? formConfig.fields
    cfgFields.forEach(field => {
      const val = (formData[field.id] || '').trim()
      if (field.required) {
        if (field.type === 'file') {
          if (!fileObjects[field.id] && !val)
            newErrors[field.id] = `${field.label} is required`
        } else if (!val) {
          newErrors[field.id] = `${field.label} is required`
          return
        }
      }
      if (
        field.type === 'email' &&
        val &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
      ) {
        newErrors[field.id] = 'Please enter a valid email address'
      }
      if (
        field.type === 'tel' &&
        val &&
        !/^[\d\s+()-]{7,}$/.test(val)
      ) {
        newErrors[field.id] = 'Please enter a valid phone number'
      }
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0 &&
      Object.values(fileUploading).every(v => v === false)
  }

  const fileToDataUrl = (file: File): Promise<string> =>
    new Promise((res, rej) => {
      const reader = new FileReader()
      reader.onload = () => {
        res(reader.result as string)
      }
      reader.onerror = e => rej(e)
      reader.readAsDataURL(file)
    })

  const handleFileChange = async (fieldId: string, file?: File | null) => {
    setFileErrors(prev => ({ ...prev, [fieldId]: '' }))
    if (!file) {
      setFormData(prev => ({ ...prev, [fieldId]: '' }))
      setFileObjects(prev => ({ ...prev, [fieldId]: null }))
      return
    }
    try {
      setFileUploading(prev => ({ ...prev, [fieldId]: true }))
      const objectUrl = URL.createObjectURL(file)
      setFormData(prev => ({ ...prev, [fieldId]: objectUrl }))
      setFileObjects(prev => ({ ...prev, [fieldId]: file }))
    } catch {
      setFileErrors(prev => ({
        ...prev,
        [fieldId]: 'Upload failed',
      }))
      setFormData(prev => ({ ...prev, [fieldId]: '' }))
      setFileObjects(prev => ({ ...prev, [fieldId]: null }))
    } finally {
      setFileUploading(prev => ({ ...prev, [fieldId]: false }))
    }
  }

  const cfgFields = fields ?? formConfig.fields

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   setSubmitError(null)
  //   if (!validateForm()) return
  //   setIsSubmitting(true)

  //   try {
  //     const get = (id: string) => (typeof formData[id] === 'string' ? formData[id] : '') || ''
  //     const content = cfgFields.map(f => `${f.label}: ${get(f.id)}`).join('\n')

  //     const payload: Record<string, any> = {
  //       subject: `New ${formConfig.title} submission`,
  //       submission_date: new Date().toLocaleString(),
  //       form_type: formConfig.title,
  //       content,
  //       customer_email: get('email') || 'N/A',
  //     }

  //     const attachments: Array<{ name: string; data: string }> = []
  //     for (const f of cfgFields) {
  //       if (f.type === 'file') {
  //         const fileObj = fileObjects[f.id]
  //         if (fileObj) {
  //           const dataUrl = await fileToDataUrl(fileObj)
  //           attachments.push({ name: fileObj.name, data: dataUrl })
  //           payload.content += `\n${f.label}: ${fileObj.name}`
  //         }
  //       }
  //     }

  //     if (attachments.length > 0) {
  //       payload.attachment = attachments.length === 1 ? attachments[0].data : attachments.map(a => a.data)
  //       payload.attachment_names = attachments.map(a => a.name).join(', ')
  //     }

  //     console.log('Sending payload:', payload)

  //     await emailjs.send(
  //       import.meta.env.VITE_EMAILJS_SERVICE_ID,
  //       import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  //       payload,
  //       import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  //     )

  //     setSuccess(true)
  //     onSuccess?.(payload)

  //     setTimeout(() => {
  //       setIsSubmitting(false)
  //       onClose()
  //     }, 1100)
  //   } catch (err) {
  //     console.error(err)
  //     setSubmitError('Failed to submit. Please try again.')
  //     setIsSubmitting(false)
  //   }
  // }
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setSubmitError(null)
  if (!validateForm()) return
  setIsSubmitting(true)

  try {
    // Compose a single content string containing all labels and values
    const get = (id: string) => (typeof formData[id] === 'string' ? formData[id] : '') || ''
    const content = cfgFields.map(f => `${f.label}: ${get(f.id)}`).join('\n')

    // Minimal payload with only 3 variables
    const payload = {
      subject: `New ${formConfig.title} submission`,
      submission_date: new Date().toLocaleString(),
      content,
    }

    console.log('Sending payload:', payload)

    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      payload,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )

    setSuccess(true)
    onSuccess?.(payload)

    setTimeout(() => {
      setIsSubmitting(false)
      onClose()
    }, 1100)
  } catch (err) {
    console.error(err)
    setSubmitError('Failed to submit. Please try again.')
    setIsSubmitting(false)
  }
}


  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-xl shadow-2xl rounded-md" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">{formConfig.title}</h2>
          <button type="button" onClick={onClose} className="text-white hover:text-gray-700 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 max-h-[80vh] overflow-y-auto">
          <div className="space-y-6">
            {cfgFields.map(field => (
              <div key={field.id}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    value={formData[field.id] ?? ''}
                    onChange={e =>
                      setFormData(prev => ({
                        ...prev,
                        [field.id]: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6b0f0f]"
                    placeholder={field.placeholder}
                    rows={4}
                    readOnly={field.readOnly}
                  />
                ) : field.type === 'select' ? (
                  <select
                    value={formData[field.id] ?? ''}
                    onChange={e =>
                      setFormData(prev => ({
                        ...prev,
                        [field.id]: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6b0f0f]"
                    required={field.required}
                    disabled={field.readOnly}
                  >
                    <option value="">
                      {field.readOnly ? '' : `Select ${field.label}`}
                    </option>
                    {(field.options ?? []).map(opt => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : field.type === 'file' ? (
                  <div>
                    <label className="flex items-center gap-3 px-3 py-2 border border-dashed border-gray-300 rounded-md cursor-pointer">
                      <Upload className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-700">
                        Choose file (pdf, doc)
                      </span>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={e => {
                          const f = e.target.files?.[0] ?? null
                          handleFileChange(field.id, f)
                        }}
                        className="hidden"
                      />
                    </label>
                    {fileUploading[field.id] && (
                      <div className="mt-2 text-sm text-gray-600 flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" /> Uploading...
                      </div>
                    )}
                    {formData[field.id] && !fileUploading[field.id] && (
                      <div className="mt-2 text-sm text-gray-700">
                        Uploaded:{' '}
                        <a
                          href={formData[field.id]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          View
                        </a>
                      </div>
                    )}
                    {fileErrors[field.id] && (
                      <p className="mt-2 text-sm text-red-500">
                        {fileErrors[field.id]}
                      </p>
                    )}
                  </div>
                ) : (
                  <input
                    type={field.type}
                    value={formData[field.id] ?? ''}
                    onChange={e =>
                      setFormData(prev => ({
                        ...prev,
                        [field.id]: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6b0f0f]"
                    placeholder={field.placeholder}
                    readOnly={field.readOnly}
                    required={field.required}
                  />
                )}
                {errors[field.id] && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors[field.id]}
                  </p>
                )}
              </div>
            ))}
            {submitError && (
              <div className="text-sm text-red-500 bg-red-50 px-4 py-3 rounded">
                {submitError}
              </div>
            )}
            <div className="pt-2 relative">
              <button
                type="submit"
                disabled={
                  isSubmitting ||
                  Object.values(fileUploading).some(v => v)
                }
                className={`w-full py-3 px-4 bg-red-200 text-black hover:bg-red-200 hover:text-black font-medium rounded-md flex items-center justify-center gap-2 disabled:opacity-60`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : success ? (
                  <>
                    <Check className="w-4 h-4" />
                    Sent
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    {formConfig.submitLabel}
                  </>
                )}
              </button>
              {success && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs flex items-center gap-2 shadow">
                  <svg
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Successfully sent
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Form
