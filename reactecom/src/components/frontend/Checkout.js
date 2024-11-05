import React, { useEffect, useState } from "react";
import axios from "../../lib/axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [errors, setErrors] = useState([]);
  const [checkoutInput, setCheckoutInput] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    error_list: [],
  });

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("api/frontend/cart")
      .then((res) => {
        if (res.data.length === 0) {
          navigate("/");
        }
        setLoading(false);
        setCart(res.data);
      })
      .catch((err) => {
        setLoading(false);
        setErrors(err.response.errors);
      });
  }, []);
  useEffect(() => {
    if (cart.length > 0) {
      const totalPrice = cart.reduce((total, item) => {
        const salePrice = parseInt(item.product.sale_price) || 0;
        const qty = parseInt(item.product_qty) || 0;
        return total + salePrice * qty;
      }, 0);
      setTotalCartPrice(totalPrice);
    }
  }, [cart]);

  const handleChange = (e) => {
    setCheckoutInput((prevCheckoutInput) => ({
      ...prevCheckoutInput,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e, payment_mode) => {
    e.preventDefault();
    const data = {
      first_name: checkoutInput.first_name,
      last_name: checkoutInput.last_name,
      email: checkoutInput.email,
      phone: checkoutInput.phone,
      address: checkoutInput.address,
      city: checkoutInput.city,
      zipCode: checkoutInput.zipCode,
      state: checkoutInput.state,
      payment_mode: payment_mode,
    };
    switch (payment_mode) {
      case "cod":
        axios
          .post("api/frontend/place-order", data)
          .then((res) => {
            console.log(res.data);
            if (res.data.status === 200) {
              navigate("/");
            } else if (res.data.status === 422) {
              setCheckoutInput({
                ...checkoutInput,
                error_list: res.data.errors,
              });
            }
          })
          .catch((err) => {});
        break;
      case "razorpay":
        axios
          .post("api/frontend/validate-order", data)
          .then((res) => {
            if (res.data.status === 200) {
              var options = {
                key: "YOUR_KEY_ID", // Enter the Key ID generated from the Dashboard
                amount: totalCartPrice * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                currency: "INR",
                name: "Acme Corp", //your business name
                description: "Thank you for purchasing with Funda",
                image: "https://example.com/your_logo",
                handler: function (response) {
                  alert(response.razorpay_payment_id);
                },
                prefill: {
                  //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
                  name: data.first_name + data.last_name, //your customer's name
                  email: data.email,
                  contact: data.phone, //Provide the customer's phone number for better conversion rates
                },

                theme: {
                  color: "#3399cc",
                },
              };
              var rzp = new window.Razorpay(options);
              rzp.open();
            } else if (res.data.status === 422) {
              setCheckoutInput({
                ...checkoutInput,
                error_list: res.data.errors,
              });
            }
          })
          .catch((err) => {});
        break;
      default:
        break;
    }
  };
  return (
    <div>
      <div className="py-3 bg-warning">
        <div className="container">
          <h6>Home/Cart</h6>
        </div>
      </div>
      <div className="py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <div className="card">
                <form>
                  <div className="card-header">
                    <h4>Basic Information</h4>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group mb-3">
                          <label htmlFor="">First Name</label>
                          <input
                            type="text"
                            name="first_name"
                            className="form-control"
                            onChange={handleChange}
                          />
                        </div>
                        {checkoutInput.error_list?.first_name ? (
                          <span className="text-danger">
                            {checkoutInput.error_list.first_name}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="col-md-6">
                        <div className="form-group mb-3">
                          <label htmlFor="">Last Name</label>
                          <input
                            type="text"
                            name="last_name"
                            className="form-control"
                            onChange={handleChange}
                          />
                        </div>
                        {checkoutInput.error_list?.last_name ? (
                          <span className="text-danger">
                            {checkoutInput.error_list.last_name}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>

                      <div className="col-md-6">
                        <div className="form-group mb-3">
                          <label htmlFor="">Phone Number</label>
                          <input
                            type="text"
                            name="phone"
                            className="form-control"
                            onChange={handleChange}
                          />
                        </div>
                        {checkoutInput.error_list?.phone ? (
                          <span className="text-danger">
                            {checkoutInput.error_list.phone}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="col-md-6">
                        <div className="form-group mb-3">
                          <label htmlFor="">Email Address</label>
                          <input
                            type="email"
                            name="email"
                            className="form-control"
                            onChange={handleChange}
                          />
                        </div>
                        {checkoutInput.error_list?.email ? (
                          <span className="text-danger">
                            {checkoutInput.error_list.email}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="col-md-12">
                        <div className="form-group mb-3">
                          <label htmlFor="">Address</label>
                          <textarea
                            className="form-control"
                            name="address"
                            id=""
                            onChange={handleChange}
                            defaultValue={checkoutInput.address}
                          ></textarea>
                        </div>
                        {checkoutInput.error_list?.address ? (
                          <span className="text-danger">
                            {checkoutInput.error_list.address}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>

                      <div className="col-md-4">
                        <div className="form-group mb-3">
                          <label htmlFor="">City</label>
                          <input
                            type="text"
                            name="city"
                            className="form-control"
                            onChange={handleChange}
                          />
                        </div>
                        {checkoutInput.error_list?.city ? (
                          <span className="text-danger">
                            {checkoutInput.error_list.city}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>

                      <div className="col-md-4">
                        <div className="form-group mb-3">
                          <label htmlFor="">State</label>
                          <input
                            type="text"
                            name="state"
                            className="form-control"
                            onChange={handleChange}
                          />
                        </div>
                        {checkoutInput.error_list?.state ? (
                          <span className="text-danger">
                            {checkoutInput.error_list.state}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="col-md-4">
                        <div className="form-group mb-3">
                          <label htmlFor="">Zip code</label>
                          <input
                            type="text"
                            name="zipCode"
                            className="form-control"
                            onChange={handleChange}
                          />
                        </div>
                        {checkoutInput.error_list?.zipCode ? (
                          <span className="text-danger">
                            * {checkoutInput.error_list.zipCode}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="col-md-12">
                        <div className="form-group mb-3 ">
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={(e) => handleSubmit(e, "code")}
                          >
                            Place Order
                          </button>
                        </div>
                        <div className="form-group mb-3 ">
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={(e) => handleSubmit(e, "razorpay")}
                          >
                            Place Online
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-5">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th width="50%">Product</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, index) => (
                    <tr key={index}>
                      <td>{item.product.name}</td>
                      <td>{item.product.sale_price}</td>
                      <td>{item.product_qty}</td>
                      <td> {item.product.sale_price * item.product_qty}</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan="2" className="text-right">
                      Grand Total
                    </td>
                    <td colSpan="2" className="text-right">
                      {totalCartPrice}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
