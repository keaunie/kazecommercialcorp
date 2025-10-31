// src/pages/ProductsPage.jsx
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

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

  const products = useMemo(
    () => [
      {
        id: 1,
        slug: "kaze-a26",
        name: "KAZE A26 Powerbank",
        img: "https://res.cloudinary.com/dczzibbkw/image/upload/v1761758865/front-and-back-lg_vgoayc.webp",
        description:
          "Engineered for performance and minimalism — with 26,800 mAh capacity, 100W USB-C PD, and lightweight polycarbonate body.",
        status: "available",
      },
      {
        id: 2,
        slug: "kaze-sonic",
        name: "KAZE Sonic Wireless Earbuds",
        img: "https://res.cloudinary.com/dczzibbkw/image/upload/v1761759900/kaze-sonic.webp",
        description:
          "Crystal-clear sound and active noise cancellation in a sleek, ergonomic design. Bluetooth 5.3 and 32-hour battery life.",
        status: "sold-out",
      },
      {
        id: 3,
        slug: "kaze-arc",
        name: "KAZE Arc USB-C Cable (100W)",
        img: "https://res.cloudinary.com/dczzibbkw/image/upload/v1761759901/kaze-arc-cable.webp",
        description:
          "Durable braided nylon cable supporting 100W PD and 480Mbps data transfer — perfect for laptops, tablets, and phones.",
        status: "pre-order",
      },
      {
        id: 4,
        slug: "kaze-volt",
        name: "KAZE Volt Adapter 65W GaN",
        img: "https://res.cloudinary.com/dczzibbkw/image/upload/v1761759902/kaze-volt.webp",
        description:
          "Compact GaN fast charger with dual USB-C + USB-A output. 65W power delivery for laptops, tablets, and smartphones.",
        status: "available",
      },
    ],
    []
  );

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
              <p className="text-neutral-600 text-sm line-clamp-3">{p.description}</p>

              {p.status === "sold-out" && (
                <span className="mt-3 inline-block text-gray-500 text-xs font-medium">
                  Sold Out
                </span>
              )}
              {p.status === "pre-order" && (
                <span className="mt-3 inline-block text-blue-600 text-xs font-medium">
                  Pre-Order Available
                </span>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
