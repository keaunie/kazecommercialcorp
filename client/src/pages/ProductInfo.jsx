// src/pages/ProductInfo.jsx
import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import OrderModal from "../components/OrderModal";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function ProductInfo() {
  const { slug } = useParams();

  const products = useMemo(
    () => [
      {
        id: 1,
        slug: "kaze-a26",
        name: "KAZE A26 Powerbank",
        img: "https://res.cloudinary.com/dczzibbkw/image/upload/v1761758865/front-and-back-lg_vgoayc.webp",
        description:
          "Engineered for performance and minimalism — with 26,800 mAh capacity, 100W USB-C PD, and lightweight polycarbonate body.",
        specs: [
          ["Capacity:", "26,800 mAh"],
          ["Output:", "100W USB-C PD"],
          ["Input:", "100W USB-C"],
          ["Ports:", "1 × USB-C, 1 × USB-A"],
          ["Weight:", "450 g"],
          ["Material:", "Polycarbonate"],
        ],
        priceShopee: "₱2,999",
        priceDirect: "₱2,499",
        shopee: "https://shopee.ph/product/kaze-a26-powerbank",
        whatsapp:
          "https://wa.me/639171234567?text=Hi%20KAZE%20Team!%20I'm%20interested%20in%20ordering%20the%20KAZE%20A26%20Powerbank%20(₱2,499%20via%20WhatsApp).",
        status: "available",
      },
      {
        id: 2,
        slug: "kaze-sonic",
        name: "KAZE Sonic Wireless Earbuds",
        img: "https://res.cloudinary.com/dczzibbkw/image/upload/v1761759900/kaze-sonic.webp",
        description:
          "Crystal-clear sound and active noise cancellation in a sleek, ergonomic design. Bluetooth 5.3 and 32-hour battery life.",
        specs: [
          ["Battery Life:", "32 hours"],
          ["Connectivity:", "Bluetooth 5.3"],
          ["ANC:", "Active Noise Cancellation"],
          ["Weight:", "55 g"],
          ["Charging Case:", "Yes, 3 full charges"],
        ],
        priceShopee: "₱1,799",
        priceDirect: "₱1,499",
        shopee: "https://shopee.ph/product/kaze-sonic",
        whatsapp:
          "https://wa.me/639171234567?text=Hi%20KAZE%20Team!%20I'd%20like%20to%20order%20the%20KAZE%20Sonic%20Earbuds%20(₱1,499%20via%20WhatsApp).",
        status: "sold-out",
      },
      {
        id: 3,
        slug: "kaze-arc",
        name: "KAZE Arc USB-C Cable (100W)",
        img: "https://res.cloudinary.com/dczzibbkw/image/upload/v1761759901/kaze-arc-cable.webp",
        description:
          "Durable braided nylon cable supporting 100W PD and 480Mbps data transfer — perfect for laptops, tablets, and phones.",
        specs: [
          ["Length:", "1 m"],
          ["Power:", "100W PD"],
          ["Data Transfer:", "480 Mbps"],
          ["Material:", "Braided Nylon"],
          ["Compatibility:", "USB-C devices"],
        ],
        priceShopee: "₱499",
        priceDirect: "₱399",
        shopee: "https://shopee.ph/product/kaze-arc-cable",
        whatsapp:
          "https://wa.me/639171234567?text=Hi%20KAZE%20Team!%20I'd%20like%20to%20order%20the%20KAZE%20Arc%20Cable%20(₱399%20via%20WhatsApp).",
        status: "pre-order",
      },
      {
        id: 4,
        slug: "kaze-volt",
        name: "KAZE Volt Adapter 65W GaN",
        img: "https://res.cloudinary.com/dczzibbkw/image/upload/v1761759902/kaze-volt.webp",
        description:
          "Compact GaN fast charger with dual USB-C + USB-A output. 65W power delivery for laptops, tablets, and smartphones.",
        specs: [
          ["Output:", "65W Max"],
          ["Ports:", "2 × USB-C, 1 × USB-A"],
          ["Input:", "100-240V AC"],
          ["Weight:", "120 g"],
          ["Material:", "Aluminum + Polycarbonate"],
        ],
        priceShopee: "₱1,399",
        priceDirect: "₱1,199",
        shopee: "https://shopee.ph/product/kaze-volt",
        whatsapp:
          "https://wa.me/639171234567?text=Hi%20KAZE%20Team!%20I'd%20like%20to%20order%20the%20KAZE%20Volt%2065W%20Adapter%20(₱1,199%20via%20WhatsApp).",
        status: "available",
      },
      // add the rest of your products here...
    ],
    []
  );

  const product = products.find((p) => p.slug === slug);

  const [modalOpen, setModalOpen] = React.useState(false);

  if (!product) return <p className="text-center py-24">Product not found</p>;

  return (
    <section className="py-24 pt-32 bg-[#f9f9f9]">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row gap-12">
        {/* Image */}
        <motion.div
          className="flex-1 flex justify-center"
          initial="hidden"
          whileInView="show"
          variants={fadeIn}
        >
          <motion.img
            src={product.img}
            alt={product.name}
            className="rounded-3xl shadow-lg max-w-lg w-full object-contain"
            whileHover={{ scale: 1.03 }}
          />
        </motion.div>

        {/* Info */}
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

          <p className="text-neutral-800 text-sm mb-1">
            <span className="font-semibold">Shopee:</span> {product.priceShopee}
          </p>
          <p className="text-emerald-700 text-sm mb-4">
            <span className="font-semibold">Direct via WhatsApp/Form:</span> {product.priceDirect}
          </p>

          <div className="flex flex-wrap gap-3">
            {product.status === "available" && (
              <>
                <a
                  href={product.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-xl bg-green-600 text-white text-sm px-4 py-2 text-center font-medium hover:bg-green-700"
                >
                  Order via WhatsApp
                </a>
                <a
                  href={product.shopee}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-xl bg-orange-500 text-white text-sm px-4 py-2 text-center font-medium hover:bg-orange-600"
                >
                  Buy on Shopee
                </a>
                <button
                  onClick={() => setModalOpen(true)}
                  className="flex-1 rounded-xl border border-neutral-300 text-sm px-4 py-2 text-center font-medium hover:bg-neutral-100"
                >
                  Order Form
                </button>
              </>
            )}
            {product.status === "sold-out" && (
              <button
                className="flex-1 rounded-xl bg-gray-400 text-white text-sm px-4 py-2 text-center font-medium cursor-not-allowed"
                disabled
              >
                Sold Out
              </button>
            )}
            {product.status === "pre-order" && (
              <button
                onClick={() => setModalOpen(true)}
                className="flex-1 rounded-xl bg-blue-600 text-white text-sm px-4 py-2 text-center font-medium hover:bg-blue-700"
              >
                Pre-Order / Request
              </button>
            )}
          </div>

          <Link to="/products" className="mt-8 inline-block text-sm text-blue-600 hover:underline">
            ← Back to Products
          </Link>
        </motion.div>
      </div>

      <OrderModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        product={product}
        defaultChannel="whatsapp"
        businessWhatsApp="639171234567"
        formEndpoint=""
      />
    </section>
  );
}
