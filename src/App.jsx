import ProductsList from "./components/ProductsList";
import { dataSorted } from "./db/data.js";

function App() {
  return <ProductsList products={dataSorted} />;
}

export default App;