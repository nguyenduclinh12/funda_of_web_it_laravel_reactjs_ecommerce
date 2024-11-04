import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../../../lib/axios";

const ViewProduct = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`api/frontend/products/${slug}`)
      .then((res) => {
        setLoading(false);
        // console.log(res);
        if (res.status === 200) {
          setProducts(res.data.products);
          setCategory(res.data.category);
        } else if (res.status === 404) {
          navigate("collections");
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <div className="py-3 bg-warning">
        <div className="container">
          <h6>Category/Prod name</h6>
        </div>
      </div>
      <div className="py-3">
        <div className="container">
          <div className="row">
            {loading === false ? (
              products?.length > 0 ? (
                products.map((item, index) => (
                  <div className="col-md-3" key={index}>
                    <div className="card">
                      <Link to={`/collections/${category.slug}/${item.slug}`}>
                        <img
                          src={`http://127.0.0.1:8000/uploads/product/${
                            JSON.parse(item.image)[0]
                          }`}
                          className="w-100"
                          alt={item.name}
                        />
                      </Link>
                      <div className="card-body">
                        <Link to={`/collections/${category.slug}/${item.slug}`}>
                          <h5>{item.name}</h5>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-md-12">
                  <h4>No Product Available for{category.name}</h4>
                </div>
              )
            ) : (
              <div className="col-md-12">
                <h4>Loading Category ...</h4>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
