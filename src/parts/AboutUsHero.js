/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
/*eslint-disable arrow-parens */
/*eslint-disable jsx-a11y/alt-text */

import React, { useState, useEffect } from 'react';
import { Fade, Slide, Bounce } from 'react-awesome-reveal';
import {
    FaQuoteLeft, FaQuoteRight, FaAward, FaUsers, FaLightbulb, FaRocket, FaCheckCircle,
} from 'react-icons/fa';
import heroImg from '../assets/images/hero/aboutushero.png';

function AboutHero() {
    const [activeTab, setActiveTab] = useState(0);
    const [counter, setCounter] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 300);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (isVisible && counter < 100) {
            const timer = setTimeout(() => {
                setCounter(prevCounter => prevCounter + 1);
            }, 20);
            return () => clearTimeout(timer);
        }
    }, [counter, isVisible]);

    const tabs = [
        {
            title: 'Our Mission',
            content: 'To empower businesses with innovative digital solutions that drive growth and success in the modern marketplace.',
            icon: <FaRocket className="text-blue-500" />,
        },
        {
            title: 'Our Vision',
            content: 'To be a global leader in digital transformation, setting new standards for excellence and innovation.',
            icon: <FaLightbulb className="text-yellow-500" />,
        },
        {
            title: 'Our Values',
            content: 'Integrity, Innovation, Collaboration, and Excellence are the core values that guide our every action.',
            icon: <FaCheckCircle className="text-green-500" />,
        },
    ];

    const stats = [
        { number: '150+', label: 'Projects Completed' },
        { number: '50+', label: 'Happy Clients' },
        { number: '10+', label: 'Team Members' },
        { number: '5+', label: 'Years of Experience' },
    ];

    return (
        <div className="relative overflow-hidden absolute top-10">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl" />
            </div>

            <section className="relative py-16 px-4">
                <div className="max-w-screen-xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left Column - Image */}
                        <div className="relative">
                            <Fade direction="up" delay={300} triggerOnce>
                                <div className="relative z-10">
                                    <img
                                        src={heroImg}
                                        alt="About Us"
                                        className="rounded-2xl shadow-2xl w-full h-auto object-cover"
                                    />
                                    {/* Floating badges */}
                                    <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-3 transform rotate-3">
                                        <div className="flex items-center">
                                            <FaAward className="text-yellow-500 mr-2" />
                                            <span className="font-semibold">Award Winning</span>
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-3 transform -rotate-3">
                                        <div className="flex items-center">
                                            <FaUsers className="text-blue-500 mr-2" />
                                            <span className="font-semibold">Expert Team</span>
                                        </div>
                                    </div>
                                </div>
                            </Fade>
                        </div>

                        {/* Right Column - Content */}
                        <div className="space-y-6">
                            <Slide direction="right" delay={500} triggerOnce>
                                <div>
                                    <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
                                        About us
                                    </span>
                                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                                        About {' '}
                                        <span className="text-blue-600">{process.env.REACT_APP_ORGANIZATION_ICON_NAME}</span>
                                        <span className="text-purple-600">{process.env.REACT_APP_ORGANIZATION_ICON_SUB_NAME}</span>
                                    </h2>
                                    <div className="relative mb-6">
                                        <FaQuoteLeft className="absolute -top-2 -left-2 text-gray-300 text-xl" />
                                        <p className="text-gray-700 pl-6 pr-6 italic">
                                            {process.env.REACT_APP_ORGANIZATION_ABOUT_US_HERO_DESCRIPTION
                                                ? process.env.REACT_APP_ORGANIZATION_ABOUT_US_HERO_DESCRIPTION
                                                : 'At Rapen, we create innovative solutions for businesses to thrive online. Our expert team specializes in web development and digital marketing, delivering customized services that exceed expectations. With a focus on collaboration and integrity, we help you enhance your online presence and achieve your goals. Let\'s succeed together!'}
                                        </p>
                                        <FaQuoteRight className="absolute -bottom-2 -right-2 text-gray-300 text-xl" />
                                    </div>
                                </div>
                            </Slide>

                            {/* Tabs */}
                            <Bounce delay={700} triggerOnce>
                                <div className="bg-white rounded-xl shadow-lg p-1">
                                    <div className="flex flex-wrap">
                                        {tabs.map((tab, index) => (
                                            <button
                                                key={index}
                                                type="button"
                                                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center ${activeTab === index
                                                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                                                    : 'text-gray-600 hover:text-gray-800'
                                                    }`}
                                                onClick={() => setActiveTab(index)}
                                            >
                                                <span className="mr-2">{tab.icon}</span>
                                                {tab.title}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="p-4 mt-2">
                                        <p className="text-gray-700">{tabs[activeTab].content}</p>
                                    </div>
                                </div>
                            </Bounce>

                            {/* Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {stats.map((stat, index) => (
                                    <div key={index} className="text-center p-4 bg-white rounded-lg shadow-md">
                                        <div className="text-2xl font-bold text-blue-600">{stat.number}</div>
                                        <div className="text-sm text-gray-600">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar Section */}
                    <div className="mt-16 bg-white rounded-2xl shadow-xl p-8">
                        <h3 className="text-2xl font-bold text-center mb-8">Our Expertise</h3>
                        <div className="space-y-6">
                            {[
                                { name: 'Web Development', percentage: 95, color: 'bg-blue-500' },
                                { name: 'Digital Marketing', percentage: 90, color: 'bg-purple-500' },
                                { name: 'UI/UX Design', percentage: 85, color: 'bg-pink-500' },
                                { name: 'Mobile Development', percentage: 80, color: 'bg-green-500' },
                            ].map((skill, index) => (
                                <div key={index} className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="font-medium">{skill.name}</span>
                                        <span className="text-gray-600">{skill.percentage}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div
                                            className={`${skill.color} h-3 rounded-full transition-all duration-1000 ease-out`}
                                            style={{ width: isVisible ? `${skill.percentage}%` : '0%' }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default AboutHero;





/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
/*eslint-disable arrow-parens */
/*eslint-disable jsx-a11y/alt-text */

// import React from 'react';
// import { Fade } from 'react-awesome-reveal';
// import heroImg from '../assets/images/hero/aboutushero.png';


// function AboutHero() {
//     return (
//         <div>
//             <section className="mt-8">
//                 <div className="sm:flex items-center max-w-screen-xl">
//                     <div className="sm:w-1/2 p-10">
//                         <div className="image object-center text-center">
//                             <Fade direction="up" delay={500} triggerOnce>
//                                 <img src={heroImg} />
//                             </Fade>
//                         </div>
//                     </div>
//                     <div className="sm:w-1/2 p-5">
//                         <div className="text">
//                             <span className="text-gray-500 border-b-2 border-indigo-600 uppercase">About us</span>
//                             <h2 className="my-4 font-bold text-3xl  sm:text-4xl ">About {' '}
//                                 <span className="text-theme-purple">{process.env.REACT_APP_ORGANIZATION_ICON_NAME}</span>
//                                 <span className="text-theme-blue">{process.env.REACT_APP_ORGANIZATION_ICON_SUB_NAME}</span>

//                             </h2>
//                             <p className="text-gray-700">
//                                 {process.env.REACT_APP_ORGANIZATION_ABOUT_US_HERO_DESCRIPTION ? process.env.REACT_APP_ORGANIZATION_ABOUT_US_HERO_DESCRIPTION : 'At Rapen, we create innovative solutions for businesses to thrive online. Our expert team specializes in web development and digital marketing, delivering customized services that exceed expectations. With a focus on collaboration and integrity, we help you enhance your online presence and achieve your goals. Let’s succeed together!'}

//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </div>
//     );
// }

// export default AboutHero;
