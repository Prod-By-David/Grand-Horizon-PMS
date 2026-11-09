import React from 'react';

export function Dashboard({ t, reservations, rooms, guests, formatCurrency, setIsNewBookingOpen }) {
  const totalRevenue = reservations.reduce((acc, r) => acc + Number(r.price), 0);
  const occupancyRate = rooms.length ? Math.round((rooms.filter(r => r.status !== 'Clean').length / rooms.length) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase">{t.totalRevenue}</p>
          <h3 className="text-2xl font-bold mt-2">{formatCurrency(totalRevenue)}</h3>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase">{t.occupancyRate}</p>
          <h3 className="text-2xl font-bold mt-2">{occupancyRate}%</h3>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase">{t.activeGuests}</p>
          <h3 className="text-2xl font-bold mt-2">{guests.length}</h3>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase">{t.pendingCheckins}</p>
          <h3 className="text-2xl font-bold mt-2">{reservations.filter(r => r.status === 'Confirmed').length}</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-base font-bold mb-4">{t.roomGrid}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {rooms.map(room => (
              <div key={room.number} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex flex-col justify-between">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">#{room.number}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                    room.status === 'Clean' ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                  }`}>{room.status}</span>
                </div>
                <span className="text-xs text-slate-500 mt-2">{room.type} • {formatCurrency(room.price)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-base font-bold mb-4">{t.recentBookings}</h3>
          {reservations.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-sm text-slate-500 mb-4">No hay reservas registradas.</p>
              <button onClick={() => setIsNewBookingOpen(true)} className="px-4 py-2 bg-brand-600 text-white rounded-xl text-xs font-semibold">
                Crear Primera Reserva
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {reservations.slice(0, 5).map(res => (
                <div key={res.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                  <div>
                    <p className="font-semibold text-sm">{res.guestName}</p>
                    <p className="text-xs text-slate-500">Hab. #{res.room} • {res.checkIn} al {res.checkOut}</p>
                  </div>
                  <span className="font-bold text-sm">{formatCurrency(res.price)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
