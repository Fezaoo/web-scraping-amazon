import React from 'react';

function ProductCard({ price, rating, title }) {
  return (
    <div>
      <div className='resultado_pesquisa'>
        <h3 className='item_titulo'>{title}</h3>
        <div className='valores_pesquisa'>
          <div className='item_preco valor_pesquisa'>{price}</div>
          <div className='item_avaliacao valor_pesquisa'>{rating}</div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
