import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../../lib/axios";

const ViewCategory = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios
      .get("api/frontend/category")
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setCategories(res.data.category);
        }
      })
      .catch((err) => {});
  }, []);

  return (
    <div>
      <div className="py-3 bg-warning">
        <div className="container">
          <h6>Category Page</h6>
        </div>
      </div>
      <div className="py-3 bg-warning">
        <div className="container">
          <h6>Category Page</h6>
          <div className="row">
            {categories?.length > 0 &&
              categories.map((item, index) => (
                <div className="col-md-4" key={index}>
                  <div className="card">
                    <Link to="">
                      <img src="" className="w-100" alt={item.name} />
                    </Link>
                    <div className="card-body">
                      <Link to={`/collections/${item.slug}`}>
                        <h5>{item.name}</h5>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCategory;
