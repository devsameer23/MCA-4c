import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

const Home = () => {
  const navigate = useNavigate();

  const handleSearch = (query) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const threats = [
    {
      title: "AI-Powered Phishing",
      description: "Sophisticated phishing attacks using AI to create highly personalized and convincing fraudulent emails, messages, and websites.",
      icon: "🎯"
    },
    {
      title: "Deepfake Technology",
      description: "AI-generated fake videos, audio, and images used for social engineering, identity theft, and disinformation campaigns.",
      icon: "🎭"
    },
    {
      title: "Automated Malware",
      description: "Self-evolving malware that uses machine learning to adapt its behavior and evade traditional security measures.",
      icon: "🦠"
    },
    {
      title: "AI-Driven Social Engineering",
      description: "Advanced social engineering attacks that use AI to analyze social media and personal data for targeted manipulation.",
      icon: "🧠"
    }
  ];

  const defenses = [
    {
      title: "Behavioral Analysis",
      description: "AI systems that monitor user behavior patterns to detect anomalies and potential security breaches in real-time.",
      icon: "📊"
    },
    {
      title: "Threat Intelligence",
      description: "Machine learning algorithms that analyze global threat data to predict and prevent emerging cyber attacks.",
      icon: "🛡️"
    },
    {
      title: "Automated Response",
      description: "AI-powered incident response systems that can automatically contain and neutralize threats without human intervention.",
      icon: "⚡"
    },
    {
      title: "Predictive Security",
      description: "Advanced AI models that can forecast potential vulnerabilities and recommend proactive security measures.",
      icon: "🔮"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Simple intro */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-gray-300 mb-8">
            Explore artificial intelligence in cybersecurity - from emerging threats to cutting-edge defense mechanisms.
          </p>
          <div className="max-w-2xl mx-auto mb-12">
            <SearchBar onSearch={handleSearch} placeholder="Search cybersecurity topics..." />
          </div>
        </div>
      </section>

      {/* Threats */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {threats.map((threat, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-lg border border-red-900/30">
                <div className="flex items-start space-x-3">
                  <span className="text-xl">{threat.icon}</span>
                  <div>
                    <div className="text-sm font-medium text-red-400 mb-2">{threat.title}</div>
                    <p className="text-sm text-gray-300">{threat.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Defenses */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {defenses.map((defense, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-lg border border-green-900/30">
                <div className="flex items-start space-x-3">
                  <span className="text-xl">{defense.icon}</span>
                  <div>
                    <div className="text-sm font-medium text-green-400 mb-2">{defense.title}</div>
                    <p className="text-sm text-gray-300">{defense.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best practices */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg border border-blue-900/30">
              <div className="flex items-start space-x-3">
                <span className="text-xl">🔒</span>
                <div>
                  <div className="text-sm font-medium text-blue-400 mb-2">Multi-Factor Authentication</div>
                  <p className="text-sm text-gray-300">Implement robust MFA systems that can resist AI-powered authentication attacks.</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-blue-900/30">
              <div className="flex items-start space-x-3">
                <span className="text-xl">🔄</span>
                <div>
                  <div className="text-sm font-medium text-blue-400 mb-2">Continuous Monitoring</div>
                  <p className="text-sm text-gray-300">Deploy AI-powered monitoring systems for real-time threat detection and response.</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-blue-900/30">
              <div className="flex items-start space-x-3">
                <span className="text-xl">📚</span>
                <div>
                  <div className="text-sm font-medium text-blue-400 mb-2">Security Training</div>
                  <p className="text-sm text-gray-300">Regular training to help users identify AI-generated phishing and social engineering.</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-blue-900/30">
              <div className="flex items-start space-x-3">
                <span className="text-xl">🛡️</span>
                <div>
                  <div className="text-sm font-medium text-blue-400 mb-2">Zero Trust Architecture</div>
                  <p className="text-sm text-gray-300">Implement zero trust principles with AI-enhanced verification for all network access.</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-blue-900/30">
              <div className="flex items-start space-x-3">
                <span className="text-xl">🔍</span>
                <div>
                  <div className="text-sm font-medium text-blue-400 mb-2">Regular Audits</div>
                  <p className="text-sm text-gray-300">Use AI tools to continuously audit and assess security posture and vulnerabilities.</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-blue-900/30">
              <div className="flex items-start space-x-3">
                <span className="text-xl">⚡</span>
                <div>
                  <div className="text-sm font-medium text-blue-400 mb-2">Incident Response</div>
                  <p className="text-sm text-gray-300">Develop AI-assisted incident response plans for rapid threat containment and recovery.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple call to action */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <button 
            onClick={() => navigate('/search')}
            className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded text-sm transition-colors"
          >
            Search topics
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;