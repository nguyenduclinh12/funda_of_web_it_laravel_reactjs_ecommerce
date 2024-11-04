import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../../lib/axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("api/product")
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          setProducts(res.data);
        }
      })
      .catch((err) => {});
  }, []);
  const handleDelete = (e, id) => {
    e.preventDefault();
    const thisClicked = e.target;
    thisClicked.innerText = "Deleting";

    axios
      .delete(`api/product/${id}`)
      .then((res) => {
        if (res.data.status === 200) {
          thisClicked.closest("tr").remove();
        } else if (res.data.status === 404) {
          thisClicked.innerText = "Delete";
        }
      })
      .catch((err) => {});
  };
  return (
    <>
      <h1 className="h3 mb-2 text-gray-800">Tables</h1>
      <p className="mb-4">
        DataTables is a third party plugin that is used to generate the demo
        table below. For more information about DataTables, please visit the{" "}
      </p>

      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">
            DataTables Example
          </h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <div
              className="dataTables_wrapper dt-bootstrap4"
              id="dataTable_wrapper"
            >
              <div className="row">
                <div className="col-sm-12 col-md-6">
                  <div className="dataTables_length" id="dataTable_length">
                    <label>
                      Show{" "}
                      <select
                        name="dataTable_length"
                        aria-controls="dataTable"
                        className="custom-select custom-select-sm form-control form-control-sm"
                      >
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                      </select>{" "}
                      entries
                    </label>
                  </div>
                </div>
                <div className="col-sm-12 col-md-6">
                  <div
                    id="dataTable_filter"
                    className="dataTables_filter d-flex flex-row-reverse"
                  >
                    <Link to={"/category-view"} className="btn btn-primary">
                      ADD
                    </Link>
                    <label>
                      Search:
                      <input
                        type="search"
                        className="form-control form-control-sm"
                        placeholder=""
                        aria-controls="dataTable"
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <table
                    className="table table-bordered dataTable"
                    id="dataTable"
                    width="100%"
                    cellSpacing="0"
                  >
                    <thead>
                      <tr role="row">
                        <th>Image</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Slug</th>
                        <th>Meta Title</th>
                        <th>Meta Keyword</th>
                        <th>status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tfoot>
                      <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Slug</th>
                        <th>Meta Title</th>
                        <th>Meta Keyword</th>
                        <th>status</th>
                        <th>Action</th>
                      </tr>
                    </tfoot>
                    <tbody>
                      {products.length > 0 &&
                        products.map((product, index) => (
                          <tr key={index}>
                            <td>
                              <img
                                key={index}
                                src={`http://127.0.0.1:8000/uploads/product/${
                                  JSON.parse(product.image)[0]
                                }`}
                                alt=""
                                width={50}
                                className="d-flex "
                              />
                            </td>
                            <td>{product.name}</td>
                            <td>{product.category.name}</td>
                            <td>{product.slug}</td>
                            <td>{product.meta_title}</td>
                            <td>{product.meta_keyword}</td>
                            <td>{product.status ? "Show":"Hidden"}</td>

                            <td>
                              <Link
                                to={`/admin/product/${product.id}`}
                                className="btn btn-primary mr-1"
                              >
                                Edit
                              </Link>
                              <Link
                                onClick={(e) => handleDelete(e, product.id)}
                                className="btn btn-danger"
                              >
                                Delete
                              </Link>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
