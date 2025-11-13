import React, { useState } from 'react';
import { GameProvider } from './context/GameContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import GameGrid from './components/GameGrid';
import AddGameModal from './components/AddGameModal';
import StatsModal from './components/StatsModal';
import WelcomePage from './components/WelcomePage';
import Store from './components/Store';
import './App.css';
import './styles/animations.css';

function App() {
  const [showWelcome, setShowWelcome] = useState(true)
  const [showStore, setShowStore] = useState(false)

  if (showWelcome) {
    return <WelcomePage onEnter={() => setShowWelcome(false)} />
  }

  if (showStore) {
    return (
      <GameProvider>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 text-white animated-gradient">
          <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.1),transparent_70%)] pointer-events-none" />
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000" />
          </div>
          <Header onShowStore={() => setShowStore(false)} />
          <div className="flex relative z-10">
            <Sidebar />
            <main className="flex-1 p-6">
              <Store onBack={() => setShowStore(false)} />
            </main>
          </div>
          <AddGameModal />
          <StatsModal />
        </div>
      </GameProvider>
    )
  }

  return (
    <GameProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 text-white animated-gradient">
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.1),transparent_70%)] pointer-events-none" />
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000" />
        </div>
        <Header onShowStore={() => setShowStore(true)} />
        <div className="flex relative z-10">
          <Sidebar />
          <main className="flex-1 p-6">
            <GameGrid />
          </main>
        </div>
        <AddGameModal />
        <StatsModal />
      </div>
    </GameProvider>
  )
}

export default App;