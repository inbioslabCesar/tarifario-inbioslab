import style from "./ProductModal.module.css";

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
        <button
          className={style.abrir}
          onClick={() => setShowModal(!showModal)}>
          Info
        </button>
        {showModal && (
          <div className={style.modalBackground}>
            <div className={style.modalContainer}>
              <div className={style.modalContent}>
                <span
                  onClick={() => setShowModal(false)}
                  className={style.cerrar}>
                  X
                </span>
                <h1 className={style.name}>{name}</h1>
                <p className={style.info}>PRE-ANALITICA: {info}</p>
                <p className={style.tube}>TIPO DE TUBO: {tube}</p>
                <p className={style.method}>METODOLOGIA: {method}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductModal;
