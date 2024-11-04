import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../lib/axios";

const ViewProductDetails = () => {
  const [productDetails, setProductDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { category, product } = useParams();
  useEffect(() => {
    axios
      .get(`api/frontend/products/${category}/${product}`)
      .then((res) => {
        console.log(res);
        setLoading(false);
        if (res.status === 200) {
          // console.log(JSON.parse(res.data.products.image)[0]);
          setProductDetails(res.data.products);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);
  const decrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const increment = () => {
    if (quantity < 10) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };
  const submitAddToCart = (e) => {
    e.preventDefault();
    const data = {
      product_id: productDetails.id,
      product_qty: quantity,
    };
    console.log(data)
    axios
      .post("api/frontend/add-to-cart", data)
      .then((res) => {
        console.log(res);
        if (res.data.status === 201) {
        } else if (res.data.status === 409) {
        } else if (res.data.status === 401) {
        } else if (res.data.status === 404) {
        }
      })
      .catch((err) => {});
  };
  return (
    <div>
      <div className="py-3 bg-warning">
        <div className="container">
          <h6>Collections/Category/Product</h6>
        </div>
      </div>
      <div className="py-3">
        <div className="container">
          {loading === false ? (
            <div className="row">
              <div className="col-md-4 border-end">
                <img
                  src={`http://127.0.0.1:8000/uploads/product/${
                    JSON.parse(productDetails?.image)[0]
                  }`}
                  className="w-100"
                  alt={productDetails?.name}
                />
                {/* <img
                src={`http://127.0.0.1:8000/uploads/product/${
                  JSON.parse(productDetails.image)[0]
                }`}
                alt="Product"
                className="w-100"
              /> */}
              </div>
              <div className="col-md-8">
                <h4 className="d-flex justify-content-between">
                  {productDetails.name}
                  <span className="float-end badge btn-sm btn-danger badge-pil">
                    {productDetails.brand}
                  </span>
                </h4>
                <p>Product Description</p>
                <h4 className="mb-1">
                  Rs:{productDetails.sale_price}
                  <s className="ms-2"> Rs:{productDetails.cost_price}</s>
                </h4>
                <div>
                  {productDetails.qty > 0 ? (
                    <label htmlFor="" className="btn-sm btn-success px-4 mt-2">
                      In Stock
                    </label>
                  ) : (
                    <label htmlFor="" className="btn-sm btn-danger px-4 mt-2">
                      Out Stock
                    </label>
                  )}

                  <div className="row">
                    <div className="col-md-3  mt-3">
                      <div className="input-group">
                        <button
                          type="button"
                          className="input-group-text"
                          onClick={decrement}
                        >
                          -
                        </button>
                        <div className="form-control text-center">
                          {quantity}
                        </div>
                        <button
                          type="button"
                          className="input-group-text"
                          onClick={increment}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="col-md-3 mt-3">
                      <button
                        className="btn btn-primary w-100"
                        type="button"
                        onClick={submitAddToCart}
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                  <button className="btn btn-danger mt-3" type="button">
                    Add To Wishlist
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="col-md-12">
              <h4>Loading Data ...</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewProductDetails;
