import React, { useState, useEffect } from "react";
import { loadCart, cartEmpty } from "./helper/cartHelper";
import { getMeToken, processPayment } from "./helper/paymentHelper";
import { createOrder } from "./helper/orderHelper";
import DropIn from "braintree-web-drop-in-react";
import { isAuthenticated } from "../auth/helper";

export default function Paymentb({
  products,
  setReload = (f) => f,
  reload = undefined,
}) {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  // console.log(info);

  const getToken = (userId, token) => {
    getMeToken(userId, token).then((info) => {
      console.log("INFORMATION", info);

      if (info.error) {
        setInfo({ ...info, error: info.error });
      } else {
        const clientToken = info.clientToken;
        setInfo({ ...info, clientToken: clientToken });
        // console.log(info);
      }
    });
  };

  const showbraintdropin = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div className="rounded">
            <DropIn
              options={{
                authorization: info.clientToken,
                paypal: {
                  flow: "vault",
                  amount: getAmount(),
                  currency: "USD",
                },
              }}
              onInstance={(instance) => {
                info.instance = instance;
              }}
            />

            <button
              className="btn btn-block btn-success"
              onClick={() => {
                onPurchase();
              }}
            >
              Buy
            </button>
          </div>
        ) : userId ? (
          <h3>Please Add something to cart</h3>
        ) : (
          <h3>Please login</h3>
        )}
      </div>
    );
  };

  useEffect(() => {
    {
      isAuthenticated() && getToken(userId, token);
    }
  }, []);

  const onPurchase = () => {
    setInfo({ ...info, loading: true });
    // console.log(info);

    let nonce;
    let getNonce = info.instance
      .requestPaymentMethod()
      .then((data) => {
        nonce = data.nonce;
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getAmount(),
        };
        processPayment(userId, token, paymentData)
          .then((response) => {
            setInfo({ ...info, success: response.success, loading: false });
            console.log("PAYMENT SUCCESS");
            // console.log(info);
            console.log(response);

            const orderData = {
              products: products,
              transaction_id: response.transaction.id,
              amount: response.transaction.amount,
            };
            createOrder(userId, token, orderData).then((res) => {
              if (typeof window !== undefined) {
                if (localStorage.getItem("orderSummary")) {
                  console.log("empty orderSummary available");
                  localStorage.setItem("orderSummary", JSON.stringify(res));
                  setReload(!reload);
                }
              }
            });
            cartEmpty(() => {
              console.log("Cart is empty");
            });
          })
          .catch((error) => {
            setInfo({ loading: false, success: false });
            console.log("PAYMENT FAILED");
            console.log(error);
          });
      })
      .catch((err) => {
        console.log(err);
        console.log("catch called");
      });
  };

  const getAmount = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + p.price * p.count;
    });
    return amount;
  };

  return (
    <div className="rounded mt-2 text-secondary">{showbraintdropin()}</div>
  );
}
