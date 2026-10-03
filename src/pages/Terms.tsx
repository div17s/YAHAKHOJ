import React from 'react';
import { useNavigate } from 'react-router-dom';

const TermsOfService = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-ink-900 font-sans p-6 sm:p-12 md:p-20">
      <button onClick={() => navigate('/')} className="mb-8 text-sm font-semibold text-orange-600 hover:text-orange-800">
        &larr; Back to Home
      </button>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: October 3, 2026</p>
        
        <p className="mb-6">Welcome to Yaha Khoj. These Terms of Service ("Terms") govern your access to and use of the Yaha Khoj website, services, and applications (collectively, the "Service"). By accessing or using the Service, you agree to be bound by these Terms.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
        <p className="mb-4">By creating an account or accessing the Service, you confirm that you have read, understood, and agreed to be bound by these Terms and our Privacy Policy. If you do not agree, you may not use the Service.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Eligibility</h2>
        <p className="mb-4">You must be at least 18 years old, or the age of majority in your jurisdiction, to use the Service. By using the Service, you represent and warrant that you meet this requirement.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. User Accounts and Security</h2>
        <p className="mb-4">You are responsible for maintaining the confidentiality of your account credentials. You agree to accept responsibility for all activities that occur under your account. We reserve the right to suspend or terminate accounts that violate these Terms.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Acceptable Use</h2>
        <p className="mb-4">You agree not to misuse the Service. This includes, but is not limited to, engaging in illegal activities, transmitting harmful code, or attempting to gain unauthorized access to our systems.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Intellectual Property</h2>
        <p className="mb-4">All content provided through the Service, including text, graphics, and software, is the property of Yaha Khoj or its licensors and is protected by intellectual property laws.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Limitation of Liability</h2>
        <p className="mb-4">To the fullest extent permitted by law, Yaha Khoj shall not be liable for any indirect, incidental, special, or consequential damages resulting from your use of the Service.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">7. Contact Information</h2>
        <p className="mb-4">If you have any questions about these Terms, please contact us through our support channels.</p>
      </div>
    </div>
  );
};

export default TermsOfService;
