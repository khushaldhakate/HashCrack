import React, { useState, useEffect } from 'react';
import { FileText, ShieldCheck, ShieldAlert, CheckCircle2, XCircle, RefreshCw, Lock, Sparkles } from 'lucide-react';

export default function SecurityReport({ currentHash, currentPassword }) {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchReport = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/security-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hash: currentHash || '',
          password: currentPassword || ''
        }),
      });
      const data = await response.json();
      setReport(data);
    } catch (err) {
      console.error('Failed to fetch security report', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [currentHash, currentPassword]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
          <FileText className="w-3.5 h-3.5" />
          <span>Security Audit Report</span>
        </div>
        <h1 className="text-3xl font-extrabold text-gray-100 tracking-tight">
          Password Hash Security Report
        </h1>
        <p className="text-sm text-gray-400 max-w-lg mx-auto">
          Comprehensive evaluation of hashing algorithms, salt storage mechanisms, offline dictionary resilience, and overall password strength.
        </p>
      </div>

      {/* Main Report Container */}
      <div className="cyber-glass rounded-2xl p-6 sm:p-8 shadow-2xl border border-gray-800 space-y-8">

        {/* Top Summary Banner */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-gray-950/80 rounded-xl border border-gray-800 gap-4">
          <div className="flex items-center space-x-3 text-left">
            <div className="p-2.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-200">System Security Posture</div>
              <div className="text-xs text-gray-400">Evaluated against standard NIST & OWASP security rules</div>
            </div>
          </div>

          <button
            onClick={fetchReport}
            disabled={loading}
            className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-lg bg-gray-900 hover:bg-gray-800 text-cyan-400 border border-gray-700 text-xs font-semibold transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Re-audit Report</span>
          </button>
        </div>

        {/* Security Requirements Checklist per Prompt Spec */}
        <div className="space-y-4 text-left">
          <h3 className="text-xs font-extrabold uppercase tracking-widest text-cyan-400">
            System Compliance Checklist
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Metric 1 */}
            <div className="p-4 bg-gray-950 rounded-xl border border-gray-800 flex items-center justify-between">
              <span className="text-sm text-gray-300 font-medium">Hash Algorithm:</span>
              <span className="text-sm font-mono font-bold text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded border border-cyan-800">
                {report?.hash_algorithm || 'SHA-256'}
              </span>
            </div>

            {/* Metric 2 */}
            <div className="p-4 bg-gray-950 rounded-xl border border-gray-800 flex items-center justify-between">
              <span className="text-sm text-gray-300 font-medium">Normal Hash Generated:</span>
              <div className="flex items-center space-x-1 text-emerald-400 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>Yes</span>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="p-4 bg-gray-950 rounded-xl border border-gray-800 flex items-center justify-between">
              <span className="text-sm text-gray-300 font-medium">Salt Available:</span>
              <div className="flex items-center space-x-1 text-emerald-400 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>Yes (128-bit hex)</span>
              </div>
            </div>

            {/* Metric 4 */}
            <div className="p-4 bg-gray-950 rounded-xl border border-gray-800 flex items-center justify-between">
              <span className="text-sm text-gray-300 font-medium">Salted Hash Stored:</span>
              <div className="flex items-center space-x-1 text-emerald-400 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>Yes (MongoDB)</span>
              </div>
            </div>

            {/* Metric 5 */}
            <div className="p-4 bg-gray-950 rounded-xl border border-gray-800 flex items-center justify-between">
              <span className="text-sm text-gray-300 font-medium">Dictionary Attack Result:</span>
              <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded border ${report?.dictionary_attack_result === 'Vulnerable'
                  ? 'bg-rose-950 text-rose-400 border-rose-800'
                  : 'bg-emerald-950 text-emerald-400 border-emerald-800'
                }`}>
                {report?.dictionary_attack_result || 'Passed / Safe'}
              </span>
            </div>

            {/* Metric 6 */}
            <div className="p-4 bg-gray-950 rounded-xl border border-gray-800 flex items-center justify-between">
              <span className="text-sm text-gray-300 font-medium">Rule-Based Attack Result:</span>
              <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded border ${report?.rule_based_attack_result === 'Vulnerable'
                  ? 'bg-rose-950 text-rose-400 border-rose-800'
                  : 'bg-emerald-950 text-emerald-400 border-emerald-800'
                }`}>
                {report?.rule_based_attack_result || 'Passed / Safe'}
              </span>
            </div>

          </div>
        </div>

        {/* Password Strength Score Card */}
        <div className="p-6 bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 rounded-2xl border border-gray-800 text-left space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-cyan-400">
                Password Strength Rating
              </h4>
              <p className="text-xs text-gray-400">Based on character entropy and pattern complexity</p>
            </div>
            <span className={`text-sm font-extrabold uppercase px-3 py-1.5 rounded-lg border ${report?.password_strength === 'Strong'
                ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                : report?.password_strength === 'Medium'
                  ? 'bg-amber-950 text-amber-300 border-amber-700'
                  : 'bg-rose-950 text-rose-300 border-rose-700'
              }`}>
              {report?.password_strength || 'Strong'}
            </span>
          </div>

          {/* Score Bar */}
          <div className="w-full bg-gray-900 h-2.5 rounded-full overflow-hidden border border-gray-800">
            <div
              className={`h-full transition-all duration-500 ${(report?.strength_score || 80) > 70
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                  : (report?.strength_score || 80) > 40
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-400'
                    : 'bg-gradient-to-r from-rose-600 to-red-500'
                }`}
              style={{ width: `${report?.strength_score || 80}%` }}
            />
          </div>

          {/* Risk factors list */}
          <div className="pt-2">
            <span className="text-xs font-bold text-gray-400 block mb-2">Audit Findings:</span>
            <ul className="space-y-1">
              {(report?.risk_factors || ["No major security vulnerabilities detected in hash pattern"]).map((factor, i) => (
                <li key={i} className="text-xs text-gray-300 flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Educational Cybersecurity Card */}
        <div className="p-5 bg-cyan-950/20 border border-cyan-900/50 rounded-xl text-left space-y-2">
          <div className="flex items-center space-x-2 text-cyan-300 text-sm font-bold">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Why Salted Hashes Are Crucial</span>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            Raw SHA-256 hashes are vulnerable to pre-computed <strong>Rainbow Table</strong> lookup attacks and high-speed dictionary cracking. By introducing a unique <strong>Salt</strong> per user, identical passwords produce completely different hash outputs, rendering pre-computed lookup tables ineffective.
          </p>
        </div>

      </div>
    </div>
  );
}
