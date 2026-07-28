import React, { useState, useEffect } from 'react';
import { Cpu, Zap, Search, ShieldCheck, ShieldX, Terminal, Play, RotateCcw } from 'lucide-react';

export default function HashCrackSimulator({ initialHash = '', onCrackSuccess }) {
  const [inputHash, setInputHash] = useState(initialHash);
  const [cracking, setCracking] = useState(false);
  const [result, setResult] = useState(null);
  const [logs, setLogs] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (initialHash) {
      setInputHash(initialHash);
    }
  }, [initialHash]);

  const handleStartCrack = async (e) => {
    e.preventDefault();
    const cleanHash = inputHash.trim();
    if (!cleanHash) return;

    setCracking(true);
    setResult(null);
    setLogs([]);
    setProgress(0);

    // Simulated attack progression visualizer
    const sampleWords = [
      { word: 'password', type: 'Dictionary Attack' },
      { word: '123456', type: 'Dictionary Attack' },
      { word: 'admin123', type: 'Dictionary Attack' },
      { word: 'khushal', type: 'Dictionary Attack' },
      { word: 'welcome123', type: 'Dictionary Attack' },
      { word: 'khushal123', type: 'Rule-Based Attack' },
      { word: 'Khushal@123', type: 'Rule-Based Attack' },
      { word: 'KHUSHAL2026', type: 'Rule-Based Attack' },
    ];

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 12;
      if (currentProgress <= 90) {
        setProgress(currentProgress);
        const randomSample = sampleWords[Math.floor(Math.random() * sampleWords.length)];
        setLogs((prev) => [
          ...prev.slice(-8),
          `[ENGINE] Testing candidate "${randomSample.word}" via ${randomSample.type}...`
        ]);
      }
    }, 150);

    try {
      const response = await fetch('/api/crack', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hash: cleanHash }),
      });

      const data = await response.json();

      setTimeout(() => {
        clearInterval(interval);
        setProgress(100);
        setCracking(false);
        setResult(data);

        if (data.status === 'found') {
          setLogs((prev) => [
            ...prev,
            `[SUCCESS] MATCH FOUND! Original Password: "${data.original_password}" (${data.attack_type})`
          ]);
          if (onCrackSuccess) {
            onCrackSuccess(cleanHash, data.original_password, data.attack_type);
          }
        } else {
          setLogs((prev) => [
            ...prev,
            `[EXHAUSTED] Dictionary and Rule-based mutations checked. Hash not matched.`
          ]);
        }
      }, 1200);

    } catch (err) {
      clearInterval(interval);
      setCracking(false);
      setResult({ status: 'error', message: 'Failed to connect to backend crack engine.' });
    }
  };

  const handleQuickFill = (hash) => {
    setInputHash(hash);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Module Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
          <Cpu className="w-3.5 h-3.5" />
          <span>Module 2: HashCrack Simulator</span>
        </div>
        <h1 className="text-3xl font-extrabold text-gray-100 tracking-tight">
          Offline Hash Attack Simulator
        </h1>
        <p className="text-sm text-gray-400 max-w-lg mx-auto">
          Simulate offline password cracking using Dictionary Attacks and Rule-Based variation mutators against SHA-256 target hashes.
        </p>
      </div>

      {/* Main Form */}
      <div className="cyber-glass rounded-2xl p-6 sm:p-8 shadow-2xl border border-gray-800 space-y-6">
        <form onSubmit={handleStartCrack} className="space-y-5 text-left">
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
              Enter SHA-256 Hash:
            </label>
            <div className="relative">
              <input
                type="text"
                value={inputHash}
                onChange={(e) => setInputHash(e.target.value)}
                placeholder="Paste 64-character SHA-256 hash here..."
                className="w-full px-4 py-3 bg-gray-950 border border-cyan-900/60 rounded-xl text-cyan-300 font-mono text-xs sm:text-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                required
              />
            </div>
          </div>

          {/* Quick preset hashes for fast demo */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-gray-400 font-semibold">Quick Demos:</span>
            <button
              type="button"
              onClick={() => handleQuickFill('8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918')}
              className="px-2.5 py-1 rounded bg-gray-900 hover:bg-gray-800 text-cyan-400 border border-gray-800 font-mono text-[11px]"
            >
              'admin123'
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill('7110ed4d03e0627918667b7f14b22c7a72d42d326f21789c63ed49826a7e0251')}
              className="px-2.5 py-1 rounded bg-gray-900 hover:bg-gray-800 text-cyan-400 border border-gray-800 font-mono text-[11px]"
            >
              'khushal123'
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill('5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5')}
              className="px-2.5 py-1 rounded bg-gray-900 hover:bg-gray-800 text-cyan-400 border border-gray-800 font-mono text-[11px]"
            >
              '123456'
            </button>
          </div>

          <button
            type="submit"
            disabled={cracking || !inputHash.trim()}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-gray-950 font-bold rounded-xl shadow-lg shadow-emerald-950 transition-all duration-200 flex items-center justify-center space-x-2 text-sm uppercase tracking-wider disabled:opacity-50"
          >
            {cracking ? (
              <>
                <Zap className="w-4 h-4 animate-bounce text-gray-950" />
                <span>Running Attack Simulation ({progress}%)...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 text-gray-950 fill-current" />
                <span>[Start Crack]</span>
              </>
            )}
          </button>
        </form>

        {/* Live Terminal Log Screen */}
        {(cracking || logs.length > 0) && (
          <div className="bg-gray-950 rounded-xl p-4 border border-gray-800 space-y-3 text-left">
            <div className="flex items-center justify-between border-b border-gray-900 pb-2">
              <div className="flex items-center space-x-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono font-bold text-gray-300 uppercase">
                  Attack Engine Output Log
                </span>
              </div>
              <span className="text-[11px] font-mono text-cyan-400">
                {cracking ? 'RUNNING' : 'IDLE'}
              </span>
            </div>

            {/* Progress Bar */}
            {cracking && (
              <div className="w-full bg-gray-900 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-400 to-cyan-400 h-1.5 transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}

            <div className="font-mono text-[11px] text-gray-400 space-y-1.5 max-h-40 overflow-y-auto">
              {logs.map((log, idx) => (
                <div key={idx} className="flex items-start space-x-2">
                  <span className="text-gray-600">{`>`}</span>
                  <span className={log.includes('SUCCESS') ? 'text-emerald-400 font-bold' : log.includes('EXHAUSTED') ? 'text-rose-400' : 'text-gray-400'}>
                    {log}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Final Attack Output Display per Spec */}
        {result && !cracking && (
          <div className="pt-4 border-t border-gray-800/80 animate-fadeIn">
            {result.status === 'found' ? (
              <div className="p-6 bg-emerald-950/40 border-2 border-emerald-500/80 rounded-2xl space-y-4 text-left shadow-xl shadow-emerald-950/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-6 h-6 text-emerald-400" />
                    <span className="text-base font-extrabold text-emerald-300 uppercase tracking-wider">
                      Password Recovered!
                    </span>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded bg-emerald-900 text-emerald-200 font-mono font-bold">
                    {result.attempts} attempts in {result.time_seconds}s
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Password Found Output */}
                  <div className="p-4 bg-gray-950 border border-emerald-900/80 rounded-xl">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-1">
                      Password Found:
                    </span>
                    <span className="text-lg font-mono font-extrabold text-emerald-300 break-all">
                      {result.original_password}
                    </span>
                  </div>

                  {/* Attack Type Output */}
                  <div className="p-4 bg-gray-950 border border-emerald-900/80 rounded-xl">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-1">
                      Attack Type:
                    </span>
                    <span className="text-base font-mono font-bold text-cyan-300">
                      {result.attack_type}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 bg-rose-950/30 border-2 border-rose-800/70 rounded-2xl space-y-3 text-left">
                <div className="flex items-center space-x-2 text-rose-400">
                  <ShieldX className="w-6 h-6 text-rose-400" />
                  <span className="text-base font-extrabold uppercase tracking-wider">
                    Password Not Found
                  </span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  The target SHA-256 hash did not match any entries in the standard password dictionary or rule-based variation patterns ({result.attempts} hash comparisons performed).
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
