import React, {useState, useContext} from 'react';
import axios from 'axios';
import Info from './Info';
import AppContext from '../context';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Drawer = ({onRemoveItemToCart, onCloseCart, items = []}) => {
    const {cartItems, setCartItems} = useContext(AppContext);
    const [orderId, setOrderId] = useState(null);
    const [isOrderComplete, setIsOrderComplete] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onClickOrder = async () => {
        try {
            setIsLoading(true);
            const {data} = await axios.post('https://6350fd33dfe45bbd55b37a6e.mockapi.io/orders', {items: cartItems}); // заказ отправляется в мокАпи // в мокАпи передаю объект items, в котором массив продуктов cartItems
            
            setOrderId(data.id);
            setIsOrderComplete(true); // 
            setCartItems([]); // отчищаю корзину
            
            // лютый костыль, по другому никак или я туплю 
            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete('https://6350fd33dfe45bbd55b37a6e.mockapi.io/cart' + item.id); // for потому что при forEach awawit ждать не будет
                await delay(1000);
            }
        } catch (e) {
            console.log('что-то пошло не так')
            console.log(e)
        }
        setIsLoading(false);
    };

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
                            <button disabled={isLoading} onClick={onClickOrder} className="myButton">
                                Оформить заказ <img src="img/arrow.svg" alt="Arrow" />
                            </button>
                        </div>
                    </>
                : 
                    <Info 
                        title={isOrderComplete ? "Заказ оформлен" : "Корзина пустая" }
                        description={isOrderComplete ? `Ваш заказ ${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок"} 
                        image={isOrderComplete ? "/img/complete-order.jpg" : "/img/empty-cart.jpg"}
                    />
                }

            </div>
        </div>
    );
};

export default Drawer;