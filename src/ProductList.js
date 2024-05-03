import React from 'react';
import ProductCard from './ProductCard'; // Supondo que você tenha um componente ProductCard

function ProductList({ data }) {
  if (data) {return (
    <div>
      {data.map((product, index) => (
        <ProductCard
          key={index}
          price={product.price}
          rating={product.rating}
          title={product.title}
        />
      ))}
    </div>
  );}
}

export default ProductList;
