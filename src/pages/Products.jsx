import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the backend
    axios
      .get("/api/admin/products")
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Our Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            to={`/products/${product._id.toString()}`}
            key={product._id}
            className="border p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white"
          >
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-56 object-cover rounded-t-lg mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {product.title}
            </h2>
            <p className="text-gray-600 text-sm mb-4">{product.description}</p>
            <div className="flex justify-between items-center">
              <p className="text-lg font-bold text-gray-900">
                ${product.price}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-medium">Quantity:</span>{" "}
                {product.quantity}
              </p>
            </div>
            <button className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300">
              Add to Cart
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;
