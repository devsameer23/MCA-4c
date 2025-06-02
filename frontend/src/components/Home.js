import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [emailText, setEmailText] = useState("");
  const [urlText, setUrlText] = useState("");
  const [emailResult, setEmailResult] = useState("");
  const [urlResult, setUrlResult] = useState("");

  const analyzeEmail = () => {
    if (!emailText.trim()) {
      setEmailResult("Please enter email content to analyze");
      return;
    }

    const phishingIndicators = [
      "urgent action required",
      "verify your account",
      "click here immediately",
      "limited time offer",
      "suspend your account",
      "confirm your identity",
      "unusual activity",
      "expire today",
      "act now",
      "click this link"
    ];

    const suspiciousWords = phishingIndicators.filter(indicator => 
      emailText.toLowerCase().includes(indicator.toLowerCase())
    );

    if (suspiciousWords.length === 0) {
      setEmailResult("✅ Low risk - No common phishing indicators detected");
    } else if (suspiciousWords.length <= 2) {
      setEmailResult(`⚠️ Medium risk - Found ${suspiciousWords.length} phishing indicator(s): ${suspiciousWords.join(", ")}`);
    } else {
      setEmailResult(`🚨 High risk - Found ${suspiciousWords.length} phishing indicators: ${suspiciousWords.join(", ")}`);
    }
  };

  const analyzeUrl = () => {
    if (!urlText.trim()) {
      setUrlResult("Please enter a URL to analyze");
      return;
    }

    try {
      const url = new URL(urlText);
      const risks = [];

      // Check for suspicious patterns
      if (!urlText.startsWith("https://")) {
        risks.push("Not using HTTPS");
      }

      if (url.hostname.includes("bit.ly") || url.hostname.includes("tinyurl") || url.hostname.includes("t.co")) {
        risks.push("Shortened URL");
      }

      if (/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(url.hostname)) {
        risks.push("Uses IP address instead of domain");
      }

      const suspiciousDomains = ["secure-bank", "paypal-verify", "amazon-security", "microsoft-update"];
      if (suspiciousDomains.some(domain => url.hostname.includes(domain))) {
        risks.push("Suspicious domain name");
      }

      if (url.hostname.split('.').length > 3) {
        risks.push("Complex subdomain structure");
      }

      if (risks.length === 0) {
        setUrlResult("✅ Low risk - No obvious suspicious indicators");
      } else {
        setUrlResult(`⚠️ Potential risks found: ${risks.join(", ")}`);
      }
    } catch (error) {
      setUrlResult("❌ Invalid URL format");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        
        <div className="text-center mb-8">
          <p className="text-gray-600">Simple cybersecurity analysis tools</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Email Phishing Analyzer */}
          <div className="bg-white p-6 rounded border border-gray-200">
            <div className="text-lg font-medium text-gray-800 mb-4">Email Phishing Detector</div>
            <textarea
              value={emailText}
              onChange={(e) => setEmailText(e.target.value)}
              placeholder="Paste email content here to check for phishing indicators..."
              className="w-full h-32 p-3 border border-gray-300 rounded text-sm resize-none focus:outline-none focus:border-blue-500"
            />
            <button 
              onClick={analyzeEmail}
              className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm"
            >
              Analyze Email
            </button>
            {emailResult && (
              <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded text-sm">
                {emailResult}
              </div>
            )}
          </div>

          {/* URL Analyzer */}
          <div className="bg-white p-6 rounded border border-gray-200">
            <div className="text-lg font-medium text-gray-800 mb-4">URL Safety Checker</div>
            <input
              type="text"
              value={urlText}
              onChange={(e) => setUrlText(e.target.value)}
              placeholder="Enter URL to analyze (e.g., https://example.com)"
              className="w-full p-3 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
            />
            <button 
              onClick={analyzeUrl}
              className="mt-3 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm"
            >
              Check URL
            </button>
            {urlResult && (
              <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded text-sm">
                {urlResult}
              </div>
            )}
          </div>
        </div>

        {/* Simple Tips */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded border border-gray-200 text-center">
            <div className="text-2xl mb-2">🔍</div>
            <div className="text-sm font-medium text-gray-700">Check sender</div>
            <div className="text-xs text-gray-500 mt-1">Verify email addresses carefully</div>
          </div>
          <div className="bg-white p-4 rounded border border-gray-200 text-center">
            <div className="text-2xl mb-2">🔗</div>
            <div className="text-sm font-medium text-gray-700">Hover links</div>
            <div className="text-xs text-gray-500 mt-1">Check where links actually go</div>
          </div>
          <div className="bg-white p-4 rounded border border-gray-200 text-center">
            <div className="text-2xl mb-2">⏰</div>
            <div className="text-sm font-medium text-gray-700">Don't rush</div>
            <div className="text-xs text-gray-500 mt-1">Take time to think before clicking</div>
          </div>
        </div>

        <div className="text-center mt-8">
          <button 
            onClick={() => navigate('/search')}
            className="text-blue-500 hover:text-blue-600 text-sm underline"
          >
            Search more security topics
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;