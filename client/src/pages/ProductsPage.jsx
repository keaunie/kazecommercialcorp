// src/pages/ProductsPage.jsx
import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard"; // adjust the path if needed

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch products from server
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const res = await fetch("http://localhost:5174/api/products"); // adjust if your server runs elsewhere
                if (!res.ok) throw new Error("Failed to fetch products");
                const data = await res.json();
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Handlers
    const addToCart = (product) => {
        setCart((prev) => [...prev, product]);
    };

    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    const checkout = async () => {
        if (cart.length === 0) return alert("Your cart is empty!");
        if (!email) return alert("Please enter your email for the receipt.");

        try {
            const res = await fetch("http://localhost:5174/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ items: cart, email }),
            });
            const data = await res.json();
            if (data.success) {
                alert(`✅ ${data.message}\nOrder ID: ${data.orderId}`);
                setCart([]);
                setEmail("");
            } else {
                alert("❌ Checkout failed.");
            }
        } catch (err) {
            alert("Error processing checkout.");
        }
    };

    return (
        <section id="products" className="py-16 pt-32 bg-[#f9f9f9] min-h-screen">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Best Sellers</h2>
                    <div className="text-sm text-neutral-600">
                        <span className="font-semibold">Cart:</span> {cart.length} item(s)
                    </div>
                </div>

                {/* Product Grid */}
                {loading ? (
                    <p className="mt-8 text-neutral-600">Loading products...</p>
                ) : error ? (
                    <p className="mt-8 text-red-600">Error: {error}</p>
                ) : (
                    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {products.map((p) => (
                            <ProductCard
                                key={p.id}
                                product={p}
                                addToCart={() => addToCart(p)}
                            />
                        ))}
                    </div>
                )}

                {/* Cart + Checkout */}
                <div className="mt-12 rounded-2xl border border-neutral-200 p-5 bg-white shadow-sm">
                    <h3 className="font-semibold text-lg">Checkout</h3>

                    {cart.length === 0 ? (
                        <p className="text-sm text-neutral-600 mt-2">Your cart is empty.</p>
                    ) : (
                        <div className="mt-3 space-y-3">
                            {cart.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center justify-between border-b pb-2"
                                >
                                    <div className="text-sm">{item.name}</div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm">₱{item.price}</span>
                                        <button
                                            className="text-xs text-red-600 hover:underline"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}

                            <div className="pt-2 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                                <div className="flex-1">
                                    <label className="text-sm block mb-1">Email for receipt</label>
                                    <input
                                        className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="email"
                                    />
                                </div>
                                <button
                                    onClick={checkout}
                                    className="rounded-xl bg-black px-5 py-3 text-white font-semibold hover:bg-neutral-800"
                                >
                                    Place Order (Demo)
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
