import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext.jsx";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  price: Yup.number().required("Price is required").positive("Price must be positive"),
  category: Yup.string().required("Category is required")
});

function AddProduct() {
  const navigate = useNavigate();
  const { addProduct } = useProducts();

  return (
    <div className="add-product">
      <h1>Add New Product</h1>
      <Formik
        initialValues={{ name: "", price: "", category: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          addProduct(values)
            .then(() => {
              resetForm();
              navigate("/");
            })
            .catch((err) => alert(err.message));
        }}
      >
        <Form className="product-form">
          <div>
            <label>Product Name</label>
            <Field name="name" type="text" />
            <ErrorMessage name="name" component="div" className="error-msg" />
          </div>
          <div>
            <label>Price</label>
            <Field name="price" type="number" />
            <ErrorMessage name="price" component="div" className="error-msg" />
          </div>
          <div>
            <label>Category</label>
            <Field name="category" type="text" />
            <ErrorMessage name="category" component="div" className="error-msg" />
          </div>
          <button type="submit">Add Product</button>
        </Form>
      </Formik>
    </div>
  );
}

export default AddProduct;
