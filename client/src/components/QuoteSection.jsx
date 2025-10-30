import React from "react";
import { motion } from "framer-motion";

export default function QuoteSection() {
    return (
        <section className="relative flex h-[60vh] w-full items-center justify-center bg-[#f4f4f4] text-center overflow-hidden">
            <motion.div
                className="max-w-3xl px-6"
                initial={{ opacity: 0, y: 40, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
            >
                <p className="text-3xl md:text-5xl font-light text-neutral leading-snug">
                    “Minimalist technology accessories built for everyday life”
                </p>
                <motion.span
                    className="mt-6 block text-lg text-neutral-400 tracking-wide"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    — KAZE PH
                </motion.span>
            </motion.div>
        </section>
    );
}
