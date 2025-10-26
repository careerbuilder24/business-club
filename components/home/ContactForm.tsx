
'use client'
import React, { useState, useCallback, useMemo } from 'react';
import { Mail, User, Phone, MapPin, MessageSquare } from 'lucide-react'; // Added MessageSquare icon

// 1. Define the TypeScript Interface for the form state
interface ContactFormState {
  name: string;
  email: string;
  phone: string;
  address: string;
  message: string; // New field for the message
}

// 2. Define the TypeScript Interface for input props
interface FormInputProps {
  id: keyof ContactFormState;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea';
  Icon: React.ElementType;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
}

/**
 * Reusable input component with Tailwind styling and icons.
 */
const FormInput: React.FC<FormInputProps> = ({ id, label, type, Icon, value, onChange, error }) => (
  <div className="mb-6">
    {/* Updated text color for dark background */}
    <label htmlFor={id} className="block text-sm font-medium text-gray-100 mb-2">
      {label} <span className="text-red-300">*</span>
    </label>
    <div className="relative rounded-lg shadow-sm">
      {/* Icon placement */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>

      {type === 'textarea' ? (
        <textarea
          id={id}
          name={id}
          value={value}
          onChange={onChange as (e: React.ChangeEvent<HTMLTextAreaElement>) => void}
          rows={id === 'address' ? 3 : 5} // Use more rows for the main message
          required
          // Inputs remain white/light for high contrast
          className={`block w-full rounded-lg border-2 pl-10 py-3 transition duration-150 ease-in-out font-inter bg-white text-gray-900
                     ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'}
                     sm:text-sm shadow-inner resize-none`}
          placeholder={`Enter your ${label.toLowerCase()}`}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange as (e: React.ChangeEvent<HTMLInputElement>) => void}
          required
          className={`block w-full rounded-lg border-2 pl-10 py-3 transition duration-150 ease-in-out font-inter bg-white text-gray-900
                     ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'}
                     sm:text-sm shadow-inner`}
          placeholder={`Enter your ${label.toLowerCase()}`}
        />
      )}
    </div>
    {error && (
      <p className="mt-2 text-sm text-red-300 font-medium">{error}</p>
    )}
  </div>
);

/**
 * Main Contact Form Component.
 */
const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormState>({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: '', // Initialized new field
  });
  const [errors, setErrors] = useState<Partial<ContactFormState>>({});
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // Input change handler
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for the field being edited
    if (errors[name as keyof ContactFormState]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }, [errors]);

  // Validation function
  const validate = useCallback((data: ContactFormState): Partial<ContactFormState> => {
    const newErrors: Partial<ContactFormState> = {};
    if (!data.name.trim()) newErrors.name = 'Full Name is required.';
    if (!data.email.trim()) {
      newErrors.email = 'Email Address is required.';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = 'Email Address is invalid.';
    }
    if (!data.phone.trim()) newErrors.phone = 'Phone Number is required.';
    if (!data.address.trim()) newErrors.address = 'Address is required.';
    if (!data.message.trim()) newErrors.message = 'A message is required.'; // New validation for message
    return newErrors;
  }, []);

  // Submission handler
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitStatus('error');
      // Set error status message for user feedback
      setTimeout(() => setSubmitStatus('idle'), 3000);
      return;
    }

    setErrors({});
    setSubmitStatus('submitting');

    // --- Placeholder API call logic ---
    console.log('Form Data submitted:', formData);

    try {
      // Simulate network request delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', address: '', message: '' }); // Clear form including message
    } catch (error) {
      console.error('Submission failed:', error);
      setSubmitStatus('error');
    }

    // Reset status after a few seconds
    setTimeout(() => setSubmitStatus('idle'), 4000);
  }, [formData, validate]);

  // Status message rendering
  const statusMessage = useMemo(() => {
    switch (submitStatus) {
      case 'submitting':
        return <p className="text-indigo-200 font-semibold flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Sending...
        </p>;
      case 'success':
        return <p className="text-green-300 font-semibold">✅ Message Sent Successfully!</p>;
      case 'error':
        return <p className="text-red-300 font-semibold">❌ Submission Failed! Please check fields.</p>;
      default:
        return null;
    }
  }, [submitStatus]);

  return (
    // Card with dark green background
    <div 
      className="w-full max-w-lg p-8 sm:p-10 shadow-2xl rounded-xl transition duration-500" 
      style={{ 
        backgroundColor: '#2C8845', 
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.2)' 
      }}
    >
      {/* Text color updated to white for visibility */}
      <h1 className="text-3xl font-extrabold text-white mb-2 border-b-2 border-white pb-2">
        Get in Touch
      </h1>
      <p className="text-gray-200 mb-8 font-inter">
        We'd love to hear from you! Please fill out the form below.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          id="name"
          label="Full Name"
          type="text"
          Icon={User}
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
        />
        <FormInput
          id="email"
          label="Email Address"
          type="email"
          Icon={Mail}
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />
        <FormInput
          id="phone"
          label="Phone Number"
          type="tel"
          Icon={Phone}
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
        />
        <FormInput
          id="address"
          label="Address"
          type="textarea"
          Icon={MapPin}
          value={formData.address}
          onChange={handleChange}
          error={errors.address}
        />
        
        {/* NEW MESSAGE FIELD */}
        <FormInput
          id="message"
          label="Your Message"
          type="textarea"
          Icon={MessageSquare}
          value={formData.message}
          onChange={handleChange}
          error={errors.message}
        />

        <div className="pt-4">
          <button
            type="submit"
            disabled={submitStatus === 'submitting'}
            // Retained indigo for button contrast
            className={`w-full text-[#2C8845] duration-300 ease-in-out flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-bold  transition transform
              ${submitStatus === 'submitting'
                ? 'bg-white cursor-not-allowed'
                : 'bg-white hover:bg-green-500 hover:scale-[1.01] focus:outline-none focus:ring-4 hover:text-white focus:ring-opacity-50'
              }`}
          >
            {submitStatus === 'submitting' ? 'Sending Message...' : 'Send Message'}
          </button>
        </div>

        <div className="h-6 text-center mt-4">
          {statusMessage}
        </div>
      </form>
    </div>
  );
};

// The main App component wraps the Contact form for the single-file setup
const App: React.FC = () => {
  return (
    // Outer background reverted to light gray
    <div 
      className="min-h-screen bg-gray-100 flex items-center justify-center p-4" 
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      <script src="https://cdn.tailwindcss.com"></script>
      <Contact />
    </div>
  );
};

export default App;
