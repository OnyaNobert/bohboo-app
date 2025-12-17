import React from 'react';
import { Gift } from 'lucide-react';

export default function GiftsTab({ availableGifts, friends, setSelectedFriend, setShowGiftModal, sentGifts }) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-pink-600 to-purple-600 rounded-3xl p-8 shadow-2xl border border-pink-500">
        <div className="text-center">
          <Gift className="w-16 h-16 text-white mx-auto mb-4" />
          <h2 className="text-white font-bold text-3xl mb-2">Gift Center</h2>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 mt-4">
            <p className="text-white text-sm mb-2">Available Gifts</p>
            <p className="text-white font-bold text-4xl">{availableGifts} 🎁</p>
          </div>
        </div>
      </div>

      {/* Quick Send */}
      <div className="bg-gray-800 rounded-3xl p-6 shadow-xl border border-gray-700">
        <h3 className="text-white font-bold text-xl mb-4">Send Quick Gift</h3>
        {friends.length === 0 ? (
          <p className="text-gray-400 text-center py-8">Add friends to send gifts!</p>
        ) : (
          <div className="space-y-3">
            {friends.slice(0, 3).map(friend => (
              <div key={friend.username} className="bg-gray-700 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {friend.displayName[0]}
                  </div>
                  <p className="text-white font-semibold">{friend.displayName}</p>
                </div>
                <button
                  onClick={() => { setSelectedFriend(friend); setShowGiftModal(true); }}
                  disabled={availableGifts <= 0}
                  className="bg-pink-500 hover:bg-pink-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-semibold transition-all"
                >
                  Send Gift
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sent Gifts */}
      <div className="bg-gray-800 rounded-3xl p-6 shadow-xl border border-gray-700">
        <h3 className="text-white font-bold text-xl mb-4">Recent Gifts Sent</h3>
        {sentGifts.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No gifts sent yet</p>
        ) : (
          <div className="space-y-3">
            {sentGifts.slice(-5).reverse().map((gift, idx) => (
              <div key={idx} className="bg-gray-700 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-white font-semibold">To: @{gift.to}</p>
                  <p className="text-gray-400 text-sm">{new Date(gift.date).toLocaleDateString()}</p>
                </div>
                <span className="text-3xl">💝</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}