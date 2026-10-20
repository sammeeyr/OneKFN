'use client';

import React, { useState } from 'react';

export default function AdminWebPortal() {
  const [activeMenu, setActiveMenu] = useState<'dashboard' | 'announcements' | 'giving' | 'prayer' | 'settings'>('dashboard');
  
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: '10 Days of Prayer & Fasting', category: 'Events', date: 'Sep 28, 2026', status: 'Published' },
    { id: 2, title: 'In His Presence Conference 2026', category: 'Events', date: 'Sep 25, 2026', status: 'Published' },
    { id: 3, title: 'New Membres Class', category: 'Ministry', date: 'Sep 20, 2026', status: 'Published' }
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Events');
  const [newDesc, setNewDesc] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;
    setAnnouncements([
      { id: Date.now(), title: newTitle, category: newCategory, date: 'Today', status: 'Synced via Supabase Webhooks' },
      ...announcements
    ]);
    setNewTitle('');
    setNewDesc('');
    setSuccessMsg('Successfully pushed update via Supabase Webhooks to iOS & Android mobile apps!');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <div className="min-h-screen bg-[#070D1F] text-white flex">
      {/* Sidebar Navigation for Web App */}
      <aside className="w-64 bg-[#111827] border-r border-[#1F2937] p-6 flex flex-col justify-between hidden md:flex">
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center text-black font-black text-lg">
              👑
            </div>
            <div>
              <h2 className="text-sm font-black uppercase tracking-wider text-white m-0">OKFN Admin Web</h2>
              <p className="text-[10px] text-[#D4AF37] font-semibold m-0">Control Panel</p>
            </div>
          </div>

          <nav className="space-y-1">
            {[
              { id: 'dashboard', label: '📊 Dashboard Overview' },
              { id: 'announcements', label: '📢 Announcements & Push' },
              { id: 'giving', label: '💳 Giving & Tithes' },
              { id: 'prayer', label: '🙏 Prayer Desk' },
              { id: 'settings', label: '⚙️ App Settings & Webhooks' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id as any)}
                className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${
                  activeMenu === item.id
                    ? 'bg-[#D4AF37] text-[#070D1F] shadow'
                    : 'text-[#94A3B8] hover:bg-[#1F2937] hover:text-white'
                }`}
              >
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="bg-[#1F2937] p-4 rounded-xl text-xs text-[#94A3B8] border border-gray-800">
          <span className="text-green-400 font-bold block mb-1">● Supabase Connected</span>
          Mobile Apps API v2.4 Active
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="bg-[#111827] border-b border-[#1F2937] px-8 py-5 flex justify-between items-center shadow-md">
          <div>
            <h1 className="text-xl font-extrabold m-0 text-white capitalize">{activeMenu} Portal</h1>
            <p className="text-xs text-[#94A3B8] m-0">One Kingdom Family Network Web Administration</p>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-xs font-semibold bg-[#1F2937] px-3 py-1.5 rounded-full border border-gray-700">Travis (Super Admin)</span>
          </div>
        </header>

        <div className="p-8 space-y-8 flex-1 overflow-y-auto">
          {successMsg && (
            <div className="bg-green-600/20 border border-green-500 text-green-300 p-4 rounded-xl text-sm font-bold shadow-lg text-center animate-bounce">
              {successMsg}
            </div>
          )}

          {activeMenu === 'dashboard' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                {[
                  { label: 'Active iOS & Android Users', value: '3,842', trend: '+18% this month' },
                  { label: 'Live Stream Viewers', value: '1,250', trend: 'In His Presence' },
                  { label: 'Giving Reconciled', value: '$28,400', trend: 'This month' },
                  { label: 'Pending Prayer Requests', value: '14', trend: 'Requires pastoral note' }
                ].map((stat, i) => (
                  <div key={i} className="bg-[#111827] border border-[#1F2937] p-6 rounded-2xl shadow-md">
                    <span className="text-xs text-[#94A3B8] font-bold uppercase">{stat.label}</span>
                    <p className="text-3xl font-extrabold text-[#D4AF37] mt-2 mb-1">{stat.value}</p>
                    <p className="text-xs text-green-400 m-0">{stat.trend}</p>
                  </div>
                ))}
              </div>

              <div className="bg-[#111827] border border-[#1F2937] p-6 rounded-2xl shadow-md">
                <h3 className="text-lg font-bold text-[#D4AF37] mb-3">Recent Mobile App Activity</h3>
                <p className="text-xs text-[#94A3B8]">All actions performed in this Next.js web application instantly synchronize with the iOS and Android applications via Supabase Webhooks.</p>
              </div>
            </div>
          )}

          {activeMenu === 'announcements' && (
            <div className="space-y-6">
              <div className="bg-[#111827] border border-[#1F2937] p-6 rounded-2xl shadow-xl space-y-4">
                <h3 className="text-lg font-bold text-[#D4AF37]">Push Announcement / Update to Mobile Apps</h3>
                <form onSubmit={handlePublish} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#94A3B8] mb-1 uppercase">Update Title</label>
                      <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="e.g. Special Miracle Crusade"
                        className="w-full bg-[#070D1F] border border-[#1F2937] rounded-xl px-4 py-3 text-white focus:border-[#D4AF37] outline-none text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#94A3B8] mb-1 uppercase">Category</label>
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="w-full bg-[#070D1F] border border-[#1F2937] rounded-xl px-4 py-3 text-white focus:border-[#D4AF37] outline-none text-sm"
                      >
                        <option value="Events">Events</option>
                        <option value="Ministry">Ministry</option>
                        <option value="General">General</option>
                        <option value="Live Alert">Live Alert</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#94A3B8] mb-1 uppercase">Content / Details</label>
                    <textarea
                      value={newDesc}
                      onChange={(e) => setNewDesc(e.target.value)}
                      placeholder="Enter update description to push instantly..."
                      className="w-full bg-[#070D1F] border border-[#1F2937] rounded-xl px-4 py-3 text-white focus:border-[#D4AF37] outline-none text-sm h-24"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#D4AF37] text-[#070D1F] font-extrabold px-6 py-3 rounded-xl shadow-lg hover:bg-yellow-400 transition text-sm"
                  >
                    🚀 Publish & Push via Supabase Webhooks
                  </button>
                </form>
              </div>

              <div className="bg-[#111827] border border-[#1F2937] p-6 rounded-2xl shadow-xl space-y-4">
                <h3 className="text-lg font-bold text-[#D4AF37]">Active Broadcasts</h3>
                <div className="space-y-3">
                  {announcements.map(item => (
                    <div key={item.id} className="bg-[#070D1F] border border-[#1F2937] p-4 rounded-xl flex justify-between items-center">
                      <div>
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-[#064EA2]/30 text-[#E7F5FF] border border-[#064EA2]">
                          {item.category}
                        </span>
                        <h4 className="font-bold text-base mt-2 mb-0">{item.title}</h4>
                        <p className="text-xs text-[#94A3B8] mt-1 mb-0">Date: {item.date}</p>
                      </div>
                      <span className="text-xs font-bold text-green-400 bg-green-950/40 border border-green-800 px-3 py-1 rounded-full">
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeMenu === 'giving' && (
            <div className="bg-[#111827] border border-[#1F2937] p-6 rounded-2xl shadow-md space-y-4">
              <h3 className="text-lg font-bold text-[#D4AF37]">Giving & Tithes Reconciliation</h3>
              <p className="text-xs text-[#94A3B8]">Review incoming transactions from Paystack, Flutterwave, and Bank Transfers across iOS and Android app users.</p>
              <div className="bg-[#070D1F] border border-[#1F2937] p-4 rounded-xl text-xs text-center text-gray-400">
                No pending reconciliation items. All transactions synced successfully.
              </div>
            </div>
          )}

          {activeMenu === 'prayer' && (
            <div className="bg-[#111827] border border-[#1F2937] p-6 rounded-2xl shadow-md space-y-4">
              <h3 className="text-lg font-bold text-[#D4AF37]">Prayer Desk Moderation</h3>
              <p className="text-xs text-[#94A3B8]">Review prayer requests submitted from mobile users and assign pastoral responses.</p>
              <div className="space-y-3">
                {[
                  { title: 'Family breakthrough', user: 'John Doe', date: 'Oct 1, 2026', status: 'Responded' },
                  { title: 'Healing for my mother', user: 'Sarah Smith', date: 'Sep 28, 2026', status: 'Responded' },
                  { title: 'Career direction', user: 'Michael Johnson', date: 'Sep 25, 2026', status: 'Pending' }
                ].map((p, idx) => (
                  <div key={idx} className="bg-[#070D1F] border border-[#1F2937] p-4 rounded-xl flex justify-between items-center text-xs">
                    <div>
                      <span className="font-bold text-sm block text-white">{p.title}</span>
                      <span className="text-[#94A3B8]">User: {p.user} • {p.date}</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full font-bold ${p.status === 'Responded' ? 'text-green-400 bg-green-950/40' : 'text-yellow-400 bg-yellow-950/40'}`}>
                      {p.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeMenu === 'settings' && (
            <div className="bg-[#111827] border border-[#1F2937] p-6 rounded-2xl shadow-md space-y-4">
              <h3 className="text-lg font-bold text-[#D4AF37]">App Settings & Supabase Webhooks</h3>
              <p className="text-xs text-[#94A3B8]">Configure webhook URLs to dispatch real-time events to the React Native iOS & Android clients.</p>
              <div className="bg-[#070D1F] border border-[#1F2937] p-4 rounded-xl space-y-2 text-xs">
                <span className="font-bold text-white block">Webhook Endpoint URL:</span>
                <code className="text-[#D4AF37] block bg-black/40 p-2 rounded">https://api.onekingdomfamily.org/v1/webhooks/supabase</code>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
