import React, { useState, useEffect } from 'react';
import { translations } from './utils/translations';
import { currencies } from './utils/currencies';
import { Login } from './components/Login';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { Dashboard } from './components/Dashboard';
import { Reservations } from './components/Reservations';
import { Rooms } from './components/Rooms';
import { Guests } from './components/Guests';
import { Billing } from './components/Billing';
import { Settings } from './components/Settings';
import { NewBookingModal } from './components/NewBookingModal';

export default function App() {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('grand_horizon_user');
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  const [lang, setLang] = useState('es');
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('grand_horizon_dark') === 'true';
  });
  const [currency, setCurrency] = useState('EUR');
  const [activeTab, setActiveTab] = useState('dashboard');

  const [menuConfig, setMenuConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('grand_horizon_menu');
      return saved ? JSON.parse(saved) : {
        dashboard: { label: 'Dashboard', visible: true },
        reservations: { label: 'Reservas', visible: true },
        rooms: { label: 'Habitaciones', visible: true },
        guests: { label: 'Clientes', visible: true },
        billing: { label: 'Facturación', visible: true },
        settings: { label: 'Configuración', visible: true }
      };
    } catch {
      return {
        dashboard: { label: 'Dashboard', visible: true },
        reservations: { label: 'Reservas', visible: true },
        rooms: { label: 'Habitaciones', visible: true },
        guests: { label: 'Clientes', visible: true },
        billing: { label: 'Facturación', visible: true },
        settings: { label: 'Configuración', visible: true }
      };
    }
  });

  const [usersList, setUsersList] = useState(() => {
    try {
      const saved = localStorage.getItem('grand_horizon_users');
      return saved ? JSON.parse(saved) : [
        { username: 'admin', role: 'admin', shift: 'all', name: 'Administrador General' },
        { username: 'morning', role: 'staff', shift: 'morning', name: 'Turno Mañana' },
        { username: 'afternoon', role: 'staff', shift: 'afternoon', name: 'Turno Tarde' },
        { username: 'night', role: 'staff', shift: 'night', name: 'Turno Noche' }
      ];
    } catch {
      return [
        { username: 'admin', role: 'admin', shift: 'all', name: 'Administrador General' },
        { username: 'morning', role: 'staff', shift: 'morning', name: 'Turno Mañana' },
        { username: 'afternoon', role: 'staff', shift: 'afternoon', name: 'Turno Tarde' },
        { username: 'night', role: 'staff', shift: 'night', name: 'Turno Noche' }
      ];
    }
  });

  const [reservations, setReservations] = useState([]);
  const [rooms, setRooms] = useState([
    { number: '101', type: 'Standard', status: 'Clean', price: 120 },
    { number: '102', type: 'Standard', status: 'Clean', price: 120 },
    { number: '201', type: 'Deluxe', status: 'Dirty', price: 180 },
    { number: '202', type: 'Suite', status: 'Inspected', price: 280 }
  ]);
  const [guests, setGuests] = useState([]);

  const [isNewBookingOpen, setIsNewBookingOpen] = useState(false);
  const [newRes, setNewRes] = useState({ guestName: '', room: '101', checkIn: '', checkOut: '', price: 120 });
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('grand_horizon_dark', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('grand_horizon_dark', 'false');
    }
  }, [darkMode]);

  useEffect(() => {
    try {
      localStorage.setItem('grand_horizon_menu', JSON.stringify(menuConfig));
      localStorage.setItem('grand_horizon_users', JSON.stringify(usersList));
      if (user) localStorage.setItem('grand_horizon_user', JSON.stringify(user));
      else localStorage.removeItem('grand_horizon_user');
    } catch (e) {
      console.error("Error saving to localStorage", e);
    }
  }, [menuConfig, usersList, user]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!user) return;
      if (e.altKey && e.key.toLowerCase() === 'n') {
        e.preventDefault();
        setIsNewBookingOpen(true);
      }
      if (e.altKey && ['1','2','3','4','5','6'].includes(e.key)) {
        e.preventDefault();
        const tabs = ['dashboard', 'reservations', 'rooms', 'guests', 'billing', 'settings'];
        const index = parseInt(e.key) - 1;
        if (tabs[index] && menuConfig[tabs[index]]?.visible) {
          setActiveTab(tabs[index]);
        }
      }
      if (e.key === 'Escape') {
        setIsNewBookingOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [user, menuConfig]);

  const t = translations[lang];

  const handleLogin = (e) => {
    e.preventDefault();
    const found = usersList.find(u => u.username === loginForm.username);
    if (found) {
      setUser(found);
      setLoginError('');
    } else {
      setLoginError('Usuario no encontrado. Prueba los accesos rápidos.');
    }
  };

  const handleQuickLogin = (uname) => {
    const found = usersList.find(u => u.username === uname);
    if (found) {
      setUser(found);
      setLoginError('');
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('grand_horizon_user');
  };

  const formatCurrency = (amount) => {
    const curr = currencies[currency];
    return `${curr.symbol}${(amount * curr.rate).toFixed(2)}`;
  };

  const handleCreateReservation = (e) => {
    e.preventDefault();
    if (!newRes.guestName || !newRes.checkIn || !newRes.checkOut) return;
    const booking = {
      id: Date.now(),
      ...newRes,
      status: 'Confirmed'
    };
    setReservations([booking, ...reservations]);
    if (!guests.some(g => g.name === newRes.guestName)) {
      setGuests([...guests, { id: Date.now(), name: newRes.guestName, email: `${newRes.guestName.toLowerCase().replace(/\s+/g, '')}@example.com`, phone: '+34 600 000 000' }]);
    }
    setNewRes({ guestName: '', room: '101', checkIn: '', checkOut: '', price: 120 });
    setIsNewBookingOpen(false);
  };

  if (!user) {
    return (
      <Login 
        loginForm={loginForm} 
        setLoginForm={setLoginForm} 
        handleLogin={handleLogin} 
        handleQuickLogin={handleQuickLogin} 
        loginError={loginError} 
      />
    );
  }

  return (
    <div className="h-screen flex overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Sidebar 
        menuConfig={menuConfig} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        user={user} 
        handleLogout={handleLogout} 
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar 
          t={t} 
          lang={lang} 
          setLang={setLang} 
          currency={currency} 
          setCurrency={setCurrency} 
          darkMode={darkMode} 
          setDarkMode={setDarkMode} 
          setIsNewBookingOpen={setIsNewBookingOpen} 
          menuConfig={menuConfig} 
          activeTab={activeTab} 
        />

        <main className="flex-1 overflow-y-auto p-6">
          {activeTab === 'dashboard' && (
            <Dashboard 
              t={t} 
              reservations={reservations} 
              rooms={rooms} 
              guests={guests} 
              formatCurrency={formatCurrency} 
              setIsNewBookingOpen={setIsNewBookingOpen} 
            />
          )}

          {activeTab === 'reservations' && (
            <Reservations 
              t={t} 
              reservations={reservations} 
              formatCurrency={formatCurrency} 
              setIsNewBookingOpen={setIsNewBookingOpen} 
            />
          )}

          {activeTab === 'rooms' && (
            <Rooms 
              rooms={rooms} 
              setRooms={setRooms} 
              formatCurrency={formatCurrency} 
            />
          )}

          {activeTab === 'guests' && (
            <Guests guests={guests} />
          )}

          {activeTab === 'billing' && (
            <Billing 
              reservations={reservations} 
              formatCurrency={formatCurrency} 
            />
          )}

          {activeTab === 'settings' && (
            <Settings 
              menuConfig={menuConfig} 
              setMenuConfig={setMenuConfig} 
              user={user} 
              usersList={usersList} 
              setUsersList={setUsersList} 
            />
          )}
        </main>
      </div>

      <NewBookingModal 
        t={t} 
        isNewBookingOpen={isNewBookingOpen} 
        setIsNewBookingOpen={setIsNewBookingOpen} 
        newRes={newRes} 
        setNewRes={setNewRes} 
        rooms={rooms} 
        handleCreateReservation={handleCreateReservation} 
      />
    </div>
  );
}
