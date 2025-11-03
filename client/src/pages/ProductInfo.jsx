import React, { useMemo, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import OrderModal from "../components/OrderModal";
import products from "../data/products.json";


// 🔧 Update this once to change your WhatsApp number everywhere
const BUSINESS_WHATSAPP = "639260163205";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function ProductInfo() {
  const { slug } = useParams();

  const product = products.find((p) => p.slug === slug);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [preorderProof, setPreorderProof] = useState(null);

  useEffect(() => {
    setActiveIndex(0);
    setQuantity(1);
  }, [product]);

  if (!product) return <p className="text-center py-24">Product not found</p>;

  const finalDirectPrice = product.discounted
    ? product.discountPriceDirect
    : product.priceDirect;

  const finalShopeePrice = product.discounted
    ? product.discountPriceShopee
    : product.priceShopee;

  const whatsappLink = `https://wa.me/${BUSINESS_WHATSAPP}?text=${encodeURIComponent(
    `Hi KAZE Team! I'm interested in ordering the ${product.name}.`
  )}`;

  // 🧾 Handle Pre-order Submit
  const handlePreorderSubmit = (e) => {
    e.preventDefault();
    alert("✅ Pre-order form submitted with proof of payment!");
    setPreorderProof(null);
  };

  return (
    <section className="py-24 pt-32 bg-[#f9f9f9]">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row gap-12">
        {/* --- IMAGE VIEWER --- */}
        <motion.div
          className="flex-1 flex flex-col items-center"
          initial="hidden"
          whileInView="show"
          variants={fadeIn}
        >
          <div className="relative w-full max-w-lg overflow-hidden rounded-3xl shadow-lg bg-white">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeIndex}
                src={product.gallery?.[activeIndex] || product.img}
                alt={product.name}
                className="w-full aspect-square object-contain"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
              />
            </AnimatePresence>
          </div>
        </motion.div>

        {/* --- PRODUCT DETAILS --- */}
        <motion.div
          className="flex-1 text-neutral-900"
          initial="hidden"
          whileInView="show"
          variants={fadeIn}
        >
          <h1 className="text-4xl md:text-5xl font-azonix tracking-wide mb-6">{product.name}</h1>
          <p className="text-lg text-neutral-700 mb-8">{product.description}</p>

          <div className="grid grid-cols-2 gap-x-10 gap-y-4 text-sm text-neutral-800 mb-6">
            {product.specs?.map(([label, value]) => (
              <div key={label}>
                <span className="font-semibold">{label}</span> {value}
              </div>
            ))}
          </div>

          {/* --- QUANTITY --- */}
          <div className="mb-6">
            <label className="text-sm font-medium">Quantity:</label>
            <div className="mt-2 flex items-center gap-2">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="h-10 w-10 rounded-xl border border-neutral-300 hover:bg-neutral-100"
              >
                −
              </button>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                className="w-16 text-center rounded-xl border border-neutral-300 h-10"
              />
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="h-10 w-10 rounded-xl border border-neutral-300 hover:bg-neutral-100"
              >
                +
              </button>
            </div>
          </div>

          {/* --- PRICE --- */}
          <div className="text-sm mb-4 space-y-2">
            <p className="text-emerald-700">
              <span className="font-semibold">Direct Price:</span>{" "}
              {product.discounted ? (
                <>
                  <span className="line-through opacity-60">{product.priceDirect}</span>{" "}
                  <span className="text-green-700 font-semibold">
                    {product.discountPriceDirect}
                  </span>
                </>
              ) : (
                product.priceDirect
              )}
            </p>
            <p className="text-orange-600">
              <span className="font-semibold">Shopee Price:</span>{" "}
              {product.discounted ? (
                <>
                  <span className="line-through opacity-60">{product.priceShopee}</span>{" "}
                  <span className="text-orange-700 font-semibold">
                    {product.discountPriceShopee}
                  </span>
                </>
              ) : (
                product.priceShopee
              )}
            </p>
          </div>

          {/* --- BUTTONS --- */}
          <div className="flex flex-wrap gap-3">
            {product.status === "available" && (
              <>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-xl bg-green-600 text-white text-sm px-4 py-2 text-center font-medium hover:bg-green-700"
                >
                  Order via WhatsApp
                </a>
                <button
                  onClick={() => setModalOpen(true)}
                  className="flex-1 rounded-xl border border-neutral-300 text-sm px-4 py-2 text-center font-medium hover:bg-neutral-100"
                >
                  Order Form
                </button>
                <a
                  href={product.shopee}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-xl bg-orange-500 text-white text-sm px-4 py-2 text-center font-medium hover:bg-orange-600"
                >
                  Order via Shopee
                </a>
              </>
            )}

            {/* 🟡 PRE-ORDER OPTION */}
            {product.status === "pre-order" && (
              <form onSubmit={handlePreorderSubmit} className="flex flex-col gap-3 w-full">
                <p className="text-sm text-blue-700">
                  This item is available for <strong>pre-order</strong>. Please upload proof of
                  payment below:
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPreorderProof(e.target.files[0])}
                  required
                  className="border border-neutral-300 rounded-lg p-2 text-sm"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 text-white text-sm px-4 py-2 text-center font-medium hover:bg-blue-700"
                >
                  Submit Pre-Order
                </button>
              </form>
            )}
          </div>

          <Link to="/products" className="mt-8 inline-block text-sm text-blue-600 hover:underline">
            ← Back to Products
          </Link>
        </motion.div>
      </div>

      {/* --- ORDER MODAL --- */}
      <OrderModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        product={product}
        quantity={quantity}
        setQuantity={setQuantity}
        businessWhatsApp={BUSINESS_WHATSAPP}
      />
    </section>
  );
}
