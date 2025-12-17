import React, { useState, useEffect } from 'react';
import { Heart, Gift, Crown, Settings } from 'lucide-react';
import WelcomeScreen from './components/WelcomeScreen';
import RegisterScreen from './components/RegisterScreen';
import WalletScreen from './components/WalletScreen';
import SocialScreen from './components/SocialScreen';
import FriendsTab from './components/FriendsTab';
import RewardsTab from './components/RewardsTab';
import GiftsTab from './components/GiftsTab';
import LeaderboardTab from './components/LeaderboardTab';
import GiftModal from './components/GiftModal';
import SettingsModal from './components/SettingsModal';

function App() {
  const [screen, setScreen] = useState('welcome');
  const [authMethod, setAuthMethod] = useState(null);
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [wallet, setWallet] = useState('');
  const [connectedSocials, setConnectedSocials] = useState({ twitter: false, discord: false });
  const [currentUser, setCurrentUser] = useState(null);
  const [friends, setFriends] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [checkedToday, setCheckedToday] = useState([]);
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [activeTab, setActiveTab] = useState('friends');
  const [showSettings, setShowSettings] = useState(false);
  const [claimedRewards, setClaimedRewards] = useState([]);
  const [availableGifts, setAvailableGifts] = useState(3);
  const [sentGifts, setSentGifts] = useState([]);

  const allUsers = [
    { username: 'alice_sol', displayName: 'Alice Johnson', wallet: '0x123...abc', streak: 45, score: 2850 },
    { username: 'bob_builder', displayName: 'Bob Smith', wallet: '0x456...def', streak: 23, score: 1450 },
    { username: 'charlie_chain', displayName: 'Charlie Brown', wallet: '0x789...ghi', streak: 67, score: 4200 },
    { username: 'diana_sol', displayName: 'Diana Prince', wallet: '0xabc...jkl', streak: 12, score: 890 },
    { username: 'emma_crypto', displayName: 'Emma Watson', wallet: '0xdef...mno', streak: 89, score: 5600 },
    { username: 'frank_sol', displayName: 'Frank Ocean', wallet: '0xghi...pqr', streak: 34, score: 2100 },
    { username: 'grace_web3', displayName: 'Grace Hopper', wallet: '0xjkl...stu', streak: 56, score: 3500 }
  ];

  const rewardsData = [
    { id: 1, title: '7-Day Warrior', description: 'Complete a 7-day streak', requirement: 7, type: 'streak', reward: '🎁 Mystery Box NFT', claimed: false },
    { id: 2, title: 'Social Butterfly', description: 'Add 5 friends', requirement: 5, type: 'friends', reward: '🦋 Butterfly Badge', claimed: false },
    { id: 3, title: '14-Day Legend', description: 'Complete a 14-day streak', requirement: 14, type: 'streak', reward: '🎭 Rare Gift NFT', claimed: false },
    { id: 4, title: 'Gift Giver', description: 'Send 10 gifts', requirement: 10, type: 'gifts', reward: '💝 Golden Heart', claimed: false },
    { id: 5, title: 'Month Master', description: 'Complete a 30-day streak', requirement: 30, type: 'streak', reward: '🏆 Legendary Prize', claimed: false },
    { id: 6, title: 'Community Leader', description: 'Add 15 friends', requirement: 15, type: 'friends', reward: '👑 Crown Badge', claimed: false }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('currentUser');
    if (saved) {
      const user = JSON.parse(saved);
      setCurrentUser(user);
      setScreen('main');
      loadUserData(user);
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      const savedChecks = JSON.parse(localStorage.getItem(`checks_${currentUser.username}`) || '[]');
      const today = new Date().toDateString();
      const todayChecks = savedChecks.filter(check => check.date === today);
      setCheckedToday(todayChecks.map(c => c.friendUsername));
      
      const savedRewards = JSON.parse(localStorage.getItem(`rewards_${currentUser.username}`) || '[]');
      setClaimedRewards(savedRewards);
      
      const savedSentGifts = JSON.parse(localStorage.getItem(`sentGifts_${currentUser.username}`) || '[]');
      setSentGifts(savedSentGifts);
    }
  }, [currentUser]);

  const loadUserData = (user) => {
    const savedFriends = JSON.parse(localStorage.getItem(`friends_${user.username}`) || '[]');
    setFriends(savedFriends);
  };

  const completeSetup = () => {
    const user = {
      username,
      displayName,
      email: email || phone,
      wallet,
      socials: connectedSocials,
      streak: 0,
      lastCheckIn: null,
      score: 0,
      joinDate: new Date().toISOString()
    };
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    setScreen('main');
  };

  const searchUsers = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      const results = allUsers.filter(user => 
        user.username.toLowerCase().includes(query.toLowerCase()) ||
        user.displayName.toLowerCase().includes(query.toLowerCase())
      ).filter(user => !friends.find(f => f.username === user.username));
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const addFriend = (user) => {
    const newFriends = [...friends, user];
    setFriends(newFriends);
    localStorage.setItem(`friends_${currentUser.username}`, JSON.stringify(newFriends));
    setSearchResults([]);
    setSearchQuery('');
  };

  const checkOnFriend = (friend) => {
    if (checkedToday.includes(friend.username)) return;

    const newChecked = [...checkedToday, friend.username];
    setCheckedToday(newChecked);

    const today = new Date().toDateString();
    const checks = JSON.parse(localStorage.getItem(`checks_${currentUser.username}`) || '[]');
    checks.push({ friendUsername: friend.username, date: today });
    localStorage.setItem(`checks_${currentUser.username}`, JSON.stringify(checks));

    if (newChecked.length === 1) {
      setSelectedFriend(friend);
      setShowGiftModal(true);
    } else if (newChecked.length >= 5) {
      updateStreak();
    }
  };

  const sendGift = (friend) => {
    if (availableGifts <= 0) return;
    
    const gift = {
      to: friend.username,
      from: currentUser.username,
      date: new Date().toISOString(),
      message: 'Thinking of you! 💝'
    };
    
    const newSentGifts = [...sentGifts, gift];
    setSentGifts(newSentGifts);
    localStorage.setItem(`sentGifts_${currentUser.username}`, JSON.stringify(newSentGifts));
    
    setAvailableGifts(prev => prev - 1);
    setShowGiftModal(false);
    updateStreak();
  };

  const updateStreak = () => {
    const today = new Date().toDateString();
    const updatedUser = { ...currentUser };
    
    if (updatedUser.lastCheckIn !== today) {
      updatedUser.streak += 1;
      updatedUser.score += 100;
      updatedUser.lastCheckIn = today;
      setCurrentUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
  };

  const claimReward = (reward) => {
    if (claimedRewards.includes(reward.id)) return;
    
    let canClaim = false;
    if (reward.type === 'streak' && currentUser.streak >= reward.requirement) canClaim = true;
    if (reward.type === 'friends' && friends.length >= reward.requirement) canClaim = true;
    if (reward.type === 'gifts' && sentGifts.length >= reward.requirement) canClaim = true;
    
    if (canClaim) {
      const newClaimed = [...claimedRewards, reward.id];
      setClaimedRewards(newClaimed);
      localStorage.setItem(`rewards_${currentUser.username}`, JSON.stringify(newClaimed));
      
      const updatedUser = { ...currentUser, score: currentUser.score + 500 };
      setCurrentUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
  };

  const getLeaderboard = () => {
    const allUsersWithCurrent = [...allUsers];
    if (currentUser) {
      allUsersWithCurrent.push({
        username: currentUser.username,
        displayName: currentUser.displayName,
        wallet: currentUser.wallet,
        streak: currentUser.streak,
        score: currentUser.score
      });
    }
    return allUsersWithCurrent.sort((a, b) => b.score - a.score).slice(0, 10);
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setScreen('welcome');
  };

  if (screen === 'welcome') {
    return <WelcomeScreen setAuthMethod={setAuthMethod} setScreen={setScreen} />;
  }

  if (screen === 'register') {
    return (
      <RegisterScreen
        authMethod={authMethod}
        username={username}
        setUsername={setUsername}
        displayName={displayName}
        setDisplayName={setDisplayName}
        email={email}
        setEmail={setEmail}
        phone={phone}
        setPhone={setPhone}
        setScreen={setScreen}
      />
    );
  }

  if (screen === 'wallet') {
    return <WalletScreen wallet={wallet} setWallet={setWallet} setScreen={setScreen} />;
  }

  if (screen === 'social') {
    return (
      <SocialScreen
        connectedSocials={connectedSocials}
        setConnectedSocials={setConnectedSocials}
        completeSetup={completeSetup}
        setScreen={setScreen}
      />
    );
  }

  // Main App
  return (
    <div className="min-h-screen bg-gray-900 pb-24">
      {/* Header - same for all tabs */}
      <div className="bg-gradient-to-r from-purple-900 to-pink-900 border-b border-gray-700 sticky top-0 z-20 shadow-2xl">
        <div className="max-w-4xl mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-5xl">
                {currentUser?.streak >= 30 ? '🦚' : currentUser?.streak >= 14 ? '🦜' : currentUser?.streak >= 7 ? '🐥' : currentUser?.streak >= 1 ? '🐣' : '🥚'}
              </div>
              <div>
                <h2 className="text-white font-bold text-xl">{currentUser?.displayName}</h2>
                <p className="text-purple-200 text-sm">@{currentUser?.username}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 rounded-full shadow-lg">
                <span className="text-white font-bold text-lg">🔥 {currentUser?.streak}</span>
              </div>
              <div className="bg-yellow-500 px-4 py-2 rounded-full shadow-lg">
                <span className="text-white font-bold text-lg">⭐ {currentUser?.score}</span>
              </div>
              <button onClick={() => setShowSettings(true)} className="text-white hover:text-purple-200">
                <Settings className="w-7 h-7" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {activeTab === 'friends' && (
          <FriendsTab
            currentUser={currentUser}
            checkedToday={checkedToday}
            searchQuery={searchQuery}
            searchUsers={searchUsers}
            searchResults={searchResults}
            addFriend={addFriend}
            friends={friends}
            checkOnFriend={checkOnFriend}
          />
        )}

        {activeTab === 'rewards' && (
          <RewardsTab
            currentUser={currentUser}
            friends={friends}
            sentGifts={sentGifts}
            rewardsData={rewardsData}
            claimedRewards={claimedRewards}
            claimReward={claimReward}
          />
        )}

        {activeTab === 'gifts' && (
          <GiftsTab
            availableGifts={availableGifts}
            friends={friends}
            setSelectedFriend={setSelectedFriend}
            setShowGiftModal={setShowGiftModal}
            sentGifts={sentGifts}
          />
        )}

        {activeTab === 'leaderboard' && (
          <LeaderboardTab currentUser={currentUser} getLeaderboard={getLeaderboard} />
        )}
      </div>

      {/* Modals */}
      {showGiftModal && selectedFriend && (
        <GiftModal
          selectedFriend={selectedFriend}
          availableGifts={availableGifts}
          sendGift={sendGift}
          setShowGiftModal={setShowGiftModal}
          setSelectedFriend={setSelectedFriend}
        />
      )}

      {showSettings && (
        <SettingsModal currentUser={currentUser} logout={logout} setShowSettings={setShowSettings} />
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 shadow-2xl z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-around">
            <button 
              onClick={() => setActiveTab('friends')}
              className={`flex flex-col items-center gap-1 ${activeTab === 'friends' ? 'text-green-500' : 'text-gray-400'}`}
            >
              <Heart className="w-7 h-7" />
              <span className="text-xs font-bold">Friends</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('rewards')}
              className={`flex flex-col items-center gap-1 ${activeTab === 'rewards' ? 'text-yellow-500' : 'text-gray-400'}`}
            >
              <div className="w-7 h-7">🏆</div>
              <span className="text-xs font-bold">Rewards</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('gifts')}
              className={`flex flex-col items-center gap-1 relative ${activeTab === 'gifts' ? 'text-pink-500' : 'text-gray-400'}`}
            >
              <Gift className="w-7 h-7" />
              <span className="text-xs font-bold">Gifts</span>
              {availableGifts > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {availableGifts}
                </span>
              )}
            </button>
            
            <button 
              onClick={() => setActiveTab('leaderboard')}
              className={`flex flex-col items-center gap-1 ${activeTab === 'leaderboard' ? 'text-orange-500' : 'text-gray-400'}`}
            >
              <Crown className="w-7 h-7" />
              <span className="text-xs font-bold">Leaders</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;