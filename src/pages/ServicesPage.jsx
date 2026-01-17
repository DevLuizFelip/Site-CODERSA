import React from 'react';
import ServicesSection from '../components/ServicesSection';

const ServicesPage = () => {
  return (
    <div className="pt-20"> {/* Padding top para compensar o header fixo se necessário */}
      <ServicesSection />
    </div>
  );
};

export default ServicesPage;