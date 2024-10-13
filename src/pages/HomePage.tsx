import React from 'react';
import PageWrapper from './PageWrapper';
import HeroSection from '../components/HeroSection';
import HomeCategories from '../components/HomeCategories';
import ContactUsForm from '../components/ContactUsForm';

const HomePage: React.FC = () => {
  return (
    <PageWrapper>
      <HeroSection />
      <HomeCategories />
      <ContactUsForm />
    </PageWrapper>
  );
};

export default HomePage;
