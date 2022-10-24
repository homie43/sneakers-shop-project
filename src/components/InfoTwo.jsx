import React from 'react';
import { Link } from 'react-router-dom';

const InfoTwo = ({title, description, image}) => {
    return (
        <div className="cartEmpty d-flex align-center justify-center flex-column flex">
            <img width="70px"  src={image} alt="Memo" />
            <h2 className="mb-5" >{title}</h2>
            <p className="opacity-6 mb-20">{description}</p>
            <button style={{'width': 245}} className="myButton mb-50">
                <Link to="/sneakers-shop-project">
                  <img src="img/arrow.svg" alt="Arrow" />
                  Вернуться назад
                </Link>
            </button>
        </div>
    );
};

export default InfoTwo;