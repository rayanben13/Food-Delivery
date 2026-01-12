import React from "react";
import "./globals.css";
import Hero from "./_components/hero";
import BestSellers from "./_components/BestSellers";
import About from "./about/page";
import ContactPage from "./contact/page";

async function Page() {
  return (
    <>
      <Hero />
      <BestSellers />
      <About />
      <ContactPage />
    </>
  );
}

export default Page;
