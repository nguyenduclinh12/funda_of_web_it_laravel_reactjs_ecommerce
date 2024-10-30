import React, { useEffect, useState } from "react";
import axios from "../../../lib/axios";
import { Link, useSearchParams } from "react-router-dom";
// import "../../../assets/admin/vendor/datatables/dataTables.bootstrap4.min.css";

const CategoryView = () => {
  const [categories, setCategories] = useState([]);
  //   const [searchParams] = useSearchParams();
  //// search param in url like: ?type=
  //   const type = searchParams.get("type");

  useEffect(() => {
    axios
      .get("/api/category")
      .then((res) => {
        if (res.status === 200) {
          setCategories(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = (e, id) => {
    e.preventDefault();
    const thisClicked = e.target;
    thisClicked.innerText = "Deleting";

    axios
      .delete(`api/category-delete/${id}`)
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
                        <th>Name</th>
                        <th>Slug</th>
                        <th>Meta Title</th>
                        <th>Meta Keyword</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tfoot>
                      <tr>
                        <th>Name</th>
                        <th>Slug</th>
                        <th>Meta Title</th>
                        <th>Meta Keyword</th>
                        <th>Action</th>
                      </tr>
                    </tfoot>
                    <tbody>
                      {categories.length > 0 &&
                        categories.map((category, index) => (
                          <tr key={index}>
                            <td>{category.name}</td>
                            <td>{category.slug}</td>
                            <td>{category.meta_title}</td>
                            <td>{category.meta_keyword}</td>

                            <td>
                              <Link
                                to={`/admin/category-edit/${category.id}`}
                                className="btn btn-primary mr-1"
                              >
                                Edit
                              </Link>
                              <Link
                                onClick={(e) => handleDelete(e, category.id)}
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

export default CategoryView;
