import React from 'react';
import Card from '../components/Card/Card';

const Home = ({items, searchValue, onChangeSearchInput, onAddFavorite, onAddToCart, isLoading}) => {
    
    const renderItems = () => {
        const filtredItems = items.filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase()),
        );
        return (isLoading ? [...Array(8)] : filtredItems).map((item, index) => (
            <Card
                key={index}
                onAddFavorite={(obj) => onAddFavorite(obj)}
                onPluse={(obj) => onAddToCart(obj)}
                // added={isItemAdded(item && item.id)}
                loading={isLoading}
                {...item}
            />
        ));
    }
    
    return (
        <div className="contetnt p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1 className="mb-40">{searchValue ? `Поиск по запросу: ${searchValue}` : 'Все кроссовки'}</h1>
                <div className="search-block">
                    <img src="img/search.svg" alt="Search" />
                    <input onChange={onChangeSearchInput} placeholder="Поиск..." />
                </div>
            </div>

            <div className="d-flex flex-wrap justify-center">{renderItems()}</div>
      </div>
    );
};

export default Home;