import React from 'react';

const Header = (props) => {
    return (
        <header className="d-flex justify-between align-center p-40">
        
            <div className="d-flex align-center">
            <img width={40} height={40} src="img/logo.png" alt="Logotype" />
            <div>
                <h3 className="text-uppercase">Sneakers Shop</h3>
                <p className="opacity-5">Магазин крутых кроссовок</p>
            </div>
            </div>
            
            <ul className="d-flex">
            <li onClick={props.onClickCart} className="mr-30 cu-p">
                <img width={18} height={18} src="img/cart.svg" alt="Корзина" />
                <span>1205 руб.</span>
            </li>
            <li className="mr-20 cu-p">
                <img width={18} height={18} src="img/heart.svg" alt="Закладки" />
            </li>
            <li>
                <a to="/orders">
                <img width={18} height={18} src="img/user.svg" alt="Пользователь" />
                </a>
            </li>
            </ul>
      
        </header>
    );
};

export default Header;