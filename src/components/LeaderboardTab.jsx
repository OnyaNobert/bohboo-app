import React from 'react';
import { Crown, Flame, Star } from 'lucide-react';

export default function LeaderboardTab({ currentUser, getLeaderboard }) {
  const medals = ['🥇', '🥈', '🥉'];
  
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 rounded-3xl p-8 shadow-2xl border border-yellow-500">
        <div className="text-center">
          <Crown className="w-16 h-16 text-white mx-auto mb-4" />
          <h2 className="text-white font-bold text-3xl mb-2">Global Leaderboard</h2>
          <p className="text-yellow-100 text-lg">Top BohBoo Champions</p>
        </div>
      </div>

      <div className="bg-gray-800 rounded-3xl p-6 shadow-xl border border-gray-700">
        <div className="space-y-3">
          {getLeaderboard().map((user, index) => {
            const isCurrentUser = user.username === currentUser?.username;
            
            return (
              <div 
                key={user.username} 
                className={`rounded-2xl p-5 flex items-center gap-4 transition-all ${
                  isCurrentUser ? 'bg-purple-600 border-2 border-yellow-500' : 'bg-gray-700'
                }`}
              >
                <div className="text-4xl font-bold w-12 text-center">
                  {index < 3 ? medals[index] : `#${index + 1}`}
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {user.displayName[0]}
                </div>
                <div className="flex-1">
                  <p className={`font-bold text-lg ${isCurrentUser ? 'text-white' : 'text-white'}`}>
                    {user.displayName} {isCurrentUser && '(You)'}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Flame className="w-4 h-4 text-orange-500" />
                      <span className={isCurrentUser ? 'text-yellow-200' : 'text-gray-400'}>
                        {user.streak} streak
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className={isCurrentUser ? 'text-yellow-200' : 'text-gray-400'}>
                        {user.score} pts
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}