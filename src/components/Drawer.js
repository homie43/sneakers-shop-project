import React, {useState} from 'react';
import Info from './Info';

const Drawer = ({onRemoveItemToCart, onCloseCart, items = []}) => {
    const [isOrderComplete, setIsOrderComplete] = useState(false)
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
                    <Info 
                        title="Корзина пустая" 
                        description="Добавьте хотя бы одну пару кроссовок" 
                        image="/img/empty-cart.jpg
                    "/>
                }

            </div>
        </div>
    );
};

export default Drawer;