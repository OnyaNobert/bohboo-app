import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function RegisterScreen({
  authMethod,
  username,
  setUsername,
  displayName,
  setDisplayName,
  email,
  setEmail,
  phone,
  setPhone,
  setScreen
}) {
  const handleContinue = () => {
    if (username.trim() && displayName.trim() && (email.trim() || phone.trim())) {
      setScreen('wallet');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <button 
          onClick={() => setScreen('welcome')} 
          className="text-gray-400 hover:text-white mb-6 flex items-center gap-2"
        >
          <ChevronRight className="w-5 h-5 rotate-180" />
          Back
        </button>

        <div className="text-center mb-8">
          <div className="text-6xl mb-4">✨</div>
          <h1 className="text-4xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-gray-400">Let's get you started</p>
        </div>

        <div className="bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-700 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-gray-700/50 text-white rounded-xl px-4 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
              placeholder="Choose a username"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Display Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full bg-gray-700/50 text-white rounded-xl px-4 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
              placeholder="Your name"
            />
          </div>

          {authMethod === 'email' ? (
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-700/50 text-white rounded-xl px-4 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                placeholder="your@email.com"
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-gray-700/50 text-white rounded-xl px-4 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                placeholder="+1 (555) 000-0000"
              />
            </div>
          )}

          <button
            onClick={handleContinue}
            disabled={!username.trim() || !displayName.trim() || (!email.trim() && !phone.trim())}
            className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all shadow-lg text-lg"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}