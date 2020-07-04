import React, { useState, useEffect } from "react";
import ImageHelper from "./helper/ImageHelper";
import {
  addItemToCart,
  removeItemFromCart,
  modifyItemCount,
} from "./helper/cartHelper";
import { Redirect } from "react-router-dom";

const Card = ({
  product,
  addtoCart = true,
  removeFromCart = false,
  showItemCountChecker = false,
  setReload = (f) => f,
  reload = undefined,
  home = true,
  cart = false,
}) => {
  const [redirect, setRedirect] = useState(false);
  let count = 0;

  const cardTitle = product.name ? product.name : "Product Title";
  const cardDescription = product.description
    ? product.description
    : "Product Description";
  const cardPrice = product.price ? product.price : "Price";

  let cartItem;
  let exist = false;

  const cartItemChecker = () => {
    //To get the cart item for checking existing item

    if (typeof window !== undefined) {
      if (localStorage.getItem("cart")) {
        cartItem = JSON.parse(localStorage.getItem("cart"));
        // console.log(cartItem);
      }
    }

    //To store a boolean value for existing item

    cartItem.map((item) => {
      if (item._id == product._id) {
        count = item.count;
        exist = true;
      }
    });
  };

  const addToCart = () => {
    cartItemChecker();
    //To update the existing item with new one
    if (exist) {
      const index = cartItem.findIndex((element) => element._id == product._id);
      modifyItemCount(product, count, index);
    } else {
      addItemToCart(product, count);
    }
  };

  const removeItemCart = () => {
    cartItemChecker();
    //To update the existing item with new one
    if (exist && count > 1) {
      const index = cartItem.findIndex((element) => element._id == product._id);
      modifyItemCount(product, count - 2, index);
    }
  };

  const getaRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = (addtoCart) => {
    return (
      addtoCart && (
        <button
          onClick={() => {
            addToCart();
            setReload(!reload);
          }}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload);
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };

  const showItemCount = () => {
    return (
      showItemCountChecker && (
        <div>
          <button
            className="btn btn-success rounded"
            onClick={() => {
              removeItemCart();
              setReload(!reload);
            }}
          >
            -
          </button>
          <span className="offset-1 ">{product.count}</span>
          <button
            className="btn btn-success offset-1 rounded"
            onClick={() => {
              addToCart();
              setReload(!reload);
            }}
          >
            +
          </button>
        </div>
      )
    );
  };

  const cardForHome = (home) => {
    return (
      home && (
        <div>
          <div className="card-header lead">{cardTitle}</div>
          <div className="card-body">
            {getaRedirect(redirect)}
            <ImageHelper product={product} />
            <p className="lead bg-success rounded font-weight-normal text-wrap">
              {cardDescription}
            </p>
            <p className="btn btn-success rounded  btn-sm px-4">
              $ {cardPrice}
            </p>
            <div className="row">
              <div className="col-12">
                {showItemCount(showItemCountChecker)}
              </div>
              <div className="col-12">{showAddToCart(addtoCart)}</div>
              <div className="col-12">{showRemoveFromCart(removeFromCart)}</div>
            </div>
          </div>
        </div>
      )
    );
  };

  const cardForCart = (cart) => {
    return (
      cart && (
        <div className="">
          <div className="card-header lead">{cardTitle}</div>
          <div className="row">
            <div className="col-3 ">
              <ImageHelper product={product} />
              {showItemCount(showItemCountChecker)}
            </div>
            <div className="col">
              <div className="card-body">
                {getaRedirect(redirect)}

                <p className="lead bg-success col-6 offset-3  rounded font-weight-normal text-wrap">
                  {cardDescription}
                </p>
                <p className="btn btn-success rounded  btn-sm px-4">
                  $ {cardPrice}
                </p>
                <div className="row">
                  <div className="col-12"></div>
                  <div className="col-12">{showAddToCart(addtoCart)}</div>
                  <div className="col-12">
                    {showRemoveFromCart(removeFromCart)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    );
  };

  return (
    <div className="card text-dark ">
      {cardForHome(home)}
      {cardForCart(cart)}
    </div>
  );
};

export default Card;
