import { useEffect, useState } from "react";
import axios from 'axios';
import { Switch, Route } from 'react-router-dom';

import Drawer from "./components/Drawer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AppContext from "./context";


function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // fetch("https://6350fd33dfe45bbd55b37a6e.mockapi.io/items")
    //   .then(res => {
    //     return res.json();
    // }).then(json => {
    //     setItems(json);
    // });

    async function fetchData() {
      // setIsLoading(false); // если переиспользуется
      const cartResponse = await axios.get("https://6350fd33dfe45bbd55b37a6e.mockapi.io/cart");
      const favoritesResponse = await axios.get("https://6350fd33dfe45bbd55b37a6e.mockapi.io/favorites");
      const itemsResponse = await axios.get("https://6350fd33dfe45bbd55b37a6e.mockapi.io/items");

      setIsLoading(false);

      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);
    }
    fetchData();
  }, []);

  const onAddToCart = (obj) => {
    if(cartItems.find((item) => Number(item.id) === Number(obj.id))) {
      axios.delete(`https://6350fd33dfe45bbd55b37a6e.mockapi.io/cart/${obj.id}`);
      setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
    } else {
      axios.post("https://6350fd33dfe45bbd55b37a6e.mockapi.io/cart", obj);
      setCartItems(prev => [...prev, obj]);
    }
  };

  const onAddFavorite = async (obj) => {
    try {
      if(favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://6350fd33dfe45bbd55b37a6e.mockapi.io/favorites/${obj.id}`);
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id))); // из апи удаляю, но на старнице сотается, если наоборот, то при удалении из апи, удалится со страницы
      } else {
        const {data} = await axios.post("https://6350fd33dfe45bbd55b37a6e.mockapi.io/favorites", obj);
        setFavorites((prev) => [...prev, data]);
      }
    } catch (e) {
      console.log(e)
    }
  };

  const onRemoveItemToCart = (id) => {
    axios.delete(`https://6350fd33dfe45bbd55b37a6e.mockapi.io/cart/${id}`);
    setCartItems(prev => prev.filter(item => item.id !== id))
  };

  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id));
  };

  return (
    <AppContext.Provider value={{items, cartItems, favorites, isItemAdded, onAddFavorite, setCartOpened}} > {/* теперь они доступны в любом компоненте внутри провайдера */}
      <div className="wrapper clear">

        {cartOpened ? <Drawer onRemoveItemToCart={onRemoveItemToCart} items={cartItems} onCloseCart={() => setCartOpened(false)}/> : null}

        <Header onClickCart={() => setCartOpened(true)} />

        <Switch>
          <Route path="/" exact>
            <Home 
              items={items}
              cartItems={cartItems} 
              searchValue={searchValue} 
              setSearchValue={setSearchValue} 
              onChangeSearchInput={onChangeSearchInput}
              onAddFavorite={onAddFavorite}
              onAddToCart={onAddToCart}
              isLoading={isLoading}
            />
          </Route>
          <Route to="/favorites">
            <Favorites />
          </Route>
        </Switch>

      </div>
    </AppContext.Provider>
  )
}

export default App;
