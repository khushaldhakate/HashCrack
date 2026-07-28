import React, { useState, useEffect } from 'react';
import { Database, RefreshCw, Lock, User, Clock, Hash, CheckCircle } from 'lucide-react';

export default function DatabaseVault() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/vault');
      const data = await response.json();
      setRecords(data.records || []);
    } catch (err) {
      console.error('Failed to fetch vault records', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-950/80 border border-teal-800 text-teal-400 text-xs font-semibold uppercase tracking-wider">
          <Database className="w-3.5 h-3.5" />
          <span>MongoDB Backend Vault</span>
        </div>
        <h1 className="text-3xl font-extrabold text-gray-100 tracking-tight">
          Stored Database Records
        </h1>
        <p className="text-sm text-gray-400 max-w-lg mx-auto">
          Inspection view verifying MongoDB database fields: Username, SHA256_Hash, Salt, Salted_Hash, and Created_Time. Plaintext passwords are never saved.
        </p>
      </div>

      <div className="cyber-glass rounded-2xl p-6 sm:p-8 shadow-2xl border border-gray-800 space-y-6">
        <div className="flex items-center justify-between border-b border-gray-800 pb-4">
          <div className="flex items-center space-x-2 text-xs text-gray-400">
            <span className="font-semibold text-gray-200">Total User Records:</span>
            <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono font-bold">
              {records.length}
            </span>
          </div>

          <button
            onClick={fetchRecords}
            disabled={loading}
            className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-gray-900 hover:bg-gray-800 text-cyan-400 border border-gray-700 text-xs font-semibold transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Vault</span>
          </button>
        </div>

        {records.length === 0 ? (
          <div className="py-12 text-center text-gray-500 text-sm space-y-2">
            <Database className="w-8 h-8 mx-auto text-gray-600" />
            <p>No user records stored in database yet.</p>
            <p className="text-xs text-gray-600">Register a user in Module 1 to populate database records.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-800 text-[11px] font-bold uppercase tracking-widest text-cyan-400 bg-gray-950/60">
                  <th className="py-3 px-4">Username</th>
                  <th className="py-3 px-4">SHA-256 Hash</th>
                  <th className="py-3 px-4">Salt (Hex)</th>
                  <th className="py-3 px-4">Salted Hash</th>
                  <th className="py-3 px-4">Created Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60 font-mono text-xs text-gray-300">
                {records.map((rec, i) => (
                  <tr key={i} className="hover:bg-gray-900/40 transition-colors">
                    <td className="py-3 px-4 font-bold text-emerald-400 font-sans">{rec.Username}</td>
                    <td className="py-3 px-4 text-cyan-300 text-[11px] max-w-xs truncate" title={rec.SHA256_Hash}>
                      {rec.SHA256_Hash}
                    </td>
                    <td className="py-3 px-4 text-amber-300 text-[11px] max-w-[120px] truncate" title={rec.Salt}>
                      {rec.Salt}
                    </td>
                    <td className="py-3 px-4 text-purple-300 text-[11px] max-w-xs truncate" title={rec.Salted_Hash}>
                      {rec.Salted_Hash}
                    </td>
                    <td className="py-3 px-4 text-gray-400 text-[11px] font-sans">
                      {new Date(rec.Created_Time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="p-3 bg-emerald-950/20 border border-emerald-900/50 rounded-lg text-xs text-emerald-300 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Zero Plain Text Password Storage Policy Enforced</span>
          </div>
        </div>
      </div>
    </div>
  );
}
