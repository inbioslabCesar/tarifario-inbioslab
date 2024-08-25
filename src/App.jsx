import ProductsList from "./components/ProductsList";
import UsersList from "./components/UsersList";
import {data} from './db/data.js'

const USERS = [
  {
    id: 1,
    name: "Pablo Castellanos",
    active: true,
    role: "teacher",
  },
  {
    id: 2,
    name: "Javier López",
    active: true,
    role: "teacher",
  },
  {
    id: 3,
    name: "Jose Miguel Fernández",
    active: false,
    role: "student",
  },
];

// const PRODUCT = [
//   {
//     id: 1,
//     name: 'Glucosa',
//     price1: 6,
//     price2: 15,
//     time: '1 Hora',
//     info: 'Ayuno de 8 horas'

//   },
//   {
//     id: 2,
//     name: 'Urea',
//     price1: 7,
//     price2: 15,
//     time: '1 Hora',
//     info: 'No requiere ayuno pero si dieta en carne roja'

//   },
//   {
//     id: 3,
//     name: 'Anticuerpos antinucleares(ANA)',
//     price1: 70,
//     price2: 15,
//     time: '1 día',
//     info: 'No requiere ayuno pero si dieta en carne roja'

//   },
// ]

function App() {
  
  return <ProductsList products={data } />
}

export default App;
