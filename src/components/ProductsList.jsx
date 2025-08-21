import { useState } from "react";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import PromotionsCarousel from "./PromotionsCarousel";
import CartModal from "./CartModal";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import PropTypes from "prop-types";
import ProductRow from "./ProductRow";
// import style from "./ProductsList.module.css";
import logo from "../assets/logo.png";



const ProductsList = ({ products }) => {
  const [showCart, setShowCart] = useState(false);
  // Función para exportar PDF
  const handleExportPDF = async () => {
    // Oculta los botones antes de exportar
    const pdfButtons = document.querySelectorAll("#cart-modal-pdf .pdf-hide");
    pdfButtons.forEach(btn => btn.style.display = "none");
    const modalContent = document.querySelector("#cart-modal-pdf .bg-white");
    if (!modalContent) return;
    const canvas = await html2canvas(modalContent);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save("cotizacion-inbioslab.pdf");
    // Muestra los botones nuevamente
    pdfButtons.forEach(btn => btn.style.display = "");
  };

  // Vaciar carrito
  const handleClearCart = () => setCart([]);

  // Cambiar cantidad
  const handleChangeQty = (id, qty) => {
    setCart((prev) => prev.map((item) => item.id === id ? { ...item, qty } : item));
  };
  // Mover renderProducts dentro del componente para acceder a cart y setCart
  const renderProducts = (products) => {
    if (products.length === 0) return <p className="text-center text-gray-500">No hay Examenes</p>;
    return products.map((product) => {
      const cartItem = cart.find((item) => item.id === product.id);
      return (
        <ProductRow
          key={product.id}
          {...product}
          selected={!!cartItem}
          onSelect={() => {
            setCart((prev) => {
              const exists = prev.some((item) => item.id === product.id);
              if (exists) {
                return prev.filter((item) => item.id !== product.id);
              } else {
                return [...prev, { ...product, qty: 1 }];
              }
            });
          }}
        />
      );
    });
  };
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [cart, setCart] = useState([]); // Estado del carrito
  const itemsPerPage = 10;

  const productsFiltered = filterProductsByName(products, search);
  const totalPages = Math.ceil(productsFiltered.length / itemsPerPage);
  const paginatedProducts = productsFiltered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      <nav className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-700 via-cyan-500 to-blue-400 rounded-lg mb-8 shadow-lg">
        <div className="flex items-center gap-4">
          <img src={logo} alt="logo-inbioslab" className="w-16 h-16 md:w-20 md:h-20 object-contain transition-all duration-300 bg-white rounded-full p-2 shadow" />
          <h1 className="text-2xl md:text-3xl font-extrabold text-white drop-shadow-lg tracking-wide">TARIFARIO CONVENIO</h1>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative cursor-pointer" onClick={() => setShowCart(true)}>
            <FaShoppingCart className="w-8 h-8 md:w-10 md:h-10 text-white" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs font-bold">{cart.length}</span>
            )}
          </div>
        </div>
      </nav>
  <PromotionsCarousel />
  <div className="mb-6">
        <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
          <input
            className="border-2 border-blue-400 rounded-full px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md text-base pr-10"
            type="text"
            placeholder="Buscar prueba..."
            name="search"
            value={search}
            onChange={(ev) => {
              setSearch(ev.target.value);
              setCurrentPage(1);
            }}
          />
          <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5 pointer-events-none" />
        </div>
      </div>
      <div className="space-y-2">
        {renderProducts(paginatedProducts)}
      </div>
      {/* Modal resumen carrito */}
      <div id="cart-modal-pdf">
        <CartModal
          open={showCart}
          onClose={() => setShowCart(false)}
          cart={cart}
          logo={logo}
          onExportPDF={handleExportPDF}
          onClearCart={handleClearCart}
          onChangeQty={handleChangeQty}
        />
      </div>
      {totalPages > 1 && (
        <nav className="flex justify-center items-center mt-6 gap-2 max-w-full" aria-label="Paginación">
          <button
            className="px-3 py-1 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition disabled:bg-gray-300 disabled:text-gray-500 flex items-center"
            onClick={handlePrev}
            disabled={currentPage === 1}
            aria-label="Página anterior"
          >
            <span className="mr-1">←</span> Anterior
          </button>
          {/* Números ocultos */}
          <button
            className="px-3 py-1 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition disabled:bg-gray-300 disabled:text-gray-500 flex items-center"
            onClick={handleNext}
            disabled={currentPage === totalPages}
            aria-label="Página siguiente"
          >
            Siguiente <span className="ml-1">→</span>
          </button>
        </nav>
      )}
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


export default ProductsList;
