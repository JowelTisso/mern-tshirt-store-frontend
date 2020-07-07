import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { UserDashBoardLeft } from "./helper/userDashboardHelper";
import { getUserOrders } from "../core/helper/orderHelper";
import { isAuthenticated } from "../auth/helper";
import ImageHelper from "../core/helper/ImageHelper";
import { ClipLoader } from "react-spinners";

const MyOrders = () => {
  const [purchaseList, setPurchaseList] = useState([]);
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const loadAllOrders = () => {
    return getUserOrders(userId, token)
      .then((orders) => {
        setPurchaseList(orders);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadingScreen = () => {
    return (
      <div className="row" style={{ height: "300px" }}>
        <div className=" mx-auto my-auto col-1">
          <ClipLoader size={50} color={"#36D7B7"} loading={true} />
        </div>
      </div>
    );
  };

  useEffect(() => {
    loadAllOrders();
  }, []);

  const UserDashBoardRight = () => {
    return (
      <div className="p-3">
        <h4 className="pb-2">Purchase List</h4>

        <div className="">
          {purchaseList.length !== 0
            ? purchaseList.map((order, index) => {
                return (
                  <div key={index} className="p-3 bg-dark rounded mb-2">
                    <div className="row">
                      <div className="col-3">Status</div>
                      <div className="offset-1 col-4">{order.status}</div>
                    </div>

                    <div className="row">
                      <div className="col-3">Amount</div>
                      <div className="offset-1 col-4">{order.amount}</div>
                    </div>

                    <div className="row">
                      <div className="col-3">Transaction Id</div>
                      <div className="offset-1 col-4">
                        {order.transaction_id}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-3">Order Placed date</div>
                      <div className="offset-1 col-4">{order.createdAt}</div>
                    </div>

                    <div className="row mt-2">
                      <div className="col-3">Products</div>
                      <div className="offset-1 col-8 ">
                        {order.products.map((product, index) => {
                          return (
                            <div className="row" key={index}>
                              <div className="col-8">
                                <div className="row">
                                  <div className="col-4">Name:</div>
                                  <div className="col-8">{product.name}</div>
                                </div>
                                <div className="row">
                                  <div className="col-4">Quantity:</div>
                                  <div className="col-4">{product.count}</div>
                                </div>
                                <div className="row">
                                  <div className="col-4">Price per piece:</div>
                                  <div className="col-4">{product.price}</div>
                                </div>
                              </div>
                              <div className="offset-1 col-3">
                                {<ImageHelper product={product} />}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })
            : loadingScreen()}
        </div>
      </div>
    );
  };

  return (
    <Base
      title="My Orders"
      description="Here you can check your orders"
      classNameForTitle="display-4"
      classNameForTopContainer=" bg-white text-dark text-center pt-4"
    >
      <div className="row mb-5">
        <div className="col-md-2 mb-2 ">{UserDashBoardLeft()}</div>
        <div className="col-md-10 bg-secondary rounded text-white">
          {UserDashBoardRight()}
        </div>
      </div>
    </Base>
  );
};

export default MyOrders;
