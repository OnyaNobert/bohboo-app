import React, { useEffect, useState } from "react";
import { Check, ChevronRight } from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { getWalletBalance } from "../solana"; // adjust path

export default function WalletScreen({ setScreen }) {
  const { publicKey, connected, connecting } = useWallet();
  const [balance, setBalance] = useState(0);

  // useEffect must be inside the component
  useEffect(() => {
    if (connected && publicKey) {
      getWalletBalance(publicKey.toBase58()).then(setBalance);
    }
  }, [connected, publicKey]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <button
          onClick={() => setScreen("register")}
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

        {connected ? (
          <div className="bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-green-500">
            <div className="text-center mb-6">
              <Check className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-white font-bold text-xl mb-2">Wallet Connected!</h3>
              <p className="text-gray-400 font-mono text-sm break-all">{publicKey.toBase58()}</p>
              <p className="text-gray-400 font-mono text-sm mt-2">
                Balance: {balance} SOL (Testnet)
              </p>
            </div>

            <button
              onClick={() => setScreen("social")}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg text-lg"
            >
              Continue
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <WalletMultiButton
              className="
                w-full
                justify-center
                py-5
                rounded-2xl
                text-lg
                font-bold
                bg-purple-600
                hover:bg-purple-700
              "
            />
            {connecting && (
              <p className="text-center text-gray-400 text-sm">Connecting to wallet…</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
