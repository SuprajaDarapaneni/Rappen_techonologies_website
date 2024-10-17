/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
import React, { useEffect } from 'react';

import {
  Services, Portfolios, Advantages,
} from 'json/landingPageData';

import Header from 'parts/Header';
import Hero from 'parts/Hero';
import Service from 'parts/Service';
import Portfolio from 'parts/Portfolio';
import Advantage from 'parts/Advantage';
// import Testimonial from 'parts/Testimonial';
import Discuss from 'parts/Discuss';
import Footer from 'parts/Footer';

const LandingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); // Runs only once when the component mounts

  return (
    <div style={{ display: 'grid' }}>
      <Header />
      <Hero />
      <Service data={Services} />
      <Portfolio data={Portfolios} />
      <Advantage data={Advantages} />
      {/* <Testimonial data={Testimonials} /> */}
      <Discuss />
      <Footer />
    </div>
  );
};
export default LandingPage;



