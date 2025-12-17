import React, { useState } from 'react';
import { Wallet, Check, ChevronRight } from 'lucide-react';

export default function WalletScreen({ wallet, setWallet, setScreen }) {
  const [walletConnecting, setWalletConnecting] = useState(false);

  const connectWallet = async (provider) => {
    setWalletConnecting(true);
    
    // Simulate wallet connection
    setTimeout(() => {
      const mockWallet = `${Math.random().toString(16).substr(2, 4)}...${Math.random().toString(16).substr(2, 4)}`;
      setWallet(mockWallet);
      setWalletConnecting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <button 
          onClick={() => setScreen('register')} 
          className="text-gray-400 hover:text-white mb-6 flex items-center gap-2"
        >
          <ChevronRight className="w-5 h-5 rotate-180" />
          Back
        </button>

        <div className="text-center mb-8">
          <div className="text-6xl mb-4">👛</div>
          <h1 className="text-4xl font-bold text-white mb-2">Connect Wallet</h1>
          <p className="text-gray-400">Choose your Solana wallet</p>
        </div>

        {wallet ? (
          <div className="bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-green-500">
            <div className="text-center mb-6">
              <Check className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-white font-bold text-xl mb-2">Wallet Connected!</h3>
              <p className="text-gray-400 font-mono text-sm">{wallet}</p>
            </div>
            <button
              onClick={() => setScreen('social')}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg text-lg"
            >
              Continue
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <button
              onClick={() => connectWallet('phantom')}
              disabled={walletConnecting}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white font-bold py-5 rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3 text-lg"
            >
              {walletConnecting ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  Connecting...
                </>
              ) : (
                <>
                  <Wallet className="w-6 h-6" />
                  Phantom Wallet
                </>
              )}
            </button>

            <button
              onClick={() => connectWallet('solflare')}
              disabled={walletConnecting}
              className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-600 text-white font-bold py-5 rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3 text-lg"
            >
              <Wallet className="w-6 h-6" />
              Solflare
            </button>

            <button
              onClick={() => connectWallet('backpack')}
              disabled={walletConnecting}
              className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-600 text-white font-bold py-5 rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3 text-lg border-2 border-white"
            >
              <Wallet className="w-6 h-6" />
              Backpack
            </button>
          </div>
        )}
      </div>
    </div>
  );
}