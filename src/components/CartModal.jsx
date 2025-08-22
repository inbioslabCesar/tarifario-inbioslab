import React from "react";
import { FaTimes, FaStar } from "react-icons/fa";

const LAB_INFO = {
  name: "Laboratorio Clínico Inbioslab",
  address: "Jr. Calleria 135 (Referencia: por la pollería La Shapajita)",
  phone: "945241682 / 945241093"
};

const CartModal = ({ open, onClose, cart, logo, onExportPDF, onClearCart, onChangeQty, cotizacionInfo, setCotizacionInfo }) => {
  if (!open) return null;
  const total = cart.reduce((sum, item) => sum + ((item.price2 || 0) * (item.qty || 1)), 0);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative flex flex-col" style={{maxHeight: '90vh'}}>
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
          onClick={onClose}
          aria-label="Cerrar"
        >
          <FaTimes size={24} />
        </button>
        <div className="flex flex-col items-center mb-4">
          <img src={logo} alt="logo-inbioslab" className="w-20 h-20 object-contain mb-2" />
          <h2 className="text-xl font-bold text-blue-700 mb-1">{LAB_INFO.name}</h2>
          <p className="text-sm text-gray-700 mb-1">{LAB_INFO.address}</p>
          <p className="text-sm text-gray-700 mb-2">Celular: {LAB_INFO.phone}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
          <input type="text" className="border rounded px-2 py-1" placeholder="Nombre del paciente" value={cotizacionInfo.paciente} onChange={e => setCotizacionInfo(info => ({...info, paciente: e.target.value}))} />
          <input type="text" className="border rounded px-2 py-1" placeholder="Edad" value={cotizacionInfo.edad} onChange={e => setCotizacionInfo(info => ({...info, edad: e.target.value}))} />
          <input type="text" className="border rounded px-2 py-1" placeholder="Sexo" value={cotizacionInfo.sexo} onChange={e => setCotizacionInfo(info => ({...info, sexo: e.target.value}))} />
          <input type="text" className="border rounded px-2 py-1" placeholder="Código o DNI" value={cotizacionInfo.codigo} onChange={e => setCotizacionInfo(info => ({...info, codigo: e.target.value}))} />
          <input type="text" className="border rounded px-2 py-1 md:col-span-2" placeholder="Empresa que cotiza" value={cotizacionInfo.empresa} onChange={e => setCotizacionInfo(info => ({...info, empresa: e.target.value}))} />
        </div>
        <h3 className="text-lg font-semibold mb-4 text-blue-700">Cotización</h3>
        <div className="grid gap-3 mb-4 overflow-y-auto" style={{maxHeight: '40vh'}}>
          {cart.map((item, idx) => (
            <div
              key={item.id || idx}
              className={
                `flex flex-col md:flex-row md:items-center justify-between rounded-lg shadow p-3 border ${item.type === "promo" ? "bg-yellow-50 border-yellow-300" : "bg-blue-50 border-blue-200"}`
              }
            >
              <div className="flex-1 flex flex-col md:flex-row md:items-center gap-2">
                <span className="font-semibold text-gray-800 md:w-56 flex items-center gap-2">
                  {item.type === "promo" && (
                    <FaStar className="text-yellow-500" style={{fontSize: '0.9em'}} />
                  )}
                  {String(item.name).toUpperCase()}
                </span>
                <div className="flex items-center gap-2">
                  <button className="px-2 py-1 bg-white border border-gray-300 rounded hover:bg-blue-100" onClick={() => onChangeQty(item.id, Math.max((item.qty || 1) - 1, 1))}>-</button>
                  <span className="font-bold text-blue-700">{item.qty || 1}</span>
                  <button className="px-2 py-1 bg-white border border-gray-300 rounded hover:bg-blue-100" onClick={() => onChangeQty(item.id, (item.qty || 1) + 1)}>+</button>
                </div>
              </div>
              <span className="font-bold text-green-700 text-lg mt-2 md:mt-0">S/ {((item.price2 || 0) * (item.qty || 1)).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center font-bold text-lg mb-4">
          <span>Total</span>
          <span>S/ {total.toFixed(2)}</span>
        </div>
        <div className="flex gap-2 mt-auto sticky bottom-0 bg-white pt-4">
          <button
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold"
            onClick={onExportPDF}
            id="btn-export-pdf"
          >
            Exportar PDF
          </button>
          <button
            className="w-full py-2 bg-red-500 text-white rounded hover:bg-red-600 font-semibold"
            onClick={onClearCart}
          >
            Vaciar carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
