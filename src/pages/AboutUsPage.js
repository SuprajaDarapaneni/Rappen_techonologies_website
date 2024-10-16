/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */

import React, { Component } from 'react'; // Ensure React is in scope
import AboutHero from 'parts/AboutUsHero';
import Header from 'parts/Header';
import AboutWhyUs from 'parts/AboutUsWhyUs';
import Footer from 'parts/Footer';
import Discuss from 'parts/Discuss';

export default class AboutUsPage extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <>
                <Header />
                <AboutHero />
                <AboutWhyUs />
                <Discuss />
                <Footer />
            </>
        );
    }
}
