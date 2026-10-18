import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="relative flex min-h-[calc(100vh-57px)] items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-[url('./assets/images/home-hero.png')] bg-cover bg-center"
        aria-hidden="true"
      />
      <div className="via-stone-950/55 absolute inset-0 bg-gradient-to-r from-stone-950/80 to-stone-950/25" />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-16 md:px-6">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
          #VanLife
        </p>
        <h1 className="mt-3 max-w-2xl font-display text-3xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
          You got the travel plans, we got the travel vans.
        </h1>
        <p className="mt-4 max-w-xl text-base text-stone-100 md:text-lg">
          Add adventure to your life by joining the #vanlife movement. Rent the
          perfect van to make your perfect road trip.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/vans"
            className="rounded-lg bg-amber-550 px-6 py-3 text-center font-semibold text-white shadow-lg shadow-amber-900/20 transition hover:bg-amber-600"
          >
            Find your van
          </Link>
          <Link
            to="/about"
            className="rounded-lg border border-white/40 bg-white/10 px-6 py-3 text-center font-semibold text-white backdrop-blur transition hover:bg-white/20"
          >
            Our story
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Home;
