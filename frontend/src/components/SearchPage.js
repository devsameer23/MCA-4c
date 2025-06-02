import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchResult, setSearchResult] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // Simple security topics
  const securityTopics = [
    {
      id: 1,
      title: "Phishing Emails",
      description: "How to identify and avoid fraudulent emails that try to steal your information.",
      tips: ["Check sender address", "Look for urgent language", "Verify links before clicking"]
    },
    {
      id: 2,
      title: "Safe Browsing",
      description: "Best practices for secure web browsing and avoiding malicious websites.",
      tips: ["Use HTTPS sites", "Keep browser updated", "Be careful with downloads"]
    },
    {
      id: 3,
      title: "Password Security",
      description: "Creating and managing strong passwords to protect your accounts.",
      tips: ["Use unique passwords", "Enable 2FA when possible", "Use password managers"]
    },
    {
      id: 4,
      title: "Software Updates",
      description: "Why keeping your software updated is crucial for security.",
      tips: ["Enable automatic updates", "Update regularly", "Use official sources"]
    },
    {
      id: 5,
      title: "Wi-Fi Security",
      description: "How to stay safe when using public or home wireless networks.",
      tips: ["Avoid public Wi-Fi for sensitive tasks", "Use VPN when needed", "Secure home router"]
    },
    {
      id: 6,
      title: "Social Media Safety",
      description: "Protecting your privacy and security on social media platforms.",
      tips: ["Review privacy settings", "Think before posting", "Be careful with friend requests"]
    }
  ];

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const query = urlParams.get("q") || "";
    setSearchQuery(query);
    performSearch(query);
  }, [location.search]);

  const performSearch = (query) => {
    // Simple test keywords for search function
    if (query.toLowerCase().includes("wrong")) {
      setSearchResult("🚨 High risk - Dangerous search detected");
      setSearchResults([]);
      return;
    }

    if (query.toLowerCase().includes("correct")) {
      setSearchResult("✅ Low risk - Safe search query");
      setSearchResults(securityTopics);
      return;
    }

    setSearchResult("");
    let results = securityTopics;

    if (query.trim()) {
      const searchTerm = query.toLowerCase();
      results = results.filter(item =>
        item.title.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        item.tips.some(tip => tip.toLowerCase().includes(searchTerm))
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {searchResults.map((topic) => (
            <div key={topic.id} className="bg-white p-4 rounded border border-gray-200">
              <div className="font-medium text-gray-800 mb-2">{topic.title}</div>
              <p className="text-sm text-gray-600 mb-3">{topic.description}</p>
              <div className="space-y-1">
                {topic.tips.map((tip, index) => (
                  <div key={index} className="text-xs text-gray-500 flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    {tip}
                  </div>
                ))}
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