import React from 'react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-ink-900 font-sans p-6 sm:p-12 md:p-20">
      <button onClick={() => navigate('/')} className="mb-8 text-sm font-semibold text-orange-600 hover:text-orange-800">
        &larr; Back to Home
      </button>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: October 3, 2026</p>

        <p className="mb-6">At Yaha Khoj, your privacy is of paramount importance. This Privacy Policy explains how we collect, use, and protect your personal information when you use our Service.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
        <p className="mb-4">We collect information that you provide directly to us, such as when you create an account, update your profile, or contact our support team. This may include your name, email address, and other contact details.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
        <p className="mb-4">We use the information we collect to operate, maintain, and improve our Service, to communicate with you, and to personalize your experience. We do not sell your personal information to third parties.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Data Security</h2>
        <p className="mb-4">We implement reasonable security measures to protect your information from unauthorized access, alteration, or disclosure. However, please note that no method of transmission over the internet is completely secure.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Third-Party Links</h2>
        <p className="mb-4">Our Service may contain links to third-party websites. We are not responsible for the privacy practices of those websites.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Children's Privacy</h2>
        <p className="mb-4">Our Service is not directed to children under 13, and we do not knowingly collect personal information from children under 13.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Updates to this Policy</h2>
        <p className="mb-4">We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">7. Contact Us</h2>
        <p className="mb-4">If you have any questions or concerns about this Privacy Policy, please contact us.</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
