import React from 'react';

function ProductCard({ image, link, price, rating, title }) {
  return (
    <div>
      <div className='resultado_pesquisa'>
        <a href={link} target='blank'>
            <div className='item_imagem_container'>
                <img className='item_imagem' src={image} alt='imagem do produto'/>
            </div>
        </a>
        <div className='descricao_pesquisa'>
            <div className='item_titulo_container'>
                <a href={link} target='blank'>
                    <h3 className='item_titulo'>{title}</h3>
                </a>
            </div>
            <div className='valores_pesquisa'>
              <div className='item_preco valor_pesquisa'>Preço: {price}</div>
              <div className='item_avaliacao valor_pesquisa'>Avaliacao: {rating}</div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
