import React, { useEffect, useMemo, useState } from 'react'
import ProductCard from '../components/ProductCard.jsx'
import Features from '../components/Features.jsx'
import HeroSection from '../components/HeroSection.jsx'
import QuoteSection from '../components/QuoteSection.jsx'
import FeaturedSection from '../components/FeaturedSection.jsx'

export default function Home() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [email, setEmail] = useState('')

  useEffect(() => {
    fetch('/api/products')
      .then(r => r.json())
      .then(setProducts)
      .catch(() => setProducts([]))
  }, [])

  const cartTotal = useMemo(() => cart.reduce((sum, p) => sum + p.price, 0), [cart])

  const addToCart = (product) => setCart(c => [...c, product])
  const removeFromCart = (id) => setCart(c => c.filter(p => p.id !== id))

  const checkout = async () => {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cart, email })
    })
    const data = await res.json()
    if (data?.success) {
      alert(`Order placed! ID: ${data.orderId}`)
      setCart([])
      setEmail('')
    } else {
      alert(data?.error || 'Checkout failed')
    }
  }

  return (
    <>
      {/* HERO */}
      <HeroSection
        srcMp4="https://res.cloudinary.com/dczzibbkw/video/upload/v1757941885/bigg_d2cnic.mp4"
        srcWebm="https://res.cloudinary.com/dczzibbkw/video/upload/v1757941618/bg_i61r89.webm"   // optional
        poster="/images/hero-powerbank-poster.jpg"
      />

      <QuoteSection/>
      <FeaturedSection/>

      {/* PRODUCTS */}
      <section id="products" className="py-16">
        <div className="container">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Best Sellers</h2>
            <div className="text-sm text-neutral-600">
              <span className="font-semibold">Cart:</span> {cart.length} item(s) •
            </div>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map(p => (
              <ProductCard key={p.id} product={p} addToCart={addToCart} />
            ))}
          </div>

          {/* Cart + Checkout */}
          <div className="mt-12 rounded-2xl border border-neutral-200 p-5">
            <h3 className="font-semibold">Checkout</h3>
            {cart.length === 0 ? (
              <p className="text-sm text-neutral-600 mt-2">Your cart is empty.</p>
            ) : (
              <div className="mt-3 space-y-3">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between border-b pb-2">
                    <div className="text-sm">{item.name}</div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm">{item.price}</span>
                      <button className="text-xs text-red-600 hover:underline" onClick={() => removeFromCart(item.id)}>Remove</button>
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
                    className="rounded-xl bg-brand-600 px-5 py-3 text-white font-semibold hover:bg-brand-700"
                  >
                    Place Order (Demo)
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Features />

      {/* CONTACT */}
      <section id="contact" className="py-16">
        <div className="container">
          <div className="rounded-2xl border border-neutral-200 p-6 bg-white">
            <h2 className="text-2xl font-bold">Contact Us</h2>
            <p className="text-sm text-neutral-600 mt-2">
              For wholesale or custom branding, email <a className="underline" href="mailto:sales@powerbank.shop">sales@powerbank.shop</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
