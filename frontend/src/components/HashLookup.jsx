import React, { useState } from 'react';
import { Search, KeyRound, User, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function HashLookup() {
  const [hashInput, setHashInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleLookup = async (e) => {
    e.preventDefault();
    if (!hashInput.trim()) {
      setError('Please enter a SHA-256 hash.');
      setResult(null);
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hash: hashInput.trim() }),
      });

      const data = await response.json();

      if (response.ok && data.found) {
        setResult({
          found: true,
          username: data.username,
          original_password: data.original_password,
        });
      } else {
        setResult({
          found: false,
          message: data.message || 'Hash Not Found',
        });
      }
    } catch (err) {
      console.error('Hash lookup error:', err);
      setError('Failed to reach backend server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
          <Search className="w-3.5 h-3.5" />
          <span>MongoDB Database Query</span>
        </div>
        <h1 className="text-3xl font-extrabold text-gray-100 tracking-tight">
          Hash Lookup
        </h1>
      </div>

      {/* Input Form Card */}
      <div className="cyber-glass rounded-2xl p-6 sm:p-8 shadow-2xl border border-gray-800 space-y-6">
        <form onSubmit={handleLookup} className="space-y-5">
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-cyan-400">
              Paste SHA-256 Hash
            </label>
            <div className="relative">
              <input
                type="text"
                value={hashInput}
                onChange={(e) => setHashInput(e.target.value)}
                placeholder="e.g. 5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8"
                className="w-full px-4 py-3 bg-gray-950/80 border border-gray-800 rounded-xl text-gray-100 placeholder-gray-600 font-mono text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-rose-950/40 border border-rose-900/60 rounded-xl text-xs text-rose-300 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-gray-950 font-bold text-sm tracking-wide shadow-lg shadow-cyan-950/50 hover:shadow-cyan-500/20 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {loading ? (
              <span>Searching Database...</span>
            ) : (
              <>
                <Search className="w-4 h-4 stroke-[2.5]" />
                <span>Find Password</span>
              </>
            )}
          </button>
        </form>

        {/* Results Section */}
        {result && (
          <div className="pt-4 border-t border-gray-800">
            {result.found ? (
              <div className="p-5 bg-emerald-950/20 border border-emerald-900/60 rounded-xl space-y-4">
                <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Matching Record Found in MongoDB</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-gray-950/60 border border-gray-800 rounded-lg space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 flex items-center space-x-1.5">
                      <User className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Username</span>
                    </span>
                    <p className="font-bold text-base text-emerald-300 font-sans">
                      {result.username}
                    </p>
                  </div>

                  <div className="p-4 bg-gray-950/60 border border-gray-800 rounded-lg space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 flex items-center space-x-1.5">
                      <KeyRound className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Original Password</span>
                    </span>
                    <p className="font-mono font-bold text-base text-cyan-300">
                      {result.original_password}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-5 bg-rose-950/20 border border-rose-900/50 rounded-xl text-center space-y-2">
                <AlertCircle className="w-6 h-6 mx-auto text-rose-400" />
                <p className="font-bold text-rose-400 text-base">Hash Not Found</p>
                <p className="text-xs text-gray-400">
                  No user record with this password hash was found in the database.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
