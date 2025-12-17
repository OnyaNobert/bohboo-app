import React from 'react';
import { Trophy, Check } from 'lucide-react';

export default function RewardsTab({ currentUser, friends, sentGifts, rewardsData, claimedRewards, claimReward }) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-yellow-600 to-orange-600 rounded-3xl p-8 shadow-2xl border border-yellow-500">
        <div className="text-center">
          <Trophy className="w-16 h-16 text-white mx-auto mb-4" />
          <h2 className="text-white font-bold text-3xl mb-2">Rewards Center</h2>
          <p className="text-yellow-100 text-lg">Complete challenges to earn exclusive rewards!</p>
        </div>
      </div>

      <div className="grid gap-4">
        {rewardsData.map(reward => {
          const isClaimed = claimedRewards.includes(reward.id);
          let canClaim = false;
          let progress = 0;

          if (reward.type === 'streak') {
            progress = (currentUser?.streak / reward.requirement) * 100;
            canClaim = currentUser?.streak >= reward.requirement;
          }
          if (reward.type === 'friends') {
            progress = (friends.length / reward.requirement) * 100;
            canClaim = friends.length >= reward.requirement;
          }
          if (reward.type === 'gifts') {
            progress = (sentGifts.length / reward.requirement) * 100;
            canClaim = sentGifts.length >= reward.requirement;
          }

          return (
            <div key={reward.id} className={`bg-gray-800 rounded-2xl p-6 shadow-xl border-2 transition-all ${isClaimed ? 'border-green-500' : canClaim ? 'border-yellow-500' : 'border-gray-700'}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-white font-bold text-xl">{reward.title}</h3>
                    {isClaimed && <Check className="w-6 h-6 text-green-500" />}
                  </div>
                  <p className="text-gray-400 mb-3">{reward.description}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex-1 bg-gray-700 rounded-full h-3 overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 ${isClaimed ? 'bg-green-500' : 'bg-yellow-500'}`}
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                    <span className="text-white font-bold text-sm min-w-[60px]">
                      {reward.type === 'streak' && `${currentUser?.streak}/${reward.requirement}`}
                      {reward.type === 'friends' && `${friends.length}/${reward.requirement}`}
                      {reward.type === 'gifts' && `${sentGifts.length}/${reward.requirement}`}
                    </span>
                  </div>
                  <div className="bg-purple-900/50 rounded-lg p-3 mb-3">
                    <p className="text-purple-200 font-semibold text-lg">{reward.reward}</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => claimReward(reward)}
                disabled={!canClaim || isClaimed}
                className={`w-full py-3 rounded-xl font-bold transition-all text-lg ${
                  isClaimed 
                    ? 'bg-green-500 text-white cursor-not-allowed'
                    : canClaim
                    ? 'bg-yellow-500 hover:bg-yellow-600 text-gray-900'
                    : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isClaimed ? '✓ Claimed' : canClaim ? 'Claim Reward' : 'Locked'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}