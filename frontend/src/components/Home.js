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
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b')"
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-cyan-400">AI-Driven</span> Cybersecurity
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Explore the evolving landscape of artificial intelligence in cybersecurity - 
            from emerging threats to cutting-edge defense mechanisms.
          </p>
          <div className="max-w-2xl mx-auto mb-8">
            <SearchBar onSearch={handleSearch} placeholder="Search cybersecurity topics..." />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">500M+</div>
              <div className="text-gray-400">AI-driven attacks annually</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">85%</div>
              <div className="text-gray-400">Faster threat detection with AI</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">24/7</div>
              <div className="text-gray-400">Automated security monitoring</div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Threats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-red-400">
                Emerging AI Threats
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Cybercriminals are leveraging artificial intelligence to create more sophisticated, 
                targeted, and harder-to-detect attacks. Understanding these threats is crucial for 
                modern cybersecurity.
              </p>
              <div className="space-y-6">
                {threats.map((threat, index) => (
                  <div key={index} className="bg-gray-700 p-6 rounded-lg border-l-4 border-red-500">
                    <div className="flex items-start space-x-4">
                      <span className="text-2xl">{threat.icon}</span>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{threat.title}</h3>
                        <p className="text-gray-300">{threat.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:order-first">
              <img 
                src="https://images.pexels.com/photos/5475752/pexels-photo-5475752.jpeg"
                alt="Cyber threats"
                className="w-full h-96 object-cover rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* AI Defense Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b"
                alt="AI Defense systems"
                className="w-full h-96 object-cover rounded-lg shadow-2xl"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-green-400">
                AI-Powered Defense
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Organizations are deploying advanced AI systems to detect, prevent, and respond 
                to cyber threats with unprecedented speed and accuracy.
              </p>
              <div className="space-y-6">
                {defenses.map((defense, index) => (
                  <div key={index} className="bg-gray-800 p-6 rounded-lg border-l-4 border-green-500">
                    <div className="flex items-start space-x-4">
                      <span className="text-2xl">{defense.icon}</span>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{defense.title}</h3>
                        <p className="text-gray-300">{defense.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Practices Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            <span className="text-cyan-400">Best Practices</span> for AI Cybersecurity
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-700 p-8 rounded-lg">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-4">Multi-Factor Authentication</h3>
              <p className="text-gray-300">Implement robust MFA systems that can resist AI-powered authentication attacks.</p>
            </div>
            <div className="bg-gray-700 p-8 rounded-lg">
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="text-xl font-semibold mb-4">Continuous Monitoring</h3>
              <p className="text-gray-300">Deploy AI-powered monitoring systems for real-time threat detection and response.</p>
            </div>
            <div className="bg-gray-700 p-8 rounded-lg">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-semibold mb-4">Security Training</h3>
              <p className="text-gray-300">Regular training to help users identify AI-generated phishing and social engineering.</p>
            </div>
            <div className="bg-gray-700 p-8 rounded-lg">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold mb-4">Zero Trust Architecture</h3>
              <p className="text-gray-300">Implement zero trust principles with AI-enhanced verification for all network access.</p>
            </div>
            <div className="bg-gray-700 p-8 rounded-lg">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-4">Regular Audits</h3>
              <p className="text-gray-300">Use AI tools to continuously audit and assess security posture and vulnerabilities.</p>
            </div>
            <div className="bg-gray-700 p-8 rounded-lg">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-4">Incident Response</h3>
              <p className="text-gray-300">Develop AI-assisted incident response plans for rapid threat containment and recovery.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Stay Ahead of AI Cybersecurity Threats
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Explore our comprehensive search to find specific information about AI cybersecurity threats, 
            defense mechanisms, and best practices.
          </p>
          <button 
            onClick={() => navigate('/search')}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
          >
            Explore Security Topics
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;