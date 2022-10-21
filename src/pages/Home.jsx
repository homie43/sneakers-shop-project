import React from 'react';

import Card from '../components/Card/Card';

const Home = ({items, searchValue, setSearchValue, onChangeSearchInput, onAddFavorite, onAddToCart}) => {
    return (
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
                    // title={item.title}
                    // price={item.price}
                    // imageUrl={item.imageUrl}
                    onAddFavorite={(obj) => onAddFavorite(obj)}
                    onPluse={(obj) => onAddToCart(obj)}
                    {...item}
                />
            ))}
            </div>
      </div>
    );
};

export default Home;