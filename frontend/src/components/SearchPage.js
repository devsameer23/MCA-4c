import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const location = useLocation();
  const navigate = useNavigate();

  // Mock cybersecurity data
  const cybersecurityData = [
    {
      id: 1,
      title: "AI-Powered Phishing Attacks",
      category: "threats",
      description: "Advanced phishing techniques using machine learning to create highly personalized and convincing fraudulent communications.",
      content: "AI-powered phishing represents a significant evolution in cybercrime, utilizing natural language processing and behavioral analysis to craft messages that are nearly indistinguishable from legitimate communications.",
      tags: ["phishing", "AI", "social engineering", "email security"]
    },
    {
      id: 2,
      title: "Deepfake Detection Technologies",
      category: "defenses",
      description: "AI-based systems designed to identify and flag deepfake content in real-time across various media formats.",
      content: "Modern deepfake detection employs neural networks trained on vast datasets to identify subtle artifacts and inconsistencies that betray synthetic content.",
      tags: ["deepfake", "detection", "AI", "media security", "neural networks"]
    },
    {
      id: 3,
      title: "Behavioral Analytics for Threat Detection",
      category: "defenses",
      description: "Machine learning systems that analyze user behavior patterns to identify potential security breaches and insider threats.",
      content: "Behavioral analytics leverage AI to establish baseline user activities and detect anomalies that may indicate compromised accounts or malicious insider activity.",
      tags: ["behavioral analysis", "threat detection", "machine learning", "insider threats"]
    },
    {
      id: 4,
      title: "Automated Malware Generation",
      category: "threats",
      description: "AI systems capable of generating new malware variants that can evade traditional signature-based detection methods.",
      content: "Cybercriminals are using genetic algorithms and neural networks to create polymorphic malware that continuously evolves its code structure.",
      tags: ["malware", "automation", "evasion", "polymorphic", "genetic algorithms"]
    },
    {
      id: 5,
      title: "Zero Trust Architecture Implementation",
      category: "practices",
      description: "Security framework that requires verification for every user and device, enhanced with AI-driven risk assessment.",
      content: "Zero Trust with AI integration provides dynamic risk scoring and adaptive access controls based on real-time threat intelligence and user behavior.",
      tags: ["zero trust", "access control", "risk assessment", "network security"]
    },
    {
      id: 6,
      title: "AI-Enhanced Incident Response",
      category: "defenses",
      description: "Automated systems that can detect, analyze, and respond to security incidents faster than human teams.",
      content: "AI incident response systems can correlate threat indicators, prioritize alerts, and execute containment procedures within seconds of detection.",
      tags: ["incident response", "automation", "threat correlation", "SOAR"]
    },
    {
      id: 7,
      title: "Adversarial Machine Learning Attacks",
      category: "threats",
      description: "Techniques designed to fool AI security systems by manipulating input data to cause misclassification.",
      content: "Adversarial attacks exploit the mathematical properties of neural networks to create inputs that appear normal but are misclassified by AI systems.",
      tags: ["adversarial", "machine learning", "model poisoning", "AI security"]
    },
    {
      id: 8,
      title: "Multi-Factor Authentication Best Practices",
      category: "practices",
      description: "Advanced MFA implementations that resist AI-powered attacks and social engineering attempts.",
      content: "Modern MFA should include biometric factors, behavioral authentication, and risk-based adaptive controls to counter AI-driven attack vectors.",
      tags: ["MFA", "authentication", "biometrics", "adaptive security"]
    },
    {
      id: 9,
      title: "AI-Driven Vulnerability Assessment",
      category: "defenses",
      description: "Automated systems that continuously scan and assess vulnerabilities using machine learning algorithms.",
      content: "AI vulnerability scanners can prioritize risks, predict exploit likelihood, and recommend remediation strategies based on environmental context.",
      tags: ["vulnerability assessment", "risk prioritization", "automated scanning", "threat intelligence"]
    },
    {
      id: 10,
      title: "Social Engineering with AI",
      category: "threats",
      description: "Advanced social engineering attacks that use AI to analyze social media and personal data for targeted manipulation.",
      content: "AI-enhanced social engineering combines natural language processing with psychological profiling to create highly effective manipulation campaigns.",
      tags: ["social engineering", "manipulation", "OSINT", "psychological profiling"]
    }
  ];

  const categories = [
    { value: "all", label: "All Topics" },
    { value: "threats", label: "AI Threats" },
    { value: "defenses", label: "AI Defenses" },
    { value: "practices", label: "Best Practices" }
  ];

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const query = urlParams.get("q") || "";
    setSearchQuery(query);
    performSearch(query, selectedCategory);
  }, [location.search, selectedCategory]);

  const performSearch = (query, category) => {
    let results = cybersecurityData;

    // Filter by category
    if (category !== "all") {
      results = results.filter(item => item.category === category);
    }

    // Filter by search query
    if (query.trim()) {
      const searchTerm = query.toLowerCase();
      results = results.filter(item =>
        item.title.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        item.content.toLowerCase().includes(searchTerm) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    setSearchResults(results);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "threats": return "text-red-400 bg-red-900/20 border-red-400";
      case "defenses": return "text-green-400 bg-green-900/20 border-green-400";
      case "practices": return "text-blue-400 bg-blue-900/20 border-blue-400";
      default: return "text-gray-400 bg-gray-900/20 border-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-cyan-400">Search</span> Cybersecurity Topics
          </h1>
          <p className="text-gray-300 mb-6">
            Find information about AI-driven threats, defense mechanisms, and best practices
          </p>
          <div className="max-w-2xl mx-auto">
            <SearchBar 
              onSearch={handleSearch} 
              initialValue={searchQuery}
              placeholder="Search threats, defenses, best practices..."
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => handleCategoryChange(category.value)}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                selectedCategory === category.value
                  ? "bg-cyan-500 border-cyan-500 text-white"
                  : "border-gray-600 text-gray-300 hover:border-cyan-400 hover:text-cyan-400"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Search Results */}
        <div className="mb-6">
          <p className="text-gray-400">
            Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map((result) => (
            <div key={result.id} className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-cyan-400 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-semibold text-white">{result.title}</h3>
                <span className={`px-2 py-1 text-xs rounded border ${getCategoryColor(result.category)}`}>
                  {result.category}
                </span>
              </div>
              <p className="text-gray-300 mb-4 text-sm">{result.description}</p>
              <p className="text-gray-400 text-sm mb-4 line-clamp-3">{result.content}</p>
              <div className="flex flex-wrap gap-2">
                {result.tags.slice(0, 3).map((tag, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded"
                  >
                    #{tag}
                  </span>
                ))}
                {result.tags.length > 3 && (
                  <span className="px-2 py-1 bg-gray-700 text-gray-400 text-xs rounded">
                    +{result.tags.length - 3} more
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {searchResults.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No results found</h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your search terms or selecting a different category
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                navigate("/search");
              }}
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              View All Topics
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;