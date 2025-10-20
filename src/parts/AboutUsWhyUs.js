/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
/*eslint-disable arrow-parens */
/*eslint-disable jsx-a11y/alt-text */

import React from "react";

const items = [
    {
        imageUrl: "https://image3.jdomni.in/banner/13062021/58/97/7C/E53960D1295621EFCB5B13F335_1623567851299.png?output-format=webp",
        title: "Latest Milling Machinery",
        description: "State-of-the-art equipment for precision work",
    },
    {
        imageUrl: "https://image2.jdomni.in/banner/13062021/3E/57/E8/1D6E23DD7E12571705CAC761E7_1623567977295.png?output-format=webp",
        title: "Reasonable Rates",
        description: "Competitive pricing without compromising quality",
    },
    {
        imageUrl: "https://image3.jdomni.in/banner/13062021/16/7E/7E/5A9920439E52EF309F27B43EEB_1623568010437.png?output-format=webp",
        title: "Time Efficiency",
        description: "Quick turnaround for all your projects",
    },
    {
        imageUrl: "https://image3.jdomni.in/banner/13062021/EB/99/EE/8B46027500E987A5142ECC1CE1_1623567959360.png?output-format=webp",
        title: "Expertise in Industry",
        description: "Years of experience and specialized knowledge",
    },
];

function AboutWhyUs() {
    return (
        <section className="relative py-20 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" />
            </div>

            <div className="container mx-auto px-5 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        Why Choose Us?
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-6" />
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        We stand out from the competition with our commitment to excellence and customer satisfaction
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {items.map((item, index) => (
                        <div key={index} className="group">
                            <div className="bg-white rounded-2xl shadow-lg p-8 h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden">
                                {/* Background gradient on hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {/* Card content */}
                                <div className="relative z-10">
                                    {/* Icon container */}
                                    <div className="flex justify-center mb-6">
                                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover:scale-110">
                                            <img src={item.imageUrl} alt={item.title} className="w-12 h-12 filter brightness-0 invert" />
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h3 className="title-font text-xl font-semibold text-gray-800 mb-3 text-center">
                                        {item.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-gray-600 text-center mb-4">
                                        {item.description}
                                    </p>

                                    {/* Learn more link */}
                                    <div className="flex justify-center">
                                        <a href="#" className="text-blue-600 font-medium flex items-center group-hover:text-purple-600 transition-colors duration-300">
                                            Learn more
                                            <svg className="w-4 h-4 ml-1 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Call to action */}
                <div className="text-center mt-16">
                    <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                        Discover Our Services
                    </button>
                </div>
            </div>
        </section>
    );
}

export default AboutWhyUs;
