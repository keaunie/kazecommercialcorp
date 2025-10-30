// PowerbankHero.jsx
import React from "react";

export default function HeroSection({ srcMp4, srcWebm, poster }) {
    return (
        <section
            className="relative isolate h-screen min-h-[560px] w-full overflow-hidden"
            role="banner"
            aria-label="Kaze hero"
        >
            {/* Background video */}
            <video
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                muted
                // loop
                playsInline
                preload="metadata"
                poster={poster}
            >
                {srcWebm && <source src={srcWebm} type="video/webm" />}
                <source src={srcMp4} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Overlay for better text visibility */}
            {/* <div className="absolute inset-0 bg-black/45" aria-hidden="true" /> */}
            {/* <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent"
        aria-hidden="true"
      /> */}

            {/* Centered text */}
            <div className="relative flex h-full w-full flex-col items-center justify-center px-6 text-center">
                <h1 className="text-6xl md:text-8xl font-azonix tracking-[0.2em] text-[#F4F4F4] select-none">
                    KAZE
                </h1>
                <h2 className="mt-4 text-xl md:text-2xl text-[#F4F4F4] font-light tracking-wide">
                    シンプルな技術、無限の流れ。
                </h2>
                <p className="text-[#F4F4F4] font-light tracking-wide">
                    Simple Tech, Infinite Flow
                </p>
            </div>


        </section>
    );
}
