import { useContext } from "react";
import Card from "../components/Card/Card";
import AppContext  from "../context";
import InfoTwo from "../components/InfoTwo";

const Favorites = () => {
  const {favorites, onAddFavorite} = useContext(AppContext);
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Избранное</h1>
      </div>
      
      {favorites.length > 0 
        ?
        <div className="d-flex flex-wrap">
          {favorites.map((item, index) => (
            <Card
              key={index}
              // id={item.id}
              // title={item.title}
              // price={item.price}
              // imageUrl={item.imageUrl}
              // так будет проще, и код короче
              {...item}
              favorited={true}
              onAddFavorite={onAddFavorite}
            />
          ))}
        </div>
        :
        <InfoTwo 
          title={'Избранного нет ;('}
          description={'Добавьте хотя бы что-нибуь в избранное'}
          image={'img/memo-2.jpg'}  
        />
      }

    </div>
  );
};

export default Favorites;