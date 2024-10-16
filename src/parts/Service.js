/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/extensions */
/* eslint-disable max-len */

import React from 'react';

import { Fade } from 'react-awesome-reveal';

export default function Service({ data }) {
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto pt-20 pb-28">
        <Fade direction="right" triggerOnce>
          <h1 className="text-5xl text-theme-blue text-center font-bold">Our Services</h1>
        </Fade>
        <Fade direction="left" triggerOnce>
          {/* <p className="font-light text-lg text-gray-400 text-center mt-0">Driving Business Growth</p> */}
          <p className="font-light text-lg text-gray-400 xl:text-gray-400 xl:font-normal text-center mb-12">
            {/* We are ready to scale up your business with our great service. */}
            {process.env.REACT_APP_ORGANIZATION_SERVICES_SUBTITLE ? process.env.REACT_APP_ORGANIZATION_SERVICES_SUBTITLE : 'Rapen Technologies offers a comprehensive range of services designed to elevate your business. From custom web development to cutting-edge design, we are committed to scaling your business with exceptional service and innovative solutions'}
          </p>
        </Fade>

        <div className="grid grid-rows-3 px-10 gap-8 sm:grid-cols-3 sm:grid-rows-1 sm:gap-6 xl:gap-16">
          {
            data.map((item, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Fade direction={item.animation} delay={500 * index} key={index} triggerOnce>
                <div>
                  <div className="bg-white group rounded-2xl shadow-2xl border border-light-theme-purple transform transition duration-500 hover:scale-105">
                    <img src={item.imageUrl} alt="Service" className="w-full rounded-t-2xl" />
                    <h2 className="text-theme-blue text-center text-xl py-7 rounded-b-2xl">{item.title}</h2>
                  </div>
                </div>
              </Fade>
            ))
          }
        </div>
      </div>
    </div>
  );
}
