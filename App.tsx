import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { HomeIcon, Cog6ToothIcon, PhoneIcon, MapIcon, SunIcon, MoonIcon, BellAlertIcon } from '@heroicons/react/24/solid';

import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import FakeCallSetupScreen from './screens/FakeCallSetupScreen';
import SafeRouteScreen from './screens/SafeRouteScreen';
import RouteViewerScreen from './screens/RouteViewerScreen';
import FakeCallScreen from './screens/FakeCallScreen';
import Siren from './components/Siren';
import { useLocalStorage } from './hooks/useLocalStorage';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useLocalStorage('guardian-bell-dark-mode', window.matchMedia('(prefers-color-scheme: dark)').matches);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const NavLink: React.FC<{ to: string; icon: React.ReactNode; label: string }> = ({ to, icon, label }) => (
    <Link to={to} className="flex flex-col items-center justify-center space-y-1 text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors">
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </Link>
  );

  return (
    <HashRouter>
      <div className="flex flex-col h-screen font-sans bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 max-w-md mx-auto shadow-2xl">
        <header className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
           <div className="flex items-center space-x-2">
            <BellAlertIcon className="h-6 w-6 text-teal-500" />
            <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">Guardian Bell</h1>
          </div>
          <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            {isDarkMode ? <SunIcon className="h-6 w-6 text-yellow-400" /> : <MoonIcon className="h-6 w-6 text-slate-700" />}
          </button>
        </header>

        <main className="flex-grow p-4 overflow-y-auto">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/settings" element={<SettingsScreen />} />
            <Route path="/fake-call-setup" element={<FakeCallSetupScreen />} />
            <Route path="/safe-route" element={<SafeRouteScreen />} />
            <Route path="/view-route/:id" element={<RouteViewerScreen />} />
            <Route path="/fake-call" element={<FakeCallScreen />} />
          </Routes>
        </main>
        
        <Siren />

        <nav className="grid grid-cols-4 gap-2 p-3 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 shadow-inner">
           <NavLink to="/" icon={<HomeIcon className="h-6 w-6" />} label="Home" />
           <NavLink to="/safe-route" icon={<MapIcon className="h-6 w-6" />} label="Route" />
           <NavLink to="/fake-call-setup" icon={<PhoneIcon className="h-6 w-6" />} label="Fake Call" />
           <NavLink to="/settings" icon={<Cog6ToothIcon className="h-6 w-6" />} label="Settings" />
        </nav>
      </div>
    </HashRouter>
  );
};

export default App;