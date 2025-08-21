import { useEffect, useState } from "react";

const PromotionsCarousel = () => {
  const [promotions, setPromotions] = useState([]);
  const [current, setCurrent] = useState(0);

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
          <p className="text-xs text-gray-700 mb-1">{promo.description}</p>
          <span className="font-bold text-green-600 text-base">S/ {promo.price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default PromotionsCarousel;
