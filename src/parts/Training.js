// src/pages/Training.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    FaCode,
    FaMobileAlt,
    FaPaintBrush,
    FaSearch,
    FaUsers,
    FaCertificate,
    FaLaptopCode,
    FaChalkboardTeacher,
    FaTimes,
    FaArrowLeft,
    FaArrowRight,
    FaCheck,
    FaUser,
    FaEnvelope,
    FaPhone,
    FaGraduationCap,
    FaCalendarAlt,
    FaClock,
    FaMoneyBillWave,
    FaCreditCard,
    FaPaypal,
    FaWhatsapp,
    FaStar,
    FaPlay,
    FaAward,
    FaRocket,
    FaChartLine,
    FaLightbulb,
    FaHandshake,
    FaBookOpen,
    FaTasks,
    FaTrophy,
    FaMedal,
    FaQuoteLeft,
    FaQuoteRight,
    FaFilter,
    FaSearchPlus,
    FaThLarge,
    FaList,
} from 'react-icons/fa';

export default function Training() {
    const [showEnrollModal, setShowEnrollModal] = useState(false);
    const [selectedProgram, setSelectedProgram] = useState(null);
    const [formStep, setFormStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        education: '',
        experience: '',
        startDate: '',
        preferredTime: '',
        paymentMethod: '',
        termsAccepted: false,
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [viewMode, setViewMode] = useState('grid'); // grid or list
    const [filter, setFilter] = useState('all'); // all, beginner, intermediate, advanced
    const [searchTerm, setSearchTerm] = useState('');
    const [hoveredProgram, setHoveredProgram] = useState(null);
    const [animatedStats, setAnimatedStats] = useState({
        students: 0,
        courses: 0,
        instructors: 0,
        placement: 0,
    });

    useEffect(() => {
        // Animate statistics on component mount
        const timer = setTimeout(() => {
            setAnimatedStats({
                students: 2500,
                courses: 6,
                instructors: 15,
                placement: 92,
            });
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    const programs = [
        {
            id: 1,
            icon: <FaCode className="text-4xl" />,
            title: 'Full Stack Web Development',
            description:
                'Master modern web technologies including HTML5, CSS3, JavaScript, React, and Node.js',
            duration: '3 months',
            level: 'Beginner to Advanced',
            mode: 'Online/Offline',
            color: 'bg-blue-500',
            price: '$999',
            rating: 4.8,
            students: 450,
            projects: 6,
            skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js', 'MongoDB'],
            highlights: ['Live Projects', 'Portfolio Building', 'Job Assistance'],
            image: 'https://picsum.photos/seed/webdev/400/250.jpg',
        },
        {
            id: 2,
            icon: <FaMobileAlt className="text-4xl" />,
            title: 'Mobile App Development',
            description:
                'Learn to build native and cross-platform mobile applications for iOS and Android',
            duration: '4 months',
            level: 'Intermediate',
            mode: 'Online/Offline',
            color: 'bg-purple-500',
            price: '$1299',
            rating: 4.7,
            students: 320,
            projects: 5,
            skills: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'],
            highlights: ['App Store Deployment', 'UI/UX Principles', 'Performance Optimization'],
            image: 'https://picsum.photos/seed/mobiledev/400/250.jpg',
        },
        {
            id: 3,
            icon: <FaSearch className="text-4xl" />,
            title: 'Digital Marketing & SEO',
            description:
                'Master the art of digital marketing, SEO, social media, and content strategy',
            duration: '2 months',
            level: 'Beginner to Intermediate',
            mode: 'Online',
            color: 'bg-green-500',
            price: '$799',
            rating: 4.6,
            students: 280,
            projects: 4,
            skills: ['SEO', 'SEM', 'Social Media', 'Content Marketing', 'Analytics'],
            highlights: ['Google Certification', 'Live Campaigns', 'ROI Measurement'],
            image: 'https://picsum.photos/seed/digitalmarketing/400/250.jpg',
        },
        {
            id: 4,
            icon: <FaPaintBrush className="text-4xl" />,
            title: 'UI/UX Design',
            description:
                'Create stunning user interfaces and exceptional user experiences with modern design tools',
            duration: '3 months',
            level: 'Beginner to Advanced',
            mode: 'Online/Offline',
            color: 'bg-pink-500',
            price: '$899',
            rating: 4.9,
            students: 380,
            projects: 6,
            skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research', 'Design Systems'],
            highlights: ['Portfolio Development', 'Design Thinking', 'Industry Case Studies'],
            image: 'https://picsum.photos/seed/uiux/400/250.jpg',
        },
        {
            id: 5,
            icon: <FaChartLine className="text-4xl" />,
            title: 'Data Science & Analytics',
            description:
                'Learn data analysis, visualization, machine learning, and predictive modeling',
            duration: '5 months',
            level: 'Intermediate to Advanced',
            mode: 'Online',
            color: 'bg-indigo-500',
            price: '$1499',
            rating: 4.7,
            students: 290,
            projects: 7,
            skills: ['Python', 'R', 'Machine Learning', 'Data Visualization', 'SQL'],
            highlights: ['Real-world Datasets', 'Model Deployment', 'Industry Projects'],
            image: 'https://picsum.photos/seed/datascience/400/250.jpg',
        },
        {
            id: 6,
            icon: <FaRocket className="text-4xl" />,
            title: 'Cloud Computing & DevOps',
            description:
                'Master cloud platforms, containerization, CI/CD pipelines, and infrastructure as code',
            duration: '4 months',
            level: 'Intermediate',
            mode: 'Online/Offline',
            color: 'bg-teal-500',
            price: '$1199',
            rating: 4.8,
            students: 310,
            projects: 5,
            skills: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform'],
            highlights: ['Certification Prep', 'Live Infrastructure', 'Security Best Practices'],
            image: 'https://picsum.photos/seed/clouddevops/400/250.jpg',
        },
    ];

    const approaches = [
        {
            icon: <FaChalkboardTeacher className="text-3xl" />,
            title: 'Expert Instructors',
            description: 'Learn from industry professionals with years of hands-on experience',
            color: 'text-blue-600',
            bgColor: 'bg-blue-100',
        },
        {
            icon: <FaLaptopCode className="text-3xl" />,
            title: 'Practical Learning',
            description: 'Focus on real-world projects and hands-on experience',
            color: 'text-purple-600',
            bgColor: 'bg-purple-100',
        },
        {
            icon: <FaUsers className="text-3xl" />,
            title: 'Small Batch Sizes',
            description: 'Personalized attention with limited batch sizes',
            color: 'text-green-600',
            bgColor: 'bg-green-100',
        },
        {
            icon: <FaCertificate className="text-3xl" />,
            title: 'Certification',
            description: 'Industry-recognized certificates upon successful completion',
            color: 'text-pink-600',
            bgColor: 'bg-pink-100',
        },
        {
            icon: <FaHandshake className="text-3xl" />,
            title: 'Placement Assistance',
            description: 'Career support and job placement assistance after completion',
            color: 'text-indigo-600',
            bgColor: 'bg-indigo-100',
        },
        {
            icon: <FaLightbulb className="text-3xl" />,
            title: 'Innovation Labs',
            description: 'Access to cutting-edge tools and technologies',
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-100',
        },
    ];

    const testimonials = [
        {
            name: 'Sarah Johnson',
            role: 'Frontend Developer',
            content:
                'The web development course at Rapen Technologies transformed my career. The practical approach and expert guidance helped me land my dream job.',
            avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
            rating: 5,
            course: 'Full Stack Web Development',
        },
        {
            name: 'Rahul Sharma',
            role: 'Mobile App Developer',
            content:
                "The mobile app development training was comprehensive and up-to-date. I'm now confidently developing apps for both iOS and Android.",
            avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
            rating: 5,
            course: 'Mobile App Development',
        },
        {
            name: 'Emily Chen',
            role: 'UX Designer',
            content:
                "The UI/UX design course exceeded my expectations. The instructors were knowledgeable and the projects were challenging yet rewarding.",
            avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
            rating: 4,
            course: 'UI/UX Design',
        },
    ];

    const openEnrollModal = (program) => {
        setSelectedProgram(program);
        setShowEnrollModal(true);
        setFormStep(1);
        setIsSubmitted(false);
    };

    const closeEnrollModal = () => {
        setShowEnrollModal(false);
        setSelectedProgram(null);
        setFormStep(1);
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            education: '',
            experience: '',
            startDate: '',
            preferredTime: '',
            paymentMethod: '',
            termsAccepted: false,
        });
        setFormErrors({});
    };

    const validateForm = () => {
        const errors = {};

        if (formStep === 1) {
            if (!formData.firstName) errors.firstName = 'First name is required';
            if (!formData.lastName) errors.lastName = 'Last name is required';
            if (!formData.email) errors.email = 'Email is required';
            else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
            if (!formData.phone) errors.phone = 'Phone number is required';
        } else if (formStep === 2) {
            if (!formData.education) errors.education = 'Education level is required';
            if (!formData.experience) errors.experience = 'Experience level is required';
            if (!formData.startDate) errors.startDate = 'Start date is required';
            if (!formData.preferredTime) errors.preferredTime = 'Preferred time is required';
        } else if (formStep === 3) {
            if (!formData.paymentMethod) errors.paymentMethod = 'Payment method is required';
            if (!formData.termsAccepted) errors.termsAccepted = 'You must accept the terms and conditions';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const nextStep = () => {
        if (validateForm()) {
            if (formStep < 3) setFormStep(formStep + 1);
        }
    };

    const prevStep = () => {
        if (formStep > 1) setFormStep(formStep - 1);
    };

    const handleInputChange = (e) => {
        const {
            name, value, type, checked,
        } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const submitForm = () => {
        if (validateForm()) {
            setIsSubmitting(true);
            // Simulate API call
            setTimeout(() => {
                setIsSubmitting(false);
                setIsSubmitted(true);
            }, 2000);
        }
    };

    const openWhatsApp = (program) => {
        const message = `Hi, I'm interested in the ${program.title} course. Could you provide more information?`;
        window.open(`https://wa.me/917989288815?text=${encodeURIComponent(message)}`, '_blank');
    };

    const filteredPrograms = programs.filter(program => {
        const matchesFilter = filter === 'all' || program.level.toLowerCase().includes(filter.toLowerCase());
        const matchesSearch = program.title.toLowerCase().includes(searchTerm.toLowerCase())
            || program.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i += 1) {
            stars.push(<FaStar key={`star-${i}`} className="text-yellow-400" />);
        }

        if (hasHalfStar) {
            stars.push(<FaStar key="half-star" className="text-yellow-400 opacity-50" />);
        }

        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i += 1) {
            stars.push(<FaStar key={`empty-star-${i}`} className="text-gray-300" />);
        }

        return stars;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-20" />
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Professional Training Programs</h1>
                        <p className="text-xl mb-8">
                            Enhance your skills with industry-relevant training programs designed by experts
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                type="button"
                                onClick={() => openEnrollModal(programs[0])}
                                className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300 transform hover:scale-105"
                            >
                                Explore Programs
                            </button>
                            <a
                                href="https://wa.me/917989288815?text=Hi%2C%20I'm%20interested%20in%20your%20training%20programs."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-green-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-600 transition duration-300 transform hover:scale-105 flex items-center justify-center"
                            >
                                <FaWhatsapp className="mr-2" /> Chat on WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" fill="none">
                        <path d="M0,120L60,110C120,100,240,80,360,70C480,60,600,60,720,65C840,70,960,80,1080,85C1200,90,1320,90,1380,90L1440,90L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z" fill="#F9FAFB" />
                    </svg>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600">{animatedStats.students}+</div>
                            <div className="text-gray-600">Students Trained</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-purple-600">{animatedStats.courses}</div>
                            <div className="text-gray-600">Courses Offered</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-green-600">{animatedStats.instructors}+</div>
                            <div className="text-gray-600">Expert Instructors</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-pink-600">{animatedStats.placement}%</div>
                            <div className="text-gray-600">Placement Rate</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Training Programs */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Training Programs</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            At Rapen Technologies, we offer comprehensive training programs to help you excel in
                            the tech industry
                        </p>
                    </div>

                    {/* Search and Filter */}
                    <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center">
                        <div className="relative w-full md:w-1/2">
                            <input
                                type="text"
                                placeholder="Search courses..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <FaSearch className="absolute left-3 top-3 text-gray-400" />
                        </div>
                        <div className="flex gap-2 items-center">
                            <div className="flex bg-white rounded-lg shadow-sm border border-gray-200">
                                <button
                                    type="button"
                                    onClick={() => setFilter('all')}
                                    className={`px-4 py-2 rounded-l-lg ${filter === 'all' ? 'bg-blue-500 text-white' : 'text-gray-700'}`}
                                >
                                    All
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFilter('beginner')}
                                    className={`px-4 py-2 ${filter === 'beginner' ? 'bg-blue-500 text-white' : 'text-gray-700'}`}
                                >
                                    Beginner
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFilter('intermediate')}
                                    className={`px-4 py-2 ${filter === 'intermediate' ? 'bg-blue-500 text-white' : 'text-gray-700'}`}
                                >
                                    Intermediate
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFilter('advanced')}
                                    className={`px-4 py-2 rounded-r-lg ${filter === 'advanced' ? 'bg-blue-500 text-white' : 'text-gray-700'}`}
                                >
                                    Advanced
                                </button>
                            </div>
                            <div className="flex bg-white rounded-lg shadow-sm border border-gray-200">
                                <button
                                    type="button"
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-l-lg ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-700'}`}
                                >
                                    <FaThLarge />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded-r-lg ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-700'}`}
                                >
                                    <FaList />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Program Cards */}
                    {viewMode === 'grid' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredPrograms.map((program) => (
                                <div
                                    key={program.id}
                                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                                    onMouseEnter={() => setHoveredProgram(program.id)}
                                    onMouseLeave={() => setHoveredProgram(null)}
                                >
                                    <div className="relative">
                                        <img src={program.image} alt={program.title} className="w-full h-48 object-cover" />
                                        <div className={`absolute inset-0 ${program.color} bg-opacity-70 flex items-center justify-center transition-opacity duration-300 ${hoveredProgram === program.id ? 'opacity-0' : 'opacity-100'}`}>
                                            {program.icon}
                                        </div>
                                        {hoveredProgram === program.id && (
                                            <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
                                                <button
                                                    type="button"
                                                    onClick={() => openEnrollModal(program)}
                                                    className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition duration-300 mr-2"
                                                >
                                                    Enroll Now
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => openWhatsApp(program)}
                                                    className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition duration-300"
                                                >
                                                    <FaWhatsapp />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold mb-2">{program.title}</h3>
                                        <p className="text-gray-600 mb-4 text-sm">{program.description}</p>
                                        <div className="flex items-center mb-3">
                                            <div className="flex mr-2">
                                                {renderStars(program.rating)}
                                            </div>
                                            <span className="text-sm text-gray-600">({program.rating})</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 text-sm text-gray-500 mb-4">
                                            <div className="flex items-center">
                                                <FaClock className="mr-1 text-blue-500" />
                                                {program.duration}
                                            </div>
                                            <div className="flex items-center">
                                                <FaUsers className="mr-1 text-green-500" />
                                                {program.students} students
                                            </div>
                                            <div className="flex items-center">
                                                <FaTasks className="mr-1 text-purple-500" />
                                                {program.projects} projects
                                            </div>
                                            <div className="flex items-center">
                                                <FaGraduationCap className="mr-1 text-orange-500" />
                                                {program.level}
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-bold text-blue-600">{program.price}</span>
                                            <button
                                                type="button"
                                                onClick={() => openEnrollModal(program)}
                                                className="text-blue-600 font-semibold hover:text-blue-800 flex items-center"
                                            >
                                                Learn More <FaArrowRight className="ml-1" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredPrograms.map((program) => (
                                <div
                                    key={program.id}
                                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                                >
                                    <div className="flex flex-col md:flex-row">
                                        <div className="md:w-1/3">
                                            <img src={program.image} alt={program.title} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="md:w-2/3 p-6">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-xl font-semibold">{program.title}</h3>
                                                <span className="text-lg font-bold text-blue-600">{program.price}</span>
                                            </div>
                                            <p className="text-gray-600 mb-4">{program.description}</p>
                                            <div className="flex items-center mb-3">
                                                <div className="flex mr-2">
                                                    {renderStars(program.rating)}
                                                </div>
                                                <span className="text-sm text-gray-600">({program.rating})</span>
                                            </div>
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {program.skills.map((skill, index) => (
                                                    <span key={`${program.id}-skill-${index}`} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="flex gap-4 text-sm text-gray-500">
                                                    <div className="flex items-center">
                                                        <FaClock className="mr-1 text-blue-500" />
                                                        {program.duration}
                                                    </div>
                                                    <div className="flex items-center">
                                                        <FaUsers className="mr-1 text-green-500" />
                                                        {program.students} students
                                                    </div>
                                                    <div className="flex items-center">
                                                        <FaTasks className="mr-1 text-purple-500" />
                                                        {program.projects} projects
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => openEnrollModal(program)}
                                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                                                    >
                                                        Enroll Now
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => openWhatsApp(program)}
                                                        className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition duration-300"
                                                    >
                                                        <FaWhatsapp />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Training Approach */}
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Training Approach</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            We believe in practical, hands-on learning that prepares you for real-world challenges
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {approaches.map((approach, index) => (
                            <div key={`approach-${index}`} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                                <div className={`${approach.bgColor} w-16 h-16 rounded-full flex items-center justify-center mb-4 ${approach.color}`}>
                                    {approach.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{approach.title}</h3>
                                <p className="text-gray-600">{approach.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Learning Path */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Learning Journey</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Follow our structured learning path to master new skills and advance your career
                        </p>
                    </div>
                    <div className="max-w-4xl mx-auto">
                        <div className="relative">
                            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200" />
                            {[
                                {
                                    step: 1, title: 'Enrollment', desc: 'Choose your course and complete enrollment', icon: <FaUser />,
                                },
                                {
                                    step: 2, title: 'Foundation', desc: 'Learn the fundamentals and core concepts', icon: <FaBookOpen />,
                                },
                                {
                                    step: 3, title: 'Practice', desc: 'Work on hands-on projects and assignments', icon: <FaLaptopCode />,
                                },
                                {
                                    step: 4, title: 'Advanced Topics', desc: 'Master advanced techniques and best practices', icon: <FaLightbulb />,
                                },
                                {
                                    step: 5, title: 'Portfolio', desc: 'Build a portfolio of real-world projects', icon: <FaTasks />,
                                },
                                {
                                    step: 6, title: 'Certification', desc: 'Earn your certificate and start your career', icon: <FaTrophy />,
                                },
                            ].map((item, index) => (
                                <div key={`journey-${item.step}`} className={`flex items-center mb-8 ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                                    <div className={`w-1/2 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                                        <div className="bg-white p-4 rounded-lg shadow-md">
                                            <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                                            <p className="text-gray-600 text-sm">{item.desc}</p>
                                        </div>
                                    </div>
                                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white z-10">
                                        {item.icon}
                                    </div>
                                    <div className="w-1/2" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Trainees Say</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Hear from our successful alumni who transformed their careers with our training programs
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {testimonials.map((testimonial, index) => (
                            <div key={`testimonial-${index}`} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="flex items-center mb-4">
                                    <img
                                        src={testimonial.avatar}
                                        alt={testimonial.name}
                                        className="w-12 h-12 rounded-full mr-4"
                                    />
                                    <div>
                                        <h4 className="font-semibold">{testimonial.name}</h4>
                                        <p className="text-gray-500 text-sm">{testimonial.role}</p>
                                    </div>
                                </div>
                                <div className="flex mb-3">
                                    {renderStars(testimonial.rating)}
                                </div>
                                <div className="relative">
                                    <FaQuoteLeft className="text-gray-200 absolute -top-2 -left-2" />
                                    <p className="text-gray-600 italic mb-2 pl-4">&quot;{testimonial.content}&quot;</p>
                                    <FaQuoteRight className="text-gray-200 absolute -bottom-2 -right-2" />
                                </div>
                                <div className="mt-4 pt-4 border-t border-gray-100">
                                    <p className="text-sm text-blue-600 font-medium">Course: {testimonial.course}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Enhance Your Skills?</h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Join our training programs and take the first step towards a successful tech career
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            type="button"
                            onClick={() => openEnrollModal(programs[0])}
                            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300 transform hover:scale-105"
                        >
                            Enroll Now
                        </button>
                        <a
                            href="https://wa.me/917989288815?text=Hi%2C%20I'm%20interested%20in%20your%20training%20programs."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-green-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-600 transition duration-300 transform hover:scale-105 flex items-center justify-center"
                        >
                            <FaWhatsapp className="mr-2" /> Chat on WhatsApp
                        </a>
                    </div>
                </div>
            </section>

            {/* Enrollment Modal */}
            {showEnrollModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-gray-800">
                                {isSubmitted ? 'Enrollment Successful!' : `Enroll in ${selectedProgram.title}`}
                            </h2>
                            <button
                                type="button"
                                onClick={closeEnrollModal}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <FaTimes className="text-xl" />
                            </button>
                        </div>

                        {isSubmitted ? (
                            <div className="p-8 text-center">
                                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                                    <FaCheck className="text-3xl" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Thank you for enrolling!</h3>
                                <p className="text-gray-600 mb-6">
                                    We&apos;ve received your enrollment request for the {selectedProgram.title} program.
                                    Our team will contact you within 24 hours with further details.
                                </p>
                                <div className="flex gap-4 justify-center">
                                    <button
                                        type="button"
                                        onClick={closeEnrollModal}
                                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                                    >
                                        Close
                                    </button>
                                    <a
                                        href={`https://wa.me/917989288815?text=Hi%2C%20I've%20just%20enrolled%20for%20the%20${selectedProgram.title}%20program.%20Could%20you%20provide%20more%20information%3F`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300 flex items-center"
                                    >
                                        <FaWhatsapp className="mr-2" /> Chat on WhatsApp
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* Progress Indicator */}
                                <div className="px-8 pt-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className={`flex items-center ${formStep >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${formStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                                                <FaUser className="text-sm" />
                                            </div>
                                            <span className="ml-2 font-medium">Personal Info</span>
                                        </div>
                                        <div className={`flex items-center ${formStep >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${formStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                                                <FaGraduationCap className="text-sm" />
                                            </div>
                                            <span className="ml-2 font-medium">Program Details</span>
                                        </div>
                                        <div className={`flex items-center ${formStep >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${formStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                                                <FaCreditCard className="text-sm" />
                                            </div>
                                            <span className="ml-2 font-medium">Payment</span>
                                        </div>
                                    </div>
                                    <div className="w-full bg-gray-200 h-2 rounded-full mb-6">
                                        <div
                                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${(formStep / 3) * 100}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Form Content */}
                                <div className="px-8 pb-6">
                                    {formStep === 1 && (
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label htmlFor="firstName" className="block text-gray-700 mb-1">First Name</label>
                                                    <input
                                                        id="firstName"
                                                        type="text"
                                                        name="firstName"
                                                        value={formData.firstName}
                                                        onChange={handleInputChange}
                                                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                                                        placeholder="John"
                                                    />
                                                    {formErrors.firstName && <p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>}
                                                </div>
                                                <div>
                                                    <label htmlFor="lastName" className="block text-gray-700 mb-1">Last Name</label>
                                                    <input
                                                        id="lastName"
                                                        type="text"
                                                        name="lastName"
                                                        value={formData.lastName}
                                                        onChange={handleInputChange}
                                                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                                                        placeholder="Doe"
                                                    />
                                                    {formErrors.lastName && <p className="text-red-500 text-sm mt-1">{formErrors.lastName}</p>}
                                                </div>
                                            </div>
                                            <div>
                                                <label htmlFor="email" className="block text-gray-700 mb-1">Email</label>
                                                <input
                                                    id="email"
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`}
                                                    placeholder="john.doe@example.com"
                                                />
                                                {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                                            </div>
                                            <div>
                                                <label htmlFor="phone" className="block text-gray-700 mb-1">Phone Number</label>
                                                <input
                                                    id="phone"
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.phone ? 'border-red-500' : 'border-gray-300'}`}
                                                    placeholder="+1 (555) 123-4567"
                                                />
                                                {formErrors.phone && <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>}
                                            </div>
                                        </div>
                                    )}

                                    {formStep === 2 && (
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-semibold mb-4">Program Details</h3>
                                            <div className="bg-blue-50 p-4 rounded-lg mb-4">
                                                <h4 className="font-semibold text-blue-800">{selectedProgram.title}</h4>
                                                <p className="text-blue-700">Duration: {selectedProgram.duration}</p>
                                                <p className="text-blue-700">Mode: {selectedProgram.mode}</p>
                                                <p className="text-blue-700 font-semibold">Price: {selectedProgram.price}</p>
                                            </div>
                                            <div>
                                                <label htmlFor="education" className="block text-gray-700 mb-1">Education Level</label>
                                                <select
                                                    id="education"
                                                    name="education"
                                                    value={formData.education}
                                                    onChange={handleInputChange}
                                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.education ? 'border-red-500' : 'border-gray-300'}`}
                                                >
                                                    <option value="">Select Education Level</option>
                                                    <option value="high-school">High School</option>
                                                    <option value="bachelors">Bachelor&apos;s Degree</option>
                                                    <option value="masters">Master&apos;s Degree</option>
                                                    <option value="phd">PhD</option>
                                                    <option value="other">Other</option>
                                                </select>
                                                {formErrors.education && <p className="text-red-500 text-sm mt-1">{formErrors.education}</p>}
                                            </div>
                                            <div>
                                                <label htmlFor="experience" className="block text-gray-700 mb-1">Experience Level</label>
                                                <select
                                                    id="experience"
                                                    name="experience"
                                                    value={formData.experience}
                                                    onChange={handleInputChange}
                                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.experience ? 'border-red-500' : 'border-gray-300'}`}
                                                >
                                                    <option value="">Select Experience Level</option>
                                                    <option value="no-experience">No Experience</option>
                                                    <option value="beginner">Beginner (0-1 year)</option>
                                                    <option value="intermediate">Intermediate (1-3 years)</option>
                                                    <option value="advanced">Advanced (3+ years)</option>
                                                </select>
                                                {formErrors.experience && <p className="text-red-500 text-sm mt-1">{formErrors.experience}</p>}
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label htmlFor="startDate" className="block text-gray-700 mb-1">Preferred Start Date</label>
                                                    <input
                                                        id="startDate"
                                                        type="date"
                                                        name="startDate"
                                                        value={formData.startDate}
                                                        onChange={handleInputChange}
                                                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.startDate ? 'border-red-500' : 'border-gray-300'}`}
                                                    />
                                                    {formErrors.startDate && <p className="text-red-500 text-sm mt-1">{formErrors.startDate}</p>}
                                                </div>
                                                <div>
                                                    <label htmlFor="preferredTime" className="block text-gray-700 mb-1">Preferred Time</label>
                                                    <select
                                                        id="preferredTime"
                                                        name="preferredTime"
                                                        value={formData.preferredTime}
                                                        onChange={handleInputChange}
                                                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.preferredTime ? 'border-red-500' : 'border-gray-300'}`}
                                                    >
                                                        <option value="">Select Preferred Time</option>
                                                        <option value="morning">Morning (9 AM - 12 PM)</option>
                                                        <option value="afternoon">Afternoon (12 PM - 3 PM)</option>
                                                        <option value="evening">Evening (3 PM - 6 PM)</option>
                                                        <option value="weekend">Weekend</option>
                                                    </select>
                                                    {formErrors.preferredTime && <p className="text-red-500 text-sm mt-1">{formErrors.preferredTime}</p>}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {formStep === 3 && (
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-semibold mb-4">Payment Information</h3>
                                            <div className="bg-blue-50 p-4 rounded-lg mb-4">
                                                <h4 className="font-semibold text-blue-800">Order Summary</h4>
                                                <div className="flex justify-between mt-2">
                                                    <span className="text-blue-700">{selectedProgram.title}</span>
                                                    <span className="text-blue-700 font-semibold">{selectedProgram.price}</span>
                                                </div>
                                                <div className="border-t border-blue-200 mt-2 pt-2 flex justify-between">
                                                    <span className="text-blue-800 font-semibold">Total</span>
                                                    <span className="text-blue-800 font-semibold">{selectedProgram.price}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-gray-700 mb-1">Payment Method</label>
                                                <div className="space-y-2">
                                                    <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                                                        <input
                                                            type="radio"
                                                            name="paymentMethod"
                                                            value="credit-card"
                                                            checked={formData.paymentMethod === 'credit-card'}
                                                            onChange={handleInputChange}
                                                            className="mr-3"
                                                        />
                                                        <FaCreditCard className="mr-2 text-blue-600" />
                                                        <span>Credit/Debit Card</span>
                                                    </label>
                                                    <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                                                        <input
                                                            type="radio"
                                                            name="paymentMethod"
                                                            value="paypal"
                                                            checked={formData.paymentMethod === 'paypal'}
                                                            onChange={handleInputChange}
                                                            className="mr-3"
                                                        />
                                                        <FaPaypal className="mr-2 text-blue-600" />
                                                        <span>PayPal</span>
                                                    </label>
                                                    <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                                                        <input
                                                            type="radio"
                                                            name="paymentMethod"
                                                            value="bank-transfer"
                                                            checked={formData.paymentMethod === 'bank-transfer'}
                                                            onChange={handleInputChange}
                                                            className="mr-3"
                                                        />
                                                        <FaMoneyBillWave className="mr-2 text-blue-600" />
                                                        <span>Bank Transfer</span>
                                                    </label>
                                                </div>
                                                {formErrors.paymentMethod && <p className="text-red-500 text-sm mt-1">{formErrors.paymentMethod}</p>}
                                            </div>
                                            <div className="flex items-start">
                                                <input
                                                    type="checkbox"
                                                    id="termsAccepted"
                                                    name="termsAccepted"
                                                    checked={formData.termsAccepted}
                                                    onChange={handleInputChange}
                                                    className="mt-1 mr-2"
                                                />
                                                <label htmlFor="termsAccepted" className="text-sm text-gray-700">
                                                    I agree to the <a href="#" className="text-blue-600 hover:underline">Terms and Conditions</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                                                </label>
                                            </div>
                                            {formErrors.termsAccepted && <p className="text-red-500 text-sm mt-1">{formErrors.termsAccepted}</p>}
                                        </div>
                                    )}

                                    {/* Form Navigation */}
                                    <div className="flex justify-between mt-6">
                                        <button
                                            type="button"
                                            onClick={prevStep}
                                            disabled={formStep === 1}
                                            className={`flex items-center px-4 py-2 rounded-lg ${formStep === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                                        >
                                            <FaArrowLeft className="mr-2" />
                                            Previous
                                        </button>
                                        {formStep < 3 ? (
                                            <button
                                                type="button"
                                                onClick={nextStep}
                                                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                            >
                                                Next
                                                <FaArrowRight className="ml-2" />
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={submitForm}
                                                disabled={isSubmitting}
                                                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                        </svg>
                                                        Processing...
                                                    </>
                                                ) : (
                                                    <>
                                                        <FaCheck className="mr-2" />
                                                        Submit Enrollment
                                                    </>
                                                )}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
