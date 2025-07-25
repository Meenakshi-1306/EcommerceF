import React from "react";

const ProductList = ({ products, onDelete, onEdit }) => {
  if (products.length === 0) {
    return <p className="no-products">No products yet.</p>;
  }

  return (
    <div className="product-list">
      {products.map((product) => (
        <div className="product-card" key={product.id}>
          <h3>{product.name}</h3>
          <p>💸 ₹{product.price}</p>
          <p>{product.description}</p>
          <div className="buttons">
            <button onClick={() => onEdit(product)} className="edit">
              Edit
            </button>
            <button onClick={() => onDelete(product.id)} className="delete">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
