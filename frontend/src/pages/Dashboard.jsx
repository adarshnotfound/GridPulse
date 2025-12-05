// Dashboard.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
  Shield,
  Activity,
  Pill,
  AlertTriangle,
  Zap,
  User,
  ChevronRight,
} from "lucide-react";

export default function RangerHealthDashboard() {
  // sample medications
  const initialMeds = [
    { id: 1, name: "Morpher Shield", time: "07:30", dosage: "2 capsules", taken: false },
    { id: 2, name: "Pulse Stabilizer", time: "12:00", dosage: "1 tablet", taken: false },
    { id: 3, name: "Neuro-Calm", time: "18:30", dosage: "1 capsule", taken: false },
    { id: 4, name: "Energy Matrix", time: "22:00", dosage: "0.5 patch", taken: false },
  ];

  const [meds, setMeds] = useState(initialMeds);
  const [lastSync, setLastSync] = useState(new Date());
  const [aiOpen, setAiOpen] = useState(false);

  // mark scheduledPast based on today's time (optional visual)
  useEffect(() => {
    const now = new Date();
    setMeds((prev) =>
      prev.map((m) => {
        const [hh, mm] = m.time.split(":").map(Number);
        const sched = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hh, mm);
        return { ...m, scheduledPast: sched < now };
      })
    );
    const iv = setInterval(() => setLastSync(new Date()), 30_000);
    return () => clearInterval(iv);
  }, []);

  const stats = useMemo(() => {
    const total = meds.length || 1;
    const takenCount = meds.filter((m) => m.taken).length;
    const pct = Math.round((takenCount / total) * 100);
    return { wellness: pct, adherence: pct, activeStreak: 7 + Math.floor((pct / 100) * 3), total, takenCount };
  }, [meds]);

  function toggleTake(id) {
    setMeds((prev) => prev.map((m) => (m.id === id ? { ...m, taken: !m.taken } : m)));
    setLastSync(new Date());
  }

  function quickMarkAll() {
    setMeds((prev) => prev.map((m) => ({ ...m, taken: true })));
    setLastSync(new Date());
  }

  function askAI() {
    setAiOpen(true);
    setTimeout(() => setAiOpen(false), 1600);
  }

  const missedDoses = meds.filter((m) => m.scheduledPast && !m.taken);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 md:p-8">
      {/* subtle grid background */}
      <div className="pointer-events-none absolute inset-0 opacity-5 bg-[linear-gradient(90deg,#fff_1px,transparent_1px),linear-gradient(#fff_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar (mobile collapses to top) */}
        <aside className="lg:col-span-2 order-1 lg:order-1 bg-slate-800/30 backdrop-blur rounded-2xl p-5 border border-red-500/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-slate-900/60 border border-red-500/30">
              <Shield className="text-red-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-wider">GRIDPULSE</h3>
              <p className="text-xs text-gray-300">Ranger Health</p>
            </div>
          </div>

          <nav className="space-y-3 text-sm">
            <a className="block px-3 py-2 rounded-md hover:bg-slate-800/40 transition">Dashboard</a>
            <a className="block px-3 py-2 rounded-md hover:bg-slate-800/40 transition">Protocols</a>
            <a className="block px-3 py-2 rounded-md hover:bg-slate-800/40 transition">Vitals</a>
            <a className="block px-3 py-2 rounded-md hover:bg-slate-800/40 transition">AI Assistant</a>
          </nav>
        </aside>

        {/* Main header + stats */}
        <div className="lg:col-span-7 order-3 lg:order-2 space-y-6">
          <header className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4 bg-slate-800/30 backdrop-blur rounded-2xl p-5 border border-red-500/15">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-slate-900/50 border border-red-500/25 shadow-[0_6px_30px_rgba(255,0,0,0.08)]">
                <Shield className="text-red-500" size={26} />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold tracking-wide">Command Center</h1>
                <p className="text-xs text-gray-300">GridPulse — Ranger Health Operations</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-300 text-right">
                <div className="uppercase text-xs tracking-widest">Last Sync</div>
                <div className="font-mono text-sm text-red-400">{lastSync.toLocaleTimeString()}</div>
              </div>

              <div className="flex items-center gap-3 bg-slate-800/40 p-2 rounded-xl border border-red-500/20">
                <div className="w-10 h-10 rounded-full bg-red-600/30 flex items-center justify-center text-red-300 font-bold">
                  RR
                </div>
                <div className="text-sm">
                  <div className="font-semibold">Red Ranger</div>
                  <div className="text-xs text-gray-300">Field Operator</div>
                </div>
              </div>
            </div>
          </header>

          {/* Stats row */}
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Wellness */}
            <div className="p-4 rounded-2xl bg-slate-900/40 backdrop-blur border border-red-500/10 shadow hover:scale-[1.01] transition">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="text-red-400" />
                  <div>
                    <div className="text-xs text-gray-300 uppercase tracking-wider">Wellness Score</div>
                    <div className="text-3xl font-bold">{stats.wellness}%</div>
                  </div>
                </div>
                <div className="text-sm text-gray-300">Optimal</div>
              </div>

              <div className="mt-3 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-red-500 to-red-300" style={{ width: `${stats.wellness}%` }} />
              </div>
            </div>

            {/* Adherence */}
            <div className="p-4 rounded-2xl bg-slate-900/40 backdrop-blur border border-red-500/10 shadow hover:scale-[1.01] transition">
              <div className="flex items-center gap-3">
                <Activity className="text-red-400" />
                <div>
                  <div className="text-xs text-gray-300 uppercase tracking-wider">Adherence</div>
                  <div className="text-3xl font-bold">{stats.adherence}%</div>
                </div>
              </div>
              <div className="mt-3 text-xs text-gray-400">Target 95%</div>
            </div>

            {/* Streak */}
            <div className="p-4 rounded-2xl bg-slate-900/40 backdrop-blur border border-red-500/10 shadow hover:scale-[1.01] transition">
              <div className="flex items-center gap-3 justify-between">
                <div className="flex items-center gap-3">
                  <Zap className="text-red-400" />
                  <div>
                    <div className="text-xs text-gray-300 uppercase tracking-wider">Active Streak</div>
                    <div className="text-3xl font-bold">{stats.activeStreak}d</div>
                  </div>
                </div>
                <button
                  onClick={quickMarkAll}
                  className="text-xs px-3 py-1 rounded-md bg-red-500/20 border border-red-500 text-red-200 hover:bg-red-500 hover:text-black transition"
                >
                  Quick Mark
                </button>
              </div>
            </div>
          </section>

          {/* Today's protocol */}
          <section className="bg-slate-800/30 backdrop-blur rounded-2xl p-6 border border-red-500/10 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Today's Protocol</h2>
              <div className="text-xs text-gray-300">{new Date().toLocaleDateString()}</div>
            </div>

            <ul className="space-y-3">
              {meds.map((m) => (
                <li
                  key={m.id}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-transform hover:scale-[1.01] ${
                    m.taken ? "bg-green-500/10 border-green-500/20" : "bg-slate-900/40 border-slate-700/10"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-slate-900/50 border border-red-500/20 flex items-center justify-center">
                      <Pill className="text-red-400" />
                    </div>
                    <div>
                      <div className="font-semibold">{m.name}</div>
                      <div className="text-xs text-gray-300">{m.dosage} • {m.time}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {m.scheduledPast && !m.taken ? <div className="text-xs text-red-400">Missed</div> : null}
                    <button
                      onClick={() => toggleTake(m.id)}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all shadow ${
                        m.taken ? "bg-green-500 text-black hover:bg-green-600" : "bg-red-500 text-white hover:bg-green-500 hover:text-black"
                      }`}
                    >
                      {m.taken ? "TAKEN" : "TAKE"}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 text-xs text-gray-400">Tip: Tap TAKE when dose is completed. Missed doses are flagged above.</div>
          </section>
        </div>

        {/* Right column / Alerts & AI */}
        <aside className="lg:col-span-3 order-2 lg:order-3 bg-slate-800/30 backdrop-blur rounded-2xl p-5 border border-red-500/10 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Dose Reminder Engine</h3>
            <div className="text-xs text-gray-300">Real-time</div>
          </div>

          {missedDoses.length > 0 ? (
            <div className="p-4 rounded-xl border-2 border-red-500 bg-red-900/20 flex gap-3 items-start animate-pulse">
              <AlertTriangle className="text-red-400" />
              <div>
                <div className="font-semibold text-red-200">Missed Dose</div>
                <div className="text-xs text-red-100/80">{missedDoses.length} dose(s) require attention.</div>
              </div>
            </div>
          ) : (
            <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-700/10 text-xs text-gray-300">All clear — no missed doses detected.</div>
          )}

          <div className="bg-slate-900/40 p-4 rounded-xl border border-red-500/10">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold">Alpha-5 Assistant</h4>
              <div className="text-xs text-gray-300">AI</div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={askAI}
                className="flex-1 px-4 py-2 rounded-lg bg-red-500/20 border border-red-500 text-sm hover:bg-red-500 hover:text-black transition font-semibold"
              >
                Ask AI
              </button>
              <button
                onClick={() => alert("Schedule reminder (demo)")}
                className="px-3 py-2 rounded-lg bg-slate-800/40 border border-slate-700 text-sm"
              >
                Schedule
              </button>
            </div>
            {aiOpen && <div className="mt-3 text-xs text-green-300 animate-pulse">Alpha-5 processing…</div>}
          </div>

          <div className="text-xs text-gray-400 pt-2 border-t border-slate-700/10">
            <div className="flex items-center justify-between">
              <span>Automations</span>
              <span>v1.4</span>
            </div>
            <div className="mt-2">Quick controls and mission status live here.</div>
          </div>
        </aside>
      </div>

      {/* Inline styles / keyframes */}
      <style>{`
        @keyframes subtleMove {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
          100% { transform: translateY(0px); }
        }
        .animate-subtle { animation: subtleMove 3s ease-in-out infinite; }
        @keyframes pulse { 0% { box-shadow: 0 0 8px rgba(255,0,0,0.15);} 50% { box-shadow: 0 0 20px rgba(255,0,0,0.28);} 100% { box-shadow: 0 0 8px rgba(255,0,0,0.15);} }
        .animate-glow { animation: pulse 3s infinite; }
      `}</style>
    </div>
  );
}
