import React from 'react'

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="container py-10 grid gap-6 sm:grid-cols-2">
        <div>
          <p className="font-semibold">Kaze PH</p>
          <p className="text-sm text-neutral-600 mt-2">High-quality portable chargers with fast, reliable power.</p>
        </div>
        <div className="text-sm text-neutral-600">
          <p>Questions? Email <a className="underline" href="mailto:sales@powerbank.shop">info@kaze.ph</a></p>
          <p className="mt-1">© {new Date().getFullYear()} Kaze Commercial Corp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
