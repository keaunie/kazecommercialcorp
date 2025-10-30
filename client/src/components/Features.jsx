import React from 'react'

export default function Features() {
  const items = [
    { title: 'Fast Charging', desc: 'USB-C PD and QuickCharge support for rapid top-ups.' },
    { title: 'Travel Ready', desc: 'Airline-safe capacities, slim designs, and durable shells.' },
    { title: 'Warranty', desc: '1-year limited warranty and friendly support.' },
    { title: 'Secure Checkout', desc: 'Card-ready integration (demo) over HTTPS.' },
  ]
  return (
    <section id="features" className="py-16 bg-neutral-50">
      <div className="container">
        <h2 className="text-2xl font-bold">Why Choose Our Powerbanks?</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((f, i) => (
            <div key={i} className="rounded-2xl border border-neutral-200 bg-white p-5">
              <p className="font-semibold">{f.title}</p>
              <p className="text-sm text-neutral-600 mt-1">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
