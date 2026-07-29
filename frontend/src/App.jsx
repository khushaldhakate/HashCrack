import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HashGenerator from './components/HashGenerator';
import HashCrackSimulator from './components/HashCrackSimulator';
import SecurityReport from './components/SecurityReport';
import DatabaseVault from './components/DatabaseVault';
import HashLookup from './components/HashLookup';

export default function App() {
  const [activeTab, setActiveTab] = useState('register');
  const [latestHash, setLatestHash] = useState('');
  const [latestPassword, setLatestPassword] = useState('');
  const [latestUsername, setLatestUsername] = useState('');

  const handleHashGenerated = (hash, password, username) => {
    setLatestHash(hash);
    setLatestPassword(password);
    setLatestUsername(username || '');
  };

  const handleNavigateToCrack = (hash) => {
    setLatestHash(hash);
    setActiveTab('crack');
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-gray-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-gray-950">
      {/* Top Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {activeTab === 'register' && (
          <HashGenerator
            onHashGenerated={handleHashGenerated}
            onNavigateToCrack={handleNavigateToCrack}
          />
        )}

        {activeTab === 'crack' && (
          <HashCrackSimulator
            initialHash={latestHash}
            initialUsername={latestUsername}
            onCrackSuccess={(hash, pwd) => setLatestPassword(pwd)}
          />
        )}

        {activeTab === 'lookup' && <HashLookup />}

        {activeTab === 'report' && (
          <SecurityReport
            currentHash={latestHash}
            currentPassword={latestPassword}
          />
        )}

        {activeTab === 'vault' && <DatabaseVault />}
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-gray-900 bg-gray-950/60 text-center text-xs text-gray-500 space-y-1">
        <p>
          <strong className="text-gray-400">HashCrack</strong> — Password Hash Security Testing & Offline Attack Simulator
        </p>
        <p className="text-[11px] text-gray-600">
          Built for Cybersecurity Education & Password Hashing Verification • SHA-256 & Salt Analysis
        </p>
      </footer>
    </div>
  );
}
