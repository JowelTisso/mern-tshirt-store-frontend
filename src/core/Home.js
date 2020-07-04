import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";
import { loadCart } from "./helper/cartHelper";
import { emptyOrderSummary } from "./helper/orderHelper";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [reload, setReload] = useState(false);

  emptyOrderSummary();

  const loadAllProducts = () => {
    return getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProducts();
  }, [reload]); //reload is for refreshing cart count

  //To store cart count in the homepage
  let cartItem = loadCart();
  let cartItemCount = cartItem.length;

  return (
    <Base
      title="All Season T-Shirt Store"
      description="Welcome to the tshirt store"
    >
      <div className="row text-center">
        <h4 className="text-dark">All of tshirts</h4>
        <h5 className="col text-right text-info">Cart {cartItemCount}</h5>
        <div className="row">
          {products.map((product, index) => {
            return (
              <div key={index} className="col-3 mb-4">
                <Card
                  product={product}
                  home={true}
                  cart={false}
                  setReload={setReload}
                  reload={reload}
                />
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
}
