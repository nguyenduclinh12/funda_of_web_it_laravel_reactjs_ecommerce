import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../../lib/axios";

const CategoryEdit = () => {
  const navigate = useNavigate();
  const [categoryInput, setCategoryInput] = useState({
    name: "",
    slug: "",
    description: "",
    status: "",
    meta_title: "",
    meta_keyword: "",
    meta_description: "",
    error_list: [],
  });
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`api/category-edit/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setCategoryInput((prevCategoryInput) => ({
            //Sao chép tất cả các thuộc tính của categoryInput vào object mới
            ...prevCategoryInput,
            // Ghi đè các thuộc tính của res.data lên các thuộc tính cũ của categoryInput nếu chúng trùng tên.
            ...res.data.data,
          }));
        }
      })
      .catch((err) => {
        console.log(err.response.errors);
      });
  }, [id]);

  const handleChange = (e) => {
    setCategoryInput((prevCategoryInput) => ({
      ...prevCategoryInput,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      slug: categoryInput.slug,
      name: categoryInput.name,
      description: categoryInput.description,
      status: categoryInput.status,
      meta_title: categoryInput.meta_title,
      meta_keyword: categoryInput.meta_keyword,
      meta_description: categoryInput.meta_description,
    };
    axios
      .patch(`api/category/${id}`, data)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
        } else if (res.data.status === 422) {
          setCategoryInput({ ...categoryInput, error_list: res.data.errors });
        }
      })
      .catch((err) => {
        if (err.response.data.status === 422) {
          setCategoryInput({
            ...categoryInput,
            error_list: err.response.data.errors,
          });
        }
      });
  };

  
  let display_error = [];
  if (Object.keys(categoryInput.error_list).length) {
    display_error = [
      categoryInput.error_list.slug,
      categoryInput.error_list.name,
      categoryInput.error_list.meta_title,
    ];
  }
  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Category</h1>
      {display_error.length > 0 ? (
        <ul>
          {display_error
            .filter((item) => item !== undefined)
            .map((item, index) => (
              <li key={index}>
                <span className="text-danger">{item}</span>
              </li>
            ))}
        </ul>
      ) : (
        ""
      )}

      <form action="" onSubmit={handleSubmit}>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="home-tab"
              data-bs-toggle="tab"
              data-bs-target="#home-tab-pane"
              type="button"
              role="tab"
              aria-controls="home-tab-pane"
              aria-selected="true"
            >
              Home
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="seo-tab"
              data-bs-toggle="tab"
              data-bs-target="#seo-tab-pane"
              type="button"
              role="tab"
              aria-controls="seo-tab-pane"
              aria-selected="false"
            >
              SEO
            </button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane card-body fade show active"
            id="home-tab-pane"
            role="tabpanel"
            aria-labelledby="home-tab"
            tabIndex="0"
          >
            <div className="form-group mb-3">
              <label htmlFor="">Slug</label>
              <input
                type="text"
                className="form-control"
                name="slug"
                onChange={handleChange}
                value={categoryInput.slug}
              />
              {categoryInput.error_list?.slug ? (
                <span className="text-danger">
                  {categoryInput.error_list.slug}
                </span>
              ) : (
                ""
              )}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                onChange={handleChange}
                value={categoryInput.name}
              />
              {categoryInput.error_list?.name ? (
                <span className="text-danger">
                  {categoryInput.error_list.name}
                </span>
              ) : (
                ""
              )}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="">Description</label>
              <input
                type="text"
                className="form-control"
                name="description"
                onChange={handleChange}
                value={categoryInput.description}
              />
              {categoryInput.error_list?.description ? (
                <span className="text-danger">
                  {categoryInput.error_list.description}
                </span>
              ) : (
                ""
              )}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="">Status</label>
              <input
                type="checkbox"
                name="status"
                onChange={handleChange}
                value={categoryInput.status}
              />{" "}
              Status 0=show/1=hidden
              {categoryInput.error_list?.status ? (
                <span className="text-danger">
                  {categoryInput.error_list.status}
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="seo-tab-pane"
            role="tabpanel"
            aria-labelledby="seo-tab"
            tabIndex="0"
          >
            <div className="form-group mb-3">
              <label htmlFor="">Meta Title</label>
              <input
                type="text"
                className="form-control"
                name="meta_title"
                onChange={handleChange}
                value={categoryInput.meta_title}
              />
              {categoryInput.error_list?.meta_title ? (
                <span className="text-danger">
                  {categoryInput.error_list.meta_title}
                </span>
              ) : (
                ""
              )}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="">Meta Keywords</label>
              <textarea
                className="form-control"
                name="meta_keyword"
                onChange={handleChange}
                value={categoryInput.meta_keyword}
              ></textarea>
              {categoryInput.error_list?.meta_keyword ? (
                <span className="text-danger">
                  {categoryInput.error_list.meta_keyword}
                </span>
              ) : (
                ""
              )}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="">Meta Description</label>
              <textarea
                className="form-control"
                name="meta_description"
                onChange={handleChange}
                value={categoryInput.meta_description}
              ></textarea>
              {categoryInput.error_list?.meta_description ? (
                <span className="text-danger">
                  {categoryInput.error_list.meta_description}
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <button className="btn btn-primary px-4 float-end" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CategoryEdit;
