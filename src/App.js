import { useEffect, useState } from "react";
import axios from 'axios';

import Card from "./components/Card/Card";
import Drawer from "./components/Drawer";
import Header from "./components/Header";


function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false);

  useEffect(() => {
    // fetch("https://6350fd33dfe45bbd55b37a6e.mockapi.io/items")
    //   .then(res => {
    //     return res.json();
    // }).then(json => {
    //     setItems(json);
    // });

    axios.get("https://6350fd33dfe45bbd55b37a6e.mockapi.io/items")
      .then(res => {
        setItems(res.data)
      }
    );
    axios.get("https://6350fd33dfe45bbd55b37a6e.mockapi.io/cart")
      .then(res => {
        setCartItems(res.data)
      }
    );
  }, []);

  const onAddToCart = (obj) => {
    axios.post("https://6350fd33dfe45bbd55b37a6e.mockapi.io/cart", obj);
    setCartItems(prev => [...prev, obj])
  };

  const onAddFavorite = (obj) => {
    axios.post("https://6350fd33dfe45bbd55b37a6e.mockapi.io/favorites", obj);
    setFavorites(prev => [...prev, obj])
  };

  const onRemoveItemToCart = (id) => {
    axios.delete(`https://6350fd33dfe45bbd55b37a6e.mockapi.io/cart/${id}`);
    setCartItems(prev => prev.filter(item => item.id !== id))
  };

  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="wrapper clear">

      {cartOpened ? <Drawer onRemoveItemToCart={onRemoveItemToCart} items={cartItems} onCloseCart={() => setCartOpened(false)}/> : null}
      <Header onClickCart={() => setCartOpened(true)} />

      <div className="contetnt p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1 className="mb-40">{searchValue ? `Поиск по запросу: ${searchValue}` : 'Все кроссовки'}</h1>
          <div className="search-block">
            <img src="/img/search.svg" alt="Search" />
            <input onChange={onChangeSearchInput} placeholder="Поиск..." />
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {items.filter((item) => item.title.toLowerCase().includes(searchValue)).map((item, index) => (
            <Card
              key={index}
              title={item.title}
              price={item.price}
              imageUrl={item.imageUrl}
              onAddFavorite={(obj) => onAddFavorite(obj)}
              onPluse={(obj) => onAddToCart(obj)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App;
