import React, { useEffect, useState } from "react";
import axios from "../../../lib/axios";
import { useNavigate } from "react-router-dom";

const ProductCreate = () => {
  const [categories, setCategories] = useState([]);
  const [imageSelect, setImageSelect] = useState([]);
  const [productInput, setProductInput] = useState({
    category_id: null,
    meta_title: "",
    meta_keyword: "",
    meta_description: "",
    slug: "",
    name: "",
    description: "",
    brand: "",
    sale_price: 0,
    cost_price: 0,
    qty: 0,
    featured: false,
    status: false,
    popular: false,
    error_list: [],
  });
  const navigate = useNavigate();
  // const [productInput, setProductInput] = useState({
  //   category_id: 1,
  //   meta_title: "fdsfds",
  //   meta_keyword: "fdsfds",
  //   meta_description: "fdsfsdf",
  //   slug: "fdsf",
  //   name: "fdsfds",
  //   description: "fdsf",
  //   brand: "fdsfds",
  //   sale_price: 34,
  //   cost_price: 23,
  //   qty: 3,
  //   featured: false,
  //   status: false,
  //   popular: false,
  //   error_list: [],
  // });
  useEffect(() => {
    axios
      .get("api/category")
      .then((res) => {
        if (res.status === 200) {
          setCategories(res.data);
        }
        console.log(res);
      })
      .catch((err) => {});
  }, []);

  const handleChange = (e) => {
    setProductInput((prevProductInput) => ({
      ...prevProductInput,
      [e.target.name]: e.target.value,
    }));
  };
  const handleClick = (e) => {
    setProductInput((prevProductInput) => ({
      ...prevProductInput,
      [e.target.name]: e.target.checked,
    }));
  };
  const handleImageUpload = (e) => {
    setImageSelect({ image: e.target.files });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (imageSelect.image?.length > 0) {
      for (let i = 0; i < imageSelect.image.length; i++) {
        formData.append("image[]", imageSelect.image[i]); // Sử dụng "image[]" để Laravel nhận diện là mảng file
      }
    }

    formData.append("category_id", productInput.category_id);
    formData.append("meta_title", productInput.meta_title);
    formData.append("meta_keyword", productInput.meta_keyword);
    formData.append("meta_description", productInput.meta_description);
    formData.append("slug", productInput.slug);
    formData.append("name", productInput.name);
    formData.append("description", productInput.description);
    formData.append("brand", productInput.brand);
    formData.append("sale_price", productInput.sale_price);
    formData.append("cost_price", productInput.cost_price);
    formData.append("qty", productInput.qty);
    formData.append("featured", productInput.featured);
    formData.append("popular", productInput.popular);
    formData.append("status", productInput.status);

    axios
      .post("api/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          navigate("/admin/product-list");
        } 
      })
      .catch((err) => {
        console.log(err);
        setProductInput({
          ...productInput,
          error_list: err.response.data.errors,
        });
      });
  };
  let display_error = [];
  if (Object.keys(productInput.error_list).length) {
    display_error = [
      productInput.error_list.category_id,
      productInput.error_list.slug,
      productInput.error_list.name,
      productInput.error_list.meta_title,
      productInput.error_list.brand,
      productInput.error_list.sale_price,
      productInput.error_list.cost_price,
      productInput.error_list.qty,
      productInput.error_list.image,
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

      <form action="" onSubmit={handleSubmit} encType="multipart/form-data">
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
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="other-tab"
              data-bs-toggle="tab"
              data-bs-target="#other-tab-pane"
              type="button"
              role="tab"
              aria-controls="other-tab-pane"
              aria-selected="false"
            >
              Other Details
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
              <label htmlFor="">Select Category</label>
              <select
                className="form-control"
                name="category_id"
                id=""
                onChange={handleChange}
              >
                <option value="-1">[Select Category]</option>
                {categories?.length > 0 &&
                  categories.map((category, index) => (
                    <option key={index} value={category.id}>
                      {category.name}
                    </option>
                  ))}
              </select>
              {productInput.error_list?.category_id ? (
                <span className="text-danger">
                  {productInput.error_list.category_id}
                </span>
              ) : (
                ""
              )}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="">Slug</label>
              <input
                className="form-control"
                type="text"
                name="slug"
                value={productInput.slug}
                onChange={handleChange}
              />
              {productInput.error_list?.slug ? (
                <span className="text-danger">
                  {productInput.error_list.slug}
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
                value={productInput.name}
              />
              {productInput.error_list?.name ? (
                <span className="text-danger">
                  {productInput.error_list.name}
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
                value={productInput.description}
              />
              {productInput.error_list?.description ? (
                <span className="text-danger">
                  {productInput.error_list.description}
                </span>
              ) : (
                ""
              )}
            </div>
            <button className="btn btn-primary px-4 float-end" type="submit">
              Submit
            </button>
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
                value={productInput.meta_title}
              />
              {productInput.error_list?.meta_title ? (
                <span className="text-danger">
                  {productInput.error_list.meta_title}
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
                value={productInput.meta_keyword}
              ></textarea>
              {productInput.error_list?.meta_keyword ? (
                <span className="text-danger">
                  {productInput.error_list.meta_keyword}
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
                value={productInput.meta_description}
              ></textarea>
              {productInput.error_list?.meta_description ? (
                <span className="text-danger">
                  {productInput.error_list.meta_description}
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
          {/* other tab */}
          <div
            className="tab-pane fade"
            id="other-tab-pane"
            role="tabpanel"
            aria-labelledby="other-tab"
            tabIndex="0"
          >
            <div className="row">
              <div className="col-md-4 form-group mb-3">
                <label htmlFor="">Sale Price</label>
                <input
                  type="text"
                  className="form-control"
                  name="sale_price"
                  onChange={handleChange}
                  value={productInput.sale_price}
                />
                {productInput.error_list?.sale_price ? (
                  <span className="text-danger">
                    {productInput.error_list.sale_price}
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div className="col-md-4 form-group mb-3">
                <label htmlFor="">Cost Price</label>
                <input
                  type="text"
                  className="form-control"
                  name="cost_price"
                  onChange={handleChange}
                  value={productInput.cost_price}
                />
                {productInput.error_list?.cost_price ? (
                  <span className="text-danger">
                    {productInput.error_list.cost_price}
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div className="col-md-4 form-group mb-3">
                <label htmlFor="">Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  name="qty"
                  onChange={handleChange}
                  value={productInput.qty}
                />
                {productInput.error_list?.qty ? (
                  <span className="text-danger">
                    {productInput.error_list.qty}
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group col-md-4  mb-3">
                <label htmlFor="">Brand</label>
                <input
                  type="text"
                  className="form-control"
                  name="brand"
                  onChange={handleChange}
                  value={productInput.brand}
                />
                {productInput.error_list?.brand ? (
                  <span className="text-danger">
                    {productInput.error_list.brand}
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group col-md-8  mb-3">
                <label htmlFor="">Image</label>
                <input
                  className="form-control"
                  type="file"
                  id="formFileMultiple"
                  name="image[]"
                  multiple
                  onChange={handleImageUpload}
                />
                {productInput.error_list?.image ? (
                  <span className="text-danger">
                    {productInput.error_list.image}
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div className="col-md-4 form-group  mb-3">
                <label htmlFor="">Featured (checked=shown)</label>
                <input
                  type="checkbox"
                  name="featured"
                  className="w-50 h-50"
                  onClick={handleClick}
                />
                {productInput.error_list?.featured ? (
                  <span className="text-danger">
                    {productInput.error_list.featured}
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div className="col-md-4 form-group  mb-3">
                <label htmlFor="">Popular (checked=shown)</label>
                <input
                  type="checkbox"
                  name="popular"
                  className="w-50 h-50"
                  onClick={handleClick}
                />
                {productInput.error_list?.popular ? (
                  <span className="text-danger">
                    {productInput.error_list.popular}
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div className="col-md-4 form-group mb-3">
                <label htmlFor="">Status (checked=Hidden)</label>
                <input
                  type="checkbox"
                  name="status"
                  className="w-50 h-50"
                  onClick={handleClick}
                />
                {productInput.error_list?.status ? (
                  <span className="text-danger">
                    {productInput.error_list.status}
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          {/* end other tab */}
        </div>
      </form>
    </div>
  );
};

export default ProductCreate;
