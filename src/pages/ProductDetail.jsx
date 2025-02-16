import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetail = () => {
  const { productId } = useParams(); // Get productId from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch product details from the backend
    axios
      .get(`/api/admin/product/${productId}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setError("Failed to load product details.");
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-xl">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Product Image */}
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-96 object-cover"
        />

        {/* Product Details */}
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {product.title}
          </h1>
          <p className="text-gray-600 text-lg mb-4">{product.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-gray-700 font-semibold">Product Type:</p>
              <p className="text-gray-600">{product.ptype}</p>
            </div>
            <div>
              <p className="text-gray-700 font-semibold">Price:</p>
              <p className="text-gray-600">${product.price}</p>
            </div>
            <div>
              <p className="text-gray-700 font-semibold">Quantity:</p>
              <p className="text-gray-600">{product.quantity}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300">
              Add to Cart
            </button>
            <button className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-300">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
