import React from 'react';
import { Mail, Phone } from 'lucide-react';

export default function WelcomeScreen({ setAuthMethod, setScreen }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <div className="text-8xl mb-6 animate-bounce">💝</div>
          <h1 className="text-6xl font-black text-white mb-4 tracking-tight">BohBoo</h1>
          <p className="text-gray-300 text-xl font-light">Spread kindness. Build streaks. Earn rewards.</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => { setAuthMethod('email'); setScreen('register'); }}
            className="w-full bg-white hover:bg-gray-100 text-gray-900 font-bold py-5 rounded-2xl transition-all shadow-2xl flex items-center justify-center gap-3 text-lg"
          >
            <Mail className="w-6 h-6" />
            Continue with Email
          </button>
          
          <button
            onClick={() => { setAuthMethod('phone'); setScreen('register'); }}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-5 rounded-2xl transition-all shadow-2xl flex items-center justify-center gap-3 text-lg"
          >
            <Phone className="w-6 h-6" />
            Continue with Phone
          </button>
        </div>

        <p className="text-center text-gray-400 text-sm mt-8">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}