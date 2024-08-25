import React, { useState } from "react";
import ProductRow from "./ProductRow";
import style from "./ProductsList.module.css";
import logo from "../assets/logo.png";

const ProductsList = ({ products }) => {
  console.log(products);
  const [search, setSearch] = useState("");
  const productsFiltered = search
    ? products.filter((item) =>
        item.name.toLowerCase().startsWith(search.toLowerCase())
      )
    : products;

  const productsRender =
    productsFiltered.length > 0 ? (
      productsFiltered.map((product) => (
        <ProductRow key={product.id} {...product} />
      ))
    ) : (
      <p>No hay Examenes</p>
    );

  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <div>
          <h1>Tarifario convenio</h1>
          <input
            className={style.search}
            type="text"
            placeholder="Buscar prueba..."
            name="search"
            value={search}
            onChange={(ev) => setSearch(ev.target.value)}
          />
        </div>

        <img src={logo} alt="logo-inbioslab" className={style.logo} />
      </div>
      <div className={style.products}>{productsRender}</div>
    </div>
  );
};

export default ProductsList;
