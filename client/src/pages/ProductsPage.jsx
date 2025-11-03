// src/pages/ProductsPage.jsx
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import products from "../data/products.json";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export default function ProductsPage() {
  const navigate = useNavigate();

  return (
    <section className="py-24 pt-32 bg-[#f9f9f9] min-h-screen">
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-4xl md:text-5xl font-azonix tracking-wide mb-12 text-center"
          initial="hidden"
          whileInView="show"
          variants={fadeIn}
        >
          Shop KAZE Products
        </motion.h2>

        <motion.div
          className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          {products.map((p) => (
            <motion.div
              key={p.id}
              className="bg-white rounded-3xl shadow-lg p-5 flex flex-col cursor-pointer hover:shadow-2xl transition"
              variants={item}
              whileHover={{ y: -4 }}
              onClick={() => navigate(`/products/${p.slug}`)}
            >
              <motion.img
                src={p.img}
                alt={p.name}
                className="w-full aspect-square object-contain rounded-2xl mb-4"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
              />
              <h3 className="text-xl font-semibold mb-2">{p.name}</h3>
              <p className="text-neutral-600 text-sm line-clamp-3 mb-3">
                {p.description}
              </p>

              {/* ✅ Price Display */}
              <div className="flex items-center gap-2 mb-2">
                {p.discounted ? (
                  <>
                    <span className="text-lg font-semibold text-emerald-700">
                      {p.discountPriceDirect || p.discountPriceShopee}
                    </span>
                    <span className="text-sm text-neutral-500 line-through">
                      {p.priceDirect || p.priceShopee}
                    </span>
                  </>
                ) : (
                  <span className="text-lg font-semibold text-neutral-800">
                    {p.priceDirect || p.priceShopee}
                  </span>
                )}
              </div>

              {/* ✅ Status Label */}
              {p.status === "available" && (
                <span className="inline-block text-emerald-600 text-xs font-medium">
                  Available
                </span>
              )}
              {p.status === "pre-order" && (
                <span className="inline-block text-blue-600 text-xs font-medium">
                  Pre-Order Available
                </span>
              )}
              {p.status === "sold-out" && (
                <span className="inline-block text-gray-500 text-xs font-medium">
                  Sold Out
                </span>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
