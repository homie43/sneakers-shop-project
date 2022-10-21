import Card from "../components/Card/Card";

const Favorites = ({favorites, onAddFavorite}) => {
    return (
        <div className="content p-40">
          <div className="d-flex align-center justify-between mb-40">
            <h1>Мои закладки</h1>
          </div>
    
          <div className="d-flex flex-wrap">
            {/* {favorites.map((item, index) => (
              <Card key={index} favorited={true} onFavorite={onAddToFavorite} {...item} />
            ))} */}
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
        </div>
      );
};

export default Favorites;