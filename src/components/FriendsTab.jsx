import React from 'react';
import { Trophy, Search, Users, Plus, Check, Flame, Star } from 'lucide-react';

export default function FriendsTab({
  currentUser,
  checkedToday,
  searchQuery,
  searchUsers,
  searchResults,
  addFriend,
  friends,
  checkOnFriend
}) {
  const getPetEmoji = () => {
    const streak = currentUser.streak;
    if (streak >= 30) return '🦚';
    if (streak >= 14) return '🦜';
    if (streak >= 7) return '🐥';
    if (streak >= 1) return '🐣';
    return '🥚';
  };

  const getPetName = () => {
    const streak = currentUser.streak;
    if (streak >= 30) return 'Legendary Phoenix';
    if (streak >= 14) return 'Noble Guardian';
    if (streak >= 7) return 'Brave Explorer';
    if (streak >= 1) return 'Baby BohBoo';
    return 'Mysterious Egg';
  };

  return (
    <>
      {/* Pet Status Card */}
      <div className="bg-gradient-to-br from-purple-800 to-pink-800 rounded-3xl p-8 mb-6 shadow-2xl border border-purple-500">
        <div className="text-center">
          <div className="text-8xl mb-4">{getPetEmoji()}</div>
          <h3 className="text-white font-bold text-3xl mb-2">{getPetName()}</h3>
          <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full">
            <span className="text-white font-bold text-xl">Level {Math.floor(currentUser?.streak / 7) + 1}</span>
          </div>
        </div>
      </div>

      {/* Daily Progress */}
      <div className="bg-gray-800 rounded-3xl p-6 mb-6 shadow-xl border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-bold text-2xl flex items-center gap-2">
            <Trophy className="w-7 h-7 text-yellow-500" />
            Daily Quest
          </h3>
          <span className="text-3xl font-bold text-white">{checkedToday.length}/5</span>
        </div>
        
        <div className="mb-4">
          <div className="bg-gray-700 rounded-full h-4 overflow-hidden shadow-inner">
            <div 
              className="bg-gradient-to-r from-green-400 to-green-500 h-full transition-all duration-500"
              style={{ width: `${Math.min((checkedToday.length / 5) * 100, 100)}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className={`h-12 rounded-xl flex items-center justify-center text-2xl ${checkedToday.length >= i ? 'bg-green-500' : 'bg-gray-700'} transition-all`}>
              {checkedToday.length >= i ? '✅' : '⭕'}
            </div>
          ))}
        </div>

        <p className="text-gray-300 text-center mt-4 text-lg">
          {checkedToday.length === 0 && "✨ Check on friends to start your quest!"}
          {checkedToday.length === 1 && "🎁 Send a gift to complete today's quest!"}
          {checkedToday.length > 1 && checkedToday.length < 5 && `🔥 ${5 - checkedToday.length} more to go!`}
          {checkedToday.length >= 5 && "🎉 Quest complete! Streak secured!"}
        </p>
      </div>

      {/* Search */}
      <div className="bg-gray-800 rounded-3xl p-5 mb-6 shadow-xl border border-gray-700">
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => searchUsers(e.target.value)}
            placeholder="Search users to add..."
            className="w-full bg-gray-700 text-white rounded-2xl pl-14 pr-4 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />
        </div>
        
        {searchResults.length > 0 && (
          <div className="space-y-3">
            {searchResults.map(user => (
              <div key={user.username} className="bg-gray-700 rounded-2xl p-4 flex items-center justify-between hover:bg-gray-650 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                    {user.displayName[0]}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-lg">{user.displayName}</p>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-gray-400">@{user.username}</span>
                      <div className="flex items-center gap-1">
                        <Flame className="w-4 h-4 text-orange-500" />
                        <span className="text-gray-400">{user.streak}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => addFriend(user)}
                  className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-xl transition-all shadow-lg"
                >
                  <Plus className="w-6 h-6" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Friends List */}
      <div className="bg-gray-800 rounded-3xl p-6 shadow-xl border border-gray-700">
        <h3 className="text-white font-bold text-2xl mb-5 flex items-center gap-2">
          <Users className="w-7 h-7 text-blue-500" />
          Friends ({friends.length})
        </h3>
        
        {friends.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-7xl mb-4">👥</div>
            <p className="text-gray-300 text-xl font-semibold mb-2">No friends yet</p>
            <p className="text-gray-500">Search and add friends to get started!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {friends.map(friend => {
              const isChecked = checkedToday.includes(friend.username);
              return (
                <div key={friend.username} className="bg-gray-700 rounded-2xl p-5 flex items-center justify-between hover:bg-gray-650 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                      {friend.displayName[0]}
                    </div>
                    <div>
                      <p className="text-white font-bold text-lg">{friend.displayName}</p>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Flame className="w-4 h-4 text-orange-500" />
                          <span className="text-gray-400 text-sm">{friend.streak} days</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-gray-400 text-sm">{friend.score}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => checkOnFriend(friend)}
                    disabled={isChecked}
                    className={`px-6 py-3 rounded-xl font-bold transition-all shadow-lg text-lg ${
                      isChecked
                        ? 'bg-green-500 text-white cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                  >
                    {isChecked ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      'Check'
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}