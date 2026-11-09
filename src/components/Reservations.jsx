import React from 'react';

export function Reservations({ t, reservations, formatCurrency, setIsNewBookingOpen }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
      <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
        <h3 className="font-bold text-lg">Listado de Reservas</h3>
        <button onClick={() => setIsNewBookingOpen(true)} className="px-4 py-2 bg-brand-600 text-white rounded-xl text-sm font-semibold hover:bg-brand-700 transition">
          {t.newReservation}
        </button>
      </div>
      {reservations.length === 0 ? (
        <div className="p-12 text-center text-slate-500">No hay reservas registradas en el sistema.</div>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-xs uppercase text-slate-500 bg-slate-50 dark:bg-slate-800/50">
              <th className="p-4">{t.guestName}</th>
              <th className="p-4">{t.room}</th>
              <th className="p-4">{t.checkIn}</th>
              <th className="p-4">{t.checkOut}</th>
              <th className="p-4">Total</th>
              <th className="p-4">{t.status}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm">
            {reservations.map(res => (
              <tr key={res.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition">
                <td className="p-4 font-semibold">{res.guestName}</td>
                <td className="p-4">#{res.room}</td>
                <td className="p-4 text-slate-500">{res.checkIn}</td>
                <td className="p-4 text-slate-500">{res.checkOut}</td>
                <td className="p-4 font-bold">{formatCurrency(res.price)}</td>
                <td className="p-4"><span className="px-2.5 py-1 bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300 rounded-full text-xs font-semibold">{res.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
