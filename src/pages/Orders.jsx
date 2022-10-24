import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import Card from "../components/Card/Card";
import InfoTwo from '../components/InfoTwo';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const {data} = await axios.get('https://6350fd33dfe45bbd55b37a6e.mockapi.io/orders');
                setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
                setIsLoading(false);
            } catch (e) {
                console.log('Не удалось получить список заказов');
                console.log(e);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="content p-40">
          <div className="d-flex align-center justify-between mb-40">
            <h1>Мои заказы</h1>
          </div>
          {orders.length > 0
            ?
            <div className="d-flex flex-wrap">
              {(isLoading ? [...Array(8)] : orders).map((item, index) => (
                  <Card
                      key={index}
                      loading={isLoading}
                      {...item}    
                  />
              ))}
            </div>
            :
            <InfoTwo 
              title={'У вас нет заказов'}
              description={'Оформите хотя бы один заказ'}
              image={'img/memo-1.jpg'}  
            />
          }
          
        </div>
      );
};

export default Orders;