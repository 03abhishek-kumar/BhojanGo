import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import Restaurants from "../components/Restaurants";
import PromoBanner from "../components/PromoBanner";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="bg-[#F5F3EE] min-h-screen">
      <Navbar />
      <Hero />
      <Categories />
      <Restaurants />
      <PromoBanner />
      <Footer />
    </div>
  );
};

export default Home;
