/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/extensions */

import React from 'react';

import Button from '../elements/Button';
import logo from '../assets/images/logo-main.png';


export default function BrandIcon() {
  return (
    <div>
      <Button
        className=""
        type="link"
        href="/"
      >
        <div className="text-theme-blue text-3xl font-medium ">
          <img
            src={logo} // Make sure to set this in your .env file
            alt="Organization Logo"
            className="md:h-14 lg:h-20 xl:h-16 w-full sm:h-10 h-12 object-contain mr-2 bg-inherit" // Adjust height and margin as needed
          />
          {/* {process.env.REACT_APP_ORGANIZATION_ICON_NAME} */}

          {/* <span className="text-theme-purple">{process.env.REACT_APP_ORGANIZATION_ICON_SUB_NAME}</span> */}
          <span className="text-theme-purple text-sm">
            {' '}
            {/* Technologies */}
          </span>
          <div className="tagline pt-0 text-xs theme-gray text-x font-light">
            {/* {process.env.REACT_APP_ORGANIZATION_ICON_SUB_HEADING} */}
          </div>
        </div>
      </Button>

    </div>
  );
}
