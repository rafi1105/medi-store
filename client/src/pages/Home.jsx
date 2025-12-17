import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import CategorySection from '../components/CategorySection';
import PopularMedicines from '../components/PopularMedicines';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      <CategorySection />
      <PopularMedicines />
      <Services />
      <Testimonials />
    </motion.div>
  );
};

export default Home;
