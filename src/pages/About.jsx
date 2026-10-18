import React from "react";
import { Link } from "react-router-dom";
import aboutHero from "../assets/images/about-hero.png";

function About() {
  return (
    <div>
      <div className="relative h-56 overflow-hidden md:h-80">
        <img
          src={aboutHero}
          alt="People sitting on a van overlooking a canyon"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-stone-900/25" />
      </div>
      <div className="wrapper mx-auto max-w-3xl">
        <h1 className="font-display text-2xl font-bold text-stone-900 md:text-4xl">
          Don’t squeeze in a sedan when you could relax in a van.
        </h1>
        <div className="mt-4 space-y-4 text-base leading-relaxed text-stone-700 md:text-lg">
          <p>
            Our mission is to enliven your road trip with the perfect travel van
            rental. Our vans are recertified before each trip to ensure your
            travel plans can go off without a hitch. (Hitch costs extra.)
          </p>
          <p>
            Our team is full of vanlife enthusiasts who know firsthand the magic
            of touring the world on 4 wheels.
          </p>
        </div>
        <div className="mt-8 rounded-xl bg-amber-200/70 p-6 md:p-8">
          <h2 className="font-display text-xl font-bold text-stone-900 md:text-2xl">
            Your destination is waiting.
            <br />
            Your van is ready.
          </h2>
          <Link
            className="mt-4 inline-block rounded-lg bg-stone-900 px-5 py-3 font-medium text-white transition hover:bg-stone-800"
            to="/vans"
          >
            Explore our vans
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
