import { useEffect, useState } from "react";
import axios from 'axios';
import { Switch, Route } from 'react-router-dom';

import Drawer from "./components/Drawer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";


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
    axios.get("https://6350fd33dfe45bbd55b37a6e.mockapi.io/favorites")
      .then(res => {
        setFavorites(res.data)
      }
    );
  }, []);

  const onAddToCart = (obj) => {
    axios.post("https://6350fd33dfe45bbd55b37a6e.mockapi.io/cart", obj);
    setCartItems(prev => [...prev, obj])
  };

  const onAddFavorite = async (obj) => {
    try {
      if(favorites.find(favObj => favObj.id == obj.id)) {
        axios.delete(`https://6350fd33dfe45bbd55b37a6e.mockapi.io/favorites/${obj.id}`);
        // setFavorites(prev => prev.filter(item => item.id !== obj.id)); // из апи удаляю, но на старнице сотается, если наоборот, то при удалении из апи, удалится со страницы
      } else {
        const {data} = await axios.post("https://6350fd33dfe45bbd55b37a6e.mockapi.io/favorites", obj);
        setFavorites(prev => [...prev, data]);
      }
    } catch (e) {
      alert('Не удалось добавить в избранное')
    }
    
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

      <Route path="/" exact>
        <Home 
          items={items} 
          searchValue={searchValue} 
          setSearchValue={setSearchValue} 
          onChangeSearchInput={onChangeSearchInput}
          onAddFavorite={onAddFavorite}
          onAddToCart={onAddToCart}
        />
      </Route>
      <Route to="/favorites">
        <Favorites favorites={favorites} onAddFavorite={onAddFavorite}/>
      </Route>

    </div>
  )
}

export default App;
