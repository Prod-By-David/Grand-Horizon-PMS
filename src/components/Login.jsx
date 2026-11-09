import React from 'react';

export function Login({ loginForm, setLoginForm, handleLogin, handleQuickLogin, loginError }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-950 px-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-800">
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-brand-50 dark:bg-brand-950/50 rounded-2xl text-brand-600 mb-4 font-bold text-xl">
            🏨
          </div>
          <h1 className="text-2xl font-bold">Grand Horizon</h1>
          <p className="text-sm text-slate-500 mt-1">Sistema de Gestión Hotelera</p>
        </div>

        {loginError && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/30 text-red-600 text-sm rounded-lg border border-red-200 dark:border-red-900">
            {loginError}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Usuario</label>
            <input
              type="text"
              value={loginForm.username}
              onChange={e => setLoginForm({...loginForm, username: e.target.value})}
              placeholder="ej. admin, morning, afternoon, night"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-brand-500 outline-none transition"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Contraseña</label>
            <input
              type="password"
              value={loginForm.password}
              onChange={e => setLoginForm({...loginForm, password: e.target.value})}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-brand-500 outline-none transition"
              required
            />
          </div>
          <button type="submit" className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl shadow-lg transition">
            Iniciar Sesión
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
          <p className="text-xs text-center text-slate-500 mb-3">Accesos rápidos por turno:</p>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => handleQuickLogin('admin')} className="p-2 text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-lg transition">👑 Admin</button>
            <button onClick={() => handleQuickLogin('morning')} className="p-2 text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-lg transition">🌅 Mañana</button>
            <button onClick={() => handleQuickLogin('afternoon')} className="p-2 text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-lg transition">☀️ Tarde</button>
            <button onClick={() => handleQuickLogin('night')} className="p-2 text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-lg transition">🌙 Noche</button>
          </div>
        </div>
      </div>
    </div>
  );
}
