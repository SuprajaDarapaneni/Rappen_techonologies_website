/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
/*eslint-disable arrow-parens */
/*eslint-disable jsx-a11y/alt-text */

import React from 'react';
import { Fade } from 'react-awesome-reveal';
import heroImg from '../assets/images/hero/aboutushero.png';


const AboutHero = () => {
    return (
        <div>
            <section className="mt-8">
                <div className="sm:flex items-center max-w-screen-xl">
                    <div className="sm:w-1/2 p-10">
                        <div className="image object-center text-center">
                            <Fade direction="up" delay={500} triggerOnce>
                                <img src={heroImg} />
                            </Fade>
                        </div>
                    </div>
                    <div className="sm:w-1/2 p-5">
                        <div className="text">
                            <span className="text-gray-500 border-b-2 border-indigo-600 uppercase">About us</span>
                            <h2 className="my-4 font-bold text-3xl  sm:text-4xl ">About {' '}
                                <span className="text-theme-purple">{process.env.REACT_APP_ORGANIZATION_ICON_NAME}</span>
                                <span className="text-theme-blue">{process.env.REACT_APP_ORGANIZATION_ICON_SUB_NAME}</span>

                            </h2>
                            <p className="text-gray-700">
                                {process.env.REACT_APP_ORGANIZATION_ABOUT_US_HERO_DESCRIPTION ? process.env.REACT_APP_ORGANIZATION_ABOUT_US_HERO_DESCRIPTION : 'At Rapen, we create innovative solutions for businesses to thrive online. Our expert team specializes in web development and digital marketing, delivering customized services that exceed expectations. With a focus on collaboration and integrity, we help you enhance your online presence and achieve your goals. Let’s succeed together!'}

                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutHero;
