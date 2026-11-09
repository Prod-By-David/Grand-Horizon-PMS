import React from 'react';

export function Rooms({ rooms, setRooms, formatCurrency }) {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <h3 className="font-bold text-lg mb-6">Gestión de Habitaciones</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {rooms.map(room => (
          <div key={room.number} className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex flex-col justify-between">
            <div className="flex justify-between items-center mb-3">
              <span className="font-bold text-xl">Habitación #{room.number}</span>
              <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                room.status === 'Clean' ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
              }`}>{room.status}</span>
            </div>
            <p className="text-sm text-slate-500 mb-4">Tipo: {room.type} • {formatCurrency(room.price)} / noche</p>
            <button 
              onClick={() => {
                setRooms(rooms.map(r => r.number === room.number ? {...r, status: r.status === 'Clean' ? 'Dirty' : 'Clean'} : r));
              }}
              className="w-full py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-xl text-xs font-semibold transition"
            >
              Cambiar Estado Operativo
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
