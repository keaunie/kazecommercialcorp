import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product, addToCart }) {
  return (
    <div className="rounded-2xl border border-neutral-200 p-4 hover:shadow-soft transition">
      {/* Product image & title now link to ProductInfo page */}
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-[4/3] overflow-hidden rounded-xl bg-neutral-100 mb-3 grid place-items-center">
          <img
            src={product.img}
            alt={product.name}
            className="max-h-full object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>
        <h3 className="font-semibold hover:text-brand-600">{product.name}</h3>
        <p className="text-sm text-neutral-600 mt-1 line-clamp-2">
          {product.description}
        </p>
      </Link>

      {/* Price + Add to Cart */}
      <div className="flex items-center justify-between mt-3">
        <span className="font-bold">${product.price}</span>
        <button
          onClick={() => addToCart(product)}
          className="rounded-xl bg-brand-600 px-3 py-2 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
