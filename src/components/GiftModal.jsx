import React from 'react';

export default function GiftModal({ selectedFriend, availableGifts, sendGift, setShowGiftModal, setSelectedFriend }) {
  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 max-w-md w-full shadow-2xl border-2 border-pink-500">
        <div className="text-center mb-6">
          <div className="text-8xl mb-4 animate-bounce">🎁</div>
          <h3 className="text-white font-bold text-3xl mb-3">Send a Gift</h3>
          <div className="bg-gray-700 rounded-2xl p-4 mb-4">
            <p className="text-gray-400 text-sm mb-2">To:</p>
            <p className="text-white font-bold text-xl">{selectedFriend.displayName}</p>
          </div>
          <p className="text-gray-300 text-lg leading-relaxed">
            Brighten their day with a special gift! 💝
          </p>
        </div>
        
        <div className="space-y-3">
          <button
            onClick={() => sendGift(selectedFriend)}
            disabled={availableGifts <= 0}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold py-5 rounded-xl transition-all shadow-lg text-xl"
          >
            {availableGifts > 0 ? `Send Gift (${availableGifts} left)` : 'No Gifts Left'}
          </button>
          <button
            onClick={() => { setShowGiftModal(false); setSelectedFriend(null); }}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-4 rounded-xl transition-all text-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}