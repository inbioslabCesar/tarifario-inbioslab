import style from "./ProductModal.module.css";
import { FaTimes, FaVial, FaFlask, FaInfoCircle } from "react-icons/fa";

const ProductModal = ({
  name,
  info,
  tube,
  method,
  showModal,
  setShowModal,
}) => {
  return (
    <>
      <div className={style.container}>
        {showModal && (
          <div className={style.modalBackground}>
            <div className={style.modalContainer + " shadow-lg"}>
              <div className={style.modalContent + " flex flex-col gap-4"}>
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 text-white bg-blue-600 hover:bg-blue-800 rounded-full p-2 shadow-lg"
                  aria-label="Cerrar"
                >
                  <FaTimes size={20} />
                </button>
                <h1 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                  <FaVial className="w-6 h-6" /> {String(name).toUpperCase()}
                </h1>
                <p className="text-white text-base font-semibold flex items-center gap-2">
                  <FaInfoCircle className="w-5 h-5" /> PRE-ANALITICA: <span className="font-normal">{info}</span>
                </p>
                <p className="text-white text-base font-semibold flex items-center gap-2">
                  <FaFlask className="w-5 h-5" /> TIPO DE TUBO: <span className="font-normal">{tube}</span>
                </p>
                <p className="text-white text-base font-semibold flex items-center gap-2">
                  <FaFlask className="w-5 h-5" /> METODOLOGIA: <span className="font-normal">{method}</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductModal;
