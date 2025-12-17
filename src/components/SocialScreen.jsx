import React from 'react';
import { Twitter, MessageCircle, Sparkles, Check, ChevronRight } from 'lucide-react';

export default function SocialScreen({ connectedSocials, setConnectedSocials, completeSetup, setScreen }) {
  const connectSocial = (platform) => {
    if (platform === 'discord') {
      window.open('https://dub.sh/BOHBOOdiscord', '_blank');
    } else if (platform === 'beena') {
      window.open('https://dub.sh/startVBH', '_blank');
    }
    setConnectedSocials(prev => ({ ...prev, [platform]: true }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <button 
          onClick={() => setScreen('wallet')} 
          className="text-gray-400 hover:text-white mb-6 flex items-center gap-2"
        >
          <ChevronRight className="w-5 h-5 rotate-180" />
          Back
        </button>

        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🌐</div>
          <h1 className="text-4xl font-bold text-white mb-2">Connect Socials</h1>
          <p className="text-gray-400">Join our community</p>
        </div>

        <div className="bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-700 space-y-4 mb-6">
          <button
            onClick={() => connectSocial('twitter')}
            className={`w-full ${connectedSocials.twitter ? 'bg-blue-600' : 'bg-blue-500 hover:bg-blue-600'} text-white font-bold py-5 rounded-xl transition-all shadow-lg flex items-center justify-between px-6 text-lg`}
          >
            <div className="flex items-center gap-3">
              <Twitter className="w-6 h-6" />
              <span>Connect X (Twitter)</span>
            </div>
            {connectedSocials.twitter && <Check className="w-6 h-6" />}
          </button>

          <button
            onClick={() => connectSocial('discord')}
            className={`w-full ${connectedSocials.discord ? 'bg-indigo-600' : 'bg-indigo-500 hover:bg-indigo-600'} text-white font-bold py-5 rounded-xl transition-all shadow-lg flex items-center justify-between px-6 text-lg`}
          >
            <div className="flex items-center gap-3">
              <MessageCircle className="w-6 h-6" />
              <span>Join Discord</span>
            </div>
            {connectedSocials.discord && <Check className="w-6 h-6" />}
          </button>

          <button
            onClick={() => connectSocial('beena')}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-5 rounded-xl transition-all shadow-lg flex items-center justify-center gap-3 text-lg"
          >
            <Sparkles className="w-6 h-6" />
            <span>Try Bee-na AI</span>
          </button>
        </div>

        <button
          onClick={completeSetup}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg text-lg"
        >
          Complete Setup & Start
        </button>

        <button
          onClick={completeSetup}
          className="w-full text-gray-400 hover:text-white mt-4 text-sm"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}