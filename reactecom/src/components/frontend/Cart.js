import React, { useEffect, useState } from "react";
import axios from "../../lib/axios";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  useEffect(() => {
    axios
      .get("api/frontend/cart")
      .then((res) => {
        setLoading(false);
        setCart(res.data);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    if (cart.length > 0) {
      const totalPrice = cart.reduce((total, item) => {
        const salePrice = parseInt(item.product.sale_price) || 0;
        const qty = parseInt(item.product_qty) || 0;
        return total + salePrice * qty;
      }, 0);
      // console.log(totalPrice);
      setTotalCartPrice(totalPrice);
    }
  }, [cart]);

  const handleRemove = (e, cart_id) => {
    // e.preventDefault();
    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Removing";
    axios
      .delete(`api/frontend/delete-cart-item/${cart_id}`)
      .then((res) => {
        if (res.status === 200) {
          thisClicked.closest("tr").remove();
          setCart([]);
        }
      })
      .catch((err) => {});
  };

  const handleDecrement = (cart_id) => {
    setCart((cart) =>
      cart.map((item) =>
        cart_id === item.id
          ? {
              ...item,
              product_qty: item.product_qty - (item.product_qty > 1 ? 1 : 0),
            }
          : item
      )
    );
    const cartItem = cart.find((item) => item.id === cart_id);
    const productQty = cartItem ? cartItem.product_qty : 1;
    if (productQty > 1) {
      updateCartQuantity(cart_id, "dec");
    }
  };
  const handleIncrement = (cart_id) => {
    setCart((cart) =>
      cart.map((item) =>
        cart_id === item.id
          ? {
              ...item,
              product_qty: item.product_qty + (item.product_qty < 10 ? 1 : 0),
            }
          : item
      )
    );
    const cartItem = cart.find((item) => item.id === cart_id);
    const productQty = cartItem ? cartItem.product_qty : 10;
    if (productQty < 10) {
      updateCartQuantity(cart_id, "inc");
    }
  };
  function updateCartQuantity(cart_id, scope) {
    axios
      .patch(`api/frontend/cart-update-quantity/${cart_id}/${scope}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {});
  }

  return (
    <div>
      <div className="py-3 bg-warning">
        <div className="container">
          <h6>Home/Cart</h6>
        </div>
      </div>
      {loading === false ? (
        <div className="py-3">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                {cart.length > 0 ? (
                  <div className="table-responsive">
                    <table
                      className="table table-bordered dataTable"
                      id="dataTable"
                      width="100%"
                      cellSpacing="0"
                    >
                      <thead>
                        <tr>
                          <th>Image</th>
                          <th>Product</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Total Price</th>
                          <th>Remove</th>
                        </tr>
                      </thead>

                      <tbody>
                        {cart.map((item, index) => {
                          // setTotalCartPrice(
                          //   (prevTotalCartPrice) =>
                          //     prevTotalCartPrice +
                          //     parseInt(item.product.sale_price) * parseInt(item.product_qty)
                          // );
                          return (
                            <tr key={index}>
                              <td width="10%">
                                <img
                                  src={`http://127.0.0.1:8000/uploads/product/${
                                    JSON.parse(item.product.image)[0]
                                  }`}
                                  alt=""
                                  width="50px"
                                  height="50px"
                                />
                              </td>
                              <td width="15%">{item.product.name}</td>
                              <td width="15%">{item.product.sale_price}</td>
                              <td width="15%">
                                <div className="input-group">
                                  <button
                                    type="button"
                                    className="input-group-text"
                                    onClick={() => handleDecrement(item.id)}
                                  >
                                    -
                                  </button>
                                  <div className="form-control text-center">
                                    {item.product_qty}
                                  </div>
                                  <button
                                    className="input-group-text"
                                    type="button"
                                    onClick={() => handleIncrement(item.id)}
                                  >
                                    +
                                  </button>
                                </div>
                              </td>
                              <td width="15%" className="text-center">
                                {item.product.sale_price * item.product_qty}
                              </td>
                              <td width="10%">
                                <button
                                  className="btn btn-danger btn-sm"
                                  type="button"
                                  onClick={(e) => handleRemove(e, item.id)}
                                >
                                  Remove
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="card card-body py-5 text-center shadow-sm">
                    <h4>Your Shopping Cart is Empty</h4>
                  </div>
                )}
              </div>
              <div className="col-md-8"></div>
              <div className="col-md-4">
                <div className="card card-body mt-3">
                  <h4>
                    Sub Total:
                    <span className="float-end">{totalCartPrice}</span>
                  </h4>
                  <h4>
                    Grand Total:
                    <span className="float-end">{totalCartPrice}</span>
                  </h4>
                  <hr />
                  <Link to="/checkout" className="btn btn-primary">
                    Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h4>Loading Data ...</h4>
      )}
    </div>
  );
};

export default Cart;
