import React, { useState } from "react";
import ProductRow from "./ProductRow";
import style from "./ProductsList.module.css";
import logo from "../assets/logo.png";

const ProductsList = ({ products }) => {
  const [search, setSearch] = useState("");

  const productsFiltered = filterProductsByName(products, search);
  const productsRender = renderProducts(productsFiltered);

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

const filterProductsByName = (products, search) => {
  if (!search) return products;

  const lowerCaseSearch = search.toLowerCase();

  return products.filter((item) =>
    item.name.toLowerCase().includes(lowerCaseSearch)
  );
};

const renderProducts = (products) => {
  if (products.length < 0) return <p>No hay Examenes</p>;

  return products.map((product) => (
    <ProductRow key={product.id} {...product} />
  ));
};

export default ProductsList;
