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
