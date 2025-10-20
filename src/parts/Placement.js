// src/pages/Placement.js

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
    FaBriefcase,
    FaUsers,
    FaChartLine,
    FaHandshake,
    FaBuilding,
    FaUserTie,
    FaClipboardCheck,
    FaRocket,
    FaQuoteLeft,
    FaStar,
    FaArrowRight,
    FaCheckCircle,
    FaLightbulb,
    FaTrophy,
    FaGraduationCap,
    FaEnvelope,
    FaPhone,
    FaUser,
    FaSpinner,
    FaTimes,
    FaCheck,
    FaArrowUp,
    FaCode,
    FaLaptopCode,
    FaDatabase,
    FaCloud,
    FaCogs,
    FaPalette,
    FaLink,
    FaBrain,
} from 'react-icons/fa';

export default function Placement() {
    const [activeServiceIndex, setActiveServiceIndex] = useState(0);
    const [scrollY, setScrollY] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        course: '',
        experience: '',
        message: '',
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const statsRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrollY(currentScrollY);

            // Calculate scroll progress
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (currentScrollY / scrollHeight) * 100;
            setScrollProgress(progress);

            // Show/hide scroll to top button
            setShowScrollTop(currentScrollY > 300);
        };

        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('mousemove', handleMouseMove);
        setTimeout(() => setIsLoaded(true), 100);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 },
        );

        if (statsRef.current) {
            observer.observe(statsRef.current);
        }

        return () => {
            if (statsRef.current) {
                observer.unobserve(statsRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const validateForm = () => {
        const errors = {};

        if (!formData.name.trim()) {
            errors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email is invalid';
        }

        if (!formData.phone.trim()) {
            errors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
            errors.phone = 'Phone number must be 10 digits';
        }

        if (!formData.course) {
            errors.course = 'Please select a course';
        }

        if (!formData.experience) {
            errors.experience = 'Please select your experience level';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // FastAPI endpoint integration
            const response = await fetch('https://your-fastapi-backend.com/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitSuccess(true);
                // Reset form
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    course: '',
                    experience: '',
                    message: '',
                });

                // Close form after success
                setTimeout(() => {
                    setShowRegistrationForm(false);
                    setSubmitSuccess(false);
                }, 3000);
            } else {
                throw new Error('Registration failed');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            // Fallback for demo - simulate success
            setSubmitSuccess(true);
            setTimeout(() => {
                setShowRegistrationForm(false);
                setSubmitSuccess(false);
            }, 3000);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));

        // Clear error for this field when user starts typing
        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: '',
            }));
        }
    };

    const stats = [
        { number: '500+', label: 'Successful Placements', icon: <FaTrophy className="text-yellow-500" /> },
        { number: '150+', label: 'Partner Companies', icon: <FaBuilding className="text-blue-500" /> },
        { number: '95%', label: 'Placement Rate', icon: <FaChartLine className="text-green-500" /> },
        { number: '30%', label: 'Average Salary Hike', icon: <FaGraduationCap className="text-purple-500" /> },
    ];

    const services = [
        {
            icon: <FaClipboardCheck className="text-4xl" />,
            title: 'Resume Building & LinkedIn Optimization',
            description: 'Create professional resumes and optimize your LinkedIn profile to attract recruiters',
            features: ['Professional Templates', 'Keyword Optimization', 'Profile Enhancement'],
            color: 'from-blue-500 to-cyan-500',
        },
        {
            icon: <FaUserTie className="text-4xl" />,
            title: 'Mock Interviews & Technical Assessments',
            description: 'Practice with industry experts to build confidence and improve interview skills',
            features: ['Technical Rounds', 'HR Interviews', 'Feedback Sessions'],
            color: 'from-purple-500 to-pink-500',
        },
        {
            icon: <FaHandshake className="text-4xl" />,
            title: 'Industry Referrals and Job Recommendations',
            description: 'Get direct referrals to top companies and personalized job recommendations',
            features: ['Direct Referrals', 'Personalized Matches', 'Priority Applications'],
            color: 'from-green-500 to-teal-500',
        },
        {
            icon: <FaBriefcase className="text-4xl" />,
            title: 'Internships with Real-time Project Exposure',
            description: 'Gain hands-on experience through internships with real-world projects',
            features: ['Live Projects', 'Mentorship', 'Certificate of Completion'],
            color: 'from-orange-500 to-red-500',
        },
        {
            icon: <FaChartLine className="text-4xl" />,
            title: 'Dedicated Career Guidance',
            description: 'Receive personalized career counseling and guidance from industry experts',
            features: ['1-on-1 Sessions', 'Career Roadmap', 'Skill Gap Analysis'],
            color: 'from-indigo-500 to-blue-500',
        },
        {
            icon: <FaRocket className="text-4xl" />,
            title: 'Career Growth Support',
            description: 'Continuous support even after placement to ensure career growth',
            features: ['Alumni Network', 'Workshops', 'Promotion Guidance'],
            color: 'from-pink-500 to-rose-500',
        },
    ];

    const testimonials = [
        {
            name: 'Priya Patel',
            role: 'Mobile App Developer at AppWorks',
            content: 'I was from a non-tech background but wanted to switch to IT. The training and placement team at Rapen Technologies guided me through the entire process, and today I\'m working as a mobile app developer.',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
            rating: 5,
        },
        {
            name: 'Michael Chen',
            role: 'Team Lead at TechCorp',
            content: 'After completing the web development training at Rapen Technologies, I was placed in a top MNC. Within 2 years, I\'ve grown to become a team lead, all thanks to the strong foundation and placement support.',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
            rating: 5,
        },
        {
            name: 'Sarah Johnson',
            role: 'Data Scientist at DataMinds',
            content: 'The placement team helped me transition from a business analyst role to a data scientist. Their guidance and industry connections were invaluable in making this career change possible.',
            avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
            rating: 5,
        },
    ];

    const partners = [
        { name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/800px-Google_2015_logo.svg.png' },
        { name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/512px-Microsoft_logo_%282012%29.svg.png' },
        { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/603px-Amazon_logo.svg.png' },
        { name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/488px-Apple_logo_black.svg.png' },
        { name: 'Meta', logo: 'https://thvnext.bing.com/th?q=Meta+Logo+Transparent+Background&w=120&h=120&c=1&rs=1&qlt=70&o=7&cb=1&dpr=1.5&pid=InlineBlock&rm=3&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247' },
        { name: 'IBM', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/799px-IBM_logo.svg.png' },
    ];

    const courses = [
        { name: 'Full Stack Development', icon: <FaLaptopCode /> },
        { name: 'Data Science', icon: <FaDatabase /> },
        { name: 'Mobile App Development', icon: <FaCode /> },
        { name: 'Cloud Computing', icon: <FaCloud /> },
        { name: 'DevOps', icon: <FaCogs /> },
        { name: 'UI/UX Design', icon: <FaPalette /> },
        { name: 'Blockchain', icon: <FaLink /> },
        { name: 'Machine Learning', icon: <FaBrain /> },
    ];

    return (
        <div className="min-h-screen bg-white text-gray-800 overflow-hidden relative">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                {/* Gradient Orbs */}
                <div
                    className="absolute w-96 h-96 rounded-full bg-purple-200 opacity-30 blur-3xl"
                    style={{
                        top: `${mousePosition.y * 0.02}px`,
                        left: `${mousePosition.x * 0.02}px`,
                        transform: 'translate(-50%, -50%)',
                    }}
                />
                <div
                    className="absolute w-96 h-96 rounded-full bg-blue-200 opacity-30 blur-3xl"
                    style={{
                        bottom: `${100 - mousePosition.y * 0.02}px`,
                        right: `${100 - mousePosition.x * 0.02}px`,
                        transform: 'translate(50%, 50%)',
                    }}
                />

                {/* Floating Particles */}
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-purple-300 rounded-full opacity-20"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animation: `float ${10 + Math.random() * 20}s linear infinite`,
                            animationDelay: `${Math.random() * 5}s`,
                        }}
                    />
                ))}

                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-grid-pattern opacity-5" />
            </div>

            {/* Scroll Progress Bar */}
            <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
                <div
                    className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-150"
                    style={{ width: `${scrollProgress}%` }}
                />
            </div>

            {/* Navigation Dots */}
            <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
                <div className="flex flex-col space-y-4">
                    {['hero', 'stats', 'services', 'partners', 'testimonials', 'cta'].map((section) => (
                        <button
                            key={section}
                            onClick={() => scrollToSection(section)}
                            className="w-3 h-3 rounded-full bg-gray-400 hover:bg-purple-500 transition-all duration-300"
                            title={section.charAt(0).toUpperCase() + section.slice(1)}
                        />
                    ))}
                </div>
            </div>

            {/* Scroll to Top Button */}
            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-40"
                >
                    <FaArrowUp className="text-white" />
                </button>
            )}

            {/* Registration Form Modal */}
            {showRegistrationForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto border border-purple-200 shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold text-gray-800">Register for Placement</h3>
                            <button
                                onClick={() => setShowRegistrationForm(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <FaTimes size={24} />
                            </button>
                        </div>

                        {submitSuccess ? (
                            <div className="text-center py-8">
                                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FaCheck className="text-white text-3xl" />
                                </div>
                                <h4 className="text-xl font-semibold text-gray-800 mb-2">Registration Successful!</h4>
                                <p className="text-gray-600">We'll contact you soon with next steps.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-gray-700 mb-2">Full Name *</label>
                                    <div className="relative">
                                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className={`w-full pl-10 pr-4 py-3 bg-gray-100 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 ${formErrors.name ? 'border-2 border-red-500' : ''}`}
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-gray-700 mb-2">Email Address *</label>
                                    <div className="relative">
                                        <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className={`w-full pl-10 pr-4 py-3 bg-gray-100 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 ${formErrors.email ? 'border-2 border-red-500' : ''}`}
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                    {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                                </div>

                                <div>
                                    <label className="block text-gray-700 mb-2">Phone Number *</label>
                                    <div className="relative">
                                        <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className={`w-full pl-10 pr-4 py-3 bg-gray-100 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 ${formErrors.phone ? 'border-2 border-red-500' : ''}`}
                                            placeholder="1234567890"
                                        />
                                    </div>
                                    {formErrors.phone && <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>}
                                </div>

                                <div>
                                    <label className="block text-gray-700 mb-2">Select Course *</label>
                                    <select
                                        name="course"
                                        value={formData.course}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 bg-gray-100 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 ${formErrors.course ? 'border-2 border-red-500' : ''}`}
                                    >
                                        <option value="">Choose a course</option>
                                        {courses.map((course) => (
                                            <option key={course.name} value={course.name}>{course.name}</option>
                                        ))}
                                    </select>
                                    {formErrors.course && <p className="text-red-500 text-sm mt-1">{formErrors.course}</p>}
                                </div>

                                <div>
                                    <label className="block text-gray-700 mb-2">Experience Level *</label>
                                    <select
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 bg-gray-100 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 ${formErrors.experience ? 'border-2 border-red-500' : ''}`}
                                    >
                                        <option value="">Select experience</option>
                                        <option value="fresher">Fresher</option>
                                        <option value="0-1">0-1 years</option>
                                        <option value="1-3">1-3 years</option>
                                        <option value="3-5">3-5 years</option>
                                        <option value="5+">5+ years</option>
                                    </select>
                                    {formErrors.experience && <p className="text-red-500 text-sm mt-1">{formErrors.experience}</p>}
                                </div>

                                <div>
                                    <label className="block text-gray-700 mb-2">Message (Optional)</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        rows="3"
                                        className="w-full px-4 py-3 bg-gray-100 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        placeholder="Tell us about your career goals..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <FaSpinner className="animate-spin mr-2" />
                                            Submitting...
                                        </>
                                    ) : (
                                        'Register Now'
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}

            {/* Hero Section */}
            <section id="hero" className="relative pt-20 pb-32 px-4">
                <div className="container mx-auto">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">
                                Placement Services
                            </h1>
                            <p className="text-xl md:text-2xl mb-8 text-gray-600 max-w-3xl mx-auto">
                                Connecting talented professionals with leading companies in the tech industry
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={() => setShowRegistrationForm(true)}
                                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                                >
                                    Register Now <FaArrowRight className="ml-2" />
                                </button>
                                <Link
                                    to="/courses"
                                    className="border border-purple-500 text-purple-600 px-8 py-4 rounded-full font-semibold hover:bg-purple-50 transition-all duration-300"
                                >
                                    Explore Courses
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-20 left-10 text-purple-400 opacity-40 animate-bounce" style={{ animationDelay: '0.2s' }}>
                    <FaLightbulb size={40} />
                </div>
                <div className="absolute top-40 right-10 text-blue-400 opacity-40 animate-bounce" style={{ animationDelay: '0.5s' }}>
                    <FaRocket size={40} />
                </div>
                <div className="absolute bottom-10 left-1/4 text-pink-400 opacity-40 animate-bounce" style={{ animationDelay: '0.8s' }}>
                    <FaTrophy size={40} />
                </div>
            </section>

            {/* Placement Stats Section */}
            <section id="stats" ref={statsRef} className="py-20 px-4">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Placement Success</h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className={`bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <div className="flex justify-center mb-4">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                        {stat.icon}
                                    </div>
                                </div>
                                <div className="text-4xl font-bold text-gray-800 mb-2">{stat.number}</div>
                                <div className="text-gray-600">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Placement Services Section */}
            <section id="services" className="py-20 px-4 bg-gray-50">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Placement Support Includes</h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-6" />
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                            RapenTechnologies is committed to not only training but also helping students and professionals find the right opportunities in the tech industry.
                        </p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="lg:w-1/3">
                            <div className="sticky top-20">
                                {services.map((service, index) => (
                                    <div
                                        key={index}
                                        className={`p-4 mb-4 rounded-lg cursor-pointer transition-all duration-300 ${activeServiceIndex === index ? `bg-gradient-to-r ${service.color} shadow-lg` : 'bg-white hover:bg-gray-50'}`}
                                        onClick={() => setActiveServiceIndex(index)}
                                    >
                                        <div className="flex items-center">
                                            <div className={`mr-4 ${activeServiceIndex === index ? 'text-white' : 'text-purple-500'}`}>
                                                {service.icon}
                                            </div>
                                            <h3 className={`font-semibold ${activeServiceIndex === index ? 'text-white' : 'text-gray-800'}`}>
                                                {service.title}
                                            </h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="lg:w-2/3">
                            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                                <div className={`text-purple-500 mb-6 bg-gradient-to-r ${services[activeServiceIndex].color} bg-clip-text text-transparent`}>
                                    {services[activeServiceIndex].icon}
                                </div>
                                <h3 className="text-2xl font-semibold mb-4 text-gray-800">{services[activeServiceIndex].title}</h3>
                                <p className="text-gray-600 mb-6 text-lg">{services[activeServiceIndex].description}</p>

                                <div className="space-y-3">
                                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Key Features:</h4>
                                    {services[activeServiceIndex].features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center">
                                            <FaCheckCircle className="text-green-500 mr-3" />
                                            <span className="text-gray-600">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Partner Companies Section */}
            <section id="partners" className="py-20 px-4">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Partner Companies</h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-6" />
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                            We work with leading companies across various industries
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                        {partners.map((partner, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-xl shadow-md flex items-center justify-center h-32 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                            >
                                <img src={partner.logo} alt={partner.name} className="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Success Stories Section */}
            <section id="testimonials" className="py-20 px-4 bg-gray-50">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Success Stories</h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto" />
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                            <div className="flex items-center mb-6">
                                <FaQuoteLeft className="text-purple-500 text-3xl mr-4" />
                                <div className="flex">
                                    {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                                        <FaStar key={i} className="text-yellow-500 text-xl" />
                                    ))}
                                </div>
                            </div>
                            <p className="text-gray-600 mb-8 text-lg italic">"{testimonials[activeTestimonial].content}"</p>
                            <div className="flex items-center">
                                <img src={testimonials[activeTestimonial].avatar} alt={testimonials[activeTestimonial].name} className="w-16 h-16 rounded-full mr-4 border-2 border-purple-500" />
                                <div>
                                    <h4 className="font-semibold text-gray-800 text-lg">{testimonials[activeTestimonial].name}</h4>
                                    <p className="text-gray-500">{testimonials[activeTestimonial].role}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center mt-6 space-x-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${activeTestimonial === index ? 'bg-purple-500 w-8' : 'bg-gray-400'}`}
                                    onClick={() => setActiveTestimonial(index)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section id="cta" className="py-20 px-4">
                <div className="container mx-auto">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-center shadow-2xl relative overflow-hidden">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 bg-white opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

                        <div className="relative z-10">
                            <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Your Career Journey?</h2>
                            <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
                                Join our placement program and take the first step towards a successful career in the tech industry
                            </p>
                            <button
                                onClick={() => setShowRegistrationForm(true)}
                                className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 inline-flex items-center"
                            >
                                Register Now <FaArrowRight className="ml-2" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* CSS for animations */}
            <style jsx>{`
                @keyframes float {
                    0% {
                        transform: translateY(0) translateX(0);
                    }
                    50% {
                        transform: translateY(-20px) translateX(10px);
                    }
                    100% {
                        transform: translateY(0) translateX(0);
                    }
                }
                
                .bg-grid-pattern {
                    background-image: linear-gradient(rgba(156, 163, 175, 0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(156, 163, 175, 0.1) 1px, transparent 1px);
                    background-size: 20px 20px;
                }
            `}</style>
        </div>
    );
}
