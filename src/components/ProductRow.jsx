import { useState } from "react";
import ProductModal from "./ProductModal";
import style from "./ProductRow.module.css";

const ProductRow = ({ name, price2, time, info, tube, method }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className={style.product}>
      <div>
      </div>
      <div className={style.name}>
        <span>{name}</span>
      </div>
      <div className={style.price}>
        <span>S/ {price2}.00</span>
      </div>
      <div className={style.time}>
        <span>{time}</span>
      </div>
      <div className={style.info}>
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
