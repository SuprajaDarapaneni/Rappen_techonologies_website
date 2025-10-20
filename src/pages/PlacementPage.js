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
import Placement from 'parts/Placement';
import Footer from 'parts/Footer';

const PlacementPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []); // Runs only once when the component mounts

    return (
        <div style={{ display: 'grid' }}>
            <Header />
            {/* <Hero /> */}
            <Placement />
            <Footer />
        </div>
    );
};
export default PlacementPage;



