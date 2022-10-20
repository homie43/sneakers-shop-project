import { useState } from "react";

import Card from "./components/Card/Card";
import Drawer from "./components/Drawer";
import Header from "./components/Header";

const Array = [
  {title: "Мужские Кроссовки Nike Blazer Mid Suede", price: 12900, imageUrl: '/img/sneakers/1.jpg'},
  {title: "Мужские Кроссовки Nike Air Max 270", price: 12900, imageUrl: '/img/sneakers/2.jpg'},
  {title: "Мужские Кроссовки Nike Blazer Mid Suede", price: 8400, imageUrl: '/img/sneakers/3.jpg'},
  {title: "Кроссовки Puma X Aka Boku Future Rider", price: 8900, imageUrl: '/img/sneakers/4.jpg'}
];

function App() {
  const [cartOpened, setCartOpened] = useState(false);

  return (
    <div className="wrapper clear">
      {cartOpened ? <Drawer onCloseCart={() => setCartOpened(false)}/> : null}
      <Header onClickCart={() => setCartOpened(true)} />
      <div className="contetnt p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1 className="mb-40">Все кроссовки</h1>
          <div className="search-block">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Поиск..." />
          </div>
        </div>

        <div className="d-flex">

          {Array.map(obj => (
            <Card
            title={obj.title}
            price={obj.price}
            imageUrl={obj.imageUrl}
          />
          ))}

        </div>

      </div>
    
    </div>
  )
}

export default App;
