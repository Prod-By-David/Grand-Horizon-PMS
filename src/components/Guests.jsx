import React from 'react';

export function Guests({ guests }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
      <div className="p-6 border-b border-slate-200 dark:border-slate-800">
        <h3 className="font-bold text-lg">Directorio de Clientes (CRM)</h3>
      </div>
      {guests.length === 0 ? (
        <div className="p-12 text-center text-slate-500">No hay clientes registrados todavía.</div>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-xs uppercase text-slate-500 bg-slate-50 dark:bg-slate-800/50">
              <th className="p-4">Nombre</th>
              <th className="p-4">Email</th>
              <th className="p-4">Teléfono</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm">
            {guests.map(g => (
              <tr key={g.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition">
                <td className="p-4 font-semibold">{g.name}</td>
                <td className="p-4 text-slate-500">{g.email}</td>
                <td className="p-4 text-slate-500">{g.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
