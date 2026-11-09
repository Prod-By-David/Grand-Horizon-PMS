import React from 'react';

export function Billing({ reservations, formatCurrency }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
      <h3 className="font-bold text-lg mb-4">Facturación y Pagos</h3>
      <p className="text-sm text-slate-500">Módulo de emisión de facturas fiscales y pasarelas de pago sincronizado con reservas activas.</p>
      {reservations.length === 0 ? (
        <p className="text-sm text-slate-400 mt-6 text-center py-8">No hay facturas pendientes o emitidas.</p>
      ) : (
        <div className="mt-6 space-y-3">
          {reservations.map(res => (
            <div key={res.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
              <div>
                <p className="font-semibold text-sm">Factura #{res.id} - {res.guestName}</p>
                <p className="text-xs text-slate-500">Habitación #{res.room}</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="font-bold">{formatCurrency(res.price)}</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300 rounded-full text-xs font-semibold">Pagado</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
