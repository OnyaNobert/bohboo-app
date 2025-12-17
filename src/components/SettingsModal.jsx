import React from 'react';
import { X, LogOut, Twitter, MessageCircle } from 'lucide-react';

export default function SettingsModal({ currentUser, logout, setShowSettings }) {
  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-gray-800 rounded-3xl p-8 max-w-md w-full shadow-2xl border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-bold text-2xl">Settings</h3>
          <button onClick={() => setShowSettings(false)} className="text-gray-400 hover:text-white">
            <X className="w-7 h-7" />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <div className="bg-gray-700 rounded-xl p-4">
            <p className="text-gray-400 text-sm mb-1">Username</p>
            <p className="text-white font-semibold">@{currentUser?.username}</p>
          </div>

          <div className="bg-gray-700 rounded-xl p-4">
            <p className="text-gray-400 text-sm mb-1">Display Name</p>
            <p className="text-white font-semibold">{currentUser?.displayName}</p>
          </div>

          <div className="bg-gray-700 rounded-xl p-4">
            <p className="text-gray-400 text-sm mb-1">Wallet</p>
            <p className="text-white font-mono text-sm">{currentUser?.wallet}</p>
          </div>

          <div className="bg-gray-700 rounded-xl p-4">
            <p className="text-gray-400 text-sm mb-1">Email/Phone</p>
            <p className="text-white text-sm">{currentUser?.email}</p>
          </div>

          <div className="bg-gray-700 rounded-xl p-4">
            <p className="text-gray-400 text-sm mb-2">Connected Socials</p>
            <div className="flex gap-2">
              {currentUser?.socials?.twitter && (
                <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  <Twitter className="w-4 h-4" />
                  X
                </div>
              )}
              {currentUser?.socials?.discord && (
                <div className="bg-indigo-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  Discord
                </div>
              )}
              {!currentUser?.socials?.twitter && !currentUser?.socials?.discord && (
                <span className="text-gray-400 text-sm">None connected</span>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={logout}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 text-lg"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
}