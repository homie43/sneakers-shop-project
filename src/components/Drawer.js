import React from 'react';

const Drawer = ({onRemoveItemToCart, onCloseCart, items = []}) => {
    return (
        <div className="overlay">
            <div className="drawer">
                <h2 className="d-flex justify-between mb-30">Корзина <img onClick={onCloseCart} className="cu-p" src="/img/btn-remove.svg" alt="Remove" /> </h2>

                {items.length > 0 ?  
                    <>
                        <div className="items">
                            {items.map((obj) => (
                                <div key={obj.id} className="cartItem d-flex align-center mb-20">
                                    <div style={{backgroundImage: `url(${obj.imageUrl})`}} className="cartItemImg"></div>
                                    <div className="mr-20">
                                        <p className="mb-5">{obj.title}</p>
                                        <b>{obj.price} руб.</b>
                                    </div>
                                    <img onClick={() => onRemoveItemToCart(obj.id)} className="removeBtn" src="/img/btn-remove.svg" alt="Remove" />
                                </div>
                            ))} 
                        </div>
                        <div className="cartTotalBlock">
                            <ul>
                                <li className="d-flex">
                                    <span>Итого:</span>
                                    <div></div>
                                    <b>21 498 руб. </b>
                                </li>
                                <li className="d-flex">
                                    <span>Налог 5%: </span>
                                    <div></div>
                                    <b>1074 руб. </b>
                                </li>
                            </ul>
                            <button className="myButton">
                                Оформить заказ <img src="img/arrow.svg" alt="Arrow" />
                            </button>
                        </div>
                    </>
                : 
                    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
                        <img className="mb-20" width="120px" height="120px" src="/img/empty-cart.jpg" alt="EmptyCart" />
                        <h2>Пустая корзина</h2>
                        <p className="opacity-6">Добавьте хотя бы одну пару кроссовок</p>
                        <button onClick={onCloseCart} className="myButton">
                            <img src="/img/arrow.svg" alt="Arrow" />
                            Вернуться назад
                        </button>
                    </div>
                }

            </div>
        </div>
    );
};

export default Drawer;