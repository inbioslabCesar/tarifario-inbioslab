
import { useEffect, useState } from "react";

const PromotionsCarousel = ({ onCotizarPromo }) => {
  const [promotions, setPromotions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedPromo, setSelectedPromo] = useState(null);

  useEffect(() => {
    fetch("/tarifario-inbioslab/promotions.json")
      .then((res) => res.json())
      .then((data) => setPromotions(data));
  }, []);

  useEffect(() => {
    if (promotions.length > 1) {
      const interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % promotions.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [promotions]);

  if (promotions.length === 0) return null;

  const promo = promotions[current];

  return (
    <div className="w-full flex justify-center mb-4">
      <div className="bg-white rounded-xl shadow-lg flex items-center gap-4 p-3 max-w-xs sm:max-w-sm md:max-w-md animate-fade-in">
        <img src={promo.image} alt={promo.title} className="w-16 h-16 object-cover rounded-lg border" />
        <div>
          <h3 className="font-bold text-blue-700 text-sm uppercase">{promo.title}</h3>
          <p className="text-xs text-gray-700 mb-1 line-clamp-2">{promo.description}</p>
          <span className="font-bold text-green-600 text-base">S/ {promo.price.toFixed(2)}</span>
          <button className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs font-semibold" onClick={() => { setSelectedPromo(promo); setShowModal(true); }}>Ver detalle</button>
        </div>
      </div>
      {showModal && selectedPromo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-blue-100 via-white to-cyan-100 rounded-2xl shadow-2xl p-8 w-full max-w-md relative flex flex-col items-center border-2 border-blue-300">
            <button className="absolute top-3 right-3 text-gray-500 hover:text-red-500 bg-white rounded-full p-2 shadow" onClick={() => { setShowModal(false); setSelectedPromo(null); }} aria-label="Cerrar">✕</button>
            <img src={selectedPromo.image} alt={selectedPromo.title} className="w-28 h-28 object-cover rounded-xl border-2 border-blue-300 mb-3 shadow" />
            <h2 className="text-2xl font-extrabold text-blue-700 mb-2 uppercase text-center drop-shadow">{selectedPromo.title}</h2>
            <span className="font-bold text-green-600 text-lg mb-2">S/ {selectedPromo.price.toFixed(2)}</span>
            <p className="text-gray-800 mb-4 text-center whitespace-pre-line text-base leading-relaxed bg-blue-50 rounded-lg p-3 shadow-inner">{selectedPromo.longDescription || selectedPromo.description}</p>
            <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold shadow" onClick={() => { onCotizarPromo && onCotizarPromo(selectedPromo); setShowModal(false); setSelectedPromo(null); }}>Cotizar esta promoción</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromotionsCarousel;
