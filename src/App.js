import { useEffect, useState } from "react";
import axios from 'axios';
import { Route } from 'react-router-dom';

import Drawer from "./components/Drawer/Drawer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AppContext from "./context";
import Orders from "./pages/Orders";


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
      
      try {
        // setIsLoading(false); // если переиспользуется
        // const cartResponse = await axios.get("https://6350fd33dfe45bbd55b37a6e.mockapi.io/cart");
        // const favoritesResponse = await axios.get("https://6350fd33dfe45bbd55b37a6e.mockapi.io/favorites");
        // const itemsResponse = await axios.get("https://6350fd33dfe45bbd55b37a6e.mockapi.io/items");
        
        // Рефакт
        const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
          axios.get("https://6350fd33dfe45bbd55b37a6e.mockapi.io/cart"),
          axios.get("https://6350fd33dfe45bbd55b37a6e.mockapi.io/favorites"),
          axios.get("https://6350fd33dfe45bbd55b37a6e.mockapi.io/items")
        ]);

        setIsLoading(false);

        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (e) {
        console.log('Ошибка при запросе данных');
        console.log(e);
      }
    }
    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
    try {
      if(findItem) {
        setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`https://6350fd33dfe45bbd55b37a6e.mockapi.io/cart/${findItem.id}`);
      } else {
        setCartItems(prev => [...prev, obj]);
        const {data} = await axios.post("https://6350fd33dfe45bbd55b37a6e.mockapi.io/cart", obj);
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          }),
        );
      }
    } catch (e) {
      console.log('Ошибка при добавлении в коризну');
      console.log(e);
    }
  };

  const onAddFavorite = async (obj) => {
    try {
      if(favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id))); // из апи удаляю, но на старнице сотается, если наоборот, то при удалении из апи, удалится со страницы
        await axios.delete(`https://6350fd33dfe45bbd55b37a6e.mockapi.io/favorites/${obj.id}`);
      } else {
        const {data} = await axios.post("https://6350fd33dfe45bbd55b37a6e.mockapi.io/favorites", obj);
        setFavorites((prev) => [...prev, data]);
      }
    } catch (e) {
      console.log('Ошибка при добавлении в избранное');
      console.log(e);
    }
  };

  const onRemoveItemToCart = (id) => {
    try {
      axios.delete(`https://6350fd33dfe45bbd55b37a6e.mockapi.io/cart/${id}`);
      setCartItems(prev => prev.filter(item => Number(item.id) !== Number(id)));
    } catch (e) {
      console.log('Ошибка при удалении из корзины');
      console.log(e);
    }
  };

  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <AppContext.Provider value={{items, cartItems, favorites, isItemAdded, onAddFavorite, setCartOpened, setCartItems}} > {/* теперь они доступны в любом компоненте внутри провайдера */}
      <div className="wrapper clear">

        <Drawer onRemoveItemToCart={onRemoveItemToCart} items={cartItems} onCloseCart={() => setCartOpened(false)} opened={cartOpened}/>

        <Header onClickCart={() => setCartOpened(true)} />
        
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

        <Route path="/favorites" >
          <Favorites />
        </Route>

        <Route path="/orders" >
          <Orders items={cartItems}/>
        </Route>
        

      </div>
    </AppContext.Provider>
  )
}

export default App;
