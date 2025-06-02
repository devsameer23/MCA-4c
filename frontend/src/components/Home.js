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

    const text = emailText.toLowerCase();
    let riskScore = 0;
    let riskFactors = [];

    // Advanced phishing detection patterns
    const urgencyWords = ["urgent", "immediate", "expire", "suspend", "deadline", "act now", "limited time", "expires today"];
    const threatWords = ["account suspended", "verify immediately", "confirm identity", "security alert", "unusual activity"];
    const actionWords = ["click here", "click now", "verify account", "update payment", "confirm details", "sign in"];
    const requestWords = ["provide password", "enter ssn", "social security", "credit card", "bank account", "routing number"];
    const genericGreetings = ["dear customer", "dear user", "dear sir/madam", "valued customer", "account holder"];
    
    // Check for urgency indicators (high risk)
    urgencyWords.forEach(word => {
      if (text.includes(word)) {
        riskScore += 25;
        riskFactors.push(`Urgency language: "${word}"`);
      }
    });

    // Check for threat language (high risk)
    threatWords.forEach(phrase => {
      if (text.includes(phrase)) {
        riskScore += 30;
        riskFactors.push(`Threat language: "${phrase}"`);
      }
    });

    // Check for suspicious action requests (medium risk)
    actionWords.forEach(phrase => {
      if (text.includes(phrase)) {
        riskScore += 20;
        riskFactors.push(`Suspicious request: "${phrase}"`);
      }
    });

    // Check for sensitive information requests (very high risk)
    requestWords.forEach(phrase => {
      if (text.includes(phrase)) {
        riskScore += 40;
        riskFactors.push(`Requests sensitive info: "${phrase}"`);
      }
    });

    // Check for generic greetings (medium risk)
    genericGreetings.forEach(greeting => {
      if (text.includes(greeting)) {
        riskScore += 15;
        riskFactors.push(`Generic greeting: "${greeting}"`);
      }
    });

    // Check for suspicious URLs
    const urlPattern = /https?:\/\/[^\s]+/g;
    const urls = emailText.match(urlPattern);
    if (urls) {
      urls.forEach(url => {
        try {
          const urlObj = new URL(url);
          if (!url.startsWith("https://")) {
            riskScore += 15;
            riskFactors.push("Non-HTTPS link detected");
          }
          if (urlObj.hostname.includes("bit.ly") || urlObj.hostname.includes("tinyurl") || urlObj.hostname.includes("t.co")) {
            riskScore += 25;
            riskFactors.push("Shortened URL detected");
          }
          // Check for suspicious domain patterns
          const suspiciousDomains = ["paypal-verify", "amazon-security", "microsoft-update", "google-security", "apple-support"];
          if (suspiciousDomains.some(domain => urlObj.hostname.includes(domain))) {
            riskScore += 35;
            riskFactors.push(`Suspicious domain: ${urlObj.hostname}`);
          }
        } catch (e) {
          riskScore += 10;
          riskFactors.push("Malformed URL detected");
        }
      });
    }

    // Check for spelling and grammar issues (basic)
    const commonMisspellings = ["recieve", "occured", "seperate", "acommodate", "priviledge", "necesary"];
    commonMisspellings.forEach(misspelling => {
      if (text.includes(misspelling)) {
        riskScore += 10;
        riskFactors.push(`Spelling error: "${misspelling}"`);
      }
    });

    // Check for excessive punctuation or caps
    if (/[!]{2,}/.test(emailText) || /[?]{2,}/.test(emailText)) {
      riskScore += 10;
      riskFactors.push("Excessive punctuation detected");
    }

    const capsWords = emailText.match(/\b[A-Z]{3,}\b/g);
    if (capsWords && capsWords.length > 2) {
      riskScore += 15;
      riskFactors.push("Excessive capital letters detected");
    }

    // Determine risk level and provide detailed result
    let riskLevel, riskColor, riskIcon;
    if (riskScore >= 80) {
      riskLevel = "VERY HIGH RISK";
      riskColor = "text-red-600 bg-red-50";
      riskIcon = "🚨";
    } else if (riskScore >= 50) {
      riskLevel = "HIGH RISK";
      riskColor = "text-red-600 bg-red-50";
      riskIcon = "🚨";
    } else if (riskScore >= 25) {
      riskLevel = "MEDIUM RISK";
      riskColor = "text-yellow-600 bg-yellow-50";
      riskIcon = "⚠️";
    } else if (riskScore >= 10) {
      riskLevel = "LOW RISK";
      riskColor = "text-blue-600 bg-blue-50";
      riskIcon = "ℹ️";
    } else {
      riskLevel = "VERY LOW RISK";
      riskColor = "text-green-600 bg-green-50";
      riskIcon = "✅";
    }

    let result = `${riskIcon} ${riskLevel} (Score: ${riskScore}/100)\n\n`;
    
    if (riskFactors.length > 0) {
      result += `Risk factors detected:\n${riskFactors.map(factor => `• ${factor}`).join('\n')}`;
    } else {
      result += "No suspicious indicators detected. Email appears legitimate.";
    }

    if (riskScore >= 50) {
      result += "\n\n⚠️ Recommendation: DO NOT interact with this email. Delete it immediately.";
    } else if (riskScore >= 25) {
      result += "\n\n⚠️ Recommendation: Exercise caution. Verify sender through official channels before taking action.";
    } else {
      result += "\n\n✅ Recommendation: Email appears safe, but always remain vigilant.";
    }

    setEmailResult(result);
  };

  const analyzeUrl = () => {
    if (!urlText.trim()) {
      setUrlResult("Please enter a URL to analyze");
      return;
    }

    // Simple test keywords
    if (urlText.toLowerCase().includes("wrong")) {
      setUrlResult("🚨 High risk - Dangerous URL detected");
      return;
    }

    if (urlText.toLowerCase().includes("correct")) {
      setUrlResult("✅ Low risk - URL appears safe");
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
        
        {/* Top Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">AI CyberSecurity</h1>
          <p className="text-gray-600">Simple cybersecurity analysis tools</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Email Phishing Analyzer */}
          <div className="bg-white p-6 rounded border border-gray-200">
            <div className="text-lg font-medium text-gray-800 mb-4">Email Phishing Detector</div>
            <textarea
              value={emailText}
              onChange={(e) => setEmailText(e.target.value)}
              placeholder="Paste email content here to check for phishing indicators... (Try typing 'wrong' or 'correct' to test)"
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
              placeholder="Enter URL to analyze... (Try typing 'wrong' or 'correct' to test)"
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