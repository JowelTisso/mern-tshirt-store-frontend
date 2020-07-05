import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";
import { loadCart, createCart } from "./helper/cartHelper";
import Paymentb from "./Paymentb";
import { creteOrderSummary, getOrderSummary } from "./helper/orderHelper";

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);
  const [orderSummary, setOrderSummary] = useState({ products: [] });

  createCart();
  creteOrderSummary();

  useEffect(() => {
    setProducts(loadCart());
    setOrderSummary(getOrderSummary());
  }, [reload]);

  var totalprice = 0;
  var itemPrice = 0;

  var cartItems = loadCart();
  cartItems.map((item) => {
    itemPrice = item.price * item.count;
    totalprice = totalprice + itemPrice;
  });

  const loadAllProducts = (products) => {
    return (
      <div className="col-12">
        <h4 className="border-bottom  p-2 text-dark">Products section</h4>
        {products.map((product, index) => {
          console.log(product);
          return (
            <div key={index} className="row">
              <Card
                key={index}
                product={product}
                removeFromCart={true}
                addtoCart={false}
                showItemCountChecker={true}
                setReload={setReload}
                reload={reload}
                home={false}
                cart={true}
              />
            </div>
          );
        })}
      </div>
    );
  };

  const loadCheckout = () => {
    return (
      <div className=" col-12 bg-white text-dark rounded">
        <h4 className="border-bottom p-2">Checkout</h4>

        <div className="row p-1">
          <div className="col-6 text-left">
            <h5>Price({cartItems.length} item)</h5>
          </div>
          <div className="offset-2 col-4">
            <h5>${totalprice}</h5>
          </div>
        </div>

        <div className="row border-bottom p-1">
          <div className="col-6 text-left">
            <h5 className="">Delivery Charges</h5>
          </div>
          <div className=" offset-2 col-4">
            <h5>Free</h5>
          </div>
        </div>

        <div className="row p-1">
          <div className="col-6 text-left">
            <h5 className="">Total Amount</h5>
          </div>
          <div className=" offset-2 col-4">
            <h5>${totalprice}</h5>
          </div>
        </div>
      </div>
    );
  };

  const loadOrderSummary = () => {
    if (getOrderSummary()) {
      return "status" in orderSummary ? (
        <div className="bg-white text-dark p-1 rounded">
          <h4 className="pb-3 border-bottom">Order Summary</h4>
          <div className="row">
            <div className="col-6">
              <p className="text-left pl-5">Status</p>
            </div>
            <div className="col-6">
              <p className="text-left pl-5">{orderSummary.status}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <p className="text-left pl-5">Amount</p>
            </div>
            <div className="col-6">
              <p className="text-left pl-5">${orderSummary.amount}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <p className="text-left pl-5">Transaction Id</p>
            </div>
            <div className="col-6">
              <p className="text-left pl-5">{orderSummary.transaction_id}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <p className="text-left pl-5">Order Placed Date</p>
            </div>
            <div className="col-6">
              <p className="text-left pl-5">{orderSummary.createdAt}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <p className="border-bottom text-left pl-5">Products</p>
            </div>
            <div className="col-6">
              <p className="text-left pl-5">Quantity</p>
            </div>
          </div>

          {"products" in orderSummary &&
            orderSummary.products.map((product, index) => {
              return (
                <div className="row" key={index}>
                  <div className="col-6">
                    <p className="text-left pl-5">{product.name}</p>
                  </div>
                  <div className="col-6">
                    <p className="text-left pl-5">{product.count}</p>
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <h3 className="text-secondary">No Item in cart</h3>
      );
    }
  };

  return (
    <Base title="Cart Page" description="Ready to chekout">
      <div className="row text-center border">
        <div className="col-md-7 ">
          {products.length > 0 ? loadAllProducts(products) : loadOrderSummary()}
        </div>
        <div className="col-md ">
          {loadCheckout()}
          <Paymentb products={products} setReload={setReload} />
        </div>
      </div>
      <div className="row">
        <div className="text-dark p-3 col-md  bg-white mt-3 mb-5">
          <h6>Test Card :</h6>
          <p>4000111111111115</p>
          <p>12/21</p>
          <h6>Test Paypal : </h6>
          <p>sb-paqt62324461@personal.example.com</p>
          <p>Wsl]v9?E</p>
        </div>
      </div>
    </Base>
  );
}
