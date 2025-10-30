// src/pages/ProductInfo.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ProductInfo() {
  const { id } = useParams(); // Get product ID from the URL
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5173/api/products/${id}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <section className="py-16 pt-[10%] min-h-screen flex justify-center items-center">
        <p className="text-neutral-600">Loading product details...</p>
      </section>
    );
  }

  if (error || !product) {
    return (
      <section className="py-16 pt-[10%] min-h-screen flex flex-col items-center justify-center text-center">
        <p className="text-red-600 mb-4">{error || "Product not found."}</p>
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-blue-600 hover:underline"
        >
          Go back
        </button>
      </section>
    );
  }

  return (
    <section className="py-16 pt-[10%] bg-[#f9f9f9] min-h-screen">
      <div className="container mx-auto px-6">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-blue-600 hover:underline mb-6 inline-block"
        >
          ← Back to Products
        </button>

        <div className="flex flex-col lg:flex-row gap-10 bg-white p-6 rounded-2xl shadow-md">
          {/* Product Image */}
          <div className="flex-1 flex justify-center">
            <img
              src={product.img}
              alt={product.name}
              className="w-full max-w-md rounded-xl object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-3">{product.name}</h2>
            <p className="text-xl font-semibold text-green-700 mb-2">
              ${product.price}
            </p>
            <p className="text-yellow-500 mb-4">⭐ {product.rating}</p>
            <p className="text-neutral-700 mb-6">{product.description}</p>

            <button
              className="rounded-xl bg-black px-5 py-3 text-white font-semibold hover:bg-neutral-800"
              onClick={() => alert("Added to cart (demo)!")}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
