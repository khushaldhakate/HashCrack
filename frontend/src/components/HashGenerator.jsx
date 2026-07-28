import React, { useState } from 'react';
import { KeyRound, Copy, Check, Lock, User, ShieldAlert, ArrowRight } from 'lucide-react';

export default function HashGenerator({ onHashGenerated, onNavigateToCrack }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [generatedHash, setGeneratedHash] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submittedUser, setSubmittedUser] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError('Please enter both username and password.');
      return;
    }

    setError('');
    setLoading(true);
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setGeneratedHash(data.sha256_hash);
        setSubmittedUser(data.username);
        if (onHashGenerated) {
          onHashGenerated(data.sha256_hash, password);
        }
      } else {
        setError(data.error || 'Failed to generate hash.');
      }
    } catch (err) {
      setError('Backend connection error. Please ensure Flask server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!generatedHash) return;
    navigator.clipboard.writeText(generatedHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
          <KeyRound className="w-3.5 h-3.5" />
          <span>Module 1: Password Hash Generator</span>
        </div>
        <h1 className="text-3xl font-extrabold text-gray-100 tracking-tight">
          User Registration & SHA-256 Hasher
        </h1>
        <p className="text-sm text-gray-400 max-w-lg mx-auto">
          Submit a password to compute its raw SHA-256 hash. Salt and Salted SHA-256 hash are generated internally and securely stored in MongoDB without plain text storage.
        </p>
      </div>

      {/* Registration Card */}
      <div className="cyber-glass rounded-2xl p-6 sm:p-8 shadow-2xl border border-gray-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-800/80 text-rose-300 text-xs flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Username Input */}
          <div className="space-y-2 text-left">
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <User className="w-4 h-4 text-gray-500" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username (e.g., khushal)"
                className="w-full pl-10 pr-4 py-3 bg-gray-900/90 border border-gray-700/80 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm transition-all"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2 text-left">
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Lock className="w-4 h-4 text-gray-500" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password (e.g., khushal123)"
                className="w-full pl-10 pr-4 py-3 bg-gray-900/90 border border-gray-700/80 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm transition-all"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-gray-950 font-bold rounded-xl shadow-lg shadow-cyan-950 transition-all duration-200 flex items-center justify-center space-x-2 text-sm uppercase tracking-wider disabled:opacity-50"
          >
            {loading ? (
              <span>Generating Security Hash...</span>
            ) : (
              <>
                <span>Submit & Generate Hash</span>
                <KeyRound className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Frontend Output Section */}
        {generatedHash && (
          <div className="mt-8 pt-6 border-t border-gray-800/80 space-y-4 text-left animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>Generated SHA-256 Hash:</span>
              </span>
              <span className="text-[11px] text-gray-400">User: <strong className="text-gray-200">{submittedUser}</strong></span>
            </div>

            {/* Hash Display Box */}
            <div className="p-4 bg-gray-950 border border-cyan-900/60 rounded-xl font-mono text-cyan-300 text-xs sm:text-sm break-all leading-relaxed shadow-inner">
              {generatedHash}
            </div>

            {/* Action Row */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-700/60 text-cyan-300 rounded-lg text-xs font-semibold transition-all"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Hash Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>[Copy Hash]</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => onNavigateToCrack && onNavigateToCrack(generatedHash)}
                className="inline-flex items-center space-x-1.5 px-4 py-2 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-300 rounded-lg text-xs font-semibold transition-all"
              >
                <span>Test in HashCrack</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Note on Salt privacy */}
            <div className="p-3 bg-gray-900/60 border border-gray-800 rounded-lg text-[11px] text-gray-400 flex items-center justify-between">
              <span className="text-gray-400">
                🔒 <strong>Salt</strong> and <strong>Salted Hash</strong> were computed and saved internally to MongoDB. (Not displayed on frontend per security spec).
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
