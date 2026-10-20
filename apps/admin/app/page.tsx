'use client';

import React, { useState } from 'react';

export default function AdminControlPanel() {
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
      { id: Date.now(), title: newTitle, category: newCategory, date: 'Today', status: 'Published to Mobile App' },
      ...announcements
    ]);
    setNewTitle('');
    setNewDesc('');
    setSuccessMsg('Successfully pushed update to iOS & Android mobile apps!');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <div className="min-h-screen bg-[#070D1F] text-white p-6">
      <header className="max-w-6xl mx-auto flex justify-between items-center border-b border-[#2D3E63] pb-6 mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center text-xl font-black text-black shadow-lg">
            👑
          </div>
          <div>
            <h1 className="text-xl font-black tracking-wider uppercase m-0">OKFN Admin Control Panel</h1>
            <p className="text-xs text-[#D4AF37] font-semibold m-0">Push Live Updates to iOS & Android Apps</p>
          </div>
        </div>
        <div className="bg-[#161F37] border border-[#2D3E63] px-4 py-2 rounded-xl text-xs font-bold text-green-400 flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span>Connected to Mobile Apps (API v1)</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto space-y-8">
        {successMsg && (
          <div className="bg-green-600/20 border border-green-500 text-green-300 p-4 rounded-xl text-sm font-bold shadow-lg text-center animate-bounce">
            {successMsg}
          </div>
        )}

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Active iOS & Android Users', value: '3,842', trend: '+18% this month' },
            { label: 'Live Stream Viewers', value: '1,250', trend: 'In His Presence' },
            { label: 'Giving Reconciled', value: '$28,400', trend: 'This month' },
            { label: 'Pending Prayer Requests', value: '14', trend: 'Requires pastoral note' }
          ].map((stat, i) => (
            <div key={i} className="bg-[#161F37] border border-[#2D3E63] p-5 rounded-2xl shadow-md">
              <span className="text-xs text-[#94A3B8] font-bold uppercase">{stat.label}</span>
              <p className="text-3xl font-extrabold text-[#D4AF37] mt-1 m-0">{stat.value}</p>
              <p className="text-xs text-green-400 mt-2 m-0">{stat.trend}</p>
            </div>
          ))}
        </div>

        {/* Push Announcement / Update to Mobile Apps */}
        <div className="bg-[#161F37] border border-[#2D3E63] p-6 rounded-2xl shadow-xl space-y-4">
          <h3 className="text-lg font-bold text-[#D4AF37]">Push Announcement / Live Update to Mobile Apps</h3>
          <form onSubmit={handlePublish} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#94A3B8] mb-1 uppercase">Update Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Special Miracle Crusade Announcement"
                  className="w-full bg-[#070D1F] border border-[#2D3E63] rounded-xl px-4 py-3 text-white focus:border-[#D4AF37] outline-none text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#94A3B8] mb-1 uppercase">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-[#070D1F] border border-[#2D3E63] rounded-xl px-4 py-3 text-white focus:border-[#D4AF37] outline-none text-sm"
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
                placeholder="Enter update description to push instantly to iOS and Android..."
                className="w-full bg-[#070D1F] border border-[#2D3E63] rounded-xl px-4 py-3 text-white focus:border-[#D4AF37] outline-none text-sm h-24"
              />
            </div>
            <button
              type="submit"
              className="bg-[#D4AF37] text-[#070D1F] font-extrabold px-6 py-3 rounded-xl shadow-lg hover:bg-yellow-400 transition text-sm"
            >
              🚀 Publish & Push to iOS & Android Apps
            </button>
          </form>
        </div>

        {/* Published Announcements List */}
        <div className="bg-[#161F37] border border-[#2D3E63] p-6 rounded-2xl shadow-xl space-y-4">
          <h3 className="text-lg font-bold text-[#D4AF37]">Active Broadcasts on Mobile Apps</h3>
          <div className="space-y-3">
            {announcements.map(item => (
              <div key={item.id} className="bg-[#070D1F] border border-[#2D3E63] p-4 rounded-xl flex justify-between items-center">
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
      </main>
    </div>
  );
}
