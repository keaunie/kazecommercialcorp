import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const currency = (n) =>
  new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(n);

export default function OrderModal({
  isOpen,
  onClose,
  product,
  quantity = 1,
  setQuantity,
  defaultChannel = "whatsapp",
  businessWhatsApp = "639176380603",
  formEndpoint = "",
}) {
  const [channel, setChannel] = useState(defaultChannel);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setChannel(defaultChannel);
      setName("");
      setEmail("");
      setPhone("");
      setAddress("");
    }
  }, [isOpen, defaultChannel]);

  // --- Price parsing & computation ---
  const parsePrice = (p) => Number((p || "₱0").replace(/[₱,]/g, "")) || 0;
  const unitPrice = useMemo(() => {
    if (!product) return 0;
    return parsePrice(
      product.discounted ? product.discountPriceDirect : product.priceDirect
    );
  }, [product]);

  const total = useMemo(() => unitPrice * quantity, [unitPrice, quantity]);

  if (!product) return null;

  // --- WhatsApp message ---
  const waText = encodeURIComponent(
    [
      product.status === "pre-order"
        ? `Hi KAZE Team! I'd like to place a *pre-order*:`
        : `Hi KAZE Team! I'd like to place an order:`,
      `• Product: ${product.name}`,
      `• Quantity: ${quantity}`,
      `• Unit Price: ${currency(unitPrice)}`,
      `• Total: ${currency(total)}`,
      name && `• Name: ${name}`,
      phone && `• Phone: ${phone}`,
      email && `• Email: ${email}`,
      address && `• Address: ${address}`,
      `— Sent from KAZE site`,
    ]
      .filter(Boolean)
      .join("\n")
  );

  const waHref = `https://wa.me/${businessWhatsApp}?text=${waText}`;

  // --- Form submission handler ---
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      alert("Please fill in name, email, and phone.");
      return;
    }

    if (formEndpoint) {
      try {
        const res = await fetch(formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            product: product.name,
            qty: quantity,
            unitPrice,
            total,
            name,
            email,
            phone,
            address,
            channel,
            preOrder: product.status === "pre-order",
          }),
        });
        if (!res.ok) throw new Error("Form submission failed");
        alert(
          product.status === "pre-order"
            ? "✅ Pre-order submitted! We’ll contact you once available."
            : "✅ Order submitted! We’ll contact you shortly."
        );
        onClose?.();
      } catch (err) {
        console.error(err);
        alert("❌ Could not submit the form. Please try again or use WhatsApp.");
      }
      return;
    }

    console.log("ORDER_FORM_PAYLOAD", {
      product: product.name,
      qty: quantity,
      unitPrice,
      total,
      name,
      email,
      phone,
      address,
      channel,
      preOrder: product.status === "pre-order",
    });

    alert(
      product.status === "pre-order"
        ? "✅ Pre-order captured locally (add a real endpoint to process)."
        : "✅ Order captured locally (add a real endpoint to process)."
    );
    onClose?.();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative z-[101] w-[92%] max-w-3xl rounded-3xl bg-white shadow-2xl overflow-hidden"
            initial={{ y: 24, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 16, scale: 0.98, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
          >
            {/* Header */}
            <div className="relative h-28 bg-gradient-to-r from-neutral-900 to-neutral-700 text-white flex items-center justify-center">
              <h2 className="text-xl md:text-2xl font-semibold">
                {product.status === "pre-order"
                  ? "Complete Your Pre-Order"
                  : "Complete Your Order"}
              </h2>
            </div>

            {/* Product Info */}
            <div className="p-6 flex flex-col md:flex-row gap-6">
              <div className="md:w-40 flex-shrink-0">
                <img
                  src={product.img}
                  alt={product.name}
                  className="rounded-2xl border border-neutral-200 w-full aspect-square object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                  {product.name}
                  {product.status === "pre-order" && (
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                      Pre-Order
                    </span>
                  )}
                </h3>
                <p className="text-sm text-neutral-600 mb-4">
                  {product.description}
                </p>

                {/* Price Info */}
                <div className="flex flex-wrap gap-3 text-sm">
                  {product.discounted ? (
                    <span className="px-3 py-1 rounded-full bg-red-50 border border-red-200">
                      Direct Price:{" "}
                      <strong className="text-red-600">
                        {product.discountPriceDirect}
                      </strong>{" "}
                      <span className="line-through opacity-60">
                        {product.priceDirect}
                      </span>
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200">
                      Direct Price: <strong>{product.priceDirect}</strong>
                    </span>
                  )}
                  <span className="px-3 py-1 rounded-full bg-green-50 border border-green-200">
                    Same Price via WhatsApp / Form
                  </span>
                </div>
              </div>
            </div>

            {/* Order Form */}
            <form onSubmit={handleFormSubmit} className="px-6 pb-6">
              {/* Channel + Quantity */}
              <div className="grid gap-4 md:grid-cols-3">
                <div className="md:col-span-2">
                  <label className="text-sm font-medium">Order Channel</label>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setChannel("whatsapp")}
                      className={`rounded-xl border px-4 py-2 text-sm font-medium ${
                        channel === "whatsapp"
                          ? "bg-green-600 text-white border-green-600"
                          : "bg-white text-neutral-800 border-neutral-300 hover:bg-neutral-50"
                      }`}
                    >
                      WhatsApp
                    </button>
                    <button
                      type="button"
                      onClick={() => setChannel("form")}
                      className={`rounded-xl border px-4 py-2 text-sm font-medium ${
                        channel === "form"
                          ? "bg-black text-white border-black"
                          : "bg-white text-neutral-800 border-neutral-300 hover:bg-neutral-50"
                      }`}
                    >
                      Direct Form
                    </button>
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label className="text-sm font-medium">Quantity</label>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="h-10 w-10 rounded-xl border border-neutral-300 hover:bg-neutral-50"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min={1}
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(Math.max(1, Number(e.target.value) || 1))
                      }
                      className="w-16 text-center rounded-xl border border-neutral-300 h-10"
                    />
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="h-10 w-10 rounded-xl border border-neutral-300 hover:bg-neutral-50"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Buyer Info */}
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">Full Name *</label>
                  <input
                    className="mt-2 w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Juan Dela Cruz"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Email *</label>
                  <input
                    type="email"
                    className="mt-2 w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Phone *</label>
                  <input
                    className="mt-2 w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    placeholder="+63 9xx xxx xxxx"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Shipping Address</label>
                  <input
                    className="mt-2 w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="House/Unit, Street, City, Province, ZIP"
                  />
                </div>
              </div>

              {/* Summary + Actions */}
              <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="text-sm">
                  <div>
                    Unit Price:{" "}
                    <strong className="text-red-600">{currency(unitPrice)}</strong>
                  </div>
                  <div>
                    Qty: <strong>{quantity}</strong>
                  </div>
                  <div className="text-lg mt-1">
                    Total:{" "}
                    <strong className="text-green-700">{currency(total)}</strong>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  {channel === "whatsapp" ? (
                    <a
                      href={waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl bg-green-600 px-5 py-3 text-white font-semibold text-sm hover:bg-green-700 text-center"
                    >
                      {product.status === "pre-order"
                        ? "Pre-Order via WhatsApp"
                        : "Place Order via WhatsApp"}
                    </a>
                  ) : (
                    <button
                      type="submit"
                      className="rounded-xl bg-black px-5 py-3 text-white font-semibold text-sm hover:bg-neutral-800"
                    >
                      {product.status === "pre-order"
                        ? "Submit Pre-Order"
                        : "Submit Direct Order"}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-xl border border-neutral-300 px-5 py-3 text-sm font-medium hover:bg-neutral-50"
                  >
                    Close
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
