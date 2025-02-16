import React, { useState, useEffect } from "react";
import axios from "axios";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    ptype: "",
    price: "",
    description: "",
    imageUrl: "",
    quantity: "",
  });

  useEffect(() => {
    // Fetch products from the backend
    axios
      .get("/api/admin/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    axios
      .post("/api/admin/add-product", formData)
      .then((response) => {
        alert("Product added successfully!");
        setProducts([...products, response.data.product]);
        setFormData({
          title: "",
          ptype: "",
          price: "",
          description: "",
          imageUrl: "",
          quantity: "",
        });
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      title: product.title,
      ptype: product.ptype,
      price: product.price,
      description: product.description,
      imageUrl: product.imageUrl,
      quantity: product.quantity,
    });
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    axios
      .put("/api/admin/update-product", {
        ...formData,
        productId: editingProduct._id,
      })
      .then((response) => {
        console.log(response);
        alert("Product updated successfully!");
        const updatedProducts = products.map((product) =>
          product._id === editingProduct._id ? response.data.product : product
        );
        setProducts(updatedProducts);
        setEditingProduct(null);
        setFormData({
          name: "",
          title: "",
          ptype: "",
          price: "",
          description: "",
          imageUrl: "",
          quantity: "",
        });
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
  };

  const handleDeleteProduct = (productId) => {
    axios
      .post("/api/admin/delete-product", { productId })
      .then(() => {
        alert("Product deleted successfully!");
        const updatedProducts = products.filter(
          (product) => product._id !== productId
        );
        setProducts(updatedProducts);
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  return (
    <div className="h-screen w-full mx-auto p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Admin Dashboard
      </h1>

      {/* Product Form */}
      <form
        onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
        className="bg-white p-6 rounded-lg shadow-md mb-8"
      >
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          {editingProduct ? "Edit Product" : "Add New Product"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: "title", placeholder: "Title" },
            { name: "ptype", placeholder: "Product Type" },
            { name: "price", placeholder: "Price", type: "number" },
            { name: "description", placeholder: "Description" },
            { name: "imageUrl", placeholder: "Image URL" },
            { name: "quantity", placeholder: "Quantity", type: "number" },
          ].map((field) => (
            <input
              key={field.name}
              type={field.type || "text"}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={handleInputChange}
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          ))}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg mt-6 hover:bg-blue-700 transition-colors duration-300"
        >
          {editingProduct ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-48 object-cover rounded-t-lg mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800">
              {product.title}
            </h2>
            <p className="text-gray-600 text-sm mt-2">{product.description}</p>
            <div className="flex justify-between items-center mt-4">
              <p className="text-lg font-bold text-gray-900">
                ${product.price}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-medium">Quantity:</span>{" "}
                {product.quantity}
              </p>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleEditProduct(product)}
                className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition-colors duration-300"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteProduct(product._id)}
                className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
