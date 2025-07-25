import React, { useState, useEffect } from "react";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import "./index.css";

const API_URL = "https://ecommerceb-1-alqm.onrender.com/api/products/";


const App = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  // 🔄 Load products from backend
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // ✅ Add product (POST)
  const addProduct = (product) => {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((newProduct) => {
        setProducts([...products, newProduct]);
      });
  };

  // ❌ Delete product (DELETE)
  const deleteProduct = (id) => {
    fetch(`${API_URL}${id}/`, {
      method: "DELETE",
    }).then(() => {
      setProducts(products.filter((p) => p.id !== id));
    });
  };

  // ✏️ Update product (PATCH)
  const updateProduct = (updatedProduct) => {
    fetch(`${API_URL}${updatedProduct.id}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(
          products.map((p) => (p.id === updatedProduct.id ? data : p))
        );
        setEditingProduct(null);
      });
  };

  const editProduct = (product) => {
    setEditingProduct(product);
  };

  return (
    <div className="app">
      <h1>🛍️ My E-Commerce Store</h1>
      <ProductForm
        onAdd={addProduct}
        onUpdate={updateProduct}
        editingProduct={editingProduct}
      />
      <ProductList
        products={products}
        onDelete={deleteProduct}
        onEdit={editProduct}
      />
    </div>
  );
};

export default App;
