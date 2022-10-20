import { useEffect, useState } from "react";

import Card from "./components/Card/Card";
import Drawer from "./components/Drawer";
import Header from "./components/Header";


function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);

  useEffect(() => {
    fetch("https://6350fd33dfe45bbd55b37a6e.mockapi.io/items")
      .then(res => {
        return res.json();
    }).then(json => {
        setItems(json);
    });
  }, []);

  const onAddToCart = (obj) => {
    setCartItems(prev => [...prev, obj])
  };

  return (
    <div className="wrapper clear">
      {cartOpened ? <Drawer items={cartItems} onCloseCart={() => setCartOpened(false)}/> : null}
      <Header onClickCart={() => setCartOpened(true)} />
      <div className="contetnt p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1 className="mb-40">Все кроссовки</h1>
          <div className="search-block">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Поиск..." />
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {items.map(item => (
            <Card
              title={item.title}
              price={item.price}
              imageUrl={item.imageUrl}
              onFavorite={() => console.log('Добавили в закладки')}
              onPluse={(obj) => onAddToCart(obj)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App;
