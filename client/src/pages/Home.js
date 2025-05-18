import React from 'react';
import './Home.css';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import WhyChooseUs from '../components/WhyChooseUs';

import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <WhyChooseUs />
      
      <Footer />
    </div>
  );
};

export default Home;
