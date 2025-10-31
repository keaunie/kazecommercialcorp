// src/components/OrderModal.jsx
import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const currency = (n) =>
  new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(n);

export default function OrderModal({
  isOpen,
  onClose,
  product,
  defaultChannel = "whatsapp", // "whatsapp" | "form"
  businessWhatsApp = "639171234567", // change to your number (no +)
  formEndpoint = "", // optional: e.g. https://formspree.io/f/xxxxxxx
}) {
  const [channel, setChannel] = useState(defaultChannel);
  const [qty, setQty] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setChannel(defaultChannel);
      setQty(1);
      setName("");
      setEmail("");
      setPhone("");
      setAddress("");
    }
  }, [isOpen, defaultChannel]);

  const unitPrice = useMemo(() => {
    // use product.priceDirect (cheaper) in modal for both WhatsApp/Form
    if (!product) return 0;
    const clean = (product.priceDirect || "₱0").replace(/[₱,]/g, "");
    return Number(clean) || 0;
  }, [product]);

  const total = useMemo(() => unitPrice * qty, [unitPrice, qty]);

  if (!product) return null;

  const waText = encodeURIComponent(
    [
      `Hi KAZE Team! I'd like to place an order:`,
      `• Product: ${product.name}`,
      `• Quantity: ${qty}`,
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Minimal validation
    if (!name || !email || !phone) {
      alert("Please fill in name, email, and phone.");
      return;
    }

    // If a Form endpoint is provided, POST JSON
    if (formEndpoint) {
      try {
        const res = await fetch(formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            product: product.name,
            qty,
            unitPrice,
            total,
            name,
            email,
            phone,
            address,
            channel,
          }),
        });
        if (!res.ok) throw new Error("Form submission failed");
        alert("✅ Order submitted! We’ll contact you shortly.");
        onClose?.();
      } catch (err) {
        console.error(err);
        alert("❌ Could not submit the form. Please try WhatsApp or check your endpoint.");
      }
      return;
    }

    // Fallback: show success + log (client-only)
    console.log("ORDER_FORM_PAYLOAD", {
      product: product.name,
      qty,
      unitPrice,
      total,
      name,
      email,
      phone,
      address,
      channel,
    });
    alert("✅ Order captured locally. Add a real endpoint to process it server-side.");
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
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            className="relative z-[101] w-[92%] max-w-3xl rounded-3xl bg-white shadow-2xl overflow-hidden"
            initial={{ y: 24, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 16, scale: 0.98, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-modal-title"
          >
            {/* Top Banner */}
            <div className="relative h-28 bg-gradient-to-r from-neutral-900 to-neutral-700" />
            {/* Floating image card */}
            <div className="relative -mt-16 px-6">
              <div className="mx-auto grid gap-6 md:grid-cols-[140px,1fr]">
                <div className="rounded-2xl bg-white shadow-lg p-3">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full aspect-square object-contain rounded-xl"
                  />
                </div>
                <div className="flex flex-col justify-end">
                  <h3
                    id="order-modal-title"
                    className="text-2xl md:text-3xl font-bold tracking-tight"
                  >
                    {product.name}
                  </h3>
                  <p className="text-sm text-neutral-600 mt-1 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                    <span className="px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200">
                      Direct Price: <strong>{product.priceDirect}</strong>
                    </span>
                    <span className="px-3 py-1 rounded-full bg-orange-50 border border-orange-200">
                      Shopee: <strong>{product.priceShopee}</strong>
                    </span>
                    <span className="px-3 py-1 rounded-full bg-green-50 border border-green-200">
                      Cheaper via WhatsApp / Form
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleFormSubmit} className="px-6 pb-6 pt-4">
              {/* Channel + Qty */}
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
                      WhatsApp (Cheaper)
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
                      Direct Form (Cheaper)
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Quantity</label>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      className="h-10 w-10 rounded-xl border border-neutral-300 hover:bg-neutral-50"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min={1}
                      value={qty}
                      onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
                      className="w-16 text-center rounded-xl border border-neutral-300 h-10"
                    />
                    <button
                      type="button"
                      onClick={() => setQty((q) => q + 1)}
                      className="h-10 w-10 rounded-xl border border-neutral-300 hover:bg-neutral-50"
                      aria-label="Increase quantity"
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
                    placeholder="Juan Dela Cruz"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Email *</label>
                  <input
                    type="email"
                    className="mt-2 w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Phone *</label>
                  <input
                    className="mt-2 w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+63 9xx xxx xxxx"
                    required
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
                    Unit Price: <strong>{currency(unitPrice)}</strong>
                  </div>
                  <div>
                    Qty: <strong>{qty}</strong>
                  </div>
                  <div className="text-lg mt-1">
                    Total: <strong>{currency(total)}</strong>
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
                      Place Order via WhatsApp
                    </a>
                  ) : (
                    <button
                      type="submit"
                      className="rounded-xl bg-black px-5 py-3 text-white font-semibold text-sm hover:bg-neutral-800"
                    >
                      Submit Direct Order
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
