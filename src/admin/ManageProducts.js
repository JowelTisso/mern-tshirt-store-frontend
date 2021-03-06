import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getProducts, deleteProduct } from "./helper/adminapicall";
import { ClipLoader } from "react-spinners";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const { user, token } = isAuthenticated();

  const preload = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisProduct = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
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

  return (
    <Base title="Welcome admin" description="Manage products here">
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row mb-5 ">
        <div className="col-8 offset-2 bg-white pt-4 pb-4 pl-5 pr-5">
          <h4 className="mb-4 text-dark">All products:</h4>
          <h3 className="text-center text-dark my-3">
            Total {products.length} products
          </h3>

          {products.length !== 0
            ? products.map((product, index) => {
                return (
                  <div key={index} className="row text-center mb-2 ">
                    <div className="col-md-4">
                      <h3 className="text-dark text-left">{product.name}</h3>
                    </div>
                    <div className="col-md-4 mb-2">
                      <Link
                        className="btn btn-success"
                        to={`/admin/product/update/${product._id}`}
                      >
                        <span className="">Update</span>
                      </Link>
                    </div>
                    <div className="col-md-4">
                      <button
                        onClick={() => {
                          deleteThisProduct(product._id);
                        }}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })
            : loadingScreen()}
        </div>
      </div>
    </Base>
  );
}
