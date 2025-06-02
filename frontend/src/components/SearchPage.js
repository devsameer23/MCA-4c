import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchResult, setSearchResult] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // Cybersecurity topics with examples
  const securityTopics = [
    {
      id: 1,
      title: "Email Phishing Detection",
      description: "Learn to identify suspicious emails that try to steal your credentials or personal information.",
      riskLevel: "high",
      examples: [
        {
          type: "Suspicious Email",
          content: "URGENT: Your account will be suspended! Click here to verify immediately.",
          risk: "🚨 High Risk - Urgent language and suspicious links"
        },
        {
          type: "Safe Email", 
          content: "Thank you for your recent purchase. Your order confirmation is attached.",
          risk: "✅ Low Risk - Normal business communication"
        }
      ],
      tips: ["Check sender email carefully", "Look for urgent/threatening language", "Hover over links before clicking", "Verify with company directly"]
    },
    {
      id: 2,
      title: "URL Safety Checking",
      description: "Analyze URLs to detect potentially malicious or suspicious websites before visiting them.",
      riskLevel: "medium",
      examples: [
        {
          type: "Suspicious URL",
          content: "http://paypal-security-update.malicious-site.com/login",
          risk: "🚨 High Risk - Fake domain mimicking PayPal"
        },
        {
          type: "Safe URL",
          content: "https://www.paypal.com/signin",
          risk: "✅ Low Risk - Official PayPal website with HTTPS"
        }
      ],
      tips: ["Check for HTTPS encryption", "Verify domain spelling", "Avoid shortened links", "Look for official domains"]
    },
    {
      id: 3,
      title: "Password Security",
      description: "Create strong passwords and manage them securely to protect your accounts.",
      riskLevel: "high",
      examples: [
        {
          type: "Weak Password",
          content: "password123",
          risk: "🚨 High Risk - Common, easily guessed password"
        },
        {
          type: "Strong Password",
          content: "Tr@il2024!Mountain#",
          risk: "✅ Low Risk - Complex with numbers, symbols, capitals"
        }
      ],
      tips: ["Use 12+ characters", "Mix letters, numbers, symbols", "Unique for each account", "Use password manager"]
    },
    {
      id: 4,
      title: "Suspicious File Downloads",
      description: "Identify potentially dangerous file attachments and downloads.",
      riskLevel: "high",
      examples: [
        {
          type: "Dangerous File",
          content: "invoice.pdf.exe",
          risk: "🚨 High Risk - Executable file disguised as PDF"
        },
        {
          type: "Safe File",
          content: "report.pdf from trusted-company.com",
          risk: "✅ Low Risk - PDF from verified source"
        }
      ],
      tips: ["Check file extensions carefully", "Scan with antivirus", "Verify sender", "Avoid .exe from email"]
    },
    {
      id: 5,
      title: "Social Engineering Tactics",
      description: "Recognize manipulation techniques used by cybercriminals to trick people.",
      riskLevel: "medium",
      examples: [
        {
          type: "Social Engineering",
          content: "Hi, this is IT support. I need your password to fix your computer remotely.",
          risk: "🚨 High Risk - Impersonation and password request"
        },
        {
          type: "Legitimate Request",
          content: "Please submit a help desk ticket at support.company.com for IT assistance.",
          risk: "✅ Low Risk - Proper IT support process"
        }
      ],
      tips: ["Verify identity independently", "Never give passwords over phone", "Use official channels", "Trust your instincts"]
    },
    {
      id: 6,
      title: "Wi-Fi Network Security",
      description: "Stay safe when connecting to wireless networks, especially public ones.",
      riskLevel: "medium",
      examples: [
        {
          type: "Risky Network",
          content: "Free_WiFi_No_Password (Open network at coffee shop)",
          risk: "⚠️ Medium Risk - Unencrypted public network"
        },
        {
          type: "Secure Network",
          content: "CoffeeShop_Guest_5G (WPA3 protected with password)",
          risk: "✅ Low Risk - Password-protected network"
        }
      ],
      tips: ["Use VPN on public WiFi", "Prefer password-protected networks", "Avoid sensitive tasks on public WiFi", "Use mobile hotspot when possible"]
    }
  ];

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const query = urlParams.get("q") || "";
    setSearchQuery(query);
    performSearch(query);
  }, [location.search]);

  const performSearch = (query) => {
    setSearchResult("");
    let results = securityTopics;

    if (query.trim()) {
      const searchTerm = query.toLowerCase();
      
      // Analyze the search query for potential risks
      const riskyTerms = ["password", "urgent", "click here", "verify account", "suspend", "paypal-security", ".exe"];
      const safeTerms = ["https", "official", "secure", "verification"];
      
      const hasRiskyTerms = riskyTerms.some(term => searchTerm.includes(term));
      const hasSafeTerms = safeTerms.some(term => searchTerm.includes(term));
      
      if (hasRiskyTerms && !hasSafeTerms) {
        setSearchResult("⚠️ Your search contains potentially risky terms. See relevant security topics below.");
      } else if (hasSafeTerms) {
        setSearchResult("✅ Good security awareness! Here are related topics:");
      }
      
      // Filter topics based on search
      results = results.filter(item =>
        item.title.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        item.tips.some(tip => tip.toLowerCase().includes(searchTerm)) ||
        item.examples.some(example => 
          example.content.toLowerCase().includes(searchTerm) ||
          example.type.toLowerCase().includes(searchTerm)
        )
      );
    }

    setSearchResults(results);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        
        {/* Top Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">AI CyberSecurity</h1>
        </div>

        <div className="mb-8">
          <form onSubmit={handleSearch} className="max-w-md mx-auto">
            <div className="flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search security topics... (Try 'wrong' or 'correct')"
                className="flex-1 p-3 border border-gray-300 rounded-l text-sm focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-r text-sm"
              >
                Search
              </button>
            </div>
          </form>
          
          {searchResult && (
            <div className="max-w-md mx-auto mt-4 p-3 bg-gray-50 border border-gray-200 rounded text-sm text-center">
              {searchResult}
            </div>
          )}
          
          <p className="text-center text-sm text-gray-500 mt-4">
            {searchResults.length} topic{searchResults.length !== 1 ? 's' : ''} found
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {searchResults.map((topic) => (
            <div key={topic.id} className="bg-white p-6 rounded border border-gray-200">
              <div className="font-medium text-gray-800 mb-2 flex items-center">
                {topic.title}
                <span className={`ml-2 px-2 py-1 text-xs rounded ${
                  topic.riskLevel === 'high' ? 'bg-red-100 text-red-600' :
                  topic.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-green-100 text-green-600'
                }`}>
                  {topic.riskLevel} priority
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-4">{topic.description}</p>
              
              {/* Examples */}
              <div className="mb-4">
                <div className="text-sm font-medium text-gray-700 mb-2">Examples:</div>
                <div className="space-y-2">
                  {topic.examples.map((example, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded border">
                      <div className="text-xs font-medium text-gray-600 mb-1">{example.type}:</div>
                      <div className="text-xs text-gray-700 mb-2 font-mono bg-white p-2 rounded border">
                        "{example.content}"
                      </div>
                      <div className="text-xs">{example.risk}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tips */}
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">Security Tips:</div>
                <div className="space-y-1">
                  {topic.tips.map((tip, index) => (
                    <div key={index} className="text-xs text-gray-500 flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      {tip}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {searchResults.length === 0 && !searchResult && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No topics found</p>
            <button
              onClick={() => {
                setSearchQuery("");
                navigate("/search");
              }}
              className="text-blue-500 hover:text-blue-600 text-sm underline"
            >
              Show all topics
            </button>
          </div>
        )}

        <div className="text-center mt-8">
          <button 
            onClick={() => navigate('/')}
            className="text-blue-500 hover:text-blue-600 text-sm underline"
          >
            Back to tools
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;