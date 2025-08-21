import { useState } from "react";
import { FaRegSquare, FaCheckSquare, FaInfoCircle } from "react-icons/fa";
import ProductModal from "./ProductModal";
import style from "./ProductRow.module.css";

const ProductRow = ({ name, price1, price2, time, info, tube, method, selected, onSelect }) => {
  const [showModal, setShowModal] = useState(false);
  const [active, setActive] = useState(false);
  return (
    <div className={style.product + " flex flex-wrap items-center gap-2"}>
      <div className="flex items-center flex-1 min-w-0">
        <button
          onClick={onSelect}
          className="mr-2 focus:outline-none"
          aria-label={selected ? "Quitar del carrito" : "Agregar al carrito"}
        >
          {selected ? (
            <FaCheckSquare className="text-blue-500 w-6 h-6" />
          ) : (
            <FaRegSquare className="text-gray-400 w-6 h-6" />
          )}
        </button>
  <span className="font-semibold truncate">{String(name).toUpperCase()}</span>
      </div>
      {active && (
        <div className={style.publico + " uppercase font-bold text-blue-700"}>
          <span>{String(price1).toUpperCase()}</span>
        </div>
      )}
      <div className={style.price + " uppercase font-bold text-green-700"}>
        <span onClick={() => setActive(!active)} style={{ cursor: 'pointer' }}>S/ {String(price2).toUpperCase()}.00</span>
      </div>
      <div className={style.time + " uppercase font-bold text-gray-700"}>
        <span>{String(time).toUpperCase()}</span>
      </div>
      <div className={style.info + " ml-auto flex items-center"}>
        <button
          className="flex items-center gap-1 px-2 py-1 bg-blue-100 hover:bg-blue-200 rounded text-blue-700 font-semibold"
          onClick={() => setShowModal(true)}
          aria-label="Ver información"
        >
          <FaInfoCircle className="w-5 h-5" />
          Info
        </button>
        <ProductModal
          name={name}
          info={info}
          tube={tube}
          method={method}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      </div>
    </div>
  );
};

export default ProductRow;
