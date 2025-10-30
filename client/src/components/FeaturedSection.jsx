import React from "react";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show:  { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const slideLeft = {
  hidden: { opacity: 0, x: -40 },
  show:  { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const slideRight = {
  hidden: { opacity: 0, x: 40 },
  show:  { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show:  { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export default function FeaturedSection() {
  return (
    <section className="relative w-full bg-[#f4f4f4] py-24">
      <motion.div
        className="mx-auto grid items-center gap-20 lg:gap-28 xl:gap-32 md:grid-cols-2 px-6"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        {/* Left: Product Image */}
        <motion.div variants={slideLeft} className="flex justify-center">
          <motion.img
            src="https://res.cloudinary.com/dczzibbkw/image/upload/v1761758865/front-and-back-lg_vgoayc.webp"
            alt="KAZE Powerbank A26"
            className="w-full max-w-lg object-contain rounded-2xl shadow-lg"
            whileHover={{ scale: 1.04, rotate: 0.2 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
          />
        </motion.div>

        {/* Right: Description + Specs */}
        <motion.div variants={slideRight} className="text-neutral-900">
          <motion.h2
            className="text-4xl md:text-5xl font-azonix tracking-wide mb-6"
            variants={fadeIn}
          >
            KAZE A26
          </motion.h2>

          <motion.p
            className="text-lg text-neutral-700 leading-relaxed mb-8 max-w-lg"
            variants={fadeIn}
          >
            Engineered for performance and minimalism — the KAZE Powerbank keeps every
            device charged, anywhere you go. With premium materials, fast USB-C charging,
            and all-day capacity, it’s power you can rely on.
          </motion.p>

          <motion.div
            className="grid grid-cols-2 gap-x-10 gap-y-5 text-sm text-neutral-800"
            variants={stagger}
          >
            {[
              ["Capacity:", "26,800 mAh"],
              ["Output:", "100W USB-C PD"],
              ["Input:", "100W USB-C"],
              ["Ports:", "1 × USB-C, 1 × USB-A"],
              ["Weight:", "450 g"],
              ["Material:", "Aluminum Alloy"],
            ].map(([label, value]) => (
              <motion.div key={label} variants={item}>
                <span className="font-semibold">{label}</span> {value}
              </motion.div>
            ))}
          </motion.div>

          <motion.a
            href="#products"
            className="mt-10 inline-block rounded-xl bg-brand-600 px-8 py-3 text-white font-semibold hover:bg-brand-700 shadow-soft"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15 }}
          >
            Shop Now
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
