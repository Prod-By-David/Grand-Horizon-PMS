import React from 'react';

export function NewBookingModal({ t, isNewBookingOpen, setIsNewBookingOpen, newRes, setNewRes, rooms, handleCreateReservation }) {
  if (!isNewBookingOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-md w-full p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">{t.newReservation}</h3>
          <button onClick={() => setIsNewBookingOpen(false)} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">✕</button>
        </div>
        <form onSubmit={handleCreateReservation} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">{t.guestName}</label>
            <input 
              type="text" 
              value={newRes.guestName} 
              onChange={e => setNewRes({...newRes, guestName: e.target.value})} 
              placeholder="Nombre completo del huésped"
              className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:ring-2 focus:ring-brand-500"
              required 
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">{t.room}</label>
            <select 
              value={newRes.room} 
              onChange={e => {
                const roomObj = rooms.find(r => r.number === e.target.value);
                setNewRes({...newRes, room: e.target.value, price: roomObj ? roomObj.price : 120});
              }}
              className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:ring-2 focus:ring-brand-500"
            >
              {rooms.map(r => (
                <option key={r.number} value={r.number}>Habitación #{r.number} ({r.type})</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">{t.checkIn}</label>
              <input 
                type="date" 
                value={newRes.checkIn} 
                onChange={e => setNewRes({...newRes, checkIn: e.target.value})} 
                className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:ring-2 focus:ring-brand-500"
                required 
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">{t.checkOut}</label>
              <input 
                type="date" 
                value={newRes.checkOut} 
                onChange={e => setNewRes({...newRes, checkOut: e.target.value})} 
                className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:ring-2 focus:ring-brand-500"
                required 
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Precio Total</label>
            <input 
              type="number" 
              value={newRes.price} 
              onChange={e => setNewRes({...newRes, price: Number(e.target.value)})} 
              className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:ring-2 focus:ring-brand-500"
              required 
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={() => setIsNewBookingOpen(false)} className="px-4 py-2 rounded-xl font-semibold text-sm bg-slate-200 dark:bg-slate-800">{t.cancel}</button>
            <button type="submit" className="px-4 py-2 rounded-xl font-semibold text-sm bg-brand-600 hover:bg-brand-700 text-white shadow-lg shadow-brand-600/20">{t.save}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
