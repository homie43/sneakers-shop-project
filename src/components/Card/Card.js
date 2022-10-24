import React, { useState, useContext } from 'react';
import ContentLoader from "react-content-loader"
import AppContext from '../../context';
import styles from './Card.module.scss'

const Card = ({id, parentId, title, price, imageUrl, onPluse, onAddFavorite, favorited = false, loading = false}) => {
  
  const {isItemAdded} = useContext(AppContext);
  const [isFavorite, setIsFavorite] = useState(favorited);
  const obj = {id, parentId: id, title, price, imageUrl};

  const onClickPluse = () => {
    onPluse(obj);
  }

  const onClickFavorite = () => {
    onAddFavorite(obj)
    setIsFavorite(!isFavorite)
  }

  
  return (
    <div className={styles.card}>

      {loading 
        ? 
        <ContentLoader 
          speed={2}
          width={155}
          height={250}
          viewBox="0 0 155 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="1" y="0" rx="10" ry="10" width="150" height="132" /> 
          <rect x="0" y="142" rx="3" ry="3" width="150" height="15" /> 
          <rect x="0" y="167" rx="3" ry="3" width="93" height="15" /> 
          <rect x="1" y="232" rx="9" ry="9" width="80" height="24" /> 
          <rect x="124" y="223" rx="8" ry="8" width="32" height="32" />
        </ContentLoader>
        :
        <>
          {onAddFavorite && (
            <div className={styles.favorite} onClick={onAddFavorite}>
              <img onClick={onClickFavorite} src={isFavorite ? "img/heart-liked.svg" : "img/heart-unliked.svg"} alt="Unliked" />
            </div>
          )}
          <img width="100%" height={135} src={imageUrl} alt="Sneakers" />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена</span>
              <b>{price} руб.</b>
            </div>
            {onPluse && (
              <img 
                className={styles.plus}
                onClick={onClickPluse} 
                src={isItemAdded(id) ? "img/btn-cheked.svg" : "img/btn-plus.svg"} 
                alt="Plus" 
              />
            )}
          </div>
        </>
      }
    </div>
  );
};

export default Card;