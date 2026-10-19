'use client';

import React, { useState } from 'react';

export default function OkfnAdminPortal() {
  const [activeTab, setActiveTab] = useState<'home' | 'watch' | 'announcements' | 'giving' | 'prayer' | 'profile' | 'settings' | 'admin'>('home');
  
  // Giving state
  const [selectedAmount, setSelectedAmount] = useState<number | 'custom'>(25);
  const [customAmount, setCustomAmount] = useState('');
  const [givingType, setGivingType] = useState<'Tithes' | 'Offerings' | 'Special' | 'General'>('Tithes');
  const [paymentMethod, setPaymentMethod] = useState<'Paystack' | 'Flutterwave' | 'Bank Transfer'>('Paystack');
  const [givingSuccess, setGivingSuccess] = useState(false);

  // Prayer state
  const [prayerList, setPrayerList] = useState([
    { id: 1, title: 'Family breakthrough', date: 'Oct 1, 2026', status: 'Responded', pastoralNote: 'We are standing with you in prayer. God is faithful.' },
    { id: 2, title: 'Healing for my mother', date: 'Sep 28, 2026', status: 'Responded', pastoralNote: 'Prayer team lifted your mother up during morning devotions.' },
    { id: 3, title: 'Career direction', date: 'Sep 25, 2026', status: 'Submitted', pastoralNote: 'Pending review by pastoral desk.' }
  ]);
  const [newPrayerTitle, setNewPrayerTitle] = useState('');
  const [newPrayerDesc, setNewPrayerDesc] = useState('');
  const [showNewPrayerModal, setShowNewPrayerModal] = useState(false);

  // Announcements state
  const [announcementFilter, setAnnouncementFilter] = useState<'All' | 'General' | 'Events' | 'Ministry'>('All');
  const announcements = [
    { id: 1, title: '10 Days of Prayer & Fasting', category: 'Events', date: 'Sep 28, 2026', desc: 'Join us for 10 days of prayer and fasting across all branches.' },
    { id: 2, title: 'In His Presence Conference 2026', category: 'Events', date: 'Sep 25, 2026', desc: 'Get ready for an encounter like never before with guest ministers.' },
    { id: 3, title: 'New Membres Class', category: 'Ministry', date: 'Sep 20, 2026', desc: 'Next session starts October 12, 2026. Register at the welcome desk.' },
    { id: 4, title: 'Giving Update', category: 'General', date: 'Sep 18, 2026', desc: 'Thank you for your continued support towards the sanctuary project.' }
  ];

  const handleGiveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGivingSuccess(true);
    setTimeout(() => setGivingSuccess(false), 4000);
  };

  const handleAddPrayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPrayerTitle) return;
    setPrayerList([
      { id: Date.now(), title: newPrayerTitle, date: 'Today', status: 'Submitted', pastoralNote: 'Received by pastoral team.' },
      ...prayerList
    ]);
    setNewPrayerTitle('');
    setNewPrayerDesc('');
    setShowNewPrayerModal(false);
  };

  return (
    <div className="min-h-screen bg-[#0B132B] text-white">
      {/* Header */}
      <header className="okfn-gradient border-b border-[#3A506B] px-6 py-4 flex flex-col md:flex-row justify-between items-center shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center font-bold text-black text-xl shadow-md border-2 border-white">
            🕊️
          </div>
          <div>
            <h1 className="text-xl font-black tracking-wider uppercase text-white m-0">One Kingdom Family Network</h1>
            <p className="text-xs text-[#D4AF37] font-semibold tracking-wide m-0">One Family • One Kingdom • One Mission</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex flex-wrap gap-2 mt-4 md:mt-0">
          {[
            { id: 'home', label: 'Home' },
            { id: 'watch', label: 'Watch & Listen' },
            { id: 'announcements', label: 'Announcements' },
            { id: 'giving', label: 'Giving' },
            { id: 'prayer', label: 'Prayer' },
            { id: 'profile', label: 'Profile' },
            { id: 'settings', label: 'Settings' },
            { id: 'admin', label: 'Admin Desk' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-[#D4AF37] text-[#0B132B] shadow-md font-bold'
                  : 'bg-[#1C2541] text-[#94A3B8] hover:bg-[#3A506B] hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      {/* Main Content Body */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* HOME TAB */}
        {activeTab === 'home' && (
          <div className="space-y-6">
            {/* Live Service Banner */}
            <div className="relative rounded-2xl overflow-hidden border border-[#3A506B] bg-gradient-to-r from-[#062D6B] to-[#064EA2] p-8 shadow-2xl">
              <div className="absolute top-4 right-4 bg-red-600 text-white text-xs px-3 py-1 rounded-full font-bold animate-pulse flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-white"></span>
                <span>LIVE NOW</span>
              </div>
              <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">In His Presence Sunday Service</span>
              <h2 className="text-3xl font-extrabold mt-1 mb-2">Live stream with our global family</h2>
              <p className="text-[#94A3B8] max-w-xl mb-6">Join us for today's powerful worship, word, and fellowship. Experience divine transformation.</p>
              <button 
                onClick={() => setActiveTab('watch')}
                className="bg-[#D4AF37] text-[#0B132B] font-bold px-6 py-3 rounded-xl shadow-lg hover:bg-yellow-400 transition"
              >
                Watch Live Stream
              </button>
            </div>

            {/* Upcoming Services */}
            <div>
              <h3 className="text-lg font-bold text-[#D4AF37] mb-4">Upcoming Services</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { title: 'Sunday Service', time: 'Oct 12, 2026 • 10:00 AM (WAT)', speaker: 'Pastor Travis & Global Team' },
                  { title: 'Midweek Communion Service', time: 'Wed, Oct 14, 2026 • 6:00 PM', speaker: 'Prophetic Desk' },
                  { title: 'Global Youth Ignition', time: 'Fri, Oct 16, 2026 • 7:00 PM', speaker: 'Youth Ministry' }
                ].map((s, idx) => (
                  <div key={idx} className="bg-[#1C2541] border border-[#3A506B] p-5 rounded-2xl shadow-md">
                    <span className="text-xs text-[#D4AF37] font-semibold">Service</span>
                    <h4 className="font-bold text-lg mt-1">{s.title}</h4>
                    <p className="text-xs text-[#94A3B8] mt-1">{s.time}</p>
                    <p className="text-sm mt-3 text-gray-300">Speaker: {s.speaker}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* WATCH & LISTEN TAB */}
        {activeTab === 'watch' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#D4AF37]">Watch & Listen Platforms</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'YouTube', desc: 'Live Stream & Channel', url: 'https://youtube.com', badge: 'Primary' },
                { name: 'Facebook Page', desc: 'Live Stream & Updates', url: 'https://facebook.com', badge: 'Active' },
                { name: 'Mixlr', desc: 'Audio Stream for low bandwidth', url: 'https://mixlr.com', badge: 'Audio' },
                { name: 'Zoom', desc: 'Interactive Meeting / Webinar', url: 'https://zoom.us', badge: 'Interactive' }
              ].map((p, idx) => (
                <div key={idx} className="bg-[#1C2541] border border-[#3A506B] p-5 rounded-2xl flex items-center justify-between shadow-md">
                  <div>
                    <span className="text-xs font-bold text-[#D4AF37]">{p.badge}</span>
                    <h4 className="font-bold text-lg mt-0.5">{p.name}</h4>
                    <p className="text-xs text-[#94A3B8]">{p.desc}</p>
                  </div>
                  <a 
                    href={p.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="bg-[#064EA2] hover:bg-[#062D6B] text-white px-4 py-2 rounded-xl text-sm font-bold shadow transition"
                  >
                    Join
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ANNOUNCEMENTS TAB */}
        {activeTab === 'announcements' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <h2 className="text-2xl font-bold text-[#D4AF37]">Announcements & Updates</h2>
              <div className="flex space-x-2">
                {(['All', 'General', 'Events', 'Ministry'] as const).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setAnnouncementFilter(cat)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${
                      announcementFilter === cat ? 'bg-[#064EA2] text-white' : 'bg-[#1C2541] text-[#94A3B8]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {announcements
                .filter(a => announcementFilter === 'All' || a.category === announcementFilter)
                .map(a => (
                  <div key={a.id} className="bg-[#1C2541] border border-[#3A506B] p-6 rounded-2xl shadow-md">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#064EA2]/30 text-[#E7F5FF] border border-[#064EA2]">
                        {a.category}
                      </span>
                      <span className="text-xs text-[#94A3B8]">{a.date}</span>
                    </div>
                    <h3 className="text-xl font-bold mt-3 text-white">{a.title}</h3>
                    <p className="text-[#94A3B8] text-sm mt-1">{a.desc}</p>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* GIVING TAB */}
        {activeTab === 'giving' && (
          <div className="max-w-2xl mx-auto bg-[#1C2541] border border-[#3A506B] p-8 rounded-2xl shadow-2xl space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-[#D4AF37]">Give to Support the Kingdom</h2>
              <p className="text-xs text-[#94A3B8] mt-1">Your generosity helps us reach more lives with the gospel.</p>
            </div>

            {givingSuccess && (
              <div className="bg-green-600/20 border border-green-500 text-green-300 p-4 rounded-xl text-center text-sm font-semibold">
                Giving submitted successfully! Thank you for partnering with OKFN.
              </div>
            )}

            <form onSubmit={handleGiveSubmit} className="space-y-5">
              {/* Type of giving */}
              <div>
                <label className="block text-xs font-bold text-[#94A3B8] uppercase mb-2">Giving Category</label>
                <div className="grid grid-cols-4 gap-2">
                  {(['Tithes', 'Offerings', 'Special', 'General'] as const).map(t => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setGivingType(t)}
                      className={`py-2 rounded-xl text-xs font-bold transition ${
                        givingType === t ? 'bg-[#064EA2] text-white' : 'bg-[#0B132B] text-[#94A3B8] border border-[#3A506B]'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount Selection */}
              <div>
                <label className="block text-xs font-bold text-[#94A3B8] uppercase mb-2">Select Amount ($)</label>
                <div className="grid grid-cols-5 gap-2">
                  {[10, 25, 50, 100].map(amt => (
                    <button
                      type="button"
                      key={amt}
                      onClick={() => { setSelectedAmount(amt); setCustomAmount(''); }}
                      className={`py-2.5 rounded-xl text-sm font-bold transition ${
                        selectedAmount === amt ? 'bg-[#D4AF37] text-[#0B132B]' : 'bg-[#0B132B] text-white border border-[#3A506B]'
                      }`}
                    >
                      ${amt}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setSelectedAmount('custom')}
                    className={`py-2.5 rounded-xl text-sm font-bold transition ${
                      selectedAmount === 'custom' ? 'bg-[#D4AF37] text-[#0B132B]' : 'bg-[#0B132B] text-white border border-[#3A506B]'
                    }`}
                  >
                    Custom
                  </button>
                </div>
              </div>

              {selectedAmount === 'custom' && (
                <div>
                  <label className="block text-xs font-bold text-[#94A3B8] uppercase mb-1">Other Amount ($)</label>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full bg-[#0B132B] border border-[#3A506B] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              )}

              {/* Payment Method */}
              <div>
                <label className="block text-xs font-bold text-[#94A3B8] uppercase mb-2">Select Payment Method</label>
                <div className="space-y-2">
                  {(['Paystack', 'Flutterwave', 'Bank Transfer'] as const).map(m => (
                    <label
                      key={m}
                      onClick={() => setPaymentMethod(m)}
                      className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition ${
                        paymentMethod === m ? 'border-[#D4AF37] bg-[#0B132B]' : 'border-[#3A506B] bg-[#0B132B]/50'
                      }`}
                    >
                      <span className="font-semibold text-sm">{m}</span>
                      <span className="text-xs text-[#94A3B8]">{m === 'Bank Transfer' ? 'Local / International' : 'Card, Bank, USSD'}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#D4AF37] text-[#0B132B] font-extrabold text-base hover:bg-yellow-400 transition shadow-lg"
              >
                Proceed with Giving
              </button>
            </form>
          </div>
        )}

        {/* PRAYER TAB */}
        {activeTab === 'prayer' && (
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-[#D4AF37]">Prayer Desk & Requests</h2>
                <p className="text-xs text-[#94A3B8]">Share your prayer request and our pastoral team will stand with you.</p>
              </div>
              <button
                onClick={() => setShowNewPrayerModal(true)}
                className="bg-[#D4AF37] text-[#0B132B] px-4 py-2 rounded-xl text-sm font-bold shadow hover:bg-yellow-400 transition"
              >
                + New Request
              </button>
            </div>

            {showNewPrayerModal && (
              <div className="bg-[#1C2541] border border-[#3A506B] p-6 rounded-2xl shadow-xl space-y-4">
                <h3 className="text-lg font-bold text-[#D4AF37]">Submit New Prayer Request</h3>
                <form onSubmit={handleAddPrayer} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#94A3B8] mb-1">Request Title</label>
                    <input
                      type="text"
                      value={newPrayerTitle}
                      onChange={(e) => setNewPrayerTitle(e.target.value)}
                      placeholder="e.g. Divine Healing / Financial Breakthrough"
                      className="w-full bg-[#0B132B] border border-[#3A506B] rounded-xl px-4 py-2.5 text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#94A3B8] mb-1">Details</label>
                    <textarea
                      value={newPrayerDesc}
                      onChange={(e) => setNewPrayerDesc(e.target.value)}
                      placeholder="Share details for pastoral intercession..."
                      className="w-full bg-[#0B132B] border border-[#3A506B] rounded-xl px-4 py-2.5 text-white h-24"
                    />
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowNewPrayerModal(false)}
                      className="px-4 py-2 rounded-xl bg-gray-700 text-sm font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-[#D4AF37] text-[#0B132B] text-sm font-bold"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="space-y-4">
              {prayerList.map(item => (
                <div key={item.id} className="bg-[#1C2541] border border-[#3A506B] p-5 rounded-2xl shadow-md space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-lg text-white">{item.title}</h4>
                      <p className="text-xs text-[#94A3B8]">Submitted: {item.date}</p>
                    </div>
                    <span className="text-xs px-3 py-1 rounded-full font-bold bg-[#064EA2]/30 text-[#E7F5FF] border border-[#064EA2]">
                      {item.status}
                    </span>
                  </div>
                  <div className="bg-[#0B132B] p-3 rounded-xl border border-[#3A506B]/50 text-sm">
                    <span className="text-xs font-bold text-[#D4AF37] block mb-1">Pastoral Response:</span>
                    <p className="text-gray-300 m-0">{item.pastoralNote}</p>
                  </div>
                  <div className="flex justify-end">
                    <a
                      href="https://whatsapp.com"
                      target="_blank"
                      rel="noreferrer"
                      className="bg-green-600 hover:bg-green-500 text-white text-xs font-bold px-4 py-2 rounded-xl inline-flex items-center space-x-1 transition"
                    >
                      <span>💬 Contact via WhatsApp</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROFILE TAB */}
        {activeTab === 'profile' && (
          <div className="max-w-md mx-auto bg-[#1C2541] border border-[#3A506B] p-8 rounded-2xl shadow-2xl text-center space-y-6">
            <div className="w-24 h-24 rounded-full bg-[#064EA2] border-4 border-[#D4AF37] mx-auto flex items-center justify-center text-3xl font-black shadow-xl">
              JD
            </div>
            <div>
              <h2 className="text-2xl font-bold">John Doe</h2>
              <p className="text-xs text-[#D4AF37] font-semibold">Registered Member</p>
            </div>
            <div className="space-y-3 text-left bg-[#0B132B] p-4 rounded-xl border border-[#3A506B]">
              <div className="flex justify-between text-sm">
                <span className="text-[#94A3B8]">Country / Region:</span>
                <span className="font-bold">Nigeria</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#94A3B8]">Preferred Language:</span>
                <span className="font-bold">English</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#94A3B8]">Ministry / Fellowship:</span>
                <span className="font-bold">Youth Ministry</span>
              </div>
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="max-w-xl mx-auto bg-[#1C2541] border border-[#3A506B] p-8 rounded-2xl shadow-2xl space-y-6">
            <h2 className="text-2xl font-bold text-[#D4AF37]">Settings & Preferences</h2>
            <div className="space-y-4">
              {[
                { title: 'Appearance', desc: 'Dark Mode (Active)' },
                { title: 'Notification Preferences', desc: 'Push, Email, SMS alerts' },
                { title: 'Profile & Authentication', desc: 'Email and password update' },
                { title: 'Privacy & Data', desc: 'Manage your personal data' },
                { title: 'Help Centre & Support', desc: 'Contact OKFN administrators' }
              ].map((s, idx) => (
                <div key={idx} className="bg-[#0B132B] border border-[#3A506B] p-4 rounded-xl flex justify-between items-center cursor-pointer hover:border-[#D4AF37] transition">
                  <div>
                    <h4 className="font-bold text-base">{s.title}</h4>
                    <p className="text-xs text-[#94A3B8]">{s.desc}</p>
                  </div>
                  <span className="text-gray-400 font-bold">›</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ADMIN DASHBOARD TAB */}
        {activeTab === 'admin' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#D4AF37]">OKFN Administration Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: 'Total Members', count: '1,482', change: '+12% this month' },
                { title: 'Giving Reconciled', count: '$24,550', change: 'This month' },
                { title: 'Active Prayer Requests', count: '38', change: 'Pending pastoral notes' }
              ].map((stat, idx) => (
                <div key={idx} className="bg-[#1C2541] border border-[#3A506B] p-6 rounded-2xl shadow-md">
                  <h4 className="text-xs text-[#94A3B8] font-bold uppercase">{stat.title}</h4>
                  <p className="text-3xl font-extrabold text-[#D4AF37] mt-1">{stat.count}</p>
                  <p className="text-xs text-green-400 mt-2">{stat.change}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
